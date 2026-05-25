import Link from "next/link";

type DomainCtaProps = {
  centered?: boolean;
};

export default function DomainCta({ centered = false }: DomainCtaProps) {
  return (
    <div className={centered ? "ic-cta-row justify-center" : "ic-cta-row"}>
      <Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
        Start Your Rise
      </Link>
      <Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
        Download Iron Compass AI
      </Link>
    </div>
  );
}
