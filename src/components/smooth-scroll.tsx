"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Inertial page scrolling, and eased jumps for in-page links. Skipped for
 * readers who ask for reduced motion; touch screens keep native momentum,
 * which is Lenis' default (`syncTouch` off).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      anchors: { offset: -84 },
      autoRaf: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
