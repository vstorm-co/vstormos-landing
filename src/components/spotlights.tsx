"use client";

import { useEffect } from "react";

/**
 * Feeds every `.spotlight` element the pointer position it needs, through one
 * listener for the whole page rather than one per card. Mouse only: a touch
 * has no hover to light anything up.
 */
export function Spotlights() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>(".spotlight");
      if (card === null) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - box.left}px`);
      card.style.setProperty("--my", `${event.clientY - box.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
