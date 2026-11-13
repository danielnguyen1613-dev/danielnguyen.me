import { accent } from "@/components/sections/services/visual-tokens";
import { cn } from "@/lib/utils";

export function MetricsVisual({ className }: { className?: string }) {
  const steps = ["Performance", "SEO", "Automated tests"];

  return (
    <div
      className={cn(
        "flex w-full max-w-[220px] flex-col items-center gap-4",
        className,
      )}
    >
      <div className="relative size-[72px] shrink-0">
        <svg viewBox="0 0 88 88" className="size-full -rotate-90" aria-hidden>
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="color-mix(in srgb, var(--surface-foreground) 8%, transparent)"
            strokeWidth="4"
          />
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="226"
            strokeDashoffset="0"
            className="transition-[stroke-dashoffset] duration-700 ease-out group-hover/card:[stroke-dashoffset:12]"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-heading text-sm font-semibold text-surface-foreground">
            3/3
          </span>
          <span className="text-[9px] tracking-wide text-surface-foreground/40 uppercase">
            checks
          </span>
        </div>
      </div>

      <ul className="w-full space-y-2">
        {steps.map((step) => (
          <li key={step} className="flex items-center gap-2">
            <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary/28 text-[9px] text-primary ring-1 ring-primary/45 transition-transform duration-300 group-hover/card:scale-105">
              ✓
            </span>
            <span className="text-[11px] text-surface-foreground/55">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
