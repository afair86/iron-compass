export type HubArticle = {
  slug: string;
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
};

export type TopicHubLink = {
  title: string;
  href: string;
  description: string;
};

export const griefArticles: HubArticle[] = [
  {
    slug: "grief-for-men",
    path: "/articles/grief-for-men",
    title: "Grief for Men: Practical Ways to Carry Loss",
    description:
      "A practical guide for men carrying grief: daily structure, remembrance, honest support and responsibilities you can still carry.",
    datePublished: "2025-11-01",
    dateModified: "2026-11-04",
  },
  {
    slug: "how-men-grieve-differently",
    path: "/articles/how-men-grieve-differently",
    title: "How Men Experience Grief: Patterns and Practical Support",
    description:
      "Men experience grief in different ways. Explore silence, responsibility and connection, with practical daily and weekly actions.",
    datePublished: "2025-11-08",
    dateModified: "2026-11-04",
  },
  {
    slug: "stoic-grief-strength-through-loss",
    path: "/articles/stoic-grief-strength-through-loss",
    title: "Stoic Grief: Principles for Carrying Loss",
    description:
      "Use Stoic principles to guide your conduct through loss. Practical reflection, remembrance and daily responsibilities without demanding emotional numbness.",
    datePublished: "2025-11-15",
    dateModified: "2026-11-04",
  },
  {
    slug: "rebuilding-identity-after-loss",
    path: "/articles/rebuilding-identity-after-loss",
    title: "Rebuilding Identity After Loss: Roles, Standards and Direction",
    description:
      "Rebuild direction after loss through the roles, principles and practical commitments you can still carry. A guide for men starting a changed chapter.",
    datePublished: "2025-11-22",
    dateModified: "2026-11-04",
  },
  {
    slug: "rebuilding-after-divorce-for-men",
    path: "/articles/rebuilding-after-divorce-for-men",
    title: "Rebuilding After Divorce: A Man's Guide to Starting Over",
    description:
      "Rebuild after divorce with practical stability, clear standards and integrity. Daily actions, a weekly review and a longer-term direction.",
    datePublished: "2025-11-29",
    dateModified: "2026-11-04",
  },
];

export const financialHubLinks: TopicHubLink[] = [
  {
    title: "Cashflow Command with an AI Copilot",
    href: "/blog/cashflow-command-ai-copilot",
    description: "Weekly AI-assisted cashflow monitoring and runway decisions.",
  },
  {
    title: "Financial Resilience Protocol",
    href: "/blog/financial-resilience-protocol",
    description:
      "Weekly cash flow clarity, buffer protection, and low-risk decisions.",
  },
  {
    title: "Fortress Method Financial Confidence",
    href: "/blog/fortress-method-financial-confidence",
    description:
      "Survival, stability, and surplus buckets for long-term control.",
  },
  {
    title: "Cash Defense and Offense",
    href: "/blog/cash-defense-and-offense",
    description:
      "Eight-week sprint to tighten burn, add revenue, and automate basics.",
  },
  {
    title: "Liquidity Rails: Automate Bills & Buffers",
    href: "/blog/liquidity-rails-automate-bills-buffers",
    description: "Automate cash routing so buffers refill without willpower.",
  },
];

export const aiMasteryHubLinks: TopicHubLink[] = [
  {
    title: "Operator AI Copilot Daily Loop",
    href: "/blog/operator-ai-copilot-daily-loop",
    description: "Map your day, automate grunt work, keep judgment in command.",
  },
  {
    title: "AI Mastery Routine for Busy Men",
    href: "/blog/ai-mastery-routine-busy-men",
    description: "Intent, prompt, review — a human-first routine that sticks.",
  },
  {
    title: "Your First Useful AI Assistant",
    href: "/blog/first-useful-ai-assistant",
    description:
      "Turn a messy task into a clear plan, then check the work yourself.",
  },
  {
    title: "Learning Loop for AI Personal Development",
    href: "/blog/learning-loop-ai-personal-development",
    description: "Turn AI output into skill through review, edit, and repeat.",
  },
  {
    title: "Human-in-the-Loop Automations for Small Teams",
    href: "/blog/human-loop-ai-automations-small-teams",
    description: "Speed without shipping mistakes — humans on the final step.",
  },
];

export function getRelatedGriefArticles(currentPath: string): HubArticle[] {
  return griefArticles.filter((article) => article.path !== currentPath);
}

export function getGriefArticleByPath(path: string): HubArticle | undefined {
  return griefArticles.find((article) => article.path === path);
}
