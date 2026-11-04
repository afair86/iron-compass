import fs from "fs";
import path from "path";
import Link from "next/link";
import "@/styles/stoic-dispatch.css";
import PageShell from "@/app/components/PageShell";
import ArticleListenButton from "@/app/components/ArticleListenButton";
import type { DomainNarrative } from "../narratives/types";
import { domainContentMap, type DomainSlug } from "../content";
import PhotoFrame from "@/app/components/brand/PhotoFrame";
import { domainBlogLinks } from "@/lib/domainBlogLinks";
import { aiResourcePhoto, domainPhotoAlts, domainPhotos } from "@/lib/sitePhotos";
import styles from "./domain-story.module.css";
import DomainAppSection from "./DomainAppSection";

type DomainPageViewProps = {
  narrative: DomainNarrative;
  slug: DomainSlug;
};

function speechText(narrative: DomainNarrative) {
  return [
    narrative.h1Title,
    narrative.heroDescription,
    ...narrative.opening,
    ...narrative.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    narrative.practice.heading,
    narrative.practice.lead,
    ...narrative.practice.steps,
    "Take it further with Iron Compass AI",
    ...narrative.further,
  ].join(" ");
}

export default function DomainPageView({ narrative, slug }: DomainPageViewProps) {
  const journalLinks = domainBlogLinks[slug];
  const domain = domainContentMap[slug];
  const photo =
    slug === "ai-mastery"
      ? { src: aiResourcePhoto, alt: "A real desk where a man uses a tool and keeps the decision" }
      : { src: domainPhotos[slug], alt: domainPhotoAlts[slug] };
  const audioAbs = path.join(process.cwd(), "public", "audio", "domains", `${slug}.mp3`);
  const audioSrc = narrative.listenAudio !== false && fs.existsSync(audioAbs) ? `/audio/domains/${slug}.mp3` : undefined;
  const lead = narrative.sections[0];
  const rest = narrative.sections.slice(1);
  const sidePhoto = lead?.image ?? photo;
  const guideWords = speechText(narrative).split(/\s+/).length;
  const readMinutes = Math.max(1, Math.ceil(guideWords / 220));
  const contents = [
    ...(lead ? [{ id: lead.key, label: lead.heading }] : []),
    { id: "practice", label: narrative.practice.heading },
    ...rest.map((section) => ({ id: section.key, label: section.heading })),
    { id: "in-the-app", label: "Use it in the app" },
  ];

  return (
    <PageShell>
      <div className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href="/domains">Life domains</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{narrative.h1Title}</span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>A practical guide · {readMinutes} min read</span>
            <h1>{narrative.h1Title}</h1>
            <p>{narrative.heroDescription}</p>
            <div className={styles.heroLinks}>
              <a href="#practice">Start with one action <span aria-hidden="true">↓</span></a>
              <a href="#in-the-app">See how the app supports it <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <PhotoFrame src={photo.src} alt={photo.alt} fit="cover" position="center top" showMark={false} />
          </div>
        </header>

        <div className={styles.readingGrid}>
          <nav className={styles.contents} aria-label="In this guide">
            <span className={styles.contentsLabel}>In this guide</span>
            <ol>{contents.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol>
          </nav>
          <article className={styles.article} aria-label={`${narrative.h1Title} guide`}>
        <section className={styles.intro}>
          <div className={styles.copy}>
            {narrative.opening.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {lead ? (
              <>
                <h2 id={lead.key}>{lead.heading}</h2>
                {lead.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </>
            ) : null}
            {audioSrc ? (
              <div className={styles.listen}>
                <ArticleListenButton
                  title={narrative.h1Title}
                  text={speechText(narrative)}
                  audioSrc={audioSrc}
                  audioVersion="christopher-domain-v1"
                  subtle
                  hint="Prefer to hear it?"
                />
              </div>
            ) : null}
          </div>
          {lead?.image ? <div className={styles.photo}>
            <PhotoFrame src={sidePhoto.src} alt={sidePhoto.alt} fit="cover" position="center top" />
          </div> : null}
        </section>

        <section className={styles.practice} aria-labelledby="practice">
          <div>
            <span className={styles.kicker}>From reading to action</span>
            <h2 id="practice">{narrative.practice.heading}</h2>
            <p className={styles.copy}>{narrative.practice.lead}</p>
            <ol className={styles.steps}>
              {narrative.practice.steps.map((step, index) => (
                <li key={step.slice(0, 40)}>
                  <span className={styles.num}>{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.quote}>
            <p>{narrative.heroDescription}</p>
          </div>
        </section>

        {rest.map((section) => (
          <section key={section.key} className={styles.block}>
            <h2 id={section.key}>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            {section.image ? (
              <div className={styles.photo}>
                <PhotoFrame src={section.image.src} alt={section.image.alt} fit="cover" position="center top" />
              </div>
            ) : null}
          </section>
        ))}

        <section className={styles.block}>
          <h2>Take it further with Iron Compass AI</h2>
          {narrative.further.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
          </article>
        </div>

        <div id="in-the-app" className={styles.appSection}>
        <DomainAppSection slug={slug} title={narrative.h1Title} />
        </div>

        <section className={styles.block}>
          <h2>Keep going</h2>
          <p>
            <Link href={domain.companionLink.href}>{domain.companionLink.label}</Link>
            {" — "}
            {domain.companionLink.description}
          </p>
          {journalLinks.map((link) => (
            <p key={link.href}>
              <Link href={link.href}>{link.title}</Link>
              {" — "}
              {link.description}
            </p>
          ))}
          <p>
            <Link href="/domains">All domains</Link>
            {" · "}
            <Link href="/blog">The journal</Link>
          </p>
        </section>
      </div>
    </PageShell>
  );
}

