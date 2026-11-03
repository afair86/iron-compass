import Image from "next/image";
import Link from "next/link";
import { domainAppFeatures } from "@/lib/domainAppFeatures";
import { productAppHref } from "@/lib/site";
import styles from "./domain-app-section.module.css";

export default function DomainAppSection({ slug, title }: { slug: string; title: string }) {
  const features = domainAppFeatures[slug];
  if (!features) return null;
  const app = productAppHref();
  return (
    <section className={`${styles.section} ic-band`} aria-labelledby={`in-the-app-${slug}`} data-centre>
      <h2 id={`in-the-app-${slug}`} className={styles.heading}>
        {title} in the Iron Compass app
      </h2>
      <p className={styles.sub}>Habits for this domain, a practical guide and a tool to keep it going.</p>
      <ul className={styles.lines}>
        {features.lines.map((line) => (
          <li key={line.text}>
            <span className={styles.plan} data-plan={line.plan}>
              {line.plan}
            </span>
            <span>{line.text}</span>
          </li>
        ))}
      </ul>
      {features.shots.length > 0 ? (
      <ul className={styles.gallery} aria-label={`${title} screens in the Iron Compass app`}>
        {features.shots.map((shot) => (
          <li key={shot.src} className={styles.phone}>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 900px) 300px, 68vw"
            />
          </li>
        ))}
      </ul>
      ) : null}
      <div className="ic-cta-pair">
        <a className="ic-btn-primary" href={`${app}/auth`}>
          Start free
        </a>
        <Link className="ic-btn-ghost" href="/pricing">
          See plans
        </Link>
      </div>
      <p className={styles.deep}>
        Already a member? <a href={`${app}/domains/${slug}`}>Open {title} in the app</a>
      </p>
    </section>
  );
}
