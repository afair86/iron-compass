import AppValuePanel from "@/app/components/AppValuePanel";
import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import PhotoFrame from "@/app/components/brand/PhotoFrame";
import type { HubArticle, TopicHubLink } from "@/lib/articleHubs";
import { absoluteUrl, serializeJsonLd } from "@/lib/site";
import styles from "./practical-guides.module.css";

type TopicHubViewProps = {
  eyebrow: string;
  title: string;
  description: string;
  domainHref: string;
  domainLabel: string;
  articles?: HubArticle[];
  links?: TopicHubLink[];
  journalLabel?: string;
};
export default function TopicHubView({
  title,
  description,
  domainHref,
  domainLabel,
  articles,
  links,
  journalLabel = "Browse the full journal",
}: TopicHubViewProps) {
  const items = articles ?? links ?? [];
  const finance = domainHref.includes("finance"),
    grief = domainHref.includes("grief");
  const context = finance ? "finance-provision" : grief ? "grief-honour" : "ai";
  const path = finance
    ? "/articles/financial-power"
    : grief
      ? "/articles"
      : "/articles/ai-mastery";
  const photo = finance
    ? {
        src: "/images/domains/editorial/liquidity-rails-automate-bills-buffers-hero.webp",
        alt: "A man smiling as he organises household paperwork in a bright office",
      }
    : grief
      ? {
          src: "/images/domains/grief-bench.webp",
          alt: "A man sitting quietly beside flowers on a park bench",
        }
      : {
          src: "/images/home/scenes/home-ai.webp",
          alt: "A man working with a laptop at a desk",
        };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: title,
        description,
        url: absoluteUrl(path),
      },
      {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl("path" in item ? item.path : item.href),
          name: item.title,
          description: item.description,
        })),
      },
      {
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
            name: title,
            item: absoluteUrl(path),
          },
        ],
      },
    ],
  };
  return (
    <PageShell className={styles.page}>
      <script
        id="practical-guides-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              Practical guides · Read without an account
            </p>
            <h1>{title}</h1>
            <p className={styles.lead}>{description}</p>
            <div className={styles.heroLinks}>
              <a href="#choose-a-guide">Choose a guide</a>
              <Link href={domainHref}>Read {domainLabel}</Link>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <PhotoFrame
              src={photo.src}
              alt={photo.alt}
              fit="cover"
              position="center top"
              showMark={false}
            />
          </div>
        </header>
        <section id="choose-a-guide" className={styles.list}>
          <h2>Find a practical starting point</h2>
          <p>
            Choose the guide that fits what you are carrying. Read the
            explanation, try one useful action, then use the wider domain guide
            to give it a place in your week.
          </p>
          <div className={styles.entries}>
            {items.map((item) => {
              const href = "path" in item ? item.path : item.href;
              return (
                <article className={styles.entry} key={href}>
                  <h3>
                    <Link href={href}>{item.title}</Link>
                  </h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
          {links ? (
            <div className={styles.hubLinks}>
              <Link href="/blog">{journalLabel}</Link>
            </div>
          ) : null}
        </section>
        <div className={styles.app}>
          <AppValuePanel context={context} />
        </div>
        <section className={styles.related}>
          <h2>Explore the practical guides</h2>
          <div className={styles.hubLinks}>
            {path !== "/articles" ? (
              <Link href="/articles">Grief and rebuilding</Link>
            ) : null}
            {path !== "/articles/financial-power" ? (
              <Link href="/articles/financial-power">Money and provision</Link>
            ) : null}
            {path !== "/articles/ai-mastery" ? (
              <Link href="/articles/ai-mastery">Using AI well</Link>
            ) : null}
            <Link href="/domains">The ten life domains</Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
