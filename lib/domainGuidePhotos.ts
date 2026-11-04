import type { DomainSlug } from "@/app/domains/content";
import type { DomainImage } from "@/app/domains/narratives/types";

/** Editorial selections: varied people, natural satisfaction, relevant activities.
 * Keep this separate from narrative wording and homepage thumbnail choices.
 * Existing library assets are reused; these are illustrative scenes, not testimonials.
 */
export const domainGuideHeroes: Partial<Record<DomainSlug, DomainImage>> = {
  discipline: { src: "/images/blog/30-60-90-discipline-reset-hero.png", alt: "A man smiling as he writes a simple daily plan at his kitchen table" },
  identity: { src: "/images/blog/personal-doctrine-in-7-days-hero.png", alt: "A man in a purple shirt writing his personal standards in a sunlit room" },
  resilience: { src: "/images/blog/rebuild-strength-after-injury-hero.png", alt: "A man smiling while taking the stairs at a manageable pace" },
  "fall-rise": { src: "/images/blog/iron-protocol-strength-transition-hero.png", alt: "A man enjoying a manageable strength session in his garden" },
  "grief-honour": { src: "/images/domains/grief-bench.webp", alt: "A man quietly reflecting beside flowers on a park bench" },
};

export const domainGuideSectionPhotos: Partial<Record<DomainSlug, Record<string, DomainImage>>> = {
  discipline: {
    minimum: { src: "/images/blog/four-block-compliance-system-hero.png", alt: "A man setting out his shoes and everyday essentials to make the next morning easier" },
    review: { src: "/images/blog/disciplined-weekly-reset-for-overloaded-men-hero.png", alt: "A man in a purple shirt smiling as he reviews his week at a bright kitchen table" },
  },
  identity: {
    values: { src: "/images/blog/leading-neurodivergent-kids-hero.png", alt: "A father giving his son patient attention while they build together" },
  },
  "health-strength": {
    repeat: { src: "/images/blog/strength-baseline-over-35-no-gym-dependency-hero.png", alt: "A man smiling while carrying groceries home, putting everyday strength to use" },
    recovery: { src: "/images/blog/comeback-resilience-injury-recovery-hero.png", alt: "A man enjoying a gentle seated mobility session at home" },
  },
  "bonds-connections": {
    everyday: { src: "/images/blog/stoic-masculine-partner-guide-hero.png", alt: "A man and his partner sharing a relaxed conversation while tidying the kitchen" },
  },
  "purpose-direction": {
    priorities: { src: "/images/blog/quarterly-mission-design-hero.png", alt: "A man arranging a few clear priorities on a board in his home office" },
    drift: { src: "/images/blog/what-the-next-two-weeks-are-for-hero.webp", alt: "A man taking a relaxed moment outside with his notebook to consider the next two weeks" },
  },
  "finance-provision": {
    flow: { src: "/images/blog/cashflow-command-ai-copilot-hero.png", alt: "A man reviewing household paperwork in a bright kitchen" },
    habit: { src: "/images/blog/liquidity-rails-automate-bills-buffers-hero.png", alt: "A man smiling as he puts his financial paperwork in order" },
  },
  resilience: {
    load: { src: "/images/blog/nervous-system-resilience-men-30-hero.png", alt: "A man taking a calm seated pause in a naturally lit room" },
  },
  "fall-rise": {
    cause: { src: "/images/blog/learning-loop-ai-personal-development-hero.png", alt: "A man reflecting with a notebook in a library before choosing his next step" },
  },
  "grief-honour": {
    forms: { src: "/images/blog/lead-activities-with-friends-partner-family-hero.png", alt: "Friends sharing a quiet walk together on a sunlit path" },
  },
  legacy: {
    steward: { src: "/images/blog/mentor-ladder-one-on-one-hero.png", alt: "An older man sharing experience with a younger man outside a home" },
  },
};
