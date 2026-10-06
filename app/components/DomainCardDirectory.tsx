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
  return (
    <Link href={href} className={styles.card}>
      <span className={styles.media}>
        <PhotoFrame src={image} alt={imageAlt} fit="cover" position={focus ?? "center 28%"} className={styles.frame} />
      </span>
      <span className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.promise}>{description}</span>
      </span>
    </Link>
  );
}
