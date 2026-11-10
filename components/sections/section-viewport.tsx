"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { SectionId } from "@/components/sections/navigation";
import { cn } from "@/lib/utils";

const contentShellClassName =
  "flex h-full min-h-0 flex-col py-5 pl-5 pr-1.5 sm:py-6 sm:pl-8 md:pl-8";

const contentFrameClassName = "panel-scroll min-h-0 flex-1 pb-6 pr-6";

type SectionViewportProps = {
  sectionId: SectionId;
  renderSection: (id: SectionId) => ReactNode;
  className?: string;
};

export function SectionViewport({
  sectionId,
  renderSection,
  className,
}: SectionViewportProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [sectionId]);

  return (
    <div
      data-section-viewport
      data-section={sectionId}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <div className={contentShellClassName}>
        <div
          ref={scrollRef}
          data-panel-scroll
          className={contentFrameClassName}
        >
          {renderSection(sectionId)}
        </div>
      </div>
    </div>
  );
}
