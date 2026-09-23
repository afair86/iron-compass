export type RosterType = "day" | "night" | "rotating" | "days_off";
export type Priority = "fitness" | "family" | "productivity" | "recovery";
export type SleepNeed = 7 | 8 | 9;
export type RoutineMinutes = 5 | 15 | 30;
export type RecoveryFeel = "rested" | "tired" | "not_sure";

export type InitialAnswers = {
  roster: RosterType | null;
  priority: Priority | null;
  sleepNeed: SleepNeed | null;
};

export type DetailAnswers = {
  shiftStart: string; // HH:MM
  shiftEnd: string;
  shiftStartDate: string;
  shiftEndDate: string;
  commuteMinutes: string;
  readyMinutes: string;
  familyNotes: string;
  familyStart: string;
  familyEnd: string;
  routineMinutes: RoutineMinutes | null;
  recovery: RecoveryFeel | null;
  nextShiftType: "day" | "night" | "not_sure" | null;
  nextWorkKnown: "yes" | "no" | "not_sure" | null;
  nextWorkStart: string;
  nextWorkDate: string;
};

export type StartingRecommendation = {
  summary: string;
  sleepLine: string;
  caveats: string[];
};

export type RoutinePlan = {
  explanation: string;
  assumptions: string[];
  sleepOpportunity: string;
  wakeTime: string | null;
  departTime: string | null;
  firstBlock: string[];
  movementOrTraining: string;
  familyAction: string;
  nextShiftPrep: string;
  windDown: string;
  fallback: string;
  transition: string | null;
  conflicts: string[];
  professionalNote: string;
  requestedMinutes: number;
  effectiveMinutes: number;
};

/** Accept HH:MM, H:MM, HH:MM:SS, or HHMM; return HH:MM. Empty stays empty. */
export function normalizeTimeInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const withSeconds = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(trimmed);
  if (withSeconds) {
    const h = Number(withSeconds[1]);
    const m = Number(withSeconds[2]);
    if (h > 23 || m > 59) return trimmed;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }

  const compact = /^(\d{3,4})$/.exec(trimmed);
  if (compact) {
    const digits = compact[1].padStart(4, "0");
    const h = Number(digits.slice(0, 2));
    const m = Number(digits.slice(2, 4));
    if (h > 23 || m > 59) return trimmed;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }

  return trimmed;
}

export function isCompleteHhMm(value: string): boolean {
  if (!value.trim()) return false;
  const normalized = normalizeTimeInput(value);
  return /^\d{2}:\d{2}$/.test(normalized);
}

export function parseMinutes(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0 || n > 240) return null;
  return Math.round(n);
}

export function parseHm(value: string): { h: number; m: number } | null {
  const normalized = normalizeTimeInput(value);
  const match = /^(\d{1,2}):(\d{2})$/.exec(normalized);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return { h, m };
}

function toMinutes(hm: { h: number; m: number }) {
  return hm.h * 60 + hm.m;
}

function fromMinutes(total: number) {
  const normalized = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

/** Effective First Block length after fatigue adjustment. */
export function effectiveRoutineMinutes(
  requested: RoutineMinutes,
  recovery: RecoveryFeel,
): RoutineMinutes {
  if (recovery === "tired" && requested === 30) return 15;
  if (recovery === "tired" && requested === 15) return 5;
  return requested;
}

export function buildStartingRecommendation(answers: InitialAnswers): StartingRecommendation | null {
  if (!answers.roster || !answers.priority || !answers.sleepNeed) return null;

  const sleep = answers.sleepNeed;
  const sleepLine = `Plan for approximately ${sleep} hours of sleep per 24 hours, adjusting for your actual needs and accumulated fatigue. This is a planning estimate — not a limit, and not a recommendation to reduce sleep.`;

  const rosterBit =
    answers.roster === "day"
      ? "For day shifts, choose a wake time that leaves enough sleep before departure and room for a realistic First Block."
      : answers.roster === "night"
        ? "For night shifts, protect shutdown after finishing work, then run your First Block after the main sleep."
        : answers.roster === "rotating"
          ? "For rotating shifts, set an anchor for each shift type rather than one weekly wake time."
          : "On days off, keep a small beginning after recovery sleep without turning the whole day into a productivity test.";

  const priorityBit =
    answers.priority === "fitness"
      ? "Schedule training when you’re adequately rested, with shorter sessions available on demanding days."
      : answers.priority === "family"
        ? "Keep family handovers and shared agreements in the plan before you add extras."
        : answers.priority === "productivity"
          ? "Use the First Block for one clear standard and one next action toward a personal goal — not a full task dump."
          : "Prioritise sleep opportunity and easy movement before hard training.";

  return {
    summary: `${rosterBit} ${priorityBit}`,
    sleepLine,
    caveats: [
      "These three answers are not enough to calculate an exact clock schedule.",
      "Build the complete routine next with departure, commute, and recovery details.",
    ],
  };
}

function rangesOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  // Treat end <= start as crossing midnight for the A or B range.
  const expand = (s: number, e: number): Array<[number, number]> => {
    if (e > s) return [[s, e]];
    if (e === s) return [[s, e]];
    return [
      [s, 24 * 60],
      [0, e],
    ];
  };
  for (const [as, ae] of expand(aStart, aEnd)) {
    for (const [bs, be] of expand(bStart, bEnd)) {
      if (as < be && bs < ae) return true;
    }
  }
  return false;
}

