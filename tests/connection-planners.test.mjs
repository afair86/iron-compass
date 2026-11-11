import test from "node:test";
import assert from "node:assert/strict";
import { buildPlan, planners, planText } from "../lib/connectionPlanners.ts";

test("a no-contact boundary produces no invitation even with no other answers", () => {
  const { plan, errors } = buildPlan("mates", { situation: "They asked for no contact" });
  assert.deepEqual(errors, {});
  assert.equal(plan.title, "Respect the request for no contact");
  assert.match(planText(plan), /Do not send an invitation/);
  assert.doesNotMatch(planText(plan), /Fancy|Hi undefined|first message/i);
});

test("an apology and a fatherhood repair cannot bypass naming your own part", () => {
  for (const [kind, situation] of [["mates", "I owe an apology"], ["fatherhood", "Repairing a moment I got wrong"]]) {
    const result = buildPlan(kind, { ...planners[kind].example, situation, repair: "  " });
    assert.ok(result.errors.repair);
    assert.equal(result.plan, undefined);
  }
});

test("missing or invalid answers never produce a partly invented plan", () => {
  const empty = buildPlan("help", { person: "Pat", task: " " });
  assert.ok(empty.errors.task);
  assert.equal(empty.plan, undefined);
  const invalid = buildPlan("fatherhood", { ...planners.fatherhood.example, stage: "Unrecognised" });
  assert.ok(invalid.errors.stage);
  assert.equal(invalid.plan, undefined);
});

test("the adult-child and apart paths respect invitation and contact arrangements", () => {
  const { plan } = buildPlan("fatherhood", { ...planners.fatherhood.example, stage: "Adult child", situation: "Keeping contact while apart" });
  assert.match(planText(plan), /invitation between adults/);
  assert.match(planText(plan), /existing arrangements/);
  assert.match(planText(plan), /Nothing was sent or scheduled/);
});

test("a generated snapshot survives later input changes and exports all visible sections", () => {
  const answers = { ...planners.help.example, person: "Renée", task: "help with the café’s first shift\nand return the keys" };
  const { plan } = buildPlan("help", answers);
  answers.task = "A completely different job";
  const download = planText(plan);
  assert.match(download, /Renée/);
  assert.match(download, /café’s first shift\nand return the keys/);
  assert.doesNotMatch(download, /A completely different job/);
  for (const section of plan.sections) {
    assert.ok(download.includes(section.title));
    assert.ok(download.includes(section.text));
  }
});
