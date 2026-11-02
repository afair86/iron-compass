import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { inspectSource } from './source-status.mjs';

test('missing source stays unknown rather than pretending to be an exact release', () => {
  const result = inspectSource('/path/that/does/not/exist', {});
  assert.equal(result.sourceCommit, null);
  assert.equal(result.exactCommitBuild, false);
});
test('Vercel Git metadata works without a .git directory and does not dump unrelated env', () => {
  const result = inspectSource('/path/that/does/not/exist', { VERCEL_GIT_PROVIDER: 'github', VERCEL_GIT_COMMIT_SHA: 'a'.repeat(40), VERCEL_GIT_COMMIT_REF: 'preview', PRIVATE_TEST_VALUE: 'do-not-publish' });
  assert.equal(result.sourceKind, 'vercel-git-metadata');
  assert.equal(result.worktreeDirty, null);
  assert.equal(result.exactCommitBuild, false);
  assert.ok(!JSON.stringify(result).includes('do-not-publish'));
});
test('local dirty changes and a wrong hosted commit cannot masquerade as an exact build', () => {
  const root = mkdtempSync(join(tmpdir(), 'ic-source-test-'));
  const git = (...args) => execFileSync('git', ['-C', root, ...args], { stdio: 'pipe', encoding: 'utf8' }).trim();
  try {
    git('init'); writeFileSync(join(root, 'tracked.txt'), 'baseline\n'); git('add', 'tracked.txt');
    git('-c', 'user.name=Source QA', '-c', 'user.email=source-qa@example.invalid', 'commit', '-m', 'Synthetic fixture');
    assert.equal(inspectSource(root, {}).exactCommitBuild, true);
    writeFileSync(join(root, 'tracked.txt'), 'changed\n');
    assert.equal(inspectSource(root, {}).worktreeDirty, true);
    assert.equal(inspectSource(root, {}).exactCommitBuild, false);
    const conflict = inspectSource(root, { VERCEL_GIT_COMMIT_SHA: 'b'.repeat(40) });
    assert.equal(conflict.metadataConflict, true);
    assert.equal(conflict.exactCommitBuild, false);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
