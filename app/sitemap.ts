import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";
import { griefArticles } from "@/lib/articleHubs";
import { domainNarratives } from "@/app/domains/narratives";
import { CANONICAL_DOMAIN_SLUGS, absoluteUrl } from "@/lib/site";
import { articlePhoto, domainPhotos, pagePhotos, philosophyPhoto } from "@/lib/sitePhotos";

const HOME_HERO = "/images/home/horizon-man.png";

function absoluteImages(sources: Array<string | undefined>): string[] {
  return [...new Set(sources.filter((src): src is string => Boolean(src)))].map((src) => absoluteUrl(src));
}

function imagesInMarkdown(markdown: string): string[] {
  return [...markdown.matchAll(/\]\((\/images\/[^)\s]+)\)/g)].map((match) => match[1]);
}

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

function lastModifiedForPath(pagePath: string): Date {
  const date = STATIC_PAGE_DATES[pagePath];
  return date ? new Date(date) : new Date("2026-01-01");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: lastModifiedForPath("/"),
      changeFrequency: "daily",
      priority: 1,
      images: absoluteImages([HOME_HERO, ...Object.values(domainPhotos), philosophyPhoto]),
    },
    { url: absoluteUrl("/start"), lastModified: lastModifiedForPath("/start"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/download"), lastModified: lastModifiedForPath("/download"), changeFrequency: "weekly", priority: 0.85 },
    {
      url: absoluteUrl("/about"),
      lastModified: lastModifiedForPath("/about"),
      changeFrequency: "monthly",
      priority: 0.6,
      images: absoluteImages([pagePhotos.about]),
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: lastModifiedForPath("/blog"),
      changeFrequency: "weekly",
      priority: 0.8,
      images: absoluteImages([pagePhotos.blog]),
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: lastModifiedForPath("/contact"),
      changeFrequency: "monthly",
      priority: 0.6,
      images: absoluteImages([pagePhotos.contact]),
    },
    { url: absoluteUrl("/privacy"), lastModified: lastModifiedForPath("/privacy"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/terms"), lastModified: lastModifiedForPath("/terms"), changeFrequency: "monthly", priority: 0.6 },
    {
      url: absoluteUrl("/domains"),
      lastModified: lastModifiedForPath("/domains"),
      changeFrequency: "weekly",
      priority: 0.8,
      images: absoluteImages([pagePhotos.domains, ...Object.values(domainPhotos)]),
    },
    { url: absoluteUrl("/articles"), lastModified: lastModifiedForPath("/articles"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/articles/financial-power"), lastModified: lastModifiedForPath("/articles/financial-power"), changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/articles/ai-mastery"), lastModified: lastModifiedForPath("/articles/ai-mastery"), changeFrequency: "weekly", priority: 0.85 },
  ];

  const domainEntries: MetadataRoute.Sitemap = CANONICAL_DOMAIN_SLUGS.map((slug) => ({
    url: absoluteUrl(`/domains/${slug}`),
    lastModified: lastModifiedForPath("/domains"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: absoluteImages([
      domainPhotos[slug],
      ...domainNarratives[slug].sections.map((section) => section.image?.src),
    ]),
  }));

  const articles: MetadataRoute.Sitemap = griefArticles.map((article) => ({
    url: absoluteUrl(article.path),
    lastModified: new Date(article.datePublished),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const lastMod = post.updated ? new Date(post.updated) : post.date ? new Date(post.date) : new Date("2026-01-01");
    const filePath = path.join(process.cwd(), "content", "blog", `${post.slug}.mdx`);
    const markdown = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
    const images = absoluteImages([articlePhoto(post.image), ...imagesInMarkdown(markdown)]);
    return {
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.75,
      ...(images.length > 0 ? { images } : {}),
    };
  });

  return [...staticPages, ...domainEntries, ...articles, ...blogPosts];
}
