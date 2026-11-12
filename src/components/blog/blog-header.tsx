import Image from "next/image";
import { formatBlogDate } from "@/lib/blog/format";
import type { BlogPostMeta } from "@/lib/blog/types";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type BlogHeaderProps = {
  post: BlogPostMeta;
  className?: string;
};

export function BlogHeader({ post, className }: BlogHeaderProps) {
  return (
    <header
      className={cn(
        "mt-2 space-y-3 border-l-4 border-primary pl-5 sm:pl-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-surface-foreground/55">
        <Image
          src={siteConfig.avatarUrl}
          alt={post.author}
          width={36}
          height={36}
          className="size-8 shrink-0 rounded-full object-cover shadow ring-surface-foreground/15"
        />
        <div className="min-w-0 space-y-0.5">
          <p className="font-medium text-surface-foreground/85">{post.author}</p>
          <time dateTime={post.date} className="block text-xs text-surface-foreground/50">
            {formatBlogDate(post.date)}
          </time>
        </div>
      </div>

      <h1 className="font-heading text-3xl font-bold tracking-tight text-balance text-surface-foreground sm:text-5xl">
        {post.title}
      </h1>
    </header>
  );
}
