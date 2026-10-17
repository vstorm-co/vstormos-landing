"use client";

import { ArrowUpRight, FlaskConical, Globe, LayoutDashboard, Users, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Reveal, SectionHeading } from "@/components/ui";
import { showcase, type Showcase as Entry } from "@/content";
import { asset } from "@/lib/site";

const DWELL_MS = 7000;

const ICONS: Record<Entry["icon"], LucideIcon> = {
  users: Users,
  globe: Globe,
  flask: FlaskConical,
  layout: LayoutDashboard,
};

/**
 * Real screens from the demo organization, one per tab. It advances by itself
 * while the panel is on screen and nobody has picked a tab; hovering pauses it.
 * Every screen stays mounted, so switching never waits on a download.
 */
export function Showcase() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const visible = useInView(panelRef, { amount: 0.45 });
  const reduce = useReducedMotion();
  const running = auto && !paused && visible && !reduce;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % showcase.length), DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [active, running]);

  const choose = (index: number, focus = false) => {
    setActive(index);
    setAuto(false);
    if (focus) tabRefs.current[index]?.focus();
  };

  // WAI-ARIA tabs: arrows move between tabs, Home and End jump to the ends.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = showcase.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    choose(next, true);
  };

  const item = showcase[active];
  if (item === undefined) return null;

  return (
    <section id="product" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="Product"
          title="One place for the agents"
          muted="your teams actually use."
          body="Chat with them, hand them a task, watch them work, and keep what they make. Real screens from a demo organization, not mock-ups."
        />

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <div className="relative max-w-full">
            <div
              role="tablist"
              aria-label="Product highlights"
              onKeyDown={onKeyDown}
              className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-card p-1 max-md:[mask-image:linear-gradient(90deg,#000_80%,transparent)] shadow-[0_1px_0_rgba(22,20,31,0.04)] ring-1 ring-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {showcase.map((entry, index) => {
                const selected = index === active;
                const Icon = ICONS[entry.icon];
                return (
                  <button
                    key={entry.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${entry.id}`}
                    aria-selected={selected}
                    aria-controls="showcase-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choose(index)}
                    className={`relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors duration-300 ${
                      selected ? "text-white" : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="showcase-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                    <Icon className="relative size-4" strokeWidth={1.9} />
                    <span className="relative">{entry.tab}</span>
                    {selected && running ? (
                      <motion.span
                        key={`progress-${active}`}
                        className="absolute inset-x-4 bottom-[5px] h-[2px] origin-left rounded-full bg-blob/80"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-6 md:mt-8">
          <div
            ref={panelRef}
            id="showcase-panel"
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="grain relative overflow-hidden rounded-[24px] bg-violet md:rounded-[30px]"
          >
            <img
              src={asset("/images/cta-1400.webp")}
              alt=""
              className="absolute inset-0 size-full scale-110 object-cover opacity-75 blur-[3px]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-violet/80 via-violet/30 to-violet/10" />

            <div className="relative grid gap-7 p-4 pt-7 sm:p-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,2.3fr)] lg:items-center lg:gap-12 lg:p-12">
              <div className="min-h-[170px] px-2 text-white sm:px-0 lg:min-h-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-blob">
                      {String(active + 1).padStart(2, "0")}
                      <span className="text-white/40"> / {String(showcase.length).padStart(2, "0")}</span>
                    </p>
                    <h3 className="display-tight mt-4 text-balance text-[clamp(1.6rem,2.6vw,2.35rem)] font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-pretty text-[15.5px] leading-relaxed text-white/75">{item.body}</p>
                    <a
                      href={item.more.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-1 text-[14px] font-medium text-white/90 underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white"
                    >
                      {item.more.label} <ArrowUpRight className="size-3.5" />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="rounded-[14px] bg-white/15 p-1 shadow-[0_30px_80px_-30px_rgba(15,10,40,0.85)] ring-1 ring-white/30 backdrop-blur-sm md:rounded-[18px] md:p-1.5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-white md:rounded-[13px]">
                  {showcase.map((entry, index) => (
                    <motion.img
                      key={entry.id}
                      src={asset(entry.image)}
                      alt={index === active ? entry.alt : ""}
                      aria-hidden={index !== active}
                      width={entry.width}
                      height={entry.height}
                      loading={index === 0 ? "eager" : "lazy"}
                      initial={false}
                      animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.015 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 size-full object-cover object-top"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
