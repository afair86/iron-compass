"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/about", label: "ABOUT" },
  { href: "/domains", label: "DOMAINS" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (pathname ? pathname.startsWith(href) : false);

  return (
    <header className="relative z-20 ic-nav-shell">
      <div className="ic-container ic-nav-inner" data-testid="navbar">
        <Link href="/" className="flex-1 min-w-0" aria-label="Iron Compass AI">
          <span className="ic-logo-lockup">
            <span className="ic-logo-badge" aria-hidden>
              <Image
                src="/iron-compass-logo.png"
                alt="Iron Compass Crest"
                width={54}
                height={54}
                priority
                className="ic-logo-img"
              />
            </span>
            <span className="ic-logo-wordmark">
              IRON COMPASS <span>AI</span>
            </span>
          </span>
        </Link>

        <nav className="ic-nav-links hidden md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="ic-navlink" data-active={isActive(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="ic-nav-toggle md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="ic-nav-toggle-bar" data-open={open} />
          <span className="ic-nav-toggle-bar" data-open={open} />
          <span className="ic-nav-toggle-bar" data-open={open} />
        </button>

      </div>

      <div className="ic-mobile-nav md:hidden" data-open={open}>
        <div className="ic-mobile-nav-card">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="ic-mobile-navlink"
              data-active={isActive(link.href)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="ic-mobile-nav-cta">
            <Link href="/start" className="ic-btn-primary text-xs w-full text-center">
              Start Program
            </Link>
            <Link href="/domains" className="ic-btn-ghost text-xs w-full text-center">
              Explore Domains
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
