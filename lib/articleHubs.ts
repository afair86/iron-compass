export type HubArticle = {
  slug: string;
  path: string;
  title: string;
  description: string;
  datePublished: string;
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
    title: "Grief for Men: How to Carry Pain Without Breaking",
    description: "Most men grieve in silence. Practical steps to hold pain with structure — without collapsing or going numb.",
    datePublished: "2025-11-01",
  },
  {
    slug: "how-men-grieve-differently",
    path: "/articles/how-men-grieve-differently",
    title: "How Men Grieve Differently — And Why Silence Isn't Strength",
    description: "Why isolation, rage, and numbness show up — and what structure actually helps you process loss.",
    datePublished: "2025-11-08",
  },
  {
    slug: "stoic-grief-strength-through-loss",
    path: "/articles/stoic-grief-strength-through-loss",
    title: "How Stoic Philosophy Helps Men Process Grief",
    description: "Face loss with clarity, discipline, and strength — without going numb, bitter, or collapsing.",
    datePublished: "2025-11-15",
  },
  {
    slug: "rebuilding-identity-after-loss",
    path: "/articles/rebuilding-identity-after-loss",
    title: "Who Am I After Loss? Rebuilding Identity as a Man",
    description: "A disciplined path to rebuild identity and direction — without pretending the pain didn't happen.",
    datePublished: "2025-11-22",
  },
  {
    slug: "rebuilding-after-divorce-for-men",
    path: "/articles/rebuilding-after-divorce-for-men",
    title: "Rebuilding After Divorce: A Man's Guide to Starting Over",
    description: "Regain discipline, confidence, and direction after separation — without the traps that break most men.",
    datePublished: "2025-11-29",
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
    description: "Weekly cash flow clarity, buffer protection, and low-risk decisions.",
  },
  {
    title: "Fortress Method Financial Confidence",
    href: "/blog/fortress-method-financial-confidence",
    description: "Survival, stability, and surplus buckets for long-term control.",
  },
  {
    title: "Cash Defense and Offense",
    href: "/blog/cash-defense-and-offense",
    description: "Eight-week sprint to tighten burn, add revenue, and automate basics.",
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
    title: "How AI Helps Men Stay Disciplined",
    href: "/blog/how-ai-can-help-men-become-more-disciplined",
    description: "AI as planner and accountability — not a replacement for standards.",
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
