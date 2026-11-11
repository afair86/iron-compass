import test from 'node:test';
import assert from 'node:assert/strict';
import {randomBytes,randomUUID} from 'node:crypto';
import {PackStore,redisCommand} from '../lib/packStore.ts';
import {PackCampaign} from '../lib/packCampaignService.ts';
import {applyPackWebhook} from '../lib/packWebhook.ts';

test('real durable-store sequence, concurrency, cancellation, quotas and restart regression', {skip:process.env.RUN_PACK_STORE_INTEGRATION!=='true',timeout:240000},async t=>{
 const namespace='qa-'+randomBytes(8).toString('hex');
 const env={...process.env,PACK_NAMESPACE:namespace,PACK_STORE_EPOCH:namespace,PACK_TOKEN_SECRET:randomBytes(32).toString('base64url'),PACK_PUBLIC_ORIGIN:'https://preview.example.invalid',PACK_DELIVERY_MODE:'test',PACK_CAMPAIGN_ENABLED:'true',PACK_CAMPAIGN_VERIFIED_AT:'2026-01-01T00:00:00Z',PACK_RESEND_DOMAIN_ID:'fixture-domain'};
 const store=new PackStore(redisCommand(env),namespace);
 await store.command(['SET',store.prefix+'epoch',namespace,'NX']);
 let now=Date.now(); const start=now; const mails=[];
 let fail=false;
 const sender=async(mail,key)=>{if(fail)throw Error('Unknown provider outcome');mails.push({mail,key});return randomUUID();};
 const make=()=>new PackCampaign(store,env,sender,()=>now);
 let c=make();
 const person=(name)=>{now=start;const email=name+'@example.invalid';env.PACK_TEST_RECIPIENT=email;return email;};
 const link=(message,label)=>new URL(message.mail.text.match(new RegExp(label+': (https://\\S+)'))[1]).searchParams.get('token');
 const latest=()=>mails.at(-1);
 await t.test('one confirmation under 20 concurrent repeated requests; exact consent persists',async()=>{
  const email=person('concurrent');
  await Promise.allSettled(Array.from({length:20},()=>c.enroll(email,'control','synthetic-ip')));
  assert.equal(mails.length,1);
  const record=await store.read(c.identity(email));
  assert.equal(record.status,'pending');assert.match(record.confirmation,/^[a-f0-9-]{36}$/);
  assert.equal(JSON.parse(record.consent).version,'pack-notes-v1');assert.notEqual(record.email,email);
  assert.equal((await c.run()).accepted,undefined);
 });
 await t.test('whole day0/2/5/8 sequence runs once despite racing confirmations/workers and restarts',async()=>{
  const email=person('whole');await c.enroll(email,'practice','synthetic-ip-2');
  const token=link(latest(),'Confirm email'); const before=mails.length;
  await Promise.all(Array.from({length:12},()=>c.confirm(token)));
  assert.equal(mails.length,before+1);assert.equal(latest().mail.subject,'Your seven-day follow-through pack');
  for(const [day,subject] of [[2,'Decide what a difficult day looks like'],[5,'Make room for a short weekly review'],[8,'Keep what worked. Choose what comes next.']]){
   now=start+day*86400000;c=make();const count=mails.length;
   await Promise.all(Array.from({length:10},()=>c.run()));
   assert.equal(mails.length,count+1);assert.equal(latest().mail.subject,subject);
   assert.ok(latest().mail.headers['List-Unsubscribe-Post']);
  }
  const record=await store.read(c.identity(email));assert.equal(record.status,'complete');assert.equal(record.email,undefined);
  now=start+40*86400000;const count=mails.length;await c.run();assert.equal(mails.length,count);
 });
 await t.test('unsubscribe before confirmation remains effective with sending disabled and on replay',async()=>{
  const email=person('before');await c.enroll(email,'none','synthetic-ip-3');const mail=latest();
  const confirmation=link(mail,'Confirm email'),cancel=link(mail,'Cancel this request');
  env.PACK_CAMPAIGN_ENABLED='false';await c.unsubscribe(cancel);await c.unsubscribe(cancel);env.PACK_CAMPAIGN_ENABLED='true';
  await assert.rejects(c.confirm(confirmation));const count=mails.length;await c.enroll(email,'none','synthetic-ip-3');
  assert.equal(mails.length,count);assert.equal((await store.read(c.identity(email))).status,'unsubscribed');
 });
 await t.test('unsubscribe during a wait stops future notes; repeated opt-in never reactivates',async()=>{
  const email=person('during');await c.enroll(email,'none','synthetic-ip-4');await c.confirm(link(latest(),'Confirm email'));
  const token=new URL(latest().mail.headers['List-Unsubscribe'].slice(1,-1)).searchParams.get('token');
  await c.unsubscribe(token);const count=mails.length;now=start+8*86400000;await c.run();
  assert.equal(mails.length,count);assert.equal((await store.read(c.identity(email))).email,undefined);
  await c.enroll(email,'none','synthetic-ip-4');assert.equal(mails.length,count);
 });
 await t.test('bounce and complaint suppression is monotonic and replay-safe',async()=>{
  for(const type of ['email.bounced','email.complained','email.suppressed']){
   const email=person(type.replaceAll('.','-'));await c.enroll(email,'none',type);await c.confirm(link(latest(),'Confirm email'));
   await applyPackWebhook(c,{type,data:{to:[email]}});await applyPackWebhook(c,{type,data:{to:[email]}});
   const count=mails.length;now=start+8*86400000;await c.run();assert.equal(mails.length,count);
   assert.equal((await store.read(c.identity(email))).status,'suppressed');
  }
 });
 await t.test('unknown provider outcome holds the reservation beyond 24h and across restarts',async()=>{
  const email=person('uncertain');fail=true;await assert.rejects(c.enroll(email,'none','synthetic-ip-5'));fail=false;
  const record=await store.read(c.identity(email));assert.equal(record.confirmation,'reserved');assert.equal(record.hold,'confirmation');
  now=start+2*86400000;c=make();const count=mails.length;await assert.rejects(c.enroll(email,'none','synthetic-ip-5'));await c.run();assert.equal(mails.length,count);
 });
 await t.test('unsubscribe after reservation prevents dispatch and leaves withdrawal active',async()=>{
  const email=person('race');await c.enroll(email,'none','synthetic-race');
  const token=link(latest(),'Confirm email');
  const mutate=store.mutate.bind(store);let intercepted=false;
  store.mutate=async(op,id,time,args,keys)=>{const result=await mutate(op,id,time,args,keys);if(op==='claim'&&args[0]==='welcome'&&!intercepted){intercepted=true;await mutate('unsubscribe',id,time);}return result;};
  const count=mails.length;await c.confirm(token);assert.equal(mails.length,count);
  store.mutate=mutate;assert.equal((await store.read(c.identity(email))).status,'unsubscribed');
 });
 await t.test('late worker sends only latest due note, never a backfill burst',async()=>{
  const email=person('late');await c.enroll(email,'none','synthetic-ip-6');await c.confirm(link(latest(),'Confirm email'));
  const count=mails.length;now=start+8*86400000;await c.run();assert.equal(mails.length,count+1);assert.equal(latest().mail.subject,'Keep what worked. Choose what comes next.');
 });
 await t.test('retention still removes abandoned addresses when delivery is disabled, retaining a no-repeat record',async()=>{
  const email=person('abandoned');await c.enroll(email,'none','synthetic-ip-7');now=start+31*86400000;
  env.PACK_CAMPAIGN_ENABLED='false';await assert.rejects(c.run(),e=>e.status===503);env.PACK_CAMPAIGN_ENABLED='true';
  const record=await store.read(c.identity(email));assert.equal(record.email,undefined);assert.equal(record.status,'expired');
 });
 await t.test('daily and monthly reservations enforce caps atomically',async()=>{
  const email=person('quota');await c.enroll(email,'none','synthetic-ip-8');await c.confirm(link(latest(),'Confirm email'));now=start+2*86400000;
  const date=new Date(now).toISOString();await store.command(['SET',store.prefix+'emails:'+date.slice(0,10),'79']);
  const ids=await Promise.all(Array.from({length:10},()=>c.deliver(c.identity(email),'difficult-day')));
  assert.equal(ids.filter(x=>x==='accepted').length,1);assert.equal(await store.command(['GET',store.prefix+'emails:'+date.slice(0,10)]),'80');
  now=start+5*86400000;await store.command(['SET',store.prefix+'emails:'+new Date(now).toISOString().slice(0,7),'2400']);
  assert.equal(await c.deliver(c.identity(email),'review'),'limited');
 });
 await t.test('global enrolment abuse cap rejects new requests before sending',async()=>{
  const email=person('abuse');const hour=new Date(now).toISOString().slice(0,13);
  await store.command(['SET',store.prefix+'new:'+hour,'20']);
  const count=mails.length;await assert.rejects(c.enroll(email,'none','unique-abuse-ip'),e=>e.status===429);assert.equal(mails.length,count);
 });
 await t.test('missing store identity fails closed rather than recreating lost reservations',async()=>{
  const wrong=new PackStore(store.command,namespace,'wrong-epoch');
  await assert.rejects(wrong.mutate('confirm',c.identity('whole@example.invalid'),now));
  await assert.rejects(wrong.ready());
 });
 console.log(JSON.stringify({namespace,realStore:true,actualProviderSends:0,simulatedAccepted:mails.length,scope:'Synthetic data only; delivery mocked, Lua executes on provisioned Redis'}));
});
