import type { JSX } from "react";
import { PropsWithChildren } from "react";

type Width = "narrow" | "regular" | "wide";

type PageContainerProps = PropsWithChildren<{
  width?: Width;
  className?: string;
}>;

type SectionShellProps = PropsWithChildren<{
  variant?: "panel" | "muted" | "outline" | "hero" | "contrast" | "warm";
  align?: "center" | "start";
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}>;

type HeadingStackProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  center?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  description?: string;
  accent?: "blue" | "red" | "gold" | "violet" | "teal" | "cyan";
}>;

const widthMap: Record<Width, string> = {
  narrow: "ic-content-stack ic-content-narrow",
  regular: "ic-content-stack",
  wide: "ic-content-stack ic-content-wide",
};

const variantMap: Record<NonNullable<SectionShellProps["variant"]>, string> = {
  hero: "ic-board-panel ic-board-panel--hero",
  panel: "ic-board-panel",
  muted: "ic-board-panel",
  outline: "ic-board-panel",
  contrast: "ic-board-panel",
  warm: "ic-board-panel",
};

export function PageContainer({ width = "wide", className = "", children }: PageContainerProps) {
  return <div className={`${widthMap[width]} px-4 md:px-6 ${className}`.trim()}>{children}</div>;
}

const alignMap = {
  center: "ic-align-center",
  start: "ic-align-start",
} as const;

export function SectionShell({
  variant = "panel",
  align = "start",
  className = "",
  as: Tag = "section",
  children,
}: SectionShellProps) {
  return <Tag className={`${variantMap[variant]} ${variant === "hero" ? "ic-editorial-center" : ""} ${alignMap[align]} ${className}`.trim()}>{children}</Tag>;
}

export function HeadingStack({
  title,
  center = true,
  as: Tag = "div",
  className = "",
  titleClassName = "",
  description,
  children,
}: HeadingStackProps) {
  return (
    <Tag className={`ic-stack-sm ${center ? "ic-editorial-center ic-align-center" : "ic-align-start"} ${className}`.trim()}>
      <h2 className={`ic-heading-2 ic-board-heading ${center ? "mx-auto" : ""} ${titleClassName}`.trim()}>{title}</h2>
      {center ? <div className="ic-stoic-rule mx-auto" aria-hidden="true" /> : <div className="ic-stoic-rule ic-stoic-rule--inline" aria-hidden="true" />}
      {description ? (
        <p className={`ic-section-copy ic-section-copy--muted ${center ? "mx-auto" : ""}`.trim()}>{description}</p>
      ) : null}
      {children}
    </Tag>
  );
}
