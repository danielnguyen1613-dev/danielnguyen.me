"use client";

import { useCallback, useEffect, useState } from "react";
import { HeroBackground } from "@/components/portfolio/hero-background";
import { ProfileSidebar } from "@/components/portfolio/profile-sidebar";
import { SectionControls } from "@/components/portfolio/section-controls";
import { SectionNavigation } from "@/components/portfolio/section-navigation";
import { SectionContent } from "@/components/sections/section-content";
import {
  getAdjacentSection,
  getHashForSection,
  getSectionIndex,
  readSectionFromLocation,
  sectionNavItems,
  writeSectionHash,
  type SectionId,
} from "@/components/sections/navigation";
import { cn } from "@/lib/utils";

const pageBackgroundGradient =
  "linear-gradient(165deg, #f8ebe3 0%, #f4d9cb 52%, #efcbb8 100%)";

type PortfolioShellProps = {
  initialSection?: SectionId;
  className?: string;
};

export function PortfolioShell({
  initialSection = "home",
  className,
}: PortfolioShellProps) {
  // Always start from the same value on server and client to avoid hydration mismatch.
  // Hash is applied after mount in the effect below.
  const [activeSection, setActiveSection] =
    useState<SectionId>(initialSection);
  const activeIndex = getSectionIndex(activeSection);

  const handleSelect = useCallback((id: SectionId) => {
    setActiveSection(id);
    writeSectionHash(id);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveSection((current) => {
      const next = getAdjacentSection(current, -1);
      writeSectionHash(next);
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    setActiveSection((current) => {
      const next = getAdjacentSection(current, 1);
      writeSectionHash(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const fromHash = readSectionFromLocation(initialSection);
      setActiveSection((current) =>
        current === fromHash ? current : fromHash,
      );
    };

    if (!window.location.hash) {
      window.history.replaceState(
        null,
        "",
        getHashForSection(initialSection),
      );
    } else {
      syncFromHash();
    }

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, [initialSection]);

  return (
    <div className={cn("relative min-h-dvh", className)}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{ background: pageBackgroundGradient }}
      >
        <HeroBackground />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1600px] flex-col gap-3 px-4 py-4 pb-24 md:px-8 md:py-6 lg:h-dvh lg:px-16 lg:py-8 xl:px-32 xl:py-16">
        <div className="lg:hidden">
          <ProfileSidebar compact />
        </div>

        <div className="relative min-h-[70vh] min-w-0 flex-1 lg:h-full lg:min-h-0">
          <div
            data-shell="panels"
            className="flex h-full min-h-[70vh] overflow-hidden rounded-xl bg-card shadow-lg lg:min-h-0"
          >
            <div className="hidden h-full w-[min(32%,380px)] min-w-[240px] shrink-0 overflow-hidden rounded-l-xl bg-card lg:block">
              <ProfileSidebar connected className="h-full w-full" />
            </div>

            <main
              data-shell="main"
              className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl bg-surface text-surface-foreground lg:rounded-l-none lg:rounded-r-xl"
            >
              <SectionContent
                activeSection={activeSection}
                onNavigate={handleSelect}
              />
            </main>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-full ml-3 hidden lg:flex">
            <div className="pointer-events-auto flex h-full flex-col items-center justify-between">
              <SectionNavigation
                activeId={activeSection}
                onSelect={handleSelect}
              />
              <SectionControls
                onPrevious={handlePrevious}
                onNext={handleNext}
                canPrevious={activeIndex > 0}
                canNext={activeIndex < sectionNavItems.length - 1}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card p-3 lg:hidden">
        <SectionNavigation
          activeId={activeSection}
          orientation="horizontal"
          className="mx-auto max-w-lg"
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
