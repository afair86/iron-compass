import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { griefArticles } from "@/lib/articleHubs";
import { CANONICAL_DOMAIN_SLUGS, absoluteUrl } from "@/lib/site";

const STATIC_PAGE_DATES: Record<string, string> = {
  "/": "2026-02-01",
  "/start": "2026-01-15",
  "/download": "2026-01-15",
  "/about": "2025-12-01",
  "/blog": "2026-02-09",
  "/contact": "2025-12-01",
  "/privacy": "2025-11-01",
  "/terms": "2025-11-01",
  "/domains": "2026-01-20",
  "/articles": "2025-11-29",
  "/articles/financial-power": "2026-02-09",
  "/articles/ai-mastery": "2026-02-09",
};

function lastModifiedForPath(path: string): Date {
  const date = STATIC_PAGE_DATES[path];
  return date ? new Date(date) : new Date("2026-01-01");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: lastModifiedForPath("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/start"), lastModified: lastModifiedForPath("/start"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/download"), lastModified: lastModifiedForPath("/download"), changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/about"), lastModified: lastModifiedForPath("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: lastModifiedForPath("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified: lastModifiedForPath("/contact"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/privacy"), lastModified: lastModifiedForPath("/privacy"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/terms"), lastModified: lastModifiedForPath("/terms"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/domains"), lastModified: lastModifiedForPath("/domains"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/articles"), lastModified: lastModifiedForPath("/articles"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/articles/financial-power"), lastModified: lastModifiedForPath("/articles/financial-power"), changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/articles/ai-mastery"), lastModified: lastModifiedForPath("/articles/ai-mastery"), changeFrequency: "weekly", priority: 0.85 },
  ];

  const domainEntries: MetadataRoute.Sitemap = CANONICAL_DOMAIN_SLUGS.map((slug) => ({
    url: absoluteUrl(`/domains/${slug}`),
    lastModified: lastModifiedForPath("/domains"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articles: MetadataRoute.Sitemap = griefArticles.map((article) => ({
    url: absoluteUrl(article.path),
    lastModified: new Date(article.datePublished),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const lastMod = post.updated ? new Date(post.updated) : post.date ? new Date(post.date) : new Date("2026-01-01");
    return {
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    };
  });

  return [...staticPages, ...domainEntries, ...articles, ...blogPosts];
}
