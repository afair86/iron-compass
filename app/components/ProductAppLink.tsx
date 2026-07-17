import Link from "next/link";
import { productAppHref } from "@/lib/site";

type ProductAppLinkProps = {
  className?: string;
  children: React.ReactNode;
};

/** Link to the product web app (`/app` or `NEXT_PUBLIC_PRODUCT_APP_URL`). */
export default function ProductAppLink({ className, children }: ProductAppLinkProps) {
  const href = productAppHref();
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} className={className} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
