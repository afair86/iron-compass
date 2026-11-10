import test from 'node:test';
import assert from 'node:assert/strict';
import { nativeFormFallback } from '../lib/nativeFormFallback.ts';
import { readPublicJson } from '../lib/publicRequest.ts';
const request=(headers={})=>new Request('http://localhost/api/contact',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded',accept:'text/html',...headers},body:'email=private-fixture%40example.invalid&message=private-fixture'});

test('Native form rejection is truthful, uncacheable and never reflects private values',async()=>{
 for(const kind of ['contact','signup']){
  const response=nativeFormFallback(request(),kind);
  assert.equal(response.status,415);assert.equal(response.headers.get('cache-control'),'no-store');
  assert.match(response.headers.get('content-type'),/text\/html/);
  const html=await response.text();assert.match(html,/has not been/);assert.match(html,/needs JavaScript/);assert(!html.includes('private-fixture'));
  assert(!/<script\b/i.test(html));assert.match(html,kind==='contact'?/href="\/contact"/:/href="\/blog"/);
 }
});
test('JSON API behavior and foreign-origin rejection remain separate from native fallback',async()=>{
 assert.equal(nativeFormFallback(request({accept:'application/json'}),'contact'),null);
 assert.equal(nativeFormFallback(request({'content-type':'application/json'}),'contact'),null);
 await assert.rejects(readPublicJson(request({origin:'https://untrusted.invalid'}),32768),error=>error.status===403);
 await assert.rejects(readPublicJson(request({origin:'http://localhost'}),32768),error=>error.status===415);
});
