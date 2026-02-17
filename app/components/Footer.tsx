import Link from "next/link";

const domainLinks = [
  { href: "/domains/health", label: "Strength & Health" },
  { href: "/domains/discipline-mindset", label: "Discipline & Mindset" },
  { href: "/domains/purpose-direction", label: "Purpose & Direction" },
  { href: "/domains/leadership-character", label: "Leadership & Character" },
  { href: "/domains/financial-power", label: "Financial Power" },
  { href: "/domains/ai-mastery", label: "AI Mastery & Life Optimization" },
  { href: "/domains/grief-honour", label: "Grief & Honour" },
  { href: "/domains/identity-legacy", label: "Identity & Legacy" },
];

const navSections = [
  {
    title: "Platform",
    links: [
      { href: "/start", label: "Start" },
      { href: "/blog", label: "Journal" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ic-footer-shell text-sm">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="ic-footer-lede">
          <div className="space-y-3">
            <p className="ic-footer-title">Discipline. Direction. Brotherhood.</p>
            <p className="ic-footer-tagline">
              Trusted by 18,000+ men rebuilding disciplined lives with modern structure and masculine accountability.
            </p>
          </div>
          <div className="ic-footer-note">
            <p>Modern masculine systems. Zero fluff. All accountability.</p>
          </div>
        </div>

        <div className="ic-neon-divider" />

        <div className="ic-footer-grid md:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {domainLinks.map((link) => (
              <Link key={link.href} href={link.href} className="ic-footer-pill">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-6">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="ic-footer-heading">{section.title}</p>
                <div className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <Link key={link.href} href={link.href} className="ic-footer-navlink">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ic-footer-legal">
          <p>© {year} Iron Compass Holdings</p>
          <p>Built in Australia. Operates worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
