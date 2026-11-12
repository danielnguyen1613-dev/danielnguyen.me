import {
  formatBlogDate,
  formatCategoryLabel,
} from "@/lib/blog/format";
import type { BlogPostMeta } from "@/lib/blog/types";
import { BlogTags } from "@/components/blog/blog-tags";
import { cn } from "@/lib/utils";

type BlogHeaderProps = {
  post: BlogPostMeta;
  className?: string;
};

export function BlogHeader({ post, className }: BlogHeaderProps) {
  return (
    <header className={cn("space-y-5", className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-surface-foreground/55">
        <span className="rounded-md bg-surface-foreground/10 px-2.5 py-1 font-medium text-surface-foreground/80">
          {formatCategoryLabel(post.category)}
        </span>
        <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.author}</span>
      </div>

      <h1 className="font-heading text-3xl font-bold tracking-tight text-balance text-surface-foreground sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>

      {post.description ? (
        <p className="max-w-3xl text-base leading-relaxed text-surface-foreground/65 sm:text-lg">
          {post.description}
        </p>
      ) : null}

      <BlogTags tags={post.tags} />
    </header>
  );
}
