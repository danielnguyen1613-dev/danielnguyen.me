import Link from "next/link";
import { formatBlogTag } from "@/lib/blog/format";
import { cn } from "@/lib/utils";

type BlogTagsProps = {
  tags: string[];
  activeTag?: string;
  hrefForTag?: (tag: string) => string;
  className?: string;
};

export function BlogTags({
  tags,
  activeTag,
  hrefForTag,
  className,
}: BlogTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => {
        const isActive =
          activeTag !== undefined &&
          activeTag.toLowerCase() === tag.toLowerCase();
        const label = formatBlogTag(tag);
        const classNames = cn(
          "inline-flex rounded-md bg-surface-foreground/10 px-2.5 py-1 text-xs font-medium text-surface-foreground/80 transition-colors",
          isActive && "bg-primary text-primary-foreground",
          hrefForTag && !isActive && "hover:bg-surface-foreground/15",
        );

        return (
          <li key={tag}>
            {hrefForTag ? (
              <Link href={hrefForTag(tag)} className={classNames}>
                {label}
              </Link>
            ) : (
              <span className={classNames}>{label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
