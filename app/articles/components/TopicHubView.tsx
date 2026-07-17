import "@/styles/stoic-dispatch.css";
import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "@/app/components/LayoutPrimitives";
import type { HubArticle, TopicHubLink } from "@/lib/articleHubs";

type TopicHubViewProps = {
  eyebrow: string;
  title: string;
  description: string;
  domainHref: string;
  domainLabel: string;
  articles?: HubArticle[];
  links?: TopicHubLink[];
  journalLabel?: string;
};

export default function TopicHubView({
  eyebrow,
  title,
  description,
  domainHref,
  domainLabel,
  articles,
  links,
  journalLabel = "Browse the full journal",
}: TopicHubViewProps) {
  const items = articles ?? links ?? [];

  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-6">
          <p className="ic-dispatch-label">{eyebrow}</p>
          <h1 className="ic-page-title">{title}</h1>
          <p className="ic-dispatch-lede">{description}</p>
          <div className="ic-stoic-rule ic-stoic-rule--inline" aria-hidden="true" />
          <div className="ic-cta-row">
            <Link href={domainHref} className="ic-btn-primary text-[0.62rem]">
              {domainLabel}
            </Link>
            <Link href="/start" className="ic-btn-ghost text-[0.6rem]">
              Start Your Compass
            </Link>
          </div>
        </SectionShell>

        <SectionShell variant="contrast" className="space-y-5 md:space-y-6">
          <HeadingStack title="Start Here" description="Deep guides written for men who need structure, not sympathy." />
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => {
              const href = "path" in item ? item.path : item.href;
              const itemTitle = item.title;
              const itemDescription = item.description;
              return (
                <article key={href} className="ic-stoic-card space-y-2">
                  <Link href={href} className="ic-stoic-card__title">
                    {itemTitle}
                  </Link>
                  <p className="ic-section-copy ic-section-copy--muted text-sm">{itemDescription}</p>
                </article>
              );
            })}
          </div>
          {links ? (
            <p className="ic-section-copy text-sm">
              <Link href="/blog" className="underline underline-offset-4 hover:text-[var(--ic-text-heading)]">
                {journalLabel}
              </Link>
            </p>
          ) : null}
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
