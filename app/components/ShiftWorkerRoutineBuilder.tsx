"use client";

import { useEffect, useId, useMemo, useRef, useState, type RefObject } from "react";
import EmailCaptureForm from "@/app/components/EmailCaptureForm";
import {
  buildRoutinePlan,
  buildStartingRecommendation,
  isCompleteHhMm,
  normalizeTimeInput,
  planToChecklistText,
  type DetailAnswers,
  type InitialAnswers,
  type Priority,
  type RecoveryFeel,
  type RosterType,
  type RoutineMinutes,
  type SleepNeed,
} from "@/lib/shiftWorkerRoutine";

/** Local review build marker — only rendered when showReviewBuild is true. */
export const ROUTINE_REVIEW_BUILD = "review-build-2026-09-20-d";

const initialBlank: InitialAnswers = { roster: null, priority: null, sleepNeed: null };

const detailBlank: DetailAnswers = {
  shiftStart: "",
  shiftEnd: "",
  shiftStartDate: "",
  shiftEndDate: "",
  commuteMinutes: "",
  readyMinutes: "",
  familyNotes: "",
  familyStart: "",
  familyEnd: "",
  routineMinutes: null,
  recovery: null,
  nextShiftType: null,
  nextWorkKnown: null,
  nextWorkStart: "",
  nextWorkDate: "",
};

