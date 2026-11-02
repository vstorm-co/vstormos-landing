"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function browserSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function serverSnapshot(): boolean {
  return false;
}

/** Match the static export during hydration, then honor the browser preference. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, browserSnapshot, serverSnapshot);
}
