
export const metadata = {
  title: "About Iron Compass",
  description:
    "Learn about the Iron Compass philosophy—a complete life system for men built on discipline, purpose, strength, and integrity. Discover who it is for, why it exists, and the core values that set it apart.",
};




import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="heading-font text-3xl md:text-4xl font-bold mb-10 text-center text-ic-text tracking-widest">About Iron Compass</h1>

      {/* Why Iron Compass Exists */}
      <section className="mb-12">
        <h2 className="heading-font text-2xl font-bold mb-4 text-icRed tracking-widest">Why Iron Compass Exists</h2>
        <p className="text-icMuted mb-3">
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
        <h2 className="heading-font text-2xl font-bold mb-6 text-icRed tracking-widest">Core Values</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="ic-card">
            <h3 className="heading-font text-lg font-bold mb-2 text-ic-text">Discipline</h3>
            <p className="text-icMuted">The foundation of all achievement. Show up, do the work, and build habits that last a lifetime.</p>
          </div>
          <div className="ic-card">
            <h3 className="heading-font text-lg font-bold mb-2 text-ic-text">Purpose</h3>
            <p className="text-icMuted">Live with intention. Know your why, set your direction, and pursue it relentlessly.</p>
          </div>
          <div className="ic-card">
            <h3 className="heading-font text-lg font-bold mb-2 text-ic-text">Strength</h3>
            <p className="text-icMuted">Develop physical, mental, and emotional resilience. Strength is built, not given.</p>
          </div>
          <div className="ic-card">
            <h3 className="heading-font text-lg font-bold mb-2 text-ic-text">Integrity</h3>
            <p className="text-icMuted">Do whats right, even when its hard. Character is forged in the choices you make daily.</p>
          </div>
        </div>
      </section>

      {/* Who Iron Compass Is For */}
      <section className="mb-12">
        <h2 className="heading-font text-2xl font-bold mb-4 text-icRed tracking-widest">Who Iron Compass Is For</h2>
        <ul className="list-disc list-inside space-y-2 text-icMuted">
          <li>Men who feel stuck or scattered</li>
          <li>Fathers who want to lead better</li>
          <li>Busy professionals balancing work, training, and family</li>
          <li>Men rebuilding or leveling up</li>
        </ul>
      </section>

      {/* What Makes Iron Compass Different */}
      <section className="mb-12">
        <h2 className="heading-font text-2xl font-bold mb-4 text-icRed tracking-widest">What Makes Iron Compass Different</h2>
        <ul className="list-disc list-inside space-y-2 text-icMuted">
          <li>Multi-domain: strength, mindset, purpose, leadership, money, and AI—no single focus, but a complete system.</li>
          <li>System and structure—not just random motivation or hype. Real tools, real progress.</li>
          <li>Built from real life experience, not theory. Everything here is tested in the real world.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-12">
        <Link
          href="/"
          className="heading-font inline-block px-8 py-3 rounded-full bg-ic-red hover:bg-ic-redHover text-ic-text font-bold shadow-lg shadow-ic-redDark/40 transition mb-4"
        >
          Start Your Rise
        </Link>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Link href="/domains" className="heading-font text-icRed hover:underline underline-offset-4 font-bold">Explore the Six Domains</Link>
          <Link href="/blog" className="heading-font text-icRed hover:underline underline-offset-4 font-bold">Read the Journal</Link>
        </div>
      </section>
    </main>
  );
}
