import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPostMeta } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

type BlogListProps = {
  posts: BlogPostMeta[];
  emptyMessage?: string;
  className?: string;
};

export function BlogList({
  posts,
  emptyMessage = "No posts found.",
  className,
}: BlogListProps) {
  if (posts.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-surface-foreground/20 px-4 py-10 text-center text-sm text-surface-foreground/55">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid gap-6 sm:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {posts.map((post) => (
        <li key={`${post.category}/${post.slug}`} className="min-w-0">
          <BlogCard post={post} />
        </li>
      ))}
    </ul>
  );
}
