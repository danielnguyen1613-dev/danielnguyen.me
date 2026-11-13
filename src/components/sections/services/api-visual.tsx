import {
  accentMuted,
  fill,
  line,
} from "@/components/sections/services/visual-tokens";
import { cn } from "@/lib/utils";

export function ApiVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-[240px]", className)}>
      <svg viewBox="0 0 240 140" className="w-full" aria-hidden>
        <rect
          x="16"
          y="18"
          width="88"
          height="48"
          rx="10"
          fill={fill}
          stroke={line}
          strokeWidth="1"
          className="transition-colors duration-300 group-hover/card:stroke-primary/40"
        />
        <text
          x="60"
          y="46"
          textAnchor="middle"
          fill="color-mix(in srgb, var(--surface-foreground) 55%, transparent)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          API
        </text>

        <rect
          x="136"
          y="18"
          width="88"
          height="48"
          rx="10"
          fill={fill}
          stroke={line}
          strokeWidth="1"
        />
        <text
          x="180"
          y="46"
          textAnchor="middle"
          fill="color-mix(in srgb, var(--surface-foreground) 55%, transparent)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          Auth
        </text>

        <path
          d="M104 42 H136"
          stroke="color-mix(in srgb, var(--primary) 55%, transparent)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="transition-[stroke-dashoffset] duration-500 group-hover/card:[stroke-dashoffset:-8]"
        />

        <rect
          x="76"
          y="88"
          width="88"
          height="40"
          rx="10"
          fill="color-mix(in srgb, var(--primary) 12%, var(--surface))"
          stroke="color-mix(in srgb, var(--primary) 40%, transparent)"
          strokeWidth="1"
        />
        <text
          x="120"
          y="112"
          textAnchor="middle"
          fill={accentMuted}
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          PostgreSQL
        </text>

        <path
          d="M120 66 V88"
          stroke={line}
          strokeWidth="1.5"
          markerEnd="url(#api-arrow)"
        />
        <defs>
          <marker
            id="api-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path
              d="M0,0 L6,3 L0,6 Z"
              fill="color-mix(in srgb, var(--surface-foreground) 35%, transparent)"
            />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
