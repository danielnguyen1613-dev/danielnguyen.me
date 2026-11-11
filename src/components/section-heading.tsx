import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** First part of the heading (theme surface foreground). */
  lead: string;
  /** Highlighted trailing part (theme primary). */
  accent?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Large section title with optional primary accent word and dotted decoration.
 * Colors come from theme tokens (`surface-foreground`, `primary`) — no hard-coded hues.
 */
export function SectionHeading({
  lead,
  accent,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "relative inline-block max-w-full font-heading text-3xl font-bold tracking-tight text-surface-foreground sm:text-4xl",
        className,
      )}
    >
      <span className="relative z-10">
        {lead}
        {accent ? (
          <>
            {" "}
            <span className="text-primary">{accent}</span>
          </>
        ) : null}
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 z-0 h-[0.85em] w-[1.75em] translate-x-[42%] -translate-y-[18%] sm:w-[2em]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 42%, transparent) 1.15px, transparent 1.35px)",
          backgroundSize: "0.32em 0.32em",
          backgroundRepeat: "repeat",
        }}
      />
    </Tag>
  );
}
