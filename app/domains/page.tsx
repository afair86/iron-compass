import Link from "next/link";
import PageShell from "../components/PageShell";
import PhotoFrame from "../components/brand/PhotoFrame";
import DomainCard from "../components/DomainCard";
import { domainCards } from "../components/DomainsSection";
import { HeadingStack, PageContainer, SectionShell } from "../components/LayoutPrimitives";
import { absoluteUrl, buildPageMetadata } from "@/lib/site";
import { domainPhotoAlts, domainPhotos, pagePhotoAlts, pagePhotos } from "@/lib/sitePhotos";

export const metadata = buildPageMetadata({
  title: "Ten Life Domains | Iron Compass AI",
  description:
    "The ten life domains are where responsibility lives: Discipline, Identity, Health and Strength, Bonds and Connections, Purpose and Direction, Finance and Provision, Resilience, Fall and Rise, Grief and Honour, and Legacy.",
  path: "/domains",
});

const domainList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Iron Compass life domains",
  itemListElement: domainCards.map((domain, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: domain.title,
    url: absoluteUrl(domain.href ?? "/domains"),
  })),
};

export default function DomainsPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(domainList) }} />
      <PageContainer>
        <SectionShell variant="hero" className="space-y-5">
          <PhotoFrame src={pagePhotos.domains} alt={pagePhotoAlts.domains} />
          <h1 className="ic-page-title">Ten life domains</h1>
          <p className="ic-section-subhead text-[var(--ic-text-heading)]">Where responsibility lives.</p>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            Discipline, identity, health, the people who depend on you, the work, the money, the load, the return after a miss, grief, and what remains. Start with the one that is slipping.
          </p>
          <div className="ic-cta-row pt-2">
            <Link href="/domains/discipline" className="ic-btn-primary text-[0.62rem]">
              Start with Discipline
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
            description="Each page is one area of responsibility. The app uses the same ten."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {domainCards.map((domain) => (
              <DomainCard
                key={domain.title}
                {...domain}
                image={domain.slug ? domainPhotos[domain.slug as keyof typeof domainPhotos] : undefined}
                imageAlt={domain.slug ? domainPhotoAlts[domain.slug as keyof typeof domainPhotoAlts] : ""}
              />
            ))}
          </div>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
