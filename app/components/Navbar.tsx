"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/download", label: "THE APP" },
  { href: "/about", label: "ABOUT" },
  { href: "/domains", label: "DOMAINS" },
  { href: "/pricing", label: "PRICING" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath !== null && openPath === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => (pathname ? pathname.startsWith(href) : false);

  return (
    <header className="relative z-20 ic-nav-shell">
      <div className="ic-container ic-nav-inner" data-testid="navbar">
        <Link href="/" className="flex-1 min-w-0" aria-label="Iron Compass AI">
          <span className="ic-logo-lockup">
            <span className="ic-logo-mark" aria-hidden>
              <Image
                src="/iron-compass-logo-icon.png?v=metallic-20261114"
                alt=""
                width={80}
                height={80}
                priority
                className="ic-logo-img"
              />
            </span>
            <span className="ic-logo-wordmark">
              IRON COMPASS <span>AI</span>
            </span>
          </span>
        </Link>

        <nav className="ic-nav-links hidden md:flex items-center gap-4" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="ic-navlink" data-active={isActive(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a href="/app" className={`ic-open-app${isHomepage ? " ic-open-app--home" : ""}`}>
          Open app
        </a>

        <button
          ref={toggle}
          type="button"
          className="ic-nav-toggle md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpenPath((value) => value === pathname ? null : pathname)}
        >
          <span className="ic-nav-toggle-bar" data-open={open} />
          <span className="ic-nav-toggle-bar" data-open={open} />
          <span className="ic-nav-toggle-bar" data-open={open} />
        </button>

      </div>

      <nav id="mobile-navigation" aria-label="Mobile navigation" inert={!open} className="ic-mobile-nav md:hidden" data-open={open}>
        <div className="ic-mobile-nav-card">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="ic-mobile-navlink"
              data-active={isActive(link.href)}
              onClick={() => setOpenPath(null)}
            >
              {link.label}
            </Link>
          ))}

        </div>
      </nav>
    </header>
  );
}
