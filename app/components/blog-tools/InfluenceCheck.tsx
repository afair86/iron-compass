"use client";

import { useId, useState } from "react";
import EmailCaptureForm from "@/app/components/EmailCaptureForm";
import { downloadTextFile, printToolResult } from "@/lib/blogPracticalTools";

const YES_NO = [
  { value: "yes", label: "Yes / mostly" },
  { value: "unsure", label: "Unsure" },
  { value: "no", label: "No / mostly not" },
] as const;

type Yn = (typeof YES_NO)[number]["value"] | null;

export default function InfluenceCheck() {
  const baseId = useId();
  const [request, setRequest] = useState("");
  const [pressure, setPressure] = useState("");
  const [purposeClear, setPurposeClear] = useState<Yn>(null);
  const [infoHonest, setInfoHonest] = useState<Yn>(null);
  const [canQuestion, setCanQuestion] = useState<Yn>(null);
  const [canRefuse, setCanRefuse] = useState<Yn>(null);
  const [alignsValues, setAlignsValues] = useState<Yn>(null);
  const [notes, setNotes] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const build = () => {
    if (!request.trim()) {
      setError("Describe what was requested in plain language.");
      setReady(false);
      return;
    }
    if (!pressure.trim()) {
      setError("Note what information or emotion was used to push the request — even if it felt mild.");
      setReady(false);
      return;
    }
    if (!purposeClear || !infoHonest || !canQuestion || !canRefuse || !alignsValues) {
      setError("Answer each of the five check questions (yes / unsure / no).");
      setReady(false);
      return;
    }
    if (!nextAction.trim()) {
      setError("Choose one next action before generating the summary.");
      setReady(false);
      return;
    }
    setError("");
    setReady(true);
  };

  const label = (v: Yn) => {
    if (v === "yes") return "Yes / mostly";
    if (v === "no") return "No / mostly not";
    if (v === "unsure") return "Unsure";
    return "";
  };

  const summary = () =>
    [
      "Iron Compass — Influence Check",
      "",
      "This is a thinking aid, not a diagnosis, verdict, or personality label.",
      "",
      `What was requested: ${request.trim()}`,
      `Information / emotion used: ${pressure.trim()}`,
      `Purpose reasonably clear?: ${label(purposeClear)}`,
      `Information seems honest?: ${label(infoHonest)}`,
      `Can I question without punishment?: ${label(canQuestion)}`,
      `Can I refuse or renegotiate?: ${label(canRefuse)}`,
      `Aligns with my values?: ${label(alignsValues)}`,
      `Notes: ${notes.trim() || "(none)"}`,
      `Next action: ${nextAction.trim()}`,
      "",
      "If you feel unsafe, threatened or controlled, prioritise safety and local support over proving a point.",
      "Entries stayed in this browser unless you download or print.",
      "Printed or downloaded copies may contain personal information.",
    ].join("\n");

  const radioGroup = (
    legend: string,
    name: string,
    value: Yn,
    onChange: (v: Yn) => void,
  ) => (
    <fieldset className="ic-routine__fieldset">
      <legend className="ic-routine__legend">{legend}</legend>
      <div className="ic-routine__choices" role="radiogroup" aria-label={legend}>
        {YES_NO.map((opt) => {
          const selected = value === opt.value;
          const id = `${baseId}-${name}-${opt.value}`;
          return (
            <label key={id} className={selected ? "ic-routine__choice is-selected" : "ic-routine__choice"} htmlFor={id}>
              <input
                id={id}
                type="radio"
                name={`${baseId}-${name}`}
                checked={selected}
                onChange={() => {
                  onChange(opt.value);
                  setError("");
                }}
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <section className="ic-routine" aria-labelledby={`${baseId}-title`}>
      <header className="ic-routine__header">
        <p className="ic-listen__label">Practical check</p>
        <h2 id={`${baseId}-title`} className="ic-routine__title">
          Influence Check
        </h2>
        <p className="ic-routine__intro">
          Examine one interaction. This does <strong>not</strong> diagnose anyone, score your character, or prove
          manipulation. It helps you separate the request from the pressure and choose a next step. Entries stay in this
          browser unless you download or print — those copies may contain personal information.
        </p>
      </header>

      <div className="ic-routine__panel space-y-5">
        <label className="ic-routine__field" htmlFor={`${baseId}-request`}>
          <span>What is this person trying to get me to do?</span>
          <textarea
            id={`${baseId}-request`}
            rows={3}
            value={request}
            onChange={(e) => {
              setRequest(e.target.value);
              setError("");
            }}
            placeholder="The concrete ask — not your whole story with them"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-pressure`}>
          <span>What information or emotion are they using?</span>
          <textarea
            id={`${baseId}-pressure`}
            rows={3}
            value={pressure}
            onChange={(e) => {
              setPressure(e.target.value);
              setError("");
            }}
            placeholder="e.g. urgency, guilt, flattery, scarcity, authority, silence"
          />
        </label>

        {radioGroup("Is the purpose reasonably clear?", "purpose", purposeClear, setPurposeClear)}
        {radioGroup("Does the information seem honest enough to decide?", "info", infoHonest, setInfoHonest)}
        {radioGroup("Can I ask questions without being punished?", "question", canQuestion, setCanQuestion)}
        {radioGroup("Can I refuse or renegotiate without retaliation?", "refuse", canRefuse, setCanRefuse)}
        {radioGroup("Does this align with my values and interests?", "values", alignsValues, setAlignsValues)}

        <label className="ic-routine__field" htmlFor={`${baseId}-notes`}>
          <span>Notes (optional)</span>
          <textarea
            id={`${baseId}-notes`}
            rows={2}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setError("");
            }}
            placeholder="Facts still missing; pattern vs one-off; safety concerns"
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
            placeholder="e.g. ask for it in writing; pause overnight; say no briefly"
          />
        </label>

        {error ? (
          <p className="ic-routine__error" role="alert">
            {error}
          </p>
        ) : null}

        <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={build}>
          Generate summary
        </button>
      </div>

      {ready ? (
        <div className="space-y-5" style={{ marginTop: "1.25rem" }}>
          <article className="ic-routine__result" aria-label="Influence Check summary">
            <p className="ic-print-checklist-label">Iron Compass · Influence Check (not a diagnosis)</p>
            <h3 className="ic-routine__subheading">Your summary</h3>
            <p>
              <strong>Request:</strong> {request.trim()}
            </p>
            <p>
              <strong>Pressure / leverage:</strong> {pressure.trim()}
            </p>
            <ul>
              <li>Purpose clear: {label(purposeClear)}</li>
              <li>Information honest enough: {label(infoHonest)}</li>
              <li>Can question: {label(canQuestion)}</li>
              <li>Can refuse / renegotiate: {label(canRefuse)}</li>
              <li>Aligns with values: {label(alignsValues)}</li>
            </ul>
            <p>
              <strong>Notes:</strong> {notes.trim() || "None"}
            </p>
            <p>
              <strong>Next action:</strong> {nextAction.trim()}
            </p>
            <p className="ic-routine__note">
              Mixed answers are normal. Prefer facts and boundaries over labels. If safety is at risk, get support and
              plan carefully — do not treat a script as a test of courage.
            </p>
          </article>
          <div className="ic-routine__actions ic-routine__actions--wrap">
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => setReady(false)}>
              Edit check
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={printToolResult}>
              Print summary
            </button>
            <button
              type="button"
              className="ic-btn-primary text-[0.62rem]"
              onClick={() => downloadTextFile("iron-compass-influence-check.txt", summary())}
            >
              Download summary
            </button>
          </div>
          <div className="ic-routine__subscribe">
            <h3 className="ic-routine__subheading">Optional follow-up</h3>
            <p>Subscribe for future leadership notes — the check above needs no account.</p>
            <EmailCaptureForm
              source="blog-influence-check"
              buttonLabel="Subscribe"
              successMessage="You're on the list."
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
