import assert from 'node:assert/strict';
import test from 'node:test';
import { submitPublicForm, PublicFormTimeoutError } from '../lib/formResponse.ts';

test('Browser form deadline bounds missing headers even when fetch ignores abort',async t=>{
 let signal;
 t.mock.method(globalThis,'fetch',(_url,options)=>{signal=options.signal;return new Promise(()=>{});});
 await assert.rejects(submitPublicForm('/api/contact',{name:'fixture'},20),PublicFormTimeoutError);
 assert(signal.aborted);
});

test('Browser form deadline also bounds a stalled response body and permits explicit retry',async t=>{
 let signal;
 const mock=t.mock.method(globalThis,'fetch',async(_url,options)=>{signal=options.signal;return{ok:true,json:()=>new Promise(()=>{})};});
 await assert.rejects(submitPublicForm('/api/subscribe',{email:'fixture@example.invalid'},20),PublicFormTimeoutError);
 assert(signal.aborted);assert.equal(mock.mock.callCount(),1,'no automatic duplicate submission');
 mock.mock.mockImplementation(async()=>new Response('{"ok":true}',{headers:{'content-type':'application/json'}}));
 assert.deepEqual(await submitPublicForm('/api/subscribe',{email:'fixture@example.invalid'},500),{responseOk:true,body:{ok:true}});
});

test('Browser form helper retains HTTP/JSON failures and clears a successful deadline',async t=>{
 let signal;
 const mock=t.mock.method(globalThis,'fetch',async(path,options)=>{assert.equal(path,'/api/contact');assert.equal(options.method,'POST');assert.equal(JSON.parse(options.body).name,'fixture');signal=options.signal;return new Response('{"error":"Safe failure"}',{status:502});});
 assert.deepEqual(await submitPublicForm('/api/contact',{name:'fixture'},20),{responseOk:false,body:{error:'Safe failure'}});
 await new Promise(r=>setTimeout(r,35));assert(!signal.aborted,'completed request timer must be cleared');
 mock.mock.mockImplementation(async()=>new Response('invalid json'));
 assert.deepEqual(await submitPublicForm('/api/contact',{},20),{responseOk:true,body:null});
 mock.mock.mockImplementation(async()=>{throw new TypeError('fixture offline')});
 await assert.rejects(submitPublicForm('/api/contact',{},20),/fixture offline/);
});
