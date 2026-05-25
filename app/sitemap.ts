import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { CANONICAL_DOMAIN_SLUGS, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/start"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/download"), lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/privacy"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/terms"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/domains"), lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];

  const domainEntries: MetadataRoute.Sitemap = CANONICAL_DOMAIN_SLUGS.map((slug) => ({
    url: absoluteUrl(`/domains/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articles: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/articles/grief-for-men"), lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/articles/how-men-grieve-differently"), lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/articles/stoic-grief-strength-through-loss"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/articles/rebuilding-identity-after-loss"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/articles/rebuilding-after-divorce-for-men"), lastModified, changeFrequency: "weekly", priority: 0.85 },
  ];

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const lastMod = post.date ? new Date(post.date) : lastModified;
    return {
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    };
  });

  return [...staticPages, ...domainEntries, ...articles, ...blogPosts];
}
