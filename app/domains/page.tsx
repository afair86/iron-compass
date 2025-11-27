
export const metadata = {
  title: "The Six Domains of Iron Compass",
  description:
    "Overview of the six domains required for a complete, disciplined life for men: strength, discipline, purpose, leadership, finance, and AI mastery.",
};

import Link from 'next/link';

const domains = [
  {
    name: 'Strength',
    slug: 'strength',
    desc: 'Build physical and mental resilience to overcome any challenge. Strength is the foundation for a powerful life.'
  },
  {
    name: 'Discipline & Mindset',
    slug: 'discipline',
    desc: 'Forge habits, focus, and self-mastery. Discipline means showing up and doing the work, every day.'
  },
  {
    name: 'Purpose & Direction',
    slug: 'purpose',
    desc: 'Live with intention. Define your mission, set your direction, and pursue it relentlessly.'
  },
  {
    name: 'Leadership & Character',
    slug: 'leadership',
    desc: 'Lead yourself and others with integrity. Character is built by consistent, principled action.'
  },
  {
    name: 'Financial Power',
    slug: 'finance',
    desc: 'Achieve financial stability and growth. Take control of your money to create freedom and opportunity.'
  },
  {
    name: 'AI Mastery & Life Optimization',
    slug: 'ai',
    desc: 'Leverage AI and modern systems to optimize your routines, learning, and results in a changing world.'
  },
];

export default function DomainsPage() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="heading-font text-3xl md:text-4xl font-bold mb-6 text-center text-ic-text tracking-widest">The Six Domains of Iron Compass</h1>
      <p className="text-icMuted mb-10 text-center max-w-2xl mx-auto">
        A complete, disciplined life requires mastery across six domains. Iron Compass guides men to develop strength, discipline, purpose, leadership, financial power, and AI mastery—so you can rise beyond limits and lead with purpose and integrity.
      </p>
      <section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <div key={domain.slug} className="ic-card flex flex-col justify-between">
              <h2 className="heading-font text-lg font-bold mb-2 text-ic-text">{domain.name}</h2>
              <p className="text-icMuted mb-4 leading-relaxed">{domain.desc}</p>
              <Link
                href={`/domains/${domain.slug}`}
                className="heading-font mt-auto inline-block text-icRed hover:underline underline-offset-4 font-bold"
              >
                Explore {domain.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <div className="flex flex-wrap gap-4 justify-center mt-12">
        <Link href="/" className="heading-font text-sm text-icRed hover:underline underline-offset-4 font-bold">Back to Home</Link>
        {domains.map((domain) => (
          <Link key={domain.slug} href={`/domains/${domain.slug}`} className="heading-font text-sm text-icRed hover:underline underline-offset-4 font-bold">
            {domain.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
