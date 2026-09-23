import Link from "next/link";
import PageShell from "../components/PageShell";
import PhotoFrame from "../components/brand/PhotoFrame";
import DomainCard from "../components/DomainCard";
import { domainCards } from "../components/DomainsSection";
import { HeadingStack, PageContainer, SectionShell } from "../components/LayoutPrimitives";
import { buildPageMetadata } from "@/lib/site";
import { domainPhotos, pagePhotos } from "@/lib/sitePhotos";

export const metadata = buildPageMetadata({
  title: "The Eight Domains of Iron Compass",
  description:
    "Overview of the eight domains required for a complete, disciplined life: Strength & Health, Discipline & Mindset, Purpose & Direction, Leadership & Character, Financial Power, AI Mastery & Life Optimization, Grief & Honour, and Identity & Legacy.",
  path: "/domains",
});

export default function DomainsPage() {
  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-5">
          <PhotoFrame src={pagePhotos.domains} alt="A man walking a ridgeline at first light" />
          <h1 className="ic-page-title">The Eight Domains</h1>
          <p className="ic-section-subhead text-[var(--ic-text-heading)]">A disciplined map for complete capability.</p>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            Every domain reinforces the others: strength, discipline, purpose, leadership, financial power, AI mastery, grief &amp; honour, and
            identity &amp; legacy. Enter through one, but keep them linked.
          </p>
          <div className="ic-cta-row pt-2">
            <Link href="/domains/health" className="ic-btn-primary text-[0.62rem]">
              Begin with Strength
            </Link>
            <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
              Read the Journal
            </Link>
          </div>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-8">
          <HeadingStack
            eyebrow="Choose your entry point"
            title="Pick a domain and move"
            description="Each card links to a fully detailed domain playbook."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {domainCards.map((domain) => (
              <DomainCard
                key={domain.title}
                {...domain}
                image={domain.slug ? domainPhotos[domain.slug as keyof typeof domainPhotos] : undefined}
              />
            ))}
          </div>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
