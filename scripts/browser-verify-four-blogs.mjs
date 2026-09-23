/**
 * Browser checks for the four new blog practical tools.
 */
import { chromium } from "playwright";
import fs from "fs";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3001";

const ARTICLES = [
  {
    slug: "weekly-money-check-20-minutes",
    toolTitle: /Weekly money worksheet/i,
    fill: async (page) => {
      await page.getByLabel(/^Label$/i).first().fill("Pay");
      await page.getByLabel(/^Amount$/i).first().fill("1150");
      await page.locator("select").first().selectOption("weekly");
      await page.getByLabel(/One achievable next action/i).fill("Transfer $50 Friday");
      await page.getByRole("button", { name: /Generate checklist/i }).click();
    },
    expect: /Leftover|Next action/i,
  },
  {
    slug: "keep-your-word-honour-commitments",
    toolTitle: /Commitment planner/i,
    fill: async (page) => {
      await page.getByLabel(/The promise/i).fill("Send draft by Thursday 4pm");
      await page.getByLabel(/Next concrete action/i).fill("Block 90 minutes tomorrow");
      await page.getByLabel(/Deadline or review date/i).fill("Thu 4pm");
      await page.getByLabel(/If circumstances change/i).fill("Message Sam by Wed noon");
      await page.getByRole("button", { name: /Generate summary/i }).click();
    },
    expect: /Your commitment|Promise/i,
  },
  {
    slug: "first-useful-ai-assistant",
    toolTitle: /Editable prompt builder/i,
    fill: async (page) => {
      await page.getByLabel(/^Task$/i).fill("Plan Saturday admin");
      await page.getByLabel(/^Context$/i).fill("Two-hour window; insurance email; receipts");
      await page.getByLabel(/^Constraints$/i).fill("Max six steps; no lecture");
      await page.getByLabel(/Desired output/i).fill("Numbered plan with minutes");
      await page.getByLabel(/^Verification$/i).fill("Check steps map to notes and ~120 minutes");
      await page.getByRole("button", { name: /Build prompt/i }).click();
    },
    expect: /Task: Plan Saturday admin/,
  },
  {
    slug: "am-i-a-good-man-quiet-check-in",
    toolTitle: /A Quiet Check-In/i,
    fill: async (page) => {
      await page.getByLabel(/Value to practise/i).fill("Presence");
      await page.getByLabel(/One recent situation/i).fill("Scrolled while child spoke");
      await page.getByLabel(/One next action/i).fill("Phone away first 20 minutes after work");
      await page.getByLabel(/Review date/i).fill("Friday evening");
      await page.getByRole("button", { name: /Generate action summary/i }).click();
    },
    expect: /Your action summary|Presence/i,
  },
];

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const log = [];

  try {
    for (const article of ARTICLES) {
      const url = `${BASE}/blog/${article.slug}`;
      await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
      assert((await page.locator("h1").count()) > 0, `no h1 ${article.slug}`);
      assert(await page.getByText(/AI-generated illustration/i).count(), `no AI credit ${article.slug}`);
      assert(await page.getByRole("button", { name: /Listen/i }).count(), `Listen missing ${article.slug}`);
      await page.getByRole("heading", { name: article.toolTitle }).waitFor({ timeout: 10000 });

      // Validation: empty generate
      const genBtn = page.getByRole("button", { name: /Generate|Build prompt/i }).first();
      await genBtn.click();
      await page.locator(".ic-routine__error").waitFor({ timeout: 5000 });

      await article.fill(page);
      const result = page.locator(".ic-routine__result");
      await result.waitFor({ timeout: 8000 });
      const text = await result.innerText();
      assert(article.expect.test(text), `result mismatch ${article.slug}: ${text.slice(0, 200)}`);

      // Download
      const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.getByRole("button", { name: /Download/i }).click(),
      ]);
      const path = await download.path();
      assert(path && fs.existsSync(path), `download missing ${article.slug}`);
      const body = fs.readFileSync(path, "utf8");
      assert(body.length > 40, `download empty ${article.slug}`);

      // Clear optional / deliberate clear smoke on money worksheet
      if (article.slug === "weekly-money-check-20-minutes") {
        await page.getByRole("button", { name: /Edit worksheet/i }).click();
        await page.getByLabel(/One financial priority/i).fill("Buffer");
        await page.getByLabel(/One financial priority/i).fill("");
        await page.getByLabel(/One achievable next action/i).fill("Call insurer");
        await page.getByRole("button", { name: /Generate checklist/i }).click();
        const t2 = await page.locator(".ic-routine__result").innerText();
        assert(/Call insurer/.test(t2), "edit regenerate failed");
        assert(/None noted/.test(t2) || /Priority:\s*None/.test(t2), "cleared priority still showing");
      }

      // Prompt builder copy
      if (article.slug === "first-useful-ai-assistant") {
        await page.getByRole("button", { name: /Copy prompt/i }).click();
        await page.getByRole("button", { name: /Copied|Copy prompt/i }).waitFor();
      }

      log.push(`OK ${article.slug}`);
    }

    // Blog listing discovery
    await page.goto(`${BASE}/blog`, { waitUntil: "networkidle", timeout: 60000 });
    for (const a of ARTICLES) {
      assert(await page.locator(`a[href="/blog/${a.slug}"]`).count(), `listing missing ${a.slug}`);
    }
    log.push("OK blog listing");

    // Existing route smoke
    await page.goto(`${BASE}/blog/5am-standard-own-your-morning`, { waitUntil: "domcontentloaded", timeout: 60000 });
    assert((await page.locator("h1").count()) > 0, "5am broken");
    log.push("OK existing 5am route");

    console.log("FOUR_BLOGS_BROWSER_PASS");
    for (const line of log) console.log(line);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("FOUR_BLOGS_BROWSER_FAIL", err.message);
  process.exit(1);
});
