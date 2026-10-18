"use client";

import { Hand, Mic, PhoneOff, Table2, Zap } from "lucide-react";
import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { BlobAgent } from "@/components/blob";
import { ServiceIcon } from "@/components/brand-icon";
import { ButtonLink, Reveal } from "@/components/ui";
import { links } from "@/content";
import { asset, assetSet } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 1300;

/** The nodes of the lead-routing workflow, in the order a run reaches them. */
const NODES = [
  { id: "trigger", x: 10, y: 120, title: "New row in Leads", kind: "Trigger" },
  { id: "agent", x: 236, y: 120, title: "Qualify the lead", kind: "Agent · structured output" },
  { id: "check", x: 462, y: 120, title: "Score above 70?", kind: "Condition" },
  { id: "approve", x: 700, y: 40, title: "Ask the sales lead", kind: "Approval" },
  { id: "slack", x: 932, y: 40, title: "Post to #sales", kind: "Slack" },
  { id: "table", x: 932, y: 200, title: "Move to Qualified", kind: "Table" },
] as const;
const W = 190;
const H = 56;

const EDGES = [
  { from: 0, to: 1, at: 1 },
  { from: 1, to: 2, at: 2 },
  { from: 2, to: 3, at: 3, label: "yes" },
  { from: 3, to: 4, at: 4 },
  { from: 3, to: 5, at: 4 },
] as const;

function edgePath(fromIndex: number, toIndex: number) {
  const from = NODES[fromIndex];
  const to = NODES[toIndex];
  if (!from || !to) return "";
  const x1 = from.x + W;
  const y1 = from.y + H / 2;
  const x2 = to.x;
  const y2 = to.y + H / 2;
  const mid = (x1 + x2) / 2;
  return `M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
}

function NodeIcon({ id }: { id: string }) {
  if (id === "trigger") return <Zap className="size-4 text-[#e0a10b]" />;
  if (id === "agent") return <BlobAgent color="#f5cdb6" size={18} hop={false} />;
  if (id === "check") return <span className="font-mono text-[13px] font-semibold text-[#5b5bd6]">?</span>;
  if (id === "approve") return <Hand className="size-4 text-[#db2777]" />;
  if (id === "slack") return <ServiceIcon name="slack" className="size-4" />;
  return <Table2 className="size-4 text-[#16794c]" />;
}

function Workflow({ step }: { step: number }) {
  return (
    <div className="relative mx-auto h-[290px] w-[1130px]">
      <svg viewBox="0 0 1130 290" className="absolute inset-0 size-full" aria-hidden>
        {EDGES.map((edge) => {
          const live = step >= edge.at;
          const d = edgePath(edge.from, edge.to);
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <path d={d} fill="none" stroke={live ? "#a5b4fc" : "rgba(255,255,255,0.22)"} strokeWidth={live ? 2 : 1.5} strokeDasharray={live ? undefined : "5 5"} className="transition-[stroke] duration-500" />
              {step === edge.at ? (
                <circle r="5" fill="#c7d2fe">
                  <animateMotion dur={`${STEP_MS / 1000}s`} repeatCount="1" fill="freeze" path={d} />
                </circle>
              ) : null}
            </g>
          );
        })}
        <path d="M652 148 C 676 148, 676 248, 700 248" fill="none" stroke="rgba(255,255,255,0.18)" strokeDasharray="5 5" />
        <text x="706" y="252" fontSize="11" fill="rgba(255,255,255,0.5)">no → nurture list</text>
        <text x="682" y="96" fontSize="11" fill="rgba(199,210,254,0.9)">yes</text>
      </svg>
      {NODES.map((node, index) => {
        const reached = index === 0 ? step >= 0 : step >= (EDGES.find((edge) => edge.to === index)?.at ?? 99);
        return (
          <motion.div
            key={node.id}
            className="absolute flex items-center gap-2.5 rounded-[12px] px-3 ring-1 backdrop-blur-md"
            style={{ left: node.x, top: node.y, width: W, height: H }}
            animate={{
              backgroundColor: reached ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.10)",
              boxShadow: reached ? "0 0 0 1px rgba(165,180,252,0.9), 0 14px 30px -14px rgba(91,91,214,0.7)" : "0 0 0 1px rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-[9px] ${reached ? "bg-[#f4f4f5]" : "bg-white/10"}`}>
              <NodeIcon id={node.id} />
            </span>
            <span className="min-w-0">
              <span className={`block truncate text-[12.5px] font-semibold ${reached ? "text-[#18181b]" : "text-white/85"}`}>{node.title}</span>
              <span className={`block truncate text-[10.5px] ${reached ? "text-[#71717a]" : "text-white/50"}`}>{node.kind}</span>
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

const CARDS = [
  { id: "acme", name: "Acme Corp", score: 82 },
  { id: "lumen", name: "Lumen Health", score: 64 },
  { id: "orbit", name: "Orbit Freight", score: 91 },
] as const;

