"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SectionViewport } from "@/components/layout/section-viewport";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import type { SectionId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const TRANSITION_DURATION = 0.7;
const CLEAR_PROPS = "transform,opacity,filter";

/** Transition viewport: no overflow clipping so mains can travel past their slot. */
const stageClassName = "relative min-h-0 min-w-0 flex-1 overflow-visible";

/** Content clipping stays on each panel, not the transition stage. */
const mainPanelClassName =
  "absolute inset-0 overflow-hidden bg-surface rounded-xl text-surface-foreground lg:rounded-l-lg lg:rounded-r-xl";

type PortfolioMainProps = {
  sectionId: SectionId;
  children: ReactNode;
  className?: string;
};

export function PortfolioMain({
  sectionId,
  children,
  className,
}: PortfolioMainProps) {
  const incomingRef = useRef<HTMLElement>(null);
  const outgoingRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const displayedRef = useRef(sectionId);
  const incomingChildrenRef = useRef(children);

  const [incomingSection, setIncomingSection] = useState(sectionId);
  const [incomingChildren, setIncomingChildren] = useState(children);
  const [outgoing, setOutgoing] = useState<{
    sectionId: SectionId;
    children: ReactNode;
  } | null>(null);

  // Keep the latest committed children in sync when not mid-transition swap.
  useEffect(() => {
    if (sectionId !== displayedRef.current) return;
    incomingChildrenRef.current = children;
    setIncomingChildren(children);
  }, [children, sectionId]);

  useEffect(() => {
    if (sectionId === displayedRef.current) return;

    const fromSection = displayedRef.current;
    const fromChildren = incomingChildrenRef.current;

    displayedRef.current = sectionId;
    incomingChildrenRef.current = children;

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (prefersReducedMotion()) {
      setOutgoing(null);
      setIncomingSection(sectionId);
      setIncomingChildren(children);
      return;
    }

    setOutgoing({ sectionId: fromSection, children: fromChildren });
    setIncomingSection(sectionId);
    setIncomingChildren(children);
  }, [sectionId, children]);

  useLayoutEffect(() => {
    if (outgoing === null) return;

    const outgoingEl = outgoingRef.current;
    const incomingEl = incomingRef.current;
    if (!outgoingEl || !incomingEl) return;

    timelineRef.current?.kill();

    const tl = gsap.timeline({
      defaults: {
        duration: TRANSITION_DURATION,
        ease: "power3.inOut",
      },
      onComplete: () => {
        timelineRef.current = null;
        gsap.set(incomingEl, { clearProps: CLEAR_PROPS });
        setOutgoing(null);
      },
    });

    timelineRef.current = tl;

    tl.fromTo(
      outgoingEl,
      { xPercent: 0, opacity: 1, filter: "blur(0px)" },
      { xPercent: -100, opacity: 0, filter: "blur(4px)" },
      0,
    ).fromTo(
      incomingEl,
      { xPercent: 100, opacity: 0.2, filter: "blur(4px)" },
      { xPercent: 0, opacity: 1, filter: "blur(0px)" },
      0,
    );

    return () => {
      tl.kill();
      if (timelineRef.current === tl) timelineRef.current = null;
    };
  }, [outgoing, incomingSection]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  return (
    <div
      data-shell="main-stage"
      className={cn(stageClassName, className)}
    >
      {outgoing !== null ? (
        <main
          ref={outgoingRef}
          aria-hidden
          data-shell="main-outgoing"
          className={cn(mainPanelClassName, "pointer-events-none z-0")}
        >
          <SectionViewport sectionId={outgoing.sectionId}>
            {outgoing.children}
          </SectionViewport>
        </main>
      ) : null}

      <main
        ref={incomingRef}
        data-shell="main"
        className={cn(mainPanelClassName, "z-10")}
      >
        <SectionViewport sectionId={incomingSection}>
          {incomingChildren}
        </SectionViewport>
      </main>
    </div>
  );
}
