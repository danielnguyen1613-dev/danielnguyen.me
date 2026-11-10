"use client";

import { useRef, type ReactNode } from "react";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { SectionControls } from "@/components/layout/SectionControls";
import { SectionNavigation } from "@/components/layout/SectionNavigation";
import { HeroBackground } from "@/features/home/hero-background";
import { useGsap } from "@/hooks/use-gsap";
import { gsap } from "@/lib/gsap";
import type { SectionId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type PortfolioShellProps = {
  children: ReactNode;
  activeSection?: SectionId;
  className?: string;
};

export function PortfolioShell({
  children,
  activeSection = "home",
  className,
}: PortfolioShellProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGsap(
    scopeRef,
    (_ctx, { reducedMotion }) => {
      const root = scopeRef.current;
      if (!root) return;

      const mobileProfile = root.querySelectorAll<HTMLElement>(
        ".lg\\:hidden [data-shell=\"profile\"]",
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
          background: "linear-gradient(to bottom, #D94F2B 0%, #F06A3B 100%)",
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
            {/* Connected: profile card (#444) | main surface (#222), radius clips with bg */}
            <div className="hidden h-full w-[min(32%,380px)] min-w-[240px] shrink-0 overflow-hidden rounded-l-xl bg-card lg:block">
              <ProfileSidebar connected className="h-full w-full" />
            </div>

            <main
              data-shell="main"
              className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl lg:rounded-l-none lg:rounded-r-xl"
            >
              <div className="h-full overflow-y-auto overscroll-contain rounded-xl bg-surface p-5 sm:p-6 md:p-8 lg:rounded-r-xl">
                {children}
              </div>
            </main>
          </div>

          {/* Anchored just outside the main panel — no layout space */}
          <div className="pointer-events-none absolute inset-y-0 left-full ml-3 hidden lg:flex">
            <div className="pointer-events-auto flex h-full flex-col items-center justify-between">
              <SectionNavigation activeId={activeSection} />
              <SectionControls />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card p-3 lg:hidden">
        <SectionNavigation
          activeId={activeSection}
          orientation="horizontal"
          className="mx-auto max-w-lg"
        />
      </div>
    </div>
  );
}
