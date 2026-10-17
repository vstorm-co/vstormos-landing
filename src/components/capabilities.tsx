import { ArrowUpRight } from "lucide-react";

import { CapabilityArt } from "@/components/capability-art";
import { Reveal, SectionHeading } from "@/components/ui";
import { capabilityGroups, links } from "@/content";
import { asset, assetSet } from "@/lib/site";

/** Fixed positions (in %) so the server and the browser draw the same stars. */
const STARS = [
  [6, 8, 0.4], [14, 22, 1.9], [21, 6, 1.1], [29, 31, 2.6], [36, 14, 0.2], [44, 4, 1.5], [52, 24, 2.2],
  [59, 9, 0.8], [66, 34, 1.3], [73, 16, 2.9], [81, 6, 0.6], [88, 27, 1.7], [94, 12, 2.4], [3, 40, 1.0],
  [97, 44, 0.3], [48, 46, 2.0],
] as const;

export function Capabilities() {
  return (
    <section id="capabilities" className="relative isolate overflow-hidden bg-[#141026] px-5 pb-48 pt-24 md:px-8 md:pb-72 md:pt-32">
      <img
        src={asset("/images/night-3200.webp")}
        srcSet={assetSet("/images/night-1600.webp 1600w, /images/night-3200.webp 3200w")}
        sizes="max(100vw, 1600px)"
        alt=""
        loading="lazy"
        className="pointer-events-none absolute inset-0 -z-10 size-full select-none object-cover object-[50%_100%]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[#141026] to-transparent" />
      {/* Keeps the heading off the brightest part of the Milky Way. */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[420px] w-[900px] -translate-x-1/2 rounded-[50%] bg-[#141026]/70 blur-[60px]" />
      {/* A few of the photo's stars, made to breathe. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {STARS.map(([left, top, delay]) => (
          <span
            key={`${left}-${top}`}
            className="absolute size-[3px] rounded-full bg-white shadow-[0_0_6px_1px_rgba(187,209,255,0.8)]"
            style={{ left: `${left}%`, top: `${top}%`, animation: `twinkle ${2.6 + (left % 3)}s ease-in-out ${-delay}s infinite` }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-[1240px]">
        <SectionHeading
          tone="dark"
          eyebrow="What ships today"
          title="26 built-in capabilities,"
          muted="switched on per agent."
          body="Each one is a card in the agent’s toolbox: switch it on, set it up, test it in the chat beside it. Plus any tool from a connected MCP server, and capabilities your engineers add in typed Python."
        />

        <div className="rail sm:grid mt-14 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityGroups.map((group, index) => (
            <Reveal key={group.title} delay={(index % 3) * 0.07} className="h-full">
              <article className="spotlight group flex h-full flex-col overflow-hidden rounded-[22px] bg-card shadow-[0_30px_60px_-36px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-transform duration-500 ease-out-soft hover:-translate-y-1">
                <div className="relative overflow-hidden border-b border-line">
                  <CapabilityArt
                    id={group.art}
                    className="transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-soft shadow-sm backdrop-blur">
                    {group.names.length} {group.names.length === 1 ? "capability" : "capabilities"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[20px] font-medium tracking-[-0.02em] text-ink">{group.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{group.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
                    {group.names.map((name) => (
                      <li
                        key={name}
                        className="rounded-full bg-paper px-2.5 py-1 text-[12.5px] font-medium text-ink-soft ring-1 ring-line"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <a
            href={links.capabilities}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-4 py-2 text-[14px] font-medium text-white/85 ring-1 ring-white/15 transition-colors hover:bg-white/[0.12] hover:text-white"
          >
            Every capability, its tools and settings <ArrowUpRight className="size-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
