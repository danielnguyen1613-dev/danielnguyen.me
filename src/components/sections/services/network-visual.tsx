import {
  accent,
  accentSoft,
  line,
} from "@/components/sections/services/visual-tokens";
import { cn } from "@/lib/utils";

export function NetworkVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[168px]",
        className,
      )}
    >
      <svg viewBox="0 0 200 200" className="size-full" aria-hidden>
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke={line}
          strokeWidth="1"
          strokeDasharray="3 6"
          className="origin-center transition-transform duration-700 ease-out group-hover/card:rotate-6"
        />
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="none"
          stroke={line}
          strokeWidth="1"
          strokeDasharray="2 5"
          className="origin-center transition-transform duration-700 ease-out group-hover/card:-rotate-3"
        />
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="color-mix(in srgb, var(--primary) 35%, transparent)"
          strokeWidth="1"
        />

        <line x1="100" y1="100" x2="42" y2="58" stroke={line} strokeWidth="1" />
        <line x1="100" y1="100" x2="158" y2="48" stroke={line} strokeWidth="1" />
        <line x1="100" y1="100" x2="168" y2="128" stroke={line} strokeWidth="1" />
        <line x1="100" y1="100" x2="55" y2="150" stroke={line} strokeWidth="1" />
        <line
          x1="100"
          y1="100"
          x2="130"
          y2="165"
          stroke="color-mix(in srgb, var(--primary) 40%, transparent)"
          strokeWidth="1"
          className="opacity-70 transition-opacity duration-300 group-hover/card:opacity-100"
        />

        <circle cx="42" cy="58" r="3.5" fill="color-mix(in srgb, var(--surface-foreground) 35%, transparent)" />
        <circle cx="158" cy="48" r="3" fill="color-mix(in srgb, var(--surface-foreground) 28%, transparent)" />
        <circle cx="168" cy="128" r="3.5" fill="color-mix(in srgb, var(--surface-foreground) 32%, transparent)" />
        <circle cx="55" cy="150" r="3" fill="color-mix(in srgb, var(--surface-foreground) 28%, transparent)" />
        <circle
          cx="130"
          cy="165"
          r="3.5"
          fill={accentSoft}
          className="transition-[r] duration-300"
        />

        <circle
          cx="100"
          cy="100"
          r="14"
          fill="color-mix(in srgb, var(--primary) 22%, var(--surface))"
          stroke={accent}
          strokeWidth="1.5"
          className="transition-all duration-500 group-hover/card:stroke-primary"
        />
        <circle
          cx="100"
          cy="100"
          r="5"
          fill={accent}
          className="origin-center animate-pulse"
        />
      </svg>
    </div>
  );
}
