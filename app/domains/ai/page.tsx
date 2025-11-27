
import Link from 'next/link';

export const metadata = {
  title: "AI Mastery & Life Optimization – Iron Compass",
  description: "Harness AI and systems to optimize your life. Iron Compass shows men how to use technology for growth, productivity, and self-mastery.",
};

export default function AIPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">AI Mastery &amp; Life Optimization</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        The domain of leverage, automation, and intelligent living—where men use technology to multiply their impact.
      </p>

      {/* Intro */}
      <section className="mb-10">
        <p className="mb-4 text-gray-300">
          AI and technology are the ultimate force multipliers. In the Iron Compass system, mastering AI isn’t about replacing your effort—it’s about amplifying your strengths, automating the mundane, and making smarter decisions. This domain is for men who want to stay ahead, optimize every area of life, and use technology as a tool for growth, not distraction.
        </p>
      </section>

      {/* Why AI Mastery & Life Optimization Matter */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Why AI Mastery & Life Optimization Matter</h2>
        <p className="mb-4 text-gray-300">
          The world is changing fast. Men who learn to harness AI and systems will outpace those who don’t. Life optimization isn’t about perfection—it’s about using every tool at your disposal to create more time, energy, and results. Iron Compass is here to help you master the tools that matter and avoid the noise that doesn’t.
        </p>
        <p className="text-gray-300">
          Technology should serve your mission, not distract from it. Learn to use AI with intention and purpose.
        </p>
      </section>

      {/* What This Domain Covers */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">What This Domain Covers</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Using AI for productivity and decision-making</li>
          <li>Automating routines and eliminating busywork</li>
          <li>Building systems for health, wealth, and growth</li>
          <li>Staying focused in a world of digital distraction</li>
          <li>Leveraging data and analytics for better results</li>
          <li>Choosing the right tools for your goals</li>
        </ul>
      </section>

      {/* Signs You Need to Optimize */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Signs You Need to Optimize</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Feeling overwhelmed by information or tasks</li>
          <li>Wasting time on repetitive or low-value work</li>
          <li>Struggling to keep up with new technology</li>
          <li>Not tracking your habits, progress, or results</li>
          <li>Letting tech distract you instead of empower you</li>
          <li>Missing out on opportunities to automate or delegate</li>
        </ul>
      </section>

      {/* The Iron Compass Approach to AI Mastery & Life Optimization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">The Iron Compass Approach to AI Mastery & Life Optimization</h2>
        <p className="mb-4 text-gray-300">
          Iron Compass offers a practical, step-by-step system for mastering AI and optimizing your life:
        </p>
        <ul className="list-decimal list-inside space-y-2 text-gray-300">
          <li>
            <strong>Identify Leverage Points:</strong> Find the areas of your life where technology can have the biggest impact.
          </li>
          <li>
            <strong>Choose the Right Tools:</strong> Focus on a few powerful apps, automations, or AI models that align with your goals.
          </li>
          <li>
            <strong>Automate and Systemize:</strong> Set up routines, reminders, and automations to free up your time and energy.
          </li>
          <li>
            <strong>Track and Optimize:</strong> Use data to measure progress and refine your systems.
          </li>
          <li>
            <strong>Stay Human:</strong> Use technology to support your mission, not replace your judgment or relationships.
          </li>
        </ul>
      </section>

      {/* How AI Mastery & Life Optimization Support the Other Domains */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">How AI Mastery & Life Optimization Support the Other Domains</h2>
        <p className="mb-4 text-gray-300">
          Technology and AI can accelerate your growth in every other domain:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <strong>
              <Link href="/domains/discipline" className="underline">Discipline &amp; Mindset</Link>
            </strong>
            : Use apps and automations to reinforce habits and routines.
          </li>
          <li>
            <strong>
              <Link href="/domains/strength" className="underline">Strength</Link>
            </strong>
            : Track workouts, nutrition, and recovery for better results.
          </li>
          <li>
            <strong>
              <Link href="/domains/purpose" className="underline">Purpose &amp; Direction</Link>
            </strong>
            : Stay focused on your mission and avoid digital distractions.
          </li>
          <li>
            <strong>
              <Link href="/domains/leadership" className="underline">Leadership &amp; Character</Link>
            </strong>
            : Lead by example in using technology wisely and ethically.
          </li>
          <li>
            <strong>
              <Link href="/domains/finance" className="underline">Financial Power</Link>
            </strong>
            : Use AI and automation to optimize your finances and investments.
          </li>
        </ul>
      </section>

      {/* Navigation Links */}
      <nav className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link href="/domains" className="text-primary-400 hover:underline font-medium text-center">Back to Domains</Link>
        <Link href="/" className="text-primary-400 hover:underline font-medium text-center">Back to Home</Link>
      </nav>
    </main>
  );
}
