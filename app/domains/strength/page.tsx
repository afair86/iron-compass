export const metadata = {
  title: "Iron Compass – Strength",
  description: "Build physical and mental resilience with Iron Compass. Strength is the foundation for overcoming challenges and leading a powerful life.",
};
import Link from 'next/link';

export default function StrengthPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="heading-font text-3xl md:text-4xl font-bold mb-10 text-center text-ic-text tracking-widest">Strength</h1>

      {/* Why Strength Matters */}
      <section className="mb-12">
        <h2 className="heading-font text-2xl font-bold mb-4 text-icRed tracking-widest">Why Strength Matters</h2>
        <p className="text-icMuted mb-3">
          Strength is more than muscle—it&rsquo;s the foundation of resilience, confidence, and capability. Building strength means forging a body and mind that can handle adversity and rise to any challenge.
        </p>
        <p className="text-icMuted mb-3">
          True strength is earned through discipline, consistency, and a willingness to push past comfort. It&rsquo;s about showing up, doing the work, and becoming unbreakable in the face of life&rsquo;s demands.
        </p>
        <p className="text-icMuted">
          Iron Compass is here to help you build both physical and mental strength, so you can lead, protect, and thrive.
        </p>
      </section>

      {/* Training Areas */}
      <section className="mb-12">
        <h2 className="heading-font text-2xl font-bold mb-4 text-icRed tracking-widest">Key Training Areas</h2>
        <ul className="list-disc list-inside space-y-2 text-icMuted">
          <li>Strength training & progressive overload</li>
          <li>Mobility and injury prevention</li>
          <li>Cardiovascular conditioning</li>
          <li>Nutrition for performance</li>
          <li>Recovery and sleep optimization</li>
          <li>Mental toughness drills</li>
        </ul>
      </section>

      {/* How Iron Compass Helps You Get Stronger */}
      <section className="mb-12">
        <h2 className="heading-font text-2xl font-bold mb-6 text-icRed tracking-widest">How Iron Compass Helps You Get Stronger</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="ic-card">
            <h3 className="heading-font text-lg font-bold mb-2 text-ic-text">Personalized Training Plans</h3>
            <p className="text-icMuted">Follow proven routines tailored to your goals and level.</p>
          </div>
          <div className="ic-card">
            <h3 className="heading-font text-lg font-bold mb-2 text-ic-text">Progress Tracking</h3>
            <p className="text-icMuted">Monitor your lifts, habits, and milestones to stay motivated.</p>
          </div>
          <div className="ic-card">
            <h3 className="heading-font text-lg font-bold mb-2 text-ic-text">Community Challenges</h3>
            <p className="text-icMuted">Join others in monthly challenges to push your limits and grow stronger together.</p>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <nav className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link href="/domains" className="heading-font text-icRed hover:underline underline-offset-4 font-bold">Back to Domains</Link>
        <Link href="/" className="heading-font text-icRed hover:underline underline-offset-4 font-bold">Back to Home</Link>
      </nav>
    </main>
  );
}
