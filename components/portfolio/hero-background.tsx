"use client";

import { useLayoutEffect, useRef } from "react";
import { canUsePointerParallax, gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const MAX_X = 20;
const MAX_Y = 15;
const EASE = "power3.out";
const DURATION = 0.8;

type HeroBackgroundProps = {
  src?: string;
  className?: string;
};

export function HeroBackground({
  src = "/images/main_bg.png",
  className,
}: HeroBackgroundProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const scope = scopeRef.current;
    if (!layer || !scope || !canUsePointerParallax()) return;

    let xTo: gsap.QuickToFunc;
    let yTo: gsap.QuickToFunc;

    const ctx = gsap.context(() => {
      xTo = gsap.quickTo(layer, "x", { duration: DURATION, ease: EASE });
      yTo = gsap.quickTo(layer, "y", { duration: DURATION, ease: EASE });
    }, scope);

    const onMove = (event: MouseEvent) => {
      const mouseX = event.clientX / window.innerWidth - 0.5;
      const mouseY = event.clientY / window.innerHeight - 0.5;
      xTo(mouseX * MAX_X);
      yTo(mouseY * MAX_Y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={scopeRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <div
        ref={layerRef}
        className="absolute -inset-[30px] h-[calc(100%+60px)] w-[calc(100%+60px)] will-change-transform"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
