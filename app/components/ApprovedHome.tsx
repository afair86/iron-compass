import Link from "next/link";
import { domainCards } from "@/lib/domains";
import { domainPhotoAlts, domainPhotos, pagePhotoAlts, philosophyPhoto } from "@/lib/sitePhotos";
import PhotoFrame from "./brand/PhotoFrame";
import frameStyles from "./brand/photo-frame.module.css";
import styles from "./approved-home.module.css";

export default function ApprovedHome() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} id="home">
        <div className={styles.banner}>
          <img className={styles.heroPhoto} src="/images/home/horizon-man.png" alt={pagePhotoAlts.homeHero} />
          <img className={styles.bannerMark} src="/iron-compass-logo-icon.png" alt="Iron Compass" />
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
          <p>The ten domains are where responsibility lives. The journal shows how that looks in a real week.</p>
          <Link className={styles.journey} href="/domains">
            Explore the domains <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.textLink} href="/blog">
            Read the journal
          </Link>
        </div>
      </section>

      <section className={styles.block} id="domains">
        <p className={styles.kicker}>Ten life domains</p>
        <h2>Where responsibility lives</h2>
        <p className={styles.lead}>
          Discipline, identity, health, the people who depend on you, the work, the money, the load, the return
          after a miss, grief, and what remains. Awareness, pressure, and strategy are how the system helps. They
          are not extra domains.
        </p>
        <div className={styles.domainGrid}>
          {domainCards.map((domain) => (
            <article key={domain.slug} className={styles.domain}>
              <PhotoFrame className={frameStyles.thumb} src={domainPhotos[domain.slug]} alt={domainPhotoAlts[domain.slug]} />
              <div>
                <h3>
                  <Link href={domain.href}>{domain.title}</Link>
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
          alt={pagePhotoAlts.philosophy}
        />
        <h2>The Iron Compass philosophy</h2>
        <p className={styles.lead}>
          Iron Compass brings practical Stoic principles and modern tools together so you can live with
          purpose, take responsibility, and be someone others can rely on. The domains hold the responsibilities.
          The system shows what needs attention.
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
