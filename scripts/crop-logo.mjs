import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const src = path.join(
  root,
  "..",
  ".cursor",
  "projects",
  "c-Users-adamf-iron-compass",
  "assets",
  "c__Users_adamf_AppData_Roaming_Cursor_User_workspaceStorage_739230e61b276e89ad4cb9e7971dba55_images_ChatGPT_Image_May_26__2026__07_06_00_AM-b02be1fc-f955-438e-a87d-0225374e1e7d.png",
);

const outLockup = path.join(root, "public", "iron-compass-logo.png");
const outIcon = path.join(root, "public", "iron-compass-logo-icon.png");
const outOg = path.join(root, "public", "iron-compass-logo-og.png");

const base = sharp(src);
const { width = 1024, height = 1024 } = await base.metadata();
console.log("source", width, height);

const lockupHeight = Math.round(height * 0.665);

const lockupBuffer = await sharp(src)
  .extract({ left: 0, top: 0, width, height: lockupHeight })
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(lockupBuffer).toFile(outLockup);

// Icon-only: top portion of lockup (compass mark without wordmark).
const lockupMeta = await sharp(lockupBuffer).metadata();
const lockupW = lockupMeta.width ?? width;
const lockupH = lockupMeta.height ?? lockupHeight;
const iconHeight = Math.min(Math.round(lockupH * 0.62), lockupH);
console.log("lockup", lockupW, lockupH, "iconHeight", iconHeight);

await sharp(lockupBuffer)
  .extract({ left: 0, top: 0, width: lockupW, height: iconHeight })
  .png({ compressionLevel: 9 })
  .toFile(outIcon);

// OG/social: lockup on 1200x630 canvas.
await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 8, g: 14, b: 24, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(lockupBuffer).resize(880, 520, { fit: "inside" }).toBuffer(),
      gravity: "center",
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outOg);

console.log("Wrote", outLockup, outIcon, outOg);
