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
      <p className="text-sm text-surface-foreground/55">{emptyMessage}</p>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-3",
        className,
      )}
    >
      {posts.map((post) => (
        <li
          key={`${post.category}/${post.slug}`}
          data-flip-item
          data-flip-id={`${post.category}-${post.slug}`}
          data-category={post.category}
          className="min-w-0"
        >
          <BlogCard post={post} />
        </li>
      ))}
    </ul>
  );
}
