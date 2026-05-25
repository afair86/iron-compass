import type { CanonicalDomainSlug } from "@/lib/site";

export type DomainCard = {
  title: string;
  desc: string;
  href: `/domains/${CanonicalDomainSlug}`;
  slug: CanonicalDomainSlug;
};

/** Single source of truth for domain navigation cards */
export const domainCards: DomainCard[] = [
  {
    slug: "health",
    title: "STRENGTH & HEALTH",
    desc: "Build capacity, energy, and long-term resilience.",
    href: "/domains/health",
  },
  {
    slug: "discipline-mindset",
    title: "DISCIPLINE & MINDSET",
    desc: "The operating system that keeps promises alive.",
    href: "/domains/discipline-mindset",
  },
  {
    slug: "purpose-direction",
    title: "PURPOSE & DIRECTION",
    desc: "Chosen mission, decisive targets, relentless cadence.",
    href: "/domains/purpose-direction",
  },
  {
    slug: "leadership-character",
    title: "LEADERSHIP & CHARACTER",
    desc: "Calm authority and standards people can trust.",
    href: "/domains/leadership-character",
  },
  {
    slug: "financial-power",
    title: "FINANCIAL POWER",
    desc: "Structure, skill, and buffers that remove money chaos.",
    href: "/domains/financial-power",
  },
  {
    slug: "ai-mastery",
    title: "AI MASTERY & LIFE OPTIMIZATION",
    desc: "Leverage automation without losing your edge.",
    href: "/domains/ai-mastery",
  },
  {
    slug: "grief-honour",
    title: "GRIEF & HONOUR",
    desc: "Carry loss with ritual, responsibility, and forward motion.",
    href: "/domains/grief-honour",
  },
  {
    slug: "identity-legacy",
    title: "IDENTITY & LEGACY",
    desc: "Decide who you are and leave proof behind.",
    href: "/domains/identity-legacy",
  },
];

export const domainNavLinks = [
  { href: "/domains/health", label: "Strength & Health" },
  { href: "/domains/discipline-mindset", label: "Discipline & Mindset" },
  { href: "/domains/purpose-direction", label: "Purpose & Direction" },
  { href: "/domains/leadership-character", label: "Leadership & Character" },
  { href: "/domains/financial-power", label: "Financial Power" },
  { href: "/domains/ai-mastery", label: "AI Mastery & Life Optimization" },
  { href: "/domains/grief-honour", label: "Grief & Honour" },
  { href: "/domains/identity-legacy", label: "Identity & Legacy" },
] as const;
