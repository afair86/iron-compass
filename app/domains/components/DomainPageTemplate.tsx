import Link from "next/link";
import { ReactNode } from "react";

export type DomainPageTemplateProps = {
  name: string;
  tagline: string;
  intro: string;
  whatItMeans: {
    description: string;
    bullets: string[];
  };
  pillars: {
    title: string;
    description: string;
  }[];
  practices: string[];
  connections: ReactNode[];
};

export default function DomainPageTemplate({
  name,
  tagline,
  intro,
  whatItMeans,
  pillars,
  practices,
  connections,
}: DomainPageTemplateProps) {
  return (
    <main className="bg-iron-matte text-iron-bone">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12 md:space-y-14">
        <section className="space-y-5 text-center border border-iron-frame rounded-[32px] bg-iron-card/80 px-6 sm:px-8 py-12 glow-neon-blue">
          <h1 className="ic-page-title text-center mx-auto">{name}</h1>
          <p className="ic-section-subhead text-iron-bone text-center mx-auto">{tagline}</p>
          <p className="text-iron-mist ic-measure mx-auto text-center">{intro}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/start" className="ic-neon-cta text-xs">
              Start Your Rise
            </Link>
            <Link
              href="/domains"
              className="px-8 py-3 rounded-full border border-iron-frame text-iron-bone uppercase tracking-[0.24em] hover:bg-iron-frame/10"
            >
              Back to All Domains
            </Link>
          </div>
        </section>

        <section className="ic-panel ic-panel-outline space-y-5 md:space-y-6 text-center">
          <div className="ic-stack-sm text-center">
            <h2 className="ic-heading-2 text-iron-bone">What {name} means inside Iron Compass</h2>
          </div>
          <p className="text-iron-mist ic-measure mx-auto">{whatItMeans.description}</p>
          <ul className="list-disc list-inside text-iron-mist space-y-2 text-left mx-auto max-w-3xl">
            {whatItMeans.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="ic-panel ic-panel-outline space-y-6 md:space-y-7 text-center">
          <div className="ic-stack-sm text-center">
            <h2 className="ic-heading-2 text-iron-bone">Core pillars of {name}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 text-left">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="border border-iron-frame rounded-3xl bg-iron-card/70 px-6 py-6 space-y-2 glow-neon-blue">
                <h3 className="ic-heading-3 text-iron-bone">{pillar.title}</h3>
                <p className="text-iron-mist">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ic-panel ic-panel-outline space-y-5 md:space-y-6 text-center">
          <div className="ic-stack-sm text-center">
            <h2 className="ic-heading-2 text-iron-bone">Daily practices to forge {name}</h2>
          </div>
          <ul className="list-disc list-inside text-iron-mist space-y-2 text-left mx-auto max-w-3xl">
            {practices.map((practice) => (
              <li key={practice}>{practice}</li>
            ))}
          </ul>
        </section>

        <section className="ic-panel ic-panel-outline space-y-5 md:space-y-6 text-center">
          <div className="ic-stack-sm text-center">
            <h2 className="ic-heading-2 text-iron-bone">How this domain connects to the others</h2>
          </div>
          <div className="space-y-4 text-iron-mist text-left mx-auto max-w-3xl">
            {connections.map((connection, index) => (
              <p key={index}>{connection}</p>
            ))}
          </div>
        </section>

        <section className="ic-panel ic-panel-outline space-y-4 text-center px-6 sm:px-8 py-12">
          <h2 className="ic-heading-2 text-center mx-auto text-iron-bone">Ready to build your {name}?</h2>
          <p className="text-iron-mist ic-measure mx-auto">
            Commit to the reps, track your progress, and let the discipline prove itself inside the Iron Compass system.
          </p>
          <div className="flex justify-center">
            <Link href="/start" className="ic-neon-cta text-xs">
              Start Your Rise
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
