
import Link from 'next/link';

export const metadata = {
  title: "Leadership & Character – Iron Compass",
  description: "Lead with integrity, inspire others, and build unshakable character. Iron Compass guides men to authentic leadership through action, values, and self-mastery.",
};

export default function LeadershipPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">Leadership &amp; Character</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        The domain of influence, example, and legacy—where men become the leaders others want to follow.
      </p>

      {/* Intro */}
      <section className="mb-10">
        <p className="mb-4 text-gray-300">
          Leadership is not about titles or authority—it’s about action, responsibility, and the willingness to set the standard. In the Iron Compass system, leadership and character are inseparable. You lead best when you live your values, hold yourself accountable, and inspire others by example. This domain is about building the habits, mindset, and courage to lead in your family, work, and community.
        </p>
      </section>

      {/* Why Leadership & Character Matter */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Why Leadership & Character Matter</h2>
        <p className="mb-4 text-gray-300">
          Every man is called to lead—whether it’s himself, his family, or a team. Leadership is tested in adversity, not comfort. Character is revealed in the choices you make when no one is watching. Men who develop both become anchors for those around them, creating trust, stability, and progress.
        </p>
        <p className="text-gray-300">
          The world needs more men who lead with integrity, humility, and strength. Iron Compass is here to help you become that man.
        </p>
      </section>

      {/* What This Domain Covers */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">What This Domain Covers</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Building trust and credibility through action</li>
          <li>Developing core values and a personal code</li>
          <li>Communication, influence, and conflict resolution</li>
          <li>Decision-making under pressure</li>
          <li>Mentorship and serving others</li>
          <li>Resilience and emotional intelligence</li>
        </ul>
      </section>

      {/* Signs Your Leadership Needs Work */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Signs Your Leadership Needs Work</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Struggling to earn respect or trust from others</li>
          <li>Difficulty making decisions or taking responsibility</li>
          <li>Letting emotions or ego drive your actions</li>
          <li>Failing to follow through on commitments</li>
          <li>Not living up to your own standards or values</li>
          <li>Feeling isolated or unable to inspire those around you</li>
        </ul>
      </section>

      {/* The Iron Compass Approach to Leadership & Character */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">The Iron Compass Approach to Leadership & Character</h2>
        <p className="mb-4 text-gray-300">
          Iron Compass offers a practical, step-by-step system for building leadership and character:
        </p>
        <ul className="list-decimal list-inside space-y-2 text-gray-300">
          <li>
            <strong>Define Your Values:</strong> Get clear on what you stand for. Write your personal code and revisit it often.
          </li>
          <li>
            <strong>Lead Yourself First:</strong> Set the example in discipline, strength, and purpose. Others follow what you do, not just what you say.
          </li>
          <li>
            <strong>Communicate Clearly:</strong> Learn to listen, speak with purpose, and resolve conflict with respect.
          </li>
          <li>
            <strong>Serve Others:</strong> Leadership is about lifting others up, not just advancing yourself. Mentor, support, and empower those around you.
          </li>
          <li>
            <strong>Embrace Accountability:</strong> Own your mistakes, learn from them, and keep your word.
          </li>
          <li>
            <strong>Grow Through Challenge:</strong> Seek out responsibility and step up when it’s hard. Leadership is forged in adversity.
          </li>
        </ul>
      </section>

      {/* How Leadership & Character Support the Other Domains */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">How Leadership & Character Support the Other Domains</h2>
        <p className="mb-4 text-gray-300">
          Leadership and character amplify your growth in every other domain:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <strong>
              <Link href="/domains/discipline" className="underline">Discipline &amp; Mindset</Link>
            </strong>
            : Leading yourself with discipline sets the standard for others.
          </li>
          <li>
            <strong>
              <Link href="/domains/strength" className="underline">Strength</Link>
            </strong>
            : Physical and mental strength inspire confidence and respect.
          </li>
          <li>
            <strong>
              <Link href="/domains/purpose" className="underline">Purpose &amp; Direction</Link>
            </strong>
            : A clear mission gives your leadership focus and meaning.
          </li>
          <li>
            <strong>
              <Link href="/domains/finance" className="underline">Financial Power</Link>
            </strong>
            : Financial stability allows you to lead and serve without fear or distraction.
          </li>
          <li>
            <strong>
              <Link href="/domains/ai" className="underline">AI Mastery &amp; Life Optimization</Link>
            </strong>
            : Leveraging technology helps you lead more effectively and make better decisions.
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
