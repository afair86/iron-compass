
export const metadata = {
  title: "About Iron Compass",
  description:
    "Learn about the Iron Compass philosophy—a complete life system for men built on discipline, purpose, strength, and integrity. Discover who it is for, why it exists, and the core values that set it apart.",
};




import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">About Iron Compass</h1>

      {/* Why Iron Compass Exists */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why Iron Compass Exists</h2>
        <p className="text-gray-300 mb-3">
          Iron Compass exists to provide men with a proven, structured system for building discipline, strength, purpose, leadership, financial stability, and character. In a world full of distractions and quick fixes, men need clarity, direction, and a foundation of values to rise above mediocrity.
        </p>
        <p className="text-gray-300 mb-3">
          This is not a shortcut or a hack. Iron Compass is a complete life system—rooted in timeless principles and modern strategies—designed to help you become the man you’re meant to be.
        </p>
        <p className="text-gray-300">
          Every tool, lesson, and challenge is built to help you forge lasting change—one step at a time.
        </p>
      </section>

      {/* Core Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Core Values</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-xl font-semibold mb-2">Discipline</h3>
            <p className="text-gray-400">The foundation of all achievement. Show up, do the work, and build habits that last a lifetime.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-xl font-semibold mb-2">Purpose</h3>
            <p className="text-gray-400">Live with intention. Know your why, set your direction, and pursue it relentlessly.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-xl font-semibold mb-2">Strength</h3>
            <p className="text-gray-400">Develop physical, mental, and emotional resilience. Strength is built, not given.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
            <p className="text-gray-400">Do what’s right, even when it’s hard. Character is forged in the choices you make daily.</p>
          </div>
        </div>
      </section>

      {/* Who Iron Compass Is For */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Who Iron Compass Is For</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Men who feel stuck or scattered</li>
          <li>Fathers who want to lead better</li>
          <li>Busy professionals balancing work, training, and family</li>
          <li>Men rebuilding or leveling up</li>
        </ul>
      </section>

      {/* What Makes Iron Compass Different */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Makes Iron Compass Different</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Multi-domain: strength, mindset, purpose, leadership, money, and AI—no single focus, but a complete system.</li>
          <li>System and structure—not just random motivation or hype. Real tools, real progress.</li>
          <li>Built from real life experience, not theory. Everything here is tested in the real world.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-12">
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded bg-primary-600 text-white font-semibold hover:bg-primary-500 transition"
        >
          Start Your Rise
        </Link>
      </section>
    </main>
  );
}
