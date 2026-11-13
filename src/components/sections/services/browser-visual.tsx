import { cn } from "@/lib/utils";

export function BrowserVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[280px] overflow-hidden rounded-xl border border-surface-foreground/10 bg-[color-mix(in_srgb,var(--surface)_92%,black)] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover/card:-translate-y-0.5",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-surface-foreground/8 px-3 py-2">
        <span className="size-1.5 rounded-full bg-surface-foreground/20" />
        <span className="size-1.5 rounded-full bg-surface-foreground/20" />
        <span className="size-1.5 rounded-full bg-surface-foreground/20" />
        <div className="ml-3 h-4 flex-1 rounded-md bg-[color-mix(in_srgb,var(--primary)_35%,var(--surface))] ring-1 ring-primary/45 transition-colors duration-300 group-hover/card:bg-[color-mix(in_srgb,var(--primary)_48%,var(--surface))]" />
      </div>
      <div className="grid grid-cols-[1fr_0.85fr] gap-2.5 p-2.5">
        <div className="space-y-1.5">
          <div className="h-12 rounded-lg bg-[color-mix(in_srgb,var(--primary)_22%,var(--surface))] transition-opacity duration-300 group-hover/card:opacity-90" />
          <div className="h-1 w-4/5 rounded-full bg-surface-foreground/15" />
          <div className="h-1 w-3/5 rounded-full bg-surface-foreground/10" />
          <div className="h-1 w-2/3 rounded-full bg-surface-foreground/10" />
        </div>
        <div className="space-y-1.5 pt-0.5">
          <div className="h-1 w-full rounded-full bg-surface-foreground/12" />
          <div className="h-1 w-5/6 rounded-full bg-surface-foreground/10" />
          <div className="h-1 w-4/5 rounded-full bg-surface-foreground/8" />
          <div className="mt-2 space-y-1 font-mono text-[9px] leading-relaxed text-surface-foreground/35">
            <p>
              <span className="text-primary">const</span> app
            </p>
            <p>
              <span className="text-surface-foreground/45">=</span> next()
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
