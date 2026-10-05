import type { CanonicalDomainSlug } from "@/lib/site";

/** Scene photographs with no compass in the picture. PhotoFrame adds it at the bottom left. */
export const domainPhotos: Record<CanonicalDomainSlug, string> = {
  discipline: "/images/home/scenes/home-discipline.webp",
  identity: "/images/domains/identity-pegs.webp",
  "health-strength": "/images/home/scenes/home-strength.webp",
  "bonds-connections": "/images/home/scenes/home-leadership.webp",
  "purpose-direction": "/images/home/scenes/home-purpose.webp",
  "finance-provision": "/images/home/scenes/home-financial.webp",
  resilience: "/images/domains/strength-stairs.webp",
  "fall-rise": "/images/domains/purpose-morning-path.webp",
  "grief-honour": "/images/home/scenes/home-grief.webp",
  legacy: "/images/home/scenes/home-legacy.webp",
};

/** Not a life domain. Kept so the AI resource page still has its photograph. */
export const aiResourcePhoto = "/images/home/scenes/home-ai.webp";

export const philosophyPhoto = "/images/home/scenes/home-philosophy.webp";

/** Hidden descriptions for search. They name what Iron Compass is for, not the scenery. */
export const domainPhotoAlts: Record<CanonicalDomainSlug, string> = {
  discipline: "Discipline for men",
  identity: "Identity for men",
  "health-strength": "Health and strength for men",
  "bonds-connections": "Bonds and connections for men",
  "purpose-direction": "Purpose and direction for men",
  "finance-provision": "Finance and provision for men",
  resilience: "Resilience under load for men",
  "fall-rise": "Returning after a miss",
  "grief-honour": "Grief and honour for men",
  legacy: "Legacy for men",
};

export const pagePhotoAlts = {
  about: "About Iron Compass AI, a life system for men built on discipline, purpose, strength, and integrity",
  blog: "Iron Compass journal: practical guides for men on discipline, strength, leadership, money, grief, and purpose",
  contact: "Contact Iron Compass AI",
  domains: "The ten Iron Compass life domains: discipline, identity, health, bonds, purpose, finance, resilience, fall and rise, grief, and legacy",
  homeHero: "Iron Compass AI helps men build strength, discipline and character",
  philosophy: "Iron Compass philosophy: practical discipline, purpose, and character for men",
} as const;

/** Scenic pages with no compass in the picture. PhotoFrame adds the mark. */
export const pagePhotos = {
  about: "/images/pages/expedition-trail.png",
  blog: "/images/pages/horizon-hero.png",
  contact: "/images/pages/horizon-mountains.png",
  domains: "/images/pages/horizon-hero.png",
} as const;

/** The logo file is not a photograph. Articles still need their own picture. */
export function articlePhoto(image?: string) {
  if (!image) return undefined;
  if (image.includes("iron-compass-logo")) return undefined;
  return image;
}
