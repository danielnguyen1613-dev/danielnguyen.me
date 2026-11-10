"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

export function registerGsapPlugins() {
  if (typeof window === "undefined" || pluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

export { gsap, ScrollTrigger };
