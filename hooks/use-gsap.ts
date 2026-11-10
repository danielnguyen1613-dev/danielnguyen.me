"use client";

import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import {
  gsap,
  getMotionDefaults,
  prefersReducedMotion,
  registerGsapPlugins,
} from "@/lib/gsap";

type GsapContextCallback = (
  context: gsap.Context,
  options: {
    reducedMotion: boolean;
    defaults: ReturnType<typeof getMotionDefaults>;
  },
) => void;

/**
 * Runs GSAP animations inside gsap.context() scoped to `scope`.
 * Always reverts on cleanup. Honors prefers-reduced-motion via options.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  callback: GsapContextCallback,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return;

    registerGsapPlugins();

    const reducedMotion = prefersReducedMotion();
    const defaults = getMotionDefaults();

    const ctx = gsap.context(() => {
      callback(ctx, { reducedMotion, defaults });
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps provided by caller
  }, deps);
}
