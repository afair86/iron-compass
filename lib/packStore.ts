/** Durable, atomic campaign state. No app accounts or shared app database. */
export const PACK_STORE_SCRIPT = `
local op=ARGV[1]
local state=KEYS[1]
local queue=KEYS[2]
local id=ARGV[2]
local now=tonumber(ARGV[3])
if redis.call('GET',KEYS[#KEYS])~=ARGV[#ARGV] then return redis.error_reply('Campaign store requires operator verification') end
if op=='enroll' then
 if redis.call('HEXISTS',state,'status')==1 then return 'existing' end
 local rate=redis.call('INCR',KEYS[3]); redis.call('EXPIRE',KEYS[3],86400)
 local global=redis.call('INCR',KEYS[4]); redis.call('EXPIRE',KEYS[4],7200)
 if rate>3 or global>20 or tonumber(redis.call('GET',KEYS[5]) or '0')>=500 then return 'limited' end
 redis.call('INCR',KEYS[5])
 redis.call('HSET',state,'status','pending','requestedAt',now,'email',ARGV[4],'consent',ARGV[5],'variant',ARGV[6],'expiresAt',now+604800000)
 redis.call('ZADD',queue..':retention',now+2592000000,id)
 return 'created'
elseif op=='confirm' then
 if redis.call('HGET',state,'status')=='confirmed' then return 'confirmed' end
 if redis.call('HGET',state,'status')~='pending' then return 'inactive' end
 if tonumber(redis.call('HGET',state,'expiresAt') or '0')<now then return 'expired' end
 if not redis.call('HGET',state,'confirmation') or redis.call('HGET',state,'confirmation')=='reserved' then return 'inactive' end
 redis.call('HSET',state,'status','confirmed','confirmedAt',now)
 redis.call('ZADD',queue,now,id)
 return 'confirmed'
elseif op=='unsubscribe' or op=='suppress' then
 redis.call('HSET',state,'status',op=='unsubscribe' and 'unsubscribed' or 'suppressed','stoppedAt',now)
 redis.call('HDEL',state,'email')
 redis.call('ZREM',queue,id)
 redis.call('ZREM',queue..':retention',id)
 return 'stopped'
elseif op=='forget' then
 local expiry=tonumber(redis.call('ZSCORE',queue..':retention',id) or '0')
 if expiry==0 or expiry>now then return 'not-due' end
 redis.call('HDEL',state,'email')
 local status=redis.call('HGET',state,'status')
 if status=='pending' or status=='confirmed' then redis.call('HSET',state,'status','expired') end
 redis.call('ZREM',queue,id); redis.call('ZREM',queue..':retention',id)
 return 'forgotten'
elseif op=='claim' then
 local msg=ARGV[4]
 local status=redis.call('HGET',state,'status')
 if msg=='confirmation' then
  if status~='pending' then return 'inactive' end
 else
  if status~='confirmed' then return 'inactive' end
  local age=now-tonumber(redis.call('HGET',state,'confirmedAt') or now)
  local due='welcome'
  if age>=691200000 then due='next-step' elseif age>=432000000 then due='review' elseif age>=172800000 then due='difficult-day' end
  if due~=msg then return 'not-due' end
 end
 if redis.call('HEXISTS',state,msg)==1 then return 'duplicate' end
 if tonumber(redis.call('GET',KEYS[3]) or '0')>=80 or tonumber(redis.call('GET',KEYS[4]) or '0')>=2400 then return 'limited' end
 if not redis.call('HGET',state,'email') then return 'inactive' end
 redis.call('INCR',KEYS[3]); redis.call('EXPIRE',KEYS[3],172800)
 redis.call('INCR',KEYS[4]); redis.call('EXPIRE',KEYS[4],5356800)
 redis.call('HSET',state,msg,'reserved','attempt:'..msg,ARGV[5])
 redis.call('ZREM',queue,id)
 return redis.call('HGET',state,'email')
elseif op=='dispatch' then
 local msg=ARGV[4]
 local expected=msg=='confirmation' and 'pending' or 'confirmed'
 if redis.call('HGET',state,'status')~=expected or redis.call('HGET',state,msg)~='reserved' or redis.call('HGET',state,'attempt:'..msg)~=ARGV[5] then return 'inactive' end
 redis.call('HSET',state,'dispatchedAt:'..msg,now)
 return 'ready'
elseif op=='mark' then
 local msg=ARGV[4]
 if redis.call('HGET',state,msg)~='reserved' or redis.call('HGET',state,'attempt:'..msg)~=ARGV[5] then return 'stale' end
 redis.call('HSET',state,msg,ARGV[6],'acceptedAt:'..msg,now)
 if msg~='confirmation' and redis.call('HGET',state,'status')=='confirmed' then
  local offsets={welcome=172800000,['difficult-day']=432000000,review=691200000}
  if offsets[msg] then redis.call('ZADD',queue,tonumber(redis.call('HGET',state,'confirmedAt'))+offsets[msg],id)
  else redis.call('HSET',state,'status','complete'); redis.call('HDEL',state,'email'); redis.call('ZREM',queue,id); redis.call('ZREM',queue..':retention',id) end
 end
 return 'accepted'
elseif op=='hold' then
 redis.call('HSET',state,'hold',ARGV[4]); redis.call('ZREM',queue,id); return 'held'
end
return redis.error_reply('Unknown campaign operation')
`;

