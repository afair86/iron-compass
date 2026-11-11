"use client";

import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { downloadBrandedChecklist, printToolResult } from "@/lib/blogPracticalTools";
import { buildPlan, planners, planText, type Answers, type Plan, type PlannerKind } from "@/lib/connectionPlanners";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function ConnectionPlanner({ kind }: { kind: PlannerKind }) {
  const config = planners[kind];
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Answers>({});
  const [plan, setPlan] = useState<Plan | null>(null);
  // Do not accept an example click before the browser has attached its handlers.
  const interactive = useSyncExternalStore(subscribe, clientReady, serverReady);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Read the submitted controls so a last keystroke never depends on blur.
    const current = Object.fromEntries(new FormData(event.currentTarget).entries()) as Answers;
    const result = buildPlan(kind, current);
    setErrors(result.errors);
    setPlan(result.plan ?? null);
    if (Object.keys(result.errors).length) {
      const field = config.fields.find(field => result.errors[field.key]);
      if (field) (event.currentTarget.elements.namedItem(field.key) as HTMLElement | null)?.focus();
    } else {
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  }

  return (
    <section className="connection-planner" aria-labelledby={`${id}-title`}>
      <header>
        <p className="connection-eyebrow">Put it into practice</p>
        <h2 id={`${id}-title`}>{config.title}</h2>
        <p>{config.intro}</p>
        <p className="connection-note">Your answers stay on this page while it is open. No account needed. Nothing is sent, scheduled or saved to your account. Use roles or nicknames; leave out private details.</p>
      </header>
      <form ref={formRef} onSubmit={submit} noValidate onChange={() => setPlan(null)}>
        {!interactive ? <p role="status">Loading planner…</p> : null}
        <div className="connection-actions">
          <button type="button" disabled={!interactive} onClick={() => { setAnswers({ ...config.example }); setPlan(null); setErrors({}); }}>Try an example</button>
          <button type="button" disabled={!interactive} onClick={() => { setAnswers({}); setPlan(null); setErrors({}); }}>Clear answers</button>
        </div>
        {config.fields.map(field => (
          <div className="connection-field" key={field.key}>
            <label htmlFor={`${id}-${field.key}`}>{field.label}{field.optional ? " (if relevant)" : ""}</label>
            {field.options ? (
              <select id={`${id}-${field.key}`} name={field.key} value={answers[field.key] ?? ""} disabled={!interactive}
                aria-required={!field.optional} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${id}-${field.key}-error` : undefined}
                onChange={event => { setAnswers(previous => ({ ...previous, [field.key]: event.target.value })); setErrors({}); }}>
                <option value="">Choose an option</option>
                {field.options.map(option => <option key={option}>{option}</option>)}
              </select>
            ) : (
              <textarea id={`${id}-${field.key}`} name={field.key} rows={2} maxLength={1200} disabled={!interactive}
                placeholder={field.placeholder} value={answers[field.key] ?? ""}
                aria-required={!field.optional} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${id}-${field.key}-error` : undefined}
                onChange={event => { setAnswers(previous => ({ ...previous, [field.key]: event.target.value })); setErrors({}); }} />
            )}
            {errors[field.key] ? <p id={`${id}-${field.key}-error`} className="connection-error">{errors[field.key]}</p> : null}
          </div>
        ))}
        {Object.keys(errors).length ? <p role="alert" className="connection-error">Complete the highlighted fields to make a usable plan. Your answers are still here.</p> : null}
        <button className="connection-primary" type="submit" disabled={!interactive}>{config.action}</button>
      </form>
      {plan ? (
        <div className="connection-output" ref={resultRef} tabIndex={-1}>
          <article className="connection-result" aria-label={plan.title}>
            <p className="connection-eyebrow">Iron Compass AI · Your plan</p>
            <h3>{plan.title}</h3>
            {plan.sections.map(section => <section key={section.title}><h4>{section.title}</h4><p>{section.text}</p></section>)}
            <p className="connection-note">Practical planning guidance. Adapt the wording before using it. Nothing was sent or scheduled by this page.</p>
          </article>
          <div className="connection-actions">
            <button type="button" onClick={() => { setPlan(null); formRef.current?.querySelector<HTMLElement>("select,textarea")?.focus(); }}>Edit my answers</button>
            <button type="button" onClick={printToolResult}>Print my plan</button>
            <button className="connection-primary" type="button" onClick={() => downloadBrandedChecklist(`iron-compass-${kind}-plan.html`, planText(plan))}>Download my plan</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
