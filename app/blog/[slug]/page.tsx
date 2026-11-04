import "@/styles/stoic-dispatch.css";
import { tryGetPostBySlug, getAllPosts, extractFaqFromMarkdown } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import { PageContainer } from "@/app/components/LayoutPrimitives";
import ArticleListenButton from "@/app/components/ArticleListenButton";
import BlogPracticalTool from "@/app/components/blog-tools/BlogPracticalTool";
import PhotoFrame from "@/app/components/brand/PhotoFrame";
import { articlePhoto } from "@/lib/sitePhotos";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl, DEFAULT_OG_IMAGE, productAppHref, SITE_NAME, SITE_URL, ORGANIZATION_LOGO, serializeJsonLd } from "@/lib/site";
import { markdownToSpeechText } from "@/lib/speechText";
import { isPracticalToolId } from "@/lib/practicalToolIds";
import fs from "fs";
import path from "path";
import { Children, isValidElement, type ComponentProps } from "react";

const PRACTICAL_TOOL_MARKER = "<!-- PRACTICAL_TOOL -->";

/** A markdown image on its own line arrives wrapped in <p>, and its <figure> cannot sit inside <p>. */
function MdxParagraph({ children, ...props }: ComponentProps<"p">) {
  const items = Children.toArray(children);
  const imageOnly = items.length === 1 && isValidElement<{ src?: unknown }>(items[0]) && Boolean(items[0].props.src);
  return imageOnly ? <>{children}</> : <p {...props}>{children}</p>;
}

type Props = { params: Promise<{ slug: string }> };

function resolveOgImage(image?: string) {
  const resolved = articlePhoto(image);
  if (!resolved) return DEFAULT_OG_IMAGE;
  return resolved.startsWith("http") ? resolved : absoluteUrl(resolved);
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
  const contentForSpeech = post.content.replace(PRACTICAL_TOOL_MARKER, " ");
  const speechText = markdownToSpeechText(contentForSpeech);
  const audioRel = `/audio/blog/${slug}.mp3`;
  const audioAbs = path.join(process.cwd(), "public", "audio", "blog", `${slug}.mp3`);
  // Hide Listen when frontmatter sets listenAudio: false (stale narration awaiting regen).
  const audioSrc =
    post.meta.listenAudio === false ? undefined : fs.existsSync(audioAbs) ? audioRel : undefined;
  const displayContent = post.content.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "").replace(
    /^[ \t]*(?:-[ \t]*)?(?:\*\*)?(?:Target keywords?(?:\(s\))?|(?:Related[ \t]+)?Semantic terms|Primary intent|Target reader|Value promise):[^\n]*(?:\n|$)/gim,
    "\n",
  );
  const [beforeTool, afterTool = ""] = displayContent.split(PRACTICAL_TOOL_MARKER);
  const practicalToolId = isPracticalToolId(post.meta.practicalTool) ? post.meta.practicalTool : null;
  const heroAlt = post.meta.imageAlt || `${post.meta.title} — illustrative scene`;
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
      name: "Iron Compass AI",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Iron Compass AI",
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION_LOGO,
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
            <script
              id={`faq-${post.meta.slug ?? slug}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
            />
          ) : null}
          <script
            id={`article-${post.meta.slug ?? slug}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }}
          />
          <script
            id={`breadcrumb-${post.meta.slug ?? slug}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
          />

          <header className="ic-board-hero">
            {articlePhoto(post.meta.image) ? (
              <div className="ic-board-hero__media">
                <PhotoFrame src={articlePhoto(post.meta.image)!} alt={heroAlt} fit="cover" position="center top" />
              </div>
            ) : null}
            <div className="ic-board-hero__copy">
            <p className="ic-board-kicker">Journal</p>
            <h1 className="ic-page-title">{post.meta.title}</h1>
            {post.meta.imageCredit && articlePhoto(post.meta.image) ? (
              <p className="ic-ai-credit">{post.meta.imageCredit}</p>
            ) : null}
            <p className="ic-dispatch-lede">{fallbackDescription}</p>
            <div className="ic-dispatch-meta">
              <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
            </div>
            <ArticleListenButton
              title={articleTitle}
              text={speechText}
              audioSrc={audioSrc}
              audioVersion="christopher-v1"
              subtle
              hint="Prefer to hear it?"
            />
            <div className="ic-stoic-rule ic-stoic-rule--wide" aria-hidden="true" />
            </div>
          </header>

          <div className="ic-dispatch-body">
            <article className="ic-dispatch-prose">
              <MDXRemote
                source={beforeTool}
                components={{
                  Link,
                  h1: (props) => <h2 {...props} />,
                  p: MdxParagraph,
                  img: ({ src, alt }) => (src ? <PhotoFrame src={src} alt={alt || ""} /> : null),
                }}
              />
            </article>

            {practicalToolId ? (
              <div className="my-8">
                <BlogPracticalTool id={practicalToolId} />
              </div>
            ) : null}

            {afterTool.trim() ? (
              <article className="ic-dispatch-prose">
                <MDXRemote
                  source={afterTool}
                  components={{
                    Link,
                    h1: (props) => <h2 {...props} />,
                    p: MdxParagraph,
                    img: ({ src, alt }) => (src ? <PhotoFrame src={src} alt={alt || ""} /> : null),
                  }}
                />
              </article>
            ) : null}

            <footer className="ic-dispatch-footer flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1 text-left">
                <p className="ic-section-copy ic-section-copy--muted text-sm max-w-md">{fallbackDescription}</p>
              </div>
              <div className="ic-cta-row justify-start md:justify-end">
                <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
                  Back to Journal
                </Link>
                <a href={`${productAppHref()}/auth`} className="ic-btn-primary text-[0.62rem]">
                  Start free
                </a>
              </div>
            </footer>
          </div>
        </div>
      </PageContainer>
    </PageShell>
  );
}
