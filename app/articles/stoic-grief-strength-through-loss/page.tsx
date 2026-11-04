import { practicalGuides } from "@/lib/practicalGuides";
import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Stoic Grief: Principles for Carrying Loss",
  description:
    "Use Stoic principles to guide your conduct through loss. Practical reflection, remembrance and daily responsibilities without demanding emotional numbness.",
  path: "/articles/stoic-grief-strength-through-loss",
  openGraph: {
    type: "article",
    publishedTime: "2025-11-15",
    modifiedTime: "2026-11-04",
  },
  images: [
    practicalGuides["/articles/stoic-grief-strength-through-loss"].image,
  ],
});

const tools = [
  {
    title: "Stillness Before Reaction",
    copy: "Pause before a consequential reply or decision. Give yourself time to choose how you want to act.",
  },
  {
    title: "A manageable daily anchor",
    copy: "Choose an ordinary action you can repeat, such as a short walk or preparing a meal. Hardship is not a requirement for honouring a loss.",
  },
  {
    title: "Recognise the facts",
    copy: "Write what has happened and what needs attention now. Do not force yourself to rehearse further losses.",
  },
  {
    title: "Daily Reflection",
    copy: 'Simple statements: "This is what happened." "This is who I will be today."',
  },
  {
    title: "Virtue Over Emotion",
    copy: "Choose decisions rooted in character, not chaos. Response over reaction.",
  },
];

export default function ArticlePage() {
  return (
    <ArticleLayout
      title="Stoic Grief: Strength Through Loss"
      intro="Stoic principles can guide your conduct while you carry loss. Face the facts, make room for remembrance and choose a fair, useful action without demanding that you stop feeling grief."
      path="/articles/stoic-grief-strength-through-loss"
    >
      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">
          What Stoicism Actually Says About Grief
        </h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Stoic practice asks you to examine your judgements and choose your
          conduct with care. Applied to grief, that means attending to what you
          can do while making room for loss, remembrance and help. It does not
          require emotional numbness.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">
          Using Stoic principles in the day
        </h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          A small structure can give practical decisions a place when life is
          uncertain. Use wisdom, courage, justice and temperance as questions
          about your next action. Avoid turning discipline into a demand to hide
          what you are carrying.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">A Stoic starting point</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          A practical Stoic starting point is to recognise the loss, distinguish
          what you can change and consider your next response. This is a
          framework for conduct, not a formula that resolves grief. Revisit the{" "}
          <Link href="/domains/identity" className="underline">
            Identity
          </Link>{" "}
          domain.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Pain Remains, You Fortify</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Stoic practice does not erase loss or make anyone invulnerable. Use it
          to keep your conduct aligned with your principles, while allowing
          time, remembrance and support to have their place.
        </p>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">Practical Stoic Protocols</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 ic-align-center">
          {tools.map((tool) => (
            <article
              key={tool.title}
              className="ic-panel-muted space-y-2 ic-align-center"
            >
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">
                {tool.title}
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                {tool.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">
          Why Stoic Grief Is Not Suppression
        </h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          An application of Stoic principles is to honour what mattered and meet
          the responsibilities you can still carry. Use reflection to choose
          your actions, without making the absence of feeling a test of
          strength.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">Stoicism &amp; Fatherhood</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          If you are grieving while raising kids, Stoicism becomes a leadership
          tool. They learn how you carry pain, stay honest, and protect them
          while hurting.
        </p>
      </section>
    </ArticleLayout>
  );
}
