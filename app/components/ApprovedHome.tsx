import Link from "next/link";
import { domainCards } from "@/lib/domains";
import { domainPhotos, philosophyPhoto } from "@/lib/sitePhotos";
import PhotoFrame from "./brand/PhotoFrame";
import frameStyles from "./brand/photo-frame.module.css";
import styles from "./approved-home.module.css";

const domainTitles: Record<(typeof domainCards)[number]["slug"], string> = {
  health: "Strength & Health",
  "discipline-mindset": "Discipline & Mindset",
  "purpose-direction": "Purpose & Direction",
  "leadership-character": "Leadership & Character",
  "financial-power": "Financial Power",
  "ai-mastery": "AI Mastery & Life Optimization",
  "grief-honour": "Grief & Honour",
  "identity-legacy": "Identity & Legacy",
};

export default function ApprovedHome() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} id="home">
        <div className={styles.banner}>
          <img className={styles.heroPhoto} src="/images/home/horizon-man.png" alt="" />
          <img className={styles.bannerMark} src="/images/brand/compass-mark.png" alt="Iron Compass" />
          <p className={styles.bannerWord}>
            Iron Compass <span>AI</span>
          </p>
          <h1>Rise Beyond Limits</h1>
          <p className={styles.bannerScript}>A better tomorrow.</p>
        </div>
        <div className={styles.heroCopy}>
          <p>
            Iron Compass AI helps men build strength, discipline and character—in the ordinary moments that
            shape their lives.
          </p>
          <p>Explore the eight domains and our journal for practical ideas you can put to work in your own life.</p>
          <Link className={styles.journey} href="/domains">
            Explore the domains <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.textLink} href="/blog">
            Read the journal
          </Link>
        </div>
      </section>

      <section className={styles.block} id="domains">
        <p className={styles.kicker}>The eight domains</p>
        <h2>Forge every dimension</h2>
        <p className={styles.lead}>
          A complete, disciplined life requires mastery across Strength, Discipline and Mindset, Purpose and
          Direction, Leadership and Character, Financial Power, AI Mastery and Life Optimization, Grief and
          Honour, and Identity and Legacy.
        </p>
        <div className={styles.domainGrid}>
          {domainCards.map((domain) => (
            <article key={domain.slug} className={styles.domain}>
              <PhotoFrame className={frameStyles.thumb} src={domainPhotos[domain.slug]} alt="" />
              <div>
                <h3>
                  <Link href={domain.href}>{domainTitles[domain.slug]}</Link>
                </h3>
                <p>{domain.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.block} id="philosophy">
        <PhotoFrame
          className={styles.philosophyPhoto}
          src={philosophyPhoto}
          alt="A man resting on his back step at dusk, content after the day"
        />
        <h2>The Iron Compass philosophy</h2>
        <p className={styles.lead}>
          Iron Compass brings practical Stoic principles and modern tools together to help men live with
          purpose, take responsibility and become people others can rely on. Discipline, strength, purpose,
          leadership, money, and leverage, held together by structure you can run on a bad day.
        </p>
        <p className={styles.lead}>
          The website sets the framework. The app and toolkit handle execution: daily anchors, reviews, and
          proof that your behaviour matches what you claim to stand for.
        </p>
        <p className={styles.lead}>
          No manifestos. No motivation loops. Just clear domains, practical standards, and the work of
          becoming reliable.
        </p>
        <Link className={styles.journey} href="/about">
          About the system <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