function Board({ moved }: { moved: boolean }) {
  const columns = [
    { title: "New", ids: moved ? ["lumen"] : ["acme", "lumen"] },
    { title: "Qualified", ids: moved ? ["acme", "orbit"] : ["orbit"] },
    { title: "Won", ids: [] as string[] },
  ];
  return (
    <LayoutGroup>
      <div className="grid grid-cols-3 gap-2">
        {columns.map((column) => (
          <div key={column.title} className="min-h-[150px] rounded-[12px] bg-white/[0.07] p-2 ring-1 ring-white/10">
            <p className="mb-2 px-1 text-[10.5px] font-medium uppercase tracking-[0.06em] text-white/55">{column.title}</p>
            <div className="space-y-1.5">
              {column.ids.map((id) => {
                const card = CARDS.find((item) => item.id === id);
                if (!card) return null;
                return (
                  <motion.div
                    layout
                    layoutId={card.id}
                    key={card.id}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className={`rounded-[9px] bg-white px-2.5 py-2 text-[11.5px] shadow-sm ${card.id === "acme" && moved ? "ring-2 ring-[#a5b4fc]" : ""}`}
                  >
                    <p className="truncate font-semibold text-[#18181b]">{card.name}</p>
                    <p className="text-[10.5px] text-[#71717a]">score {card.score}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </LayoutGroup>
  );
}

function Voice({ live }: { live: boolean }) {
  const bars = Array.from({ length: 28 }, (_, index) => index);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <BlobAgent color="#1fb58f" size={30} hop={false} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-white">Finance Analyst</p>
          <p className="text-[11px] text-white/55">Voice call · 01:12</p>
        </div>
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-white">
          <Mic className="size-4" />
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#ef4444] text-white">
          <PhoneOff className="size-4" />
        </span>
      </div>
      <div className="flex h-10 items-center gap-[3px]">
        {bars.map((bar) => (
          <motion.span
            key={bar}
            className="w-[4px] rounded-full bg-[#a5b4fc]"
            animate={live ? { height: [6, 8 + ((bar * 37) % 26), 6] } : { height: 6 }}
            transition={{ duration: 0.9 + (bar % 5) * 0.12, repeat: Infinity, ease: "easeInOut", delay: (bar % 7) * 0.08 }}
          />
        ))}
      </div>
      <div className="space-y-1.5 text-[12.5px] leading-snug">
        <p className="text-white/70">
          <span className="font-medium text-white">You:</span> What did we invoice in October?
        </p>
        <p className="text-white/70">
          <span className="font-medium text-white">Finance Analyst:</span> $231k, up 12% on September. I am drawing the split by client now.
        </p>
      </div>
    </div>
  );
}

function Glass({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[22px] bg-[#16141f]/55 p-4 ring-1 ring-white/12 backdrop-blur-xl sm:p-5 ${className}`}>{children}</div>;
}

/** Work in review (#1925 workflows and tables, #2204 voice), shown as what is coming rather than what ships. */
export function Soon() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const last = 6;

  useEffect(() => {
    if (reduce) {
      setStep(last);
      return;
    }
    if (!visible) return;
    const timer = window.setTimeout(() => setStep((current) => (current >= last ? 0 : current + 1)), step === last ? STEP_MS * 3 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [step, visible, reduce]);

  return (
    <section id="soon" className="relative isolate overflow-hidden bg-[#16141f] px-5 py-24 md:px-8 md:py-32">
      <img
        src={asset("/images/night-3200.webp")}
        srcSet={assetSet("/images/night-1600.webp 1600w, /images/night-3200.webp 3200w")}
        sizes="100vw"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover opacity-80"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#16141f]/70 via-[#16141f]/30 to-[#16141f]/80" />
      <div ref={ref} className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-blob">
            <span className="size-1.5 animate-pulse rounded-full bg-[#fbbf24]" /> Coming soon
          </span>
          <h2 className="display-tight mt-5 max-w-[22ch] text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium text-white">
            Workflows, tables and voice. <span className="text-white/45">Already in review.</span>
          </h2>
          <p className="mt-5 max-w-[60ch] text-balance text-[17px] leading-relaxed text-white/65">
            Work with fixed steps gets a visual editor: triggers, agents, approvals and tables, with durable runs and a history for every step. Voice
            calls let you talk to any agent. Both are working code in open pull requests, open source like the rest: you can read them and run
            them today.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 space-y-4">
          <Glass>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[13px] font-semibold text-white">
                Lead routing <span className="font-normal text-white/50">· workflow, published v3</span>
              </p>
              <span className="font-mono text-[11px] text-white/55"><span className="sm:hidden">swipe → · </span>{step >= 4 ? "run 1,284 · done in 41 s · $0.06" : "run 1,284 · running"}</span>
            </div>
            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-5 sm:px-5">
              <Workflow step={step} />
            </div>
          </Glass>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <Glass>
              <p className="mb-3 text-[13px] font-semibold text-white">
                Leads <span className="font-normal text-white/50">· table, kanban view</span>
              </p>
              <Board moved={step >= 4} />
            </Glass>
            <Glass>
              <Voice live={visible} />
            </Glass>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={links.workflowsPr} tone="white">Follow workflows on GitHub <span aria-hidden>↗</span></ButtonLink>
          <ButtonLink href={links.voicePr} tone="ghost-light">Follow voice <span aria-hidden>↗</span></ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
