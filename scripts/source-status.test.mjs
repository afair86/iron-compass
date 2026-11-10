import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { inspectSource, restoreEquivalentHostedConfig } from './source-status.mjs';

test('missing source stays unknown rather than pretending to be an exact release', () => {
  const result = inspectSource('/path/that/does/not/exist', {});
  assert.equal(result.sourceCommit, null);
  assert.equal(result.exactCommitBuild, false);
});

test('Hosted config correction restores formatting only and never conceals real config or unrelated changes', () => {
  const root = mkdtempSync(join(tmpdir(), 'ic-config-source-test-'));
  const git = (...args) => execFileSync('git', ['-C', root, ...args], { stdio: 'pipe', encoding: 'utf8' }).trim();
  const config = { redirects: [{ source: '/old', destination: '/new', permanent: true }] };
  const original = JSON.stringify(config) + '\n', file = join(root, 'vercel.json');
  try {
    git('init'); writeFileSync(file, original); git('add', 'vercel.json');
    git('-c', 'user.name=Source QA', '-c', 'user.email=source-qa@example.invalid', 'commit', '-m', 'Synthetic config');
    const formatted = JSON.stringify(config, null, 2) + '\n'; writeFileSync(file, formatted);
    assert.equal(restoreEquivalentHostedConfig(root, {}), false); assert.equal(readFileSync(file, 'utf8'), formatted);
    assert.equal(restoreEquivalentHostedConfig(root, { VERCEL: '1' }), true); assert.equal(readFileSync(file, 'utf8'), original);
    assert.equal(inspectSource(root, {}).exactCommitBuild, true);
    const changed = JSON.stringify({ ...config, headers: [{ source: '/app', headers: [] }] }); writeFileSync(file, changed);
    assert.equal(restoreEquivalentHostedConfig(root, { VERCEL: '1' }), false); assert.equal(readFileSync(file, 'utf8'), changed);
    assert.equal(inspectSource(root, {}).exactCommitBuild, false);
    writeFileSync(file, formatted); writeFileSync(join(root, 'unreviewed.txt'), 'fixture');
    assert.equal(restoreEquivalentHostedConfig(root, { VERCEL: '1' }), true);
    assert.equal(inspectSource(root, {}).exactCommitBuild, false, 'unrelated changes must still block exact-source status');
  } finally { rmSync(root, { recursive: true, force: true }); }
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
