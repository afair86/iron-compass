"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not send that. Try again shortly.");
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
    return <p className="text-sm text-[var(--ic-text-heading)]">Message sent. We will reply by email.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-3 text-left">
      <label className="block text-sm" htmlFor="contact-name">
        Name
        <input
          id="contact-name"
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
          className="mt-1 w-full rounded-full border border-[var(--ic-card-border)] bg-[rgba(7,12,22,0.65)] px-5 py-3 text-base text-[var(--ic-text-heading)]"
        />
      </label>
      <label className="block text-sm" htmlFor="contact-email">
        Email
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
          className="mt-1 w-full rounded-full border border-[var(--ic-card-border)] bg-[rgba(7,12,22,0.65)] px-5 py-3 text-base text-[var(--ic-text-heading)]"
        />
      </label>
      <label className="block text-sm" htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={loading}
          className="mt-1 w-full rounded-2xl border border-[var(--ic-card-border)] bg-[rgba(7,12,22,0.65)] px-5 py-3 text-base text-[var(--ic-text-heading)]"
        />
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button type="submit" disabled={loading} className="ic-btn-primary text-[0.62rem] disabled:opacity-60">
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
