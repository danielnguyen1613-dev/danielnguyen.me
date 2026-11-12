import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import {
  formatBlogDate,
  formatCategoryLabel,
} from "@/lib/blog/format";
import { getCategoryColor } from "@/lib/blog/get-categories";
import { blogHref } from "@/lib/blog/paths";
import type { BlogPostMeta } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

const BLOG_CARD_BG = "/images/memphis.png";

type BlogCardProps = {
  post: BlogPostMeta;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  const href = blogHref(post.category, post.slug);
  const thumbnail = post.thumbnailText ?? formatCategoryLabel(post.category);
  const topicColor = getCategoryColor(post.category);

  return (
    <Card
      className={cn(
        "group/blog gap-3 rounded-none bg-transparent py-0 text-surface-foreground ring-0",
        className,
      )}
    >
      <Link
        href={href}
        className="flex flex-col gap-3 outline-none"
        aria-label={post.title}
      >
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-500 ease-out group-hover/blog:scale-110"
            style={{ backgroundColor: topicColor }}
          >
            <div
              className="absolute inset-0 opacity-6"
              style={{
                backgroundImage: `url(${BLOG_CARD_BG})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-foreground/20" />
          <p className="relative z-10 max-w-[85%] text-center font-heading text-xl font-bold text-balance text-surface-foreground sm:text-2xl">
            {thumbnail}
          </p>
        </div>
        <div className="space-y-1 px-0">
          <CardTitle className="font-heading text-sm font-bold tracking-wide text-surface-foreground">
            {post.title}
          </CardTitle>
          <time
            dateTime={post.date}
            className="block text-xs text-surface-foreground/50"
          >
            {formatBlogDate(post.date)}
          </time>
        </div>
      </Link>
    </Card>
  );
}
