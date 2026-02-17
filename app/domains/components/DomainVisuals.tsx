import Link from "next/link";
import { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  tone?: "slate" | "shadow";
  className?: string;
};

type DomainMicroCtaProps = {
  description: string;
  className?: string;
};

type DomainCtaBlockProps = {
  className?: string;
};

type BasicProps = {
  children: ReactNode;
  className?: string;
};

const toneMap = {
  slate: "bg-iron-slate/60",
  shadow: "bg-iron-shadow/60",
};

export function DomainPageLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-iron-matte">
      <div className="max-w-3xl mx-auto px-4 py-16 text-ic-muted leading-relaxed space-y-12 md:space-y-14 ic-measure">
        {children}
      </div>
    </main>
  );
}

export function SectionCard({ children, tone = "slate", className = "" }: SectionCardProps) {
  return (
    <section
      className={`${toneMap[tone]} rounded-2xl border border-iron-frame/15 p-6 space-y-4 backdrop-blur-sm ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export function DomainCallout({ children, className = "" }: BasicProps) {
  return (
    <div className={`border-l-2 border-ic-red pl-4 my-8 text-ic-text ${className}`.trim()}>
      {children}
    </div>
  );
}

export function ListCard({ children, className = "" }: BasicProps) {
  return (
    <div className={`bg-iron-slate/50 rounded-2xl p-4 border border-iron-frame/10 space-y-2 ${className}`.trim()}>
      {children}
    </div>
  );
}

export function LabelChip({ children }: { children: ReactNode }) {
  if (typeof children === "string" && children.trim().toLowerCase() === "iron compass domain") {
    return null;
  }
  return (
    <span className="inline-block text-xs tracking-[0.2em] uppercase text-ic-red mb-2">{children}</span>
  );
}

export function DomainMicroCta({ description, className = "" }: DomainMicroCtaProps) {
  return (
    <div className={`rounded-2xl border border-iron-frame/40 bg-iron-shadow/60 p-4 mt-12 mb-8 space-y-3 ${className}`.trim()}>
      <p className="heading-font text-xs tracking-[0.3em] uppercase text-ic-text">APPLY THIS IN IRON COMPASS</p>
      <p className="text-sm text-ic-muted">{description}</p>
      <Link
        href="/start"
        className="inline-flex text-xs font-semibold tracking-[0.2em] uppercase text-ic-red hover:text-ic-redHover"
      >
        Go to /start
      </Link>
    </div>
  );
}

export function DomainCtaBlock({ className = "" }: DomainCtaBlockProps) {
  return (
    <section
      className={`text-center border border-iron-frame rounded-[32px] bg-iron-card/70 px-8 py-10 glow-neon-blue space-y-4 ${className}`.trim()}
    >
      <h2 className="ic-metallic-h2">Bring This Domain to Life</h2>
      <p className="text-ic-muted">
        Commit to the reps, track your standards, and run the playbooks inside the Iron Compass AI app instead of trying to
        hold it all in your head.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/start"
          className="flex-1 text-center bg-ic-red hover:bg-ic-redHover text-ic-text uppercase tracking-[0.3em] px-6 py-3"
        >
          Start in the Iron Compass AI app
        </Link>
        <Link
          href="/download"
          className="flex-1 text-center border border-ic-red/60 text-ic-text uppercase tracking-[0.3em] px-6 py-3 hover:border-ic-red"
        >
          Download the Iron Compass AI app
        </Link>
      </div>
    </section>
  );
}
