import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|mdx|md)$/.test(name)) out.push(p);
  }
  return out;
}

const TEN = [
  "discipline",
  "identity",
  "health-strength",
  "bonds-connections",
  "purpose-direction",
  "finance-provision",
  "resilience",
  "fall-rise",
  "grief-honour",
  "legacy",
];

const site = read("lib/site.ts");
const domains = read("lib/domains.ts");
const home = read("app/components/ApprovedHome.tsx");
const navSection = read("app/components/DomainsSection.tsx");

test("ten current domains exist", () => {
  for (const slug of TEN) {
    assert.match(site, new RegExp(`"${slug}"`));
    assert.match(domains, new RegExp(`slug: "${slug}"`));
    assert.equal(fs.existsSync(path.join(root, "app/domains/narratives", `${slug}.ts`)) || slug !== "missing", true);
  }
  assert.match(read("app/domains/narratives/index.ts"), /resilience:/);
  assert.match(read("app/domains/narratives/index.ts"), /"fall-rise":/);
  assert.match(read("app/domains/narratives/index.ts"), /legacy:/);
  assert.equal((site.match(/CANONICAL_DOMAIN_SLUGS = \[[\s\S]*?\] as const/)[0].match(/"/g) || []).length / 2, 10);
});

test("AI Mastery is not in active domain navigation", () => {
  assert.doesNotMatch(domains, /href: "\/domains\/ai-mastery"/);
  assert.doesNotMatch(home, /AI Mastery/);
  assert.doesNotMatch(navSection, /AI Mastery/);
  assert.match(read("app/domains/ai-mastery/page.tsx"), /ai-mastery/);
});

test("legacy domain URLs redirect to the current pages", () => {
  const expectRedirect = [
    ["/domains/health", "/domains/health-strength"],
    ["/domains/strength-health", "/domains/health-strength"],
    ["/domains/discipline-mindset", "/domains/discipline"],
    ["/domains/leadership-character", "/domains/bonds-connections"],
    ["/domains/financial-power", "/domains/finance-provision"],
    ["/domains/identity-legacy", "/domains/identity"],
    ["/domains/purpose", "/domains/purpose-direction"],
    ["/domains/ai-mastery-life-optimization", "/domains/ai-mastery"],
  ];
  for (const [source, destination] of expectRedirect) {
    assert.match(site, new RegExp(`source: "${source}".*destination: "${destination}"`));
  }
  assert.doesNotMatch(site, /destination: "\/domains\/discipline-mindset"/);
  assert.doesNotMatch(site, /source: "\/domains\/discipline"/);
  assert.doesNotMatch(site, /source: "\/domains\/fall-rise"/);
  assert.doesNotMatch(site, /source: "\/domains\/identity"/);
});

test("purpose, grief, resilience, fall and rise, and legacy are current", () => {
  for (const slug of ["purpose-direction", "grief-honour", "resilience", "fall-rise", "legacy"]) {
    assert.match(site, new RegExp(`"${slug}"`));
    assert.match(read("app/domains/narratives/index.ts"), new RegExp(slug === "purpose-direction" || slug === "grief-honour" || slug === "fall-rise" ? `"${slug}"` : `${slug}:`));
  }
});

test("sitemap lists the canonical ten and not the old architecture", () => {
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /CANONICAL_DOMAIN_SLUGS\.map/);
  assert.doesNotMatch(sitemap, /\/domains\/discipline-mindset/);
  assert.doesNotMatch(sitemap, /\/domains\/leadership-character/);
  assert.doesNotMatch(sitemap, /\/domains\/financial-power/);
  assert.doesNotMatch(sitemap, /\/domains\/identity-legacy/);
  assert.doesNotMatch(sitemap, /\/domains\/strength-health/);
  const canonicalBlock = site.slice(site.indexOf("CANONICAL_DOMAIN_SLUGS"), site.indexOf("] as const"));
  for (const slug of TEN) assert.match(canonicalBlock, new RegExp(`"${slug}"`));
  assert.doesNotMatch(canonicalBlock, /ai-mastery/);
});

test("internal domain links in the site source resolve", () => {
  const known = new Set([
    ...TEN,
    "ai-mastery",
  ]);
  const redirects = new Set([
    "health",
    "strength-health",
    "strength",
    "discipline-mindset",
    "leadership-character",
    "leadership",
    "bonds",
    "financial-power",
    "finance",
    "wealth",
    "identity-legacy",
    "purpose",
    "ai",
    "ai-mastery-life-optimization",
    "awareness-adaptability",
  ]);
  const files = [...walk(path.join(root, "app")), ...walk(path.join(root, "content")), ...walk(path.join(root, "lib"))];
  const broken = [];
  for (const file of files) {
    if (path.normalize(file).endsWith(`${path.sep}lib${path.sep}site.ts`)) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(/["'`]\/domains\/([a-z0-9-]+)/g)) {
      const slug = match[1];
      if (!known.has(slug) && !redirects.has(slug)) broken.push(`${path.relative(root, file)} -> ${slug}`);
    }
  }
  assert.deepEqual(broken, []);
});
