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
    shots: [
      { src: "/images/app-screens/discipline-header.webp", alt: "Iron Compass AI app Discipline page header: a man with a coffee in his kitchen, \"The standard you keep when nobody is watching.\"", width: 640, height: 511 },
      { src: "/images/app-screens/discipline-habits.webp", alt: "Two Discipline habit cards, Plan tomorrow tonight and Phone away in the evening, each with a streak bar and Light and Full buttons.", width: 640, height: 511 },
      { src: "/images/app-screens/discipline-day-plan.webp", alt: "Today's preparation day card: tomorrow's blocks on a timeline, with the client report marked as the priority.", width: 640, height: 697 },
    ],
  },
  identity: {
    lines: [
      { text: "Three habits, starting with one principle put into practice.", plan: "Free" },
      { text: "A guide with a weekly identity check and a claim-versus-proof matrix.", plan: "Free" },
      { text: "Identity snapshot scores each role you carry and marks the gap.", plan: "Core" },
    ],
    shots: [
      { src: "/images/app-screens/identity-header.webp", alt: "Iron Compass AI app Identity page header: \"The man you claim to be, checked against what you do.\"", width: 640, height: 511 },
      { src: "/images/app-screens/identity-identity-card.webp", alt: "Identity snapshot card: standards met, average gap, and a gap bar for each role.", width: 640, height: 798 },
      { src: "/images/app-screens/identity-guide.webp", alt: "The Identity guide's crest and title in the app.", width: 640, height: 511 },
    ],
  },
  "health-strength": {
    lines: [
      { text: "Strength, walking and a sleep window, each Light or Full.", plan: "Free" },
      { text: "A guide for training days, sick days, travel and comebacks.", plan: "Free" },
      { text: "Weekly awareness shows which weekday slips.", plan: "Core" },
    ],
    shots: [
      { src: "/images/app-screens/health-strength-header.webp", alt: "Iron Compass AI app Health & Strength page header: a man in a gym, \"Sleep, food, and training that keep you able to carry the day.\"", width: 640, height: 511 },
      { src: "/images/app-screens/health-strength-habits.webp", alt: "Health & Strength habit cards with streak bars and Light and Full buttons, including a 3-times-a-week strength habit.", width: 640, height: 798 },
      { src: "/images/app-screens/health-strength-week-chart.webp", alt: "Weekly awareness: check-ins by week as a bar chart, then each habit's check-ins over 28 days.", width: 640, height: 798 },
    ],
  },
  "bonds-connections": {
    lines: [
      { text: "Three habits, starting with a daily presence check-in.", plan: "Free" },
      { text: "Protocols for arriving home, a hard talk and repair.", plan: "Free" },
      { text: "Weekly review: keep, adjust or pause each habit, then one promise.", plan: "Core" },
    ],
    shots: [
      { src: "/images/app-screens/bonds-connections-header.webp", alt: "Iron Compass AI app Bonds & Connections page header: a father and son laughing at the table.", width: 640, height: 511 },
      { src: "/images/app-screens/bonds-connections-habits.webp", alt: "The Time with your partner habit card with its streak bar and Light and Full buttons.", width: 640, height: 511 },
      { src: "/images/app-screens/bonds-connections-week-targets.webp", alt: "Weekly review: each habit's check-ins this week against its target.", width: 640, height: 798 },
    ],
  },
  "purpose-direction": {
    lines: [
      { text: "Three habits that keep a long-term goal moving.", plan: "Free" },
      { text: "Protocols for one aim each week and holding your course.", plan: "Free" },
      { text: "90-day strategy: one measurable result and a 13-week scoreboard.", plan: "Elite" },
    ],
    shots: [
      { src: "/images/app-screens/purpose-direction-header.webp", alt: "Iron Compass AI app Purpose & Direction page header: a man on a coastal path in low sun, \"A chosen direction and a cadence you can actually keep.\"", width: 640, height: 511 },
      { src: "/images/app-screens/purpose-direction-90-day-plan.webp", alt: "90-day strategy: a certificate goal, progress bar, pace needed each week and a projection line.", width: 640, height: 798 },
      { src: "/images/app-screens/purpose-direction-guide.webp", alt: "The Purpose & Direction guide's crest and title in the app.", width: 640, height: 511 },
    ],
  },
  "finance-provision": {
    lines: [
      { text: "A daily money check, a buffer check and a spending audit.", plan: "Free" },
      { text: "A 15-minute weekly money protocol and a bill day.", plan: "Free" },
      { text: "A 90-day strategy can carry a money goal, like a buffer.", plan: "Elite" },
    ],
    shots: [
      { src: "/images/app-screens/finance-provision-header.webp", alt: "Iron Compass AI app Finance & Provision page header: \"Money under control so provision is not chaos.\"", width: 640, height: 511 },
      { src: "/images/app-screens/finance-provision-buffer-plan.webp", alt: "90-day strategy set up to build a three-month buffer, with a progress bar and projection line.", width: 640, height: 798 },
      { src: "/images/app-screens/finance-provision-guide.webp", alt: "The Finance & Provision guide's crest and title in the app.", width: 640, height: 511 },
    ],
  },
  resilience: {
    lines: [
      { text: "Name the load, hold the basics, reset between demands.", plan: "Free" },
      { text: "A short guide built around the pressure floor.", plan: "Free" },
      { text: "Forecast maps the next four weeks and marks the peak.", plan: "Core" },
    ],
    shots: [
      { src: "/images/app-screens/resilience-header.webp", alt: "Iron Compass AI app Resilience page header: a man on the stairs with a bag, \"Stay steady when the load rises.\"", width: 640, height: 511 },
      { src: "/images/app-screens/resilience-pressure-map.webp", alt: "Forecast pressure map: the next four weeks' events as load bars, with the peak highlighted.", width: 640, height: 798 },
    ],
  },
  "fall-rise": {
    lines: [
      { text: "A small rebuilding action each day and a weekly setback review.", plan: "Free" },
      { text: "A short return action for the difficult days within a longer recovery.", plan: "Free" },
      { text: "Comeback protocol: map the impact, set a milestone ladder and choose the next action.", plan: "Elite" },
    ],
    shots: [
      { src: "/images/app-screens/fall-rise-header.webp", alt: "Iron Compass AI app Fall & Rise page header: a man walking along a quiet street in low sun, \"Miss, return, and carry the standard again.\"", width: 640, height: 511 },
      { src: "/images/app-screens/fall-rise-impact.webp", alt: "Comeback protocol: a setback's impact rated as bars across work, money, health, family and more.", width: 640, height: 798 },
      { src: "/images/app-screens/fall-rise-milestone-ladder.webp", alt: "Comeback protocol milestone ladder: this week's rung and the two-week rung.", width: 640, height: 511 },
    ],
  },
  "grief-honour": {
    lines: [
      { text: "Steady the immediate duties and keep a short honour ritual.", plan: "Free" },
      { text: "Protocols for hard mornings, workdays and anniversary days.", plan: "Free" },
      { text: "A role floor card: the minimum you still deliver.", plan: "Free" },
    ],
    shots: [
      { src: "/images/app-screens/grief-honour-header.webp", alt: "Iron Compass AI app Grief & Honour page header: \"Carry loss without dropping the role.\"", width: 640, height: 511 },
      { src: "/images/app-screens/grief-honour-role-floor.webp", alt: "Role floor card checklist: three-item floors for home and work, and one body basic.", width: 640, height: 511 },
      { src: "/images/app-screens/grief-honour-guide.webp", alt: "The Grief & Honour guide's crest and title in the app.", width: 640, height: 511 },
    ],
  },
  legacy: {
    lines: [
      { text: "Three weekly habits: teach a skill, leave knowledge someone can use.", plan: "Free" },
      { text: "A short guide: leave one item where someone can find it.", plan: "Free" },
      { text: "90-day review: what held, and what to keep, drop and start.", plan: "Elite" },
    ],
    shots: [
      { src: "/images/app-screens/legacy-header.webp", alt: "Iron Compass AI app Legacy page header: a man at a workbench, \"What you leave in place for the people after you.\"", width: 640, height: 511 },
      { src: "/images/app-screens/legacy-what-held.webp", alt: "90-day review: which habits held over 30 days, shown as bars.", width: 640, height: 798 },
      { src: "/images/app-screens/legacy-guide.webp", alt: "The Legacy guide's crest and title in the app.", width: 640, height: 511 },
    ],
  },
};
