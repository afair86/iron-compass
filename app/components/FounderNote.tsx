import Link from "next/link";
import styles from "./founder-note.module.css";

const FULL_FIRST = "Iron Compass AI started in the hardest stretch of my life.";
const FULL_REST =
  " After my divorce, losing my business and losing time with my kids, I used AI to work through it, one question at a time. Stoicism became the backbone: steadiness of mind, doing the next right thing, and owning what's mine to own. The same research changed my body too. I'd always trained in the gym, but I went from doing no cardio to running two marathons, a half-Ironman-distance triathlon and two Olympic-distance triathlons, and I still lift and train for strength. I've evolved into a hybrid, functional dad. I'm still learning every day, and I'm nowhere near perfect, but I keep taking small steps to get better. That's what Iron Compass is. I still use it every day, trying to be the dad my kids can be proud of, and I built it for men carrying something heavy who want to keep going.";

const SHORT =
  "After my divorce, losing my business and losing time with my kids, I rebuilt myself one question at a time, with AI, Stoicism and training. I went from no cardio to two marathons and three triathlons, and I still lift. I'm nowhere near perfect, and I'm still learning every day, but I keep taking small steps to get better. That's what Iron Compass is. I use it every day to be the dad my kids can be proud of.";

const SIGN_OFF = "— Adam, founder";

/** The founder's own words, approved verbatim. Do not edit the text without his sign-off. */
export default function FounderNote({ variant }: { variant: "full" | "short" }) {
  const full = variant === "full";
  return (
    <section className={styles.section} aria-labelledby={`founder-${variant}`}>
      <h2 id={`founder-${variant}`} className={styles.heading}>
        {full ? "Why I built Iron Compass" : "Why Iron Compass exists"}
      </h2>
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
          <Link href="/about" className={styles.more}>
            Read the full story
          </Link>
        )}
      </div>
    </section>
  );
}
