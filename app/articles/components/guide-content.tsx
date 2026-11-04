import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export function guideText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (isValidElement<{ children?: ReactNode }>(node))
    return guideText(node.props.children);
  return Children.toArray(node)
    .map((child) => guideText(child))
    .join(" ");
}

/** Give existing server-rendered headings stable destinations without duplicating article text. */
export function prepareGuide(node: ReactNode) {
  const contents: { id: string; label: string }[] = [];
  const seen = new Map<string, number>();
  function visit(children: ReactNode): ReactNode {
    return Children.map(children, (child) => {
      if (!isValidElement<{ children?: ReactNode; id?: string }>(child))
        return child;
      if (child.type === "h2") {
        const label = guideText(child.props.children).trim();
        const base =
          child.props.id ??
          label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        const occurrence = seen.get(base) ?? 0;
        seen.set(base, occurrence + 1);
        const id = occurrence ? `${base}-${occurrence + 1}` : base;
        contents.push({ id, label });
        return cloneElement(child, { id });
      }
      return cloneElement(
        child as ReactElement<{ children?: ReactNode }>,
        {},
        visit(child.props.children),
      );
    });
  }
  return {
    content: visit(node),
    contents,
    wordCount: guideText(node).split(/\s+/).filter(Boolean).length,
  };
}
