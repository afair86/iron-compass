import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const baseUrl = "https://ironcompassai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/start`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/daily`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
      { url: `${baseUrl}/products`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/domains`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];

  const domainSlugs = [
      "ai",
    "strength",
      "discipline",
    "discipline-mindset",
      "purpose",
    "purpose-direction",
      "leadership",
    "leadership-character",
      "finance",
    "financial-power",
      "awareness-adaptability",
      "bonds",
      "health",
      "fall-rise",
      "wealth",
      "identity",
    "ai-mastery",
      "ai-mastery-life-optimization",
    "grief-honour",
    "identity-legacy",
  ];

  const domainEntries: MetadataRoute.Sitemap = domainSlugs.map((slug) => ({
    url: `${baseUrl}/domains/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articles: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/articles/grief-for-men`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/articles/how-men-grieve-differently`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/articles/stoic-grief-strength-through-loss`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/articles/rebuilding-identity-after-loss`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/articles/rebuilding-after-divorce-for-men`, lastModified, changeFrequency: "weekly", priority: 0.85 },
  ];

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const lastMod = post.date ? new Date(post.date) : lastModified;
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    };
  });

  return [...staticPages, ...domainEntries, ...articles, ...blogPosts];
}
