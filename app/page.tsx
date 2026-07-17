import Link from "next/link";
import Hero from "./components/Hero";
import DomainsSection from "./components/DomainsSection";
import Subscribe from "./components/Subscribe";
import { buildPageMetadata, productAppHref } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Iron Compass AI — Life System for Disciplined Men",
  description:
    "Discipline, strength, purpose, money, and AI leverage — a structured operating system for men 30–45. Explore the Eight Domains and start building proof.",
  path: "/",
});

export default function HomePage() {
  return (
    <main className="ic-page-shell text-[var(--ic-text-main)]">
      <Hero />
      <DomainsSection />

      <section className="px-4 pb-20">
        <div className="ic-philosophy-card max-w-4xl mx-auto ic-align-center space-y-6">
          <h2 className="ic-home-heading text-[clamp(2rem,4vw,3rem)] tracking-[0.16em]">The Iron Compass Philosophy</h2>
          <p className="ic-section-copy ic-align-center mx-auto">
            Iron Compass is a life operating system for men who are done negotiating with their own standards. Discipline, strength,
            purpose, leadership, money, and leverage — held together by structure you can run on a bad day.
          </p>
          <p className="ic-section-copy ic-align-center mx-auto">
            The website sets the framework. The app and toolkit handle execution — daily anchors, reviews, and proof that your
            behaviour matches what you claim to stand for.
          </p>
          <p className="ic-section-copy ic-align-center mx-auto">
            No manifestos. No motivation loops. Just clear domains, practical standards, and the work of becoming reliable.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="ic-mission-card max-w-5xl mx-auto ic-align-center space-y-5">
          <h2 className="ic-home-heading text-[clamp(1.8rem,3.6vw,2.6rem)]">Ready To Begin Your Rise?</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Commit to disciplined execution. Build steel resolve. Lead with purpose.
          </p>
          <div className="ic-neon-divider" />
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-2">
            <Link href={productAppHref()} className="ic-cta-glow text-[0.6rem]">
              Start Your Rise
            </Link>
            <Link href="/domains" className="ic-ghost-btn text-[0.6rem]">
              Explore The Domains
            </Link>
          </div>
          <p className="text-sm text-[var(--ic-text-muted)] tracking-[0.1em]">
            Built for men who want structure without noise.
          </p>
        </div>
      </section>

      <Subscribe />
    </main>
  );
}
