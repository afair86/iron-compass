import Link from "next/link";
import type { HubArticle } from "@/lib/articleHubs";
import styles from "./practical-guides.module.css";
export default function ArticleRelatedLinks({
  articles,
  hubHref = "/articles",
  hubLabel = "All grief and rebuilding guides",
}: {
  articles: HubArticle[];
  hubHref?: string;
  hubLabel?: string;
}) {
  if (!articles.length) return null;
  return (
    <section className={styles.related}>
      <h2>Keep reading</h2>
      <p>Choose the guide that fits the responsibility in front of you.</p>
      <div className={styles.entries}>
        {articles.map((article) => (
          <article className={styles.entry} key={article.path}>
            <h3>
              <Link href={article.path}>{article.title}</Link>
            </h3>
            <p>{article.description}</p>
          </article>
        ))}
      </div>
      <div className={styles.hubLinks}>
        <Link href={hubHref}>{hubLabel}</Link>
        <Link href="/domains/fall-rise">Rebuilding after major setbacks</Link>
        <Link href="/domains/grief-honour">Grief & Honour</Link>
      </div>
    </section>
  );
}
