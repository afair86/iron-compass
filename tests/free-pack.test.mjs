import test from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {acceptPackRequest} from '../lib/packRequest.ts';
import {duePackMessages,campaignEmailText} from '../lib/packCampaignPolicy.ts';
import {PACK_EMAIL_CONSENT_VERSION,PACK_EMAIL_CONSENT,freeRecommendations,packCampaign} from '../lib/freePack.ts';

const request=(body,origin='https://ironcompassai.com')=>new Request('https://ironcompassai.com/api/free-pack',{method:'POST',headers:{'content-type':'application/json',origin},body:JSON.stringify(body)});
const valid={email:'fixture@example.invalid',consent:true,consentVersion:PACK_EMAIL_CONSENT_VERSION,variant:'control'};

test('campaign lifecycle rejects unconfirmed, withdrawn, suppressed and already-sent messages',()=>{
  const s={consentVersion:PACK_EMAIL_CONSENT_VERSION,confirmedAt:'2026-11-01T00:00:00Z',unsubscribed:false,suppressed:false,sentIds:[]};
  assert.deepEqual(duePackMessages({...s,confirmedAt:null}),[]);
  assert.deepEqual(duePackMessages({...s,unsubscribed:true}),[]);
  assert.deepEqual(duePackMessages({...s,suppressed:true}),[]);
  assert.deepEqual(duePackMessages({...s,consentVersion:'old'}),[]);
  assert.deepEqual(duePackMessages(s,new Date('2026-10-31')),[]);
  assert.deepEqual(duePackMessages(s,new Date('2026-11-01')).map(x=>x.id),['welcome']);
  assert.deepEqual(duePackMessages({...s,sentIds:['welcome']},new Date('2026-11-03')).map(x=>x.id),['difficult-day']);
  assert.deepEqual(duePackMessages(s,new Date('2026-11-09')).map(x=>x.id),['next-step'],'Delayed workers must not burst four overdue emails');
  assert.deepEqual(duePackMessages({...s,sentIds:['next-step']},new Date('2026-11-10')),[],'Earlier missed notes must not be backfilled after the final note');
  assert.deepEqual(duePackMessages({...s,sentIds:packCampaign.map(x=>x.id)},new Date('2027-01-01')),[]);
});

test('every draft requires sender/contact and HTTPS unsubscribe; recommendations stay free and internal',()=>{
  assert.throws(()=>campaignEmailText('welcome','','','https://example.invalid/unsubscribe'));
  assert.throws(()=>campaignEmailText('welcome','Fixture','test@example.invalid','http://example.invalid/unsubscribe'));
  for(const m of packCampaign){const rendered=campaignEmailText(m.id,'Fixture Sender','test@example.invalid','https://example.invalid/unsubscribe');assert.match(rendered.text,/Unsubscribe/);assert.match(rendered.text,/test@example.invalid/);assert(!rendered.text.includes('discount'));}
  for(const r of Object.values(freeRecommendations))assert(r.href.startsWith('/blog/'));
});

test('pack is a script-free offline worksheet, without analytics, email submission or external assets',()=>{
  const html=readFileSync(new URL('../public/downloads/7-day-follow-through-pack.html',import.meta.url),'utf8');
  assert.match(html,/Your answers stay in this tab/);assert.match(html,/form-action 'none'/);assert.equal((html.match(/<textarea/g)||[]).length,5);
  assert.doesNotMatch(html,/<script|<form|<iframe|src=|googletagmanager|onchange=/i);
});

test('opt-in, source boundary and disabled mode fail before any provider call',async t=>{
  const keys=['PACK_CAMPAIGN_ENABLED','PACK_CAMPAIGN_WEBHOOK_URL','PACK_CAMPAIGN_SIGNING_SECRET','PACK_CAMPAIGN_VERIFIED_AT','PACK_CAMPAIGN_PROVIDER_NAME'];const saved=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
  t.after(()=>{for(const [k,v]of Object.entries(saved)){if(v===undefined)delete process.env[k];else process.env[k]=v;}});
  const mock=t.mock.method(globalThis,'fetch',async()=>{throw Error('Must never call provider');});
  delete process.env.PACK_CAMPAIGN_ENABLED;
  for(const consent of [false,undefined,'true'])await assert.rejects(acceptPackRequest(request({...valid,consent})),e=>e.status===400);
  await assert.rejects(acceptPackRequest(request(valid,'https://untrusted.invalid')),e=>e.status===403);
  await assert.rejects(acceptPackRequest(request({...valid,variant:'other'})),e=>e.status===400);
  await assert.rejects(acceptPackRequest(request(valid)),e=>e.status===503);assert.equal(mock.mock.callCount(),0);
});

test('signed provider request is stable per recipient/pack and requires a durable matching acknowledgement',async t=>{
  const values={PACK_CAMPAIGN_ENABLED:'true',PACK_CAMPAIGN_WEBHOOK_URL:'https://example.invalid/pack',PACK_CAMPAIGN_SIGNING_SECRET:'fixture-only-signing-secret-at-least-32-characters',PACK_CAMPAIGN_VERIFIED_AT:'2026-01-01T00:00:00Z',PACK_CAMPAIGN_PROVIDER_NAME:'Fixture'};
  const saved=Object.fromEntries(Object.keys(values).map(k=>[k,process.env[k]]));Object.assign(process.env,values);t.after(()=>{for(const[k,v]of Object.entries(saved)){if(v===undefined)delete process.env[k];else process.env[k]=v;}});
  const payloads=[];let mode='ok';
  t.mock.method(globalThis,'fetch',async(url,options)=>{assert.equal(String(url),values.PACK_CAMPAIGN_WEBHOOK_URL);assert.equal(options.redirect,'error');const body=JSON.parse(options.body);payloads.push(body);assert.equal(body.email,'fixture@example.invalid');assert.equal(body.consent.text,PACK_EMAIL_CONSENT);assert.equal(options.headers['x-ic-signature'],createHmac('sha256',values.PACK_CAMPAIGN_SIGNING_SECRET).update(options.headers['x-ic-timestamp']+'.'+options.body).digest('hex'));return new Response(JSON.stringify(mode==='ok'?{ok:true,requestId:body.requestId,status:'confirmation_pending'}:mode==='ambiguous'?{}:{ok:true,requestId:'wrong',status:'confirmation_pending'}),{status:200});});
  assert.equal((await acceptPackRequest(request(valid))).status,'confirmation_pending');
  await acceptPackRequest(request({...valid,email:' FIXTURE@EXAMPLE.INVALID '}));assert.equal(payloads[0].idempotencyKey,payloads[1].idempotencyKey);
  assert.notEqual(payloads[0].requestId,payloads[1].requestId);
  mode='ambiguous';await assert.rejects(acceptPackRequest(request(valid)),e=>e.status===502);
  mode='wrong';await assert.rejects(acceptPackRequest(request(valid)),e=>e.status===502);
  process.env.PACK_CAMPAIGN_WEBHOOK_URL='http://example.invalid';await assert.rejects(acceptPackRequest(request(valid)),e=>e.status===503);
});

