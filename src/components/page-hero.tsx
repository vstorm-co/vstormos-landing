import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui";
import { asset, assetSet } from "@/lib/site";

const SCENES = {
  meadow: {
    src: "/images/meadow-bg-1600.webp",
    set: "/images/meadow-bg-1600.webp 1600w, /images/meadow-bg-3200.webp 3200w",
    position: "object-[50%_85%]",
  },
  lake: {
    src: "/images/cta-1400.webp",
    set: "/images/cta-1400.webp 1400w, /images/cta-2800.webp 2800w",
    position: "object-[50%_70%]",
  },
} as const;

/**
 * A subpage's top band: the same nature photographs as the comparison pages,
 * with the page's one H1 on the sky. `id="top"` is what the nav measures.
 */
export function PageHero({
  scene,
  crumb,
  title,
  lead,
  actions,
}: {
  scene: keyof typeof SCENES;
  crumb: string;
  title: ReactNode;
  lead: string;
  actions?: ReactNode;
}) {
  const image = SCENES[scene];
  return (
    <section id="top" className="relative isolate overflow-hidden bg-paper">
      <img
        src={asset(image.src)}
        srcSet={assetSet(image.set)}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        className={`pointer-events-none absolute inset-0 -z-20 size-full select-none object-cover ${image.position}`}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-paper/90 via-paper/55 to-paper/0"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-paper"
      />
      <div className="mx-auto max-w-[1240px] px-5 pb-40 pt-36 md:px-8 md:pb-56 md:pt-44">
        <div className="flex max-w-[800px] flex-col items-start gap-6">
          <nav aria-label="Breadcrumb">
            <Eyebrow>{crumb}</Eyebrow>
          </nav>
          <h1 className="display-tight text-balance text-[clamp(2.4rem,6vw,4.4rem)] font-medium text-ink">
            {title}
          </h1>
          <p className="max-w-[62ch] text-pretty text-[17.5px] leading-relaxed text-ink-soft">{lead}</p>
          {actions ? <div className="mt-2 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
