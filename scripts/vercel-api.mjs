import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const path = resolve(root, ".env.local");

function loadToken() {
  if (!existsSync(path)) return null;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const m = raw.match(/^VERCEL_TOKEN=(?:"([^"]+)"|(.+))$/);
    if (m) return (m[1] ?? m[2]).trim();
  }
  return null;
}

const token = loadToken();
if (!token) {
  console.error("No VERCEL_TOKEN");
  process.exit(1);
}

const projectId = process.argv[2] || "prj_kru7tmL5GZJTdtCuOUpO6IpyjtAc";
const method = process.argv[3] || "GET";
const body = process.argv[4] ? JSON.parse(process.argv[4]) : undefined;

const res = await fetch(`https://api.vercel.com/v9/projects/${projectId}`, {
  method,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: body ? JSON.stringify(body) : undefined,
});
const text = await res.text();
console.log(res.status, text);
