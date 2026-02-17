import type { Metadata } from "next";

export type DomainSlug =
  | "health"
  | "discipline-mindset"
  | "purpose-direction"
  | "leadership-character"
  | "financial-power"
  | "ai-mastery"
  | "grief-honour"
  | "identity-legacy";

export type DomainPrinciple = {
  title: string;
  description: string;
};

export type DomainLink = {
  label: string;
  href: string;
  description: string;
};

export type DomainContent = {
  slug: DomainSlug;
  title: string;
  heroEyebrow: string;
  heroTagline: string;
  description: string;
  socialProof: string;
  callout: string;
  builds: string[];
  failurePatterns: string[];
  principles: DomainPrinciple[];
  actions: string[];
  internalLinks: DomainLink[];
  companionLink: DomainLink;
  seo: {
    title: string;
    description: string;
  };
};

const SOCIAL_IMAGE = "https://ironcompass.ai/social/domain-card.png";
const HERO_SOCIAL_PROOF = "Trusted by 18,000+ men rebuilding disciplined lives since 2025.";

const socialProof = {
  health: "Built to keep thousands of men capable under pressure.",
  discipline: "Used by men who refuse to stay stuck.",
  purpose: "Trusted by operators aligning every hour with mission.",
  leadership: "Proven inside families, platoons, and fast-moving teams.",
  finance: "Men worldwide use this domain to remove financial chaos.",
  ai: "Applied by builders pairing aggression with automation.",
  grief: "Trusted by men carrying heavy seasons without collapsing.",
  identity: "Used by men writing legacies their sons can repeat.",
};

