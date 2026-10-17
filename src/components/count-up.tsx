"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure such as "4,700+" up from zero the first time it scrolls into
 * view. The final text is the server-rendered text, so without script, with
 * reduced motion or before hydration the reader sees the real figure.
 */
export function CountUp({ value }: { value: string }) {
  const match = /^([\d,]+)(.*)$/.exec(value);
  const target = match?.[1] === undefined ? null : Number(match[1].replaceAll(",", ""));
  const suffix = match?.[2] ?? "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce || target === null) return;
    const controls = animate(0, target, {
      duration: target > 100 ? 1.6 : 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setShown(`${Math.round(latest).toLocaleString("en-US")}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduce, target, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
