import "@/styles/stoic-dispatch.css";
import { tryGetPostBySlug, getAllPosts, extractFaqFromMarkdown } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Script from "next/script";
import PageShell from "@/app/components/PageShell";
import { PageContainer } from "@/app/components/LayoutPrimitives";
import CategoryBadge from "@/app/components/CategoryBadge";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

function resolveOgImage(image?: string) {
  if (!image) return DEFAULT_OG_IMAGE;
  return image.startsWith("http") ? image : absoluteUrl(image);
}

function extractDescription(markdown: string, fallback = "") {
  const paragraphs = markdown
    .split(/\n{2,}/)
    .map((block) => block.replace(/[#>*`*_\-]/g, "").replace(/\[(.*?)\]\((.*?)\)/g, "$1").trim())
    .filter(Boolean);
  const joined = paragraphs.slice(0, 2).join(" ").trim();
  const base = joined || fallback;
  if (!base) return "";
  return base.length > 160 ? `${base.slice(0, 157).trim()}...` : base;
}

function formatDate(value: string) {
  const parsed = new Date(value);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts
    .filter((post) => post.slug && typeof post.slug === "string" && post.slug.trim() !== "")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const post = tryGetPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const baseDescription =
    post.meta.metaDescription || post.meta.description || extractDescription(post.content, post.meta.title);
  const description = baseDescription.length > 155 ? `${baseDescription.slice(0, 152).trim()}...` : baseDescription;
  const title = post.meta.metaTitle || post.meta.title;
  const ogImage = resolveOgImage(post.meta.image);
  const canonical = absoluteUrl(`/blog/${slug}`);
  const publishedTime = post.meta.date;
  const modifiedTime = post.meta.updated || post.meta.date;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      publishedTime,
      modifiedTime,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const post = tryGetPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const fallbackDescription =
    post.meta.metaDescription || post.meta.description || extractDescription(post.content, post.meta.title);
  const articleTitle = post.meta.metaTitle || post.meta.title;
  const articleDescription = fallbackDescription.length > 155
    ? `${fallbackDescription.slice(0, 152).trim()}...`
    : fallbackDescription;
  const canonical = absoluteUrl(`/blog/${slug}`);
  const ogImage = resolveOgImage(post.meta.image);
  const datePublished = post.meta.date;
  const dateModified = post.meta.updated || post.meta.date;

  const faqEntries = extractFaqFromMarkdown(post.content);
  const faqSchema =
    faqEntries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleTitle,
    description: articleDescription,
    datePublished,
    dateModified,
    mainEntityOfPage: canonical,
    url: canonical,
    articleSection: post.meta.category ?? "Dispatch",
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "Iron Compass",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Iron Compass",
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE,
      },
    },
    image: ogImage,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.meta.title, item: canonical },
    ],
  };

  return (
    <PageShell>
      <PageContainer width="narrow">
        <div className="ic-dispatch">
          {faqSchema ? (
            <Script
              id={`faq-${post.meta.slug ?? slug}`}
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          ) : null}
          <Script
            id={`article-${post.meta.slug ?? slug}`}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <Script
            id={`breadcrumb-${post.meta.slug ?? slug}`}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />

          <header className="ic-dispatch-hero space-y-5">
            <CategoryBadge category={post.meta.category} />
            <h1 className="ic-page-title mx-auto">{post.meta.title}</h1>
            <p className="ic-dispatch-lede">{fallbackDescription}</p>
            <div className="ic-dispatch-meta">
              <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
              <span aria-hidden="true">·</span>
              <span>Field Dispatch</span>
            </div>
            <div className="ic-stoic-rule ic-stoic-rule--wide" aria-hidden="true" />
          </header>

          <div className="ic-dispatch-body">
            <article className="ic-dispatch-prose">
              <MDXRemote
                source={post.content}
                components={{
                  Link,
                  h1: (props) => <h2 {...props} />,
                }}
              />
            </article>

            <footer className="ic-dispatch-footer flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1 text-left">
                <p className="ic-dispatch-label inline-flex">{post.meta.category ?? "Dispatch"}</p>
                <p className="ic-section-copy ic-section-copy--muted text-sm max-w-md">{fallbackDescription}</p>
              </div>
              <div className="ic-cta-row justify-start md:justify-end">
                <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
                  Back to Journal
                </Link>
                <Link href="/start" className="ic-btn-primary text-[0.62rem]">
                  Start the Program
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </PageContainer>
    </PageShell>
  );
}
