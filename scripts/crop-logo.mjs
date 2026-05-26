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

const outIcon = path.join(root, "public", "iron-compass-logo-icon.png");
const outLockup = path.join(root, "public", "iron-compass-logo.png");
const outOg = path.join(root, "public", "iron-compass-logo-og.png");

const { width = 1024, height = 1024 } = await sharp(src).metadata();
console.log("source", width, height);

/** Compass mark only — stops before the IRONCOMPASS AI wordmark */
const iconHeight = Math.round(height * 0.48);
const iconSize = Math.round(width * 0.72);
const iconLeft = Math.round((width - iconSize) / 2);
const iconTop = Math.round(height * 0.03);

const iconBuffer = await sharp(src)
  .extract({
    left: iconLeft,
    top: iconTop,
    width: iconSize,
    height: Math.min(iconHeight, height - iconTop),
  })
  .png()
  .toBuffer();

/** Turn dark navy/charcoal background pixels transparent */
async function removeDarkBackground(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;

  const sample = (x, y) => {
    const i = (y * w + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  };

  const corners = [sample(0, 0), sample(w - 1, 0), sample(0, h - 1), sample(w - 1, h - 1)];
  const bg = corners.reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0]).map((v) => v / 4);

  const dist = (r, g, b) => {
    const dr = r - bg[0];
    const dg = g - bg[1];
    const db = b - bg[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const d = dist(r, g, b);
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;

      if (d < 38 || (lum < 88 && sat < 0.2)) {
        data[i + 3] = 0;
      } else if (d < 62 || lum < 105) {
        const fade = Math.min(1, Math.max(0, (d - 38) / 24));
        data[i + 3] = Math.round(fade * 255);
      }
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels } })
    .modulate({ brightness: 1.08, saturation: 1.05 })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const transparentIcon = await removeDarkBackground(iconBuffer);
await sharp(transparentIcon).toFile(outIcon);

// Full lockup (icon + wordmark) for OG / blog defaults
const lockupHeight = Math.round(height * 0.665);
const lockupBuffer = await sharp(src)
  .extract({ left: 0, top: 0, width, height: lockupHeight })
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(lockupBuffer).toFile(outLockup);

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

console.log("Wrote", outIcon, outLockup, outOg);
