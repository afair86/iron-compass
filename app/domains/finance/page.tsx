
import Link from 'next/link';

export const metadata = {
  title: "Financial Power – Iron Compass",
  description: "Master your money, build wealth, and gain true freedom. Iron Compass guides men to financial strength with practical systems, habits, and mindset.",
};

export default function FinancePage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">Financial Power</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        The foundation for freedom, security, and opportunity in a man’s life.
      </p>

      {/* Intro */}
      <section className="mb-10">
        <p className="mb-4 text-gray-300">
          Financial power is about more than just making money—it’s about building a life of options, stability, and impact. In the Iron Compass system, financial strength is a pillar that supports every other domain: discipline, strength, purpose, leadership, and even the intelligent use of AI. True financial power comes from habits, systems, and a mindset that prioritizes growth, stewardship, and long-term thinking.
        </p>
      </section>

      {/* Why Financial Power Matters */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Why Financial Power Matters</h2>
        <p className="mb-4 text-gray-300">
          Money is a tool—one that can buy you time, freedom, and the ability to support those you care about. Without financial strength, even the best plans can be derailed by stress, scarcity, or missed opportunities. Men who master their finances gain the power to say yes to what matters and no to what doesn’t.
        </p>
        <p className="text-gray-300">
          Building wealth isn’t about luck or shortcuts. It’s about discipline, smart decisions, and a willingness to learn and adapt. Iron Compass is here to help you build a system for financial growth that lasts.
        </p>
      </section>

      {/* What This Domain Covers */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">What This Domain Covers</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Building a strong financial foundation (budgeting, saving, debt management)</li>
          <li>Investing for long-term growth</li>
          <li>Developing multiple streams of income</li>
          <li>Mindset shifts for abundance and stewardship</li>
          <li>Protecting your assets and planning for the future</li>
          <li>Using technology and AI to optimize your finances</li>
        </ul>
      </section>

      {/* Signs Your Finances Need Work */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Signs Your Finances Need Work</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Living paycheck to paycheck or feeling constant financial stress</li>
          <li>Unclear about where your money goes each month</li>
          <li>Struggling with debt or unable to save consistently</li>
          <li>Missing out on opportunities due to lack of funds</li>
          <li>Letting fear or confusion stop you from investing</li>
          <li>Not having a plan for emergencies or the future</li>
        </ul>
      </section>

      {/* The Iron Compass Approach to Financial Power */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">The Iron Compass Approach to Financial Power</h2>
        <p className="mb-4 text-gray-300">
          Iron Compass offers a practical, step-by-step system for building financial strength:
        </p>
        <ul className="list-decimal list-inside space-y-2 text-gray-300">
          <li>
            <strong>Get Clear on Your Numbers:</strong> Know your income, expenses, debts, and assets. Awareness is the first step to control.
          </li>
          <li>
            <strong>Build a Simple System:</strong> Automate savings, track spending, and set up guardrails to avoid overspending.
          </li>
          <li>
            <strong>Invest Consistently:</strong> Start early, invest regularly, and let compounding work for you. Avoid chasing trends.
          </li>
          <li>
            <strong>Increase Your Earning Power:</strong> Develop skills, pursue new opportunities, and create multiple income streams.
          </li>
          <li>
            <strong>Protect and Plan:</strong> Insure what matters, build an emergency fund, and plan for the future.
          </li>
          <li>
            <strong>Review and Refine:</strong> Regularly review your finances, adjust your plan, and keep learning.
          </li>
        </ul>
      </section>

      {/* How Financial Power Supports the Other Domains */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">How Financial Power Supports the Other Domains</h2>
        <p className="mb-4 text-gray-300">
          Financial strength amplifies your ability to grow in every other domain:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <strong>
              <Link href="/domains/discipline" className="underline">Discipline &amp; Mindset</Link>
            </strong>
            : Sticking to a budget and investing for the long term require daily discipline.
          </li>
          <li>
            <strong>
              <Link href="/domains/strength" className="underline">Strength</Link>
            </strong>
            : Financial resources enable you to invest in your health, training, and recovery.
          </li>
          <li>
            <strong>
              <Link href="/domains/purpose" className="underline">Purpose &amp; Direction</Link>
            </strong>
            : Money gives you the freedom to pursue your mission and support causes you believe in.
          </li>
          <li>
            <strong>
              <Link href="/domains/leadership" className="underline">Leadership &amp; Character</Link>
            </strong>
            : Leading your family or community is easier when you have financial stability.
          </li>
          <li>
            <strong>
              <Link href="/domains/ai" className="underline">AI Mastery &amp; Life Optimization</Link>
            </strong>
            : Using technology and AI can help you optimize your finances and make smarter decisions.
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
