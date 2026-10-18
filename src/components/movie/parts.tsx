"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/** Types `text` out while `active`; shows all of it once `done`, nothing before. */
export function Typed({ text, active, done, cps = 38 }: { text: string; active: boolean; done: boolean; cps?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    setCount(0);
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(text.length, Math.floor(((now - started) / 1000) * cps));
      setCount(next);
      if (next < text.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, text, cps]);

  const shown = done ? text : active ? text.slice(0, count) : "";
  return (
    <>
      {shown}
      {active && !done ? <span className="ml-px inline-block h-[1.05em] w-[1.5px] translate-y-[0.15em] animate-pulse bg-ink" /> : null}
    </>
  );
}

export function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative inline-flex h-[18px] w-[32px] shrink-0 rounded-full transition-colors duration-300 ${on ? "bg-[#22a06b]" : "bg-[#d4d4d8]"}`}>
      <motion.span
        className="absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm"
        animate={{ left: on ? 16 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </span>
  );
}

/** A console-style card. */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[12px] border border-[#e6e6ea] bg-white ${className}`}>{children}</div>;
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "ok" | "warn" }) {
  const look =
    tone === "ok"
      ? "border-[#bfe5d2] bg-[#ecf8f2] text-[#16794c]"
      : tone === "warn"
        ? "border-[#f3dca6] bg-[#fdf6e3] text-[#94650a]"
        : "border-[#e6e6ea] bg-white text-[#52525b]";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-[2px] text-[11px] font-medium ${look}`}>
      {tone !== "neutral" ? <span className={`size-1.5 rounded-full ${tone === "ok" ? "bg-[#22a06b]" : "bg-[#e0a10b]"}`} /> : null}
      {children}
    </span>
  );
}

/** Q3 revenue against costs, $ thousands - the demo organization's figures from the README screenshots. */
export const Q3 = [
  { month: "Jul", revenue: 182, costs: 140 },
  { month: "Aug", revenue: 205, costs: 151 },
  { month: "Sep", revenue: 231, costs: 158 },
] as const;

export function BarChart({ grow, height = 150 }: { grow: boolean; height?: number }) {
  const max = 250;
  return (
    <div className="flex items-end gap-6 px-2" style={{ height }}>
      {Q3.map((row, index) => (
        <div key={row.month} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex w-full items-end justify-center gap-1.5" style={{ height: height - 20 }}>
            {(["revenue", "costs"] as const).map((key) => (
              <motion.span
                key={key}
                className={`w-[22px] rounded-t-[4px] ${key === "revenue" ? "bg-[#5b5bd6]" : "bg-[#a5b4fc]"}`}
                initial={false}
                animate={{ height: grow ? `${(row[key] / max) * 100}%` : "0%" }}
                transition={{ duration: 0.8, delay: index * 0.12 + (key === "costs" ? 0.06 : 0), ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <span className="text-[10.5px] text-[#71717a]">{row.month}</span>
        </div>
      ))}
    </div>
  );
}
