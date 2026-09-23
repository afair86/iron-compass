import {
  buildRoutinePlan,
  buildStartingRecommendation,
  isCompleteHhMm,
  normalizeTimeInput,
  parseHm,
  planToChecklistText,
  effectiveRoutineMinutes,
  type DetailAnswers,
  type InitialAnswers,
} from "../lib/shiftWorkerRoutine.ts";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg);
}

/** Mirrors ShiftWorkerRoutineBuilder time onChange — empty must clear, never be ignored. */
function applyTimeChange(state: DetailAnswers, key: keyof DetailAnswers, raw: string): DetailAnswers {
  return { ...state, [key]: raw };
}

/** Mirrors submit-time normalization + commitment pair validation. */
function validateCommitmentPair(detail: DetailAnswers): string | null {
  const familyStart = detail.familyStart.trim() ? normalizeTimeInput(detail.familyStart) : "";
  const familyEnd = detail.familyEnd.trim() ? normalizeTimeInput(detail.familyEnd) : "";
  if (familyStart && !isCompleteHhMm(familyStart)) {
    return "incomplete start";
  }
  if (familyEnd && !isCompleteHhMm(familyEnd)) {
    return "incomplete end";
  }
  if (familyStart && !familyEnd) return "Add a commitment end time, or clear the start time.";
  if (!familyStart && familyEnd) return "Add a commitment start time, or clear the end time.";
  return null;
}

const dayBase: DetailAnswers = {
  shiftStart: "06:30",
  shiftEnd: "18:30",
  shiftStartDate: "",
  shiftEndDate: "",
  commuteMinutes: "25",
  readyMinutes: "35",
  familyNotes: "School drop-off",
  familyStart: "08:00",
  familyEnd: "08:30",
  routineMinutes: 30,
  recovery: "tired",
  nextShiftType: null,
  nextWorkKnown: null,
  nextWorkStart: "",
  nextWorkDate: "",
};

const dayInitial: InitialAnswers = { roster: "day", priority: "fitness", sleepNeed: 9 };

const day = buildRoutinePlan(dayInitial, dayBase);
assert(day, "day plan");
assert(day.departTime === "06:05", `depart ${day.departTime}`);
assert(day.wakeTime === "05:15", `wake ${day.wakeTime}`);
assert(day.effectiveMinutes === 15, "effective");
assert(day.familyAction.includes("15 minutes"), "family wording");
assert(
  day.conflicts.some((c) => c.includes("overlaps your work hours")),
  "work overlap",
);
assert(
  day.conflicts.every(
    (c) => !(c.includes("overlaps your work hours") && /shorter routine/i.test(c)),
  ),
  "work advice must not suggest shorter routine",
);
assert(
  day.conflicts.some((c) => c.includes("Shortening the morning First Block cannot fix")),
  "explicit cannot-fix",
);
assert(day.sleepOpportunity.includes("9"), "sleep 9");

const checklist = planToChecklistText(day, dayInitial);
assert(checklist.includes("Effective First Block: 15 minutes"), "checklist effective");
assert(checklist.includes("06:05"), "checklist depart");
assert(checklist.includes("05:15"), "checklist wake");
assert(checklist.includes("overlaps your work hours"), "checklist conflict");
assert(!/overlaps your work hours[\s\S]{0,240}shorter routine/i.test(checklist), "checklist no shorter for work");

const night = buildRoutinePlan(
  { roster: "night", priority: "family", sleepNeed: 7 },
  {
    ...dayBase,
    shiftStart: "19:00",
    shiftEnd: "07:00",
    shiftStartDate: "2026-09-20",
    shiftEndDate: "2026-09-21",
    commuteMinutes: "20",
    readyMinutes: "20",
    familyNotes: "",
    familyStart: "",
    familyEnd: "",
    routineMinutes: 15,
    recovery: "rested",
  },
);
assert(night, "night");
assert(night.departTime === "18:40", `night depart ${night.departTime}`);
assert(/shutdown|after that main sleep/i.test(night.sleepOpportunity), "night shutdown");

const nightFam = buildRoutinePlan(
  { roster: "night", priority: "family", sleepNeed: 7 },
  {
    ...dayBase,
    shiftStart: "19:00",
    shiftEnd: "07:00",
    shiftStartDate: "2026-09-20",
    shiftEndDate: "2026-09-21",
    familyStart: "21:00",
    familyEnd: "21:30",
    familyNotes: "",
    routineMinutes: 15,
    recovery: "rested",
  },
);
assert(nightFam, "night fam");
assert(nightFam.conflicts.some((c) => c.includes("overlaps the night shift")), "night family");
assert(nightFam.conflicts.some((c) => /cannot fix/i.test(c)), "night cannot shorten");

const rot = buildRoutinePlan(
  { roster: "rotating", priority: "recovery", sleepNeed: 8 },
  {
    ...dayBase,
    shiftEnd: "14:30",
    familyStart: "",
    familyEnd: "",
    familyNotes: "",
    routineMinutes: 15,
    recovery: "rested",
    nextShiftType: "night",
  },
);
assert(rot?.transition && /night/i.test(rot.transition), "rotating transition");

const off = buildRoutinePlan(
  { roster: "days_off", priority: "recovery", sleepNeed: 8 },
  {
    ...dayBase,
    shiftStart: "",
    shiftEnd: "",
    commuteMinutes: "",
    readyMinutes: "",
    familyStart: "",
    familyEnd: "",
    familyNotes: "",
    routineMinutes: 5,
    recovery: "tired",
    nextWorkKnown: "yes",
    nextWorkStart: "06:30",
    nextWorkDate: "2026-09-23",
  },
);
assert(off?.assumptions.some((a) => a.includes("06:30")), "days off next");
assert(off?.transition && /reset/i.test(off.transition), "days off note");

