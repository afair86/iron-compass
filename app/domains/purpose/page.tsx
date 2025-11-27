
import Link from 'next/link';

export const metadata = {
  title: "Purpose & Direction – Iron Compass",
  description: "Find your mission, set your course, and live with intention. Iron Compass helps men discover purpose and direction for a life of meaning and impact.",
};

export default function PurposePage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">Purpose &amp; Direction</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        The domain of vision, meaning, and intentional living—where men chart their own course.
      </p>

      {/* Intro */}
      <section className="mb-10">
        <p className="mb-4 text-gray-300">
          Purpose is the compass that guides every decision, action, and relationship. Without a clear sense of direction, even the strongest men drift or stagnate. In the Iron Compass system, purpose and direction are about discovering what matters most, setting a course, and living with intention every day. This domain helps you clarify your mission and align your actions with your deepest values.
        </p>
      </section>

      {/* Why Purpose & Direction Matter */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Why Purpose & Direction Matter</h2>
        <p className="mb-4 text-gray-300">
          A man with purpose is unstoppable. He knows what he stands for, where he’s going, and why it matters. Purpose gives you the strength to endure hardship, the clarity to make tough choices, and the motivation to keep moving forward. Without it, you’re vulnerable to distraction, doubt, and regret.
        </p>
        <p className="text-gray-300">
          Iron Compass is here to help you find your mission and chart a path that’s uniquely yours.
        </p>
      </section>

      {/* What This Domain Covers */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">What This Domain Covers</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Clarifying your core values and vision</li>
          <li>Setting meaningful goals and priorities</li>
          <li>Building a personal mission statement</li>
          <li>Overcoming doubt, fear, and distraction</li>
          <li>Aligning daily actions with long-term purpose</li>
          <li>Adapting your path as you grow and learn</li>
        </ul>
      </section>

      {/* Signs You Need More Purpose */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Signs You Need More Purpose</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Feeling lost, stuck, or unmotivated</li>
          <li>Drifting from one thing to the next without direction</li>
          <li>Struggling to make decisions or set priorities</li>
          <li>Losing motivation when things get hard</li>
          <li>Regretting missed opportunities or wasted time</li>
          <li>Not knowing what you truly want from life</li>
        </ul>
      </section>

      {/* The Iron Compass Approach to Purpose & Direction */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">The Iron Compass Approach to Purpose & Direction</h2>
        <p className="mb-4 text-gray-300">
          Iron Compass offers a practical, step-by-step system for finding and living your purpose:
        </p>
        <ul className="list-decimal list-inside space-y-2 text-gray-300">
          <li>
            <strong>Clarify Your Values:</strong> Identify what matters most to you. Your values are the foundation for your purpose.
          </li>
          <li>
            <strong>Write Your Mission:</strong> Craft a personal mission statement that inspires and guides you.
          </li>
          <li>
            <strong>Set Your Course:</strong> Define clear goals and milestones that move you toward your vision.
          </li>
          <li>
            <strong>Act with Intention:</strong> Align your daily habits and choices with your mission.
          </li>
          <li>
            <strong>Review and Adjust:</strong> Regularly reflect on your path, celebrate progress, and adapt as you grow.
          </li>
        </ul>
      </section>

      {/* How Purpose & Direction Support the Other Domains */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">How Purpose & Direction Support the Other Domains</h2>
        <p className="mb-4 text-gray-300">
          Purpose and direction give meaning and focus to every other domain:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <strong>
              <Link href="/domains/discipline" className="underline">Discipline &amp; Mindset</Link>
            </strong>
            : A clear purpose makes discipline easier and more meaningful.
          </li>
          <li>
            <strong>
              <Link href="/domains/strength" className="underline">Strength</Link>
            </strong>
            : Training with purpose leads to greater results and satisfaction.
          </li>
          <li>
            <strong>
              <Link href="/domains/leadership" className="underline">Leadership &amp; Character</Link>
            </strong>
            : Leaders with vision inspire others and create lasting impact.
          </li>
          <li>
            <strong>
              <Link href="/domains/finance" className="underline">Financial Power</Link>
            </strong>
            : Money becomes a tool for fulfilling your mission, not just an end in itself.
          </li>
          <li>
            <strong>
              <Link href="/domains/ai" className="underline">AI Mastery &amp; Life Optimization</Link>
            </strong>
            : Technology can help you stay on course and maximize your impact.
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
