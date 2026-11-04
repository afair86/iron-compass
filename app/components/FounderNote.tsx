import Link from "next/link";
import Image from "next/image";
import styles from "./founder-note.module.css";

const FULL_FIRST = "Iron Compass AI started in the hardest stretch of my life.";
const FULL_REST =
  " After my divorce, losing my business and losing time with my kids, I used AI to work through it, one question at a time. Stoicism became the backbone: steadiness of mind, doing the next right thing, and owning what's mine to own. The same research changed my body too. I'd always trained in the gym, but I went from doing no cardio to running two marathons, a half-Ironman-distance triathlon and two Olympic-distance triathlons, and I still lift and train for strength. I've evolved into a hybrid, functional dad. I'm still learning every day, and I'm nowhere near perfect, but I keep taking small steps to get better. That's what Iron Compass AI is. I still use it every day, trying to be the dad my kids can be proud of, and I built it for men carrying something heavy who want to keep going.";

const SHORT =
  "I built Iron Compass AI during the hardest stretch of my life, using AI, Stoicism and training to work out what to do next. I still use it every day to keep showing up for my kids and the responsibilities I carry.";

const SIGN_OFF = "— Adam, founder";

/** The founder's own words, approved verbatim. Do not edit the text without his sign-off. */
export default function FounderNote({
  variant,
}: {
  variant: "full" | "short";
}) {
  const full = variant === "full";
  return (
    <section
      className={`${styles.section} ${full ? styles.full : styles.short}`}
      aria-labelledby={`founder-${variant}`}
    >
      <h2 id={`founder-${variant}`} className={styles.heading}>
        {full ? "Why I built Iron Compass AI" : "From the founder"}
      </h2>
      <div className={styles.layout}>
        <figure className={styles.photo}>
          {full ? (
            <Image
              src="/images/get-the-app/adam-family-about.webp"
              alt="Adam, founder of Iron Compass AI, with his two children outdoors at sunset"
              width={1600}
              height={1200}
              sizes="(min-width: 900px) 440px, 90vw"
            />
          ) : (
            <Link href="/about#founder-full">
              <Image
                src="/images/get-the-app/adam-family-home.webp"
                alt="Adam with his children — read why he built Iron Compass AI"
                width={480}
                height={480}
                sizes="(min-width: 640px) 160px, 112px"
              />
            </Link>
          )}
          {full ? (
            <figcaption>
              Adam, founder of Iron Compass AI, with his children.
            </figcaption>
          ) : null}
        </figure>
        <div className={styles.body}>
          <p>
            {full ? (
              <>
                <strong>{FULL_FIRST}</strong>
                {FULL_REST}
              </>
            ) : (
              SHORT
            )}
          </p>
          <p className={styles.signOff}>{SIGN_OFF}</p>
          {full ? null : (
            <Link href="/about#founder-full" className={styles.more}>
              Why I built Iron Compass AI
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
