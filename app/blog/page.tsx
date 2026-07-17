import "@/styles/stoic-dispatch.css";
import Link from "next/link";
import Script from "next/script";
import PageShell from "../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../components/LayoutPrimitives";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { absoluteUrl, buildPageMetadata, DEFAULT_OG_IMAGE } from "@/lib/site";
import CategoryBadge from "../components/CategoryBadge";

const pageTitle = "Iron Compass Journal — Discipline, Leadership & Purpose for Men";
const pageDescription =
  "Practical guides on discipline, grief, strength, money, leadership, and AI — written for men who want systems that work on a bad day, not motivation loops.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/blog",
  openGraph: {
    description: "Actionable articles on discipline, purpose, strength, money, leadership, and AI leverage.",
  },
});

const summaryFallbacks: Record<string, string> = {
  "why-most-men-fail-at-discipline": "Most men fail because they run on motivation, not structure. Learn the corrective systems.",
  "how-ai-can-help-men-become-more-disciplined": "Use AI as a relentless planner, coach, and accountability partner without outsourcing your will.",
  "the-eight-domains-every-man-must-master": "Strength, discipline, purpose, leadership, money, AI leverage, grief, and legacy—the Iron Compass map in long form.",
  "sample-post": "Discipline is the backbone of every win. Set non-negotiables and hold the line.",
  "hello-world": "What to expect from the Iron Compass journal and how to put it to work fast.",
  "30-day-discipline-relay": "A four-week relay to lock daily standards, remove decision fatigue, and raise compliance.",
  "strong-at-home-protocol": "Build strength and conditioning at home in 12 weeks with minimal gear and smart progressions.",
  "purpose-pipeline": "Turn a one-line mission into weekly blocks and a 12-week proof outcome you can ship.",
  "small-team-leadership-cadence": "Run a 3–12 person team with standards, weekly cadence, and crisp feedback loops.",
  "cash-defense-and-offense": "An eight-week sprint to tighten burn, add revenue, and automate the basics for financial control.",
  "discipline-under-fire-holding-the-line": "Keep your standards alive during chaos with survive/standard/surge days and anchor scripts.",
  "command-calm-after-action-leadership": "A 20-minute after-action ritual that turns mistakes into trust and calm authority.",
  "operator-ai-copilot-daily-loop": "Map your daily loop, deploy AI on the grunt work, and keep human judgment in command.",
  "strength-without-extra-time": "Three sessions, zero fluff, and recovery floors to stay strong when your calendar is packed.",
  "financial-resilience-protocol": "Weekly cash flow clarity, buffer protection, and low-risk money decisions.",
  "quiet-discipline-protocol-busy-men": "One daily standard, one weekly review — discipline that fits a loaded calendar.",
};

function formatDate(value: string) {
  const parsed = new Date(value);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parsed);
}

function getSummary(post: PostMeta) {
  return post.description ?? summaryFallbacks[post.slug] ?? "A fresh dispatch from the Iron Compass journal.";
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
      <PageContainer>
        <Script
          id="ld-blog-itemlist"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <SectionShell variant="hero" className="space-y-6">
          <p className="ic-eyebrow ic-eyebrow--stoic">Iron Compass Journal</p>
          <h1 className="ic-page-title">Dispatches for Disciplined Men</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl">
            Actionable plays for strength &amp; health, discipline, purpose, leadership, financial power, AI leverage, grief, and legacy. Every post ends with moves you can run this week.
          </p>
          <div className="ic-cta-row">
            <Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
              Start the Program
            </Link>
            <Link href="/domains" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
              View All Domains
            </Link>
          </div>
          <div className="ic-panel-stoic p-5 space-y-3 max-w-2xl mx-auto">
            <p className="ic-section-copy text-[0.9rem]">Topics we cover weekly</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Discipline", "Strength & Health", "Purpose", "Leadership", "Financial Power", "AI Mastery", "Grief & Honour", "Identity & Legacy"].map(
                (topic) => (
                  <span key={topic} className="ic-dispatch-chip">
                    {topic}
                  </span>
                )
              )}
            </div>
          </div>
        </SectionShell>

        {feature && (
          <SectionShell variant="contrast" className="space-y-5 md:space-y-6">
            <HeadingStack eyebrow="Featured Play" title="Read This First" accent="gold" className="space-y-2" />
            <article className="grid gap-6 lg:grid-cols-[1.6fr,1fr] items-start max-w-5xl mx-auto">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-[0.68rem] uppercase tracking-[0.28em]">
                  <CategoryBadge category={feature.category} />
                  <span className="h-px w-6 bg-white/10" aria-hidden="true" />
                  <time dateTime={feature.date} className="text-[var(--ic-text-muted)]">{formatDate(feature.date)}</time>
                </div>
                <h2 className="ic-heading-2">{feature.title}</h2>
                <p className="ic-section-copy ic-section-copy--muted">{getSummary(feature)}</p>
                <div className="ic-cta-row">
                  <Link href={`/blog/${feature.slug}`} className="ic-btn-primary text-[0.62rem]">
                    Read Article
                  </Link>
                  <Link href="/domains" className="ic-btn-ghost text-[0.6rem]">
                    See the Domains
                  </Link>
                </div>
              </div>
              <div className="ic-panel-stoic p-5 space-y-4">
                <p className="ic-section-copy text-[0.9rem]">What you get</p>
                <ul className="list-disc list-inside ic-section-copy ic-section-copy--muted space-y-1">
                  <li>Why this matters now</li>
                  <li>Moves to run this week</li>
                  <li>Where it fits in the eight domains</li>
                </ul>
                <Link href={`/blog/${feature.slug}`} className="ic-btn-ghost text-[0.6rem]">
                  Jump to the play
                </Link>
              </div>
            </article>
          </SectionShell>
        )}

        {latest.length > 0 && (
          <SectionShell variant="warm" className="space-y-6">
            <HeadingStack eyebrow="Latest Dispatches" title="Fresh Intelligence" accent="teal" />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latest.map((post) => (
                <article key={post.slug} className="ic-stoic-card space-y-4 flex flex-col h-full">
                  <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em]">
                    <CategoryBadge category={post.category} />
                    <span className="h-px w-6 bg-white/10" aria-hidden="true" />
                    <time dateTime={post.date} className="text-[var(--ic-text-muted)]">{formatDate(post.date)}</time>
                  </div>
                  <h3 className="text-base font-heading tracking-[0.22em] uppercase text-[var(--ic-text-heading)]">{post.title}</h3>
                  <p className="ic-section-copy ic-section-copy--muted flex-1">{getSummary(post)}</p>
                  <Link href={`/blog/${post.slug}`} className="ic-btn-primary text-[0.58rem] justify-center">
                    Read Article
                  </Link>
                </article>
              ))}
            </div>
          </SectionShell>
        )}

        {archive.length > 0 && (
          <SectionShell variant="panel" className="space-y-6">
            <HeadingStack eyebrow="Archive" title="Every Dispatch" />
            <div className="space-y-4">
              {archive.map((post) => (
                <article
                  key={post.slug}
                  className="ic-stoic-card p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-[var(--ic-text-muted)]">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="h-px w-6 bg-white/10" aria-hidden="true" />
                      <span>{post.category ?? "Dispatch"}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-heading tracking-[0.2em] uppercase text-[var(--ic-text-heading)] hover:text-white"
                    >
                      {post.title}
                    </Link>
                    <p className="ic-section-copy ic-section-copy--muted text-sm">{getSummary(post)}</p>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="ic-btn-ghost text-[0.55rem] self-start md:self-auto">
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
