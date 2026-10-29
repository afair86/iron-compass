#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function inspectSource(root, env = process.env) {
  const git = (...args) => {
    try { return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
    catch { return null; }
  };
  const validSha = value => typeof value === 'string' && /^[a-f0-9]{40,64}$/i.test(value) ? value.toLowerCase() : null;
  const gitCommit = validSha(git('rev-parse', 'HEAD'));
  const hostedCommit = validSha(env.VERCEL_GIT_COMMIT_SHA) || validSha(env.SOURCE_STATUS_COMMIT) || validSha(env.GITHUB_SHA);
  const status = git('status', '--porcelain');
  const worktreeDirty = status === null ? null : status.length > 0;
  const metadataConflict = Boolean(hostedCommit && gitCommit && hostedCommit !== gitCommit);
  const sourceCommit = hostedCommit || gitCommit;
  return {
    schemaVersion: 1,
    sourceCommit,
    branch: env.VERCEL_GIT_COMMIT_REF || env.GITHUB_HEAD_REF || env.GITHUB_REF_NAME || git('branch', '--show-current') || null,
    sourceKind: env.VERCEL_GIT_PROVIDER === 'github' && hostedCommit ? 'vercel-git-metadata'
      : env.GITHUB_ACTIONS === 'true' && hostedCommit ? 'github-actions' : gitCommit ? 'local-git' : 'unknown',
    worktreeDirty,
    metadataConflict,
    exactCommitBuild: Boolean(sourceCommit && !metadataConflict && worktreeDirty === false),
  };
}

async function githubStatus(repo, sha, env) {
  const result = { checks: [], deployments: [], evidenceAvailable: false };
  if (!env.GITHUB_TOKEN || !repo || !sha) return result;
  const get = async route => {
    const response = await fetch(`https://api.github.com/repos/${repo}/${route}`, {
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return null;
    return response.json();
  };
  try {
    const [statuses, deployments] = await Promise.all([get(`commits/${sha}/status`), get('deployments?per_page=10')]);
    result.checks = (statuses?.statuses || []).map(s => ({ context: s.context, state: s.state, url: s.target_url }));
    result.evidenceAvailable = statuses !== null || deployments !== null;
    for (const deployment of Array.isArray(deployments) ? deployments.slice(0, 5) : []) {
      const statuses = await get(`deployments/${deployment.id}/statuses?per_page=1`);
      result.deployments.push({
        sha: deployment.sha, environment: deployment.environment,
        production: deployment.production_environment === true,
        state: statuses?.[0]?.state || 'unknown', url: statuses?.[0]?.environment_url || null,
        updatedAt: statuses?.[0]?.created_at || deployment.updated_at,
      });
    }
  } catch { /* Missing integration evidence stays unknown, never successful. */ }
  return result;
}

async function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const value = flag => args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
  const source = inspectSource(root);
  if (args.includes('--check') && (!source.sourceCommit || source.metadataConflict)) {
    throw new Error('Source identity is missing or conflicts with the checkout.');
  }
  if (args.includes('--write')) {
    const output = value('--write');
    const surface = value('--surface');
    if (!output || !['website', 'web-app'].includes(surface)) throw new Error('Provide an output path and website/web-app surface.');
    if (!source.sourceCommit || source.metadataConflict) throw new Error('Cannot stamp a build with unknown/conflicting source.');
    const target = resolve(root, output);
    mkdirSync(dirname(target), { recursive: true });
    // Public artifact contains version identity only: no environment dumps or credentials.
    writeFileSync(target, JSON.stringify({ ...source, surface, builtAt: new Date().toISOString() }, null, 2) + '\n');
    console.log(`Source version written for ${surface}: ${source.sourceCommit}`);
    return;
  }
  const map = JSON.parse(readFileSync(resolve(root, 'release/source-map.json'), 'utf8'));
  const integration = await githubStatus(process.env.GITHUB_REPOSITORY, source.sourceCommit, process.env);
  const report = { checkedAt: new Date().toISOString(), ...source, sourceMap: map, github: integration };
  console.log(JSON.stringify(report, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) {
    writeFileSync(process.env.GITHUB_STEP_SUMMARY,
      `# Iron Compass source status\n\nCommit: \`${source.sourceCommit || 'unknown'}\`\n\nBranch: \`${source.branch || 'unknown'}\`\n\nThis workflow reports source and integration evidence. It does not deploy or prove product QA.\n\n\`\`\`json\n${JSON.stringify(report, null, 2)}\n\`\`\`\n`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
