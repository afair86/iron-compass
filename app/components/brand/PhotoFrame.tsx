import { getImageProps } from "next/image";
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
  /** Opt in for known display sizes without changing the existing image box or crop. */
  sizes?: string;
};

export default function PhotoFrame({
  src,
  alt,
  showMark = true,
  className,
  fit,
  position,
  sizes,
}: PhotoFrameProps) {
  const cover = fit === "cover";
  const compact = fit === undefined;
  const scenic = src.startsWith("/images/pages/");
  const resolvedPosition = position ?? (scenic ? "center 65%" : "center top");
  const responsiveImage = sizes && src.startsWith("/")
    ? getImageProps({ src, alt, width: 1440, height: 960, sizes }).props
    : undefined;
  return (
    <figure className={[styles.frame, compact ? styles.compact : "", cover ? styles.frameCover : "", className].filter(Boolean).join(" ")}>
      <img
        src={responsiveImage?.src ?? src}
        srcSet={responsiveImage?.srcSet}
        sizes={responsiveImage?.sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cover ? styles.photoCover : styles.photo}
        style={cover || compact ? { objectPosition: resolvedPosition } : undefined}
      />
      {showMark ? (
        <img src="/images/brand/compass-mark.png" alt="" loading="lazy" decoding="async" className={styles.mark} />
      ) : null}
    </figure>
  );
}
