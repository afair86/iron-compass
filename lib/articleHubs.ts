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
    title: "How to Rebuild Your Life After Divorce as a Man",
    description:
      "Rebuild after divorce with practical stability, clear standards and integrity. Daily actions, a weekly review and a longer-term direction.",
    datePublished: "2025-11-29",
    dateModified: "2026-11-05",
  },
];

export const financialHubLinks: TopicHubLink[] = [
  {
    title: "Review your cash flow with AI",
    href: "/blog/cashflow-command-ai-copilot",
    description: "Organise income, bills and reserves, then check the numbers yourself.",
  },
  {
    title: "Financial Resilience Protocol",
    href: "/blog/financial-resilience-protocol",
    description:
      "Weekly cash flow clarity, buffer protection, and low-risk decisions.",
  },
  {
    title: "Give your money three clear jobs",
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
    title: "Put bills and cash reserves on a regular schedule",
    href: "/blog/liquidity-rails-automate-bills-buffers",
    description: "Set regular transfers for bills and reserves, then review what needs adjusting.",
  },
];

export const aiMasteryHubLinks: TopicHubLink[] = [
  {
    title: "Use AI for the tasks you repeat",
    href: "/blog/operator-ai-copilot-daily-loop",
    description: "Choose one repeated task, try an AI workflow and check the result.",
  },
  {
    title: "Make AI useful in a busy week",
    href: "/blog/ai-mastery-routine-busy-men",
    description: "Set a clear task, give the context and review the answer before using it.",
  },
  {
    title: "Your First Useful AI Assistant",
    href: "/blog/first-useful-ai-assistant",
    description:
      "Turn a messy task into a clear plan, then check the work yourself.",
  },
  {
    title: "Learn a skill with AI and practise it yourself",
    href: "/blog/learning-loop-ai-personal-development",
    description: "Use explanations and feedback to support practice, then test what you can do.",
  },
  {
    title: "Human-in-the-Loop Automations for Small Teams",
    href: "/blog/human-loop-ai-automations-small-teams",
    description: "Keep a person responsible for reviewing work before it goes out.",
  },
];

export function getRelatedGriefArticles(currentPath: string): HubArticle[] {
  return griefArticles.filter((article) => article.path !== currentPath);
}

export function getGriefArticleByPath(path: string): HubArticle | undefined {
  return griefArticles.find((article) => article.path === path);
}
