"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { BlobAgent } from "@/components/blob";
import { Typed } from "@/components/movie/parts";
import { Reveal, SectionHeading } from "@/components/ui";
import { teammates } from "@/content";
import { asset, assetSet } from "@/lib/site";

const DWELL_MS = 5600;

/**
 * Where each agent stands on the meadow: `x` across, `y` up from the bottom
 * (both %), `s` its size. Further back reads smaller and higher. Phones get two
 * rows of three; from `lg` the six stand in one staggered line.
 */
const SPOTS = [
  { x: 10, y: 30, s: 0.9, mx: 18, my: 50, ms: 0.8 },
  { x: 26, y: 24, s: 1.04, mx: 50, my: 53, ms: 0.8 },
  { x: 42, y: 29, s: 0.94, mx: 82, my: 50, ms: 0.8 },
  { x: 58, y: 23, s: 1.08, mx: 18, my: 22, ms: 1 },
  { x: 74, y: 28, s: 0.96, mx: 50, my: 19, ms: 1 },
  { x: 90, y: 32, s: 0.95, mx: 82, my: 22, ms: 1 },
] as const;

/** Both meadow layers share one box, so the cut-out grass lands on the grass it was cut from. */
const LAYER = "pointer-events-none absolute inset-0 size-full select-none object-cover object-[50%_100%]";

export function Teammates() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const visible = useInView(stageRef, { amount: 0.5 });
  const reduce = useReducedMotion();
  const running = auto && visible && !reduce;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % teammates.length), DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [active, running]);

  const agent = teammates[active];
  if (agent === undefined) return null;

  return (
    <section id="teammates" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="AI teammates"
          title="Agents with a name, a job"
          muted="and a place on the team."
          body="Each one has its own instructions, tools, knowledge and budget, and colleagues reach it in chat, in Slack or from the API. These six work in the demo organization."
        />

        <Reveal delay={0.1} className="relative mt-12">
          <div
            ref={stageRef}
            className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#e9e2f0] shadow-[0_40px_90px_-50px_rgba(43,37,71,0.55)] ring-1 ring-black/5 sm:aspect-[16/10] lg:aspect-auto lg:h-[600px]"
          >
            <img
              src={asset("/images/meadow-bg-3200.webp")}
              srcSet={assetSet("/images/meadow-bg-1600.webp 1600w, /images/meadow-bg-3200.webp 3200w")}
              sizes="(min-width: 1240px) 1240px, 100vw"
              alt=""
              loading="lazy"
              className={LAYER}
            />
            {/* Late sun from the right, warming the meadow the agents stand in. */}
            <div aria-hidden className="pointer-events-none absolute -right-24 top-[28%] size-[420px] rounded-full bg-[#ffe7b8]/40 blur-[90px]" />

            <div role="tablist" aria-label="Agents in the demo organization" className="absolute inset-0">
              {teammates.map((teammate, index) => {
                const spot = SPOTS[index] ?? SPOTS[0];
                const selected = index === active;
                const style = {
                  "--x": `${spot.x}%`,
                  "--y": `${spot.y}%`,
                  "--mx": `${spot.mx}%`,
                  "--my": `${spot.my}%`,
                  "--s": spot.s,
                  "--ms": spot.ms,
                } as CSSProperties;
                return (
                  <button
                    key={teammate.name}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="teammate-detail"
                    onClick={() => {
                      setActive(index);
                      setAuto(false);
                    }}
                    style={style}
                    className="group absolute bottom-[var(--my)] left-[var(--mx)] flex -translate-x-1/2 flex-col items-center gap-2 outline-none lg:bottom-[var(--y)] lg:left-[var(--x)]"
                  >
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-medium shadow-[0_6px_16px_-8px_rgba(43,37,71,0.5)] transition-colors duration-300 md:text-[13px] ${
                        selected ? "bg-ink text-white" : "invisible bg-white/85 text-ink-soft backdrop-blur group-hover:bg-white sm:visible"
                      }`}
                    >
                      {teammate.name}
                    </span>
                    <motion.span
                      animate={{ y: selected ? -12 : 0 }}
                      transition={{ type: "spring", stiffness: 360, damping: 16 }}
                      className="relative origin-bottom scale-[var(--ms)] lg:scale-[var(--s)]"
                    >
                      {selected ? (
                        <motion.span
                          layoutId="teammate-light"
                          aria-hidden
                          className="absolute -bottom-3 left-1/2 h-8 w-[150%] -translate-x-1/2 rounded-[50%] bg-white/70 blur-md"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      ) : null}
                      <BlobAgent color={teammate.color} size={66} delay={index * 0.55} className="relative transition-transform duration-300 group-hover:-translate-y-1" />
                    </motion.span>
                  </button>
                );
              })}
            </div>

            <img
              src={asset("/images/meadow-fg-3200.webp")}
              srcSet={assetSet("/images/meadow-fg-1600.webp 1600w, /images/meadow-fg-3200.webp 3200w")}
              sizes="(min-width: 1240px) 1240px, 100vw"
              alt=""
              loading="lazy"
              className={LAYER}
            />
          </div>

          <div
            id="teammate-detail"
            role="tabpanel"
            className="relative mt-4 lg:absolute lg:left-1/2 lg:top-10 lg:mt-0 lg:w-[720px] lg:-translate-x-1/2"
          >
            <div className="rounded-[22px] bg-white/85 p-5 shadow-[0_30px_60px_-30px_rgba(43,37,71,0.5)] ring-1 ring-white backdrop-blur-xl md:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >
                  <p className="ml-auto min-h-[46px] max-w-[88%] rounded-[16px] rounded-br-[5px] bg-[#f1f1f3] px-4 py-2.5 text-[14px] leading-relaxed text-ink">
                    <Typed text={agent.ask} active={!reduce} done={Boolean(reduce)} cps={55} />
                  </p>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-paper ring-1 ring-line">
                        <BlobAgent color={agent.color} size={30} hop={false} />
                      </span>
                      <div>
                        <p className="font-display text-[18px] font-medium tracking-[-0.01em] text-ink">{agent.name}</p>
                        <p className="mt-0.5 text-pretty text-[14.5px] leading-relaxed text-muted">{agent.job}</p>
                      </div>
                    </div>
                    <ul className="flex shrink-0 flex-wrap gap-1.5 md:justify-end">
                      {agent.tools.map((tool) => (
                        <li key={tool} className="rounded-full bg-paper px-2.5 py-1 text-[12.5px] font-medium text-ink-soft ring-1 ring-line">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
