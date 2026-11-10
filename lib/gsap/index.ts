"use client";

import gsap from "gsap";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True when pointer parallax is appropriate (fine pointer + hover, motion allowed). */
export function canUsePointerParallax() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (window.matchMedia("(hover: none)").matches) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  return true;
}

/** Shared defaults: skip motion when the user prefers reduced motion. */
export function getMotionDefaults() {
  if (prefersReducedMotion()) {
    return { duration: 0, delay: 0 } as const;
  }

  return {
    duration: 0.8,
    ease: "power3.out",
  } as const;
}

export { gsap };
