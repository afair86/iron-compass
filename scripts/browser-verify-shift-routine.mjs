/**
 * Browser regression for Shift Worker Routine time fields.
 * Run against local review: http://127.0.0.1:3001/review/5am-routine
 */
import { chromium } from "playwright";

const URL = process.env.REVIEW_URL || "http://127.0.0.1:3001/review/5am-routine";
const BUILD = "review-build-2026-09-20-d";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function clickChoice(page, legendPart, label) {
  const fieldset = page.locator("fieldset").filter({ hasText: legendPart });
  await fieldset.getByText(label, { exact: true }).click();
}

async function fillIntro(page) {
  await clickChoice(page, "roster", "Day shifts");
  await clickChoice(page, "main priority", "Fitness and strength");
  await clickChoice(page, "sleep", "About 9 hours");
  await page.getByRole("button", { name: /Build my complete routine/i }).click();
  await page.getByLabel(/Next shift start/i).waitFor();
}

async function fillBaselineDetails(page, { blurAfter = true } = {}) {
  const fields = [
    ["Next shift start", "06:30"],
    ["Next shift finish", "18:30"],
    ["Commitment start", "08:00"],
    ["Commitment end", "08:30"],
  ];
  for (const [label, value] of fields) {
    const input = page.getByLabel(label, { exact: false });
    await input.fill("");
    await input.fill(value);
    if (blurAfter) await input.blur();
  }
  await page.getByLabel(/Commute/i).fill("25");
  await page.getByLabel(/Getting-ready/i).fill("35");
  await clickChoice(page, "Available routine time", "30 minutes");
  await clickChoice(page, "recovered", "Unusually tired");
}

