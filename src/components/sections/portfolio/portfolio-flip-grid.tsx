"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { Flip, gsap, prefersReducedMotion } from "@/lib/gsap";

type PortfolioFlipGridProps = {
  activeCategory?: string;
  children: ReactNode;
};

const CLEAR_LAYOUT_PROPS =
  "transform,translate,position,width,height,top,left,right,bottom,x,y,scale";

export function PortfolioFlipGrid({
  activeCategory,
  children,
}: PortfolioFlipGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-flip-item]"),
    );

    const applyVisibility = () => {
      items.forEach((el) => {
        const show =
          !activeCategory || el.dataset.category === activeCategory;
        el.style.display = show ? "" : "none";
      });
    };

    const resetLayout = () => {
      gsap.set(items, { clearProps: CLEAR_LAYOUT_PROPS });
      applyVisibility();
    };

    Flip.killFlipsOf(items);

    if (isFirstRender.current || prefersReducedMotion()) {
      isFirstRender.current = false;
      resetLayout();
      gsap.set(items, { clearProps: "opacity" });
      return;
    }

    const state = Flip.getState(items);
    applyVisibility();

    Flip.from(state, {
      duration: 0.4,
      ease: "power2.out",
      absolute: true,
      absoluteOnLeave: true,
      nested: true,
      fade: true,
      stagger: 0.02,
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.3, overwrite: "auto" },
        );
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          scale: 0.96,
          duration: 0.25,
          overwrite: "auto",
        });
      },
      onComplete: resetLayout,
    });
  }, [activeCategory]);

  return <div ref={rootRef}>{children}</div>;
}
