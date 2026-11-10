"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { SectionControls } from "@/components/layout/SectionControls";
import { SectionNavigation } from "@/components/layout/SectionNavigation";
import { SectionContent } from "@/features/sections/section-content";
import { HeroBackground } from "@/features/home/hero-background";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/gsap";
import {
  getAdjacentSection,
  getHashForSection,
  getSectionIdFromHash,
  getSectionIndex,
  sectionNavItems,
  type SectionId,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

type PortfolioShellProps = {
  initialSection?: SectionId;
  className?: string;
};

function readSectionFromLocation(fallback: SectionId): SectionId {
  if (typeof window === "undefined") return fallback;
  return getSectionIdFromHash(window.location.hash);
}

function writeSectionHash(id: SectionId) {
  const nextHash = getHashForSection(id);
  if (window.location.hash === nextHash) return;
  window.history.pushState(null, "", nextHash);
}

export function PortfolioShell({
  initialSection = "home",
  className,
}: PortfolioShellProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>(() =>
    readSectionFromLocation(initialSection),
  );
  const activeIndex = getSectionIndex(activeSection);

  const goToSection = useCallback((id: SectionId, syncHash = true) => {
    setActiveSection(id);
    if (syncHash) writeSectionHash(id);
  }, []);

  const handleSelect = useCallback(
    (id: SectionId) => {
      goToSection(id);
    },
    [goToSection],
  );

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

  // Keep the selected section in sync with the URL hash (refresh / back / forward).
  useEffect(() => {
    const syncFromHash = () => {
      const fromHash = getSectionIdFromHash(window.location.hash);
      setActiveSection((current) =>
        current === fromHash ? current : fromHash,
      );
    };

    // Ensure first paint hash exists (e.g. bare `/` → `#home`).
    if (!window.location.hash) {
      window.history.replaceState(null, "", getHashForSection(activeSection));
    } else {
      syncFromHash();
    }

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only hash bootstrap
  }, []);

  useGsap(
    scopeRef,
    (_ctx, { reducedMotion }) => {
      const root = scopeRef.current;
      if (!root) return;

      const mobileProfile = root.querySelectorAll<HTMLElement>(
        '.lg\\:hidden [data-shell="profile"]',
      );
      const panels = root.querySelectorAll<HTMLElement>('[data-shell="panels"]');
      const nav = root.querySelectorAll<HTMLElement>('[data-shell="nav"]');
      const controls = root.querySelectorAll<HTMLElement>(
        '[data-shell="controls"]',
      );

      if (reducedMotion) {
        gsap.set([...mobileProfile, ...panels, ...nav, ...controls], {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      gsap.set(mobileProfile, { autoAlpha: 0, y: 24 });
      gsap.set(panels, { autoAlpha: 0, y: 28 });
      gsap.set(nav, { autoAlpha: 0, y: 20 });
      gsap.set(controls, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(mobileProfile, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(panels, { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.35")
        .to(nav, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(controls, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.28");
    },
    [],
  );

  return (
    <div ref={scopeRef} className={cn("relative min-h-dvh", className)}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(165deg, #f8ebe3 0%, #f4d9cb 52%, #efcbb8 100%)",
        }}
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
            {/* Connected: profile card (white) | main surface (charcoal), radius clips with bg */}
            <div className="hidden h-full w-[min(32%,380px)] min-w-[240px] shrink-0 overflow-hidden rounded-l-xl bg-card lg:block">
              <ProfileSidebar connected className="h-full w-full" />
            </div>

            <main
              data-shell="main"
              className="flex min-h-0 min-w-0 flex-1 flex-col rounded-xl lg:rounded-l-none lg:rounded-r-xl"
            >
              <div className="relative h-full min-h-0 flex-1 rounded-xl bg-surface text-surface-foreground lg:rounded-r-xl">
                <SectionContent
                  activeSection={activeSection}
                  onNavigate={handleSelect}
                />
              </div>
            </main>
          </div>

          {/* Anchored just outside the main panel — no layout space */}
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
