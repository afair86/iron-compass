import Image from "next/image";
import Link from "next/link";
import { domainNavLinks } from "@/lib/domains";
import { productAppHref } from "@/lib/site";

const navSections = [
  {
    title: "Platform",
    links: [
      { href: "/app", label: "Open web app" },
      { href: "/download", label: "Get the app" },
      { href: "/about", label: "About Iron Compass" },
      { href: "/pricing", label: "Plans and pricing" },
      { href: "/blog", label: "Blog" },
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
  return (
    <footer className="ic-footer-shell text-sm">
      <div className="ic-footer-inner space-y-12">
        <div className="ic-footer-cta">
          <p className="ic-footer-cta__title">Plan the day. Keep your word. See the record.</p>
          <p className="ic-footer-cta__line">
            Start free with habits, a journal and your Standard. Add the planning tools and the AI coach when you want them.
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
            <Link href="/" className="ic-logo-lockup" aria-label="Iron Compass AI">
              <Image src="/iron-compass-logo-icon.png" alt="" width={56} height={56} className="ic-logo-img" />
              <span className="ic-logo-wordmark">
                IRON COMPASS <span>AI</span>
              </span>
            </Link>
            <p className="ic-footer-title">Discipline. Direction. Brotherhood.</p>
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

          <div className="flex flex-col gap-2">
            {navSections.flatMap((section) =>
              section.links.map((link) => (
                <a key={link.href} href={link.href} className="ic-footer-navlink">
                  {link.label}
                </a>
              )),
            )}
          </div>
        </div>

        <div className="ic-footer-legal">
          <p>© 2026 Iron Compass AI</p>
          <p>HumanFirst Technologies | ABN 96 226 474 355</p>
        </div>
      </div>
    </footer>
  );
}
