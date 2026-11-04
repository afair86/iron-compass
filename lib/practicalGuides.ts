import type { AppContext } from "./articleAppContext";

export type PracticalGuide = {
  topic: string;
  context: AppContext;
  image: string;
  alt: string;
  summary: string;
  daily: string;
  weekly: string;
  next: string;
  domainHref: string;
  domainLabel: string;
};

export const practicalGuides: Record<string, PracticalGuide> = {
  "/articles/grief-for-men": {
    topic: "Grief & Honour",
    context: "grief-honour",
    image: "/images/domains/grief-bench.webp",
    alt: "A man sitting quietly beside flowers on a park bench",
    summary:
      "Keep a manageable structure around the day, make room for remembrance and stay connected to someone you trust. You do not have to turn loss into a performance of strength.",
    daily:
      "Choose one essential duty and one ordinary body basic, such as a meal or a short walk. Keep the demands proportionate to the day.",
    weekly:
      "Make time for a small act of remembrance. Review which responsibilities need help and arrange one specific conversation or practical task.",
    next: "Write the duty you will carry today and the person you can ask for help.",
    domainHref: "/domains/grief-honour",
    domainLabel: "Grief & Honour",
  },
  "/articles/how-men-grieve-differently": {
    topic: "Grief & Honour",
    context: "grief-honour",
    image: "/images/domains/grief-shelf.webp",
    alt: "A man looking at a framed photograph beside a remembrance shelf",
    summary:
      "Grief does not follow one pattern for every man. Notice how you are responding, keep a few practical anchors and make room for honest support.",
    daily:
      "Notice whether work, silence or distraction is helping you carry the day or keeping you away from something important. Name one useful action.",
    weekly:
      "Check whether your current routine leaves room for rest, company and remembrance. Ask for a specific kind of support rather than disappearing.",
    next: "Contact one person you trust and say what would be useful this week.",
    domainHref: "/domains/grief-honour",
    domainLabel: "Grief & Honour",
  },
  "/articles/stoic-grief-strength-through-loss": {
    topic: "Grief & Honour",
    context: "grief-honour",
    image:
      "/images/domains/editorial/nervous-system-resilience-men-30-hero.webp",
    alt: "A man taking a quiet seated pause beside a sunlit window",
    summary:
      "Use Stoic principles to guide your conduct while carrying loss: recognise what happened, act fairly and choose a responsibility you can meet. Feelings are not a failure of character.",
    daily:
      "Before one difficult decision, separate the facts from your first judgement. Ask which response is wise, fair and within your control.",
    weekly:
      "Review one decision you handled well and one you would handle differently. Keep an act of remembrance alongside the duties that remain.",
    next: "Write one action that honours what mattered without neglecting someone who needs you now.",
    domainHref: "/domains/grief-honour",
    domainLabel: "Grief & Honour",
  },
  "/articles/rebuilding-identity-after-loss": {
    topic: "Identity",
    context: "identity",
    image: "/images/domains/identity-box.webp",
    alt: "A man carefully working on a wooden keepsake box in his workshop",
    summary:
      "Start with the roles and principles you can still carry. Rebuild direction through observable commitments, with room for life to take a different shape.",
    daily:
      "Choose one role that still matters and one promise small enough to keep. Record what you actually did rather than a verdict about yourself.",
    weekly:
      "Review whether your actions reflect your chosen standards. Change an unrealistic demand and make space for one useful responsibility.",
    next: "Write two standards you want your next chapter to show, then put one into practice today.",
    domainHref: "/domains/identity",
    domainLabel: "Identity",
  },
  "/articles/rebuilding-after-divorce-for-men": {
    topic: "Fall & Rise",
    context: "fall-rise",
    image: "/images/get-the-app/coastal-walk.webp",
    alt: "Two men sharing an easy conversation on a coastal walking track",
    summary:
      "Rebuilding after divorce takes time. Stabilise the practical essentials, carry your responsibilities with integrity and choose a direction beyond the separation.",
    daily:
      "Keep one essential commitment, organise the next practical task and pause before sending a message written in anger. Focus on your own conduct.",
    weekly:
      "Review what has become steadier, what still needs qualified help and which rebuilding milestone is realistic next. Protect time with the people who depend on you.",
    next: "Write what has changed, what is yours to own and one practical step for the next 24 hours.",
    domainHref: "/domains/fall-rise",
    domainLabel: "Fall & Rise",
  },
};