export type RedisCommand = (args: (string | number)[]) => Promise<unknown>;
export function redisCommand(env = process.env): RedisCommand {
  const url = env.UPSTASH_REST_URL;
  const token = env.UPSTASH_REST_TOKEN;
  if (!url || new URL(url).protocol !== "https:" || !token) throw new Error("Durable email storage unavailable");
  return async args => {
    const response = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify(args), cache: "no-store", redirect: "error", signal: AbortSignal.timeout(5000) });
    const body = await response.json();
    if (!response.ok || body.error) throw new Error("Durable email storage unavailable");
    return body.result;
  };
}

export class PackStore {
  prefix: string;
  command: RedisCommand;
  epoch: string;
  constructor(command: RedisCommand, namespace: string, epoch = namespace) {
    this.command = command;
    this.epoch = epoch;
    if (!/^[a-z0-9-]{1,40}$/.test(namespace)) throw new Error("Invalid campaign namespace");
    this.prefix = `{ic-pack}:${namespace}:`;
  }
  key(id: string) { if (!/^[a-f0-9]{64}$/.test(id)) throw new Error("Invalid campaign identity"); return this.prefix + id; }
  async mutate(op: string, id: string, now: number, args: string[] = [], extraKeys: string[] = []) {
    const keys = [this.key(id), this.prefix + "due", ...extraKeys.map(k => this.prefix + k), this.prefix + "epoch"];
    return this.command(["EVAL", PACK_STORE_SCRIPT, keys.length, ...keys, op, id, now, ...args, this.epoch]) as Promise<string>;
  }
  async ready() { if (await this.command(["GET", this.prefix + "epoch"]) !== this.epoch) throw new Error("Campaign store requires operator verification"); }
  async read(id: string): Promise<Record<string, string>> {
    const raw = await this.command(["HGETALL", this.key(id)]) as string[];
    return Object.fromEntries(Array.from({ length: raw.length / 2 }, (_, i) => [raw[i * 2], raw[i * 2 + 1]]));
  }
  async due(now: number) { return this.command(["ZRANGEBYSCORE", this.prefix + "due", 0, now, "LIMIT", 0, 20]) as Promise<string[]>; }
  async expired(now: number) { return this.command(["ZRANGEBYSCORE", this.prefix + "due:retention", 0, now, "LIMIT", 0, 20]) as Promise<string[]>; }
}
