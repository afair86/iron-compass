import { practicalGuides } from "@/lib/practicalGuides";
import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Rebuilding After Divorce: A Man's Guide to Starting Over",
  description:
    "Rebuild after divorce with practical stability, clear standards and integrity. Daily actions, a weekly review and a longer-term direction.",
  path: "/articles/rebuilding-after-divorce-for-men",
  openGraph: {
    type: "article",
    publishedTime: "2025-11-29",
    modifiedTime: "2026-11-04",
  },
  images: [practicalGuides["/articles/rebuilding-after-divorce-for-men"].image],
});

const phases = [
  {
    title: "Stabilisation",
    copy: "Stop the bleeding. Focus on sleep, hydration, one grounding habit, and limiting self-destructive behaviors.",
  },
  {
    title: "Identity Rebuild",
    copy: "Define the standards and virtues you want to embody now. Identity returns through consistent action.",
    link: "/domains/identity",
  },
  {
    title: "Discipline Reboot",
    copy: "Establish a manageable routine for rest, movement, practical tasks and a short evening review.",
    link: "/domains/discipline",
  },
  {
    title: "Purpose Reconstruction",
    copy: "Rebuild direction from the ground up. Dad, provider, leader—purpose follows disciplined execution.",
  },
];

const donts = [
  "Jumping into new relationships instantly",
  "Drinking to sleep",
  "Trading structure for chaos",
  "Avoiding responsibility",
  "Escaping into porn and dopamine cycles",
  "Becoming bitter",
  "Using kids as leverage",
  "Isolating completely",
];

const rebuildSteps = [
  {
    title: "Control Inputs",
    copy: "Reduce the noise: social feeds, porn, alcohol, and anything that weakens your standards.",
  },
  {
    title: "Build Your Environment",
    copy: "Set your room, routines, training, and order. Your surroundings shape your focus.",
  },
  {
    title: "Rebuild Standards",
    copy: "Stack non-negotiables one day at a time. Discipline proves identity.",
  },
  {
    title: "Own the Story",
    copy: "Separate what happened from what you can choose next. Own your part without assigning yourself blame for everything.",
  },
  {
    title: "Keep the Circle Tight",
    copy: "One honest brother is better than ten surface-level distractions.",
  },
];

export default function ArticlePage() {
  return (
    <ArticleLayout
      title="Rebuilding After Divorce (For Men)"
      intro="Divorce can change your home, routines, responsibilities and plans for the future. Rebuilding starts with practical stability, clear standards and a direction you can carry with integrity."
      path="/articles/rebuilding-after-divorce-for-men"
    >
      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">What changes after divorce</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Separation can affect your roles, routines, future plans and time with
          your children. Take stock of the changes before trying to solve
          everything at once. Keep the responsibilities you can carry and
          identify the practical help you need.
        </p>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Rebuild the core with the{" "}
          <Link href="/domains/identity" className="underline">
            Identity
          </Link>{" "}
          pillar.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">The Silent Fallout</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          You may notice anger, uncertainty or the urge to avoid difficult
          tasks. These are not a verdict about your character. Focus on how you
          act: keep important commitments, avoid using conflict to punish and
          ask for support with what you cannot resolve alone.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Divorce Is Rebuilding Season</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Divorce strips you down and gives you an uncomfortable chance to
          rebuild deliberately—not as a husband, but as a man. This is where
          Iron Compass AI begins.
        </p>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2 ic-align-center">
          <h2 className="ic-section-heading">Four Phases of Reconstruction</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 ic-align-center">
          {phases.map((phase) => (
            <article
              key={phase.title}
              className="ic-panel-muted space-y-2 ic-align-center"
            >
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">
                {phase.title}
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                {phase.copy}
              </p>
              {phase.link && (
                <Link href={phase.link} className="underline text-xs">
                  Learn More
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Fatherhood After Divorce</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          If you have kids, your job doubles. They need stability, measured
          honesty, presence, structure, and a father who refuses to quit. You
          don’t need to be perfect—just reliable.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">What Not To Do</h2>
        <p className="ic-section-copy ic-section-copy--muted">
          Avoid these traps that destroy identity:
        </p>
        <ul className="space-y-2 mx-auto max-w-3xl">
          {donts.map((item) => (
            <li key={item} className="ic-dot-list">
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">
            How to Rebuild Without Losing Yourself
          </h2>
          <p className="ic-section-copy ic-section-copy--muted">
            Execute these five moves:
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 ic-align-center">
          {rebuildSteps.map((step) => (
            <article
              key={step.title}
              className="ic-panel-muted space-y-2 ic-align-center"
            >
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">
                {step.title}
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                {step.copy}
              </p>
            </article>
          ))}
        </div>
      </section>
    </ArticleLayout>
  );
}
