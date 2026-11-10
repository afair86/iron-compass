import test from 'node:test';
import assert from 'node:assert/strict';
import { assertLocalBuild } from '../scripts/quality/local-build-identity.mjs';
// Tests run before the production build in CI, so no generated stamp is required.
const expected={schemaVersion:1,sourceCommit:'reviewed-fixture',builtAt:'2026-11-10T00:00:00Z',worktreeDirty:true};

test('Diagnostics accept the exact local build including timestamp',async()=>{
 const actual=await assertLocalBuild('http://127.0.0.1:3110',async()=>Response.json(expected),expected);
 assert.deepEqual(actual,expected);
});
test('Diagnostics reject stale identities, non-JSON listeners and non-loopback destinations',async()=>{
 await assert.rejects(assertLocalBuild('http://127.0.0.1:3110',async()=>Response.json({...expected,builtAt:'2000-01-01T00:00:00Z'}),expected),/differs from this checkout/);
 await assert.rejects(assertLocalBuild('http://127.0.0.1:3110',async()=>new Response('<html>Unrelated site</html>',{status:404,headers:{'content-type':'text/html'}}),expected),/does not identify this build/);
 await assert.rejects(assertLocalBuild('http://127.0.0.1:3110',async()=>new Response('not JSON',{headers:{'content-type':'application/json'}}),expected),/invalid build identity/);
 let calls=0;
 await assert.rejects(assertLocalBuild('https://example.com',async()=>{calls++;return Response.json(expected)}),/loopback HTTP/);
 assert.equal(calls,0);
});
