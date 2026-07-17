import "@/styles/stoic-dispatch.css";
import Link from "next/link";
import type { HubArticle } from "@/lib/articleHubs";

type ArticleRelatedLinksProps = {
  articles: HubArticle[];
  hubHref?: string;
  hubLabel?: string;
};

export default function ArticleRelatedLinks({
  articles,
  hubHref = "/articles",
  hubLabel = "All grief guides",
}: ArticleRelatedLinksProps) {
  if (articles.length === 0) return null;

  return (
    <section className="ic-panel-stoic ic-align-center space-y-5">
      <div className="space-y-2">
        <p className="ic-eyebrow ic-eyebrow--stoic">Continue Reading</p>
        <h2 className="ic-section-heading">Related Guides</h2>
        <div className="ic-stoic-rule ic-stoic-rule--inline" aria-hidden="true" />
        <p className="ic-section-copy ic-section-copy--muted text-sm">
          Each guide stands alone but connects to the rest of the series.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.path} className="ic-stoic-card space-y-2">
            <Link href={article.path} className="ic-stoic-card__title">
              {article.title}
            </Link>
            <p className="ic-section-copy ic-section-copy--muted text-sm">{article.description}</p>
          </article>
        ))}
      </div>
      <p className="ic-section-copy text-sm">
        <Link href={hubHref} className="underline underline-offset-4 hover:text-[var(--ic-text-heading)]">
          {hubLabel}
        </Link>
        {" · "}
        <Link href="/domains/grief-honour" className="underline underline-offset-4 hover:text-[var(--ic-text-heading)]">
          Grief &amp; Honour domain
        </Link>
      </p>
    </section>
  );
}
