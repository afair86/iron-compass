export const metadata = {
  title: "Iron Compass – Rise Beyond Limits | Life System for Men",
  description:
    "Iron Compass is a complete life system for men who want to build discipline, strength, purpose, leadership, financial stability, and AI-powered self improvement."
};


import Link from 'next/link';
import EmailCaptureForm from './components/EmailCaptureForm';

// Domain data for easy mapping
// Removed the domains array as part of the cleanup.

export default function HomePage() {
  return (
    <main className="flex flex-col items-center px-4">
      <section id="hero" className="max-w-5xl mx-auto px-4 pt-16 pb-16 lg:pt-24 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* LEFT: Text content */}
          <div>
            <p className="heading-font text-xs text-icRed mb-3 tracking-[0.3em]">A SYSTEM FOR MEN</p>
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl text-icText mb-4">RISE BEYOND LIMITS</h1>
            <p className="text-base sm:text-lg text-icMuted mb-6">Iron Compass is a complete life system for men—designed to help you master discipline, purpose, strength, leadership, financial power, and AI-driven life optimization. Forge your path, lead with integrity, and rise above the ordinary.</p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a href="/domains" className="heading-font inline-flex items-center rounded-full bg-icRed px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-icRedDark/40 hover:bg-icRedHover transition">Start Your Rise</a>
              <a href="/blog" className="text-sm text-icMuted hover:text-icText underline-offset-4 hover:underline">Read the Journal</a>
            </div>
            <p className="text-base text-icMuted">Iron Compass is built for men who want to improve every part of their life — from discipline and daily habits, to strength and fitness, to purpose, leadership, financial stability, and the intelligent use of AI for personal growth. This site exists to help men build a complete life system focused on long-term progress, self-mastery, and living life to the fullest.</p>
          </div>
          {/* RIGHT: Six Domains card */}
          <aside className="ic-card rounded-2xl p-6 sm:p-7 lg:p-8 bg-icCard border border-slate-700/70 shadow-lg">
            <h2 className="heading-font text-sm text-icRed mb-2">THE SIX DOMAINS</h2>
            <p className="text-sm text-icMuted mb-5">A complete, disciplined life requires mastery across six domains. Iron Compass guides men to develop strength, discipline, purpose, leadership, financial power, and AI mastery—so you can rise beyond limits and lead with purpose and integrity.</p>
            <div className="space-y-4 text-sm">
              <a href="/domains/strength" className="group block rounded-lg border border-slate-700/70 bg-slate-900/60 px-4 py-3 hover:border-icRedHover hover:bg-slate-900/90 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="heading-font text-[11px] text-icText">STRENGTH</span>
                  <span className="text-[10px] text-icRed opacity-0 group-hover:opacity-100 transition">Learn more →</span>
                </div>
                <p className="text-xs text-icMuted">Build physical and mental resilience to conquer life’s challenges.</p>
              </a>
              <a href="/domains/discipline" className="group block rounded-lg border border-slate-700/70 bg-slate-900/60 px-4 py-3 hover:border-icRedHover hover:bg-slate-900/90 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="heading-font text-[11px] text-icText">DISCIPLINE & MINDSET</span>
                  <span className="text-[10px] text-icRed opacity-0 group-hover:opacity-100 transition">Learn more →</span>
                </div>
                <p className="text-xs text-icMuted">Forge habits, self-control, and a winning mindset for lasting success.</p>
              </a>
              <a href="/domains/purpose" className="group block rounded-lg border border-slate-700/70 bg-slate-900/60 px-4 py-3 hover:border-icRedHover hover:bg-slate-900/90 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="heading-font text-[11px] text-icText">PURPOSE & DIRECTION</span>
                  <span className="text-[10px] text-icRed opacity-0 group-hover:opacity-100 transition">Learn more →</span>
                </div>
                <p className="text-xs text-icMuted">Discover your mission and chart a course toward a meaningful life.</p>
              </a>
              <a href="/domains/leadership" className="group block rounded-lg border border-slate-700/70 bg-slate-900/60 px-4 py-3 hover:border-icRedHover hover:bg-slate-900/90 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="heading-font text-[11px] text-icText">LEADERSHIP & CHARACTER</span>
                  <span className="text-[10px] text-icRed opacity-0 group-hover:opacity-100 transition">Learn more →</span>
                </div>
                <p className="text-xs text-icMuted">Lead with integrity, inspire others, and become a man of value.</p>
              </a>
              <a href="/domains/finance" className="group block rounded-lg border border-slate-700/70 bg-slate-900/60 px-4 py-3 hover:border-icRedHover hover:bg-slate-900/90 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="heading-font text-[11px] text-icText">FINANCIAL POWER</span>
                  <span className="text-[10px] text-icRed opacity-0 group-hover:opacity-100 transition">Learn more →</span>
                </div>
                <p className="text-xs text-icMuted">Achieve financial stability and growth through smart decisions.</p>
              </a>
              <a href="/domains/ai" className="group block rounded-lg border border-slate-700/70 bg-slate-900/60 px-4 py-3 hover:border-icRedHover hover:bg-slate-900/90 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="heading-font text-[11px] text-icText">AI MASTERY & LIFE OPTIMIZATION</span>
                  <span className="text-[10px] text-icRed opacity-0 group-hover:opacity-100 transition">Learn more →</span>
                </div>
                <p className="text-xs text-icMuted">Leverage AI and systems to optimize every aspect of your life.</p>
              </a>
            </div>
          </aside>
        </div>
      </section>
      {/* ...existing code for other sections... */}

      {/* Philosophy Section (unchanged) */}
      <section className="w-full max-w-3xl py-12 md:py-16">
        <h2 className="text-2xl font-bold mb-6 text-white">The Iron Compass Philosophy</h2>
        <p className="mb-4 text-gray-300 leading-relaxed max-w-2xl mx-auto">
          At Iron Compass, we believe every man is called to rise above mediocrity. Our system is built on timeless principles—discipline, strength, purpose, and integrity—combined with modern tools for a rapidly changing world.
        </p>
        <p className="mb-4 text-gray-300 leading-relaxed max-w-2xl mx-auto">
          We guide you to lead yourself and others, to build unshakeable character, and to achieve financial and personal freedom. With AI mastery and life optimization, you’ll unlock new levels of performance and fulfillment.
        </p>
        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
          This is more than self-improvement. It’s a brotherhood, a mission, and a way of life.
        </p>
      </section>


      {/* Call to Action Section - Neutral Only (no non-red accent) */}
      <section className="w-full max-w-2xl py-12 md:py-16 text-center">
        <h2 className="text-2xl font-bold mb-6 text-ic-text">Ready to Begin Your Journey?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#"
            className="px-8 py-4 rounded-lg bg-ic-card text-ic-text font-semibold hover:bg-ic-surface transition text-lg border border-ic-card/60"
          >
            Start Your Rise
          </Link>
          <Link
            href="/domains"
            className="px-8 py-4 rounded-lg border border-ic-card/60 text-icMuted font-semibold hover:bg-ic-surface transition text-lg"
          >
            Explore the Domains
          </Link>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="w-full max-w-xl mx-auto mb-12">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-white">Start Your Rise</h2>
          <p className="text-gray-300 mb-6 text-center">Join the early list for the 7-Day Discipline Challenge and Iron Compass updates.</p>
          <EmailCaptureForm />
        </div>
      </section>
    </main>
  );
}
