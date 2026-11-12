import type { NextConfig } from "next";
import { BLOG_CANONICAL_REDIRECTS } from "./lib/blog";
import { DOMAIN_ALIAS_REDIRECTS } from "./lib/site";

const blogRedirects = Object.entries(BLOG_CANONICAL_REDIRECTS).map(([source, destination]) => ({
  source: `/blog/${source}`,
  destination: `/blog/${destination}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  // This website is a separate app, even when a checkout sits below another lockfile.
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  // Public-site hardening only. /app and its rewrites remain app-team owned.
  headers: async () => [{
    source: "/:path((?!app(?:/|$)).*)",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ],
  }],
  outputFileTracingExcludes: {
    "*": ["./public/audio/**/*"],
  },
  redirects: async () => [
    // Preserve the legacy sitemap URL still recorded in Search Console.
    { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
    { source: "/downloads/daily-discipline-checklist.txt", destination: "/blog/quiet-discipline-protocol-busy-men#daily-discipline-checklist", permanent: true },
    { source: "/downloads/weekly-review-checklist.txt", destination: "/blog/disciplined-weekly-reset-for-overloaded-men#weekly-review-checklist", permanent: true },
    ...DOMAIN_ALIAS_REDIRECTS, ...blogRedirects,
  ],
  rewrites: async () => {
    const upstream = process.env.PRODUCT_APP_UPSTREAM_URL?.trim().replace(/\/$/, "");
    if (!upstream) return [];
    return [
      { source: "/app", destination: `${upstream}/app` },
      { source: "/app/:path*", destination: `${upstream}/app/:path*` },
    ];
  },
};

export default nextConfig;
