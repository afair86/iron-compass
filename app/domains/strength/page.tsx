export const metadata = {
  title: "Iron Compass – Strength",
  description: "Build physical and mental resilience with Iron Compass. Strength is the foundation for overcoming challenges and leading a powerful life.",
};
import Link from 'next/link';

export default function StrengthPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">Strength</h1>

      {/* Why Strength Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why Strength Matters</h2>
        <p className="text-gray-300 mb-3">
          Strength is more than muscle—it's the foundation of resilience, confidence, and capability. Building strength means forging a body and mind that can handle adversity and rise to any challenge.
        </p>
        <p className="text-gray-300 mb-3">
          True strength is earned through discipline, consistency, and a willingness to push past comfort. It’s about showing up, doing the work, and becoming unbreakable in the face of life’s demands.
        </p>
        <p className="text-gray-300">
          Iron Compass is here to help you build both physical and mental strength, so you can lead, protect, and thrive.
        </p>
      </section>

      {/* Training Areas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Key Training Areas</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
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
        <h2 className="text-2xl font-bold mb-6">How Iron Compass Helps You Get Stronger</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-lg font-semibold mb-2">Personalized Training Plans</h3>
            <p className="text-gray-400">Follow proven routines tailored to your goals and level.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-400">Monitor your lifts, habits, and milestones to stay motivated.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-lg font-semibold mb-2">Community Challenges</h3>
            <p className="text-gray-400">Join others in monthly challenges to push your limits and grow stronger together.</p>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <nav className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link href="/domains" className="text-primary-400 hover:underline font-medium text-center">Back to Domains</Link>
        <Link href="/" className="text-primary-400 hover:underline font-medium text-center">Back to Home</Link>
        <Link href="/blog/hello-world" className="text-primary-400 hover:underline font-medium text-center">Read: Hello World Blog</Link>
      </nav>
    </main>
  );
}
