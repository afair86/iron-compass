import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const upstream =
  process.argv[2] || "https://frontend-adams-projects-26d15070.vercel.app";

function loadToken() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return null;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const m = raw.match(/^VERCEL_TOKEN=(?:"([^"]+)"|(.+))$/);
    if (m) return (m[1] ?? m[2]).trim();
  }
  return null;
}

const token = loadToken();
if (!token) process.exit(1);
delete process.env.VERCEL_OIDC_TOKEN;
process.env.VERCEL_TOKEN = token;

console.log(`Setting PRODUCT_APP_UPSTREAM_URL=${upstream}`);
const r = spawnSync(
  "npx",
  [
    "vercel",
    "env",
    "add",
    "PRODUCT_APP_UPSTREAM_URL",
    "production",
    "--force",
    "--token",
    token,
  ],
  {
    cwd: root,
    input: upstream,
    shell: process.platform === "win32",
    env: process.env,
    stdio: ["pipe", "inherit", "inherit"],
  },
);
process.exit(r.status ?? 1);
