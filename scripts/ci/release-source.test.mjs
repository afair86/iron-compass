import assert from 'node:assert/strict';
import test from 'node:test';
import { requireCleanReleaseSource } from './release-source.mjs';

test('Release preflight rejects dirty, unknown and conflicting source rather than trusting a SHA alone',()=>{
 const clean={sourceCommit:'a'.repeat(40),worktreeDirty:false,metadataConflict:false,exactCommitBuild:true};
 assert.doesNotThrow(()=>requireCleanReleaseSource(clean));
 for(const source of [null,{}, {...clean,sourceCommit:null},{...clean,worktreeDirty:true},{...clean,worktreeDirty:null},{...clean,metadataConflict:true},{...clean,exactCommitBuild:false}]){
  assert.throws(()=>requireCleanReleaseSource(source),/Release blocked/);
 }
});
