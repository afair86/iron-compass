import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";

export const metadata = {
  title: "Rebuilding Identity After Loss",
  description:
    "Loss can break a man’s identity. Here’s how to rebuild yourself with discipline, direction, and masculine structure — without losing who you are in the process.",
};

const breakPoints = [
  {
    title: "The Shattered Role",
    copy: "The role you once played—husband, son, partner, brother—no longer exists.",
  },
  {
    title: "The Silent Guilt",
    copy: "You think you should be coping better, even though grief is already a war.",
  },
  {
    title: "The Lost Direction",
    copy: "Your old compass stopped pointing anywhere the moment the loss hit.",
  },
];

const framework = [
  {
    title: "Rebuild One Standard",
    copy: "Choose one habit that represents the man you want to become—training, sleep, fatherhood, presence, or truth—and hold it with discipline.",
    link: "/domains/discipline-mindset",
  },
  {
    title: "Ask Who You Must Become",
    copy: 'Replace "Who was I?" with "Who must I become now?" Vision over memory.',
  },
  {
    title: "Build Micro-Purpose",
    copy: "Purpose grows from responsibility: care for your body, stay present for your kids, execute honest work, keep your home tight, do one hard thing daily.",
  },
  {
    title: "Stop Numbing",
    copy: "Identity cannot grow while you hide behind porn, alcohol, isolation, or endless scrolling. Grief demands honesty.",
  },
  {
    title: "Honour What Was Lost",
    copy: "Create a ritual, sentence, reflection, or behavior change that keeps their meaning alive.",
  },
];

export default function ArticlePage() {
  return (
    <ArticleLayout
      title="Rebuilding Identity After Loss"
      intro="Loss doesn’t just hurt—it disorients. Men grieve the person and the version of themselves that existed with them. This is the side of grief no one talks about."
    >
      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Why Loss Hits a Man’s Identity Harder</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men build identity on responsibility, purpose, leadership, being needed, being stable, and being dependable. When loss hits, it rattles the core of what makes a man feel worthy. You don’t just lose the person—you lose who you were with them.
        </p>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          That’s why men feel directionless, ashamed, weak, guilty for not coping better, or convinced they failed. Identity pain cuts deeper than simple emotion. Rebuild your core in the
          {" "}
          <Link href="/domains/identity-legacy" className="underline">
            Identity &amp; Legacy
          </Link>
          {" "}
          domain.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">When You Feel Like a Stranger to Yourself</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          There’s a quiet moment when a man realises, “I don’t know who I am anymore.” It shows up when you wake up empty, operate on autopilot, feel disconnected from your kids, or cannot access old strength. This is a temporary identity collapse—and it is solvable.
        </p>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2 text-center">
          <h2 className="ic-section-heading">The Three Identity Break Points</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 text-center">
          {breakPoints.map((point) => (
            <article key={point.title} className="ic-panel-muted space-y-2 text-center">
              <h3 className="text-sm font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">{point.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{point.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">What Men Get Wrong About Finding Themselves</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men think identity returns by taking time off, waiting to feel better, numbing pain, or hoping clarity arrives. It doesn’t. Identity is rebuilt through action—daily, disciplined action.
        </p>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">The Iron Compass Framework</h2>
          <p className="ic-section-copy ic-section-copy--muted">Rebuild yourself with masculine structure:</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-center">
          {framework.map((step) => (
            <article key={step.title} className="ic-panel-muted space-y-2 text-center">
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">{step.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{step.copy}</p>
              {step.link && (
                <Link href={step.link} className="underline text-xs">
                  Explore Discipline &amp; Mindset
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">The Fatherhood Layer</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          If you’re a dad, identity loss hits different because your children still rely on you. You don’t need to be invincible—just honest and disciplined. They will copy how you rebuild, stay responsible, carry pain, and move forward under weight.
        </p>
      </section>

      <section className="ic-panel text-center space-y-4">
        <h2 className="ic-section-heading">How Iron Compass Helps</h2>
        <p className="ic-section-copy ic-section-copy--muted">
          Inside Iron Compass, identity rebuilding becomes a structured path: daily discipline anchors, grief stabilisation rituals, masculine reflection prompts, purpose frameworks, fatherhood support, habit systems, and identity milestones. Rebuild by design, not accident, and reconnect with the
          {" "}
          <Link href="/domains/grief-honour" className="underline">
            Grief &amp; Honour
          </Link>
          {" "}
          pillar for deeper work.
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
