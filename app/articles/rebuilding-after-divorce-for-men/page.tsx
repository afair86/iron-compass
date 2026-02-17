import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";

export const metadata = {
  title: "Rebuilding After Divorce (For Men)",
  description:
    "A grounded guide for men rebuilding their life after divorce. Regain discipline, identity, confidence, and direction without falling into the traps that break most men.",
};

const phases = [
  {
    title: "Stabilisation",
    copy: "Stop the bleeding. Focus on sleep, hydration, one grounding habit, and limiting self-destructive behaviors.",
  },
  {
    title: "Identity Rebuild",
    copy: "Define the standards and virtues you want to embody now. Identity returns through consistent action.",
    link: "/domains/identity-legacy",
  },
  {
    title: "Discipline Reboot",
    copy: "Reinstall structure: training, morning routines, cold exposure, reduced dopamine traps, controlled breathing, evening reflection.",
    link: "/domains/discipline-mindset",
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
    copy: "You are not a victim. You are a man rebuilding with intention.",
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
      intro="Divorce wrecks identity, not just routine. You lose structure, confidence, and the version of yourself that existed in that relationship. Now you stand in the wreckage asking, ‘Who am I now?’"
    >
      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Why Divorce Hits Men Differently</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men do not move on faster—they simply hide the damage. Divorce punches holes in role, leadership, routines, future plans, connection to kids, and emotional stability. The collapse is quiet, but the identity hit is loud.
        </p>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Rebuild the core with the
          {" "}
          <Link href="/domains/identity-legacy" className="underline">
            Identity &amp; Legacy
          </Link>
          {" "}
          pillar.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">The Silent Fallout</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Divorce pulls men into shame, anger, guilt, numbness, revenge mindsets, loneliness, self-doubt, and “I failed” narratives. Without structure, that becomes drinking, porn, hookups, isolation, overwork, aggression, and avoidance. You are not weak—you are unstructured.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Divorce Is Rebuilding Season</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Divorce strips you down and gives you an uncomfortable chance to rebuild deliberately—not as a husband, but as a man. This is where Iron Compass begins.
        </p>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2 text-center">
          <h2 className="ic-section-heading">Four Phases of Reconstruction</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-center">
          {phases.map((phase) => (
            <article key={phase.title} className="ic-panel-muted space-y-2 text-center">
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">{phase.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{phase.copy}</p>
              {phase.link && (
                <Link href={phase.link} className="underline text-xs">
                  Learn More
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Fatherhood After Divorce</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          If you have kids, your job doubles. They need stability, measured honesty, presence, structure, and a father who refuses to quit. You don’t need to be perfect—just reliable.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">What Not To Do</h2>
        <p className="ic-section-copy ic-section-copy--muted">Avoid these traps that destroy identity:</p>
        <ul className="space-y-2 text-left mx-auto max-w-3xl">
          {donts.map((item) => (
            <li key={item} className="ic-dot-list">
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">How to Rebuild Without Losing Yourself</h2>
          <p className="ic-section-copy ic-section-copy--muted">Execute these five moves:</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-center">
          {rebuildSteps.map((step) => (
            <article key={step.title} className="ic-panel-muted space-y-2 text-center">
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">{step.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel text-center space-y-4">
        <h2 className="ic-section-heading">How Iron Compass Helps</h2>
        <p className="ic-section-copy ic-section-copy--muted">
          Iron Compass equips men with stabilisation routines, discipline anchors, identity reconstruction tools, purpose frameworks, fatherhood support, habit tracking, emotional grounding, and daily structure. Dive into the
          {" "}
          <Link href="/domains/grief-honour" className="underline">
            Grief &amp; Honour
          </Link>
          {" "}
          pillar for deeper processing.
        </p>
        <div className="ic-cta-row justify-center pt-2">
          <Link href="/start" className="ic-btn-primary text-[0.62rem]">
            Start Your Compass
          </Link>
          <Link href="/download" className="ic-btn-ghost text-[0.6rem]">
            Download the App
          </Link>
        </div>
      </section>
    </ArticleLayout>
  );
}
