"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";
import { getSectionIndex, type SectionId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** ~620ms — within the 500–700ms premium page-transition range. */
const DURATION = 0.62;
/** Smooth ease-in-out, no bounce. */
const EASE = "power2.inOut";
const SLIDE_PERCENT = 100;
const SCALE_SUBTLE = 0.985;

const contentShellClassName =
  "flex h-full min-h-0 flex-col py-5 pl-5 pr-1.5 sm:py-6 sm:pl-8 md:pl-8";

const contentFrameClassName = "panel-scroll min-h-0 flex-1 pb-6 pr-6";

type SectionViewportProps = {
  sectionId: SectionId;
  renderSection: (id: SectionId) => ReactNode;
  className?: string;
};

function getScrollEl(layer: HTMLElement | null) {
  return layer?.querySelector<HTMLElement>("[data-panel-scroll]") ?? null;
}

function resetScroll(layer: HTMLElement | null) {
  const scrollEl = getScrollEl(layer);
  if (scrollEl) scrollEl.scrollTop = 0;
}

export function SectionViewport({
  sectionId,
  renderSection,
  className,
}: SectionViewportProps) {
  const currentLayerRef = useRef<HTMLDivElement>(null);
  const nextLayerRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const indexRef = useRef(getSectionIndex(sectionId));
  const reduceMotionRef = useRef(false);

  const [currentId, setCurrentId] = useState(sectionId);
  const [incomingId, setIncomingId] = useState<SectionId | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  useLayoutEffect(() => {
    reduceMotionRef.current = prefersReducedMotion();
    registerGsapPlugins();
  }, []);

  // After a transition commits, reveal the persistent layer (already holding new content).
  useLayoutEffect(() => {
    if (incomingId !== null) return;

    const currentEl = currentLayerRef.current;
    if (!currentEl) return;

    resetScroll(currentEl);
    gsap.set(currentEl, {
      autoAlpha: 1,
      xPercent: 0,
      scale: 1,
      zIndex: 1,
      clearProps: "transform",
    });
  }, [currentId, incomingId]);

  // Request a panel transition whenever the active section changes.
  useLayoutEffect(() => {
    if (sectionId === currentId) return;

    // Keep the latest target while a transition is in flight.
    if (animatingRef.current || incomingId !== null) {
      return;
    }

    if (reduceMotionRef.current) {
      setCurrentId(sectionId);
      indexRef.current = getSectionIndex(sectionId);
      return;
    }

    const nextDirection: 1 | -1 =
      getSectionIndex(sectionId) >= indexRef.current ? 1 : -1;
    setDirection(nextDirection);
    setIncomingId(sectionId);
  }, [sectionId, currentId, incomingId]);

  // Run the dual-panel slide once the incoming layer is mounted.
  useLayoutEffect(() => {
    if (!incomingId) return;

    const currentEl = currentLayerRef.current;
    const nextEl = nextLayerRef.current;
    if (!currentEl || !nextEl) return;

    animatingRef.current = true;

    const xOut = direction > 0 ? -SLIDE_PERCENT : SLIDE_PERCENT;
    const xIn = direction > 0 ? SLIDE_PERCENT : -SLIDE_PERCENT;

    gsap.killTweensOf([currentEl, nextEl]);

    gsap.set(currentEl, {
      xPercent: 0,
      scale: 1,
      autoAlpha: 1,
      zIndex: 1,
    });
    // Hide before first paint contribution from this layer is visible.
    gsap.set(nextEl, {
      xPercent: xIn,
      scale: SCALE_SUBTLE,
      autoAlpha: 0,
      zIndex: 2,
    });

    // Always enter the next section from the top.
    resetScroll(nextEl);

    const tl = gsap.timeline({
      defaults: { duration: DURATION, ease: EASE },
      onComplete: () => {
        const finishedId = incomingId;
        indexRef.current = getSectionIndex(finishedId);
        animatingRef.current = false;

        // Keep the incoming page visible on top. Hide the outgoing shell so the
        // content swap into the persistent layer cannot flash the previous section.
        gsap.set(nextEl, {
          xPercent: 0,
          scale: 1,
          autoAlpha: 1,
          zIndex: 2,
        });
        gsap.set(currentEl, {
          autoAlpha: 0,
          xPercent: 0,
          scale: 1,
          zIndex: 1,
        });

        resetScroll(currentEl);
        setCurrentId(finishedId);
        setIncomingId(null);
      },
    });

    tl.to(
      currentEl,
      {
        xPercent: xOut,
        scale: SCALE_SUBTLE,
        autoAlpha: 0,
      },
      0,
    ).to(
      nextEl,
      {
        xPercent: 0,
        scale: 1,
        autoAlpha: 1,
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, [incomingId, direction]);

  return (
    <div
      data-section-viewport
      className={cn("relative h-full min-h-0 overflow-hidden", className)}
    >
      {/* Outer shell: transition transforms only */}
      <div
        ref={currentLayerRef}
        data-section={currentId}
        data-section-layer="current"
        className="absolute inset-0 will-change-transform"
      >
        <div className={contentShellClassName}>
          <div data-panel-scroll className={contentFrameClassName}>
            {renderSection(currentId)}
          </div>
        </div>
      </div>

      {incomingId ? (
        <div
          ref={nextLayerRef}
          data-section={incomingId}
          data-section-layer="incoming"
          className="absolute inset-0 will-change-transform"
          style={{ opacity: 0, visibility: "hidden" }}
          aria-hidden
        >
          <div className={contentShellClassName}>
            <div data-panel-scroll className={contentFrameClassName}>
              {renderSection(incomingId)}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
