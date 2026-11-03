/**
 * Live app features shown on each website domain page. Source: checkpoints/2026-11-04-domain-app-features/FEATURE-MAP.md
 * (captured from the live app on 4 Nov 2026). Only add a line here once the feature is live for that plan.
 * Shots are short visual crops (habit cards, charts, tool visuals), never full text-heavy screens.
 */
export type AppPlan = "Free" | "Core" | "Elite";

export type DomainAppShot = { src: string; alt: string; width: number; height: number };

export type DomainAppFeatures = {
  lines: { text: string; plan: AppPlan }[];
  shots: DomainAppShot[];
};

export const domainAppFeatures: Record<string, DomainAppFeatures> = {
  discipline: {
    lines: [
      { text: "Three habits, each with a Light and a Full version.", plan: "Free" },
      { text: "A guide with protocols for bad days, night shifts and travel.", plan: "Free" },
      { text: "Today's preparation: tomorrow's result and first move, on a timeline.", plan: "Core" },
    ],
    shots: [],
  },
  identity: {
    lines: [
      { text: "Three habits, starting with one principle put into practice.", plan: "Free" },
      { text: "A guide with a weekly identity check and a claim-versus-proof matrix.", plan: "Free" },
      { text: "Identity snapshot scores each role you carry and marks the gap.", plan: "Core" },
    ],
    shots: [],
  },
  "health-strength": {
    lines: [
      { text: "Strength, walking and a sleep window, each Light or Full.", plan: "Free" },
      { text: "A guide for training days, sick days, travel and comebacks.", plan: "Free" },
      { text: "Weekly awareness shows which weekday slips.", plan: "Core" },
    ],
    shots: [],
  },
  "bonds-connections": {
    lines: [
      { text: "Three habits, starting with a daily presence check-in.", plan: "Free" },
      { text: "Protocols for arriving home, a hard talk and repair.", plan: "Free" },
      { text: "Weekly review: keep, adjust or pause each habit, then one promise.", plan: "Core" },
    ],
    shots: [],
  },
  "purpose-direction": {
    lines: [
      { text: "Three habits that keep a long-term goal moving.", plan: "Free" },
      { text: "Protocols for one aim each week and holding your course.", plan: "Free" },
      { text: "90-day strategy: one measurable result and a 13-week scoreboard.", plan: "Elite" },
    ],
    shots: [],
  },
  "finance-provision": {
    lines: [
      { text: "A daily money check, a buffer check and a spending audit.", plan: "Free" },
      { text: "A 15-minute weekly money protocol and a bill day.", plan: "Free" },
      { text: "A 90-day strategy can carry a money goal, like a buffer.", plan: "Elite" },
    ],
    shots: [],
  },
  resilience: {
    lines: [
      { text: "Name the load, hold the basics, reset between demands.", plan: "Free" },
      { text: "A short guide built around the pressure floor.", plan: "Free" },
      { text: "Forecast maps the next four weeks and marks the peak.", plan: "Core" },
    ],
    shots: [],
  },
  "fall-rise": {
    lines: [
      { text: "A small rebuilding action each day and a weekly setback review.", plan: "Free" },
      { text: "The return rep: note the miss, then do the smaller version.", plan: "Free" },
      { text: "Comeback protocol: a milestone ladder and a step for the next 24 hours.", plan: "Elite" },
    ],
    shots: [],
  },
  "grief-honour": {
    lines: [
      { text: "Steady the immediate duties and keep a short honour ritual.", plan: "Free" },
      { text: "Protocols for hard mornings, workdays and anniversary days.", plan: "Free" },
      { text: "A role floor card: the minimum you still deliver.", plan: "Free" },
    ],
    shots: [],
  },
  legacy: {
    lines: [
      { text: "Three weekly habits: teach a skill, leave knowledge someone can use.", plan: "Free" },
      { text: "A short guide: leave one item where someone can find it.", plan: "Free" },
      { text: "90-day review: what held, and what to keep, drop and start.", plan: "Elite" },
    ],
    shots: [],
  },
};
