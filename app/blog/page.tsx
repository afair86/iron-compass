import Link from "next/link";
import PageShell from "../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../components/LayoutPrimitives";
import { getAllPosts, type PostMeta } from "@/lib/blog";

export const metadata = {
  title: "Iron Compass Journal",
  description: "SEO-rich guides for disciplined men: structure, purpose, leadership, money, and leverage.",
  openGraph: {
    title: "Iron Compass Journal",
    description: "Actionable articles on discipline, purpose, strength, money, leadership, and AI leverage.",
  },
};

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
  "minimalist-strength-for-busy-operators": "Three sessions, zero fluff, and recovery floors to stay strong when your calendar is packed.",
  "command-calm-after-action-leadership": "A 20-minute after-action ritual that turns mistakes into trust and calm authority.",
  "cash-buffer-warfare": "Six-week sprint to build a real cash buffer, kill leaks, and calm your money decisions.",
  "operator-ai-copilot-daily-loop": "Map your daily loop, deploy AI on the grunt work, and keep human judgment in command.",
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

  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-6 text-left">
          <p className="ic-eyebrow">Iron Compass Journal</p>
          <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr] items-start">
            <div className="space-y-4">
              <h1 className="ic-page-title text-left">Dispatches for Disciplined Men</h1>
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
            </div>
            <div className="ic-panel-muted p-5 rounded-2xl space-y-3">
              <p className="ic-section-copy text-[0.9rem]">Topics we cover weekly</p>
              <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-[var(--ic-text-muted)]">
                <span className="ic-chip">Discipline</span>
                <span className="ic-chip">Strength &amp; Health</span>
                <span className="ic-chip">Purpose</span>
                <span className="ic-chip">Leadership</span>
                <span className="ic-chip">Financial Power</span>
                <span className="ic-chip">AI Mastery</span>
                <span className="ic-chip">Grief &amp; Honour</span>
                <span className="ic-chip">Identity &amp; Legacy</span>
              </div>
            </div>
          </div>
        </SectionShell>

        {feature && (
          <SectionShell variant="panel" className="space-y-5 md:space-y-6">
            <HeadingStack eyebrow="Featured Play" title="Read This First" center={false} className="space-y-2" />
            <article className="grid gap-6 lg:grid-cols-[1.6fr,1fr] items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-[var(--ic-text-muted)]">
                  <span>{feature.category ?? "Dispatch"}</span>
                  <span className="h-px w-6 bg-white/10" aria-hidden="true" />
                  <time dateTime={feature.date}>{formatDate(feature.date)}</time>
                </div>
                <h2 className="ic-heading-2 text-left">{feature.title}</h2>
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
              <div className="ic-panel-muted p-5 rounded-2xl space-y-4">
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
          <SectionShell variant="panel" className="space-y-6">
            <HeadingStack eyebrow="Latest Dispatches" title="Fresh Intelligence" center={false} />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latest.map((post) => (
                <article key={post.slug} className="ic-panel-muted space-y-4 flex flex-col h-full p-5">
                  <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-[var(--ic-text-muted)]">
                    <span>{post.category ?? "Dispatch"}</span>
                    <span className="h-px w-6 bg-white/10" aria-hidden="true" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
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
            <HeadingStack eyebrow="Archive" title="Every Dispatch" center={false} />
            <div className="space-y-4">
              {archive.map((post) => (
                <article
                  key={post.slug}
                  className="ic-panel-outline p-4 rounded-xl flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
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
