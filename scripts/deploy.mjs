/**
 * Production deploy: load .env.local → build → vercel --prod
 * Requires VERCEL_TOKEN in .env.local (see DEPLOYMENT.md).
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

function loadEnvLocal() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return false;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
  return true;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function run(cmd, args, label) {
  const safeArgs = args.map((a) =>
    typeof a === "string" && a.startsWith("vcp_") ? "vcp_***" : a,
  );
  console.log(`\n> ${label}: ${cmd} ${safeArgs.join(" ")}\n`);
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });
  if (result.error) fail(result.error.message);
  if (result.status !== 0) process.exit(result.status ?? 1);
}

loadEnvLocal();

const token = process.env.VERCEL_TOKEN?.trim();
if (!token) {
  fail(`
Missing VERCEL_TOKEN.

One-time setup (you only do this once):
  1. Open https://vercel.com/account/tokens
  2. Create Token → name it "Cursor iron-compass" → Full Account (or scoped to team/project)
  3. Copy the token (shown once)
  4. In this repo, edit .env.local and add a new line:
       VERCEL_TOKEN=paste_token_here
  5. Tell the agent to run: npm run deploy:check

See DEPLOYMENT.md → "Deploy from Cursor (agent)".
`);
}

const linked = existsSync(resolve(root, ".vercel", "project.json"));
if (checkOnly) {
  console.log("Deploy setup OK.");
  console.log(`  VERCEL_TOKEN: set (${token.slice(0, 6)}…)`);
  console.log(`  Vercel project link: ${linked ? "yes (.vercel/project.json)" : "missing — run: npx vercel link"}`);
  process.exit(0);
}

if (!linked) {
  fail("No .vercel/project.json. Run once: npx vercel link (choose iron-compass project).");
}

// Expired OIDC from `vercel login` can override VERCEL_TOKEN and break non-interactive deploys.
delete process.env.VERCEL_OIDC_TOKEN;
process.env.VERCEL_TOKEN = token;

run("npm", ["run", "build"], "build");
run("npx", ["vercel", "--prod", "--yes", "--token", token], "deploy");
console.log("\nDeploy complete. Production: https://www.ironcompassai.com\n");
