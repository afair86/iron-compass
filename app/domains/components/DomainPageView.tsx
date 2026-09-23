import fs from "fs";
import path from "path";
import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import ArticleListenButton from "@/app/components/ArticleListenButton";
import { HeadingStack, PageContainer, SectionShell } from "@/app/components/LayoutPrimitives";
import type { DomainNarrative } from "../narratives/types";
import { domainContentMap, type DomainSlug } from "../content";
import PhotoFrame from "@/app/components/brand/PhotoFrame";
import { domainBlogLinks } from "@/lib/domainBlogLinks";
import { domainPhotos } from "@/lib/sitePhotos";

type DomainPageViewProps = {
  narrative: DomainNarrative;
  slug: DomainSlug;
};

function speechText(narrative: DomainNarrative) {
  return [
    narrative.h1Title,
    narrative.heroDescription,
    ...narrative.opening,
    ...narrative.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    narrative.practice.heading,
    narrative.practice.lead,
    ...narrative.practice.steps,
    "Take it further with Iron Compass",
    ...narrative.further,
  ].join(" ");
}

export default function DomainPageView({ narrative, slug }: DomainPageViewProps) {
  const journalLinks = domainBlogLinks[slug];
  const domain = domainContentMap[slug];
  const audioAbs = path.join(process.cwd(), "public", "audio", "domains", `${slug}.mp3`);
  const audioSrc = fs.existsSync(audioAbs) ? `/audio/domains/${slug}.mp3` : undefined;

  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-6">
          <PhotoFrame src={domainPhotos[slug]} alt="" />
          <h1 className="ic-page-title">{narrative.h1Title}</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl">{narrative.heroDescription}</p>
          {audioSrc ? (
            <ArticleListenButton
              title={narrative.h1Title}
              text={speechText(narrative)}
              audioSrc={audioSrc}
              audioVersion="christopher-domain-v1"
              subtle
              hint="Prefer to hear it?"
            />
          ) : null}
          <div className="space-y-4 max-w-3xl mx-auto text-left">
            {narrative.opening.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="ic-section-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </SectionShell>

        {narrative.sections.map((section) => (
          <SectionShell key={section.key} variant="panel" className="space-y-4 md:space-y-5">
            <h2 className="ic-heading-2">{section.heading}</h2>
            <div className="space-y-4 max-w-3xl mx-auto text-left">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="ic-section-copy">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.image ? (
              <PhotoFrame className="ic-domain-inline-photo" src={section.image.src} alt={section.image.alt} />
            ) : null}
          </SectionShell>
        ))}

        <SectionShell variant="panel" className="space-y-4">
          <div className="ic-domain-practice space-y-4 max-w-3xl mx-auto text-left">
            <h2 className="ic-heading-2">{narrative.practice.heading}</h2>
            <p className="ic-section-copy">{narrative.practice.lead}</p>
            <ol className="list-decimal list-inside space-y-2 ic-section-copy">
              {narrative.practice.steps.map((step) => (
                <li key={step.slice(0, 40)}>{step}</li>
              ))}
            </ol>
          </div>
        </SectionShell>

        <SectionShell variant="contrast" className="space-y-4">
          <div className="ic-domain-further space-y-4 max-w-3xl mx-auto text-left">
            <h2 className="ic-heading-2">Take it further with Iron Compass</h2>
            {narrative.further.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="ic-section-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </SectionShell>

        <SectionShell variant="warm" className="space-y-5 md:space-y-6">
          <HeadingStack
            title="Keep going"
            description="A neighbouring domain, and pieces from the journal you can read today."
            accent="gold"
            className="space-y-2"
          />
          <article className="ic-stoic-card ic-stoic-card--featured space-y-2">
            <Link href={domain.companionLink.href} className="ic-stoic-card__title">
              {domain.companionLink.label}
            </Link>
            <p className="ic-section-copy ic-section-copy--muted text-sm">{domain.companionLink.description}</p>
          </article>
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
            <Link href="/domains" className="underline underline-offset-4 hover:text-[var(--ic-text-heading)]">
              All domains
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/blog" className="underline underline-offset-4 hover:text-[var(--ic-text-heading)]">
              The journal
            </Link>
          </p>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
