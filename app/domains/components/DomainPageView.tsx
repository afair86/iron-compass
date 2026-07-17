import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import { HeadingStack, PageContainer, SectionShell } from "@/app/components/LayoutPrimitives";
import type { DomainNarrative } from "../narratives/types";
import { domainContentMap, type DomainSlug } from "../content";
import DomainCta from "./DomainCta";
import { domainBlogLinks } from "@/lib/domainBlogLinks";

type DomainPageViewProps = {
  narrative: DomainNarrative;
  slug: DomainSlug;
};

export default function DomainPageView({ narrative, slug }: DomainPageViewProps) {
  const journalLinks = domainBlogLinks[slug];
  const domain = domainContentMap[slug];

  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-6">
          <h1 className="ic-page-title">{narrative.h1Title}</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl">{narrative.heroDescription}</p>
          <DomainCta centered />
          <p className="ic-section-copy ic-section-copy--muted text-sm">{narrative.socialProof}</p>
        </SectionShell>

        {narrative.sections.map((section) => {
          if (section.key === "closingCta") {
            return (
              <SectionShell key={section.key} variant="panel" className="space-y-4 md:space-y-5">
                <h2 className="ic-heading-2">{section.heading}</h2>
                <p className="ic-section-copy ic-section-copy--muted max-w-2xl">{section.paragraphs?.[0]}</p>
                <DomainCta centered />
              </SectionShell>
            );
          }

          if (section.key === "fourPillars") {
            return (
              <SectionShell key={section.key} variant="panel" className="space-y-5 md:space-y-6">
                <HeadingStack title={section.heading} className="space-y-2" />
                <div className="space-y-6 md:space-y-7 max-w-3xl mx-auto text-left">
                  {section.pillars?.map((pillar) => (
                    <div key={pillar.title} className="space-y-3">
                      <h3 className="ic-heading-3">{pillar.title}</h3>
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
              <SectionShell key={section.key} variant="panel" className="space-y-4 md:space-y-5">
                <h2 className="ic-heading-2">{section.heading}</h2>
                <div className="space-y-3 max-w-3xl mx-auto text-left">
                  {section.intro ? <p className="ic-section-copy">{section.intro}</p> : null}
                  {section.key === "aiExtension" ? <p className="ic-section-copy">They provide:</p> : null}
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
            <SectionShell key={section.key} variant="panel" className="space-y-4 md:space-y-5">
              <h2 className="ic-heading-2">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="ic-section-copy">
                  {paragraph}
                </p>
              ))}
            </SectionShell>
          );
        })}

        <SectionShell variant="contrast" className="space-y-5 md:space-y-6">
          <HeadingStack
            title="Explore the Compass"
            description="This domain connects to the rest of the system."
            accent="gold"
            className="space-y-2"
          />
          <article className="ic-stoic-card ic-stoic-card--featured space-y-2">
            <Link href={domain.companionLink.href} className="ic-stoic-card__title">
              {domain.companionLink.label}
            </Link>
            <p className="ic-section-copy ic-section-copy--muted text-sm">{domain.companionLink.description}</p>
          </article>
          <div className="grid gap-4 md:grid-cols-2">
            {domain.internalLinks.map((link) => (
              <article key={link.href} className="ic-stoic-card space-y-2">
                <Link href={link.href} className="ic-stoic-card__title">
                  {link.label}
                </Link>
                <p className="ic-section-copy ic-section-copy--muted text-sm">{link.description}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell variant="warm" className="space-y-5 md:space-y-6">
          <HeadingStack
            title="From the Journal"
            description="Practical dispatches that support this domain."
            accent="teal"
            className="space-y-2"
          />
          <div className="grid gap-4 md:grid-cols-1">
            {journalLinks.map((link) => (
              <article key={link.href} className="ic-stoic-card space-y-2">
                <Link href={link.href} className="ic-stoic-card__title">
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
