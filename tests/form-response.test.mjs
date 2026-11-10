import assert from 'node:assert/strict';
import test from 'node:test';
import { submissionError } from '../lib/formResponse.ts';
test('Form success requires explicit ok=true and successful HTTP status',()=>{
  assert.equal(submissionError(true,{ok:true},'fallback'),null);
  assert.equal(submissionError(true,{ok:true,provider:'fixture'},'fallback'),null);
  for(const body of [null,[],{},'ok',{ok:false},{ok:'true'},{ok:1},{error:'failure'},{ok:true,error:'failure'}])assert.notEqual(submissionError(true,body,'fallback'),null);
  assert.equal(submissionError(false,{ok:true},'fallback'),'fallback');
});
test('Unexpected error payloads cannot become a React object child or false success',()=>{
  for(const body of [{error:{}},{error:[]},{error:123},{error:null},{error:' '}])assert.equal(submissionError(false,body,'fallback'),'fallback');
  assert.equal(submissionError(false,{error:' Specific failure. '},'fallback'),'Specific failure.');
  assert.equal(submissionError(false,{error:'x'.repeat(1000)},'fallback').length,300);
});
