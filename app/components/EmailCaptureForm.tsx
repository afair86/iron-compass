"use client";
import { useState } from "react";

export default function EmailCaptureForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) {
      // You can replace this with your API call
      // eslint-disable-next-line no-console
      console.log("Email submitted:", email);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return <div className="text-green-400 font-semibold py-4">Thank you! You&rsquo;re on the list.</div>;
  }

  return (
    <form
      className="w-full flex flex-col sm:flex-row gap-4"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <label htmlFor="email" className="sr-only">Email address</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="Your email"
        className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 transition"
      >
        Notify Me
      </button>
    </form>
  );
}