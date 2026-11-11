import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  name: string;
  image: string;
  href?: string;
  onSelect?: () => void;
  imageAlt?: string;
  className?: string;
};

export function ProjectCard({
  name,
  image,
  href,
  onSelect,
  imageAlt,
  className,
}: ProjectCardProps) {
  const body = (
    <>
      <div className="relative aspect-square w-full overflow-hidden bg-foreground/15">
        <Image
          src={image}
          alt={imageAlt ?? name}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover/project:scale-110"
        />
      </div>
      <CardTitle className="px-0 font-heading text-sm font-bold tracking-wide text-surface-foreground">
        {name}
      </CardTitle>
    </>
  );

  return (
    <Card
      className={cn(
        "group/project gap-3 rounded-none bg-transparent py-0 text-surface-foreground ring-0",
        className,
      )}
    >
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          className="flex w-full cursor-pointer flex-col gap-3 text-left outline-none"
          aria-label={name}
        >
          {body}
        </button>
      ) : (
        <a
          href={href ?? "#"}
          className="flex flex-col gap-3 outline-none"
          aria-label={name}
        >
          {body}
        </a>
      )}
    </Card>
  );
}
