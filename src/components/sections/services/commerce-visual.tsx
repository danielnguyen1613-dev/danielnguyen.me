import { cn } from "@/lib/utils";

export function CommerceVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[200px] overflow-hidden rounded-2xl border border-surface-foreground/10 bg-[color-mix(in_srgb,var(--surface)_92%,black)] p-3 transition-transform duration-500 ease-out group-hover/card:-translate-y-0.5",
        className,
      )}
    >
      <div className="mb-3 overflow-hidden rounded-xl bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_55%,var(--surface)),color-mix(in_srgb,var(--primary)_25%,var(--surface)))] p-3 shadow-inner">
        <div className="mb-4 flex items-center justify-between">
          <span className="size-5 rounded-md bg-surface-foreground/20" />
          <span className="font-mono text-[9px] tracking-wider text-surface-foreground/70">
            ···· 4821
          </span>
        </div>
        <div className="h-1.5 w-12 rounded-full bg-surface-foreground/25" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="flex size-4 items-center justify-center rounded-full bg-primary/35 text-[8px] text-primary">
            ✓
          </span>
          <span className="text-[10px] text-surface-foreground/55">
            Checkout complete
          </span>
        </div>
        <div className="h-1.5 w-3/4 rounded-full bg-surface-foreground/10" />
        <div className="h-1.5 w-1/2 rounded-full bg-surface-foreground/8" />
      </div>
    </div>
  );
}
