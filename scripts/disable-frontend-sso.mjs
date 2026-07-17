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
const projectId = "prj_kru7tmL5GZJTdtCuOUpO6IpyjtAc";

const res = await fetch(`https://api.vercel.com/v9/projects/${projectId}`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ ssoProtection: null }),
});
const data = await res.json();
console.log(res.status, data.ssoProtection ?? data.error ?? "ok");
