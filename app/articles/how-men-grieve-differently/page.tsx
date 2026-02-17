import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";

export const metadata = {
  title: "How Men Grieve Differently (And Why No One Talks About It)",
  description:
    "Men carry grief differently. Learn why men go silent, why they break privately, and how to handle loss with strength, clarity, and masculine structure.",
};

const patterns = [
  {
    title: "The Protector",
    copy: "Keeps everyone else stable while ignoring his own collapse.",
  },
  {
    title: "The Numb Worker",
    copy: "Doubles down on work to avoid feeling anything real.",
  },
  {
    title: "The Lone Wolf",
    copy: "Withdraws because he refuses to burden anyone.",
  },
  {
    title: "The Bomb",
    copy: "Bottles everything until it detonates as anger.",
  },
];

const steps = [
  {
    title: "Accept the Hit",
    copy: "Name the loss. Do not minimise it. Call it what it is.",
  },
  {
    title: "Stay Connected",
    copy: "One honest conversation with one person keeps isolation from winning.",
  },
  {
    title: "Hold One Discipline",
    copy: "Training, walking, cold exposure, or sleep—discipline stabilises identity.",
  },
  {
    title: "Set Boundaries with Numbing",
    copy: "Keep the escapes on a leash. You know which ones spiral fast.",
  },
  {
    title: "Honour What You Lost",
    copy: "A small ritual or act of meaning grounds grief in purpose.",
  },
];

export default function ArticlePage() {
  return (
    <ArticleLayout
      title="How Men Grieve Differently"
      intro="Most grief conversations were not written for men. You hold the line even when the ground is shifting, and that difference matters. This article explains why men go silent, why they break in private, and how to carry loss with structure."
    >
      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Why Men Go Silent During Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men go quiet because they feel responsible. Even while grieving, you are protecting, providing, leading, solving, and keeping the world stable. Silence becomes a survival mechanism, not apathy.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Men Feel Grief in Their Identity</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Women often talk feelings through. Men internalise grief as identity shock, responsibility pressure, loss of direction, and fear of letting people down. Grief and identity are inseparable; revisit the
          {" "}
          <Link href="/domains/identity-legacy" className="underline">
            Identity &amp; Legacy
          </Link>
          {" "}
          domain to rebuild who you are.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Why Men Break in Private</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men hide their breaking point because they do not want to be a burden, fear being unreliable, and lack a masculine framework for expressing grief. Breaking in private is not weakness—it is isolation without structure.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">How Society Fails Men in Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Grief advice is soft and emotional. Men need clarity, responsibility, direction, discipline, honour, and principles. Not platitudes. Men do not need to be babied—they need a framework.
        </p>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2 text-center">
          <h2 className="ic-section-heading">The Four Masculine Patterns of Grief</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-center">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="ic-panel-muted space-y-2 text-center">
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">{pattern.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{pattern.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">The Strength Men Need While Grieving</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men do not need permission to fall apart; they need a system that keeps them steady. Masculine strength looks like facing reality, staying grounded, holding structure, protecting what matters, and choosing purpose when emotions are chaotic. Build this foundation in the
          {" "}
          <Link href="/domains/discipline-mindset" className="underline">
            Discipline &amp; Mindset
          </Link>
          {" "}
          and
          {" "}
          <Link href="/domains/grief-honour" className="underline">
            Grief &amp; Honour
          </Link>
          {" "}
          domains.
        </p>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">How to Grieve Without Destroying Yourself</h2>
          <p className="ic-section-copy ic-section-copy--muted">Execute these steps:</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-center">
          {steps.map((step) => (
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
          Iron Compass gives you discipline, identity, structure, and purpose to lead yourself through loss. Inside the app you will find grief grounding rituals, structured reflections, identity rebuilding, discipline anchors, fatherhood support, purpose tools, and habit systems.
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
