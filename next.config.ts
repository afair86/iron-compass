import type { NextConfig } from "next";
import { BLOG_CANONICAL_REDIRECTS } from "./lib/blog";
import { DOMAIN_ALIAS_REDIRECTS } from "./lib/site";

const blogRedirects = Object.entries(BLOG_CANONICAL_REDIRECTS).map(([source, destination]) => ({
  source: `/blog/${source}`,
  destination: `/blog/${destination}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  redirects: async () => [...DOMAIN_ALIAS_REDIRECTS, ...blogRedirects],
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
