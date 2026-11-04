import Link from "next/link";
import Image from "next/image";
import { launchFaq } from "@/lib/launchFaq";
import { domainCards } from "@/lib/domains";
import { domainPhotoAlts, domainPhotos, pagePhotoAlts, philosophyPhoto } from "@/lib/sitePhotos";
import FounderNote from "./FounderNote";
import AppLaunchStatus from "./AppLaunchStatus";
import HomeAppSection from "./HomeAppSection";
import PhotoFrame from "./brand/PhotoFrame";
import frameStyles from "./brand/photo-frame.module.css";
import styles from "./approved-home.module.css";

export default function ApprovedHome() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} id="home">
        <Image className={styles.heroPhoto} src="/images/home/horizon-man.png" alt={pagePhotoAlts.homeHero} fill priority sizes="100vw" />
        <div className={styles.heroInner}>
        <div className={styles.banner}>
          <Image className={styles.bannerMark} src="/iron-compass-logo-icon.png" alt="Iron Compass AI" width={150} height={150} />
          <p className={styles.bannerWord}>
            Iron Compass <span>AI</span>
          </p>
          <p className={styles.bannerMotto}>Rise Beyond Limits</p>
        </div>
        <div className={styles.heroCopy}>
          <h1>Discipline for the life you’re responsible for.</h1>
          <p>
            Iron Compass AI is a habit and discipline app for men. Keep a few daily habits, record the day,
            and turn your responsibilities into a clear next action.
          </p>
          <div className="ic-cta-pair">
            <a className="ic-btn-primary" href="/app/auth">
              Start free
            </a>
            <Link className="ic-btn-ghost" href="/download">
              Explore the app
            </Link>
          </div>
          <AppLaunchStatus />
        </div>
        </div>
      </section>

      <section className={`${styles.block} ic-band`} id="domains">
        <h2>Ten life domains</h2>
        <p className={styles.sectionNote}>Where responsibility lives.</p>
        <p className={styles.lead}>
          Your health, your work, your money and the people who depend on you. Explore practical standards
          for each responsibility, with daily actions and a weekly review.
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

      <HomeAppSection links={{ today: "/app", habits: "/domains", journal: "/pricing", strategy: "/pricing" }} />

      <section className={styles.block} id="philosophy">
        <PhotoFrame
          className={styles.philosophyPhoto}
          src={philosophyPhoto}
          alt={pagePhotoAlts.philosophy}
        />
        <h2>The Iron Compass AI philosophy</h2>
        <p className={styles.lead}>
          Iron Compass AI brings practical Stoic principles and modern tools together so you can live with
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
          About the system
        </Link>
      </section>

      <section className={`${styles.block} ic-launch-faq`} aria-labelledby="launch-questions">
        <h2 id="launch-questions">Before you start</h2>
        <div className="ic-launch-faq__answers">
          {launchFaq.map((item) => (
            <div key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
        <Link href="/pricing" className={styles.aboutLink}>Compare Free, Core and Elite</Link>
      </section>

      <FounderNote variant="short" />
    </div>
  );
}
