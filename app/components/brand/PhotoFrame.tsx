import styles from "./photo-frame.module.css";

type PhotoFrameProps = {
  src: string;
  alt: string;
  /** Turn off when the photograph already contains the compass. */
  showMark?: boolean;
  className?: string;
  /** Cover fills the frame. Contain keeps the whole picture, used by small thumbs. */
  fit?: "contain" | "cover";
  /** Where the subject sits when the picture is cropped. */
  position?: string;
};

export default function PhotoFrame({
  src,
  alt,
  showMark = true,
  className,
  fit = "contain",
  position = "center 30%",
}: PhotoFrameProps) {
  const cover = fit === "cover";
  return (
    <figure className={[styles.frame, cover ? styles.frameCover : "", className].filter(Boolean).join(" ")}>
      <img
        src={src}
        alt={alt}
        className={cover ? styles.photoCover : styles.photo}
        style={cover ? { objectPosition: position } : undefined}
      />
      {showMark ? (
        <img src="/images/brand/compass-mark.png" alt="" className={styles.mark} />
      ) : null}
    </figure>
  );
}
