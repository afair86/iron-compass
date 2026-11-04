import type { CanonicalDomainSlug } from "@/lib/site";

export type DomainCard = {
  title: string;
  desc: string;
  href: `/domains/${CanonicalDomainSlug}`;
  slug: CanonicalDomainSlug;
};

/** Current life domains only. AI Mastery is a resource, not a card. */
export const domainCards: DomainCard[] = [
  { slug: "discipline", title: "Discipline", desc: "The standard you keep when the week gets loud.", href: "/domains/discipline" },
  { slug: "identity", title: "Identity", desc: "What you stand for, checked against what you do.", href: "/domains/identity" },
  { slug: "health-strength", title: "Health & Strength", desc: "Sleep, food and training that carry the day.", href: "/domains/health-strength" },
  { slug: "bonds-connections", title: "Bonds & Connections", desc: "Show up for the people who count on you.", href: "/domains/bonds-connections" },
  { slug: "purpose-direction", title: "Purpose & Direction", desc: "Work with a direction you can actually keep.", href: "/domains/purpose-direction" },
  { slug: "finance-provision", title: "Finance & Provision", desc: "Money handled before it becomes a surprise.", href: "/domains/finance-provision" },
  { slug: "resilience", title: "Resilience", desc: "Stay functional when the load rises.", href: "/domains/resilience" },
  { slug: "fall-rise", title: "Fall & Rise", desc: "Recover from major setbacks. Rebuild with integrity.", href: "/domains/fall-rise" },
  { slug: "grief-honour", title: "Grief & Honour", desc: "Stabilise, honour the loss, and keep the role.", href: "/domains/grief-honour" },
  { slug: "legacy", title: "Legacy", desc: "What remains for the people after you.", href: "/domains/legacy" },
];

export const domainNavLinks = domainCards.map((card) => ({ href: card.href, label: card.title }));
