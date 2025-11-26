export const metadata = {
  title: "Iron Compass – Rise Beyond Limits",
  description:
    "Iron Compass is a complete life system for men built around discipline, strength, purpose, leadership, financial stability, and AI-powered life optimization."
};

import Link from 'next/link';

// Domain data for easy mapping
const domains = [
  {
    title: 'Strength',
    desc: 'Build physical and mental resilience to conquer life’s challenges.',
    slug: 'strength',
  },
  {
    title: 'Discipline & Mindset',
    desc: 'Forge habits, self-control, and a winning mindset for lasting success.',
    slug: 'discipline',
  },
  {
    title: 'Purpose & Direction',
    desc: 'Discover your mission and chart a course toward a meaningful life.',
    slug: 'purpose',
  },
  {
    title: 'Leadership & Character',
    desc: 'Lead with integrity, inspire others, and become a man of value.',
    slug: 'leadership',
  },
  {
    title: 'Financial Power',
    desc: 'Achieve financial stability and growth through smart decisions.',
    slug: 'finance',
  },
  {
    title: 'AI Mastery & Life Optimization',
    desc: 'Leverage AI and systems to optimize every aspect of your life.',
    slug: 'ai',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center px-4">
      {/* Hero Section */}
      <section className="w-full max-w-3xl text-center py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg">
          Rise Beyond Limits
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed mb-2">
          Iron Compass is a complete life system for men—designed to help you master discipline, purpose, strength, leadership, financial power, and AI-driven life optimization. Forge your path, lead with integrity, and rise above the ordinary.
        </p>
      </section>

      {/* Domains Section */}
      <section className="w-full max-w-5xl py-12 md:py-16">
        <h2 className="text-2xl font-bold mb-10 text-center">The Six Domains</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <div
              key={domain.slug}
              className="bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col justify-between border border-gray-800 hover:border-primary-600 transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-white">{domain.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{domain.desc}</p>
              <Link
                href={`/domains/${domain.slug}`}
                className="mt-auto inline-block text-primary-400 hover:underline font-medium"
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
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
    </main>
  );
}
