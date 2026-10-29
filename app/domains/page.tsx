import Link from "next/link";
import PageShell from "../components/PageShell";
import DomainCardDirectory from "../components/DomainCardDirectory";
import { domainCards } from "@/lib/domains";
import { absoluteUrl, buildPageMetadata } from "@/lib/site";
import { domainPhotoAlts, domainPhotos } from "@/lib/sitePhotos";
import type { CanonicalDomainSlug } from "@/lib/site";
import gridStyles from "../components/domain-card-directory.module.css";
import styles from "./domains-page.module.css";

export const metadata = buildPageMetadata({
  title: "Ten Life Domains | Iron Compass AI",
  description:
    "The ten life domains are where responsibility lives: Discipline, Identity, Health and Strength, Bonds and Connections, Purpose and Direction, Finance and Provision, Resilience, Fall and Rise, Grief and Honour, and Legacy.",
  path: "/domains",
});

const focus: Record<CanonicalDomainSlug, string> = {
  discipline: "center top",
  identity: "center top",
  "health-strength": "center top",
  "bonds-connections": "center top",
  "purpose-direction": "center top",
  "finance-provision": "center top",
  resilience: "center top",
  "fall-rise": "center top",
  "grief-honour": "center top",
  legacy: "center top",
};

const domainList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Iron Compass life domains",
  itemListElement: domainCards.map((domain, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: domain.title,
    url: absoluteUrl(domain.href),
  })),
};

export default function DomainsPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(domainList) }} />
      <div className={styles.page}>
        <header className={`${styles.intro} ic-editorial-center`}>
          <h1>Ten life domains</h1>
          <p className={styles.sub}>Where responsibility lives.</p>
          <p className={styles.lede}>
            Discipline, identity, health, the people who depend on you, the work, the money, the load, the return
            after a miss, grief, and what remains. Start with the one that is slipping.
          </p>
          <div className={styles.actions}>
            <Link href="/domains/discipline" className="ic-btn-primary">
              Start with Discipline
            </Link>
            <Link href="/blog" className="ic-btn-ghost">
              Read the Journal
            </Link>
          </div>
        </header>
        <div className={gridStyles.grid}>
          {domainCards.map((domain) => (
            <DomainCardDirectory
              key={domain.slug}
              href={domain.href}
              title={domain.title}
              description={domain.desc}
              image={domainPhotos[domain.slug]}
              imageAlt={domainPhotoAlts[domain.slug]}
              focus={focus[domain.slug]}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
