import type { PropsWithChildren } from "react";
import PageShell from "@/app/components/PageShell";

interface ArticleLayoutProps extends PropsWithChildren {
  eyebrow?: string;
  title: string;
  intro: string;
}

export default function ArticleLayout({ eyebrow = "Iron Compass Articles", title, intro, children }: ArticleLayoutProps) {
  return (
    <PageShell className="bg-[var(--ic-page-bg-alt)]">
      <article className="ic-content-stack ic-content-wide px-4 py-16 space-y-10 text-[var(--ic-text-main)]">
        <header className="ic-panel ic-panel--hero ic-panel--glow text-center space-y-4">
          {eyebrow ? <p className="ic-eyebrow">{eyebrow}</p> : null}
          <h1 className="ic-section-title text-[clamp(2.4rem,5vw,3.6rem)]">{title}</h1>
          <p className="ic-section-subhead text-[var(--ic-text-heading)] opacity-90">{intro}</p>
        </header>
        <div className="space-y-8">{children}</div>
      </article>
    </PageShell>
  );
}
