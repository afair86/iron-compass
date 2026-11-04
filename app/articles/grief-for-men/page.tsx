import { practicalGuides } from "@/lib/practicalGuides";
import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Grief for Men: Practical Ways to Carry Loss",
  description:
    "A practical guide for men carrying grief: daily structure, remembrance, honest support and responsibilities you can still carry.",
  path: "/articles/grief-for-men",
  openGraph: {
    type: "article",
    publishedTime: "2025-11-01",
    modifiedTime: "2026-11-04",
  },
  images: [practicalGuides["/articles/grief-for-men"].image],
});

const traps = [
  {
    title: "Isolation",
    body: "You build walls no one can climb, then forget how to let anyone through.",
  },
  {
    title: "Numbing",
    body: "Distraction or drinking may start taking the place of rest, company or practical attention.",
  },
  {
    title: "Rage",
    body: "Anger can affect how you speak to people. Pause before responding and return to the conversation with care.",
  },
  {
    title: "Collapse",
    body: "Standards slide because you convince yourself nothing matters.",
  },
];

const practical = [
  {
    title: "Anchor One Habit",
    body: "Choose a manageable walk or an ordinary routine that gives the day some structure.",
  },
  {
    title: "Tell the Truth Once",
    body: "Tell one trustworthy person what is difficult and what support would be useful.",
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
    body: "Notice when distraction is taking the place of a duty, rest or a conversation you need.",
  },
];

export default function ArticlePage() {
  return (
    <ArticleLayout
      title="Grief for Men: Holding Pain Without Falling Apart"
      intro="Grief can change the shape of an ordinary day. This guide offers practical structure for carrying loss, honouring what mattered and staying present for the responsibilities that remain."
      path="/articles/grief-for-men"
    >
      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Different ways of carrying grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Some men keep busy after a loss; others need more quiet or company.
          There is no single male pattern of grief. Notice what helps you meet
          the day and what keeps you away from people or responsibilities that
          matter.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">The Silent Load Men Carry</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Responsibility can make it difficult to ask for help. You may keep
          working while leaving your own needs unspoken. Give someone
          trustworthy a clear account of what is difficult and a specific way
          they could help.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Grief &amp; Identity</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Loss forces identity questions: Who am I without them? How do I lead
          when I feel broken? What does this pain mean for the man I am
          becoming? This is why grief demands discipline, not denial. Revisit
          the standards inside the{" "}
          <Link href="/domains/identity" className="underline">
            Identity
          </Link>{" "}
          and{" "}
          <Link href="/domains/discipline" className="underline">
            Discipline
          </Link>{" "}
          domains to rebuild your frame.
        </p>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2 ic-align-center">
          <h2 className="ic-section-heading">Common Traps Men Fall Into</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 ic-align-center">
          {traps.map((trap) => (
            <article
              key={trap.title}
              className="ic-panel-muted space-y-2 ic-align-center"
            >
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">
                {trap.title}
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                {trap.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">A Stoic Way to Hold Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Stoicism is a frame: accept reality, choose your response, act with
          honour. You do not control the loss, but you control the man you
          become because of it. That is masculine strength.
        </p>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">Practical Steps</h2>
          <p className="ic-section-copy ic-section-copy--muted">
            Move through grief without falling apart:
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 ic-align-center">
          {practical.map((step) => (
            <article
              key={step.title}
              className="ic-panel-muted space-y-2 ic-align-center"
            >
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">
                {step.title}
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Fatherhood &amp; Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Children study how you carry pain, handle pressure, and stay grounded.
          They do not need perfect—they need present. Speak honestly with
          restraint and model strength-with-honesty.
        </p>
      </section>
    </ArticleLayout>
  );
}
