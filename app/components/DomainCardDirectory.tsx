import Link from "next/link";
import PhotoFrame from "./brand/PhotoFrame";
import styles from "./domain-card-directory.module.css";

type Props = { href:string;title:string;description:string;image:string;imageAlt:string;focus?:string; };
export default function DomainCardDirectory({href,title,description,image,imageAlt}:Props) {
  const titleId=`directory-${href.split("/").pop()}`;
  return <Link href={href} className={styles.card} aria-labelledby={titleId}>
    <div className={styles.media}><PhotoFrame src={image} alt={imageAlt} fit="cover" position="center" className={styles.frame} showMark={false}/></div>
    <div className={styles.copy}><h2 className={styles.title} id={titleId}>{title}</h2><p className={styles.promise}>{description}</p></div>
  </Link>;
}