async function expectBaselineResult(page) {
  const result = page.locator(".ic-routine__result");
  await result.waitFor({ timeout: 8000 });
  const text = await result.innerText();
  assert(/Effective First Block:\s*15 minutes/i.test(text), `effective minutes: ${text.slice(0, 200)}`);
  assert(/Wake:\s*05:15/.test(text), `wake: ${text}`);
  assert(/Depart:\s*06:05/.test(text), `depart: ${text}`);
  assert(/overlaps your work hours/i.test(text), "work overlap missing");
  assert(!/overlaps your work hours[\s\S]{0,280}shorter routine/i.test(text), "bad shorter advice");
  assert(/Shortening the morning First Block cannot fix/i.test(text), "cannot-fix missing");
  return text;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const log = [];

  try {
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    const build = await page.locator("[data-testid=routine-review-build]").innerText();
    assert(build.includes(BUILD), `build marker missing: ${build}`);
    log.push(`OK version marker ${BUILD}`);

    // No native time inputs on details step
    await fillIntro(page);
    const nativeCount = await page.locator('input[type="time"]').count();
    assert(nativeCount === 0, `native time inputs still present: ${nativeCount}`);
    const placeholders = await page.locator('input[placeholder="HH:MM"]').count();
    assert(placeholders >= 4, `HH:MM fields: ${placeholders}`);
    log.push("OK text HH:MM fields (no native time)");

    // 1) Rapid entry then generate immediately (no blur)
    await fillBaselineDetails(page, { blurAfter: false });
    await page.getByRole("button", { name: /Generate my routine/i }).click();
    await expectBaselineResult(page);
    log.push("OK rapid entry without blur");

    // 4) Edit → change → regenerate
    await page.getByRole("button", { name: /Edit answers/i }).click();
    await page.getByLabel(/Commute/i).fill("25");
    await page.getByLabel(/Next shift finish/i).fill("18:30");
    await page.getByRole("button", { name: /Generate my routine/i }).click();
    await expectBaselineResult(page);
    log.push("OK edit → regenerate");

    // 5) Clear both commitment times
    await page.getByRole("button", { name: /Edit answers/i }).click();
    await page.getByLabel(/Commitment start/i).fill("");
    await page.getByLabel(/Commitment end/i).fill("");
    await page.getByRole("button", { name: /Generate my routine/i }).click();
    {
      const result = page.locator(".ic-routine__result");
      await result.waitFor({ timeout: 8000 });
      const text = await result.innerText();
      assert(!/Add a commitment start time/i.test(text), "false clear-both validation");
      assert(!/Add a commitment end time/i.test(text), "false clear-both validation end");
      const err = page.locator(".ic-routine__error");
      assert((await err.count()) === 0 || !(await err.isVisible()), "error visible after clear both");
      assert(!/commitment .*overlaps/i.test(text), `commitment overlap remained: ${text.slice(0, 300)}`);
      assert(/Wake:\s*05:15/.test(text) && /Depart:\s*06:05/.test(text), "clocks after clear both");
    }
    log.push("OK clear both commitment times");

    // 6) Clear only one commitment field
    await page.getByRole("button", { name: /Edit answers/i }).click();
    await page.getByLabel(/Commitment start/i).fill("08:00");
    await page.getByLabel(/Commitment end/i).fill("");
    await page.getByRole("button", { name: /Generate my routine/i }).click();
    {
      const err = page.locator(".ic-routine__error");
      await err.waitFor({ timeout: 5000 });
      const msg = await err.innerText();
      assert(/Add a commitment end time, or clear the start time/i.test(msg), `expected end validation: ${msg}`);
    }
    log.push("OK clear only end → validation");

    await page.getByLabel(/Commitment start/i).fill("");
    await page.getByLabel(/Commitment end/i).fill("08:30");
    await page.getByRole("button", { name: /Generate my routine/i }).click();
    {
      const err = page.locator(".ic-routine__error");
      await err.waitFor({ timeout: 5000 });
      const msg = await err.innerText();
      assert(/Add a commitment start time, or clear the end time/i.test(msg), `expected start validation: ${msg}`);
    }
    log.push("OK clear only start → validation");

    // 7) Incomplete time
    await page.getByLabel(/Commitment start/i).fill("08:0");
    await page.getByLabel(/Commitment end/i).fill("");
    await page.getByRole("button", { name: /Generate my routine/i }).click();
    {
      const err = page.locator(".ic-routine__error");
      await err.waitFor({ timeout: 5000 });
      const msg = await err.innerText();
      assert(/complete time/i.test(msg), `incomplete message: ${msg}`);
      const startVal = await page.getByLabel(/Commitment start/i).inputValue();
      assert(startVal === "08:0", `editable incomplete preserved: ${startVal}`);
    }
    log.push("OK incomplete time preserved + explained");

    // 3) Change existing time and submit without clicking elsewhere
    await page.getByLabel(/Commitment start/i).fill("08:00");
    await page.getByLabel(/Commitment end/i).fill("08:30");
    await page.getByLabel(/Next shift finish/i).fill("18:45");
    // no blur — generate immediately
    await page.getByRole("button", { name: /Generate my routine/i }).click();
    {
      const result = page.locator(".ic-routine__result");
      await result.waitFor({ timeout: 8000 });
      const text = await result.innerText();
      assert(/18:45/.test(text) || /Depart:\s*06:05/.test(text), "changed finish accepted without blur");
      assert(/Wake:\s*05:15/.test(text), "wake after unblurred change");
    }
    log.push("OK change time without blur then generate");

    // 8) Repeat rapid baseline several times
    for (let i = 0; i < 3; i++) {
      await page.getByRole("button", { name: /Edit answers/i }).click();
      await page.getByLabel(/Next shift start/i).fill("0630");
      await page.getByLabel(/Next shift finish/i).fill("1830");
      await page.getByLabel(/Commitment start/i).fill("800");
      await page.getByLabel(/Commitment end/i).fill("830");
      await page.getByRole("button", { name: /Generate my routine/i }).click();
      await expectBaselineResult(page);
    }
    log.push("OK repeated rapid compact entry x3");

    // Overnight path
    await page.getByRole("button", { name: /Edit answers/i }).click();
    await page.getByRole("button", { name: /Back/i }).click();
    await clickChoice(page, "roster", "Night shifts");
    await page.getByRole("button", { name: /Build my complete routine/i }).click();
    await page.getByLabel(/Next shift start/i).fill("19:00");
    await page.getByLabel(/Next shift finish/i).fill("07:00");
    await page.locator('input[type="date"]').nth(0).fill("2026-09-20");
    await page.locator('input[type="date"]').nth(1).fill("2026-09-21");
    await page.getByLabel(/Commute/i).fill("20");
    await page.getByLabel(/Getting-ready/i).fill("20");
    await page.getByLabel(/Commitment start/i).fill("");
    await page.getByLabel(/Commitment end/i).fill("");
    await clickChoice(page, "Available routine time", "15 minutes");
    await clickChoice(page, "recovered", "Adequately rested");
    await page.getByRole("button", { name: /Generate my routine/i }).click();
    {
      const result = page.locator(".ic-routine__result");
      await result.waitFor({ timeout: 8000 });
      const text = await result.innerText();
      assert(/Depart:\s*18:40/.test(text), `overnight depart: ${text}`);
    }
    log.push("OK overnight shift");

    // Download consistency (checklist text)
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: /Download checklist/i }).click(),
    ]);
    const path = await download.path();
    assert(path, "download path");
    const fs = await import("fs");
    const checklist = fs.readFileSync(path, "utf8");
    assert(/Depart:\s*18:40/.test(checklist) || checklist.includes("18:40"), `checklist: ${checklist.slice(0, 400)}`);
    log.push("OK download checklist");

    console.log("BROWSER_ALL_PASS");
    for (const line of log) console.log(line);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("BROWSER_FAIL", err.message);
  process.exit(1);
});
