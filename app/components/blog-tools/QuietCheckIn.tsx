"use client";

import { useId, useState } from "react";
import EmailCaptureForm from "@/app/components/EmailCaptureForm";
import { downloadTextFile, printToolResult } from "@/lib/blogPracticalTools";

const ROLES = [
  { value: "man", label: "Man" },
  { value: "partner", label: "Partner or husband" },
  { value: "father", label: "Father or caregiver" },
  { value: "son", label: "Son" },
  { value: "leader", label: "Leader" },
] as const;

export default function QuietCheckIn() {
  const baseId = useId();
  const [roles, setRoles] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [situation, setSituation] = useState("");
  const [wentWell, setWentWell] = useState("");
  const [differently, setDifferently] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const toggleRole = (role: string) => {
    setRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]));
    setError("");
  };

  const build = () => {
    if (!value.trim()) {
      setError("Name the value you want to practise.");
      setReady(false);
      return;
    }
    if (!situation.trim()) {
      setError("Describe one recent situation in plain language.");
      setReady(false);
      return;
    }
    if (!nextAction.trim()) {
      setError("Choose one next action.");
      setReady(false);
      return;
    }
    if (!reviewDate.trim()) {
      setError("Add a review date so the action gets checked.");
      setReady(false);
      return;
    }
    setError("");
    setReady(true);
  };

  const summary = () =>
    [
      "Iron Compass — A Quiet Check-In",
      "",
      "This is an action summary, not a moral score, diagnosis, or verdict.",
      "",
      `Roles (optional): ${roles.length ? roles.join(", ") : "(none selected)"}`,
      `Value to practise: ${value.trim()}`,
      `Recent situation: ${situation.trim()}`,
      `What went well: ${wentWell.trim() || "(not noted)"}`,
      `Handle differently: ${differently.trim() || "(not noted)"}`,
      `Next action: ${nextAction.trim()}`,
      `Review date: ${reviewDate.trim()}`,
      "",
      "Entries stayed in this browser unless you download or print.",
      "Printed or downloaded copies may contain personal information.",
    ].join("\n");

  return (
    <section className="ic-routine" aria-labelledby={`${baseId}-title`}>
      <header className="ic-routine__header">
        <p className="ic-listen__label">Quiet check-in</p>
        <h2 id={`${baseId}-title`} className="ic-routine__title">
          A Quiet Check-In
        </h2>
        <p className="ic-routine__intro">
          Reflect on one situation and leave with one action. This does <strong>not</strong> generate scores,
          diagnoses, personality labels, or verdicts about your worth. Entries stay in this browser by default — they
          are not sent to analytics, marketing, or an AI service. Printed or downloaded copies may contain personal
          information.
        </p>
      </header>

      <div className="ic-routine__panel space-y-5">
        <fieldset className="ic-routine__fieldset">
          <legend className="ic-routine__legend">Optional role focus</legend>
          <div className="ic-routine__choices">
            {ROLES.map((role) => {
              const selected = roles.includes(role.value);
              return (
                <label
                  key={role.value}
                  className={selected ? "ic-routine__choice is-selected" : "ic-routine__choice"}
                  htmlFor={`${baseId}-role-${role.value}`}
                >
                  <input
                    id={`${baseId}-role-${role.value}`}
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleRole(role.value)}
                  />
                  <span>{role.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className="ic-routine__field" htmlFor={`${baseId}-value`}>
          <span>Value to practise</span>
          <input
            id={`${baseId}-value`}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            placeholder="e.g. patience, honesty, steadiness"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-situation`}>
          <span>One recent situation</span>
          <textarea
            id={`${baseId}-situation`}
            rows={3}
            value={situation}
            onChange={(e) => {
              setSituation(e.target.value);
              setError("");
            }}
            placeholder="What happened, in plain facts"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-well`}>
          <span>What went well (optional)</span>
          <textarea
            id={`${baseId}-well`}
            rows={2}
            value={wentWell}
            onChange={(e) => {
              setWentWell(e.target.value);
              setError("");
            }}
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-diff`}>
          <span>What to handle differently (optional)</span>
          <textarea
            id={`${baseId}-diff`}
            rows={2}
            value={differently}
            onChange={(e) => {
              setDifferently(e.target.value);
              setError("");
            }}
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-next`}>
          <span>One next action</span>
          <input
            id={`${baseId}-next`}
            type="text"
            value={nextAction}
            onChange={(e) => {
              setNextAction(e.target.value);
              setError("");
            }}
            placeholder="One behaviour for the coming week"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-review`}>
          <span>Review date</span>
          <input
            id={`${baseId}-review`}
            type="text"
            value={reviewDate}
            onChange={(e) => {
              setReviewDate(e.target.value);
              setError("");
            }}
            placeholder="e.g. Sunday evening"
          />
        </label>

        {error ? (
          <p className="ic-routine__error" role="alert">
            {error}
          </p>
        ) : null}

        <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={build}>
          Generate action summary
        </button>
      </div>

      {ready ? (
        <div className="space-y-5" style={{ marginTop: "1.25rem" }}>
          <article className="ic-routine__result" aria-label="Quiet check-in summary">
            <p className="ic-print-checklist-label">Iron Compass · Quiet check-in (action summary)</p>
            <h3 className="ic-routine__subheading">Your action summary</h3>
            <p>
              <strong>Roles:</strong> {roles.length ? roles.join(", ") : "None selected"}
            </p>
            <p>
              <strong>Value:</strong> {value.trim()}
            </p>
            <p>
              <strong>Situation:</strong> {situation.trim()}
            </p>
            <p>
              <strong>Went well:</strong> {wentWell.trim() || "Not noted"}
            </p>
            <p>
              <strong>Handle differently:</strong> {differently.trim() || "Not noted"}
            </p>
            <p>
              <strong>Next action:</strong> {nextAction.trim()}
            </p>
            <p>
              <strong>Review:</strong> {reviewDate.trim()}
            </p>
            <p className="ic-routine__note">
              No moral score or verdict. Choose one relationship, one behaviour, and follow the action through to the
              review date.
            </p>
          </article>
          <div className="ic-routine__actions ic-routine__actions--wrap">
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => setReady(false)}>
              Edit check-in
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={printToolResult}>
              Print summary
            </button>
            <button
              type="button"
              className="ic-btn-primary text-[0.62rem]"
              onClick={() => downloadTextFile("iron-compass-quiet-check-in.txt", summary())}
            >
              Download summary
            </button>
          </div>
          <div className="ic-routine__subscribe">
            <h3 className="ic-routine__subheading">Optional follow-up</h3>
            <p>Subscribe for future identity and leadership notes — the check-in above needs no account.</p>
            <EmailCaptureForm
              source="blog-quiet-check-in"
              buttonLabel="Subscribe"
              successMessage="You're on the list."
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
