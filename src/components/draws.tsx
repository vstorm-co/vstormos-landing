"use client";

import { AppWindow, Box, Code2, Download, GitBranch, Maximize2, SlidersHorizontal, Wrench } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { BlobAgent } from "@/components/blob";
import { Reveal, SectionHeading } from "@/components/ui";

const SUPPORT = "#f2b8c6";
const EASE = [0.22, 1, 0.36, 1] as const;

/** The refund policy the Expertise section quotes: who approves a refund of a given amount. */
function approver(amount: number) {
  if (amount <= 200) return 2;
  if (amount <= 2000) return 1;
  return 0;
}

const BRANCHES = [
  { label: "Finance approves", note: "above $2,000", y: 40 },
  { label: "Support lead approves", note: "$200 to $2,000", y: 120 },
  { label: "Support Desk refunds", note: "up to $200", y: 200 },
] as const;

/**
 * What an agent with Visuals draws under its answer, made interactive here: move
 * the amount and the path to the person who decides lights up.
 */
function RefundFlow({ amount, drawn }: { amount: number; drawn: boolean }) {
  const lit = approver(amount);
  const stroke = (on: boolean) => (on ? "#5b5bd6" : "#d4d4d8");
  const path = { initial: { pathLength: 0 }, animate: { pathLength: drawn ? 1 : 0 } };
  return (
    <svg viewBox="0 0 560 240" className="w-full" role="img" aria-label={`Refund of $${amount}: ${BRANCHES[lit]?.label}`}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto">
          <path d="M0,0L10,5L0,10z" fill="#5b5bd6" />
        </marker>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="#ececf1" />
        </pattern>
      </defs>
      <rect width="560" height="240" fill="url(#dots)" />
      {/* request -> within 14 days -> amount */}
      <motion.path d="M118 120 H 168" stroke="#5b5bd6" strokeWidth="2" fill="none" markerEnd="url(#arrow)" {...path} transition={{ duration: 0.5, ease: EASE }} />
      <motion.path d="M292 120 H 330" stroke="#5b5bd6" strokeWidth="2" fill="none" markerEnd="url(#arrow)" {...path} transition={{ duration: 0.5, delay: 0.3, ease: EASE }} />
      {BRANCHES.map((branch, index) => (
        <motion.path
          key={branch.label}
          d={`M396 120 C 416 120, 410 ${branch.y}, 428 ${branch.y}`}
          stroke={stroke(lit === index)}
          strokeWidth={lit === index ? 2.5 : 1.5}
          strokeDasharray={lit === index ? "6 5" : undefined}
          fill="none"
          markerEnd={lit === index ? "url(#arrow)" : undefined}
          {...path}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: EASE }}
          className={lit === index ? "[animation:flow_0.8s_linear_infinite]" : ""}
        />
      ))}
      {[
        { x: 10, w: 108, title: "Refund request", sub: "order #10482" },
        { x: 170, w: 122, title: "Within 14 days?", sub: "yes" },
        { x: 332, w: 64, title: `$${amount.toLocaleString("en-US")}`, sub: "amount" },
      ].map((node, index) => (
        <motion.g key={node.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: drawn ? 1 : 0, y: drawn ? 0 : 6 }} transition={{ duration: 0.4, delay: index * 0.15 }}>
          <rect x={node.x} y="96" width={node.w} height="48" rx="10" fill="#fff" stroke="#e4e4e7" />
          <text x={node.x + node.w / 2} y="117" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#18181b">
            {node.title}
          </text>
          <text x={node.x + node.w / 2} y="133" textAnchor="middle" fontSize="10.5" fill="#a1a1aa">
            {node.sub}
          </text>
        </motion.g>
      ))}
      {BRANCHES.map((branch, index) => (
        <motion.g key={branch.label} initial={{ opacity: 0 }} animate={{ opacity: drawn ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}>
          <rect
            x="430"
            y={branch.y - 22}
            width="128"
            height="44"
            rx="10"
            fill={lit === index ? "#eef0ff" : "#fff"}
            stroke={lit === index ? "#5b5bd6" : "#e4e4e7"}
            strokeWidth={lit === index ? 1.5 : 1}
          />
          <text x="494" y={branch.y - 3} textAnchor="middle" fontSize="10.5" fontWeight="600" fill={lit === index ? "#3b3fb8" : "#3f3f46"}>
            {branch.label}
          </text>
          <text x="494" y={branch.y + 12} textAnchor="middle" fontSize="10" fill="#a1a1aa">
            {branch.note}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

const KINDS = [
  { icon: GitBranch, title: "Diagrams and flows", body: "From your documents, in SVG or Mermaid." },
  { icon: SlidersHorizontal, title: "Calculators and simulators", body: "A whole HTML page with sliders and a canvas." },
  { icon: Box, title: "3D scenes", body: "three.js, rotated and zoomed in the chat." },
  { icon: Wrench, title: "Fixed in the same turn", body: "If your browser breaks it, the agent hears and repairs it." },
  { icon: AppWindow, title: "Saved as an app", body: "One click, versions included, opened by link." },
] as const;

export function Draws() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4, once: true });
  const reduce = useReducedMotion();
  const [amount, setAmount] = useState(150);
  const [touched, setTouched] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // On a narrow screen the flow scrolls; start at its right end, where the amount decides who approves.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) canvas.scrollLeft = canvas.scrollWidth;
  }, []);

  // Until somebody moves the slider, it walks through the three branches on its own.
  useEffect(() => {
    if (!visible || touched || reduce) return;
    const stops = [150, 900, 3400, 900];
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % stops.length;
      setAmount(stops[index] ?? 150);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [visible, touched, reduce]);

  return (
    <section id="draws" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="New · Visuals"
          title="Ask how it works,"
          muted="get a drawing you can use."
          body="An agent draws while it writes: a flow from your policy, a calculator with sliders, a 3D scene. It runs in a sandbox, and one click saves it as an app your team opens by link. Try the one below."
        />
        <Reveal delay={0.1} className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
          <div ref={ref} className="min-w-0 rounded-[28px] bg-gradient-to-b from-[#efeaf8] to-[#e8e2f6] p-3 ring-1 ring-[#ddd6f5] sm:p-5">
            <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_30px_70px_-40px_rgba(43,37,71,0.6)] ring-1 ring-black/5">
              <div className="space-y-3 p-4 sm:p-5">
                <p className="ml-auto w-fit max-w-[90%] rounded-[16px] rounded-br-[6px] bg-[#f4f4f5] px-3.5 py-2 text-[13px] text-[#27272a]">
                  How does a refund get approved? Draw it, with a slider for the amount.
                </p>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#18181b]">
                  <BlobAgent color={SUPPORT} size={22} hop={false} /> Support Desk
                  <span className="font-normal text-[#a1a1aa]">· from the refund policy</span>
                </div>
              </div>
              <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#ececef] sm:mx-5 sm:mb-5">
                <div className="flex items-center justify-between gap-2 border-b border-[#f0f0f2] bg-[#fafafa] px-3 py-2">
                  <span className="text-[12px] font-medium text-[#3f3f46]">Refund approval</span>
                  <span className="flex items-center gap-1 text-[#a1a1aa]">
                    {[Maximize2, Code2, Download].map((Icon, index) => (
                      <span key={index} className="inline-flex size-6 items-center justify-center rounded-[6px]">
                        <Icon className="size-3.5" />
                      </span>
                    ))}
                    <span className="ml-1 inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#18181b] px-2.5 text-[11px] font-medium text-white">
                      <AppWindow className="size-3" /> <span className="hidden sm:inline">Save to Apps</span><span className="sm:hidden">Save</span>
                    </span>
                  </span>
                </div>
                <div ref={canvasRef} className="overflow-x-auto px-3 pt-4 [scrollbar-width:none] sm:px-5">
                  <div className="min-w-[520px]">
                    <RefundFlow amount={amount} drawn={visible || !!reduce} />
                  </div>
                </div>
                <label className="flex items-center gap-3 px-4 pb-4 pt-2 text-[12px] text-[#52525b] sm:px-6">
                  Amount
                  <input
                    type="range"
                    min={20}
                    max={5000}
                    step={10}
                    value={amount}
                    onChange={(event) => {
                      setTouched(true);
                      setAmount(Number(event.target.value));
                    }}
                    className="h-1.5 flex-1 cursor-pointer accent-[#5b5bd6]"
                    aria-label="Refund amount in euros"
                  />
                  <span className="w-14 text-right font-mono text-[12.5px] font-medium text-[#18181b] tabular-nums">${amount.toLocaleString("en-US")}</span>
                </label>
              </div>
            </div>
          </div>

          <ul className="min-w-0 space-y-2">
            {KINDS.map((kind) => (
              <li key={kind.title} className="flex gap-3.5 rounded-[18px] p-3.5">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-card text-ink-soft ring-1 ring-line">
                  <kind.icon className="size-[18px]" strokeWidth={1.9} />
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-ink">{kind.title}</span>
                  <span className="block text-[14px] leading-snug text-muted">{kind.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
