import Image from "next/image";
import { BookOpen, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  image: string;
  category: string;
  date: string;
  title: string;
  href?: string;
  imageAlt?: string;
  icon?: LucideIcon;
  className?: string;
};

export function BlogCard({
  image,
  category,
  date,
  title,
  href,
  imageAlt,
  icon: Icon = BookOpen,
  className,
}: BlogCardProps) {
  const content = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-foreground/35"
        />
        <Badge
          className="absolute top-4 left-4 z-10 h-auto rounded-md border-0 bg-white px-2.5 py-1 text-xs font-medium text-foreground"
        >
          {category}
        </Badge>
        <Icon
          aria-hidden
          strokeWidth={1.25}
          className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-14 -translate-x-1/2 -translate-y-1/2 text-white sm:size-16"
        />
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 bg-foreground/25 px-6 py-6 sm:px-8 sm:py-8">
        <time
          dateTime={date}
          className="text-sm text-surface-foreground/50"
        >
          {date}
        </time>
        <CardTitle className="font-heading text-xl leading-snug font-bold text-balance text-surface-foreground sm:text-2xl">
          {title}
        </CardTitle>
      </CardContent>
    </>
  );

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden rounded-xl bg-foreground/15 py-0 text-surface-foreground ring-1 ring-surface-foreground/12",
        href &&
          "transition-[ring-color,background-color] hover:bg-foreground/20 hover:ring-surface-foreground/20 focus-within:ring-primary/50",
        className,
      )}
    >
      {href ? (
        <a
          href={href}
          className="flex h-full flex-col outline-none"
          aria-label={title}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </Card>
  );
}
