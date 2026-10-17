import type { ReactNode } from "react";

import { CapabilityArt } from "@/components/capability-art";

/**
 * The card the capability and use-case sections are built from: an isometric
 * scene on top, then a title, a line of body and whatever the section adds.
 */
export function ArtCard({
  art,
  badge,
  title,
  body,
  children,
  className = "",
}: {
  art: string;
  badge?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <article className={`spotlight lift group flex h-full flex-col overflow-hidden rounded-[22px] bg-card ring-1 ring-line ${className}`}>
      <div className="relative overflow-hidden border-b border-line">
        <CapabilityArt id={art} className="transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]" />
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-soft shadow-sm backdrop-blur">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink">{title}</h3>
        {body ? <p className="mt-1.5 text-pretty text-[14.5px] leading-relaxed text-muted">{body}</p> : null}
        {children}
      </div>
    </article>
  );
}
