import styles from "./photo-frame.module.css";

type PhotoFrameProps = {
  src: string;
  alt: string;
  /** Turn off when the photograph already contains the compass. */
  showMark?: boolean;
  className?: string;
  /** Defaults to a compact editorial crop. Explicit cover fills its parent; contain keeps the whole picture. */
  fit?: "contain" | "cover";
  /** Where the subject sits when the picture is cropped. */
  position?: string;
};

export default function PhotoFrame({
  src,
  alt,
  showMark = true,
  className,
  fit,
  position,
}: PhotoFrameProps) {
  const cover = fit === "cover";
  const compact = fit === undefined;
  const scenic = src.startsWith("/images/pages/");
  const resolvedPosition = position ?? (scenic ? "center 65%" : "center top");
  return (
    <figure className={[styles.frame, compact ? styles.compact : "", cover ? styles.frameCover : "", className].filter(Boolean).join(" ")}>
      <img
        src={src}
        alt={alt}
        className={cover ? styles.photoCover : styles.photo}
        style={cover || compact ? { objectPosition: resolvedPosition } : undefined}
      />
      {showMark ? (
        <img src="/images/brand/compass-mark.png" alt="" className={styles.mark} />
      ) : null}
    </figure>
  );
}
