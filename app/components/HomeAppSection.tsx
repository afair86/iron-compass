import Image from "next/image";
import Link from "next/link";
import styles from "./home-app-section.module.css";

const SCREENS = "/images/get-the-app/screens";

export type HomeAppTileLinks = {
  today: string;
  habits: string;
  journal: string;
  strategy: string;
};

const steps = [
  { title: "Set up in a few minutes.", line: "Rate the ten domains so the app knows where to start." },
  { title: "Keep a few habits and one next action.", line: "Light on hard days, full on normal ones." },
  { title: "Review the week.", line: "AI coaching on Core and Elite." },
];

export default function HomeAppSection({ links }: { links: HomeAppTileLinks }) {
  const tiles = [
    {
      href: links.today,
      plan: "Free",
      title: "Today",
      line: "Your next move for the day, in view.",
      src: `${SCREENS}/today.webp`,
      alt: "Iron Compass app Today screen showing the day's habits and next move",
    },
    {
      href: links.habits,
      plan: "Free",
      title: "Habits",
      line: "Light on hard days, full on normal ones.",
      src: `${SCREENS}/habits-light-or-full.webp`,
      alt: "Iron Compass app habit list with Light and Full check-ins for each habit",
    },
    {
      href: links.journal,
      plan: "Journal Free · AI review Core",
      title: "Journal and AI review",
      line: "Write the day; the coach reads it back.",
      src: `${SCREENS}/coach-read.webp`,
      alt: "Iron Compass AI journal review explaining the week and what it is based on",
    },
    {
      href: links.strategy,
      plan: "Elite",
      title: "90-day plan",
      line: "One measurable aim and a 13-week scoreboard.",
      src: `${SCREENS}/strategy-scoreboard.webp`,
      alt: "Iron Compass 90-day strategy scoreboard with weekly checkpoints",
    },
  ];

  return (
    <section className={styles.section} id="app" aria-labelledby="home-app-heading">
      <div className={styles.split}>
        <div className={styles.phone}>
          <Image
            src={`${SCREENS}/today.webp`}
            alt="The Today screen in the Iron Compass app on a phone"
            width={585}
            height={1266}
            sizes="(min-width: 900px) 260px, 55vw"
          />
        </div>
        <div className={styles.copy}>
          <h2 id="home-app-heading">A habit and discipline app for men who carry a lot</h2>
          <p className={styles.note}>Iron Compass in any browser, on your phone or your desk.</p>
          <p className={styles.lead}>
            Check in on a few habits, write the day down and keep one next action in view. Free to start; the
            planning tools and the AI coach come with Core and Elite.
          </p>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.num} aria-hidden="true">
                  {index + 1}
                </span>
                <span>
                  <strong>{step.title}</strong> {step.line}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <ul className={styles.tiles}>
        {tiles.map((tile) => (
          <li key={tile.title}>
            <Link href={tile.href} className={styles.tile}>
              <span className={styles.shot}>
                <Image src={tile.src} alt={tile.alt} width={585} height={1266} sizes="(min-width: 900px) 260px, 45vw" />
              </span>
              <span className={styles.plan}>{tile.plan}</span>
              <span className={styles.tileTitle}>{tile.title}</span>
              <span className={styles.tileLine}>{tile.line}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className={styles.plans}>
        Free A$0. Core A$19.99 a month or A$199 a year. Elite A$34.99 a month or A$349 a year. On iPhone, Apple
        shows the App Store price. <Link href="/pricing">See plans</Link>
      </p>
    </section>
  );
}
