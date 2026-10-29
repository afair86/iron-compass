import Link from "next/link";
import PhotoFrame from "./brand/PhotoFrame";
import styles from "./domain-card-directory.module.css";

type Props = {
  href: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  focus?: string;
};

export default function DomainCardDirectory({ href, title, description, image, imageAlt, focus }: Props) {
  const titleId = `directory-${href.split("/").pop()}`;
  return (
    <Link href={href} className={styles.card} aria-labelledby={titleId}>
      <span className={styles.media}>
        <PhotoFrame src={image} alt={imageAlt} fit="cover" position={focus ?? "center 28%"} className={styles.frame} />
        <h2 className={styles.title} id={titleId}>{title}</h2>
      </span>
      <span className={styles.promise}>{description}</span>
    </Link>
  );
}
