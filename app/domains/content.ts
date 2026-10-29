import type { Metadata } from "next";
import { absoluteUrl, DOMAIN_SOCIAL_IMAGE, type CanonicalDomainSlug } from "@/lib/site";

/** Life domains, plus the retired AI resource page. */
export type DomainSlug = CanonicalDomainSlug | "ai-mastery";

export type DomainPrinciple = { title: string; description: string };
export type DomainLink = { label: string; href: string; description: string };

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
  seo: { title: string; description: string };
};

function links(items: DomainLink[], companion: DomainLink): Pick<DomainContent, "internalLinks" | "companionLink"> {
  return { internalLinks: items, companionLink: companion };
}

export const domainContentMap: Record<DomainSlug, DomainContent> = {
  discipline: {
    slug: "discipline",
    title: "Discipline",
    heroEyebrow: "",
    heroTagline: "The standard you keep when nobody is scoring you.",
    description: "Discipline is doing the thing you already decided, on the day you said you would.",
    socialProof: "",
    callout: "A routine is useful when it still works on a bad day.",
    builds: ["A morning and a shutdown you can repeat", "Follow-through on small promises", "Less bargaining with the phone"],
    failurePatterns: ["Waiting to feel ready", "A perfect plan that dies on Tuesday", "Treating a miss as a cancelled week"],
    principles: [
      { title: "Follow-Through", description: "The promise is small enough to keep." },
      { title: "Decision Ownership", description: "You chose the standard. You do not renegotiate it every morning." },
    ],
    actions: ["Name the floor for a bad day.", "Put the first action before the inbox.", "Record a miss and do the next rep."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "The rest of the map." },
        { label: "Health & Strength", href: "/domains/health-strength", description: "The body has to be able to keep the standard." },
      ],
      { label: "Health & Strength", href: "/domains/health-strength", description: "Capacity for the standard you set." },
    ),
    seo: {
      title: "Discipline for Men | Iron Compass AI",
      description: "Routines, follow-through, and standards you can keep on an ordinary week. Not a mood and not a speech.",
    },
  },
  identity: {
    slug: "identity",
    title: "Identity",
    heroEyebrow: "",
    heroTagline: "What you stand for, checked against this week.",
    description: "Identity is the man your behaviour describes, not the one in the story.",
    socialProof: "",
    callout: "Two standards you can see are worth more than five words on a wall.",
    builds: ["A short list of standards", "Roles you actually carry", "Private behaviour that matches the public one"],
    failurePatterns: ["A creed you do not practice", "Performing a version of yourself for an audience", "Changing the story after every miss"],
    principles: [
      { title: "Decision Ownership", description: "You choose what you stand for. Then you look at the week." },
      { title: "Follow-Through", description: "A standard that never shows up in the calendar is a slogan." },
    ],
    actions: ["Write two standards someone could witness.", "Check last week against them.", "Keep the next chance, not the speech."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "Identity shows up in every other domain." },
        { label: "Legacy", href: "/domains/legacy", description: "What remains is a different question from who you are today." },
      ],
      { label: "Legacy", href: "/domains/legacy", description: "What you leave, once the standards are real." },
    ),
    seo: {
      title: "Identity for Men | Iron Compass AI",
      description: "Standards, roles, and integrity checked against behaviour. Who you are now, not a brand.",
    },
  },
  "health-strength": {
    slug: "health-strength",
    title: "Health & Strength",
    heroEyebrow: "",
    heroTagline: "The body that has to carry the day.",
    description: "Health and strength are capacity. Sleep, food, movement, and the ability to show up again tomorrow.",
    socialProof: "",
    callout: "A body you can count on is part of being someone others can count on.",
    builds: ["Sleep treated as part of the job", "Strength you can repeat", "Movement on weeks that are not calm"],
    failurePatterns: ["A burst of training and then nothing", "Sleep left until everything else is done", "Ignoring a pain until it decides the month"],
    principles: [
      { title: "Future Orientation", description: "Train for the year, not for a photo." },
      { title: "Follow-Through", description: "The short session you keep beats the plan you abandon." },
    ],
    actions: ["Set a sleep window.", "Keep a short strength floor.", "Walk when the session dies."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "Capacity sits under the rest." },
        { label: "Discipline", href: "/domains/discipline", description: "The week only happens if the standard is small enough." },
      ],
      { label: "Discipline", href: "/domains/discipline", description: "The routine that protects the body." },
    ),
    seo: {
      title: "Health & Strength for Men | Iron Compass AI",
      description: "Sleep, training, food, and recovery so you can carry work and people. Not a body project.",
    },
  },
  "bonds-connections": {
    slug: "bonds-connections",
    title: "Bonds & Connections",
    heroEyebrow: "",
    heroTagline: "The people who have to be able to count on you.",
    description: "Father, partner, family, friend, mentor, leader. The domain is reliability to people, not a performance of authority.",
    socialProof: "",
    callout: "Leadership is one role here. The work is presence and a kept promise.",
    builds: ["Time you actually give", "A hard conversation that stays decent", "A boundary you can explain"],
    failurePatterns: ["Being impressive and absent", "A promise that slips because the week got loud", "Managing people instead of showing up"],
    principles: [
      { title: "Boundary Holding", description: "Say what you will and will not do, then keep it." },
      { title: "Follow-Through", description: "The people close to you live with the pattern, not the intention." },
    ],
    actions: ["Name one person and one block of time.", "Keep the small promise.", "Have the conversation you have been postponing."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "People feel every other domain." },
        { label: "Identity", href: "/domains/identity", description: "The standard has to show up at home." },
      ],
      { label: "Identity", href: "/domains/identity", description: "Who you are is tested with people." },
    ),
    seo: {
      title: "Bonds & Connections for Men | Iron Compass AI",
      description: "Presence, promises, and steadiness for the people who depend on you. Leadership is a role, not the whole domain.",
    },
  },
  "purpose-direction": {
    slug: "purpose-direction",
    title: "Purpose & Direction",
    heroEyebrow: "",
    heroTagline: "Work with a direction you can keep.",
    description: "Purpose is the work, the skill, and the contribution you are actually moving. Not a mood and not a brand.",
    socialProof: "",
    callout: "A direction is useful when this month's work can be named.",
    builds: ["A target for the next season", "Skills you are actually practicing", "A week that matches the claim"],
    failurePatterns: ["Busy with no direction", "A mission statement and an unchanged calendar", "Chasing the next start"],
    principles: [
      { title: "Future Orientation", description: "Choose what this season is for." },
      { title: "Decision Ownership", description: "You pick the work. Then you stop pretending every option is still open." },
    ],
    actions: ["Name the work that matters this month.", "Cut one distraction that pretends to be progress.", "Review the direction once a week."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "Direction needs a body and a household that can carry it." },
        { label: "Finance & Provision", href: "/domains/finance-provision", description: "The work has to pay for the life." },
      ],
      { label: "Finance & Provision", href: "/domains/finance-provision", description: "Direction includes what the money is for." },
    ),
    seo: {
      title: "Purpose & Direction for Men | Iron Compass AI",
      description: "Work, skill, and contribution with a direction you can keep. Not a passion speech.",
    },
  },
  "finance-provision": {
    slug: "finance-provision",
    title: "Finance & Provision",
    heroEyebrow: "",
    heroTagline: "Money as a responsibility, not a costume.",
    description: "Bills, cash flow, debt, a buffer, and the plan that keeps a household from being run on surprise.",
    socialProof: "",
    callout: "Provision is looking at the numbers and then doing the next plain thing.",
    builds: ["A weekly look at the money", "Bills that are not a surprise", "A buffer that is boring on purpose"],
    failurePatterns: ["Avoiding the balance", "Spending to feel like the week worked", "A plan that assumes a fantasy income"],
    principles: [
      { title: "Future Orientation", description: "The buffer is for the month you do not want." },
      { title: "Decision Ownership", description: "You decide what the money is for before the mood does." },
    ],
    actions: ["Open the numbers once this week.", "Name the next bill.", "Move one amount toward the buffer."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "Money stress leaks into everything else." },
        { label: "Purpose & Direction", href: "/domains/purpose-direction", description: "The work has to match the life you are paying for." },
      ],
      { label: "Purpose & Direction", href: "/domains/purpose-direction", description: "What the provision is in service of." },
    ),
    seo: {
      title: "Finance & Provision for Men | Iron Compass AI",
      description: "Cash flow, debt, buffers, and the plain work of providing. Not a wealth fantasy.",
    },
  },
  resilience: {
    slug: "resilience",
    title: "Resilience",
    heroEyebrow: "",
    heroTagline: "Stay functional when the load is real.",
    description: "Resilience is keeping the floor when the week is heavy. It is not grinding until you break.",
    socialProof: "",
    callout: "Name the load. Keep sleep, food, and the promise that still has to be done.",
    builds: ["A clear view of what is heavy", "A floor you can still keep", "An earlier start on a known pressure"],
    failurePatterns: ["Pretending the load is nothing", "Dropping every standard because one day was hard", "Calling exhaustion discipline"],
    principles: [
      { title: "Calm Under Pressure", description: "You can be loaded and still be decent." },
      { title: "Future Orientation", description: "Prepare for the week you can already see." },
    ],
    actions: ["Write the load in one line.", "Protect sleep.", "Do the one promise that cannot slip."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "Load shows up in the body, the money, and the people." },
        { label: "Fall & Rise", href: "/domains/fall-rise", description: "When the floor was missed, the return is the next domain." },
      ],
      { label: "Fall & Rise", href: "/domains/fall-rise", description: "What you do after the miss." },
    ),
    seo: {
      title: "Resilience for Men | Iron Compass AI",
      description: "Stay functional under strain without glorifying burnout. A floor, a clear load, and the next promise.",
    },
  },
  "fall-rise": {
    slug: "fall-rise",
    title: "Fall & Rise",
    heroEyebrow: "",
    heroTagline: "A miss, a cause, and the return.",
    description: "Fall and rise is what you do after you drop a standard. You look at the cause. You correct it. You carry it again.",
    socialProof: "",
    callout: "A restart speech is not a return.",
    builds: ["An honest note of what happened", "One correction", "The small version of the standard, done"],
    failurePatterns: ["Hiding the miss", "A new personality every Monday", "Shame that keeps you out of the work"],
    principles: [
      { title: "Decision Ownership", description: "You name what you did, not a story about the week." },
      { title: "Follow-Through", description: "The rise is the next rep, smaller if it has to be." },
    ],
    actions: ["Write what was missed.", "Name the cause you can change.", "Do the small version today."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "A miss in one domain does not erase the others." },
        { label: "Discipline", href: "/domains/discipline", description: "The standard you are returning to." },
      ],
      { label: "Discipline", href: "/domains/discipline", description: "The line you carry again." },
    ),
    seo: {
      title: "Fall & Rise for Men | Iron Compass AI",
      description: "Failure, correction, and the return to a standard. No shame speech and no clean-slate fantasy.",
    },
  },
  "grief-honour": {
    slug: "grief-honour",
    title: "Grief & Honour",
    heroEyebrow: "",
    heroTagline: "Stabilise. Honour the loss. Keep a purpose.",
    description: "Carry the loss with a ritual and with the basics still done. Do not turn it into a performance of feeling.",
    socialProof: "",
    callout: "The first job is to stay functional. Honour comes with that, not instead of it.",
    builds: ["Sleep, food, and one person who knows", "A small ritual you can repeat", "A role you still carry"],
    failurePatterns: ["Collapsing every standard", "Going numb and calling it strength", "Making a large decision while you are flooded"],
    principles: [
      { title: "Calm Under Pressure", description: "Grief is a load. The floor still matters." },
      { title: "Future Orientation", description: "Honour includes what you will still do for the living." },
    ],
    actions: ["Keep three basics.", "Mark the loss in a way you can repeat.", "Delay the big decision."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "Loss touches the whole map." },
        { label: "Bonds & Connections", href: "/domains/bonds-connections", description: "Someone still needs you steady." },
      ],
      { label: "Bonds & Connections", href: "/domains/bonds-connections", description: "The people still in the room." },
    ),
    seo: {
      title: "Grief & Honour for Men | Iron Compass AI",
      description: "Stabilise, honour the loss, and keep a purpose. Remembrance and duty, without therapy language.",
    },
  },
  legacy: {
    slug: "legacy",
    title: "Legacy",
    heroEyebrow: "",
    heroTagline: "What remains if you are not in the room.",
    description: "Legacy is the example, the provision, and the work someone else can still use. It is not a speech about the man you hope to be.",
    socialProof: "",
    callout: "Put one thing where it can be found.",
    builds: ["A sentence or a file someone could use", "Provision that is not a secret", "An example that matches the standard"],
    failurePatterns: ["A legacy that lives only in your head", "Providing nothing because the present week is loud", "Mentoring as a performance"],
    principles: [
      { title: "Future Orientation", description: "Think about the people who are not in today's meeting." },
      { title: "Follow-Through", description: "What remains is what you actually put in place." },
    ],
    actions: ["Write where the important papers live.", "Name who is covered.", "Teach one thing you know, plainly."],
    ...links(
      [
        { label: "All domains", href: "/domains", description: "Legacy is built from the other nine." },
        { label: "Identity", href: "/domains/identity", description: "Who you are now is not the same question as what you leave." },
      ],
      { label: "Identity", href: "/domains/identity", description: "The standards, before the inheritance." },
    ),
    seo: {
      title: "Legacy for Men | Iron Compass AI",
      description: "Example, stewardship, and what remains for the people after you. Not a combined identity slogan.",
    },
  },
  "ai-mastery": {
    slug: "ai-mastery",
    title: "AI as a tool",
    heroEyebrow: "Resource",
    heroTagline: "A tool for drafting, sorting, and preparing. Not a life domain.",
    description: "Use AI for the dull work. Keep the decision. This is not one of the ten domains.",
    socialProof: "",
    callout: "The tool does not carry your name. You do.",
    builds: ["Faster drafts you still rewrite", "A clearer list", "Time given back to a person or a task"],
    failurePatterns: ["Handing over a decision", "A new tool instead of a kept standard", "Trusting a confident wrong answer"],
    principles: [
      { title: "Decision Ownership", description: "You sign. The tool prepares." },
      { title: "Follow-Through", description: "A plan the tool wrote still has to be done by you." },
    ],
    actions: ["Give it one dull job.", "Check the facts.", "Close it and do the thing."],
    ...links(
      [
        { label: "The ten domains", href: "/domains", description: "Where responsibility actually lives." },
        { label: "Discipline", href: "/domains/discipline", description: "The standard the tool cannot keep for you." },
      ],
      { label: "Discipline", href: "/domains/discipline", description: "The life domain this tool can support." },
    ),
    seo: {
      title: "AI as a Tool, Not a Domain | Iron Compass AI",
      description: "How to use AI for planning and preparation without handing over judgement. Not a life domain.",
    },
  },
};

export function buildDomainMetadata(content: DomainContent): Metadata {
  const path = `/domains/${content.slug}`;
  const canonical = absoluteUrl(path);
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: { canonical },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: canonical,
      siteName: "Iron Compass",
      images: [{ url: DOMAIN_SOCIAL_IMAGE, width: 1200, height: 630, alt: `${content.title} – Iron Compass` }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: [DOMAIN_SOCIAL_IMAGE],
    },
  };
}
