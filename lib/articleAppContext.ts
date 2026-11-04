import { domainAppFeatures } from "@/lib/domainAppFeatures";
import type { PostMeta } from "@/lib/blog";

export type AppContext = keyof typeof contextCopy;

const contextCopy = {
  leadership: {
    title: "Give the commitment a place in tomorrow",
    description:
      "Start with your own follow-through: one decision, one promise and the next action. Keep a record you can review before you ask more of the people around you.",
    label: "Leadership & follow-through",
    shot: 2,
    plan: "Core",
  },
  discipline: {
    title: "Give the standard a place in your day",
    description:
      "Choose one action from this guide. Keep it as a habit with a smaller version for the days that do not go to plan.",
    label: "Discipline",
    shot: 1,
    plan: "Free",
  },
  identity: {
    title: "Put a principle beside the behaviour",
    description:
      "A standard means more when you can check what happened. Connect the roles you carry to the habits you keep.",
    label: "Identity",
    shot: 1,
    plan: "Core",
  },
  "health-strength": {
    title: "Build a week you can repeat",
    description:
      "Keep strength, walking and sleep visible in the same week. Use the Light version when the full session does not fit.",
    label: "Health & Strength",
    shot: 1,
    plan: "Free",
  },
  "bonds-connections": {
    title: "Make presence something you practise",
    description:
      "Take one useful action from the article into your week. A presence habit and a regular review give you something concrete to return to.",
    label: "Bonds & Connections",
    shot: 1,
    plan: "Free",
  },
  "purpose-direction": {
    title: "Give the aim a next action",
    description:
      "A direction needs time in the week. Start with a habit; use the planning tools when you need a longer view.",
    label: "Purpose & Direction",
    shot: 1,
    plan: "Elite",
  },
  "finance-provision": {
    title: "Keep the money review in the week",
    description:
      "The useful first step is still your own list of obligations. Keep a regular money-check habit; the app can also carry a longer-term goal.",
    label: "Finance & Provision",
    shot: 1,
    plan: "Elite",
  },
  resilience: {
    title: "Keep the basics in view when the load rises",
    description:
      "Name one responsibility you can still carry today. Keep the habit small, then review the demands ahead.",
    label: "Resilience",
    shot: 1,
    plan: "Core",
  },
  "fall-rise": {
    title: "Make the return smaller than the setback",
    description:
      "Use the action in this guide first. Keep a rebuilding habit and a review you can return to after a miss.",
    label: "Fall & Rise",
    shot: 2,
    plan: "Elite",
  },
  "grief-honour": {
    title: "Keep a small structure around the day",
    description:
      "Use the guide at your own pace. A short honour ritual and the immediate duties can have a place in the week, without turning loss into a score.",
    label: "Grief & Honour",
    shot: 1,
    plan: "Free",
  },
  legacy: {
    title: "Leave a record of what you kept",
    description:
      "Choose a responsibility that matters beyond this week. Keep a habit around it and look back at the pattern, rather than the intention.",
    label: "Legacy",
    shot: 1,
    plan: "Elite",
  },
  ai: {
    title: "Keep the judgment. Give the work a record",
    description:
      "The prompts and methods in the public guides work on their own. In the app, habits and a private journal give your decisions a record; paid AI journal reviews help you look back at it.",
    label: "Using AI well",
    shot: 0,
    plan: "Core and Elite",
  },
  daily: {
    title: "Turn one useful idea into a daily practice",
    description:
      "Start with a few habits, a private journal and one next action. Add planning tools and AI coaching when your week needs them.",
    label: "Daily practice",
    shot: 0,
    plan: "Free",
  },
} as const;

export function articleAppContext(
  post: Pick<PostMeta, "category" | "slug">,
): AppContext {
  const category = (post.category ?? "").toLowerCase();
  if (/grief|honour/.test(category)) return "grief-honour";
  if (/financ|wealth|money/.test(category)) return "finance-provision";
  if (/strength|health/.test(category)) return "health-strength";
  if (/identity|legacy/.test(category))
    return /legacy/.test(post.slug) ? "legacy" : "identity";
  if (/leadership/.test(category)) return "leadership";
  if (/bonds|relationship/.test(category)) return "bonds-connections";
  if (/purpose/.test(category)) return "purpose-direction";
  if (/resilience/.test(category)) return "resilience";
  if (/fall.*rise/.test(category)) return "fall-rise";
  if (/\bai\b/.test(category)) return "ai";
  if (/discipline|foundations/.test(category)) return "discipline";
  return "daily";
}

export function appContextDetails(context: AppContext) {
  const copy = contextCopy[context];
  const features = domainAppFeatures[context];
  const generic = {
    src:
      context === "ai"
        ? "/images/app-screens/ai-journal-review.webp"
        : "/images/get-the-app/screens/habits-light-or-full.webp",
    alt:
      context === "ai"
        ? "Iron Compass AI journal review, available on Core and Elite"
        : "Iron Compass AI habits with Light and Full check-ins",
    width: 585,
    height: context === "ai" ? 410 : 1266,
  };
  return {
    ...copy,
    features:
      context === "leadership"
        ? [
            {
              text: "Keep your own commitments visible as habits.",
              plan: "Free",
            },
            {
              text: "Record the decision and what happened in a private journal.",
              plan: "Free",
            },
            {
              text: "Today's preparation: tomorrow's result and first move, on a timeline.",
              plan: "Core",
            },
          ]
        : (features?.lines ?? []),
    screenshot:
      features?.shots[copy.shot] ??
      (context === "daily"
        ? domainAppFeatures.discipline.shots[1]
        : context === "leadership"
          ? domainAppFeatures.discipline.shots[2]
          : generic),
    guideHref:
      context === "ai"
        ? "/articles/ai-mastery"
        : context === "leadership"
          ? "/domains/discipline"
          : context === "daily"
            ? "/domains"
            : `/domains/${context}`,
  };
}
