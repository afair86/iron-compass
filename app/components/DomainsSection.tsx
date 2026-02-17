import DomainCard, { Domain } from "./DomainCard";

export const domainCards: Domain[] = [
  {
    title: "STRENGTH & HEALTH",
    desc: "Build capacity, energy, and long-term resilience.",
    href: "/domains/health",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M20 4l12 6v11c0 8.6-6 14.4-12 15.6-6-1.2-12-7-12-15.6V10l12-6z" fill="#111217" stroke="#F3EBDD" strokeWidth="2" strokeLinejoin="round" />
        <path d="M17 14l6 4-3 6 3 2-6 6 2-6-3-2 4-10z" stroke="#B01015" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 8v4" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "DISCIPLINE & MINDSET",
    desc: "The operating system that keeps promises alive.",
    href: "/domains/discipline-mindset",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="12" y="6" width="16" height="28" rx="8" stroke="#F3EBDD" strokeWidth="2" />
        <path d="M16 12h8l-4 4-4-4z" fill="#B01015" stroke="#F3EBDD" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 28h8l-4-4-4 4z" fill="#38BDF8" stroke="#F3EBDD" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 12l8 16M24 12l-8 16" stroke="#F3EBDD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
        <path d="M20 16v8" stroke="#F3EBDD" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "PURPOSE & DIRECTION",
    desc: "Chosen mission, decisive targets, relentless cadence.",
    href: "/domains/purpose-direction",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="14" stroke="#F3EBDD" strokeWidth="2" />
        <path d="M20 7l5 13-5 5-5-5 5-13z" fill="#B01015" stroke="#F3EBDD" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="3" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    title: "LEADERSHIP & CHARACTER",
    desc: "Calm authority and standards people can trust.",
    href: "/domains/leadership-character",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M20 6l4 6-2 6h-4l-2-6 4-6z" fill="#B01015" stroke="#F3EBDD" strokeWidth="1.5" />
        <path d="M18 18h4v10l-2 4-2-4V18z" fill="#111217" stroke="#F3EBDD" strokeWidth="1.5" />
        <path d="M16 28h8" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "FINANCIAL POWER",
    desc: "Structure, skill, and buffers that remove money chaos.",
    href: "/domains/financial-power",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="10" y="10" width="4" height="20" rx="1" fill="#111217" stroke="#F3EBDD" strokeWidth="2" />
        <rect x="18" y="8" width="4" height="22" rx="1" fill="#111217" stroke="#F3EBDD" strokeWidth="2" />
        <rect x="26" y="12" width="4" height="18" rx="1" fill="#111217" stroke="#F3EBDD" strokeWidth="2" />
        <path d="M8 30h24" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 10h24" stroke="#B01015" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI MASTERY & LIFE OPTIMIZATION",
    desc: "Leverage automation without losing your edge.",
    href: "/domains/ai-mastery",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <ellipse cx="20" cy="20" rx="12" ry="8" stroke="#F3EBDD" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" fill="#38BDF8" />
        <path d="M8 20h4M28 20h4" stroke="#B01015" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 14l4 2M28 26l-4-2" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 26l4-2M28 14l-4 2" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "GRIEF & HONOUR",
    desc: "Carry loss with ritual, responsibility, and forward motion.",
    href: "/domains/grief-honour",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M20 8l3 5-3 4-3-4 3-5z" fill="#B01015" stroke="#F3EBDD" strokeWidth="1.5" />
        <path d="M18 17h4v11c0 1.1-.9 2-2 2s-2-.9-2-2V17z" fill="#111217" stroke="#F3EBDD" strokeWidth="1.5" />
        <path d="M12 24c-1.5 1.5-2 3-2 4.5 0 2.5 1.5 4.5 4.5 4.5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 24c1.5 1.5 2 3 2 4.5 0 2.5-1.5 4.5-4.5 4.5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "IDENTITY & LEGACY",
    desc: "Decide who you are and leave proof behind.",
    href: "/domains/identity-legacy",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="17" y="8" width="6" height="24" rx="2" fill="#111217" stroke="#F3EBDD" strokeWidth="2" />
        <circle cx="20" cy="20" r="10" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" stroke="#B01015" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function DomainsSection() {
  return (
    <section className="px-4 pt-6 pb-10" id="domains">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <h2 className="ic-home-heading text-[clamp(1.8rem,3.6vw,3rem)]">The Eight Domains</h2>
        <div className="ic-neon-divider" />
        <p className="font-heading text-[0.72rem] md:text-xs uppercase tracking-[0.45em] text-[var(--ic-text-heading)]/75">
          FORGE EVERY DIMENSION
        </p>
        <p className="text-base max-w-3xl mx-auto">
          A complete, disciplined life requires mastery across Strength, Discipline &amp; Mindset, Purpose &amp; Direction, Leadership &amp; Character, Financial Power, AI Mastery &amp; Life Optimization, Grief &amp; Honour, and Identity &amp; Legacy.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
        {domainCards.map((domain) => (
          <DomainCard key={domain.title} {...domain} />
        ))}
      </div>
    </section>
  );
}
