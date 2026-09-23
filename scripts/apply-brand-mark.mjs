/**
 * Process the approved Iron Compass mark into website + app logo assets.
 * Source: brand/iron-compass-mark-source.png (square compass mark)
 *
 * Usage: node scripts/apply-brand-mark.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.join(__dirname, "..");
const appRoot = path.join(websiteRoot, "..", "iron-compass-ai");

const srcArg = process.argv[2];
const src = srcArg
  ? path.resolve(srcArg)
  : path.join(websiteRoot, "brand", "iron-compass-mark-source.png");

if (!fs.existsSync(src)) {
  console.error("Missing source:", src);
  process.exit(1);
}

fs.mkdirSync(path.join(websiteRoot, "brand"), { recursive: true });

/** Remove near-black background so the mark sits cleanly in the header. */
async function removeDarkBackground(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;

      // Keep bright metal + blue glow; clear deep black plate/bg.
      if (lum < 28 && sat < 0.35) {
        data[i + 3] = 0;
      } else if (lum < 48 && sat < 0.25) {
        data[i + 3] = Math.round(((lum - 28) / 20) * 255);
      }
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels } }).png({ compressionLevel: 9 }).toBuffer();
}

const meta = await sharp(src).metadata();
console.log("source", meta.width, meta.height, src);

// Keep a stable brand copy only when source is elsewhere
const brandSource = path.join(websiteRoot, "brand", "iron-compass-mark-source.png");
if (path.resolve(src) !== path.resolve(brandSource)) {
  fs.mkdirSync(path.dirname(brandSource), { recursive: true });
  await sharp(src).png().toFile(brandSource);
}
const transparent = await removeDarkBackground(await sharp(src).resize(1024, 1024, { fit: "contain" }).png().toBuffer());
await sharp(transparent).toFile(path.join(websiteRoot, "brand", "iron-compass-mark.png"));

const icon512 = await sharp(transparent).resize(512, 512, { fit: "contain" }).png().toBuffer();
const icon256 = await sharp(transparent).resize(256, 256, { fit: "contain" }).png().toBuffer();
const icon80 = await sharp(transparent).resize(160, 160, { fit: "contain" }).png().toBuffer();

// Website public assets (overwrite)
const websiteOuts = [
  [path.join(websiteRoot, "public", "iron-compass-logo-icon.png"), icon256],
  [path.join(websiteRoot, "public", "iron-compass-logo.png"), icon512],
  [path.join(websiteRoot, "app", "icon.png"), icon256],
];

for (const [out, buf] of websiteOuts) {
  await sharp(buf).toFile(out);
  console.log("wrote", out, fs.statSync(out).size);
}

// OG card: dark field + centred mark
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
      input: await sharp(transparent).resize(520, 520, { fit: "inside" }).toBuffer(),
      gravity: "center",
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(websiteRoot, "public", "iron-compass-logo-og.png"));
console.log("wrote OG", fs.statSync(path.join(websiteRoot, "public", "iron-compass-logo-og.png")).size);

// Product app (iron-compass-ai)
if (fs.existsSync(appRoot)) {
  const appTargets = [
    path.join(appRoot, "frontend", "src", "assets", "logo.png"),
    path.join(appRoot, "frontend", "public", "logo.png"),
  ];
  const brandDir = path.join(appRoot, "brand");
  fs.mkdirSync(brandDir, { recursive: true });
  await sharp(src).png().toFile(path.join(brandDir, "iron-compass-mark-source.png"));
  await sharp(transparent).toFile(path.join(brandDir, "iron-compass-mark.png"));

  for (const out of appTargets) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(icon512).toFile(out);
    console.log("wrote", out, fs.statSync(out).size);
  }
} else {
  console.warn("App repo not found at", appRoot, "— website assets only.");
}

console.log("Brand mark applied.");
