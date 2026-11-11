import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  name: string;
  image: string;
  href: string;
  imageAlt?: string;
  className?: string;
};

export function ProjectCard({
  name,
  image,
  href,
  imageAlt,
  className,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "gap-3 rounded-none bg-transparent py-0 text-surface-foreground ring-0",
        "transition-opacity hover:opacity-90 focus-within:opacity-90",
        className,
      )}
    >
      <a href={href} className="flex flex-col gap-3 outline-none" aria-label={name}>
        <div className="relative aspect-square w-full overflow-hidden bg-foreground/15">
          <Image
            src={image}
            alt={imageAlt ?? name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <CardTitle className="px-0 font-heading text-sm font-bold tracking-wide text-surface-foreground">
          {name}
        </CardTitle>
      </a>
    </Card>
  );
}
