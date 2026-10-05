import type { Metadata } from "next";

export const SITE_URL = "https://ironcompassai.com";
export const SITE_NAME = "Iron Compass AI";

/** Product web app entry — not the marketing /start funnel. Override via env if app is on a subdomain. */
export const PRODUCT_APP_PATH = "/app";

export function productAppHref(): string {
  const override = process.env.NEXT_PUBLIC_PRODUCT_APP_URL?.trim();
  return override || PRODUCT_APP_PATH;
}
/** The homepage sunset. Used when Iron Compass AI is shared or shown in search. */
export const HOME_SHARE_IMAGE = `${SITE_URL}/images/home/horizon-man.png`;
export const DEFAULT_OG_IMAGE = HOME_SHARE_IMAGE;
export const ORGANIZATION_LOGO = `${SITE_URL}/iron-compass-logo-og.png`;
export const DOMAIN_SOCIAL_IMAGE = HOME_SHARE_IMAGE;

/** Current life domains. Same ids as the app. AI Mastery is not in this list. */
export const CANONICAL_DOMAIN_SLUGS = [
  "discipline",
  "identity",
  "health-strength",
  "bonds-connections",
  "purpose-direction",
  "finance-provision",
  "resilience",
  "fall-rise",
  "grief-honour",
  "legacy",
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

/** Old domain URLs. These must not point at a current canonical path. */
export const DOMAIN_ALIAS_REDIRECTS = [
  { source: "/domains/health", destination: "/domains/health-strength", permanent: true },
  { source: "/domains/strength-health", destination: "/domains/health-strength", permanent: true },
  { source: "/domains/strength", destination: "/domains/health-strength", permanent: true },
  { source: "/domains/discipline-mindset", destination: "/domains/discipline", permanent: true },
  { source: "/domains/leadership-character", destination: "/domains/bonds-connections", permanent: true },
  { source: "/domains/leadership", destination: "/domains/bonds-connections", permanent: true },
  { source: "/domains/bonds", destination: "/domains/bonds-connections", permanent: true },
  { source: "/domains/financial-power", destination: "/domains/finance-provision", permanent: true },
  { source: "/domains/finance", destination: "/domains/finance-provision", permanent: true },
  { source: "/domains/wealth", destination: "/domains/finance-provision", permanent: true },
  { source: "/domains/identity-legacy", destination: "/domains/identity", permanent: true },
  { source: "/domains/purpose", destination: "/domains/purpose-direction", permanent: true },
  { source: "/domains/ai", destination: "/domains/ai-mastery", permanent: true },
  { source: "/domains/ai-mastery-life-optimization", destination: "/domains/ai-mastery", permanent: true },
  { source: "/domains/awareness-adaptability", destination: "/domains", permanent: true },
] as const;
