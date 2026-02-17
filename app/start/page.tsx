import Link from "next/link";
import PageShell from "../components/PageShell";

export const metadata = {
  title: "Start Your Compass | Iron Compass",
  description: "Step into the Iron Compass system with a clear plan: choose your domain, set your direction, and build your daily compass.",
};

const domains = [
  { label: "Strength & Health", href: "/domains/health" },
  { label: "Discipline & Mindset", href: "/domains/discipline-mindset" },
  { label: "Purpose & Direction", href: "/domains/purpose-direction" },
  { label: "Leadership & Character", href: "/domains/leadership-character" },
  { label: "Financial Power", href: "/domains/financial-power" },
  { label: "AI Mastery & Life Optimization", href: "/domains/ai-mastery" },
  { label: "Grief & Honour", href: "/domains/grief-honour" },
  { label: "Identity & Legacy", href: "/domains/identity-legacy" },
];

export default function StartPage() {
  const steps = [
    {
      title: "Choose Your Domain",
      copy: "Decide where you need the most force: discipline, identity, strength, wealth, or another pillar. Focus beats scattered effort.",
    },
    {
      title: "Set Your Direction",
      copy: "Define the target, the metric, and the timeline. Men who win are men who measure.",
    },
    {
      title: "Build Your Daily Compass",
      copy: "Lock in non-negotiables. Track every rep, every rep counts. Your habits become your proof.",
    },
  ];

  return (
    <PageShell>
      <div className="ic-content-stack max-w-3xl">
        <section className="ic-panel text-center space-y-6">
          <h1 className="ic-section-title">Start Your Compass</h1>
          <p className="ic-section-copy ic-section-copy--muted text-base">
            This is the first step. Ground yourself, choose your focus, and move with disciplined intent.
          </p>
          <div className="pt-2">
            <Link href="/download" className="ic-btn-primary text-[0.62rem]">
              Download the App
            </Link>
          </div>
        </section>

        <section className="ic-panel-outline space-y-4">
          <header className="space-y-2 text-center">
            <h2 className="ic-section-heading">Identity → Discipline → Purpose</h2>
          </header>
          <p className="ic-section-copy ic-section-copy--muted">
            Iron Compass begins by confronting who you are, not who you pretend to be. You lock in your identity, shape it with discipline, then
            drive it toward purpose. Every action from here forward is deliberate, measurable, and anchored in mission.
          </p>
        </section>

        <section className="space-y-6 text-center">
          <header className="space-y-2 text-center">
            <h2 className="ic-section-heading">Build Momentum Fast</h2>
          </header>
          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li key={step.title} className="ic-panel-muted flex gap-4 items-start text-left">
                <span className="text-white text-xl font-semibold">{index + 1}</span>
                <div className="space-y-2">
                  <h3 className="text-lg font-heading tracking-[0.3em] uppercase text-[var(--ic-text-heading)]">{step.title}</h3>
                  <p className="ic-section-copy ic-section-copy--muted">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="ic-panel space-y-6 text-center">
          <header className="space-y-2 text-center">
            <h2 className="ic-section-heading text-center">Command Every Pillar</h2>
          </header>
          <div className="grid gap-4">
            {domains.map((domain) => (
              <Link key={domain.href} href={domain.href} className="ic-footer-pill">
                {domain.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="ic-panel text-center space-y-4">
          <h2 className="ic-section-heading text-center">Take Control Now</h2>
          <p className="ic-section-copy ic-section-copy--muted">
            No more drifting. Commit to the process, execute daily, and let the data prove your climb. Your compass is forged in action.
          </p>
          <div className="pt-2">
            <Link href="/download" className="ic-btn-primary text-[0.62rem]">
              Start in the App
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
