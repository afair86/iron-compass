import { notFound } from "next/navigation";
import { absoluteUrl, CANONICAL_DOMAIN_SLUGS, type CanonicalDomainSlug } from "@/lib/site";
import { appSoftwareSchema } from "@/lib/appSchema";
import { buildDomainMetadata, domainContentMap } from "../content";
import DomainPageView from "../components/DomainPageView";
import { domainNarratives } from "../narratives";

function isCanonical(slug: string): slug is CanonicalDomainSlug {
  return (CANONICAL_DOMAIN_SLUGS as readonly string[]).includes(slug);
}

export function generateStaticParams() {
  return CANONICAL_DOMAIN_SLUGS.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isCanonical(slug)) return {};
  return buildDomainMetadata(domainContentMap[slug]);
}

export default async function DomainSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isCanonical(slug)) notFound();
  const narrative = domainNarratives[slug];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Domains", item: absoluteUrl("/domains") },
          { "@type": "ListItem", position: 3, name: narrative.h1Title, item: absoluteUrl(`/domains/${slug}`) },
        ],
      },
      appSoftwareSchema,
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DomainPageView narrative={narrative} slug={slug} />
    </>
  );
}
