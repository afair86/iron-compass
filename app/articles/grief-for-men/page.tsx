import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";

export const metadata = {
  title: "Grief for Men: Holding Pain Without Falling Apart",
  description:
    "A grounded, masculine guide for men facing grief. Learn how to carry pain with strength, clarity, and purpose — without collapsing or suppressing what matters.",
};

const traps = [
  { title: "Isolation", body: "You build walls no one can climb, then forget how to let anyone through." },
  { title: "Numbing", body: "Porn, drinking, and dopamine loops become the default escape hatch." },
  { title: "Rage", body: "Pain turned outward until it scorches every relationship." },
  { title: "Collapse", body: "Standards slide because you convince yourself nothing matters." },
];

const practical = [
  {
    title: "Anchor One Habit",
    body: "Walk, train, cold exposure, breathwork—something physical that reminds you the day is yours.",
  },
  {
    title: "Tell the Truth Once",
    body: "One honest sentence to one person every day keeps your mind from sealing shut.",
  },
  {
    title: "Hold One Standard",
    body: "Sleep, training, fatherhood, or nutrition—pick a non-negotiable and keep it alive.",
  },
  {
    title: "Honour the Bond",
    body: "Create a ritual you repeat—something dignified that carries their name forward.",
  },
  {
    title: "Watch Your Escapes",
    body: "Track the numbing habits before they spiral. Avoidance destroys men faster than grief.",
  },
];

export default function ArticlePage() {
  return (
    <ArticleLayout
      title="Grief for Men: Holding Pain Without Falling Apart"
      intro="Most men carry grief in silence. Not because they are cold, but because they feel responsible for family, role, and identity. This guide is for the man trying to stay functional while something inside him is collapsing."
    >
      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">How Men Experience Grief Differently</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men grieve through action. You keep moving, keep showing up, keep the world running—yet numbness, disconnection, and isolation creep in. The world gives soft language. Iron Compass gives men the vocabulary to describe what is real.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">The Silent Load Men Carry</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men fear being a burden, so they hold everything in. Suppression morphs into anger, withdrawal, addiction, emotional shutdown, and workaholism—not from weakness, but from missing structure.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Grief &amp; Identity</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Loss forces identity questions: Who am I without them? How do I lead when I feel broken? What does this pain mean for the man I am becoming? This is why grief demands discipline, not denial. Revisit the standards inside the
          {" "}
          <Link href="/domains/identity-legacy" className="underline">
            Identity &amp; Legacy
          </Link>
          {" "}
          and
          {" "}
          <Link href="/domains/discipline-mindset" className="underline">
            Discipline &amp; Mindset
          </Link>
          {" "}
          domains to rebuild your frame.
        </p>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2 text-center">
          <h2 className="ic-section-heading">Common Traps Men Fall Into</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-center">
          {traps.map((trap) => (
            <article key={trap.title} className="ic-panel-muted space-y-2 text-center">
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">{trap.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{trap.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">A Stoic Way to Hold Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Stoicism is a frame: accept reality, choose your response, act with honour. You do not control the loss, but you control the man you become because of it. That is masculine strength.
        </p>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">Practical Steps</h2>
          <p className="ic-section-copy ic-section-copy--muted">Move through grief without falling apart:</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-center">
          {practical.map((step) => (
            <article key={step.title} className="ic-panel-muted space-y-2 text-center">
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">{step.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Fatherhood &amp; Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Children study how you carry pain, handle pressure, and stay grounded. They do not need perfect—they need present. Speak honestly with restraint and model strength-with-honesty.
        </p>
      </section>

      <section className="ic-panel text-center space-y-4">
        <h2 className="ic-section-heading">How Iron Compass Helps</h2>
        <ul className="space-y-2 ic-section-copy ic-section-copy--muted text-sm">
          <li>Discipline, identity, and purpose frameworks that rebuild direction.</li>
          <li>Grief grounding rituals and stoic reflection reps.</li>
          <li>Habit systems that prevent collapse and curb avoidance.</li>
          <li>
            Guidance for fatherhood and purpose, plus direct resources inside the
            {" "}
            <Link href="/domains/grief-honour" className="underline">
              Grief &amp; Honour
            </Link>
            {" "}
            pillar.
          </li>
          <li>Daily structures that keep you accountable when emotions surge.</li>
        </ul>
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
