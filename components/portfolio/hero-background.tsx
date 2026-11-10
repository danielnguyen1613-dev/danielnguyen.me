import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  src?: string;
  className?: string;
};

export function HeroBackground({
  src = "/images/main_bg.png",
  className,
}: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
