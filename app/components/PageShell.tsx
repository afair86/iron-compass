import type { PropsWithChildren } from "react";

interface PageShellProps extends PropsWithChildren {
  className?: string;
}

export default function PageShell({ children, className }: PageShellProps) {
  return (
    <main className={`ic-page-shell ic-board-page ic-page text-[var(--ic-text-main)]${className ? ` ${className}` : ""}`}>
      {children}
    </main>
  );
}
