import "@/styles/stoic-dispatch.css";
import Link from "next/link";
import PageShell from "../components/PageShell";
import PhotoFrame from "../components/brand/PhotoFrame";
import { pagePhotoAlts, pagePhotos, articlePhoto } from "@/lib/sitePhotos";
import frameStyles from "../components/brand/photo-frame.module.css";
import {
  PageContainer,
  SectionShell,
  HeadingStack,
} from "../components/LayoutPrimitives";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { absoluteUrl, buildPageMetadata, serializeJsonLd } from "@/lib/site";
import CategoryBadge from "../components/CategoryBadge";
import { blogCardLines } from "@/lib/blogCardLines";

const pageTitle =
  "Iron Compass AI Journal | Discipline and Responsibility";
const pageDescription =
  "Practical guides for the responsibilities you carry: work, health, family, money and life after setbacks. Read a guide and choose one action for your week.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/blog",
  openGraph: {
    description: pageDescription,
  },
});

const summaryFallbacks: Record<string, string> = {
  "why-most-men-fail-at-discipline":
    "Most men fail because they run on motivation, not structure. Learn the corrective systems.",
  "how-ai-can-help-men-become-more-disciplined":
    "Use AI as a relentless planner, coach, and accountability partner without outsourcing your will.",
  "the-eight-domains-every-man-must-master":
    "Strength, discipline, purpose, leadership, money, AI leverage, grief, and legacy—the Iron Compass AI map in long form.",
  "sample-post":
    "Discipline is the backbone of every win. Set non-negotiables and hold the line.",
  "hello-world":
    "What to expect from the Iron Compass AI journal and how to put it to work fast.",
  "30-day-discipline-relay":
    "A four-week relay to lock daily standards, remove decision fatigue, and raise compliance.",
  "strong-at-home-protocol":
    "Build strength and conditioning at home in 12 weeks with minimal gear and smart progressions.",
  "purpose-pipeline":
    "Turn a one-line mission into weekly blocks and a 12-week proof outcome you can ship.",
  "small-team-leadership-cadence":
    "Run a 3–12 person team with standards, weekly cadence, and crisp feedback loops.",
  "cash-defense-and-offense":
    "An eight-week sprint to tighten burn, add revenue, and automate the basics for financial control.",
  "discipline-under-fire-holding-the-line":
    "Keep your standards alive during chaos with survive/standard/surge days and anchor scripts.",
  "command-calm-after-action-leadership":
    "A after-action ritual that turns mistakes into trust and calm authority.",
  "operator-ai-copilot-daily-loop":
    "Map your daily loop, deploy AI on the grunt work, and keep human judgment in command.",
  "strength-without-extra-time":
    "Three sessions, zero fluff, and recovery floors to stay strong when your calendar is packed.",
  "financial-resilience-protocol":
    "Weekly cash flow clarity, buffer protection, and low-risk money decisions.",
  "quiet-discipline-protocol-busy-men":
    "One daily standard, one weekly review — discipline that fits a loaded calendar.",
};

