import type { CanonicalDomainSlug } from "@/lib/site";

/** Scene photographs with no compass in the picture. PhotoFrame adds it at the bottom left. */
export const domainPhotos: Record<CanonicalDomainSlug, string> = {
  health: "/images/home/scenes/home-strength.webp",
  "discipline-mindset": "/images/home/scenes/home-discipline.webp",
  "purpose-direction": "/images/home/scenes/home-purpose.webp",
  "leadership-character": "/images/home/scenes/home-leadership.webp",
  "financial-power": "/images/home/scenes/home-financial.webp",
  "ai-mastery": "/images/home/scenes/home-ai.webp",
  "grief-honour": "/images/home/scenes/home-grief.webp",
  "identity-legacy": "/images/home/scenes/home-legacy.webp",
};

export const philosophyPhoto = "/images/home/scenes/home-philosophy.webp";

/** Hidden descriptions for search. They name what Iron Compass is for, not the scenery. */
export const domainPhotoAlts: Record<CanonicalDomainSlug, string> = {
  health: "Strength and health for men",
  "discipline-mindset": "Discipline and mindset for men",
  "purpose-direction": "Purpose and direction for men",
  "leadership-character": "Leadership and character for men",
  "financial-power": "Financial strength and money habits for men",
  "ai-mastery": "AI mastery and life optimization for men",
  "grief-honour": "Grief and honour for men",
  "identity-legacy": "Identity and legacy for men",
};

export const pagePhotoAlts = {
  about: "About Iron Compass AI, a life system for men built on discipline, purpose, strength, and integrity",
  blog: "Iron Compass journal: practical guides for men on discipline, strength, leadership, money, grief, and purpose",
  contact: "Contact Iron Compass AI",
  domains: "The eight Iron Compass domains for men: strength, discipline, purpose, leadership, money, AI, grief, and legacy",
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
