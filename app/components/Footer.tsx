import Image from "next/image";
import Link from "next/link";
import { domainNavLinks } from "@/lib/domains";
import { productAppHref } from "@/lib/site";
import { socialLinks } from "@/lib/socialLinks";

const navSections = [
  {
    title: "Platform",
    links: [
      { href: "/start", label: "Start here" },
      { href: "/app", label: "Open web app" },
      { href: "/download", label: "Explore the app" },
      { href: "/about", label: "About Iron Compass AI" },
      { href: "/pricing", label: "Plans and pricing" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Practical guides",
    links: [
      { href: "/free-pack", label: "Free seven-day pack" },
      { href: "/articles", label: "Grief and rebuilding guides" },
      {
        href: "/articles/financial-power",
        label: "Money and provision guides",
      },
      { href: "/articles/ai-mastery", label: "Using AI well" },
      { href: "/start#common-questions", label: "Common questions" },
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
  return (
    <footer className="ic-footer-shell text-sm">
      <div className="ic-footer-inner space-y-12">
        <div className="ic-footer-cta">
          <p className="ic-footer-cta__title">
            Plan the day. Keep your word. See the record.
          </p>
          <p className="ic-footer-cta__line">
            Start free with habits, a journal and your Standard. Add the
            planning tools and the AI coach when you want them.
          </p>
          <div className="ic-cta-pair">
            <a href={`${productAppHref()}/auth`} className="ic-btn-primary">
              Start free
            </a>
            <Link href="/pricing" className="ic-btn-ghost">
              See plans
            </Link>
          </div>
        </div>
        <div className="ic-footer-lede">
          <div className="space-y-3">
            <Link
              href="/"
              className="ic-logo-lockup"
              aria-label="Iron Compass AI"
            >
              <Image
                src="/iron-compass-logo-icon.png?v=metallic-20261114"
                alt=""
                width={56}
                height={56}
                className="ic-logo-img"
              />
              <span className="ic-logo-wordmark">
                IRON COMPASS <span>AI</span>
              </span>
            </Link>
            <p className="ic-footer-title">
              Discipline. Direction. Brotherhood.
            </p>
            <p className="ic-footer-tagline">
              A disciplined life system for men who prefer proof over promises.
            </p>
          </div>
          <div className="ic-footer-note">
            <p>Practical Stoicism. Daily habits. A weekly review.</p>
          </div>
        </div>

        <div className="ic-neon-divider" />

        <div className="ic-footer-grid md:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {domainNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className="ic-footer-pill">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ic-footer-link-groups">
            {navSections.map((section) => (
              <nav key={section.title} aria-label={section.title}>
                <h2>{section.title}</h2>
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ic-footer-navlink"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <nav className="ic-footer-social" aria-label="Follow Iron Compass AI">
          <p>Follow Iron Compass AI</p>
          {socialLinks.map((link) => (
            <a key={link.href} href={link.href} rel="me">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ic-footer-legal">
          <p>© 2026 Iron Compass AI</p>
          <p>HumanFirst Technologies | ABN 96 226 474 355</p>
        </div>
      </div>
    </footer>
  );
}
