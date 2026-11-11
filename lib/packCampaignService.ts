import { createHmac, timingSafeEqual, randomUUID, randomBytes, hkdfSync, createCipheriv, createDecipheriv } from "node:crypto";
import { PackStore, redisCommand } from "./packStore.ts";
import { PACK_EMAIL_CONSENT, PACK_EMAIL_CONSENT_VERSION, packCampaign } from "./freePack.ts";
import { campaignEmailText, duePackMessages } from "./packCampaignPolicy.ts";
import { PublicRequestError } from "./publicRequest.ts";

type Env = NodeJS.ProcessEnv;
type Mail = { to: string[]; subject: string; text: string; headers: Record<string, string> };
type Sender = (mail: Mail, idempotencyKey: string) => Promise<string>;
function packOrigin(env: Env) {
  const preview = env.VERCEL_ENV === "preview" && env.VERCEL_BRANCH_URL?.endsWith(".vercel.app") ? `https://${env.VERCEL_BRANCH_URL}` : "";
  return new URL(env.PACK_PUBLIC_ORIGIN || preview).origin;
}
export function durablePackConfigured(env: Env = process.env) {
  const test = env.PACK_DELIVERY_MODE === "test" && env.VERCEL_ENV !== "production" && Boolean(env.PACK_TEST_RECIPIENT);
  const live = env.PACK_DELIVERY_MODE === "live" && env.PACK_LIVE_APPROVED === "true" && env.VERCEL_ENV === "production" && Boolean(env.PACK_RESEND_WEBHOOK_SECRET && env.CRON_SECRET);
  try {
    return (test || live) && Boolean(env.RESEND_API_KEY && env.UPSTASH_REST_URL && env.UPSTASH_REST_TOKEN && env.PACK_NAMESPACE && env.PACK_STORE_EPOCH && env.PACK_RESEND_DOMAIN_ID) && (env.PACK_TOKEN_SECRET?.length || 0) >= 43 && new URL(packOrigin(env)).protocol === "https:";
  } catch { return false; }
}
function safeEqual(a: string, b: string) { return a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b)); }
export function authorizePackWorker(authorization: string | null, secret: string | undefined) {
  if (!secret) return false;
  const actual = Buffer.from(authorization || ""), expected = Buffer.from(`Bearer ${secret}`);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
export class PackCampaign {
  secret: string;
  origin: string;
  store: PackStore;
  env: Env;
  send: Sender;
  clock: () => number;
  constructor(store: PackStore, env: Env, send: Sender, clock = () => Date.now()) {
    this.store = store; this.env = env; this.send = send; this.clock = clock;
    this.secret = env.PACK_TOKEN_SECRET || "";
    if (this.secret.length < 43) throw new Error("Campaign secret unavailable");
    this.origin = packOrigin(env);
  }
  identity(email: string) { return createHmac("sha256", this.secret).update(email.trim().toLowerCase()).digest("hex"); }
  encrypt(email: string) {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", Buffer.from(hkdfSync("sha256", this.secret, "ic-pack-v1", "email-at-rest", 32)), iv);
    const encrypted = Buffer.concat([cipher.update(email, "utf8"), cipher.final()]);
    return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
  }
  decrypt(value: string) {
    const data = Buffer.from(value, "base64url");
    const cipher = createDecipheriv("aes-256-gcm", Buffer.from(hkdfSync("sha256", this.secret, "ic-pack-v1", "email-at-rest", 32)), data.subarray(0, 12));
    cipher.setAuthTag(data.subarray(12, 28));
    return Buffer.concat([cipher.update(data.subarray(28)), cipher.final()]).toString("utf8");
  }
  token(id: string, purpose: "confirm" | "unsubscribe", expires: number) {
    const payload = Buffer.from(JSON.stringify({ id, purpose, expires })).toString("base64url");
    return `${payload}.${createHmac("sha256", this.secret).update(payload).digest("hex")}`;
  }
  verify(token: string, purpose: "confirm" | "unsubscribe") {
    if (token.length > 1024) throw new PublicRequestError("This link is not valid.");
    const [payload, signature, extra] = token.split(".");
    const expected = createHmac("sha256", this.secret).update(payload || "").digest("hex");
    if (extra || !signature || !/^[a-f0-9]{64}$/.test(signature) || !safeEqual(signature, expected)) throw new PublicRequestError("This link is not valid.");
    let value;
    try { value = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")); } catch { throw new PublicRequestError("This link is not valid."); }
    if (!value || typeof value !== "object" || value.purpose !== purpose || typeof value.id !== "string" || !/^[a-f0-9]{64}$/.test(value.id) || !Number.isSafeInteger(value.expires) || value.expires < this.clock()) throw new PublicRequestError("This link has expired or is not valid. You can still use the free pack without email.");
    return value.id as string;
  }
  url(id: string, purpose: "confirm" | "unsubscribe", expires: number) { return `${this.origin}/api/free-pack/${purpose}?token=${this.token(id, purpose, expires)}`; }
  enabled() {
    const verified = Date.parse(this.env.PACK_CAMPAIGN_VERIFIED_AT || "");
    if (this.env.PACK_CAMPAIGN_ENABLED !== "true" || !durablePackConfigured(this.env) || !Number.isFinite(verified) || verified > this.clock()) throw new PublicRequestError("Email delivery is not enabled. Use the pack without email.", 503);
  }
  allowed(email: string) {
    if (this.env.PACK_DELIVERY_MODE === "test" && email !== this.env.PACK_TEST_RECIPIENT?.toLowerCase()) throw new PublicRequestError("This preview accepts only the designated test inbox. Use the pack without email.", 503);
  }
  async enroll(email: string, variant: string, ip: string) {
    this.enabled(); this.allowed(email);
    const now = this.clock(), id = this.identity(email);
    const day = new Date(now).toISOString().slice(0, 10), hour = new Date(now).toISOString().slice(0, 13);
    const ipHash = createHmac("sha256", this.secret).update(`${day}:${ip}`).digest("hex");
    const result = await this.store.mutate("enroll", id, now, [this.encrypt(email), JSON.stringify({ version: PACK_EMAIL_CONSENT_VERSION, text: PACK_EMAIL_CONSENT, requestedAt: new Date(now).toISOString() }), variant], [`rate:${ipHash}`, `new:${hour}`, "total-enrollments"]);
    if (result === "limited") throw new PublicRequestError("Email requests are temporarily limited. Use the pack now and try later.", 429);
    if (result === "created") await this.deliver(id, "confirmation");
    // Existing records are never reactivated, and never trigger another confirmation.
    const record = await this.store.read(id);
    if (record.status && record.status !== "pending") return { ok: true, status: "already_recorded" } as const;
    if (!record.confirmation || record.confirmation === "reserved" || record.hold) throw new PublicRequestError("We could not confirm delivery of your request. Please use the pack without email; repeating the form will not send another message.", 502);
    return { ok: true, status: "confirmation_pending" } as const;
  }
  async confirm(token: string) {
    this.enabled();
    const id = this.verify(token, "confirm");
    const status = await this.store.mutate("confirm", id, this.clock());
    if (status !== "confirmed") throw new PublicRequestError("This email request is no longer active. You can still use the free pack without email.");
    await this.deliver(id, "welcome");
    return { ok: true, status: "confirmed" } as const;
  }
  async unsubscribe(token: string) {
    const id = this.verify(token, "unsubscribe");
    // Withdrawal remains available even when campaign sending is switched off.
    await this.store.mutate("unsubscribe", id, this.clock());
    return { ok: true, status: "unsubscribed" } as const;
  }
  async deliver(id: string, message: string) {
    this.enabled();
    if (message !== "confirmation" && !packCampaign.some(m => m.id === message)) throw new Error("Invalid message");
    const now = this.clock(), attempt = randomUUID(), date = new Date(now).toISOString();
    const encrypted = await this.store.mutate("claim", id, now, [message, attempt], [`emails:${date.slice(0, 10)}`, `emails:${date.slice(0, 7)}`]);
    if (!encrypted || ["inactive", "not-due", "duplicate", "limited"].includes(encrypted)) return encrypted;
    try {
      const email = this.decrypt(encrypted); this.allowed(email);
      const record = await this.store.read(id);
      const unsubscribe = this.url(id, "unsubscribe", 8640000000000000);
      let content;
      if (message === "confirmation") {
        const confirm = this.url(id, "confirm", Number(record.expiresAt));
        content = { subject: "Confirm your Iron Compass free pack request", text: `Confirm this request to receive the free pack and three notes over eight days.\n\nConfirm email: ${confirm}\n\nIf you did not request this, ignore it. No follow-up notes will be sent unless you confirm. This link expires in seven days.\n\nUse the pack without email: https://ironcompassai.com/free-pack\n\nIron Compass AI | HumanFirst Technologies | ABN 96 226 474 355\nContact: adam.fairclough86@gmail.com\nCancel this request: ${unsubscribe}` };
      } else content = campaignEmailText(message, "Iron Compass AI | HumanFirst Technologies | ABN 96 226 474 355", "adam.fairclough86@gmail.com", unsubscribe);
      // Last atomic state check: cancellation wins until dispatch begins. An email
      // already handed to the provider cannot be recalled by an unsubscribe.
      if (await this.store.mutate("dispatch", id, this.clock(), [message, attempt]) !== "ready") return "inactive";
      const providerId = await this.send({ to: [email], ...content, headers: { "List-Unsubscribe": `<${unsubscribe}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } }, `ic-pack/${this.env.PACK_NAMESPACE}/${id}/${message}`);
      if (!providerId) throw new Error("Ambiguous provider acknowledgement");
      await this.store.mutate("mark", id, this.clock(), [message, attempt, providerId]);
      return "accepted";
    } catch {
      // A reservation never expires. Unknown outcomes are held for investigation;
      // neither a worker restart nor Resend's 24-hour idempotency expiry resends it.
      await this.store.mutate("hold", id, this.clock(), [message]);
      throw new PublicRequestError("Email delivery could not be confirmed. Please use the pack without email.", 502);
    }
  }
  async run() {
    const results: Record<string, number> = {};
    await this.store.ready();
    const started = Date.now();
    for (const id of await this.store.expired(this.clock())) await this.store.mutate("forget", id, this.clock());
    // Pausing delivery must not suspend removal of abandoned addresses.
    this.enabled();
    for (const id of await this.store.due(this.clock())) {
      if (Date.now() - started > 240000) break;
      const r = await this.store.read(id);
      const messages = duePackMessages({ consentVersion: r.consent ? JSON.parse(r.consent).version : "", confirmedAt: r.confirmedAt ? new Date(Number(r.confirmedAt)).toISOString() : null, unsubscribed: r.status !== "confirmed", suppressed: Boolean(r.hold), sentIds: packCampaign.filter(m => r[m.id]).map(m => m.id) }, new Date(this.clock()));
      if (!messages.length) continue;
      let result;
      try { result = await this.deliver(id, messages[0].id); } catch { result = "held"; }
      results[result] = (results[result] || 0) + 1;
    }
    return results;
  }
}

export function createPackCampaign(env: Env = process.env) {
  if (!env.PACK_STORE_EPOCH) throw new Error("Campaign store identity unavailable");
  const store = new PackStore(redisCommand(env), env.PACK_NAMESPACE || "", env.PACK_STORE_EPOCH);
  const send: Sender = async (mail, idempotencyKey) => {
    // Authoritative sender verification is checked before every provider send.
    const headers = { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" };
    const domainResponse = await fetch(`https://api.resend.com/domains/${encodeURIComponent(env.PACK_RESEND_DOMAIN_ID || "")}`, { headers, cache: "no-store", signal: AbortSignal.timeout(8000) });
    const domain = await domainResponse.json();
    if (!domainResponse.ok || domain.name !== "updates.ironcompassai.com" || domain.status !== "verified" || domain.open_tracking || domain.click_tracking) throw new Error("Sender not verified");
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { ...headers, "Idempotency-Key": idempotencyKey }, body: JSON.stringify({ ...mail, from: "Iron Compass AI <hello@updates.ironcompassai.com>", reply_to: "adam.fairclough86@gmail.com", tags: [{ name: "campaign", value: "ic-pack-v1" }] }), cache: "no-store", redirect: "error", signal: AbortSignal.timeout(8000) });
    const body = await response.json();
    if (!response.ok || typeof body.id !== "string" || !/^[a-f0-9-]{36}$/.test(body.id)) throw new Error("Provider did not acknowledge delivery");
    return body.id;
  };
  return new PackCampaign(store, env, send);
}
