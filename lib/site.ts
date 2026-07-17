import type { Metadata } from "next";

export const SITE_URL = "https://ironcompassai.com";
export const SITE_NAME = "Iron Compass AI";

/** Product web app entry — not the marketing /start funnel. Override via env if app is on a subdomain. */
export const PRODUCT_APP_PATH = "/app";

export function productAppHref(): string {
  const override = process.env.NEXT_PUBLIC_PRODUCT_APP_URL?.trim();
  return override || PRODUCT_APP_PATH;
}
export const DEFAULT_OG_IMAGE = `${SITE_URL}/iron-compass-logo-og.png`;
export const DOMAIN_SOCIAL_IMAGE = `${SITE_URL}/iron-compass-logo-og.png`;

/** Canonical domain pillar slugs — single source of truth for sitemap and redirects */
export const CANONICAL_DOMAIN_SLUGS = [
  "health",
  "discipline-mindset",
  "purpose-direction",
  "leadership-character",
  "financial-power",
  "ai-mastery",
  "grief-honour",
  "identity-legacy",
] as const;

export type CanonicalDomainSlug = (typeof CANONICAL_DOMAIN_SLUGS)[number];

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
  twitter?: Partial<NonNullable<Metadata["twitter"]>>;
  robots?: Metadata["robots"];
  images?: string[];
};

/** Builds page metadata with canonical URL, OG, and Twitter defaults */
export function buildPageMetadata({
  title,
  description,
  path,
  openGraph,
  twitter,
  robots,
  images = [DEFAULT_OG_IMAGE],
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images,
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
      ...twitter,
    },
    ...(robots ? { robots } : {}),
  };
}

/** 301 redirects for legacy domain alias URLs → canonical pillars */
export const DOMAIN_ALIAS_REDIRECTS = [
  { source: "/domains/discipline", destination: "/domains/discipline-mindset", permanent: true },
  { source: "/domains/purpose", destination: "/domains/purpose-direction", permanent: true },
  { source: "/domains/ai", destination: "/domains/ai-mastery", permanent: true },
  { source: "/domains/ai-mastery-life-optimization", destination: "/domains/ai-mastery", permanent: true },
  { source: "/domains/bonds", destination: "/domains/leadership-character", permanent: true },
  { source: "/domains/leadership", destination: "/domains/leadership-character", permanent: true },
  { source: "/domains/wealth", destination: "/domains/financial-power", permanent: true },
  { source: "/domains/finance", destination: "/domains/financial-power", permanent: true },
  { source: "/domains/fall-rise", destination: "/domains/grief-honour", permanent: true },
  { source: "/domains/identity", destination: "/domains/identity-legacy", permanent: true },
  { source: "/domains/awareness-adaptability", destination: "/domains/identity-legacy", permanent: true },
  { source: "/domains/strength", destination: "/domains/health", permanent: true },
] as const;
