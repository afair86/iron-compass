import Link from 'next/link';

export const metadata = {
  title: "Discipline & Mindset – Iron Compass",
  description: "A grounded guide to discipline for men. Learn how to build discipline, daily habits, and self-mastery with the Iron Compass system.",
};

export default function DisciplinePage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      {/* Page Title */}
      <h1 className="heading-font text-4xl md:text-5xl font-bold mb-6 text-center text-ic-text tracking-widest">
        DISCIPLINE & MINDSET
      </h1>
      <p className="text-lg text-ic-muted mb-16 text-center max-w-2xl mx-auto leading-relaxed">
        The foundation for structure, consistency, and self-mastery in every area of a man's life.
      </p>

      {/* Intro Section */}
      <section className="mb-16">
        <p className="mb-6 text-ic-muted leading-relaxed">
          Discipline is the backbone of a complete life system. Without it, even the best intentions and plans fall apart. For men who want to rise beyond limits, discipline is not just a trait—it's the daily practice that supports every other domain: strength, purpose, leadership, financial power, and even the intelligent use of AI. Mindset and discipline work together to create the structure and control needed to build a life of meaning and progress.
        </p>
      </section>

      {/* Why Discipline Matters More Than Motivation */}
      <section className="mb-16">
        <h2 className="heading-font text-2xl md:text-3xl font-bold mb-6 text-ic-text tracking-wider">
          WHY DISCIPLINE MATTERS MORE THAN MOTIVATION
        </h2>
        <p className="mb-6 text-ic-muted leading-relaxed">
          Motivation is unreliable. It comes and goes, often fading when you need it most. Discipline, on the other hand, is a choice you make every day—regardless of how you feel. Men who rely on motivation find themselves stuck in cycles of inconsistency. Those who build real discipline create a stable foundation for progress, no matter the circumstances.
        </p>
        <p className="text-ic-muted leading-relaxed">
          Building discipline means showing up, doing the work, and keeping promises to yourself. It's about taking control of your actions and mindset, even when comfort or distraction calls. This is how to build discipline that lasts.
        </p>
      </section>

      {/* What This Domain Covers */}
      <section className="mb-16">
        <h2 className="heading-font text-2xl md:text-3xl font-bold mb-6 text-ic-text tracking-wider">
          WHAT THIS DOMAIN COVERS
        </h2>
        <ul className="space-y-3 text-ic-muted">
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Daily habits and routines that create structure</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">How to build discipline through consistent action</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Developing a resilient, focused mindset</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Identifying and overcoming distractions</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Setting and upholding personal standards</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Practical self-mastery techniques for men</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Using systems and tools to support discipline</span>
          </li>
        </ul>
      </section>

      {/* Signs Your Discipline Needs Work */}
      <section className="mb-16">
        <h2 className="heading-font text-2xl md:text-3xl font-bold mb-6 text-ic-text tracking-wider">
          SIGNS YOUR DISCIPLINE NEEDS WORK
        </h2>
        <ul className="space-y-3 text-ic-muted">
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Struggling to follow through on daily habits or routines</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Frequently distracted or procrastinating on important tasks</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Setting goals but rarely achieving them</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Letting emotions or moods dictate your actions</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Feeling out of control or scattered in your day-to-day life</span>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <span className="leading-relaxed">Difficulty saying no to temptations or unhealthy patterns</span>
          </li>
        </ul>
      </section>

      {/* The Iron Compass Approach to Discipline */}
      <section className="mb-16">
        <h2 className="heading-font text-2xl md:text-3xl font-bold mb-6 text-ic-text tracking-wider">
          THE IRON COMPASS APPROACH TO DISCIPLINE
        </h2>
        <p className="mb-6 text-ic-muted leading-relaxed">
          Iron Compass offers a step-by-step system for building discipline and mindset:
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="heading-font text-lg font-semibold mb-2 text-ic-text">
              1. CLARIFY YOUR STANDARDS
            </h3>
            <p className="text-ic-muted leading-relaxed">
              Define what matters most and set clear, non-negotiable standards for your behavior.
            </p>
          </div>
          <div>
            <h3 className="heading-font text-lg font-semibold mb-2 text-ic-text">
              2. BUILD DAILY HABITS
            </h3>
            <p className="text-ic-muted leading-relaxed">
              Start small. Establish simple routines that reinforce your standards every day.
            </p>
          </div>
          <div>
            <h3 className="heading-font text-lg font-semibold mb-2 text-ic-text">
              3. TRACK AND REVIEW
            </h3>
            <p className="text-ic-muted leading-relaxed">
              Use tools to monitor your habits and progress. Review weekly to identify patterns and adjust.
            </p>
          </div>
          <div>
            <h3 className="heading-font text-lg font-semibold mb-2 text-ic-text">
              4. REDUCE FRICTION
            </h3>
            <p className="text-ic-muted leading-relaxed">
              Remove distractions and obstacles from your environment. Make the disciplined choice the easy choice.
            </p>
          </div>
          <div>
            <h3 className="heading-font text-lg font-semibold mb-2 text-ic-text">
              5. EMBRACE DISCOMFORT
            </h3>
            <p className="text-ic-muted leading-relaxed">
              Growth happens outside your comfort zone. Seek challenge and learn to act regardless of mood.
            </p>
          </div>
          <div>
            <h3 className="heading-font text-lg font-semibold mb-2 text-ic-text">
              6. REFLECT AND REFINE
            </h3>
            <p className="text-ic-muted leading-relaxed">
              Regularly reflect on your actions and mindset. Adjust your approach as you learn and grow.
            </p>
          </div>
        </div>
      </section>

      {/* How Discipline Supports the Other Domains */}
      <section className="mb-16">
        <h2 className="heading-font text-2xl md:text-3xl font-bold mb-6 text-ic-text tracking-wider">
          HOW DISCIPLINE SUPPORTS THE OTHER DOMAINS
        </h2>
        <p className="mb-6 text-ic-muted leading-relaxed">
          Discipline is the thread that connects and strengthens every other domain in the Iron Compass system:
        </p>
        <div className="space-y-4">
          <div className="leading-relaxed">
            <Link href="/domains/strength" className="text-ic-red hover:text-ic-redHover font-semibold">
              Strength
            </Link>
            <span className="text-ic-muted">: Consistent training and recovery require daily discipline.</span>
          </div>
          <div className="leading-relaxed">
            <Link href="/domains/purpose" className="text-ic-red hover:text-ic-redHover font-semibold">
              Purpose & Direction
            </Link>
            <span className="text-ic-muted">: Staying on course with your mission depends on disciplined action.</span>
          </div>
          <div className="leading-relaxed">
            <Link href="/domains/leadership" className="text-ic-red hover:text-ic-redHover font-semibold">
              Leadership & Character
            </Link>
            <span className="text-ic-muted">: Leading others starts with leading yourself—by example, with discipline.</span>
          </div>
          <div className="leading-relaxed">
            <Link href="/domains/finance" className="text-ic-red hover:text-ic-redHover font-semibold">
              Financial Power
            </Link>
            <span className="text-ic-muted">: Building wealth and stability is a result of disciplined habits and decisions.</span>
          </div>
          <div className="leading-relaxed">
            <Link href="/domains/ai" className="text-ic-red hover:text-ic-redHover font-semibold">
              AI Mastery
            </Link>
            <span className="text-ic-muted">: Leveraging technology for growth requires the discipline to use it intentionally, not as a distraction.</span>
          </div>
        </div>
      </section>

      {/* Tools & Systems in This Domain */}
      <section className="mb-16">
        <h2 className="heading-font text-2xl md:text-3xl font-bold mb-6 text-ic-text tracking-wider">
          TOOLS & SYSTEMS IN THIS DOMAIN
        </h2>
        <p className="mb-6 text-ic-muted leading-relaxed">
          Iron Compass provides practical tools to help men build discipline:
        </p>
        <ul className="space-y-3 text-ic-muted">
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <div>
              <span className="font-semibold text-ic-text">Iron Compass OS:</span>
              <span className="leading-relaxed"> A structured operating system for tracking habits, routines, and progress.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <div>
              <span className="font-semibold text-ic-text">Challenges & Missions:</span>
              <span className="leading-relaxed"> Structured challenges to push your limits and build consistency.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <div>
              <span className="font-semibold text-ic-text">Daily Habit Systems:</span>
              <span className="leading-relaxed"> Simple frameworks for building and maintaining daily habits.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-ic-red mr-3 mt-1">•</span>
            <div>
              <span className="font-semibold text-ic-text">AI Support:</span>
              <span className="leading-relaxed"> Use AI as a coach and accountability partner to reinforce your discipline and mindset.</span>
            </div>
          </li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="mb-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="mb-8 text-ic-muted leading-relaxed">
            Discipline and mindset are not about perfection—they're about progress, structure, and self-mastery. If you're ready to take control, build daily habits, and rise beyond limits, Iron Compass is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/domains" 
              className="heading-font inline-block px-8 py-3 bg-ic-red hover:bg-ic-redHover text-ic-text font-bold tracking-wider transition-colors duration-200"
            >
              EXPLORE ALL DOMAINS
            </Link>
            <Link 
              href="/" 
              className="heading-font inline-block px-8 py-3 border-2 border-ic-red text-ic-red hover:bg-ic-red hover:text-ic-text font-bold tracking-wider transition-colors duration-200"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
