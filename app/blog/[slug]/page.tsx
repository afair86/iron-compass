
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Script from "next/script";
import PageShell from "@/app/components/PageShell";
import { PageContainer, SectionShell } from "@/app/components/LayoutPrimitives";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = "https://ironcompassai.com";
const defaultOgImage = `${siteUrl}/iron-compass-logo.png`;

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
    return { title: "Post Not Found", description: "" };
  }
  const post = getPostBySlug(slug);
  const baseDescription =
    post.meta.metaDescription || post.meta.description || extractDescription(post.content, post.meta.title);
  const description = baseDescription.length > 155 ? `${baseDescription.slice(0, 152).trim()}...` : baseDescription;
  const title = post.meta.metaTitle || post.meta.title;
  const ogImage = post.meta.image || defaultOgImage;
  const canonical = `${siteUrl}/blog/${slug}`;
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
    return (
      <PageShell>
        <PageContainer width="narrow">
          <SectionShell variant="hero" className="space-y-4 text-left">
            <h1 className="ic-page-title text-left">Post Not Found</h1>
            <div className="ic-cta-row">
              <Link href="/blog" className="ic-btn-primary text-[0.62rem]">
                Back to Blog
              </Link>
              <Link href="/" className="ic-btn-ghost text-[0.6rem]">
                Home
              </Link>
            </div>
          </SectionShell>
        </PageContainer>
      </PageShell>
    );
  }

  const post = getPostBySlug(slug);
  const fallbackDescription =
    post.meta.metaDescription || post.meta.description || extractDescription(post.content, post.meta.title);
  const articleTitle = post.meta.metaTitle || post.meta.title;
  const articleDescription = fallbackDescription.length > 155
    ? `${fallbackDescription.slice(0, 152).trim()}...`
    : fallbackDescription;
  const canonical = `${siteUrl}/blog/${slug}`;
  const ogImage = post.meta.image || defaultOgImage;
  const datePublished = post.meta.date;
  const dateModified = post.meta.updated || post.meta.date;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${post.meta.title} about?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: fallbackDescription,
        },
      },
      {
        "@type": "Question",
        name: `How do I apply ${post.meta.title} this week?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Read the post, pick one action, schedule it this week, and tie it to a daily anchor so compliance is binary.",
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleTitle,
    description: articleDescription,
    datePublished,
    dateModified,
    mainEntityOfPage: canonical,
    url: canonical,
    author: {
      "@type": "Organization",
      name: "Iron Compass",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Iron Compass",
      logo: {
        "@type": "ImageObject",
        url: defaultOgImage,
      },
    },
    image: ogImage,
  };

  return (
    <PageShell>
      <PageContainer width="narrow">
        <SectionShell variant="hero" className="space-y-4 text-left">
          <p className="ic-eyebrow">{post.meta.category ?? "Dispatch"}</p>
          <h1 className="ic-page-title text-left">{post.meta.title}</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl">
            {fallbackDescription}
          </p>
          <p className="ic-section-copy ic-section-copy--muted text-sm">
            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
          </p>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-8 text-left">
          <Script
            id={`faq-${post.meta.slug ?? slug}`}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <Script
            id={`article-${post.meta.slug ?? slug}`}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <article className="prose prose-lg leading-relaxed space-y-6 prose-invert prose-strong:text-white prose-headings:text-white prose-headings:mt-8 prose-headings:mb-3 prose-a:text-white/90 prose-p:mt-0 prose-li:mt-1 max-w-none">
            <MDXRemote
              source={post.content}
              components={{
                Link,
                h1: (props) => <h2 {...props} />,
              }}
            />
          </article>

          <div className="ic-panel-outline flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1 text-left">
              <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[var(--ic-text-muted)]">{post.meta.category ?? "Dispatch"}</p>
              <h3 className="font-heading tracking-[0.22em] uppercase text-[var(--ic-text-heading)]">{post.meta.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{fallbackDescription}</p>
            </div>
            <div className="ic-cta-row justify-start md:justify-end">
              <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
                Back to Blog
              </Link>
              <Link href="/start" className="ic-btn-primary text-[0.62rem]">
                Start the Program
              </Link>
            </div>
          </div>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
