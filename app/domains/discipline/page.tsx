export const metadata = {
  title: "Iron Compass – Discipline & Mindset",
  description: "Master discipline and mindset with Iron Compass. Build habits, focus, and self-control to rise above distractions and achieve your goals as a man.",
};
import Link from 'next/link';

export default function DisciplinePage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">Discipline &amp; Mindset</h1>

      {/* Why Discipline Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why Discipline Matters</h2>
        <p className="text-gray-300 mb-3">
          Discipline is the foundation of all achievement for men. It’s about keeping promises to yourself, even when no one is watching. Discipline is the difference between drifting and living with purpose.
        </p>
        <p className="text-gray-300 mb-3">
          It means showing up when you don’t feel like it, doing the work when motivation is gone, and building a life on structure instead of chaos. Every standard you set and keep is a brick in the foundation of your character.
        </p>
        <p className="text-gray-300">
          Iron Compass is built to help you forge discipline, so you can rise above distractions and become the man you’re meant to be.
        </p>
      </section>

      {/* Areas Iron Compass Helps You With */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Areas Iron Compass Helps You With</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Morning and evening routines</li>
          <li>Training consistency</li>
          <li>Reducing distractions</li>
          <li>Following through on plans</li>
          <li>Journaling and reflection</li>
          <li>Managing energy, not just time</li>
          <li>Building standards you respect</li>
        </ul>
      </section>

      {/* How Iron Compass Builds Discipline */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How Iron Compass Builds Discipline</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-lg font-semibold mb-2">Daily Habit Systems</h3>
            <p className="text-gray-400">Track and reinforce the habits that matter most, every single day.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-lg font-semibold mb-2">Challenges &amp; Missions</h3>
            <p className="text-gray-400">Push your limits with structured challenges designed to build grit and consistency.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow">
            <h3 className="text-lg font-semibold mb-2">The Iron Compass OS</h3>
            <p className="text-gray-400">Leverage a life operating system to automate discipline and make success inevitable.</p>
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
