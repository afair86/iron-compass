export const metadata = {
  title: "Iron Compass – Rise Beyond Limits | Life System for Men",
  description:
    "Iron Compass is a complete life system for men who want to build discipline, strength, purpose, leadership, financial stability, and AI-powered self improvement."
};


import Link from 'next/link';
import EmailCaptureForm from './components/EmailCaptureForm';

// Domain data for easy mapping
const domains = [
  {
    title: 'Strength',
    desc: 'Build physical and mental resilience to conquer life’s challenges.',
    slug: 'strength',
    href: '/domains/strength',
  },
  {
    title: 'Discipline & Mindset',
    desc: 'Forge habits, self-control, and a winning mindset for lasting success.',
    slug: 'discipline',
    href: '/domains/discipline',
  },
  {
    title: 'Purpose & Direction',
    desc: 'Discover your mission and chart a course toward a meaningful life.',
    slug: 'purpose',
    href: '/domains/purpose',
  },
  {
    title: 'Leadership & Character',
    desc: 'Lead with integrity, inspire others, and become a man of value.',
    slug: 'leadership',
    href: '/domains/leadership',
  },
  {
    title: 'Financial Power',
    desc: 'Achieve financial stability and growth through smart decisions.',
    slug: 'finance',
    href: '/domains/finance',
  },
  {
    title: 'AI Mastery & Life Optimization',
    desc: 'Leverage AI and systems to optimize every aspect of your life.',
    slug: 'ai',
    href: '/domains/ai',
  },
];


export default function HomePage() {
  return (
    <main className="flex flex-col items-center px-4">
      {/* Hero Section */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row gap-12 md:gap-16 items-center justify-between py-16 md:py-28 relative">
        {/* Radial Glow */}
        <div className="ic-radial-glow" aria-hidden="true"></div>
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-start z-10 max-w-xl w-full">
          <span className="heading-font text-icRed text-sm md:text-base mb-4 tracking-widest">A SYSTEM FOR MEN</span>
          <h1 className="heading-font text-4xl md:text-6xl font-bold mb-6 text-ic-text drop-shadow-lg leading-tight">
            Rise Beyond Limits
          </h1>
          <p className="max-w-lg text-lg md:text-xl text-icMuted leading-relaxed mb-6">
            Iron Compass is a complete life system for men—designed to help you master discipline, purpose, strength, leadership, financial power, and AI-driven life optimization. Forge your path, lead with integrity, and rise above the ordinary.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <Link href="/domains" className="heading-font text-base px-6 py-2 rounded-full bg-ic-red hover:bg-ic-redHover text-ic-text font-bold shadow-lg shadow-ic-redDark/40 transition-all">
              Start Your Rise
            </Link>
            <Link href="/blog" className="heading-font text-base px-4 py-2 rounded-full text-icRed hover:underline underline-offset-4 font-bold transition-all">
              Read the Journal
            </Link>
          </div>
          <p className="max-w-lg text-base text-icMuted leading-relaxed">
            Iron Compass is built for men who want to improve every part of their life — from discipline and daily habits, to strength and fitness, to purpose, leadership, financial stability, and the intelligent use of AI for personal growth. This site exists to help men build a complete life system focused on long-term progress, self-mastery, and living life to the fullest.
          </p>
        </div>
        {/* Right Column: Domains Card */}
        <div className="flex-1 w-full max-w-md z-10">
          <div className="ic-card">
            <h2 className="heading-font text-lg text-icRed mb-4 tracking-widest">The Six Domains</h2>
            <div className="flex flex-col gap-4">
              {domains.map((domain) => (
                <Link
                  key={domain.slug}
                  href={domain.href}
                  className="group block rounded-lg px-4 py-3 transition border border-transparent hover:border-icRed/70 hover:bg-icSurface/80"
                >
                  <div className="flex flex-col">
                    <span className="heading-font text-base text-ic-text mb-1 group-hover:text-ic-red transition-colors">{domain.title}</span>
                    <span className="text-icMuted text-sm leading-snug">{domain.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

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


      {/* Call to Action Section */}
      <section className="w-full max-w-2xl py-12 md:py-16 text-center">
        <h2 className="text-2xl font-bold mb-6 text-white">Ready to Begin Your Journey?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#"
            className="px-8 py-4 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 transition text-lg"
          >
            Start Your Rise
          </Link>
          <Link
            href="/domains"
            className="px-8 py-4 rounded-lg border border-primary-600 text-primary-400 font-semibold hover:bg-primary-900 transition text-lg"
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
