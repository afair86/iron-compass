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
    "Take it further with Iron Compass",
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
  const audioSrc = fs.existsSync(audioAbs) ? `/audio/domains/${slug}.mp3` : undefined;
  const lead = narrative.sections[0];
  const rest = narrative.sections.slice(1);
  const sidePhoto = lead?.image ?? photo;

  return (
    <PageShell>
      <div className={styles.page}>
        <header className="ic-board-hero">
          <div className="ic-board-hero__media">
            <PhotoFrame src={photo.src} alt={photo.alt} fit="cover" position="center top" />
          </div>
          <div className="ic-board-hero__copy space-y-4">
            <h1 className="ic-page-title">{narrative.h1Title}</h1>
            <p className="ic-section-copy">{narrative.heroDescription}</p>
          </div>
        </header>

        <section className={styles.split}>
          <div className={styles.copy}>
            {narrative.opening.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {lead ? (
              <>
                <h2>{lead.heading}</h2>
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
          <div className={styles.photo}>
            <PhotoFrame src={sidePhoto.src} alt={sidePhoto.alt} fit="cover" position="center top" />
          </div>
        </section>

        <section className={styles.practice}>
          <div>
            <h2>{narrative.practice.heading}</h2>
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
            <PhotoFrame src={photo.src} alt="" fit="cover" position="center top" showMark={false} />
            <p>{narrative.heroDescription}</p>
          </div>
        </section>

        {rest.map((section) => (
          <section key={section.key} className={styles.block}>
            <h2>{section.heading}</h2>
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
          <h2>Take it further with Iron Compass</h2>
          {narrative.further.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>

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

