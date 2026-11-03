import Link from "next/link";
import { domainCards } from "@/lib/domains";
import { domainPhotoAlts, domainPhotos, pagePhotoAlts, philosophyPhoto } from "@/lib/sitePhotos";
import FounderNote from "./FounderNote";
import HomeAppSection from "./HomeAppSection";
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
          <p className={styles.appLine}>
            The Iron Compass app turns it into a daily practice: a few habits, a journal and one next action.
          </p>
          <div className="ic-cta-pair">
            <a className="ic-btn-primary" href="/app/auth">
              Start free
            </a>
            <Link className="ic-btn-ghost" href="/pricing">
              See plans
            </Link>
          </div>
        </div>
      </section>

      <HomeAppSection links={{ today: "/app", habits: "/domains", journal: "/pricing", strategy: "/pricing" }} />

      <section className={`${styles.block} ic-band`} id="domains">
        <h2>Ten life domains</h2>
        <p className={styles.sectionNote}>Where responsibility lives.</p>
        <p className={styles.lead}>
          Discipline, identity, health, the people who depend on you, the work, the money, the load, the return
          after a miss, grief, and what remains. Awareness, pressure, and strategy are how the system helps. They
          are not extra domains.
        </p>
        <p className={styles.lead}>Each domain has its own habits and a step-by-step guide in the app.</p>
        <div className={styles.domainGrid}>
          {domainCards.map((domain) => (
            <Link
              key={domain.slug}
              href={domain.href}
              className={styles.domain}
              aria-labelledby={`home-domain-${domain.slug}`}
            >
              <PhotoFrame className={frameStyles.thumb} src={domainPhotos[domain.slug]} alt={domainPhotoAlts[domain.slug]} />
              <div>
                <h3 id={`home-domain-${domain.slug}`}>{domain.title}</h3>
                <p>{domain.desc}</p>
              </div>
            </Link>
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
        <Link className={styles.aboutLink} href="/about">
          About the system <span aria-hidden="true">→</span>
        </Link>
      </section>

      <FounderNote variant="short" />
    </div>
  );
}
