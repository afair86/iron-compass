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