export const domainContentMap: Record<DomainSlug, DomainContent> = {
  health: {
    slug: "health",
    title: "STRENGTH & HEALTH",
    heroEyebrow: "",
    heroTagline: "Build capacity, energy, and long-term resilience",
    description: "Strength and health are not aesthetic goals. They are functional requirements.",
    socialProof: socialProof.health,
    callout: "Strength and health are not aesthetic goals. They are functional requirements.",
    builds: [
      "Physical capacity that stays reliable under load",
      "Energy and recovery that prevent brittle strength",
      "Fuel that supports recovery without obsession",
      "Longevity and injury management that keep you capable",
    ],
    failurePatterns: [
      "Bursts of intense training followed by injury",
      "Inconsistent routines built on mood, not structure",
      "Neglect of sleep and recovery",
      "Reactive eating under stress",
    ],
    principles: [
      { title: "Capacity Under Load", description: "Train to remain reliable when life demands more." },
      { title: "Recovery Is Part of Training", description: "Sleep and stress regulation keep strength useful." },
      { title: "Fuel for Function", description: "Food is fuel and information, not morality." },
      { title: "Longevity First", description: "Protect joints, connective tissue, and progression so strength lasts." },
    ],
    actions: [
      "Maintain consistent weekly training and daily movement.",
      "Guard sleep and recovery as non-negotiable standards.",
      "Feed recovery and respond early to pain or injury.",
      "Adjust training through life phases without dropping standards.",
    ],
    internalLinks: [
      { label: "Return to All Domains", href: "/domains", description: "Keep the rest of the compass visible." },
      { label: "Reinforce Discipline & Mindset", href: "/domains/discipline-mindset", description: "Structure protects your physical standards." },
      { label: "Aim Effort With Purpose & Direction", href: "/domains/purpose-direction", description: "Capability needs a target." },
    ],
    companionLink: { label: "Discipline & Mindset", href: "/domains/discipline-mindset", description: "Structure for your physical standards." },
    seo: {
      title: "Strength & Health | Iron Compass AI",
      description: "Build capacity, energy, and long-term resilience so your body stays reliable under every load.",
    },
  },
  "discipline-mindset": {
    slug: "discipline-mindset",
    title: "DISCIPLINE & MINDSET",
    heroEyebrow: "",
    heroTagline: "The operating system that keeps every promise alive.",
    description:
      "Discipline is reliable action on schedule. Mindset is the story that keeps you from drifting when life tilts. Together they are the operating system men use to hold the line no matter how chaotic the week becomes.",
    socialProof: HERO_SOCIAL_PROOF,
    callout: "Structure beats mood every single day.",
    builds: [
      "Daily anchors that fire even when tired",
      "Narrative control under stress and temptation",
      "Reliable execution for work, training, and family",
      "Self-respect built on proof instead of hype",
    ],
    failurePatterns: [
      "Waiting for motivation instead of building minimums",
      "Living in all-or-nothing challenges",
      "Letting cheap dopamine drain focus",
      "Drifting because no one tracks the standard",
    ],
    principles: [
      { title: "Anchor Stack", description: "Hydrate, move, plan, and review—whether or not you feel like it." },
      { title: "Three-Level Day", description: "Survive, standard, or surge—never skip the minimum." },
      { title: "Narrative Control", description: "Replace panic stories with mission language." },
      { title: "Proof Over Promises", description: "Measure what you do, not what you intend." },
    ],
    actions: [
      "Script morning and evening check-ins inside Iron Compass.",
      "Audit dopamine loops weekly and delete what dulls you.",
      "Set one non-negotiable brave action every day.",
      "Run a Sunday review of wins, misses, and resets.",
    ],
    internalLinks: [
      { label: "Return to All Domains", href: "/domains", description: "See how discipline fuels the system." },
      { label: "Aim With Purpose & Direction", href: "/domains/purpose-direction", description: "Discipline needs a mission." },
      { label: "Protect Identity & Legacy", href: "/domains/identity-legacy", description: "Your name depends on your follow-through." },
    ],
    companionLink: { label: "Strength & Health", href: "/domains/health", description: "Use discipline to protect the body." },
    seo: {
      title: "Discipline & Mindset | Iron Compass AI",
      description: "Master structured habits, narrative control, and relentless follow-through so every other domain stays alive.",
    },
  },
  "purpose-direction": {
    slug: "purpose-direction",
    title: "PURPOSE & DIRECTION",
    heroEyebrow: "",
    heroTagline: "Aim every hour at a chosen mission.",
    description:
      "Purpose is selected, not discovered. Direction is how you translate that choice into quarterly targets, decisive calendars, and non-negotiable reviews so drift dies and progress compounds.",
    socialProof: socialProof.purpose,
    callout: "Direction turns options into decisions and noise into distance.",
    builds: [
      "North Star statements that still matter in five years",
      "Quarterly operating pictures with measurable proof",
      "Weekly reviews that expose drift fast",
      "Calm refusal of invitations off-mission",
    ],
    failurePatterns: [
      "Collecting ideas instead of picking a path",
      "Letting other people’s urgency hijack the day",
      "Chasing feelings over standards",
      "Confusing busyness with progress",
    ],
    principles: [
      { title: "North Star", description: "One sentence that still matters after hardship." },
      { title: "Pillar Selection", description: "Focus on the 3–4 arenas that move everything else." },
      { title: "Target Translation", description: "Attach metrics, dates, and proof of work to every objective." },
      { title: "Cadence Reviews", description: "Weekly and quarterly resets keep drift impossible." },
    ],
    actions: [
      "Write or refine your North Star statement today.",
      "Map quarterly targets inside Iron Compass and tag the domain.",
      "Audit commitments with the question: does this move the mission?",
      "Schedule a quarterly review with someone who will tell you the truth.",
    ],
    internalLinks: [
      { label: "Return to All Domains", href: "/domains", description: "Direction must connect to the rest of the map." },
      { label: "Anchor Discipline & Mindset", href: "/domains/discipline-mindset", description: "Purpose without discipline stays fantasy." },
      { label: "Confirm Identity & Legacy", href: "/domains/identity-legacy", description: "Mission flows from who you are becoming." },
    ],
    companionLink: { label: "Identity & Legacy", href: "/domains/identity-legacy", description: "Aim from who you are." },
    seo: {
      title: "Purpose & Direction | Iron Compass AI",
      description: "Choose a mission worth suffering for and build the reviews, targets, and cadence to keep moving when motivation dies.",
    },
  },
  "leadership-character": {
    slug: "leadership-character",
    title: "LEADERSHIP & CHARACTER",
    heroEyebrow: "",
    heroTagline: "Lead yourself first so others can trust you under pressure.",
    description:
      "Leadership is the daily proof that your standards hold when people are watching. Character is the sum of those decisions. This domain forges calm authority, decisive communication, and steadiness that teams, families, and brothers rally around.",
    socialProof: socialProof.leadership,
    callout: "Rank is given. Leadership is proved.",
    builds: [
      "Presence under stress and uncertainty",
      "Clear communication that moves others to act",
      "Decision frameworks rooted in principles",
      "Reputation for finishing hard things",
    ],
    failurePatterns: [
      "Talking like a leader but folding when pressure hits",
      "Delegating standards instead of modelling them",
      "Leading through mood swings and sarcasm",
      "Avoiding hard conversations until trust erodes",
    ],
    principles: [
      { title: "Example First", description: "People copy what you do, not what you post." },
      { title: "Command Calm", description: "Regulate yourself so others can borrow your steadiness." },
      { title: "Decide Fast, Adjust Faster", description: "Make the best call available, then refine with data." },
      { title: "Protect the Standard", description: "Reward behaviour that matches the creed and confront what doesn’t." },
    ],
    actions: [
      "Write the leadership standard you expect from yourself and share it.",
      "Schedule one hard conversation you’ve been avoiding.",
      "Audit your team or family cadence—does it reflect your values?",
      "Log the reps when you showed calm aggression today.",
    ],
    internalLinks: [
      { label: "Return to All Domains", href: "/domains", description: "Leadership is how the whole compass shows up." },
      { label: "Link With Strength & Health", href: "/domains/health", description: "Physical presence reinforces authority." },
      { label: "Lean on Discipline & Mindset", href: "/domains/discipline-mindset", description: "Leaders keep structure when others melt." },
    ],
    companionLink: { label: "Strength & Health", href: "/domains/health", description: "Authority needs capability." },
    seo: {
      title: "Leadership & Character | Iron Compass AI",
      description: "Forge calm authority, decisive communication, and the standards that make men trust you when everything tilts.",
    },
  },
  "financial-power": {
    slug: "financial-power",
    title: "FINANCIAL POWER",
    heroEyebrow: "",
    heroTagline: "Money is behaviour. Build stability, skill, and long-term offense.",
    description:
      "Financial Power removes chaos from money so you can lead family, work, and mission without panic. It is built through standards, skill, and deliberate planning—not hype or shortcuts.",
    socialProof: socialProof.finance,
    callout: "Financial calm comes from structure, not luck.",
    builds: [
      "Cash-flow clarity and buffers",
      "Income tied to skill and standards",
      "Long-term plans for assets and defense",
      "Calm decision-making during downturns",
    ],
    failurePatterns: [
      "Avoiding numbers until crisis hits",
      "Emotional spending and coping purchases",
      "Jumping jobs or businesses without a plan",
      "Zero buffers so every setback becomes panic",
    ],
    principles: [
      { title: "Reality First", description: "Know your numbers weekly—income, expenses, debt, buffers." },
      { title: "Earn the Raise", description: "Increase value through skill, reliability, and leadership." },
      { title: "Protect the Buffer", description: "Cash cushions buy calm and strategic aggression." },
      { title: "Play Long Games", description: "Invest in assets, skills, and relationships that compound." },
    ],
    actions: [
      "Run a full financial inventory this week.",
      "Choose one income-focused skill to improve over the next 90 days.",
      "Automate transfers to a buffer account every payday.",
      "Review spending triggers and replace them with standards.",
    ],
    internalLinks: [
      { label: "Return to All Domains", href: "/domains", description: "Money decisions affect the whole compass." },
      { label: "Reinforce Discipline & Mindset", href: "/domains/discipline-mindset", description: "Financial order needs behavioural order." },
      { label: "Protect Identity & Legacy", href: "/domains/identity-legacy", description: "Money amplifies the man you are becoming." },
    ],
    companionLink: { label: "Discipline & Mindset", href: "/domains/discipline-mindset", description: "Behaviour drives wealth." },
    seo: {
      title: "Financial Power | Iron Compass AI",
      description: "Replace money stress with structure, skill, and long-term offense so your mission never starves.",
    },
  },
  "ai-mastery": {
    slug: "ai-mastery",
    title: "AI MASTERY & LIFE OPTIMIZATION",
    heroEyebrow: "",
    heroTagline: "Pair aggression with automation and precision leverage.",
    description:
      "AI Mastery is disciplined leverage. You design decision support, automation, and creative speed so your standards execute faster without losing integrity.",
    socialProof: socialProof.ai,
    callout: "Augmented men outpace talented men who refuse new tools.",
    builds: [
      "Personal command centers for planning and review",
      "Automation that creates time for deep work",
      "Insight loops that surface blind spots",
      "Creative velocity without burnout",
    ],
    failurePatterns: [
      "Collecting tools without building workflows",
      "Letting AI think for you instead of assist you",
      "Security blindness with sensitive data",
      "Fear of experimentation so you fall behind",
    ],
    principles: [
      { title: "Human First", description: "You make the call—AI accelerates the path." },
      { title: "Small Stack", description: "Master a few tools and integrate them deeply." },
      { title: "Document the Wins", description: "Store prompts, results, and lessons to compound." },
      { title: "Ethical Guardrails", description: "Protect privacy, honour NDAs, and keep trust." },
    ],
    actions: [
      "Design a daily AI briefing for planning and review.",
      "Automate one repetitive workflow each week.",
      "Teach your team or family the stack so leverage multiplies.",
      "Log every prompt, result, and refinement.",
    ],
    internalLinks: [
      { label: "Return to All Domains", href: "/domains", description: "AI should support every domain, not replace them." },
      { label: "Feed Purpose & Direction", href: "/domains/purpose-direction", description: "Leverage needs a mission." },
      { label: "Guard Identity & Legacy", href: "/domains/identity-legacy", description: "Innovation must match your name." },
    ],
    companionLink: { label: "Purpose & Direction", href: "/domains/purpose-direction", description: "Aim your automation." },
    seo: {
      title: "AI Mastery & Life Optimization | Iron Compass AI",
      description: "Leverage AI for planning, operations, and creative output without losing the standards that keep you lethal.",
    },
  },
  "grief-honour": {
    slug: "grief-honour",
    title: "GRIEF & HONOUR",
    heroEyebrow: "",
    heroTagline: "Carry loss with structure, ritual, and forward motion.",
    description:
      "Grief proves something mattered. Honour turns that pain into responsibility instead of destruction. This domain stabilises the body, creates rituals, and restores forward motion so suffering builds legacy instead of collapse.",
    socialProof: HERO_SOCIAL_PROOF,
    callout: "Pain will visit. Decide what it builds.",
    builds: [
      "Stability protocols that keep you functional",
      "Honour rituals to carry meaning forward",
      "Direction resets that prevent permanent drift",
      "Capacity to lead others through loss",
    ],
    failurePatterns: [
      "Pretending nothing hurts and imploding later",
      "Burning everything down with impulsive decisions",
      "Numbing with substances or endless distraction",
      "Isolating instead of letting trusted men help",
    ],
    principles: [
      { title: "Stabilise", description: "Sleep, water, movement, and guardrails first." },
      { title: "Honour", description: "Letters, rituals, and action that reflect what was lost." },
      { title: "Walk Forward", description: "Small, deliberate steps toward a reshaped future." },
      { title: "Brotherhood", description: "Let loyal men carry weight with you." },
    ],
    actions: [
      "Name three stabilisers (sleep, walk, meal) and guard them.",
      "Create a weekly honour ritual and protect it.",
      "Delay major life decisions for 90 days.",
      "Share the load with one trusted brother or counsellor.",
    ],
    internalLinks: [
      { label: "Return to All Domains", href: "/domains", description: "Loss touches every arena—view the full map." },
      { label: "Lean on Discipline & Mindset", href: "/domains/discipline-mindset", description: "Structure stops grief from owning you." },
      { label: "Reconnect Identity & Legacy", href: "/domains/identity-legacy", description: "Loss reshapes who you are becoming." },
    ],
    companionLink: { label: "Discipline & Mindset", href: "/domains/discipline-mindset", description: "Use structure while you heal." },
    seo: {
      title: "Grief & Honour | Iron Compass AI",
      description: "Stabilise during loss, honour what mattered, and rebuild direction with structure instead of chaos.",
    },
  },
  "identity-legacy": {
    slug: "identity-legacy",
    title: "IDENTITY & LEGACY",
    heroEyebrow: "",
    heroTagline: "Decide who you are, prove it daily, and leave evidence behind.",
    description:
      "Identity is the standard you live out, not the stories you post. Legacy is that identity multiplied across decades and people. This domain makes sure your name and your behaviour match.",
    socialProof: socialProof.identity,
    callout: "Write the story with behaviour, not captions.",
    builds: [
      "Principles and roles that anchor your life",
      "Behavioural standards before emotion",
      "Legacy sentences your people can repeat",
      "Audit rhythm that keeps drift exposed",
    ],
    failurePatterns: [
      "Letting work, income, or relationships define you",
      "Dragging shame and regret as identity",
      "Copying other men’s standards",
      "Talking legacy while hiding from accountability",
    ],
    principles: [
      { title: "Principles", description: "Pick 3–5 non-negotiables and read them daily." },
      { title: "Roles", description: "Name the people and arenas you are responsible to." },
      { title: "Standards", description: "Define acceptable behaviour before emotions vote." },
      { title: "Story", description: "Tell the truth about who you were, are, and will be." },
    ],
    actions: [
      "Write a future-self letter every quarter.",
      "Run nightly audits: where did I act like the man I claim to be?",
      "Schedule role reviews (father, partner, operator, brother).",
      "Craft a legacy sentence your family can repeat.",
    ],
    internalLinks: [
      { label: "Return to All Domains", href: "/domains", description: "Identity touches every other arena." },
      { label: "Lock in Discipline & Mindset", href: "/domains/discipline-mindset", description: "Identity is proved through disciplined action." },
      { label: "Aim With Purpose & Direction", href: "/domains/purpose-direction", description: "Legacy needs a mission." },
    ],
    companionLink: { label: "Purpose & Direction", href: "/domains/purpose-direction", description: "Identity informs your mission." },
    seo: {
      title: "Identity & Legacy | Iron Compass AI",
      description: "Choose principles, roles, and standards that withstand pressure so your name carries weight for decades.",
    },
  },
};

export function buildDomainMetadata(content: DomainContent): Metadata {
  return {
    title: content.seo.title,
    description: content.seo.description,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: `https://ironcompass.ai/domains/${content.slug}`,
      siteName: "Iron Compass",
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: `${content.title} – Iron Compass`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: [SOCIAL_IMAGE],
    },
  };
}
