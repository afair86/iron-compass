"use client";

import { useId, useState } from "react";
import EmailCaptureForm from "@/app/components/EmailCaptureForm";
import { downloadTextFile, printToolResult } from "@/lib/blogPracticalTools";

export default function CommitmentPlanner() {
  const baseId = useId();
  const [promise, setPromise] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [deadline, setDeadline] = useState("");
  const [domain, setDomain] = useState("work");
  const [ifChanges, setIfChanges] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const build = () => {
    if (!promise.trim()) {
      setError("Write the commitment in plain language.");
      setReady(false);
      return;
    }
    if (!nextAction.trim()) {
      setError("Add the next concrete action that makes the commitment real.");
      setReady(false);
      return;
    }
    if (!deadline.trim()) {
      setError("Add a deadline or review date — even an approximate one.");
      setReady(false);
      return;
    }
    if (!ifChanges.trim()) {
      setError("Note what you will communicate if circumstances change.");
      setReady(false);
      return;
    }
    setError("");
    setReady(true);
  };

  const summary = () =>
    [
      "Iron Compass — Commitment planner",
      "",
      `Domain: ${domain}`,
      `Promise: ${promise.trim()}`,
      `Next action: ${nextAction.trim()}`,
      `Deadline / review: ${deadline.trim()}`,
      `If circumstances change, I will communicate: ${ifChanges.trim()}`,
      "",
      "This planner does not send reminders or messages. You keep the follow-through.",
      "Entries stayed in this browser unless you download or print.",
    ].join("\n");

  return (
    <section className="ic-routine" aria-labelledby={`${baseId}-title`}>
      <header className="ic-routine__header">
        <p className="ic-listen__label">Practical planner</p>
        <h2 id={`${baseId}-title`} className="ic-routine__title">
          Commitment planner
        </h2>
        <p className="ic-routine__intro">
          Capture the promise, the next action, the deadline, and what you will say if delivery is at risk. This tool
          does <strong>not</strong> send reminders or messages — it only helps you plan. Entries stay in this browser
          unless you download or print.
        </p>
      </header>

      <div className="ic-routine__panel space-y-5">
        <fieldset className="ic-routine__fieldset">
          <legend className="ic-routine__legend">Where does this commitment live?</legend>
          <div className="ic-routine__choices" role="radiogroup" aria-label="Commitment domain">
            {[
              ["work", "Work"],
              ["home", "Home"],
              ["friendship", "Friendship"],
            ].map(([value, label]) => (
              <label
                key={value}
                className={domain === value ? "ic-routine__choice is-selected" : "ic-routine__choice"}
                htmlFor={`${baseId}-domain-${value}`}
              >
                <input
                  id={`${baseId}-domain-${value}`}
                  type="radio"
                  name={`${baseId}-domain`}
                  checked={domain === value}
                  onChange={() => {
                    setDomain(value);
                    setError("");
                  }}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="ic-routine__field" htmlFor={`${baseId}-promise`}>
          <span>The promise (what you are committing to)</span>
          <textarea
            id={`${baseId}-promise`}
            rows={3}
            value={promise}
            onChange={(e) => {
              setPromise(e.target.value);
              setError("");
            }}
            placeholder="e.g. Send the draft proposal by Thursday 4pm"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-action`}>
          <span>Next concrete action</span>
          <input
            id={`${baseId}-action`}
            type="text"
            value={nextAction}
            onChange={(e) => {
              setNextAction(e.target.value);
              setError("");
            }}
            placeholder="e.g. Block 90 minutes tomorrow morning to draft"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-deadline`}>
          <span>Deadline or review date</span>
          <input
            id={`${baseId}-deadline`}
            type="text"
            value={deadline}
            onChange={(e) => {
              setDeadline(e.target.value);
              setError("");
            }}
            placeholder="e.g. Thu 26 Sep, 4pm"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-if`}>
          <span>If circumstances change, I will communicate…</span>
          <textarea
            id={`${baseId}-if`}
            rows={3}
            value={ifChanges}
            onChange={(e) => {
              setIfChanges(e.target.value);
              setError("");
            }}
            placeholder="e.g. Message Sam by Wednesday noon with a revised time and reason"
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
          <article className="ic-routine__result" aria-label="Commitment summary">
            <p className="ic-print-checklist-label">Iron Compass · Commitment summary</p>
            <h3 className="ic-routine__subheading">Your commitment</h3>
            <p>
              <strong>Domain:</strong> {domain}
            </p>
            <p>
              <strong>Promise:</strong> {promise.trim()}
            </p>
            <p>
              <strong>Next action:</strong> {nextAction.trim()}
            </p>
            <p>
              <strong>Deadline / review:</strong> {deadline.trim()}
            </p>
            <p>
              <strong>If circumstances change:</strong> {ifChanges.trim()}
            </p>
            <p className="ic-routine__note">
              No reminders or messages are sent from this page. Honouring the commitment is still on you.
            </p>
          </article>
          <div className="ic-routine__actions ic-routine__actions--wrap">
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => setReady(false)}>
              Edit planner
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={printToolResult}>
              Print summary
            </button>
            <button
              type="button"
              className="ic-btn-primary text-[0.62rem]"
              onClick={() => downloadTextFile("iron-compass-commitment-plan.txt", summary())}
            >
              Download summary
            </button>
          </div>
          <div className="ic-routine__subscribe">
            <h3 className="ic-routine__subheading">Optional follow-up</h3>
            <p>Subscribe for future leadership notes — the planner above works without an account.</p>
            <EmailCaptureForm
              source="blog-commitment-planner"
              buttonLabel="Subscribe"
              successMessage="You're on the list."
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
