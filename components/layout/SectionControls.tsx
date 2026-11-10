"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type SectionControlsProps = {
  className?: string;
  onPrevious?: () => void;
  onNext?: () => void;
};

export function SectionControls({
  className,
  onPrevious,
  onNext,
}: SectionControlsProps) {
  const t = useTranslations("Controls");

  return (
    <div
      data-shell="controls"
      className={cn(
        "flex flex-col items-center gap-1 rounded-full border border-border bg-card px-2 py-2 shadow-sm",
        className,
      )}
    >
      <button
        type="button"
        aria-label={t("previous")}
        onClick={onPrevious}
        className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <ChevronUp className="size-4" />
      </button>
      <button
        type="button"
        aria-label={t("next")}
        onClick={onNext}
        className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <ChevronDown className="size-4" />
      </button>
    </div>
  );
}
