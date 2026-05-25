"use client";

import { useState } from "react";

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
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not subscribe. Try again shortly.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-4 text-center">
        <p className="text-green-400 font-semibold tracking-[0.2em] uppercase">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="w-full space-y-3">
      <div className="flex flex-col sm:flex-row gap-4">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          name="email"
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
      {error ? <p className="text-sm text-red-400 text-center">{error}</p> : null}
    </form>
  );
}
