import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import { HeadingStack, PageContainer, SectionShell } from "@/app/components/LayoutPrimitives";
import type { DomainNarrative } from "../narratives/types";
import type { DomainSlug } from "../content";
import DomainCta from "./DomainCta";
import { domainBlogLinks } from "@/lib/domainBlogLinks";

type DomainPageViewProps = {
  narrative: DomainNarrative;
  slug: DomainSlug;
};

export default function DomainPageView({ narrative, slug }: DomainPageViewProps) {
  const journalLinks = domainBlogLinks[slug];

  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-6 text-left">
          <p className="ic-eyebrow">Iron Compass Domain</p>
          <h1 className="ic-page-title text-left">{narrative.h1Title}</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl">{narrative.heroDescription}</p>
          <DomainCta />
          <p className="ic-section-copy ic-section-copy--muted text-sm">{narrative.socialProof}</p>
        </SectionShell>

        {narrative.sections.map((section) => {
          if (section.key === "closingCta") {
            return (
              <SectionShell key={section.key} variant="panel" className="space-y-4 md:space-y-5 text-center">
                <h2 className="ic-heading-2 mx-auto text-center">{section.heading}</h2>
                <p className="ic-section-copy ic-section-copy--muted text-center max-w-2xl mx-auto">
                  {section.paragraphs?.[0]}
                </p>
                <DomainCta centered />
              </SectionShell>
            );
          }

          if (section.key === "fourPillars") {
            return (
              <SectionShell key={section.key} variant="panel" className="space-y-5 md:space-y-6 text-left">
                <HeadingStack title={section.heading} center={false} className="space-y-2" />
                <div className="space-y-6 md:space-y-7">
                  {section.pillars?.map((pillar) => (
                    <div key={pillar.title} className="space-y-3">
                      <h3 className="ic-heading-3 text-left">{pillar.title}</h3>
                      <p className="ic-section-copy">{pillar.body}</p>
                      {pillar.bullets ? (
                        <ul className="list-disc list-inside space-y-1 ic-section-copy">
                          {pillar.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      {pillar.outro ? <p className="ic-section-copy">{pillar.outro}</p> : null}
                    </div>
                  ))}
                </div>
              </SectionShell>
            );
          }

          if (section.key === "systemConnections" || section.key === "aiExtension") {
            return (
              <SectionShell key={section.key} variant="panel" className="space-y-4 md:space-y-5 text-left">
                <h2 className="ic-heading-2 text-left">{section.heading}</h2>
                <div className="space-y-3">
                  {section.intro ? <p className="ic-section-copy">{section.intro}</p> : null}
                  {section.key === "aiExtension" ? (
                    <p className="ic-section-copy">They provide:</p>
                  ) : null}
                  {section.bullets ? (
                    <ul className="list-disc list-inside space-y-1 ic-section-copy">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.outro ? <p className="ic-section-copy">{section.outro}</p> : null}
                </div>
              </SectionShell>
            );
          }

          return (
            <SectionShell key={section.key} variant="panel" className="space-y-4 md:space-y-5 text-left">
              <h2 className="ic-heading-2 text-left">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="ic-section-copy">
                  {paragraph}
                </p>
              ))}
            </SectionShell>
          );
        })}

        <SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
          <HeadingStack
            title="From the Journal"
            description="Practical dispatches that support this domain."
            center={false}
            className="space-y-2"
          />
          <div className="grid gap-4 md:grid-cols-1">
            {journalLinks.map((link) => (
              <article key={link.href} className="rounded-3xl border border-white/10 bg-[var(--ic-card-bg)]/80 px-5 py-5 space-y-2">
                <Link href={link.href} className="font-heading text-sm uppercase tracking-[0.28em] text-ic-red hover:text-ic-red/80">
                  {link.title}
                </Link>
                <p className="ic-section-copy ic-section-copy--muted text-sm">{link.description}</p>
              </article>
            ))}
          </div>
          <p className="ic-section-copy text-sm">
            <Link href="/blog" className="underline underline-offset-4 hover:text-[var(--ic-text-heading)]">
              Browse the full journal
            </Link>
          </p>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
