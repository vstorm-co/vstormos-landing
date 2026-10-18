"use client";

import { AppWindow, Box, Check, Code2, Download, GitBranch, Maximize2, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { BlobAgent } from "@/components/blob";
import { SpotlightList } from "@/components/spotlight-list";
import { Reveal, SectionHeading, SectionLinks } from "@/components/ui";
import { links } from "@/content";
import { asset, assetSet } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 2300;
const INK = "#5b5bd6";

type Drawing = "flow" | "calculator" | "scene";

/** What the window shows at each step, and which promise beside it lights up. */
const STEPS: readonly { drawing: Drawing; amount?: number; lit: number }[] = [
  { drawing: "flow", amount: 150, lit: 0 },
  { drawing: "flow", amount: 900, lit: 0 },
  { drawing: "flow", amount: 3400, lit: 0 },
  { drawing: "calculator", lit: 1 },
  { drawing: "calculator", lit: 1 },
  { drawing: "scene", lit: 2 },
  { drawing: "scene", lit: 2 },
  { drawing: "scene", lit: 3 },
];

const ASKS: Record<Drawing, { prompt: string; agent: string; color: string; source: string; title: string }> = {
  flow: {
    prompt: "How does a refund get approved? Draw it, with a slider for the amount.",
    agent: "Support Desk",
    color: "#f2b8c6",
    source: "from the refund policy",
    title: "Refund approval",
  },
  calculator: {
    prompt: "What would Autopilot save us a year? Build me a calculator.",
    agent: "Finance Analyst",
    color: "#1fb58f",
    source: "from invoices.csv",
    title: "Autopilot ROI",
  },
  scene: {
    prompt: "Show refunds by region and quarter, in 3D.",
    agent: "Support Desk",
    color: "#f2b8c6",
    source: "from refunds.xlsx",
    title: "Refunds by region",
  },
};

const KINDS = [
  { icon: GitBranch, title: "Diagrams and flows", body: "From your documents, in SVG or Mermaid." },
  { icon: SlidersHorizontal, title: "Calculators and simulators", body: "A whole HTML page with sliders and a canvas." },
  { icon: Box, title: "3D scenes", body: "three.js, rotated and zoomed in the chat." },
  { icon: AppWindow, title: "Saved as an app", body: "One click, versions included, opened by link." },
] as const;

/* ---------- The refund flow ---------------------------------------------- */

/** The refund policy the Expertise section quotes: who approves a refund of a given amount. */
function approver(amount: number) {
  if (amount <= 200) return 2;
  if (amount <= 2000) return 1;
  return 0;
}

const OUTCOMES = [
  { label: "Finance approves", note: "above $2,000", y: 34, who: "FN", color: "#7fb4f0" },
  { label: "Support lead approves", note: "$200 to $2,000", y: 116, who: "TB", color: "#f0a77f" },
  { label: "Support Desk refunds", note: "up to $200", y: 198, who: "", color: "#f2b8c6" },
] as const;

/** A right-angled wire with rounded corners, from the amount to one outcome. */
function elbow(y: number) {
  const x1 = 412;
  const y1 = 142;
  const turn = 438;
  const x2 = 458;
  if (Math.abs(y - y1) < 2) return `M${x1} ${y1} H ${x2}`;
  const down = y > y1 ? 1 : -1;
  return `M${x1} ${y1} H ${turn - 10} Q ${turn} ${y1} ${turn} ${y1 + 10 * down} V ${y - 10 * down} Q ${turn} ${y} ${turn + 10} ${y} H ${x2}`;
}

function RefundFlow({ amount }: { amount: number }) {
  const lit = approver(amount);
  const shown = OUTCOMES[lit];
  const scroller = useRef<HTMLDivElement>(null);
  // On a narrow screen the flow scrolls; start at its right end, where the amount decides who approves.
  useEffect(() => {
    const element = scroller.current;
    if (element) element.scrollLeft = element.scrollWidth;
  }, []);
  return (
    <div className="flex h-full flex-col">
      <div ref={scroller} className="min-h-0 flex-1 overflow-x-auto [scrollbar-width:none]">
        <svg viewBox="0 0 640 250" className="h-full min-w-[520px] w-full" role="img" aria-label={`Refund of $${amount}: ${shown?.label}`}>
          <defs>
            <marker id="draw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0L10,5L0,10z" fill={INK} />
            </marker>
          </defs>
          {/* request, its window, its amount */}
          {[
            { x: 14, w: 132, title: "Refund request", sub: "order #10482" },
            { x: 176, w: 136, title: "Within 14 days?", sub: "yes, day 9" },
            { x: 342, w: 70, title: `$${amount.toLocaleString("en-US")}`, sub: "amount" },
          ].map((node, index) => (
            <motion.g key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.12 }}>
              <rect x={node.x} y="116" width={node.w} height="52" rx="12" fill="#fff" stroke="#e4e4e7" />
              <text x={node.x + node.w / 2} y="138" textAnchor="middle" fontSize="13" fontWeight="600" fill="#18181b">
                {node.title}
              </text>
              <text x={node.x + node.w / 2} y="155" textAnchor="middle" fontSize="11" fill="#a1a1aa">
                {node.sub}
              </text>
            </motion.g>
          ))}
          <path d="M146 142 H 172" stroke={INK} strokeWidth="2" fill="none" markerEnd="url(#draw-arrow)" />
          <path d="M312 142 H 338" stroke={INK} strokeWidth="2" fill="none" markerEnd="url(#draw-arrow)" />
          {OUTCOMES.map((outcome, index) => {
            const on = lit === index;
            return (
              <g key={outcome.label}>
                <path
                  d={elbow(outcome.y + 26)}
                  fill="none"
                  stroke={on ? INK : "#d4d4d8"}
                  strokeWidth={on ? 2.25 : 1.5}
                  strokeDasharray={on ? "6 5" : undefined}
                  markerEnd={on ? "url(#draw-arrow)" : undefined}
                  className={on ? "[animation:flow_0.8s_linear_infinite]" : ""}
                />
                <motion.rect
                  x="462"
                  y={outcome.y}
                  width="174"
                  height="52"
                  rx="12"
                  animate={{ fill: on ? "#eef0ff" : "#ffffff", stroke: on ? INK : "#e4e4e7" }}
                  transition={{ duration: 0.35 }}
                  strokeWidth={on ? 1.5 : 1}
                />
                <circle cx="484" cy={outcome.y + 26} r="11" fill={outcome.color} />
                <text x="484" y={outcome.y + 30} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
                  {outcome.who || "SD"}
                </text>
                <text x="502" y={outcome.y + 23} fontSize="11.5" fontWeight="600" fill={on ? "#3b3fb8" : "#3f3f46"}>
                  {outcome.label}
                </text>
                <text x="502" y={outcome.y + 39} fontSize="10.5" fill="#a1a1aa">
                  {outcome.note}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[#f0f0f2] px-1 pt-3 text-[12.5px]">
        <span className="text-[#71717a]">Who decides</span>
        <motion.span
          key={lit}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#eef0ff] px-2.5 py-1 font-medium text-[#3b3fb8]"
        >
          <Check className="size-3.5" /> {shown?.label}
        </motion.span>
      </div>
    </div>
  );
}

/* ---------- The ROI calculator ------------------------------------------- */

function Calculator({ phase }: { phase: number }) {
  const invoices = phase >= 1 ? 1200 : 800;
  const minutes = 12;
  const hours = Math.round((invoices * minutes * 0.8) / 60);
  const saved = hours * 45 * 12;
  const before = invoices * minutes * 0.75;
  const after = before * 0.2;
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-3 text-[12px] text-[#52525b]">
        {[
          { label: "Invoices per month", value: invoices.toLocaleString("en-US"), share: invoices / 2000 },
          { label: "Minutes per invoice today", value: `${minutes} min`, share: minutes / 30 },
          { label: "Hourly cost", value: "$45", share: 45 / 120 },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex justify-between">
              <span>{row.label}</span>
              <span className="font-mono font-medium text-[#18181b]">{row.value}</span>
            </div>
            <div className="relative mt-1.5 h-1.5 rounded-full bg-[#ececef]">
              <motion.div className="absolute inset-y-0 left-0 rounded-full bg-[#1fb58f]" animate={{ width: `${row.share * 100}%` }} transition={{ duration: 0.9, ease: EASE }} />
              <motion.span
                className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1fb58f] shadow"
                animate={{ left: `${row.share * 100}%` }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </div>
          </div>
        ))}
        <div className="rounded-[12px] bg-[#0f2e25] p-3 text-white">
          <p className="text-[11px] text-white/60">Saved per year</p>
          <p className="font-mono text-[24px] font-semibold tabular-nums">${saved.toLocaleString("en-US")}</p>
          <p className="text-[11px] text-white/60">{hours} hours back every month</p>
        </div>
      </div>
      <div className="hidden flex-col sm:flex">
        <p className="text-[12px] font-medium text-[#18181b]">Monthly cost, before vs after</p>
        <div className="mt-3 flex flex-1 items-end gap-6 border-b border-l border-[#ececef] px-6 pb-0">
          {[
            { label: "Today", value: before, color: "#0f2e25" },
            { label: "With Autopilot", value: after, color: "#8fd3b9" },
          ].map((bar) => (
            <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
              <span className="font-mono text-[11px] text-[#52525b]">${Math.round(bar.value).toLocaleString("en-US")}</span>
              <motion.div className="w-full rounded-t-[6px]" style={{ background: bar.color }} animate={{ height: (bar.value / 11000) * 150 }} transition={{ duration: 0.9, ease: EASE }} />
            </div>
          ))}
        </div>
        <div className="flex gap-6 px-6 pt-1.5 text-center text-[11px] text-[#a1a1aa]">
          <span className="flex-1">Today</span>
          <span className="flex-1">With Autopilot</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- The 3D scene -------------------------------------------------- */

const REGIONS = ["Americas", "EMEA", "APAC"] as const;
const HEIGHTS = [
  [62, 80, 74, 96],
  [48, 58, 70, 66],
  [30, 36, 44, 52],
] as const;
/** Each region's side, other side and top. */
const PALETTE = [
  ["#5b5bd6", "#7f7fe4", "#c7c7f5"],
  ["#1a9c7b", "#3fbf9b", "#b5ead9"],
  ["#e0728a", "#ef98ab", "#fbd5dd"],
] as const;

/** Bars on a grid, turned about the vertical axis and drawn back to front. */
function Scene({ turning }: { turning: boolean }) {
  const [angle, setAngle] = useState(0.6);
  useEffect(() => {
    if (!turning) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      setAngle((current) => current + ((now - last) / 1000) * 0.35);
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [turning]);

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const tilt = 0.5;
  const project = (x: number, y: number, z: number) => {
    const rx = x * cos - z * sin;
    const rz = x * sin + z * cos;
    const zoom = 1.45;
    return { x: 320 + rx * zoom, y: 175 + (rz * tilt - y) * zoom, depth: rz };
  };
  const size = 26;
  const bars = HEIGHTS.flatMap((row, r) =>
    row.map((height, q) => {
      const cx = (q - 1.5) * 52;
      const cz = (r - 1) * 52;
      const center = project(cx, 0, cz);
      return { r, q, cx, cz, height: height * 0.9, depth: center.depth };
    }),
  ).sort((a, b) => a.depth - b.depth);

  const face = (points: { x: number; y: number }[]) => points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox="0 0 640 250" className="h-full w-full" role="img" aria-label="Refunds by region and quarter as 3D bars">
      {/* the floor */}
      <polygon
        points={face([project(-120, 0, -96), project(120, 0, -96), project(120, 0, 96), project(-120, 0, 96)])}
        fill="#f4f4f8"
        stroke="#e4e4e7"
      />
      {bars.map((bar) => {
        const h = size / 2;
        const corners = [
          [-h, -h],
          [h, -h],
          [h, h],
          [-h, h],
        ].map(([dx = 0, dz = 0]) => ({ base: project(bar.cx + dx, 0, bar.cz + dz), top: project(bar.cx + dx, bar.height, bar.cz + dz) }));
        const sides = [0, 1, 2, 3]
          .map((index) => {
            const a = corners[index];
            const b = corners[(index + 1) % 4];
            if (!a || !b) return null;
            return { index, depth: (a.base.depth + b.base.depth) / 2, points: [a.base, b.base, b.top, a.top] };
          })
          .filter((side): side is NonNullable<typeof side> => side !== null)
          .sort((a, b) => b.depth - a.depth)
          .slice(0, 2);
        const colors = PALETTE[bar.r] ?? PALETTE[0];
        return (
          <g key={`${bar.r}-${bar.q}`}>
            {sides.map((side) => (
              <polygon key={side.index} points={face(side.points)} fill={side.index % 2 ? colors[1] : colors[0]} stroke="#fff" strokeWidth="0.6" />
            ))}
            <polygon points={face(corners.map((corner) => corner.top))} fill={colors[2]} stroke="#fff" strokeWidth="0.6" />
          </g>
        );
      })}
      {REGIONS.map((region, index) => {
        const label = project(-150, 0, (index - 1) * 52);
        return (
          <text key={region} x={label.x} y={label.y} textAnchor="middle" fontSize="11" fill="#71717a">
            {region}
          </text>
        );
      })}
    </svg>
  );
}

/* ---------- The section --------------------------------------------------- */

export function Draws() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  // It opens on the calculator, then plays on in order and wraps to the flow.
  const [step, setStep] = useState(() => Math.max(0, STEPS.findIndex((item) => KINDS[item.lit]?.title === "Calculators and simulators")));
  const [touched, setTouched] = useState(false);
  const [amount, setAmount] = useState(150);

  // Until somebody moves the slider, the window walks through a flow, a calculator and a 3D scene.
  useEffect(() => {
    if (!visible || touched || reduce) return;
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % STEPS.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [step, visible, touched, reduce]);

  const current = STEPS[step] ?? STEPS[0];
  const drawing = touched ? "flow" : (current?.drawing ?? "flow");
  const shownAmount = touched ? amount : (current?.amount ?? 3400);
  const lit = touched ? 0 : (current?.lit ?? 0);
  const ask = ASKS[drawing];
  const saved = !touched && step === STEPS.length - 1;

  return (
    <section id="draws" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="New · Visuals"
          title="Ask how it works,"
          muted="get a drawing you can use."
          body="An agent draws while it writes: a flow from your policy, a calculator with sliders, a 3D scene. It runs safely walled off from your data, and one click saves it as an app your team opens by link. Try the flow below."
        />
        <Reveal delay={0.1} className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-stretch">
          <div ref={ref} className="relative min-w-0 overflow-hidden rounded-[28px] bg-[#dfe7ef] p-3 shadow-[0_40px_90px_-50px_rgba(43,37,71,0.55)] ring-1 ring-black/5 sm:p-8">
            <img
              src={asset("/images/meadow-bg-3200.webp")}
              srcSet={assetSet("/images/meadow-bg-1600.webp 1600w, /images/meadow-bg-3200.webp 3200w")}
              sizes="(min-width: 1240px) 720px, 100vw"
              alt=""
              loading="lazy"
              className="pointer-events-none absolute inset-0 size-full select-none object-cover"
            />
            <div className="relative mx-auto max-w-[680px] overflow-hidden rounded-[18px] bg-white/95 shadow-[0_30px_80px_-30px_rgba(16,24,40,0.55)] ring-1 ring-black/5 backdrop-blur">
              <div className="space-y-3 p-4 sm:p-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={drawing} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }} className="space-y-3">
                    <p className="ml-auto w-fit max-w-[90%] rounded-[16px] rounded-br-[6px] bg-[#f4f4f5] px-3.5 py-2 text-[13px] text-[#27272a]">{ask.prompt}</p>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#18181b]">
                      <BlobAgent color={ask.color} size={22} hop={false} /> {ask.agent}
                      <span className="font-normal text-[#a1a1aa]">· {ask.source}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#ececef] sm:mx-5 sm:mb-5">
                <div className="flex items-center justify-between gap-2 border-b border-[#f0f0f2] bg-[#fafafa] px-3 py-2">
                  <span className="truncate text-[12px] font-medium text-[#3f3f46]">{ask.title}</span>
                  <span className="flex shrink-0 items-center gap-1 text-[#a1a1aa]">
                    {[Maximize2, Code2, Download].map((Icon, index) => (
                      <span key={index} className="hidden size-6 items-center justify-center rounded-[6px] sm:inline-flex">
                        <Icon className="size-3.5" />
                      </span>
                    ))}
                    <motion.span
                      animate={saved ? { scale: [1, 0.92, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className={`ml-1 inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-[11px] font-medium ${saved ? "bg-[#16794c] text-white" : "bg-[#18181b] text-white"}`}
                    >
                      {saved ? <Check className="size-3" /> : <AppWindow className="size-3" />} {saved ? "Saved to Apps" : "Save to Apps"}
                    </motion.span>
                  </span>
                </div>

                <div className="relative h-[300px] p-4 sm:h-[310px] sm:p-5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={drawing}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="h-full"
                    >
                      {drawing === "flow" ? (
                        <RefundFlow amount={shownAmount} />
                      ) : drawing === "calculator" ? (
                        <Calculator phase={step - 3} />
                      ) : (
                        <Scene turning={visible && !reduce} />
                      )}
                    </motion.div>
                  </AnimatePresence>

                </div>

                {drawing === "flow" ? (
                  <label className="flex items-center gap-3 border-t border-[#f0f0f2] px-4 py-3 text-[12px] text-[#52525b] sm:px-5">
                    Amount
                    <input
                      type="range"
                      min={20}
                      max={5000}
                      step={10}
                      value={shownAmount}
                      onChange={(event) => {
                        setTouched(true);
                        setAmount(Number(event.target.value));
                      }}
                      className="h-1.5 flex-1 cursor-pointer accent-[#5b5bd6]"
                      aria-label="Refund amount in dollars"
                    />
                    <span className="w-14 text-right font-mono text-[12.5px] font-medium tabular-nums text-[#18181b]">${shownAmount.toLocaleString("en-US")}</span>
                  </label>
                ) : null}
              </div>
            </div>
          </div>

          <SpotlightList items={KINDS} lit={lit} onPick={(index) => {
              setTouched(false);
              setStep(Math.max(0, STEPS.findIndex((item) => item.lit === index)));
            }} />
        </Reveal>
        <SectionLinks docs={links.visuals} docsLabel="What agents can draw" />
      </div>
    </section>
  );
}