export function buildRoutinePlan(initial: InitialAnswers, detail: DetailAnswers): RoutinePlan | null {
  if (!initial.roster || !initial.priority || !initial.sleepNeed) return null;
  if (!detail.routineMinutes || !detail.recovery) return null;

  const sleepNeed = initial.sleepNeed;
  const requestedMinutes = detail.routineMinutes;
  const minutes = effectiveRoutineMinutes(requestedMinutes, detail.recovery);
  const commute = parseMinutes(detail.commuteMinutes);
  const ready = parseMinutes(detail.readyMinutes);
  const start = parseHm(detail.shiftStart);
  const end = parseHm(detail.shiftEnd);
  const familyStart = parseHm(detail.familyStart);
  const familyEnd = parseHm(detail.familyEnd);

  const assumptions: string[] = [
    `Selected sleep planning estimate: about ${sleepNeed} hours of actual sleep per 24 hours (time in bed is not the same as sleep).`,
    `Requested First Block: ${requestedMinutes} minutes.`,
    minutes !== requestedMinutes
      ? `Effective First Block after fatigue adjustment: ${minutes} minutes (shortened because you reported unusual fatigue).`
      : `Effective First Block: ${minutes} minutes.`,
    `Recovery self-report: ${detail.recovery === "rested" ? "adequately rested" : detail.recovery === "tired" ? "unusually tired" : "not sure"}.`,
  ];

  if (detail.familyStart || detail.familyEnd || detail.familyNotes.trim()) {
    const timed =
      familyStart && familyEnd
        ? `Structured commitment window: ${normalizeTimeInput(detail.familyStart)}–${normalizeTimeInput(detail.familyEnd)}.`
        : "No structured commitment start/end times entered — free-text notes are kept for context only and are not auto-checked for clashes.";
    assumptions.push(timed);
    if (detail.familyNotes.trim()) {
      assumptions.push(`Family / caring notes (context only): ${detail.familyNotes.trim()}`);
    }
  } else {
    assumptions.push("No fixed family commitments entered.");
  }

  const conflicts: string[] = [];
  let wakeTime: string | null = null;
  let departTime: string | null = null;
  let sleepOpportunity = `Protect a sleep opportunity long enough for roughly ${sleepNeed} hours of actual sleep across 24 hours. Time in bed is not guaranteed sleep.`;

  if (minutes !== requestedMinutes) {
    conflicts.push(
      `You asked for ${requestedMinutes} minutes and reported unusual fatigue. This plan uses an effective ${minutes}-minute First Block instead — shown consistently below, including family wording.`,
    );
  }

  const hardTrainingOk = detail.recovery === "rested" && initial.priority === "fitness";
  const movementOrTraining =
    detail.recovery === "tired"
      ? "Skip hard training today. Use easy movement only (walk / mobility), or rest if even that feels forced."
      : hardTrainingOk
        ? minutes >= 30
          ? "Planned training option: warm up 3–5 minutes, then a focused session. Keep a shorter cut-down version ready if departure gets tight."
          : minutes === 15
            ? "Short training option only if warm-up + main set fit cleanly. Otherwise use easy movement and schedule the full session later."
            : "Five minutes is for wake cue + writing the standard/next action — not a workout. Schedule training when there is more room."
        : initial.priority === "recovery"
          ? "Easy movement or quiet recovery first. Training can wait until you feel more human."
          : "Easy movement is enough inside the First Block unless you already feel adequately rested and have spare time.";

  const familyAction = `Agree the protected window out loud if others are affected: “I’ll take ${minutes} minutes after I wake, then I’ll join breakfast / handover.”${
    detail.familyNotes.trim() ? ` Notes kept for context: ${detail.familyNotes.trim()}.` : ""
  }${
    !(familyStart && familyEnd) && detail.familyNotes.trim()
      ? " Free-text notes are not automatically checked for timetable clashes — add structured start/end times above if you want overlap detection."
      : ""
  }`;

  const firstBlock =
    minutes === 5
      ? [
          "Wake cue: light, water, stand up.",
          detail.recovery === "tired" ? "Skip training. Stay with the minimum." : "Write one standard and one next action.",
          "Take the first step, or schedule it if it can’t start yet.",
        ]
      : minutes === 15
        ? [
            "Wake cue: light, water, stand up.",
            detail.recovery === "tired"
              ? "Easy movement only — no hard training while unusually tired."
              : "Easy movement (or a tiny warm-up only if training truly fits).",
            "Write one standard and one next action.",
            "Take the first step or schedule it.",
          ]
        : [
            "Wake cue: light, water, stand up.",
            hardTrainingOk
              ? "Warm up, then a focused training block sized to the time left before departure."
              : "Easy movement or practical household setup — not a hard session if recovery is shaky.",
            "Write one standard and one next action.",
            "Take the first step or schedule the remainder.",
          ];

  const isDayLike =
    initial.roster === "day" || (initial.roster === "rotating" && detail.nextShiftType === "day");
  const isNightLike =
    initial.roster === "night" || (initial.roster === "rotating" && detail.nextShiftType === "night");

  const canScheduleDay = Boolean(isDayLike && start && commute !== null && ready !== null);

  if (canScheduleDay && start && commute !== null && ready !== null) {
    const depart = toMinutes(start) - commute;
    const readyStart = depart - ready;
    const blockEnd = readyStart;
    const blockStart = blockEnd - minutes;
    const wake = blockStart; // First Block starts at wake for this worked sequence
    // Sleep opportunity sized for actual-sleep target + modest fall-asleep buffer (30 min)
    const fallAsleepBuffer = 30;
    const sleepStart = wake - sleepNeed * 60 - fallAsleepBuffer;

    departTime = fromMinutes(depart);
    wakeTime = fromMinutes(wake);
    sleepOpportunity = `Proposed sleep opportunity: about ${fromMinutes(sleepStart)} → ${fromMinutes(wake)}. That allows roughly ${sleepNeed} hours of actual sleep plus about ${fallAsleepBuffer} minutes to fall asleep. Time in bed is not guaranteed sleep. Assumptions: ${ready} minutes getting ready after the First Block, ${commute} minutes commute, departure ${fromMinutes(depart)}, shift start ${normalizeTimeInput(detail.shiftStart)}, no extra gate/arrival buffer beyond commute.`;

    assumptions.push(
      `Timed morning sequence uses effective ${minutes}-minute First Block, then ${ready} minutes getting ready, then depart ${fromMinutes(depart)}.`,
    );

    if (ready + commute + minutes > 8 * 60) {
      conflicts.push(
        "Preparation + commute + routine are taking a very large share of the morning. Consider the 5- or 15-minute fallback.",
      );
    }

    // Family structured overlap with work / commute / prep / first block / sleep opportunity
    if (familyStart && familyEnd) {
      const f0 = toMinutes(familyStart);
      const f1 = toMinutes(familyEnd);
      const workStart = toMinutes(start);
      const workEnd = end ? toMinutes(end) : workStart + 8 * 60;
      const overlapsWork = rangesOverlap(f0, f1, workStart, workEnd);
      const overlapsCommute = rangesOverlap(f0, f1, depart, workStart);
      const overlapsPrep = rangesOverlap(f0, f1, readyStart, depart);
      const overlapsBlock = rangesOverlap(f0, f1, blockStart, blockEnd);
      const overlapsSleep = rangesOverlap(f0, f1, sleepStart, wake);
      const windowLabel = `${normalizeTimeInput(detail.familyStart)}–${normalizeTimeInput(detail.familyEnd)}`;

      if (overlapsWork) {
        conflicts.push(
          `Unresolved conflict: your commitment ${windowLabel} overlaps your work hours (${normalizeTimeInput(detail.shiftStart)}–${end ? normalizeTimeInput(detail.shiftEnd) : "shift end"}). Shortening the morning First Block cannot fix this. Options: move the commitment outside work hours, arrange coverage if that is genuinely available to you, or discuss work arrangements. This plan does not assume another adult is free, and it does not treat the clash as resolved.`,
        );
      }
      if (overlapsCommute && !overlapsWork) {
        conflicts.push(
          `Unresolved conflict: your commitment ${windowLabel} overlaps the commute window (depart ${fromMinutes(depart)} → start ${normalizeTimeInput(detail.shiftStart)}). Shortening the First Block will not clear this. Options: move the commitment, or change travel/handover arrangements — without assuming the commute can simply be shortened.`,
        );
      }
      if (overlapsPrep && !overlapsWork && !overlapsCommute) {
        conflicts.push(
          `Unresolved conflict: your commitment ${windowLabel} overlaps getting-ready time (${fromMinutes(readyStart)}–${fromMinutes(depart)}). Essential preparation should stay intact. Options: move the commitment, or change who handles that window if coverage is truly available — not assumed.`,
        );
      }
      if (overlapsBlock && !overlapsWork && !overlapsCommute && !overlapsPrep) {
        conflicts.push(
          `Conflict with the First Block (${fromMinutes(blockStart)}–${fromMinutes(blockEnd)}): your commitment ${windowLabel} lands in the routine window. Options that can actually help here: move the commitment, shift the First Block earlier/later if sleep still allows, or shorten the routine so the block no longer overlaps.`,
        );
      }
      if (overlapsSleep) {
        conflicts.push(
          `Unresolved conflict: your commitment ${windowLabel} overlaps the proposed sleep opportunity (${fromMinutes(sleepStart)}–${fromMinutes(wake)}). This plan will not silently cut your selected ~${sleepNeed}-hour sleep need. Options: move the commitment, change the surrounding schedule, or accept that sleep and that commitment cannot both sit there unchanged.`,
        );
      }
    }
  } else if (isDayLike) {
    const missing: string[] = [];
    if (!start) missing.push("shift start time");
    if (commute === null) missing.push("commute minutes");
    if (ready === null) missing.push("getting-ready minutes");
    assumptions.push(
      missing.length
        ? `Exact wake/depart times not calculated — missing or unreadable: ${missing.join(", ")}. Enter valid times to get a clocked plan.`
        : "Exact wake/depart times not calculated — add shift start, commute, and getting-ready time for a clocked plan.",
    );
  }

  if (isNightLike) {
    const finishLabel = end ? normalizeTimeInput(detail.shiftEnd) : "finish";
    sleepOpportunity =
      end && commute !== null
        ? `After finish (~${finishLabel}), allow ~${commute} minutes to get home, then use shutdown for wind-down. Protect a main sleep opportunity of roughly ${sleepNeed} hours of actual sleep (plus time to fall asleep). Run the ${minutes}-minute First Block after that main sleep — not as soon as you walk in.`
        : `After the night shift, use shutdown first. Protect a main sleep opportunity of roughly ${sleepNeed} hours. First Block (${minutes} minutes) comes after that sleep.`;
    wakeTime = null;
    departTime = start && commute !== null ? fromMinutes(toMinutes(start) - commute) : null;
    if (start && commute !== null) {
      assumptions.push("Departure time below is for getting to the night shift, not for the post-sleep First Block.");
    } else if (!start || commute === null) {
      assumptions.push("Night-shift departure not calculated — add shift start and commute if you want a clock time.");
    }

    if (familyStart && familyEnd && start && end) {
      const f0 = toMinutes(familyStart);
      const f1 = toMinutes(familyEnd);
      if (rangesOverlap(f0, f1, toMinutes(start), toMinutes(end))) {
        conflicts.push(
          `Unresolved conflict: your commitment ${normalizeTimeInput(detail.familyStart)}–${normalizeTimeInput(detail.familyEnd)} overlaps the night shift itself (${normalizeTimeInput(detail.shiftStart)}–${normalizeTimeInput(detail.shiftEnd)}). Shortening the First Block cannot fix a work-hours clash. Options: move the commitment, arrange coverage if that is genuinely available to you, or discuss work arrangements. This plan does not assume another adult is free.`,
        );
      }
    }
  }

  if (initial.roster === "days_off") {
    sleepOpportunity = `On days off, prioritise recovery sleep first (about ${sleepNeed} hours’ actual-sleep opportunity across 24 hours, adjusted for fatigue, plus time to fall asleep). Keep a ${minutes}-minute First Block after the main sleep.`;
    if (detail.nextWorkKnown === "yes" && detail.nextWorkStart) {
      assumptions.push(
        `Next work start noted: ${detail.nextWorkDate || "(date not set)"} ${normalizeTimeInput(detail.nextWorkStart)}.`,
      );
    }
  }

  // Date sanity for overnight
  if (detail.shiftStartDate && detail.shiftEndDate && detail.shiftEndDate < detail.shiftStartDate) {
    conflicts.push(
      "Finish date is before start date. For overnight shifts, set the finish on the next calendar day.",
    );
  }
  if (start && end && isNightLike && detail.shiftStartDate && !detail.shiftEndDate) {
    assumptions.push("Overnight finish date not set — times are still used; add the finish date if the shift crosses midnight.");
  }

  if (detail.recovery === "tired" && canScheduleDay) {
    conflicts.push(
      "Because you reported unusual fatigue, protect sleep first. This plan does not shorten the sleep opportunity to keep training.",
    );
  }

  const windDown =
    isNightLike
      ? "Wind-down cue after finishing: lower light, light food if needed, phone out of the sleep space, into bed for the main sleep opportunity."
      : "Wind-down cue before the next sleep: short walk or shower, lights down, phone out of the bedroom, caffeine cut relative to that sleep opportunity.";

  const nextShiftPrep =
    initial.priority === "family"
      ? "Prep the next handover early: bags, breakfast pieces, who is on deck, and when your protected window starts."
      : "Prep the next shift while your head is clear: kit, meals, keys, travel plan, and one line for the next standard.";

  const fallback =
    "Disrupted-day fallback (5 minutes): water, write today’s standard + next action, take the first step or schedule it. Protect the next sleep opportunity.";

  const transition =
    initial.roster === "rotating"
      ? detail.nextShiftType === "night"
        ? "Transition note: plan the next sleep opportunity before nights begin. Avoid staying awake all day just to force a reset."
        : detail.nextShiftType === "day"
          ? "Transition note: plan sleep opportunities before returning to early days. Keep the day-shift First Block attached to wake time."
          : "Transition note: when you know the next shift type, set that shift’s anchor and sleep opportunity before the changeover."
      : initial.roster === "days_off"
        ? "Days-off note: do not stay awake after a final night just to force a daytime reset. Recover first, then keep a small beginning."
        : null;

  const explanation = [
    `This plan follows your ${initial.roster.replace("_", " ")} roster selection, ${initial.priority} priority, and ~${sleepNeed}-hour sleep estimate.`,
    minutes !== requestedMinutes
      ? `Requested routine ${requestedMinutes} minutes; effective routine ${minutes} minutes after fatigue adjustment.`
      : `Effective routine length: ${minutes} minutes.`,
    "It uses simple scheduling rules (counting backwards from departure when enough detail exists).",
    "It is not medical advice and cannot certify fitness to drive or do safety-critical work.",
  ].join(" ");

  return {
    explanation,
    assumptions,
    sleepOpportunity,
    wakeTime,
    departTime,
    firstBlock,
    movementOrTraining,
    familyAction,
    nextShiftPrep,
    windDown,
    fallback,
    transition,
    conflicts,
    professionalNote:
      "If sleep problems keep stacking, or you feel excessive sleepiness, speak with a health professional. A routine is support — not a diagnosis.",
    requestedMinutes,
    effectiveMinutes: minutes,
  };
}

