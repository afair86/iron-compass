type CategoryBadgeProps = {
  category?: string;
};

export default function CategoryBadge({ category = "Dispatch" }: CategoryBadgeProps) {
  return <span className="ic-dispatch-label">{category}</span>;
}
