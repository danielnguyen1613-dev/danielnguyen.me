"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { SectionId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const contentShellClassName =
  "flex h-full min-h-0 flex-col py-5 pl-5 pr-1.5 sm:py-6 sm:pl-8 md:pl-8";

const contentFrameClassName =
  "min-h-0 max-h-full flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain pb-6 pr-6";

type SectionViewportProps = {
  sectionId: SectionId;
  children: ReactNode;
  className?: string;
};

export function SectionViewport({
  sectionId,
  children,
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
        <div ref={scrollRef} className={contentFrameClassName}>
          {children}
        </div>
      </div>
    </div>
  );
}
