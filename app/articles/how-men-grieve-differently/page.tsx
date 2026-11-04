import { practicalGuides } from "@/lib/practicalGuides";
import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "How Men Experience Grief: Patterns and Practical Support",
  description:
    "Men experience grief in different ways. Explore silence, responsibility and connection, with practical daily and weekly actions.",
  path: "/articles/how-men-grieve-differently",
  openGraph: {
    type: "article",
    publishedTime: "2025-11-08",
    modifiedTime: "2026-11-04",
  },
  images: [practicalGuides["/articles/how-men-grieve-differently"].image],
});

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
    title: "Holding pressure in",
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
    copy: "Keep an ordinary anchor such as a manageable walk, a regular meal or a planned time to rest.",
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
      intro="Men respond to loss in different ways. This guide looks at patterns you might recognise, the limits of going silent and practical ways to stay connected while carrying your responsibilities."
      path="/articles/how-men-grieve-differently"
    >
      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Why Men Go Silent During Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          You may go quiet because you feel responsible for keeping things
          moving, or because you do not know what to say. Quiet can have a
          place, but it should not become the only way you carry what happened.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Men Feel Grief in Their Identity</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Loss can raise questions about identity, responsibility and direction.
          These experiences are not exclusive to men, and they do not look the
          same for everyone. If your roles have changed, revisit the{" "}
          <Link href="/domains/identity" className="underline">
            Identity
          </Link>{" "}
          domain to rebuild who you are.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Why Men Break in Private</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Trying to hide every difficult moment can leave people unaware that
          you need support. Speak to someone you trust before the practical load
          becomes more than you can carry alone.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">What useful support looks like</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Useful support leaves room for the loss and the life that still needs
          attention. Ask for clear practical help, time to remember and company
          you do not have to perform for.
        </p>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2 ic-align-center">
          <h2 className="ic-section-heading">Patterns you may recognise</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 ic-align-center">
          {patterns.map((pattern) => (
            <article
              key={pattern.title}
              className="ic-panel-muted space-y-2 ic-align-center"
            >
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">
                {pattern.title}
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                {pattern.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">
          The Strength Men Need While Grieving
        </h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Steadiness includes recognising when you need help. Keep the practical
          commitments you can manage, adjust unrealistic demands and choose a
          response that reflects your principles. Explore the{" "}
          <Link href="/domains/discipline" className="underline">
            Discipline
          </Link>{" "}
          and{" "}
          <Link href="/domains/grief-honour" className="underline">
            Grief &amp; Honour
          </Link>{" "}
          domains.
        </p>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">
            How to Grieve Without Destroying Yourself
          </h2>
          <p className="ic-section-copy ic-section-copy--muted">
            Execute these steps:
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 ic-align-center">
          {steps.map((step) => (
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
