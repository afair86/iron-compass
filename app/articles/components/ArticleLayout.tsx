import Link from "next/link";
import type { PropsWithChildren } from "react";
import PageShell from "@/app/components/PageShell";
import PhotoFrame from "@/app/components/brand/PhotoFrame";
import AppValuePanel from "@/app/components/AppValuePanel";
import ArticleSchema from "./ArticleSchema";
import ArticleRelatedLinks from "./ArticleRelatedLinks";
import {
  getGriefArticleByPath,
  getRelatedGriefArticles,
} from "@/lib/articleHubs";
import { practicalGuides } from "@/lib/practicalGuides";
import { absoluteUrl, serializeJsonLd } from "@/lib/site";
import { prepareGuide } from "./guide-content";
import styles from "./practical-guides.module.css";

interface ArticleLayoutProps extends PropsWithChildren {
  eyebrow?: string;
  title: string;
  intro: string;
  path: string;
}

export default function ArticleLayout({
  title,
  intro,
  path,
  children,
}: ArticleLayoutProps) {
  const article = getGriefArticleByPath(path);
  const guide = practicalGuides[path];
  const prepared = prepareGuide(children);
  const minutes = Math.max(1, Math.ceil((prepared.wordCount + 160) / 220));
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Grief and rebuilding guides",
        item: absoluteUrl("/articles"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: absoluteUrl(path),
      },
    ],
  };
  return (
    <PageShell className={styles.page}>
      <ArticleSchema
        title={title}
        description={intro}
        path={path}
        datePublished={article?.datePublished}
        dateModified="2026-11-04"
        image={guide.image}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumb) }}
      />
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/articles">Practical guides</Link>
          <span>/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              {guide.topic} · {minutes} min read
            </p>
            <h1>{title}</h1>
            <p className={styles.lead}>{intro}</p>
            <div className={styles.heroLinks}>
              <a href="#put-into-practice">Start with one action</a>
              <a href="#in-the-app">See how the app supports it</a>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <PhotoFrame
              src={guide.image}
              alt={guide.alt}
              fit="cover"
              position="center top"
              showMark={false}
            />
          </div>
        </header>
        <div className={styles.readingGrid}>
          <nav className={styles.contents} aria-label="In this guide">
            <span className={styles.contentsLabel}>In this guide</span>
            <ol>
              <li>
                <a href="#at-a-glance">The practical starting point</a>
              </li>
              {prepared.contents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href="#put-into-practice">Put this into practice</a>
              </li>
              <li>
                <a href="#in-the-app">Use it in the app</a>
              </li>
            </ol>
          </nav>
          <article className={styles.article} aria-label={`${title} guide`}>
            <section className={styles.answer} aria-labelledby="at-a-glance">
              <h2 id="at-a-glance">The practical starting point</h2>
              <p>{guide.summary}</p>
            </section>
            <div className={styles.body}>{prepared.content}</div>
            <section
              className={styles.practice}
              aria-labelledby="put-into-practice"
            >
              <p className={styles.kicker}>From reading to action</p>
              <h2 id="put-into-practice">Put this into practice</h2>
              <h3>Daily</h3>
              <p>{guide.daily}</p>
              <h3>Weekly</h3>
              <p>{guide.weekly}</p>
              <div className={styles.next}>
                <strong>Your next action</strong>
                <p>{guide.next}</p>
              </div>
            </section>
            <p className={styles.domainLink}>
              <Link href={guide.domainHref}>
                Read the full {guide.domainLabel} guide
              </Link>
            </p>
          </article>
        </div>
        <div id="in-the-app" className={styles.app}>
          <AppValuePanel context={guide.context} />
        </div>
        <ArticleRelatedLinks articles={getRelatedGriefArticles(path)} />
      </div>
    </PageShell>
  );
}
