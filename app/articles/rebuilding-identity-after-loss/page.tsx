import { practicalGuides } from "@/lib/practicalGuides";
import Link from "next/link";
import ArticleLayout from "../components/ArticleLayout";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Rebuilding Identity After Loss: Roles, Standards and Direction",
  description:
    "Rebuild direction after loss through the roles, principles and practical commitments you can still carry. A guide for men starting a changed chapter.",
  path: "/articles/rebuilding-identity-after-loss",
  openGraph: {
    type: "article",
    publishedTime: "2025-11-22",
    modifiedTime: "2026-11-04",
  },
  images: [practicalGuides["/articles/rebuilding-identity-after-loss"].image],
});

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
    link: "/domains/discipline",
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
      intro="Loss can change your roles, routines and sense of direction. Begin with the principles and responsibilities you can still carry, then rebuild a life that has room for what mattered."
      path="/articles/rebuilding-identity-after-loss"
    >
      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">
          How loss can change your sense of self
        </h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          A role can give your week structure and meaning. When loss changes
          that role, you may need time to work out what remains and which
          responsibilities need a different shape. Start with one principle you
          still want your conduct to reflect.
        </p>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Feeling uncertain about your role does not establish a failure of
          character. Name what has changed, what you still value and the next
          commitment you can keep. Explore the{" "}
          <Link href="/domains/identity" className="underline">
            Identity
          </Link>{" "}
          domain.
        </p>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">
          When You Feel Like a Stranger to Yourself
        </h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          There’s a quiet moment when a man realises, “I don’t know who I am
          anymore.” It shows up when you wake up empty, operate on autopilot,
          feel disconnected from your kids, or cannot access old strength. Take
          stock of what has changed without deciding that uncertainty must
          define your future.
        </p>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2 ic-align-center">
          <h2 className="ic-section-heading">
            The Three Identity Break Points
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 ic-align-center">
          {breakPoints.map((point) => (
            <article
              key={point.title}
              className="ic-panel-muted space-y-2 ic-align-center"
            >
              <h3 className="text-sm font-heading tracking-[0.28em] uppercase text-[var(--ic-text-heading)]">
                {point.title}
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                {point.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">
          What Men Get Wrong About Finding Themselves
        </h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          Men think identity returns by taking time off, waiting to feel better,
          numbing pain, or hoping clarity arrives. It doesn’t. Identity is
          rebuilt through action—daily, disciplined action.
        </p>
      </section>

      <section className="ic-panel space-y-6 ic-align-center">
        <div className="space-y-2">
          <h2 className="ic-section-heading">The Iron Compass AI Framework</h2>
          <p className="ic-section-copy ic-section-copy--muted">
            Rebuild yourself with masculine structure:
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 ic-align-center">
          {framework.map((step) => (
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
              {step.link && (
                <Link href={step.link} className="underline text-xs">
                  Explore Discipline
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="ic-panel-outline space-y-4 ic-align-center">
        <h2 className="ic-section-heading">The Fatherhood Layer</h2>
        <p className="ic-section-copy ic-section-copy--muted mx-auto">
          If you’re a dad, identity loss hits different because your children
          still rely on you. You don’t need to be invincible—just honest and
          disciplined. They will copy how you rebuild, stay responsible, carry
          pain, and move forward under weight.
        </p>
      </section>
    </ArticleLayout>
  );
}
