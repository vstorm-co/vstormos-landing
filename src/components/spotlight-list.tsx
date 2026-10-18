"use client";

import type { LucideIcon } from "lucide-react";

export interface SpotlightItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

/**
 * The promises beside an animated window: the one the window is showing is lit,
 * and choosing another jumps the window to it. On wide screens a thin line joins
 * the icons, filled up to the lit one, so the list reads as the window's timeline.
 */
export function SpotlightList({
  items,
  lit,
  onPick,
  className = "",
}: {
  items: readonly SpotlightItem[];
  lit: number;
  onPick: (index: number) => void;
  className?: string;
}) {
  const progress = items.length > 1 ? lit / (items.length - 1) : 0;
  return (
    <div className={`relative min-w-0 ${className}`}>
      {/* The line runs between the first and last icon centres (inset by half an item). */}
      <div aria-hidden className="pointer-events-none absolute top-[38px] bottom-[38px] left-[31.5px] hidden w-px bg-line lg:block">
        <div className="absolute inset-x-0 top-0 bg-blob transition-[height] duration-700 ease-out" style={{ height: `${progress * 100}%` }} />
      </div>
      <ul className="rail min-w-0 sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-1 lg:gap-1.5">
        {items.map((item, index) => {
          const on = index === lit;
          const done = index < lit;
          return (
            <li key={item.title}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onPick(index)}
                className={`flex w-full cursor-pointer gap-3.5 rounded-[18px] p-3.5 text-left ring-1 transition-[background-color,box-shadow] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
                  on ? "bg-card shadow-[0_18px_40px_-26px_rgba(43,37,71,0.5)] ring-line" : "bg-transparent ring-transparent hover:bg-card/60"
                }`}
              >
                <span
                  className={`relative inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] ring-1 transition-colors duration-500 ${
                    on ? "bg-[#e3ebff] text-violet ring-blob" : done ? "bg-card text-violet ring-blob/70" : "bg-card text-muted ring-line"
                  }`}
                >
                  <item.icon className="size-[18px]" strokeWidth={1.9} />
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold leading-snug text-ink">{item.title}</span>
                  <span className="mt-0.5 block text-[14px] leading-snug text-muted">{item.body}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
