"use client";

import { useState } from "react";
import { PublicFormTimeoutError, submitPublicForm, submissionError } from "@/lib/formResponse";

type EmailCaptureFormProps = {
  source?: string;
  buttonLabel?: string;
  successMessage?: string;
};

export default function EmailCaptureForm({
  source = "website",
  buttonLabel = "Notify Me",
  successMessage = "Thank you! You're on the list.",
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await submitPublicForm("/api/subscribe", { email, source });
      const failure = submissionError(response.responseOk, response.body, "Could not confirm that signup. Try again shortly.");

      if (failure) {
        setError(failure);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      setError(error instanceof PublicFormTimeoutError ? error.message : "Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-4 ic-align-center">
        <p role="status" className="text-green-400 font-semibold tracking-[0.2em] uppercase">{successMessage}</p>
      </div>
    );
  }

  return (
    <form action="/api/subscribe" method="post" onSubmit={handleSubmit} aria-busy={loading} className="w-full space-y-3">
      <noscript><p>Enable JavaScript to use this signup form. Your email has not been submitted.</p></noscript>
      <div className="flex flex-col sm:flex-row gap-4">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          name="email"
          autoComplete="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          disabled={loading}
          className="flex-1 rounded-full border border-[var(--ic-card-border)] bg-[rgba(7,12,22,0.65)] px-6 py-3 text-base text-[var(--ic-text-heading)] placeholder:text-[var(--ic-text-muted)] focus:border-[var(--ic-accent-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--ic-accent-blue)]/40 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="ic-cta-glow text-[0.6rem] px-10 py-3 min-w-[180px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting…" : buttonLabel}
        </button>
      </div>
      {error ? <p role="alert" className="text-sm text-red-300 ic-align-center">{error}</p> : null}
    </form>
  );
}
