import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

/** Never run website diagnostics against an unrelated listener on a reused port. */
export async function assertLocalBuild(origin, fetcher = fetch, expectedStamp) {
  const url=new URL(origin);
  assert(url.protocol==='http:'&&['127.0.0.1','localhost','[::1]'].includes(url.hostname),'Diagnostics require a loopback HTTP origin');
  const expected=expectedStamp??JSON.parse(await readFile('public/source-version.json','utf8'));
  const response=await fetcher(new URL('/source-version.json',url),{redirect:'error',signal:AbortSignal.timeout(5000)});
  if(response.status!==200||!response.headers.get('content-type')?.includes('application/json'))throw new Error('Local server does not identify this build; start the owned website server first.');
  let actual;try{actual=await response.json();}catch{throw new Error('Local server returned an invalid build identity.');}
  assert.deepEqual(actual,expected,'Local server build identity differs from this checkout, including its build timestamp');
  return expected;
}