function ChoiceGroup<T extends string | number>({
  legend,
  name,
  value,
  options,
  onChange,
  hint,
}: {
  legend: string;
  name: string;
  value: T | null;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  hint?: string;
}) {
  const groupId = useId();
  return (
    <fieldset className="ic-routine__fieldset" aria-describedby={hint ? `${groupId}-hint` : undefined}>
      <legend className="ic-routine__legend">{legend}</legend>
      {hint ? (
        <p id={`${groupId}-hint`} className="ic-routine__hint">
          {hint}
        </p>
      ) : null}
      <div className="ic-routine__choices" role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const selected = value === opt.value;
          const id = `${name}-${String(opt.value)}`;
          return (
            <label key={id} className={selected ? "ic-routine__choice is-selected" : "ic-routine__choice"} htmlFor={id}>
              <input
                id={id}
                type="radio"
                name={name}
                value={String(opt.value)}
                checked={selected}
                onChange={() => onChange(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Plain HH:MM text field — avoids unreliable native time-picker empty events. */
function TimeTextField({
  id,
  label,
  value,
  onChange,
  onBlurNormalize,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlurNormalize: (raw: string) => void;
}) {
  return (
    <label className="ic-routine__field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="HH:MM"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlurNormalize(e.target.value)}
        aria-describedby={`${id}-format`}
      />
      <span id={`${id}-format`} className="ic-routine__field-hint">
        24-hour time, e.g. 06:30 or 1830. Leave blank if unknown.
      </span>
    </label>
  );
}

type ShiftWorkerRoutineBuilderProps = {
  /** Local review only — never enable on the published article. */
  showReviewBuild?: boolean;
};

export default function ShiftWorkerRoutineBuilder({
  showReviewBuild = false,
}: ShiftWorkerRoutineBuilderProps) {
  const [step, setStep] = useState<"intro" | "details" | "result">("intro");
  const [initial, setInitial] = useState<InitialAnswers>(initialBlank);
  const [detail, setDetail] = useState<DetailAnswers>(detailBlank);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLElement | null>(null);
  // Always read latest detail on submit (avoids stale closure if Generate is pressed mid-update).
  const detailRef = useRef(detail);
  detailRef.current = detail;

  const printChecklist = () => {
    const root = document.body;
    const clear = () => {
      root.classList.remove("ic-printing-routine");
      window.removeEventListener("afterprint", clear);
    };
    root.classList.add("ic-printing-routine");
    window.addEventListener("afterprint", clear);
    // Fallback if afterprint is delayed/missing in some browsers.
    window.setTimeout(clear, 2000);
    window.print();
  };

  const starting = useMemo(() => buildStartingRecommendation(initial), [initial]);
  const plan = useMemo(() => (step === "result" ? buildRoutinePlan(initial, detail) : null), [step, initial, detail]);

  useEffect(() => {
    if (step === "result" && resultRef.current) {
      resultRef.current.focus();
    }
  }, [step]);

  const updateInitial = <K extends keyof InitialAnswers>(key: K, value: InitialAnswers[K]) => {
    setInitial((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const updateDetail = <K extends keyof DetailAnswers>(key: K, value: DetailAnswers[K]) => {
    setDetail((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const onTimeChange = (
    key: "shiftStart" | "shiftEnd" | "nextWorkStart" | "familyStart" | "familyEnd",
    raw: string,
  ) => {
    // Allow deliberate clear (empty string). Do not suppress empties.
    updateDetail(key, raw);
  };

  const onTimeBlur = (
    key: "shiftStart" | "shiftEnd" | "nextWorkStart" | "familyStart" | "familyEnd",
    raw: string,
    label: string,
  ) => {
    if (!raw.trim()) {
      updateDetail(key, "");
      return;
    }
    const normalized = normalizeTimeInput(raw);
    if (!isCompleteHhMm(normalized)) {
      setError(`Check ${label} — enter a complete time (HH:MM), or clear the field.`);
      return;
    }
    updateDetail(key, normalized);
  };

  const goDetails = () => {
    if (!initial.roster || !initial.priority || !initial.sleepNeed) {
      setError("Choose roster type, main priority, and sleep need before continuing.");
      return;
    }
    setStep("details");
  };

  const build = () => {
    const latest = detailRef.current;
    if (!latest.routineMinutes) {
      setError("Choose how much routine time you have (5, 15, or 30 minutes).");
      return;
    }
    if (!latest.recovery) {
      setError("Tell us how recovered you feel right now.");
      return;
    }

    const timeKeys = [
      ["shiftStart", "shift start"],
      ["shiftEnd", "shift finish"],
      ["nextWorkStart", "next shift start"],
      ["familyStart", "commitment start"],
      ["familyEnd", "commitment end"],
    ] as const;

    const normalized: DetailAnswers = { ...latest };
    for (const [key, label] of timeKeys) {
      const raw = latest[key];
      if (!raw.trim()) {
        normalized[key] = "";
        continue;
      }
      const value = normalizeTimeInput(raw);
      if (!isCompleteHhMm(value)) {
        setError(`Check ${label} — enter a complete time (HH:MM) before generating.`);
        return;
      }
      normalized[key] = value;
    }

    if (normalized.familyStart && !normalized.familyEnd) {
      setError("Add a commitment end time, or clear the start time.");
      return;
    }
    if (!normalized.familyStart && normalized.familyEnd) {
      setError("Add a commitment start time, or clear the end time.");
      return;
    }
    if (normalized.shiftStartDate && normalized.shiftEndDate && normalized.shiftEndDate < normalized.shiftStartDate) {
      setError("Finish date is before start date. For overnight shifts, set finish on the next calendar day.");
      return;
    }

    const next = buildRoutinePlan(initial, normalized);
    if (!next) {
      setError("Could not build a plan from those answers. Check the required fields.");
      return;
    }
    setDetail(normalized);
    setStep("result");
  };

  const downloadChecklist = () => {
    const latest = detailRef.current;
    const normalized: DetailAnswers = { ...latest };
    for (const key of ["shiftStart", "shiftEnd", "nextWorkStart", "familyStart", "familyEnd"] as const) {
      const raw = latest[key];
      normalized[key] = raw.trim() ? normalizeTimeInput(raw) : "";
    }
    const built = buildRoutinePlan(initial, normalized);
    if (!built) return;
    const text = planToChecklistText(built, initial);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iron-compass-shift-worker-routine.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className="ic-routine"
      aria-labelledby="ic-routine-title"
      data-review-build={showReviewBuild ? ROUTINE_REVIEW_BUILD : undefined}
    >
      <header className="ic-routine__header">
        <p className="ic-listen__label">Interactive tool</p>
        <h2 id="ic-routine-title" className="ic-routine__title">
          Build Your Shift Worker Routine
        </h2>
        <p className="ic-routine__intro">
          A simple way to turn this article into a routine that fits your roster, your recovery and the people who
          matter.
        </p>
        {showReviewBuild ? (
          <p className="ic-routine__hint" data-testid="routine-review-build">
            Local review build: {ROUTINE_REVIEW_BUILD}
          </p>
        ) : null}
      </header>

      {step === "intro" ? (
        <div className="ic-routine__panel space-y-5">
          <ChoiceGroup<RosterType>
            legend="What does your roster look like?"
            name="roster"
            value={initial.roster}
            onChange={(value) => updateInitial("roster", value)}
            options={[
              { value: "day", label: "Day shifts" },
              { value: "night", label: "Night shifts" },
              { value: "rotating", label: "Rotating day and night shifts" },
              { value: "days_off", label: "Currently on days off" },
            ]}
          />
          <ChoiceGroup<Priority>
            legend="What’s your main priority?"
            name="priority"
            value={initial.priority}
            onChange={(value) => updateInitial("priority", value)}
            options={[
              { value: "fitness", label: "Fitness and strength" },
              { value: "family", label: "More quality family time" },
              { value: "productivity", label: "Productivity and personal goals" },
              { value: "recovery", label: "Sleep and recovery" },
            ]}
          />
          <ChoiceGroup<SleepNeed>
            legend="How much sleep do you generally need?"
            name="sleepNeed"
            value={initial.sleepNeed}
            onChange={(value) => updateInitial("sleepNeed", value)}
            hint="Planning estimate only — not a limit, and not advice to sleep less. Most healthy adults need roughly 7–9 hours of actual sleep per 24 hours."
            options={[
              { value: 7, label: "About 7 hours" },
              { value: 8, label: "About 8 hours" },
              { value: 9, label: "About 9 hours" },
            ]}
          />

          {starting ? (
            <div className="ic-routine__recommend" aria-live="polite">
              <h3 className="ic-routine__subheading">Your starting recommendation</h3>
              <p>{starting.summary}</p>
              <p>{starting.sleepLine}</p>
              <ul>
                {starting.caveats.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {error ? <p className="ic-routine__error">{error}</p> : null}

          <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={goDetails}>
            Build my complete routine
          </button>
        </div>
      ) : null}

      {step === "details" ? (
        <div className="ic-routine__panel space-y-5">
          <p className="ic-routine__hint">
            Add only what you know. Missing times produce a flexible sequence with clear assumptions — not invented
            clocks. Times use 24-hour text entry (HH:MM) so values stay reliable when typing quickly.
          </p>

          {initial.roster !== "days_off" ? (
            <>
              <div className="ic-routine__grid">
                <TimeTextField
                  id="shift-start"
                  label="Next shift start (24h)"
                  value={detail.shiftStart}
                  onChange={(v) => onTimeChange("shiftStart", v)}
                  onBlurNormalize={(v) => onTimeBlur("shiftStart", v, "shift start")}
                />
                <TimeTextField
                  id="shift-end"
                  label="Next shift finish (24h)"
                  value={detail.shiftEnd}
                  onChange={(v) => onTimeChange("shiftEnd", v)}
                  onBlurNormalize={(v) => onTimeBlur("shiftEnd", v, "shift finish")}
                />
                <label className="ic-routine__field">
                  <span>Start date (optional, helpful overnight)</span>
                  <input
                    type="date"
                    value={detail.shiftStartDate}
                    onChange={(e) => updateDetail("shiftStartDate", e.target.value)}
                  />
                </label>
                <label className="ic-routine__field">
                  <span>Finish date (optional)</span>
                  <input
                    type="date"
                    value={detail.shiftEndDate}
                    onChange={(e) => updateDetail("shiftEndDate", e.target.value)}
                  />
                </label>
              </div>
            </>
          ) : (
            <>
              <ChoiceGroup<"yes" | "no" | "not_sure">
                legend="Do you know when the next shift begins?"
                name="nextWorkKnown"
                value={detail.nextWorkKnown}
                onChange={(value) => updateDetail("nextWorkKnown", value)}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "not_sure", label: "Not sure" },
                ]}
              />
              {detail.nextWorkKnown === "yes" ? (
                <div className="ic-routine__grid">
                  <label className="ic-routine__field">
                    <span>Next shift date</span>
                    <input
                      type="date"
                      value={detail.nextWorkDate}
                      onChange={(e) => updateDetail("nextWorkDate", e.target.value)}
                    />
                  </label>
                  <TimeTextField
                    id="next-work-start"
                    label="Next shift start (24h)"
                    value={detail.nextWorkStart}
                    onChange={(v) => onTimeChange("nextWorkStart", v)}
                    onBlurNormalize={(v) => onTimeBlur("nextWorkStart", v, "next shift start")}
                  />
                </div>
              ) : null}
            </>
          )}

          {initial.roster === "rotating" ? (
            <ChoiceGroup<"day" | "night" | "not_sure">
              legend="What is the next shift type?"
              name="nextShiftType"
              value={detail.nextShiftType}
              onChange={(value) => updateDetail("nextShiftType", value)}
              options={[
                { value: "day", label: "Day" },
                { value: "night", label: "Night" },
                { value: "not_sure", label: "Not sure" },
              ]}
            />
          ) : null}

          <div className="ic-routine__grid">
            <label className="ic-routine__field">
              <span>Commute (minutes)</span>
              <input
                type="number"
                min={0}
                max={240}
                inputMode="numeric"
                placeholder="e.g. 25"
                value={detail.commuteMinutes}
                onChange={(e) => updateDetail("commuteMinutes", e.target.value)}
              />
            </label>
            <label className="ic-routine__field">
              <span>Getting-ready time (minutes)</span>
              <input
                type="number"
                min={0}
                max={240}
                inputMode="numeric"
                placeholder="e.g. 35"
                value={detail.readyMinutes}
                onChange={(e) => updateDetail("readyMinutes", e.target.value)}
              />
            </label>
          </div>

          <div className="ic-routine__field">
            <span>Fixed family or caring commitment (optional)</span>
            <p className="ic-routine__hint">
              Add structured start/end times if you want clash detection. Free-text notes are for context only and are
              not automatically understood or checked. You can clear both times to remove commitment conflicts.
            </p>
            <div className="ic-routine__grid" style={{ marginTop: "0.55rem" }}>
              <TimeTextField
                id="family-start"
                label="Commitment start"
                value={detail.familyStart}
                onChange={(v) => onTimeChange("familyStart", v)}
                onBlurNormalize={(v) => onTimeBlur("familyStart", v, "commitment start")}
              />
              <TimeTextField
                id="family-end"
                label="Commitment end"
                value={detail.familyEnd}
                onChange={(v) => onTimeChange("familyEnd", v)}
                onBlurNormalize={(v) => onTimeBlur("familyEnd", v, "commitment end")}
              />
            </div>
            <label className="ic-routine__field" style={{ marginTop: "0.55rem" }}>
              <span>Notes (optional context)</span>
              <textarea
                rows={3}
                placeholder="e.g. school drop-off; no assumption that another adult is free"
                value={detail.familyNotes}
                onChange={(e) => updateDetail("familyNotes", e.target.value)}
              />
            </label>
          </div>

          <ChoiceGroup<RoutineMinutes>
            legend="Available routine time"
            name="routineMinutes"
            value={detail.routineMinutes}
            onChange={(value) => updateDetail("routineMinutes", value)}
            options={[
              { value: 5, label: "5 minutes" },
              { value: 15, label: "15 minutes" },
              { value: 30, label: "30 minutes" },
            ]}
          />

          <ChoiceGroup<RecoveryFeel>
            legend="How recovered do you feel right now?"
            name="recovery"
            value={detail.recovery}
            onChange={(value) => updateDetail("recovery", value)}
            options={[
              { value: "rested", label: "Adequately rested" },
              { value: "tired", label: "Unusually tired" },
              { value: "not_sure", label: "Not sure" },
            ]}
          />

          {error ? (
            <p className="ic-routine__error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="ic-routine__actions">
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => setStep("intro")}>
              Back
            </button>
            <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={build}>
              Generate my routine
            </button>
          </div>
        </div>
      ) : null}

      {step === "result" && plan ? (
        <div className="space-y-5">
          <article
            ref={resultRef as RefObject<HTMLElement>}
            className="ic-routine__result"
            tabIndex={-1}
            aria-label="Your generated routine"
          >
            <p className="ic-print-checklist-label">Iron Compass · Shift worker routine checklist</p>
            <h3 className="ic-routine__subheading">Your routine</h3>
            <p>{plan.explanation}</p>
            <p>
              <strong>Requested First Block:</strong> {plan.requestedMinutes} minutes.{" "}
              <strong>Effective First Block:</strong> {plan.effectiveMinutes} minutes.
            </p>

            {plan.conflicts.length ? (
              <div className="ic-routine__conflicts">
                <h4>Conflicts &amp; adjustments</h4>
                <ul>
                  {plan.conflicts.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <h4>Assumptions</h4>
            <ul>
              {plan.assumptions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>

            <h4>Sleep opportunity</h4>
            <p>{plan.sleepOpportunity}</p>

            <h4>Times</h4>
            <ul>
              <li>Wake: {plan.wakeTime ?? "Not calculated — add more timing detail or use the sequence below."}</li>
              <li>Depart: {plan.departTime ?? "Not calculated — add shift start and commute if you want a clock time."}</li>
            </ul>

            <h4>First Block</h4>
            <ol>
              {plan.firstBlock.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            <h4>Movement / training</h4>
            <p>{plan.movementOrTraining}</p>

            <h4>Family / household</h4>
            <p>{plan.familyAction}</p>

            <h4>Next-shift prep</h4>
            <p>{plan.nextShiftPrep}</p>

            <h4>Wind-down</h4>
            <p>{plan.windDown}</p>

            <h4>Shorter fallback</h4>
            <p>{plan.fallback}</p>

            {plan.transition ? (
              <>
                <h4>Transition</h4>
                <p>{plan.transition}</p>
              </>
            ) : null}

            <p className="ic-routine__note">{plan.professionalNote}</p>
            <p className="ic-routine__note">
              Answers stay in this browser session unless you download or print them. Nothing here is sent for marketing.
            </p>
          </article>

          <div className="ic-routine__actions ic-routine__actions--wrap">
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => setStep("details")}>
              Edit answers
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={build}>
              Regenerate plan
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={printChecklist}>
              Print checklist
            </button>
            <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={downloadChecklist}>
              Download checklist
            </button>
          </div>

          <div className="ic-routine__subscribe">
            <h3 className="ic-routine__subheading">Optional follow-up</h3>
            <p>
              Want more practical guidance for making your roster work around your life? Subscribe for future routines
              and recovery tips.
            </p>
            <EmailCaptureForm
              source="5am-shift-routine-tool"
              buttonLabel="Subscribe"
              successMessage="You're on the list. More roster-friendly guidance to come."
            />
            <p className="ic-routine__hint">
              Uses the site’s existing email signup. No account required to use the routine tool above.
            </p>
          </div>

          <div className="ic-routine__future">
            <h3 className="ic-routine__subheading">Iron Compass AI support</h3>
            <p>
              Right now you can build a rules-based shift routine in the browser, save or print the checklist, and keep
              using the article without an account. Broader personalised roster support inside Iron Compass AI is planned
              next.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
