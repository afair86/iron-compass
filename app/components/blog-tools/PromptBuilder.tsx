"use client";

import { useId, useMemo, useState } from "react";
import EmailCaptureForm from "@/app/components/EmailCaptureForm";
import { downloadTextFile, printToolResult } from "@/lib/blogPracticalTools";

export default function PromptBuilder() {
  const baseId = useId();
  const [task, setTask] = useState("");
  const [context, setContext] = useState("");
  const [constraints, setConstraints] = useState("");
  const [output, setOutput] = useState("");
  const [verification, setVerification] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  const prompt = useMemo(() => {
    return [
      `Task: ${task.trim()}`,
      "",
      `Context: ${context.trim()}`,
      "",
      `Constraints: ${constraints.trim()}`,
      "",
      `Desired output: ${output.trim()}`,
      "",
      `Verification / how I will check your work: ${verification.trim()}`,
    ].join("\n");
  }, [task, context, constraints, output, verification]);

  const build = () => {
    if (!task.trim() || !context.trim() || !constraints.trim() || !output.trim() || !verification.trim()) {
      setError("Fill in task, context, constraints, desired output, and verification before building the prompt.");
      setReady(false);
      return;
    }
    setError("");
    setReady(true);
    setCopied(false);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
    } catch {
      setError("Copy failed — select the prompt text and copy manually.");
    }
  };

  return (
    <section className="ic-routine" aria-labelledby={`${baseId}-title`}>
      <header className="ic-routine__header">
        <p className="ic-listen__label">Prompt builder</p>
        <h2 id={`${baseId}-title`} className="ic-routine__title">
          Editable prompt builder
        </h2>
        <p className="ic-routine__intro">
          This builds a prompt you can paste into an AI tool you already use. It is a <strong>prompt builder</strong> —
          it does not run AI here, and it does not mean a task has already been completed. Entries stay in this browser
          unless you download or print.
        </p>
      </header>

      <div className="ic-routine__panel space-y-5">
        <label className="ic-routine__field" htmlFor={`${baseId}-task`}>
          <span>Task</span>
          <textarea
            id={`${baseId}-task`}
            rows={2}
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              setError("");
              setCopied(false);
            }}
            placeholder="What do you want help with?"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-context`}>
          <span>Context</span>
          <textarea
            id={`${baseId}-context`}
            rows={3}
            value={context}
            onChange={(e) => {
              setContext(e.target.value);
              setError("");
              setCopied(false);
            }}
            placeholder="Background the model needs — without private identifiers"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-constraints`}>
          <span>Constraints</span>
          <textarea
            id={`${baseId}-constraints`}
            rows={2}
            value={constraints}
            onChange={(e) => {
              setConstraints(e.target.value);
              setError("");
              setCopied(false);
            }}
            placeholder="Time, tone, length, what to avoid"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-output`}>
          <span>Desired output</span>
          <textarea
            id={`${baseId}-output`}
            rows={2}
            value={output}
            onChange={(e) => {
              setOutput(e.target.value);
              setError("");
              setCopied(false);
            }}
            placeholder="Format and structure you want back"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-verify`}>
          <span>Verification</span>
          <textarea
            id={`${baseId}-verify`}
            rows={2}
            value={verification}
            onChange={(e) => {
              setVerification(e.target.value);
              setError("");
              setCopied(false);
            }}
            placeholder="How you will check facts, numbers, and fit"
          />
        </label>

        {error ? (
          <p className="ic-routine__error" role="alert">
            {error}
          </p>
        ) : null}

        <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={build}>
          Build prompt
        </button>
      </div>

      {ready ? (
        <div className="space-y-5" style={{ marginTop: "1.25rem" }}>
          <article className="ic-routine__result" aria-label="Built prompt">
            <p className="ic-print-checklist-label">Iron Compass · Prompt builder (not AI output)</p>
            <h3 className="ic-routine__subheading">Your prompt</h3>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
                margin: 0,
                color: "inherit",
              }}
            >
              {prompt}
            </pre>
            <p className="ic-routine__note">
              Paste this into your AI tool. Check the reply against your verification note before you act on it.
            </p>
          </article>
          <div className="ic-routine__actions ic-routine__actions--wrap">
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => setReady(false)}>
              Edit fields
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={copyPrompt}>
              {copied ? "Copied" : "Copy prompt"}
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={printToolResult}>
              Print prompt
            </button>
            <button
              type="button"
              className="ic-btn-primary text-[0.62rem]"
              onClick={() => downloadTextFile("iron-compass-ai-prompt.txt", prompt)}
            >
              Download prompt
            </button>
          </div>
          <div className="ic-routine__subscribe">
            <h3 className="ic-routine__subheading">Optional follow-up</h3>
            <p>Subscribe for more practical AI habits — the builder above needs no account and no live AI connection.</p>
            <EmailCaptureForm
              source="blog-prompt-builder"
              buttonLabel="Subscribe"
              successMessage="You're on the list."
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
