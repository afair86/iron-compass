import Link from "next/link";
import ProductAppLink from "./ProductAppLink";
import { domainNavLinks } from "@/lib/domains";

const navSections = [
  {
    title: "Platform",
    links: [
      { href: "/start", label: "Start" },
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
  const year = new Date().getFullYear();
  return (
    <footer className="ic-footer-shell text-sm">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="ic-footer-lede">
          <div className="space-y-3">
            <p className="ic-footer-title">Discipline. Direction. Brotherhood.</p>
            <p className="ic-footer-tagline">
              A disciplined life system for men who prefer proof over promises.
            </p>
          </div>
          <div className="ic-footer-note">
            <p>Modern masculine systems. Zero fluff. All accountability.</p>
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
                  {section.title === "Platform" ? (
                    <ProductAppLink className="ic-footer-navlink">Open the App</ProductAppLink>
                  ) : null}
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
