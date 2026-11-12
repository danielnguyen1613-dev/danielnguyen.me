import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  formatBlogDate,
  formatCategoryLabel,
} from "@/lib/blog/format";
import { blogHref } from "@/lib/blog/paths";
import type { BlogPostMeta } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPostMeta;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  const href = blogHref(post.category, post.slug);
  const thumbnail = post.thumbnailText ?? formatCategoryLabel(post.category);

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden rounded-xl bg-foreground/15 py-0 text-surface-foreground ring-1 ring-surface-foreground/12 transition-[ring-color,background-color] hover:bg-foreground/20 hover:ring-surface-foreground/20 focus-within:ring-primary/50",
        className,
      )}
    >
      <Link
        href={href}
        className="flex h-full flex-col outline-none"
        aria-label={post.title}
      >
        <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-foreground/40 via-foreground/25 to-primary/30">
          <Badge className="absolute top-4 left-4 z-10 h-auto rounded-md border-0 bg-white px-2.5 py-1 text-xs font-medium text-foreground">
            {formatCategoryLabel(post.category)}
          </Badge>
          <BookOpen
            aria-hidden
            strokeWidth={1.25}
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-12 -translate-x-1/2 -translate-y-1/2 text-white/80 sm:size-14"
          />
          <p className="relative z-10 max-w-[85%] text-center font-heading text-xl font-bold text-balance text-white sm:text-2xl">
            {thumbnail}
          </p>
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 bg-foreground/25 px-6 py-6 sm:px-8 sm:py-7">
          <time
            dateTime={post.date}
            className="text-sm text-surface-foreground/50"
          >
            {formatBlogDate(post.date)}
          </time>
          <CardTitle className="font-heading text-xl leading-snug font-bold text-balance text-surface-foreground sm:text-2xl">
            {post.title}
          </CardTitle>
          {post.description ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-surface-foreground/60">
              {post.description}
            </p>
          ) : null}
        </CardContent>
      </Link>
    </Card>
  );
}
