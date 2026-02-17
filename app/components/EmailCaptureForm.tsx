"use client";
import { useState } from "react";

export default function EmailCaptureForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    console.log("Email submitted:", email); // replace with API hook
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-4 text-center">
        <p className="text-green-400 font-semibold tracking-[0.2em] uppercase">
          Thank you! You&rsquo;re on the list.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          className="flex-1 rounded-full border border-[var(--ic-card-border)] bg-[rgba(7,12,22,0.65)] px-6 py-3 text-base text-[var(--ic-text-heading)] placeholder:text-[var(--ic-text-muted)] focus:border-[var(--ic-accent-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--ic-accent-blue)]/40"
        />
        <button type="submit" className="ic-cta-glow text-[0.6rem] px-10 py-3 min-w-[180px]">
          Notify Me
        </button>
      </div>
    </form>
  );
}