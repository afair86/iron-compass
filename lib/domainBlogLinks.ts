import type { DomainSlug } from "@/app/domains/content";

export type DomainBlogLink = {
  title: string;
  href: string;
  description: string;
};

/** Topical journal links for each domain pillar — 2–3 per domain */
export const domainBlogLinks: Record<DomainSlug, DomainBlogLink[]> = {
  "health-strength": [
    {
      title: "Strength Without Extra Time",
      href: "/blog/strength-without-extra-time",
      description: "A 30-minute strength habit that fits a full week without becoming another project.",
    },
    {
      title: "Strength Baseline Over 35",
      href: "/blog/strength-baseline-over-35-no-gym-dependency",
      description: "Build capacity at home when gym access is inconsistent or nonexistent.",
    },
    {
      title: "Metabolic Armor for Busy Fathers",
      href: "/blog/metabolic-armor-busy-fathers",
      description: "Keep energy stable when sleep is thin and the schedule owns your day.",
    },
  ],
  discipline: [
    {
      title: "Quiet Discipline Protocol for Busy Men",
      href: "/blog/quiet-discipline-protocol-busy-men",
      description: "One daily standard, one weekly review — discipline that fits a loaded calendar.",
    },
    {
      title: "Discipline Under Fire",
      href: "/blog/discipline-under-fire-holding-the-line",
      description: "Hold your standards when the week turns chaotic.",
    },
    {
      title: "When Things Start Falling Into Place",
      href: "/blog/when-things-start-falling-into-place",
      description: "Protect momentum when resistance drops — the moment most men drift.",
    },
  ],
  "purpose-direction": [
    {
      title: "Purpose Direction Reset",
      href: "/blog/purpose-direction-reset",
      description: "A four-week habit to match daily work to a clear direction.",
    },
    {
      title: "Quarterly Mission Design",
      href: "/blog/quarterly-mission-design",
      description: "Turn a North Star into measurable targets you can actually hit.",
    },
    {
      title: "90-Day Purpose Sprint",
      href: "/blog/90-day-purpose-sprint",
      description: "Compress drift into a focused quarter with proof at the end.",
    },
  ],
  "bonds-connections": [
    {
      title: "Command Calm After Action",
      href: "/blog/command-calm-after-action-leadership",
      description: "A 20-minute ritual that turns mistakes into trust.",
    },
    {
      title: "Leadership Under Fire Protocol",
      href: "/blog/leadership-under-fire-protocol",
      description: "Decide clearly when pressure rises and others are watching.",
    },
    {
      title: "Hard Honest Conversations",
      href: "/blog/hard-honest-conversations-with-people-you-care-about",
      description: "Say what needs saying without burning the relationship.",
    },
  ],
  "finance-provision": [
    {
      title: "Finance guides",
      href: "/articles/financial-power",
      description: "Curated cashflow, buffer, and money discipline guides.",
    },
    {
      title: "Financial Resilience Protocol",
      href: "/blog/financial-resilience-protocol",
      description: "Weekly cash flow clarity, buffer protection, and low-risk decisions.",
    },
    {
      title: "Cash Defense and Offense",
      href: "/blog/cash-defense-and-offense",
      description: "An eight-week sprint to tighten burn, add revenue, and automate the basics.",
    },
    {
      title: "Cashflow Command AI Copilot",
      href: "/blog/cashflow-command-ai-copilot",
      description: "Use AI to speed reviews without losing judgment on the numbers.",
    },
  ],
  "ai-mastery": [
    {
      title: "AI Mastery Hub",
      href: "/articles/ai-mastery",
      description: "Daily loops, automations, and discipline support with AI in command.",
    },
    {
      title: "AI Mastery Routine for Busy Men",
      href: "/blog/ai-mastery-routine-busy-men",
      description: "Intent, prompt, review — a human-first routine that actually sticks.",
    },
    {
      title: "Operator AI Copilot Daily Loop",
      href: "/blog/operator-ai-copilot-daily-loop",
      description: "Map your day, automate the grunt work, keep judgment in command.",
    },
    {
      title: "How AI Helps Men Stay Disciplined",
      href: "/blog/how-ai-can-help-men-become-more-disciplined",
      description: "AI as planner and accountability — not a replacement for standards.",
    },
  ],
  "grief-honour": [
    {
      title: "Grief Guides Hub",
      href: "/articles",
      description: "Five long-form guides on grief, loss, identity, and rebuilding for men.",
    },
    {
      title: "Grief to Honour Rebuild",
      href: "/blog/grief-to-honour-rebuild",
      description: "Stabilise, ritualise, and walk forward after loss.",
    },
    {
      title: "Honour Wound Grief Map",
      href: "/blog/honour-wound-grief-map",
      description: "Name the wound, choose the ritual, carry meaning forward.",
    },
    {
      title: "Grief for Men (Article)",
      href: "/articles/grief-for-men",
      description: "How to carry pain with strength and clarity — without collapsing or going numb.",
    },
  ],
  identity: [
    {
      title: "Doctrine of Self: Personal Creed",
      href: "/blog/doctrine-self-personal-creed",
      description: "Write principles you can read daily and actually live.",
    },
    {
      title: "Legacy in Motion",
      href: "/blog/legacy-in-motion-identity-design",
      description: "Design identity as behaviour, not branding.",
    },
    {
      title: "Stoic Masculine Partner Guide",
      href: "/blog/stoic-masculine-partner-guide",
      description: "Show up steady in the relationship without performing strength.",
    },
  ],
  resilience: [
    {
      title: "Comeback after injury",
      href: "/blog/comeback-resilience-injury-recovery",
      description: "Stay functional while capacity comes back. The floor still counts.",
    },
    {
      title: "Strength under stress",
      href: "/blog/strength-under-stress-plan",
      description: "A plan for weeks that are already heavy.",
    },
  ],
  "fall-rise": [
    {
      title: "Discipline collapse protocol",
      href: "/blog/discipline-collapse-protocol",
      description: "What to do after the standard drops, without a restart speech.",
    },
    {
      title: "When the line was missed",
      href: "/blog/discipline-drift-recovery-12-week-reboot",
      description: "A return that is smaller than the speech and still real.",
    },
  ],
  legacy: [
    {
      title: "Legacy in motion",
      href: "/blog/legacy-in-motion-identity-design",
      description: "What you put in place, not the story you hope is left behind.",
    },
    {
      title: "Doctrine of self",
      href: "/blog/doctrine-self-personal-creed",
      description: "Standards worth keeping long enough that someone else can recognise them.",
    },
  ],
};
