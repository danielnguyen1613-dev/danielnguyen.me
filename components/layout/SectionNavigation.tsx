"use client";

import { useTranslations } from "next-intl";
import { sectionNavItems, type SectionId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SectionNavigationProps = {
  activeId?: SectionId;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

export function SectionNavigation({
  activeId = "home",
  orientation = "vertical",
  className,
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
      {sectionNavItems.map(({ id, href, labelKey, icon: Icon }) => {
        const isActive = id === activeId;

        return (
          <a
            key={id}
            href={href}
            aria-label={t(labelKey)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full transition-colors",
              isActive
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-5" strokeWidth={isActive ? 2 : 1.5} />
          </a>
        );
      })}
    </nav>
  );
}