const missing = buildRoutinePlan(
  { roster: "day", priority: "productivity", sleepNeed: 8 },
  {
    ...dayBase,
    shiftStart: "",
    shiftEnd: "",
    commuteMinutes: "",
    readyMinutes: "",
    familyStart: "",
    familyEnd: "",
    familyNotes: "",
    routineMinutes: 15,
    recovery: "rested",
  },
);
assert(missing && !missing.wakeTime && !missing.departTime, "no invented times");
assert(missing.assumptions.some((a) => /missing/i.test(a)), "missing note");

const badDate = buildRoutinePlan(
  { roster: "night", priority: "fitness", sleepNeed: 7 },
  {
    ...dayBase,
    shiftStart: "19:00",
    shiftEnd: "07:00",
    shiftStartDate: "2026-09-21",
    shiftEndDate: "2026-09-20",
    familyStart: "",
    familyEnd: "",
    familyNotes: "",
    routineMinutes: 15,
    recovery: "rested",
  },
);
assert(badDate?.conflicts.some((c) => /finish date/i.test(c)), "bad dates");

for (const n of [7, 8, 9] as const) {
  const r = buildStartingRecommendation({ roster: "day", priority: "fitness", sleepNeed: n });
  assert(r?.sleepLine.includes(`${n} hours`), `sleep rec ${n}`);
  const p = buildRoutinePlan(
    { roster: "day", priority: "fitness", sleepNeed: n },
    {
      ...dayBase,
      familyStart: "",
      familyEnd: "",
      familyNotes: "",
      routineMinutes: 15,
      recovery: "rested",
    },
  );
  assert(p?.sleepOpportunity.includes(String(n)), `plan sleep ${n}`);
}

assert(normalizeTimeInput("06:30:00") === "06:30", "seconds");
assert(normalizeTimeInput("6:30") === "06:30", "single-digit hour");
assert(normalizeTimeInput("0630") === "06:30", "compact");
assert(normalizeTimeInput("1830") === "18:30", "compact evening");
assert(normalizeTimeInput("") === "", "empty normalize");
assert(normalizeTimeInput("  ") === "", "blank normalize");
assert(isCompleteHhMm("06:30"), "complete");
assert(isCompleteHhMm("630") === true, "compact complete after normalize");
assert(!isCompleteHhMm("6:3"), "incomplete");
assert(!isCompleteHhMm(""), "empty incomplete");
assert(!!parseHm("18:30:00"), "parse finish seconds");
assert(effectiveRoutineMinutes(30, "tired") === 15, "eff");

// Regression: deliberate clear of both commitment times must succeed (old ignore-empty bug)
let form = { ...dayBase };
form = applyTimeChange(form, "familyStart", "");
form = applyTimeChange(form, "familyEnd", "");
assert(form.familyStart === "" && form.familyEnd === "", "clears both");
assert(validateCommitmentPair(form) === null, "clear both: no pair error");
const clearedPlan = buildRoutinePlan(dayInitial, { ...form, familyNotes: "" });
assert(clearedPlan, "cleared plan builds");
assert(
  !clearedPlan.conflicts.some((c) => /commitment/i.test(c) && /overlap/i.test(c)),
  "no commitment overlap after clear both",
);

// Regression: clear only end → validation
form = applyTimeChange({ ...dayBase }, "familyEnd", "");
assert(validateCommitmentPair(form) === "Add a commitment end time, or clear the start time.", "clear end only");

// Regression: clear only start → validation
form = applyTimeChange({ ...dayBase }, "familyStart", "");
assert(validateCommitmentPair(form) === "Add a commitment start time, or clear the end time.", "clear start only");

// Regression: rapid entry without blur — raw values still normalize on submit path
const rapid: DetailAnswers = {
  ...dayBase,
  shiftStart: "0630",
  shiftEnd: "1830",
  familyStart: "8:00",
  familyEnd: "830",
};
const rapidNorm: DetailAnswers = {
  ...rapid,
  shiftStart: normalizeTimeInput(rapid.shiftStart),
  shiftEnd: normalizeTimeInput(rapid.shiftEnd),
  familyStart: normalizeTimeInput(rapid.familyStart),
  familyEnd: normalizeTimeInput(rapid.familyEnd),
};
assert(rapidNorm.shiftStart === "06:30" && rapidNorm.shiftEnd === "18:30", "rapid shift normalize");
assert(rapidNorm.familyStart === "08:00" && rapidNorm.familyEnd === "08:30", "rapid family normalize");
assert(validateCommitmentPair(rapidNorm) === null, "rapid pair ok");
const rapidPlan = buildRoutinePlan(dayInitial, rapidNorm);
assert(rapidPlan?.wakeTime === "05:15" && rapidPlan.departTime === "06:05", "rapid plan clocks");
assert(rapidPlan.effectiveMinutes === 15, "rapid effective");
assert(rapidPlan.conflicts.some((c) => c.includes("overlaps your work hours")), "rapid work overlap");

// Incomplete time stays editable (normalize leaves incomplete raw; validation blocks submit)
assert(normalizeTimeInput("06:3") === "06:3", "preserve incomplete");
assert(!isCompleteHhMm("06:3"), "incomplete blocked");

console.log("ALL_PASS", {
  depart: day.departTime,
  wake: day.wakeTime,
  effective: day.effectiveMinutes,
  workAdvice: day.conflicts.find((c) => c.includes("work hours"))?.slice(0, 160),
});
