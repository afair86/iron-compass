import type { NextConfig } from "next";
import { BLOG_CANONICAL_REDIRECTS } from "./lib/blog";
import { DOMAIN_ALIAS_REDIRECTS } from "./lib/site";

const blogRedirects = Object.entries(BLOG_CANONICAL_REDIRECTS).map(([source, destination]) => ({
  source: `/blog/${source}`,
  destination: `/blog/${destination}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "*": ["./public/audio/**/*"],
  },
  redirects: async () => [
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
