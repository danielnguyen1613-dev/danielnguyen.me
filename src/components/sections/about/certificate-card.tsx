import type { Certificate } from "@/data/about";
import { cn } from "@/lib/utils";

type CertificateCardProps = {
  certificate: Certificate;
  className?: string;
};

export function CertificateCard({
  certificate,
  className,
}: CertificateCardProps) {
  return (
    <article
      className={cn(
        "group/cert relative flex min-h-[100px] overflow-hidden border border-surface-foreground/8",
        "bg-[color-mix(in_srgb,var(--surface-foreground)_4%,var(--surface))]",
        "transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/40",
        "hover:bg-[color-mix(in_srgb,var(--surface-foreground)_7%,var(--surface))]",
        "hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="flex w-[28%] min-w-[84px] max-w-[120px] shrink-0 flex-col items-center justify-center gap-0.5 border-r border-surface-foreground/8 bg-[color-mix(in_srgb,var(--surface-foreground)_8%,var(--surface))] px-2.5 py-4 transition-colors duration-300 group-hover/cert:bg-[color-mix(in_srgb,var(--primary)_12%,var(--surface))]"
      >
        {certificate.mark.map((line) => (
          <span
            key={line}
            className="font-heading text-[10px] font-bold tracking-[0.16em] text-surface-foreground/55 uppercase transition-colors duration-300 group-hover/cert:text-primary"
          >
            {line}
          </span>
        ))}
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-4 sm:px-5">
        <h4 className="text-sm font-semibold tracking-tight text-surface-foreground sm:text-[0.95rem]">
          {certificate.title}
        </h4>

        <p className="text-xs text-primary">{certificate.issuer}</p>
      </div>
    </article>
  );
}
