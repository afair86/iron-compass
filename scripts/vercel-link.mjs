/**
 * One-shot: link this repo to the Vercel project using VERCEL_TOKEN from .env.local.
 * Usage: node scripts/vercel-link.mjs [project-name]
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectName = process.argv[2] || "iron-compass";

function loadEnvLocal() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();
delete process.env.VERCEL_OIDC_TOKEN;
const token = process.env.VERCEL_TOKEN?.trim();
if (!token) {
  console.error("Missing VERCEL_TOKEN in .env.local");
  process.exit(1);
}

console.log(`Token present (${token.slice(0, 6)}…). Whoami:`);
let r = spawnSync("npx", ["vercel", "whoami", "--token", token], {
  cwd: root,
  encoding: "utf8",
  shell: true,
  env: process.env,
});
console.log((r.stdout || r.stderr || "").trim());
if (r.status !== 0) process.exit(r.status ?? 1);

console.log("\nProjects:");
r = spawnSync("npx", ["vercel", "project", "ls", "--token", token], {
  cwd: root,
  encoding: "utf8",
  shell: true,
  env: process.env,
});
console.log((r.stdout || r.stderr || "").trim());

console.log(`\nLinking to project "${projectName}"…`);
r = spawnSync(
  "npx",
  ["vercel", "link", "--yes", "--project", projectName, "--token", token],
  {
    cwd: root,
    encoding: "utf8",
    shell: true,
    env: process.env,
  },
);
console.log((r.stdout || "").trim());
if (r.stderr) console.error((r.stderr || "").trim());
if (r.status !== 0) {
  console.error("Link failed. If the project name differs, run: node scripts/vercel-link.mjs <exact-name>");
  process.exit(r.status ?? 1);
}

const linked = existsSync(resolve(root, ".vercel", "project.json"));
console.log(linked ? "Linked OK (.vercel/project.json present)." : "Link reported OK but project.json missing.");
