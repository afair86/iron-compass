import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";

export const metadata = {
  title: "Stoic Grief: Strength Through Loss",
  description:
    "A modern, masculine interpretation of Stoic grief. Learn how to face loss with clarity, discipline, and controlled emotional strength — without collapsing or turning bitter.",
};

const tools = [
  {
    title: "Stillness Before Reaction",
    copy: "Take one breath before speaking, deciding, or lashing out. You stop the emotional avalanche before it starts.",
  },
  {
    title: "Voluntary Discomfort",
    copy: "Cold exposure, training, and disciplined hardship remind you that suffering is survivable.",
  },
  {
    title: "Negative Visualization",
    copy: "Not morbid—grounding. Accept the reality of loss instead of fighting it with rage.",
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
      intro="Grief breaks most men because they were never given a masculine framework for pain. Stoicism offers power without collapse—facing reality directly and choosing a disciplined response."
    >
      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">What Stoicism Actually Says About Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Stoicism is not emotional numbness. It is control. Marcus Aurelius lost children, mentors, and friends, yet wrote about endurance and responsibility, not denial. Stoic grief is about honouring duty even when wounded.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Why Stoic Grief Works for Men</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men need structure. When life feels chaotic, structure becomes sanity. Stoicism delivers clarity, identity, discipline, responsibility, and grounded action—not soft language or healing clichés.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">The Stoic Equation of Grief</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Stoics reduce grief to three truths: something meaningful was lost, the loss is outside your control, and your response determines who you become next. You cannot change the event, but you can shape the man who walks out of it—start with the
          {" "}
          <Link href="/domains/identity-legacy" className="underline">
            Identity &amp; Legacy
          </Link>
          {" "}
          domain.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Pain Remains, You Fortify</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Stoicism does not erase pain. It sharpens you so it cannot break you. Stay steady, calm, responsible, honourable, and in motion—even when grief feels unbearable.
        </p>
      </section>

      <section className="ic-panel space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">Practical Stoic Protocols</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-center">
          {tools.map((tool) => (
            <article key={tool.title} className="ic-panel-muted space-y-2 text-center">
              <h3 className="text-base font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">{tool.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{tool.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Why Stoic Grief Is Not Suppression</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Stoicism says: honour what was lost, stay responsible for what remains, allow pain without bowing to it, and keep walking. That is controlled strength, not emotional avoidance.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 text-center">
        <h2 className="ic-section-heading">Stoicism &amp; Fatherhood</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          If you are grieving while raising kids, Stoicism becomes a leadership tool. They learn how you carry pain, stay honest, and protect them while hurting.
        </p>
      </section>

      <section className="ic-panel text-center space-y-4">
        <h2 className="ic-section-heading">How Iron Compass Helps</h2>
        <p className="ic-section-copy ic-section-copy--muted">
          Iron Compass turns Stoic principles into daily systems: grounding rituals, identity frameworks, masculine reflection prompts, habit anchors, grief stabilisation tools, fatherhood strength protocols, and purpose rebuild structures. Reinforce the work inside the
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
