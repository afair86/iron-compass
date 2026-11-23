"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Deliberately disabled until the owner reviews GTM tags, privacy copy and test-stream results.
// Never activate both this site-wide route and the separate free-pack gtag route at once.
const ENABLED = process.env.NEXT_PUBLIC_WEBSITE_GTM_ENABLED === "true";
const GTM_ID = "GTM-MR9TX63R";
const CONSENT_KEY = "ic-website-analytics-consent-v1";
const SAFE_ORIGIN = "https://ironcompassai.com";

type Decision = "unset" | "allowed" | "declined";
type LayerWindow = Window & { dataLayer?: unknown[] };

function isExcluded(path: string) {
  return (
    path === "/app" || path.startsWith("/app/") ||
    path === "/free-pack" || path.startsWith("/free-pack/") ||
    path === "/api" || path.startsWith("/api/") ||
    path === "/review" || path.startsWith("/review/")
  );
}

function pageGroup(path: string) {
  if (path === "/") return "home";
  if (path === "/pricing") return "pricing";
  if (path === "/download") return "download";
  if (path === "/about") return "about";
  if (path === "/contact") return "contact";
  if (path === "/start") return "start";
  if (path === "/privacy" || path === "/terms") return "trust";
  if (path === "/domains" || path.startsWith("/domains/")) return "domains";
  if (path === "/blog" || path.startsWith("/blog/") || path.startsWith("/articles/")) return "guides";
  return "other_public";
}

function pushEvent(name: string, group: string) {
  (window as LayerWindow).dataLayer?.push({
    event: name,
    page_group: group,
    // A fixed, category-only synthetic URL. Never send member paths, slugs, queries or referrers.
    page_location: SAFE_ORIGIN + "/measurement/" + group,
    page_referrer: "",
  });
}

function removeAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !(name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat")) continue;
    document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax";
    document.cookie = name + "=; Max-Age=0; Path=/; Domain=" + location.hostname;
    if (location.hostname.endsWith(".ironcompassai.com")) {
      document.cookie = name + "=; Max-Age=0; Path=/; Domain=.ironcompassai.com";
    }
  }
}

export default function WebsiteMeasurement() {
  const pathname = usePathname() || "/";
  const [ready, setReady] = useState(false);
  const [decision, setDecision] = useState<Decision>("unset");
  const [editing, setEditing] = useState(false);
  const booted = useRef(false);
  const lastPage = useRef("");

  useEffect(() => {
    if (!ENABLED) return;
    try {
      const saved = sessionStorage.getItem(CONSENT_KEY);
      if (saved === "allowed" || saved === "declined") setDecision(saved);
    } catch { /* No storage means consent has to be requested again. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ENABLED) return;
    if (isExcluded(pathname)) {
      // A client transition from a measured page must not carry GTM into app, pack or callback pages.
      if (booted.current) window.location.reload();
      return;
    }
    if (decision !== "allowed") return;

    const w = window as LayerWindow;
    w.dataLayer = w.dataLayer || [];
    if (!booted.current) {
      const layer = w.dataLayer;
      layer.push(["consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      }]);
      layer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.id = "ic-website-gtm";
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
      document.head.appendChild(script);
      booted.current = true;
    }

    const group = pageGroup(pathname);
    if (lastPage.current !== pathname) {
      pushEvent("ic_public_page_view", group);
      lastPage.current = pathname;
    }

    function handleLinkClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href) return;
      try {
        const destination = new URL(href, window.location.origin);
        if (destination.protocol !== "https:" && destination.protocol !== "http:") return;
        if (destination.hostname === "apps.apple.com") {
          pushEvent("ic_app_store_open", group);
        } else if (destination.origin === window.location.origin &&
          (destination.pathname === "/app" || destination.pathname.startsWith("/app/"))) {
          pushEvent("ic_web_app_open", group);
        }
      } catch { /* Invalid links are not measurement events. */ }
    }

    document.addEventListener("click", handleLinkClick, true);
    return () => document.removeEventListener("click", handleLinkClick, true);
  }, [decision, pathname]);

  function choose(value: "allowed" | "declined") {
    try { sessionStorage.setItem(CONSENT_KEY, value); } catch { /* Remains tab-only. */ }
    if (value === "declined" && booted.current) {
      (window as LayerWindow).dataLayer?.push(["consent", "update", { analytics_storage: "denied" }]);
      removeAnalyticsCookies();
      window.location.reload();
      return;
    }
    setDecision(value);
    setEditing(false);
  }

  if (!ENABLED || !ready || isExcluded(pathname)) return null;

  if (decision !== "unset" && !editing) {
    return pathname === "/privacy" ? (
      <div className="fixed bottom-4 right-4 z-[90]">
        <button type="button" className="rounded-full border px-4 py-2 text-xs shadow-lg"
          style={{ background: "var(--ic-surface-mid)", borderColor: "var(--ic-card-border)", color: "var(--ic-text-heading)" }}
          onClick={() => setEditing(true)}>
          Analytics choices
        </button>
      </div>
    ) : null;
  }

  return (
    <section role="region" aria-label="Optional website analytics"
      className="fixed bottom-3 left-3 right-3 z-[90] mx-auto max-w-2xl rounded-xl border p-4 shadow-xl sm:bottom-5 sm:p-5"
      style={{ background: "var(--ic-surface-mid)", borderColor: "var(--ic-card-border)" }}>
      <p className="mb-3 max-w-none text-sm leading-relaxed" style={{ color: "var(--ic-text-main)" }}>
        Optional Google analytics helps us understand which public pages lead people to the app.
        We do not send journal entries, form answers or account details. You can decline or change this later.
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("declined")}
          className="min-h-11 rounded-full border px-5 py-2 text-sm"
          style={{ borderColor: "var(--ic-card-border)", color: "var(--ic-text-heading)" }}>
          Decline
        </button>
        <button type="button" onClick={() => choose("allowed")}
          className="min-h-11 rounded-full px-5 py-2 text-sm font-semibold"
          style={{ background: "var(--ic-cta-red)", color: "#fff" }}>
          Allow analytics
        </button>
        <a href="/privacy" className="inline-flex min-h-11 items-center text-sm underline"
          style={{ color: "var(--ic-text-main)" }}>Privacy details</a>
      </div>
    </section>
  );
}
