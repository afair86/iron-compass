import styles from "./photo-frame.module.css";

type PhotoFrameProps = {
  src: string;
  alt: string;
  /** Turn off when the photograph already contains the compass. */
  showMark?: boolean;
  className?: string;
};

export default function PhotoFrame({ src, alt, showMark = true, className }: PhotoFrameProps) {
  return (
    <figure className={[styles.frame, className].filter(Boolean).join(" ")}>
      <img src={src} alt={alt} className={styles.photo} />
      {showMark ? <img src="/images/brand/compass-mark.png" alt="" className={styles.mark} /> : null}
    </figure>
  );
}
