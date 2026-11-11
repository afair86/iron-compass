export const FREE_PACK_VERSION = "follow-through-v1";
export const FREE_PACK_DOWNLOAD = "/downloads/7-day-follow-through-pack.html";
export const packSections = [
  { title: "1. Choose one responsibility", copy: "Choose something that already needs you this week. Make it specific enough to act on: prepare tomorrow, finish one overdue task or give someone your full attention.", prompt: "What needs my attention, and who depends on me following through?" },
  { title: "2. Name the action", copy: "Choose one action within your control. Give it a time and a clear finish. Keep the commitment realistic for the week you actually have.", prompt: "I will ___ at ___. It is finished when ___." },
  { title: "3. Plan for a difficult day", copy: "Write a smaller version you can still carry out when time or energy is short. If you miss it, record what happened and choose the next available opportunity. A miss is information, not a cancelled week.", prompt: "My smaller version is ___. If I miss it, my next opportunity is ___." },
  { title: "4. Keep a seven-day record", copy: "Each day, note whether you kept the full commitment, kept the smaller version or missed it. Add one factual line about what helped or got in the way. You do not need a perfect streak.", prompt: "Day / Full, smaller or missed / What happened / Next action" },
  { title: "5. Review the week", copy: "Look at what happened before adding more commitments. Keep what worked, change what did not fit, and make one clear commitment for the week ahead.", prompt: "What did I keep? What needs adjusting? What will I do next week?" },
] as const;

export const freeRecommendations = {
  daily: { label: "Daily follow-through", title: "Build discipline when life is busy", href: "/blog/quiet-discipline-protocol-busy-men", copy: "Choose one commitment and a practical way to keep it." },
  weekly: { label: "Planning the week", title: "A practical weekly review", href: "/blog/disciplined-weekly-reset-for-overloaded-men", copy: "Close unfinished tasks and make room for the week ahead." },
  tools: { label: "Using tools well", title: "Your first useful AI assistant", href: "/blog/first-useful-ai-assistant", copy: "Clarify a task and check the work yourself. The public guide and prompt builder need no account." },
} as const;

export const PACK_EMAIL_CONSENT_VERSION = "pack-notes-v1";
export const PACK_EMAIL_CONSENT = "Email me the free pack and three follow-up notes over eight days, including relevant free guides and an introduction to the Iron Compass app. I can unsubscribe at any time.";
export const PACK_EXPERIMENT = "pack-cta-v1";
export type PackVariant = "control" | "practice";
export const packCta = { control: "Email me the free pack", practice: "Start my seven-day practice" } as const;

export const packCampaign = [
  { id: "welcome", day: 0, subject: "Your seven-day follow-through pack", body: "The pack is ready. Choose one responsibility, name a realistic action and make room for it today. Start with the week you have. There is no score to impress and no need to add ten new habits.", cta: "Open your free pack", href: "/free-pack#the-pack" },
  { id: "difficult-day", day: 2, subject: "Decide what a difficult day looks like", body: "Before the day gets crowded, name the smaller version of your commitment. What can you still carry out? If yesterday did not go to plan, write one factual line and choose the next opportunity. The responsibility remains; the size of the action can change.", cta: "Read the practical discipline guide", href: "/blog/quiet-discipline-protocol-busy-men" },
  { id: "review", day: 5, subject: "Make room for a short weekly review", body: "Set aside a few minutes to look at your record. What did you keep? What repeatedly got in the way? Change the plan to fit the demands ahead, then name one action for next week.", cta: "Use the free weekly review", href: "/blog/disciplined-weekly-reset-for-overloaded-men" },
  { id: "next-step", day: 8, subject: "Keep what worked. Choose what comes next.", body: "You now have a record to work from. Keep the commitment that matters and adjust the part that did not fit. If a daily place for that work would help, the Iron Compass web app has a free account. You can also continue with the public guides. This is the last note in this starter sequence; it does not enrol you in an ongoing newsletter.", cta: "Explore the app before deciding", href: "/download" },
] as const;
