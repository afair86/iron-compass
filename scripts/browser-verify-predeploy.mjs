/**
 * Pre-deploy checks: print layout, review marker scoping, Listen hidden.
 */
import { chromium } from "playwright";

const REVIEW = process.env.REVIEW_URL || "http://127.0.0.1:3001/review/5am-routine";
const PUBLISHED = process.env.PUBLISHED_URL || "http://127.0.0.1:3001/blog/5am-standard-own-your-morning";
const BUILD = "review-build-2026-09-20-d";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function clickChoice(page, legendPart, label) {
  const fieldset = page.locator("fieldset").filter({ hasText: legendPart });
  await fieldset.getByText(label, { exact: true }).click();
}

async function generateBaseline(page) {
  await clickChoice(page, "roster", "Day shifts");
  await clickChoice(page, "main priority", "Fitness and strength");
  await clickChoice(page, "sleep", "About 9 hours");
  await page.getByRole("button", { name: /Build my complete routine/i }).click();
  await page.getByLabel(/Next shift start/i).fill("06:30");
  await page.getByLabel(/Next shift finish/i).fill("18:30");
  await page.getByLabel(/Commute/i).fill("25");
  await page.getByLabel(/Getting-ready/i).fill("35");
  await page.getByLabel(/Commitment start/i).fill("08:00");
  await page.getByLabel(/Commitment end/i).fill("08:30");
  await clickChoice(page, "Available routine time", "30 minutes");
  await clickChoice(page, "recovered", "Unusually tired");
  await page.getByRole("button", { name: /Generate my routine/i }).click();
  await page.locator(".ic-routine__result").waitFor({ timeout: 8000 });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const log = [];

  try {
    // Published path: no Listen, no review build marker, no review banner
    await page.goto(PUBLISHED, { waitUntil: "networkidle", timeout: 60000 });
    const pubHtml = await page.content();
    assert(!(await page.locator("[data-testid=routine-review-build]").count()), "published has review build marker");
    assert(!pubHtml.includes(BUILD), "published HTML contains review-build string");
    assert(!(await page.getByRole("button", { name: /^Listen$/i }).count()), "published still shows Listen");
    assert(!/improved article \+ Shift Worker Routine/i.test(pubHtml), "published still has review banner");
    log.push("OK published: no Listen, no review marker, no review banner");

    // Review path: marker present, Listen hidden
    await page.goto(REVIEW, { waitUntil: "networkidle", timeout: 60000 });
    const buildText = await page.locator("[data-testid=routine-review-build]").innerText();
    assert(buildText.includes(BUILD), `review marker missing: ${buildText}`);
    assert(!(await page.getByRole("button", { name: /^Listen$/i }).count()), "review still shows Listen");
    log.push("OK review: marker present, Listen hidden");

    await generateBaseline(page);

    // Print media: checklist mode
    await page.evaluate(() => document.body.classList.add("ic-printing-routine"));
    await page.emulateMedia({ media: "print" });

    const resultVisible = await page.locator(".ic-routine__result").evaluate((el) => {
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden";
    });
    assert(resultVisible, "result not visible in print mode");

    const labelVisible = await page.locator(".ic-print-checklist-label").evaluate((el) => {
      const s = getComputedStyle(el);
      return s.display !== "none";
    });
    assert(labelVisible, "print checklist label hidden");

    const heroHidden = await page.locator(".ic-dispatch-hero").evaluate((el) => getComputedStyle(el).display === "none");
    assert(heroHidden, "hero still visible in checklist print");

    const actionsHidden = await page.locator(".ic-routine__actions").first().evaluate((el) => getComputedStyle(el).display === "none");
    assert(actionsHidden, "actions still visible in print");

    const subscribeHidden = await page.locator(".ic-routine__subscribe").evaluate((el) => getComputedStyle(el).display === "none");
    assert(subscribeHidden, "subscribe still visible in print");

    const resultBox = await page.locator(".ic-routine__result").boundingBox();
    assert(resultBox && resultBox.height > 200, `result too short / clipped: ${JSON.stringify(resultBox)}`);

    // Absolute-position clip regression: result should stay in normal flow
    const position = await page.locator(".ic-routine__result").evaluate((el) => getComputedStyle(el).position);
    assert(position === "static" || position === "relative", `result position=${position} (risk of multi-page clip)`);

    const resultText = await page.locator(".ic-routine__result").innerText();
    assert(/Wake:\s*05:15/.test(resultText), "print result missing wake");
    assert(/Depart:\s*06:05/.test(resultText), "print result missing depart");
    assert(/Effective First Block:\s*15 minutes/i.test(resultText), "print result missing effective");
    assert(/overlaps your work hours/i.test(resultText), "print result missing conflict");
    log.push("OK print checklist layout (emulated)");

    // Screen media restored: marker still only on review
    await page.emulateMedia({ media: "screen" });
    await page.evaluate(() => document.body.classList.remove("ic-printing-routine"));
    assert(await page.locator("[data-testid=routine-review-build]").isVisible(), "review marker gone after print cleanup");
    log.push("OK review marker restored after print class cleanup");

    console.log("PREDEPLOY_ALL_PASS");
    for (const line of log) console.log(line);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("PREDEPLOY_FAIL", err.message);
  process.exit(1);
});
