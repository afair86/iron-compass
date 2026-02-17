import type { JSX } from "react";
import { PropsWithChildren } from "react";

type Width = "narrow" | "regular" | "wide";

type PageContainerProps = PropsWithChildren<{
  width?: Width;
  className?: string;
}>;

type SectionShellProps = PropsWithChildren<{
  variant?: "panel" | "muted" | "outline" | "hero";
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
}>;

const widthMap: Record<Width, string> = {
  narrow: "ic-content-stack ic-content-narrow",
  regular: "ic-content-stack",
  wide: "ic-content-stack ic-content-wide",
};

const variantMap: Record<NonNullable<SectionShellProps["variant"]>, string> = {
  hero: "ic-panel ic-panel--hero ic-panel--glow",
  panel: "ic-panel",
  muted: "ic-panel-muted",
  outline: "ic-panel-outline",
};

export function PageContainer({ width = "wide", className = "", children }: PageContainerProps) {
  return <div className={`${widthMap[width]} px-4 md:px-6 ${className}`.trim()}>{children}</div>;
}

export function SectionShell({
  variant = "panel",
  className = "",
  as: Tag = "section",
  children,
}: SectionShellProps) {
  return <Tag className={`${variantMap[variant]} ${className}`.trim()}>{children}</Tag>;
}

export function HeadingStack({
  eyebrow,
  title,
  center = true,
  as: Tag = "div",
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  description,
  children,
}: HeadingStackProps) {
  return (
    <Tag className={`ic-stack-sm ${center ? "text-center" : ""} ${className}`.trim()}>
      {eyebrow ? (
        <p
          className={`ic-eyebrow ${center ? "mx-auto" : ""} ${eyebrowClassName}`.trim()}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`ic-heading-2 ${center ? "mx-auto" : ""} ${titleClassName}`.trim()}>{title}</h2>
      {description ? (
        <p className={`ic-section-copy ic-section-copy--muted ${center ? "mx-auto" : ""}`.trim()}>{description}</p>
      ) : null}
      {children}
    </Tag>
  );
}
