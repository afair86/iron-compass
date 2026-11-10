import assert from 'node:assert/strict';
import test from 'node:test';
import { readPublicJson } from '../lib/publicRequest.ts';
import { validateContactBody, deliverContactMessage, MAX_CONTACT_BYTES } from '../lib/contact.ts';
const valid = { name:'Fixture Visitor', email:'synthetic@example.invalid', message:'Synthetic local test only.' };
const request=(body,headers={})=>new Request('http://localhost/api/contact',{method:'POST',headers:{'content-type':'application/json',...headers},body});

test('Contact rejects malformed types and bounds fields before provider access',()=>{
  for(const body of [null,[],{},false,{...valid,name:123},{...valid,email:false},{...valid,message:123},{...valid,name:' '},{...valid,email:'invalid'},{...valid,message:'a'},{...valid,name:'a'.repeat(201)},{...valid,email:'a'.repeat(255)},{...valid,message:'x'.repeat(10001)}]){
    assert.throws(()=>validateContactBody(body),e=>e.status===400);
  }
  assert.deepEqual(validateContactBody({...valid,name:' Fixture Visitor '}),valid);
  assert.equal(validateContactBody({...valid,message:'x'.repeat(10000)}).message.length,10000);
});

test('Public forms reject foreign/null origins and simple cross-site form media',async()=>{
  await assert.rejects(readPublicJson(request(JSON.stringify(valid),{origin:'https://untrusted.invalid'}),MAX_CONTACT_BYTES),e=>e.status===403);
  await assert.rejects(readPublicJson(request(JSON.stringify(valid),{origin:'null'}),MAX_CONTACT_BYTES),e=>e.status===403);
  await assert.rejects(readPublicJson(request(JSON.stringify(valid),{'content-type':'text/plain'}),MAX_CONTACT_BYTES),e=>e.status===415);
  await assert.rejects(readPublicJson(request('name=x',{'content-type':'application/x-www-form-urlencoded'}),MAX_CONTACT_BYTES),e=>e.status===415);
  assert.deepEqual(await readPublicJson(request(JSON.stringify(valid),{origin:'http://localhost'}),MAX_CONTACT_BYTES),valid);
  assert.deepEqual(await readPublicJson(request(JSON.stringify(valid)),MAX_CONTACT_BYTES),valid,'server callers without Origin remain compatible');
  const proxied=(headers)=>new Request('http://localhost:3100/api/contact',{method:'POST',headers:{'content-type':'application/json',...headers},body:JSON.stringify(valid)});
  assert.deepEqual(await readPublicJson(proxied({host:'127.0.0.1:3100',origin:'http://127.0.0.1:3100'}),MAX_CONTACT_BYTES),valid,'Next internal hostname must not reject the actual same-origin host');
  assert.deepEqual(await readPublicJson(proxied({host:'ironcompassai.com','x-forwarded-proto':'https',origin:'https://ironcompassai.com'}),MAX_CONTACT_BYTES),valid);
  await assert.rejects(readPublicJson(proxied({host:'ironcompassai.com','x-forwarded-proto':'https',origin:'http://ironcompassai.com'}),MAX_CONTACT_BYTES),e=>e.status===403);
  await assert.rejects(readPublicJson(proxied({host:'ironcompassai.com','x-forwarded-host':'untrusted.invalid',origin:'https://untrusted.invalid'}),MAX_CONTACT_BYTES),e=>e.status===403);
});

test('Public forms enforce UTF-8 byte boundary and reject invalid encoding or partial JSON',async()=>{
  const json=JSON.stringify(valid);
  assert.deepEqual(await readPublicJson(request(json.padEnd(MAX_CONTACT_BYTES,' ')),MAX_CONTACT_BYTES),valid);
  await assert.rejects(readPublicJson(request(json.padEnd(MAX_CONTACT_BYTES+1,' ')),MAX_CONTACT_BYTES),e=>e.status===413);
  await assert.rejects(readPublicJson(request('{'),MAX_CONTACT_BYTES),e=>e.status===400);
  await assert.rejects(readPublicJson(request(new Uint8Array([0xff])),MAX_CONTACT_BYTES),e=>e.status===400);
  const stream=new ReadableStream({start(c){c.enqueue(new Uint8Array(MAX_CONTACT_BYTES));c.enqueue(new Uint8Array(1));c.close();}});
  await assert.rejects(readPublicJson(new Request('http://localhost',{method:'POST',headers:{'content-type':'application/json','content-length':'1'},body:stream,duplex:'half'}),MAX_CONTACT_BYTES),e=>e.status===413);
});

test('Body deadline contains stalled upload and cancellation that never settles',async()=>{
  let cancelled=false;
  const body=new ReadableStream({start(c){c.enqueue(new TextEncoder().encode('{'));},cancel(){cancelled=true;return new Promise(()=>{});}});
  const r=new Request('http://localhost',{method:'POST',headers:{'content-type':'application/json'},body,duplex:'half'});
  const start=performance.now();
  await assert.rejects(readPublicJson(r,4096,20),e=>e.status===408);
  assert(cancelled);
  assert(performance.now()-start<1000,'must not await malicious cancellation indefinitely');
});

test('Contact provider fixtures distinguish success, outage, redirect, timeout and missing configuration',async t=>{
  const saved=process.env.CONTACT_WEBHOOK_URL;
  t.after(()=>{if(saved===undefined)delete process.env.CONTACT_WEBHOOK_URL;else process.env.CONTACT_WEBHOOK_URL=saved;});
  delete process.env.CONTACT_WEBHOOK_URL;
  await assert.rejects(deliverContactMessage(valid),e=>e.status===503);
  process.env.CONTACT_WEBHOOK_URL='https://contact.example.invalid/fixture';
  const fetchMock=t.mock.method(globalThis,'fetch',async(url,options)=>{
    assert.equal(url,process.env.CONTACT_WEBHOOK_URL);assert.equal(options.redirect,'error');assert(options.signal instanceof AbortSignal);
    const payload=JSON.parse(options.body);assert.equal(payload.message,valid.message);assert.match(payload.sentAt,/^\d{4}-/);
    return new Response('',{status:200});
  });
  await assert.doesNotReject(deliverContactMessage(valid));
  fetchMock.mock.mockImplementation(async()=>new Response('',{status:500}));
  await assert.rejects(deliverContactMessage(valid),e=>e.status===502);
  fetchMock.mock.mockImplementation(async()=>{throw new Error('fixture network/redirect failure');});
  await assert.rejects(deliverContactMessage(valid),e=>e.status===502);
  t.mock.method(AbortSignal,'timeout',()=>AbortSignal.abort(new DOMException('fixture','TimeoutError')));
  await assert.rejects(deliverContactMessage(valid),e=>e.status===504);
});
