import { domainPhotos, domainPhotoAlts } from "./sitePhotos";
import type { DomainSlug } from "@/app/domains/content";
import type { DomainImage } from "@/app/domains/narratives/types";

/** Editorial selections: varied people, natural satisfaction, relevant activities.
 * Keep this separate from narrative wording and homepage thumbnail choices.
 * Existing library assets are reused; these are illustrative scenes, not testimonials.
 */
export const domainGuideHeroes: Partial<Record<DomainSlug, DomainImage>> = Object.fromEntries(
  Object.entries(domainPhotos).map(([slug,src]) => [slug,{src,alt:domainPhotoAlts[slug as keyof typeof domainPhotos]}]),
);

export const domainGuideSectionPhotos: Partial<Record<DomainSlug, Record<string, DomainImage>>> = {
  discipline: {
    minimum: { src: "/images/domains/editorial/30-60-90-discipline-reset-hero.webp", alt: "A man writing a manageable daily plan at his kitchen table" },
    review: { src: "/images/domains/editorial/disciplined-weekly-reset-for-overloaded-men-hero.webp", alt: "A man in a purple shirt smiling as he reviews his week at a bright kitchen table" },
  },
  identity: {
    values: { src: "/images/domains/editorial/leading-neurodivergent-kids-hero.webp", alt: "A father giving his son patient attention while they build together" },
  },
  "health-strength": {
    repeat: { src: "/images/domains/editorial/strength-baseline-over-35-no-gym-dependency-hero.webp", alt: "A man smiling while carrying groceries home, putting everyday strength to use" },
    recovery: { src: "/images/domains/editorial/comeback-resilience-injury-recovery-hero.webp", alt: "A man enjoying a gentle seated mobility session at home" },
  },
  "bonds-connections": {
    everyday: { src: "/images/domains/editorial/stoic-masculine-partner-guide-hero.webp", alt: "A man and his partner sharing a relaxed conversation while tidying the kitchen" },
  },
  "purpose-direction": {
    priorities: { src: "/images/domains/editorial/30-60-90-discipline-reset-hero.webp", alt: "A man writing down a manageable set of priorities at his kitchen table" },
    drift: { src: "/images/domains/editorial/what-the-next-two-weeks-are-for-hero.webp", alt: "A man taking a relaxed moment outside with his notebook to consider the next two weeks" },
  },
  "finance-provision": {
    flow: { src: "/images/domains/editorial/ai-mastery-weekly-automation-stack-for-busy-men-hero.webp", alt: "A man reviewing paperwork at an orderly desk beside a warm reading lamp" },
    habit: { src: "/images/domains/editorial/30-60-90-discipline-reset-hero.webp", alt: "A man writing in a notebook at his kitchen table during a short review" },
  },
  resilience: {
    load: { src: "/images/domains/editorial/nervous-system-resilience-men-30-hero.webp", alt: "A man taking a calm seated pause in a naturally lit room" },
  },
  "fall-rise": {
    cause: { src: "/images/domains/editorial/learning-loop-ai-personal-development-hero.webp", alt: "A man reflecting with a notebook in a library before choosing his next step" },
  },
  "grief-honour": {
    forms: { src: "/images/domains/editorial/lead-activities-with-friends-partner-family-hero.webp", alt: "Friends sharing a quiet walk together on a sunlit path" },
  },
  legacy: {
    steward: { src: "/images/domains/editorial/mentor-ladder-one-on-ones-hero.webp", alt: "An older man sharing experience with a younger man outside a home" },
  },
};
