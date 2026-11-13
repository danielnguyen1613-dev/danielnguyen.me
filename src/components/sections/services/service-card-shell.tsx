import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceCardShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group/card relative flex h-full overflow-hidden border border-surface-foreground/8 bg-[color-mix(in_srgb,var(--surface-foreground)_4%,var(--surface))]",
        "p-6 sm:p-7",
        "transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/40",
        "hover:bg-[color-mix(in_srgb,var(--surface-foreground)_7%,var(--surface))] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      {children}
    </article>
  );
}

export function ServiceCardMeta({ number }: { number: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="font-mono text-[11px] tracking-[0.16em] text-surface-foreground/40 uppercase transition-colors duration-300 group-hover/card:text-primary">
        {number}
      </span>
      <ArrowUpRight
        aria-hidden
        className={cn(
          "size-4 shrink-0 text-primary",
          "translate-y-1 opacity-0 transition-all duration-300 ease-out",
          "group-hover/card:translate-y-0 group-hover/card:opacity-100",
        )}
        strokeWidth={1.75}
      />
    </div>
  );
}

export function ServiceCardCopy({ service }: { service: Service }) {
  return (
    <div className="relative z-10 space-y-2.5">
      <h3 className="font-heading text-lg font-semibold tracking-tight text-surface-foreground sm:text-xl">
        {service.title}
      </h3>
      <p className="max-w-prose text-sm leading-relaxed text-surface-foreground/55">
        {service.description}
      </p>
      <p className="pt-1 font-mono text-[11px] leading-relaxed tracking-wide text-primary/80">
        {service.technologies.join(" · ")}
      </p>
    </div>
  );
}
