import type { CanonicalDomainSlug } from "@/lib/site";

/** Scene photographs with no compass in the picture. PhotoFrame adds it at the bottom left. */
export const domainPhotos: Record<CanonicalDomainSlug, string> = {
  discipline: "/images/home/scenes/home-discipline.webp",
  identity: "/images/domains/editorial/personal-doctrine-in-7-days-hero.webp",
  "health-strength": "/images/home/scenes/home-strength.webp",
  "bonds-connections": "/images/home/scenes/home-leadership.webp",
  "purpose-direction": "/images/home/scenes/home-purpose.webp",
  "finance-provision": "/images/home/scenes/home-financial.webp",
  resilience: "/images/domains/editorial/rebuild-strength-after-injury-hero.webp",
  "fall-rise": "/images/domains/editorial/iron-protocol-strength-transition-hero.webp",
  "grief-honour": "/images/domains/grief-bench.webp",
  legacy: "/images/home/scenes/home-legacy.webp",
};

/** Not a life domain. Kept so the AI resource page still has its photograph. */
export const aiResourcePhoto = "/images/home/scenes/home-ai.webp";

export const philosophyPhoto = "/images/home/scenes/home-philosophy.webp";

/** Describe the visible scene for people who cannot see the photograph. */
export const domainPhotoAlts: Record<CanonicalDomainSlug, string> = {
  discipline: "A man taking a quiet morning moment with a mug in his kitchen",
  identity: "A man writing his personal standards in a sunlit room",
  "health-strength": "A man smiling during a kettlebell session",
  "bonds-connections": "A father and son enjoying breakfast together",
  "purpose-direction": "A man looking ahead on a coastal path at sunrise",
  "finance-provision": "A man smiling as he reviews his household paperwork",
  resilience: "A man smiling while taking the stairs at a manageable pace",
  "fall-rise": "A man enjoying a manageable strength session in his garden",
  "grief-honour": "A man quietly reflecting beside flowers on a park bench",
  legacy: "A man enjoying careful work on a wooden keepsake box",
};

export const pagePhotoAlts = {
  about: "About Iron Compass AI, a life system for men built on discipline, purpose, strength, and integrity",
  blog: "Iron Compass AI journal: practical guides for men on discipline, strength, leadership, money, grief, and purpose",
  contact: "Contact Iron Compass AI",
  domains: "The ten Iron Compass AI life domains: discipline, identity, health, bonds, purpose, finance, resilience, fall and rise, grief, and legacy",
  homeHero: "Iron Compass AI helps men build strength, discipline and character",
  philosophy: "Iron Compass AI philosophy: practical discipline, purpose, and character for men",
} as const;

/** Scenic pages with no compass in the picture. PhotoFrame adds the mark. */
export const pagePhotos = {
  about: "/images/pages/expedition-trail.png",
  blog: "/images/pages/horizon-hero.png",
  contact: "/images/pages/horizon-mountains.png",
  domains: "/images/pages/horizon-hero.png",
} as const;

/** People photographs that already carry the compass mark, so PhotoFrame must not add another. */
export const pagePeoplePhotos = {
  domains: "/images/get-the-app/coastal-walk.webp",
  pricing: "/images/get-the-app/pricing-strength-presence.webp",
} as const;

export const pagePeoplePhotoAlts = {
  domains: "Two men laughing on a coastal walking track at first light",
  pricing: "A father smiling as he carries his son on his shoulders during a coastal walk",
} as const;

/** The logo file is not a photograph. Articles still need their own picture. */
export function articlePhoto(image?: string) {
  if (!image) return undefined;
  if (image.includes("iron-compass-logo")) return undefined;
  // Existing alternatives preserve complete heads where the old source itself clipped them.
  const completeSubjects: Record<string, string> = {
    "/images/blog/cashflow-command-ai-copilot-hero.png": "/images/blog/freelancer-cashflow-war-room-hero.png",
    "/images/blog/leadership-decision-log-for-trust-and-speed-hero.png": "/images/blog/integrity-audit-leadership-hero.png",
    "/images/blog/tendon-armor-protocol-hero.png": "/images/blog/iron-protocol-strength-transition-hero.png",
    "/images/blog/strength-without-extra-time-hero.png": "/images/blog/iron-protocol-strength-transition-hero.png",
    "/images/blog/when-things-start-falling-into-place-hero.png": "/images/blog/midlife-mission-rewrite-playbook-hero.png",
  };
  return completeSubjects[image] ?? image;
}
