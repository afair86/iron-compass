import test from 'node:test';
import assert from 'node:assert/strict';
import {randomBytes,createHmac} from 'node:crypto';
import {PackCampaign,durablePackConfigured} from '../lib/packCampaignService.ts';
import {PackStore} from '../lib/packStore.ts';
import {verifyPackWebhook} from '../lib/packWebhook.ts';
import {packLinkPage,boundedPackText} from '../lib/packLinkResponse.ts';
const env={PACK_TOKEN_SECRET:randomBytes(32).toString('base64url'),PACK_PUBLIC_ORIGIN:'https://preview.example.invalid',PACK_NAMESPACE:'unit',PACK_STORE_EPOCH:'unit',PACK_DELIVERY_MODE:'test',PACK_TEST_RECIPIENT:'fixture@example.invalid',PACK_RESEND_DOMAIN_ID:'fixture-domain',RESEND_API_KEY:'fixture',UPSTASH_REST_URL:'https://redis.example.invalid',UPSTASH_REST_TOKEN:'fixture',PACK_CAMPAIGN_ENABLED:'true'};
const campaign=()=>new PackCampaign(new PackStore(async()=>{throw Error('Unexpected storage call');},'unit'),env,async()=>{throw Error('Unexpected email');},()=>1000000);

test('purpose-bound signed tokens reject tampering, expiry and wrong action',()=>{
 const c=campaign(),id=c.identity('fixture@example.invalid');
 const token=c.token(id,'confirm',2000000);
 assert.equal(c.verify(token,'confirm'),id);
 assert.throws(()=>c.verify(token,'unsubscribe'));
 assert.throws(()=>c.verify(token.slice(0,-1)+'z','confirm'));
 assert.throws(()=>c.verify(c.token(id,'confirm',999999),'confirm'));
 assert.equal(c.verify(c.token(id,'unsubscribe',8640000000000000),'unsubscribe'),id);
 assert.equal(c.identity(' FIXTURE@EXAMPLE.INVALID '),id);
});
test('recipient encryption authenticates ciphertext and secrets; production fails closed',()=>{
 const c=campaign(),cipher=c.encrypt('fixture@example.invalid');
 assert.equal(c.decrypt(cipher),'fixture@example.invalid');
 assert.ok(!cipher.includes('fixture'));
 const wrong=campaign();wrong.secret=randomBytes(32).toString('base64url');
 assert.throws(()=>wrong.decrypt(cipher));
 assert.equal(durablePackConfigured(env),true);
 assert.equal(durablePackConfigured({...env,PACK_DELIVERY_MODE:'live'}),false);
 assert.equal(durablePackConfigured({...env,PACK_LIVE_APPROVED:'true',PACK_DELIVERY_MODE:'live',VERCEL_ENV:'preview'}),false);
 assert.throws(()=>c.allowed('another@example.invalid'),e=>e.status===503);
});
test('webhook HMAC checks raw bytes, timestamp, rotating signatures and nonempty secret',()=>{
 const raw=JSON.stringify({type:'email.complained',data:{to:['fixture@example.invalid']}});
 const key=randomBytes(32),secret='whsec_'+key.toString('base64'),timestamp='1000',id='msg_fixture';
 const signature=createHmac('sha256',key).update(`${id}.${timestamp}.${raw}`).digest('base64');
 const headers=new Headers({'svix-id':id,'svix-timestamp':timestamp,'svix-signature':'v1,invalid v1,'+signature});
 assert.equal(verifyPackWebhook(raw,headers,secret,1000000).type,'email.complained');
 assert.throws(()=>verifyPackWebhook(raw+' ',headers,secret,1000000));
 assert.throws(()=>verifyPackWebhook(raw,headers,secret,1301000));
 assert.throws(()=>verifyPackWebhook(raw,headers,'whsec_',1000000));
});
test('email landing pages contain no tracking and reject oversized streamed input',async()=>{
 const response=packLinkPage('Confirm','A clear next action');const html=await response.text();
 assert.equal(response.headers.get('x-robots-tag'),'noindex, nofollow');
 assert.equal(response.headers.get('referrer-policy'),'no-referrer');
 assert.doesNotMatch(html,/<script|<img|googletagmanager|<iframe/i);
 const request=new Request('https://example.invalid',{method:'POST',body:'x'.repeat(200)});
 await assert.rejects(boundedPackText(request,100),e=>e.status===413);
});
