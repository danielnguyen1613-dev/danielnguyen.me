import { cn } from "@/lib/utils";

export type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  detail?: string | string[];
  emphasizeDetail?: boolean;
};

type AboutTimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export function AboutTimeline({ items, className }: AboutTimelineProps) {
  return (
    <ol className={cn("relative space-y-8", className)}>
      {items.map((item, index) => {
        const showLine = index < items.length - 1;
        const details = item.detail
          ? Array.isArray(item.detail)
            ? item.detail
            : [item.detail]
          : [];

        return (
          <li
            key={`${item.period}-${item.title}-${item.subtitle}`}
            className="relative flex gap-4 sm:gap-5"
          >
            <div className="flex w-[4.5rem] shrink-0 justify-end sm:w-24">
              <span className="text-right font-mono text-xs leading-snug tracking-wide text-surface-foreground/55 sm:text-sm">
                {item.period}
              </span>
            </div>

            <div className="relative flex w-3 shrink-0 flex-col items-center">
              <span
                aria-hidden
                className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary ring-[3px] ring-primary/20"
              />
              {showLine ? (
                <span
                  aria-hidden
                  className="absolute top-4 bottom-[-2rem] w-px bg-surface-foreground/15"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1 space-y-1.5 pb-1">
              <h4 className="font-heading text-base font-semibold text-surface-foreground sm:text-lg">
                {item.title}
              </h4>
              <p className="text-sm text-surface-foreground/55">
                {item.subtitle}
              </p>
              {details.length > 0 ? (
                <div className="space-y-2.5 pt-1">
                  {details.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className={cn(
                        "text-sm leading-relaxed",
                        item.emphasizeDetail
                          ? "text-primary"
                          : "text-surface-foreground/65",
                      )}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
