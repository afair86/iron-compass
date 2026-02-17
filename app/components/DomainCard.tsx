import Link from "next/link";
import { ReactNode } from "react";

export type Domain = {
  title: string;
  desc: string;
  icon: ReactNode;
  href?: string;
};

export default function DomainCard({ title, desc, icon, href }: Domain) {
  const baseClasses = "ic-domain-card flex flex-col items-center text-center gap-4";

  const content = (
    <>
      <div aria-hidden className="h-14 w-14 flex items-center justify-center text-[var(--ic-text-heading)]">{icon}</div>
      <h3 className="font-heading uppercase tracking-[0.32em] text-[var(--ic-text-heading)]">{title}</h3>
      <div className="w-12 h-[2px] bg-[var(--ic-accent-blue)] shadow-[0_0_18px_rgba(0,160,255,0.45)]" />
      <p className="text-sm leading-relaxed max-w-sm">{desc}</p>
    </>
  );

  if (!href) {
    return <div className={baseClasses}>{content}</div>;
  }

  return (
    <Link href={href} className={`${baseClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ic-cta-red)]`}>
      {content}
    </Link>
  );
}
