import Link from "next/link";
import { ReactNode } from "react";

export type Domain = {
  title: string;
  desc: string;
  icon: ReactNode;
  href?: string;
  slug?: string;
};

export default function DomainCard({ title, desc, icon, href, slug }: Domain) {
  const baseClasses = "ic-domain-card flex flex-col items-center ic-align-center gap-4";

  const content = (
    <>
      <div aria-hidden className="ic-domain-icon">{icon}</div>
      <h3 className="font-heading uppercase tracking-[0.32em] text-[var(--ic-text-heading)]">{title}</h3>
      <div className="ic-domain-accent-line" aria-hidden="true" />
      <p className="text-sm leading-relaxed max-w-sm">{desc}</p>
    </>
  );

  if (!href) {
    return (
      <div className={baseClasses} data-domain={slug}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ic-cta-red)]`}
      data-domain={slug}
    >
      {content}
    </Link>
  );
}
