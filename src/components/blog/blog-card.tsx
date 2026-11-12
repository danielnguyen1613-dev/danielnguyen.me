import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { formatBlogDate } from "@/lib/blog/format";
import { getCategory } from "@/lib/blog/get-categories";
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
  const category = getCategory(post.category);
  const topicColor = category?.color ?? "#666666";

  return (
    <Card
      className={cn(
        "group/blog gap-0 rounded-none bg-transparent py-0 text-surface-foreground ring-0",
        className,
      )}
    >
      <Link
        href={href}
        className="flex flex-col outline-none"
        aria-label={post.title}
      >
        <div className="relative aspect-square w-full overflow-hidden">
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
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/15 to-transparent"
          />

          {category?.icon ? (
            <Image
              src={category.icon}
              alt=""
              width={20}
              height={20}
              unoptimized
              className="absolute top-4 left-4 z-10 size-5 brightness-0 invert"
            />
          ) : null}

          <div className="absolute inset-x-0 bottom-0 z-10 space-y-1.5 p-4">
            <p className="line-clamp-3 font-heading text-base leading-snug font-bold text-white">
              {post.title}
            </p>
            <time
              dateTime={post.date}
              className="block text-[10px] tracking-wide text-white/70"
            >
              {formatBlogDate(post.date)}
            </time>
          </div>
        </div>
      </Link>
    </Card>
  );
}
