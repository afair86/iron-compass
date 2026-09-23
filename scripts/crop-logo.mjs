/**
 * @deprecated Prefer `node scripts/apply-brand-mark.mjs`
 * Kept so old docs/commands still refresh logos from the approved mark.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const result = spawnSync(process.execPath, [path.join(root, "scripts", "apply-brand-mark.mjs")], {
  cwd: root,
  stdio: "inherit",
});
process.exit(result.status ?? 1);