function formatDate(value: string) {
  const parsed = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function getCardLine(post: PostMeta) {
  return blogCardLines[post.slug] ?? getSummary(post);
}

function getSummary(post: PostMeta) {
  return (
    post.description ??
    summaryFallbacks[post.slug] ??
    "A fresh dispatch from the Iron Compass AI journal."
  );
}

function PostThumb({ post }: { post: PostMeta }) {
  const src = articlePhoto(post.image);
  if (!src) return null;
  return (
    <PhotoFrame
      className={frameStyles.listThumb}
      src={src}
      alt={post.imageAlt || post.title}
    />
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [feature, ...rest] = posts;
  const latest = rest.slice(0, 3);
  const archive = rest.slice(3);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
      description: getSummary(post),
    })),
  };

  return (
    <PageShell>
      <PageContainer className="ic-blog-index">
        <script
          id="ld-blog-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListSchema) }}
        />
        <SectionShell variant="hero" className="space-y-6">
          <PhotoFrame src={pagePhotos.blog} alt={pagePhotoAlts.blog} />
          <h1 className="ic-page-title">Iron Compass AI Journal</h1>
          <p className="ic-display-subtitle">Dispatches for disciplined men</p>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl">
            Practical pieces across the ten life domains, plus notes on using AI
            as a tool. Every post ends with something you can do this week.
          </p>
          <div className="ic-cta-row">
            <Link
              href="/domains"
              className="ic-btn-primary text-xs sm:text-[0.72rem]"
            >
              Explore the domains
            </Link>
          </div>
          <div className="ic-panel-stoic ic-topics-panel p-5 space-y-3 max-w-2xl mx-auto">
            <h2 className="ic-topics-heading">Explore by responsibility</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                ["Discipline", "discipline"],
                ["Identity", "identity"],
                ["Health & Strength", "health-strength"],
                ["Bonds & Connections", "bonds-connections"],
                ["Purpose & Direction", "purpose-direction"],
                ["Finance & Provision", "finance-provision"],
                ["Resilience", "resilience"],
                ["Fall & Rise", "fall-rise"],
                ["Grief & Honour", "grief-honour"],
                ["Legacy", "legacy"],
              ].map(([topic, slug]) => (
                <Link
                  href={`/domains/${slug}`}
                  key={slug}
                  className="ic-dispatch-chip"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </SectionShell>

        {feature && (
          <SectionShell variant="contrast" className="space-y-5 md:space-y-6">
            <HeadingStack
              eyebrow="Featured Play"
              title="Read This First"
              accent="gold"
              className="space-y-2"
            />
            <article className="grid gap-8 md:grid-cols-2 md:items-center">
              <PostThumb post={feature} />
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em]">
                  <CategoryBadge category={feature.category} />
                  <span className="h-px w-6 bg-white/10" aria-hidden="true" />
                  <time
                    dateTime={feature.date}
                    className="text-[var(--ic-text-muted)]"
                  >
                    {formatDate(feature.date)}
                  </time>
                </div>
                <h2 className="ic-heading-2">{feature.title}</h2>
                <p className="ic-section-copy ic-section-copy--muted">
                  {getCardLine(feature)}
                </p>
                <div className="ic-cta-row">
                  <Link
                    href={`/blog/${feature.slug}`}
                    className="ic-btn-primary"
                  >
                    Read the article
                  </Link>
                </div>
              </div>
            </article>
          </SectionShell>
        )}

        {latest.length > 0 && (
          <SectionShell variant="warm" className="space-y-6 ic-band">
            <HeadingStack
              eyebrow="Latest Dispatches"
              title="Latest articles"
              accent="teal"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <article
                  key={post.slug}
                  className="ic-stoic-card space-y-4 flex flex-col h-full"
                >
                  <PostThumb post={post} />
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[0.68rem] uppercase tracking-[0.28em]">
                    <CategoryBadge category={post.category} />
                    <span className="h-px w-6 bg-white/10" aria-hidden="true" />
                    <time
                      dateTime={post.date}
                      className="text-[var(--ic-text-muted)]"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h3 className="text-base font-heading tracking-[0.22em] uppercase text-[var(--ic-text-heading)]">
                    {post.title}
                  </h3>
                  <p className="ic-section-copy ic-section-copy--muted flex-1">
                    {getCardLine(post)}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="ic-btn-primary text-[0.58rem] justify-center self-center"
                  >
                    Read Article
                  </Link>
                </article>
              ))}
            </div>
          </SectionShell>
        )}

        {archive.length > 0 && (
          <SectionShell variant="panel" className="space-y-6">
            <HeadingStack eyebrow="Archive" title="All articles" />
            <div className="grid gap-4 md:grid-cols-2">
              {archive.map((post) => (
                <article
                  key={post.slug}
                  className="ic-stoic-card p-4 flex flex-col gap-2 h-full"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-[var(--ic-text-muted)]">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span
                        className="h-px w-6 bg-white/10"
                        aria-hidden="true"
                      />
                      <span>{post.category ?? "Dispatch"}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-heading tracking-[0.2em] uppercase text-[var(--ic-text-heading)] hover:text-white"
                    >
                      {post.title}
                    </Link>
                    <p className="ic-section-copy ic-section-copy--muted text-sm">
                      {getCardLine(post)}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="ic-btn-ghost text-[0.55rem] self-center"
                  >
                    Read
                  </Link>
                </article>
              ))}
            </div>
          </SectionShell>
        )}
      </PageContainer>
    </PageShell>
  );
}
