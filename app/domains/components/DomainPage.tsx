import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import type { DomainContent } from "../content";

export default function DomainPage({ content }: { content: DomainContent }) {
  return (
    <PageShell className="bg-[var(--ic-page-bg-alt)]">
      <article className="ic-content-stack ic-content-wide px-4 py-16 md:py-20 space-y-12 md:space-y-14 text-[var(--ic-text-main)]">
        <header className="ic-panel ic-panel--hero ic-panel--glow text-center space-y-5 md:space-y-6">
          <h1 className="ic-page-title mx-auto text-center">{content.title}</h1>
          <p className="ic-section-subhead text-[var(--ic-text-heading)] text-center mx-auto">{content.heroTagline}</p>
          <p className="ic-section-copy ic-measure text-base md:text-lg text-center mx-auto">{content.description}</p>
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--ic-text-muted)] text-center mx-auto">{content.socialProof}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[0.68rem] uppercase tracking-[0.26em] text-[var(--ic-text-muted)]">
            <Link href="/domains" className="hover:text-ic-red transition-colors">
              View all domains
            </Link>
            <span className="text-[var(--ic-text-muted)]/40">/</span>
            <Link href={content.companionLink.href} className="hover:text-ic-red transition-colors">
              {content.companionLink.label}
            </Link>
          </div>
          <div className="ic-cta-row pt-1">
            <Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
              Start Inside Iron Compass
            </Link>
            <Link href="/domains" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
              Back to Domains
            </Link>
          </div>
        </header>

        <section className="ic-panel space-y-6 md:space-y-7 text-center">
          <div className="ic-stack-sm text-center">
            <h2 className="ic-heading-2">What this domain builds</h2>
            <p className="ic-section-copy ic-measure text-sm text-[var(--ic-text-muted)] mx-auto">
              The core outcomes this domain reinforces when practiced with discipline.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 text-left">
            {content.builds.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm md:text-base text-[var(--ic-text-main)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="ic-panel space-y-6 md:space-y-7 text-center">
          <div className="ic-stack-sm text-center">
            <h2 className="ic-heading-2">Where men fail here</h2>
            <p className="ic-section-copy ic-measure text-sm text-[var(--ic-text-muted)] mx-auto">
              Common breakdowns to watch for before momentum collapses.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 text-left">
            {content.failurePatterns.map((pattern) => (
              <article
                key={pattern}
                className="rounded-3xl border border-white/10 bg-[var(--ic-card-bg)]/80 px-5 py-5 text-sm md:text-base text-[var(--ic-text-muted)]"
              >
                {pattern}
              </article>
            ))}
          </div>
        </section>

        <section className="ic-panel space-y-6 md:space-y-7 text-center">
          <div className="text-center space-y-2">
            <h2 className="ic-heading-2 mx-auto text-center">{content.callout}</h2>
            <p className="ic-section-copy ic-measure text-sm text-[var(--ic-text-muted)]">
              Principles that anchor this domain when the pressure rises.
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 text-left">
            {content.principles.map((principle) => (
              <li
                key={principle.title}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left space-y-2"
              >
                <h3 className="ic-heading-3 text-sm md:text-base text-[var(--ic-text-heading)]">{principle.title}</h3>
                <p className="text-sm text-[var(--ic-text-muted)]">{principle.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ic-panel space-y-6 md:space-y-7 text-center">
          <div className="ic-stack-sm text-center">
            <h2 className="ic-heading-2">Moves to run this week</h2>
            <p className="ic-section-copy ic-measure text-sm text-[var(--ic-text-muted)] mx-auto">
              Concrete steps to translate the domain into action.
            </p>
          </div>
          <ol className="list-decimal pl-6 space-y-3 text-sm md:text-base text-[var(--ic-text-muted)] text-left mx-auto max-w-3xl">
            {content.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </section>

        <section className="ic-panel space-y-6 md:space-y-7 text-center">
          <div className="ic-stack-sm text-center">
            <h2 className="ic-heading-2">Keep the compass linked</h2>
            <p className="ic-section-copy ic-measure text-sm text-[var(--ic-text-muted)] mx-auto">
              Connect this domain to the rest so standards reinforce each other.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 text-left">
            {content.internalLinks.map((link) => (
              <article key={link.href} className="rounded-3xl border border-white/10 bg-[var(--ic-card-bg)]/80 px-5 py-5 space-y-2">
                <Link
                  href={link.href}
                  className="font-heading text-sm uppercase tracking-[0.28em] text-ic-red hover:text-ic-red/80"
                >
                  {link.label}
                </Link>
                <p className="text-sm text-[var(--ic-text-muted)]">{link.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ic-panel text-center space-y-4 md:space-y-5">
          <h2 className="ic-heading-2 mx-auto text-center">Lock it in with Iron Compass</h2>
          <p className="ic-section-copy ic-measure mx-auto">
            Log the standards, run the reps, and keep this domain synced with the rest of the compass.
          </p>
          <div className="ic-cta-row justify-center">
            <Link href="/domains" className="ic-btn-primary text-xs sm:text-[0.72rem]">
              Return to All Domains
            </Link>
            <Link href={content.companionLink.href} className="ic-btn-ghost text-xs sm:text-[0.7rem]">
              Revisit {content.companionLink.label}
            </Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