export function planToChecklistText(plan: RoutinePlan, initial: InitialAnswers): string {
  const lines = [
    "Iron Compass — Shift Worker Routine",
    "=================================",
    "",
    plan.explanation,
    "",
    `Requested First Block: ${plan.requestedMinutes} minutes`,
    `Effective First Block: ${plan.effectiveMinutes} minutes`,
    "",
    "Assumptions",
    ...plan.assumptions.map((a) => `- ${a}`),
    "",
    "Sleep opportunity",
    plan.sleepOpportunity,
    "",
    plan.wakeTime ? `Wake (proposed): ${plan.wakeTime}` : "Wake: not calculated from the details provided",
    plan.departTime ? `Depart (proposed): ${plan.departTime}` : "Depart: not calculated from the details provided",
    "",
    "First Block",
    ...plan.firstBlock.map((s, i) => `${i + 1}. ${s}`),
    "",
    "Movement / training",
    plan.movementOrTraining,
    "",
    "Family / household",
    plan.familyAction,
    "",
    "Next-shift prep",
    plan.nextShiftPrep,
    "",
    "Wind-down",
    plan.windDown,
    "",
    "Fallback",
    plan.fallback,
  ];
  if (plan.transition) {
    lines.push("", "Transition", plan.transition);
  }
  if (plan.conflicts.length) {
    lines.push("", "Conflicts / adjustments", ...plan.conflicts.map((c) => `- ${c}`));
  }
  lines.push("", plan.professionalNote, "", `Priority selected: ${initial.priority}`, `Roster selected: ${initial.roster}`, "");
  return lines.join("\n");
}
