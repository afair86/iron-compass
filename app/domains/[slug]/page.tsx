import { notFound } from "next/navigation";
import { CANONICAL_DOMAIN_SLUGS, type CanonicalDomainSlug } from "@/lib/site";
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
  return <DomainPageView narrative={domainNarratives[slug]} slug={slug} />;
}
