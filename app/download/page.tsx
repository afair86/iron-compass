import Link from "next/link";
import PageShell from "../components/PageShell";
import AppLaunchStatus from "../components/AppLaunchStatus";
import { buildPageMetadata, productAppHref } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Get the Iron Compass App | Daily Habits and Discipline",
  description: "Use Iron Compass in your browser today: daily habits, a private journal and practical guides across ten life domains. One account on your phone or computer.",
  path: "/download",
});

export default function DownloadPage() {
  return (
    <PageShell>
      <div className="ic-content-stack">
        <section className="ic-editorial-center space-y-5">
          <h1 className="ic-section-title">Get the Iron Compass app</h1>
          <p className="ic-section-copy">A few daily habits. A private journal. One next action you can carry out.</p>
          <div className="ic-cta-pair">
            <a className="ic-btn-primary" href={`${productAppHref()}/auth`}>Start free in your browser</a>
            <Link className="ic-btn-ghost" href="/pricing">See plans</Link>
          </div>
          <AppLaunchStatus />
        </section>
        <section className="ic-panel-outline space-y-4">
          <h2 className="ic-section-heading">One account, wherever you work</h2>
          <p className="ic-section-copy">Use the web app on your phone or computer. When the iPhone app is available, sign in with the same account to keep your habits, journal and subscription together.</p>
          <h2 className="ic-section-heading">Begin with one responsibility</h2>
          <p className="ic-section-copy">Explore the ten life domains, choose a standard you can keep today, and review what held at the end of the week. The public guides and journal articles are available without an account.</p>
          <div className="ic-cta-pair">
            <Link href="/domains" className="ic-btn-ghost">Explore the domains</Link>
            <Link href="/blog" className="ic-btn-ghost">Read the journal</Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
