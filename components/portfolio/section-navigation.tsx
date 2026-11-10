"use client";

import { useTranslations } from "next-intl";
import { sectionNavItems, type SectionId } from "@/components/sections/navigation";
import { cn } from "@/lib/utils";

type SectionNavigationProps = {
  activeId?: SectionId;
  orientation?: "vertical" | "horizontal";
  className?: string;
  onSelect?: (id: SectionId) => void;
};

export function SectionNavigation({
  activeId = "home",
  orientation = "vertical",
  className,
  onSelect,
}: SectionNavigationProps) {
  const t = useTranslations("Nav");
  const isVertical = orientation === "vertical";

  return (
    <nav
      data-shell="nav"
      aria-label={t("ariaLabel")}
      className={cn(
        "bg-card shadow-sm",
        isVertical
          ? "flex flex-col items-center gap-3 rounded-full px-2 py-2.5"
          : "flex items-center justify-around gap-1 rounded-2xl px-2 py-2",
        className,
      )}
    >
      {sectionNavItems.map(({ id, labelKey, icon: Icon }) => {
        const isActive = id === activeId;
        const label = t(labelKey);

        return (
          <button
            key={id}
            type="button"
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onSelect?.(id)}
            className={cn(
              "group relative inline-flex size-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              isActive
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-5" strokeWidth={isActive ? 2 : 1.5} />

            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute z-20 whitespace-nowrap rounded-sm bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground opacity-0 shadow-sm",
                "group-hover:opacity-100 group-focus-visible:opacity-100",
                isVertical
                  ? "right-full top-1/2 mr-3 -translate-y-1/2"
                  : "bottom-full left-1/2 mb-2.5 -translate-x-1/2",
              )}
            >
              {label}
              <span
                className={cn(
                  "absolute border-[5px] border-transparent",
                  isVertical
                    ? "left-full top-1/2 -translate-y-1/2 border-l-primary"
                    : "left-1/2 top-full -translate-x-1/2 border-t-primary",
                )}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
