import type { DomainSlug } from "@/app/domains/content";
import type { DomainImage } from "@/app/domains/narratives/types";

/** Editorial selections: varied people, natural satisfaction, relevant activities.
 * Keep this separate from narrative wording and homepage thumbnail choices.
 * Existing library assets are reused; these are illustrative scenes, not testimonials.
 */
export const domainGuideHeroes: Partial<Record<DomainSlug, DomainImage>> = {
  discipline: { src: "/images/domains/editorial/30-60-90-discipline-reset-hero.webp", alt: "A man smiling as he writes a simple daily plan at his kitchen table" },
  identity: { src: "/images/domains/editorial/personal-doctrine-in-7-days-hero.webp", alt: "A man in a purple shirt writing his personal standards in a sunlit room" },
  resilience: { src: "/images/domains/editorial/rebuild-strength-after-injury-hero.webp", alt: "A man smiling while taking the stairs at a manageable pace" },
  "fall-rise": { src: "/images/domains/editorial/iron-protocol-strength-transition-hero.webp", alt: "A man enjoying a manageable strength session in his garden" },
  "grief-honour": { src: "/images/domains/grief-bench.webp", alt: "A man quietly reflecting beside flowers on a park bench" },
};

export const domainGuideSectionPhotos: Partial<Record<DomainSlug, Record<string, DomainImage>>> = {
  discipline: {
    minimum: { src: "/images/domains/editorial/four-block-compliance-system-hero.webp", alt: "A man setting out his shoes and everyday essentials to make the next morning easier" },
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
    priorities: { src: "/images/domains/editorial/quarterly-mission-design-hero.webp", alt: "A man arranging a few clear priorities on a board in his home office" },
    drift: { src: "/images/domains/editorial/what-the-next-two-weeks-are-for-hero.webp", alt: "A man taking a relaxed moment outside with his notebook to consider the next two weeks" },
  },
  "finance-provision": {
    flow: { src: "/images/domains/editorial/ai-mastery-weekly-automation-stack-for-busy-men-hero.webp", alt: "A man reviewing paperwork at an orderly desk beside a warm reading lamp" },
    habit: { src: "/images/domains/editorial/liquidity-rails-automate-bills-buffers-hero.webp", alt: "A man smiling as he puts his financial paperwork in order" },
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
