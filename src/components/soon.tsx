"use client";

import { Check, GitBranch, Hand, History, Maximize, Mic, Minus, PhoneOff, Plus, Split, Table2, TableProperties, Workflow as WorkflowIcon, Zap } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { BlobAgent } from "@/components/blob";
import { ServiceIcon } from "@/components/brand-icon";
import { Typed } from "@/components/movie/parts";
import { ButtonLink, Reveal, SectionHeading } from "@/components/ui";
import { links } from "@/content";
import { asset, assetSet } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 1900;
const LAST = 8;
const SALES = "#f5cdb6";
const MAYA = { initials: "MC", color: "#f0a77f" };

type Tab = "leads" | "workflow" | "calls";

/** Which tab of the window each step shows, and which promise beside it the step proves. */
const TABS: readonly Tab[] = ["leads", "workflow", "workflow", "workflow", "workflow", "workflow", "leads", "workflow", "calls"];
const SPOTLIGHT = [0, 0, 1, 2, 3, 3, 4, 5, 6] as const;

const DETAILS = [
  {
    icon: Zap,
    title: "Start on any event",
    body: "A new row, a schedule, a webhook or an email starts the run.",
  },
  {
    icon: WorkflowIcon,
    title: "Agents as steps",
    body: "An agent reads the lead and returns fields the next step can use.",
  },
  {
    icon: GitBranch,
    title: "Branches you can read",
    body: "Conditions, loops and fallbacks, drawn the way the work flows.",
  },
  {
    icon: Hand,
    title: "A person signs off",
    body: "The run waits for an approval before anything leaves the company.",
  },
  {
    icon: Table2,
    title: "Tables your agents keep",
    body: "Grid and kanban views, relations and formulas, written by runs.",
  },
  {
    icon: History,
    title: "Every run on the record",
    body: "Each step's input, output, time and cost. Retry from the step that failed.",
  },
  {
    icon: Mic,
    title: "Talk to any agent",
    body: "A voice call with the agent that knows the answer, from the console.",
  },
] as const;

function Spinner() {
  return <span className="size-3 shrink-0 animate-spin rounded-full border-[1.5px] border-[#d4d4d8] border-t-[#18181b]" />;
}

function Maya({ size = 22 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        background: MAYA.color,
        fontSize: size * 0.38,
      }}
    >
      {MAYA.initials}
    </span>
  );
}

/** The Leads table: Acme arrives as a new row, and the run later fills in its score and stage. */
function Leads({ step }: { step: number }) {
  const scored = step >= 6;
  const rows = [
    {
      name: "Orbit Freight",
      size: "1,200",
      score: "91",
      stage: "Qualified",
      tone: "green",
    },
    {
      name: "Lumen Health",
      size: "85",
      score: "64",
      stage: "Nurture",
      tone: "grey",
    },
  ] as const;
  return (
    <div className="text-[12.5px]">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-[#18181b]">
          Leads <span className="font-normal text-[#a1a1aa]">· 3 rows</span>
        </p>
        <span className="rounded-[7px] bg-[#f4f4f5] px-2 py-0.5 text-[11px] text-[#52525b]">Grid</span>
      </div>
      <div className="overflow-hidden rounded-[12px] border border-[#ececef]">
        <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)_minmax(0,0.5fr)_minmax(0,0.9fr)] gap-2 border-b border-[#ececef] bg-[#fafafa] px-3 py-2 text-[10.5px] font-medium uppercase tracking-[0.05em] text-[#a1a1aa]">
          <span>Company</span>
          <span>People</span>
          <span>Score</span>
          <span>Stage</span>
        </div>
        <motion.div
          initial={{ opacity: 0, height: 0, backgroundColor: "#eef2ff" }}
          animate={{
            opacity: 1,
            height: "auto",
            backgroundColor: scored ? "#f2fbf6" : "#eef2ff",
          }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)_minmax(0,0.5fr)_minmax(0,0.9fr)] items-center gap-2 border-b border-[#ececef] px-3 py-2.5"
        >
          <span className="flex min-w-0 items-center gap-1.5 truncate font-medium text-[#18181b]">
            Acme Corp {scored ? null : <span className="hidden rounded-full bg-[#5b5bd6] px-1.5 text-[9.5px] font-semibold text-white sm:inline">NEW</span>}
          </span>
          <span className="text-[#52525b]">240</span>
          <span className="font-medium text-[#18181b]">
            {scored ? (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                82
              </motion.span>
            ) : (
              <span className="text-[#d4d4d8]">—</span>
            )}
          </span>
          <span>
            {scored ? (
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
                className="inline-flex rounded-full bg-[#dcfce7] px-2 py-[1px] text-[11px] font-medium text-[#166534]"
              >
                Qualified
              </motion.span>
            ) : (
              <span className="inline-flex rounded-full bg-[#f4f4f5] px-2 py-[1px] text-[11px] text-[#71717a]">New</span>
            )}
          </span>
        </motion.div>
        {rows.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)_minmax(0,0.5fr)_minmax(0,0.9fr)] items-center gap-2 border-b border-[#f4f4f5] px-3 py-2.5 last:border-b-0"
          >
            <span className="truncate font-medium text-[#18181b]">{row.name}</span>
            <span className="text-[#52525b]">{row.size}</span>
            <span className="font-medium text-[#18181b]">{row.score}</span>
            <span>
              <span
                className={`inline-flex rounded-full px-2 py-[1px] text-[11px] font-medium ${row.tone === "green" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#f4f4f5] text-[#71717a]"}`}
              >
                {row.stage}
              </span>
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11.5px] text-[#a1a1aa]">{scored ? "Updated by Lead routing, run 1,284" : "Acme Corp added from the website form, 11:42"}</p>
    </div>
  );
}

type NodeStatus = "pending" | "running" | "waiting" | "succeeded" | "skipped";

const STATUS: Record<NodeStatus, { label: string; dot: string }> = {
  pending: { label: "Pending", dot: "bg-[#a1a1aa]/50" },
  running: { label: "Running", dot: "bg-[#5b5bd6] animate-pulse" },
  waiting: { label: "Waiting for approval", dot: "bg-[#f59e0b]" },
  succeeded: { label: "Succeeded", dot: "bg-[#22a06b]" },
  skipped: { label: "Skipped", dot: "bg-[#a1a1aa]/30" },
};

/** Each step as the editor's card draws it: 240 wide, the run's status under it, labelled ports on a branch. */
const NODE_W = 240;
const NODE_H = 86;
const BRANCH_H = 130;

type CanvasNode = {
  id: string;
  x: number;
  y: number;
  icon: ReactNode;
  name: string;
  summary: string;
  code?: boolean;
  ports?: readonly string[];
  status: (step: number) => NodeStatus;
};

const NODES: readonly CanvasNode[] = [
  {
    id: "trigger",
    x: 0,
    y: 150,
    icon: <TableProperties className="size-4" />,
    name: "New row in Leads",
    summary: "Trigger",
    status: (step) => (step >= 1 ? "succeeded" : "pending"),
  },
  {
    id: "agent",
    x: 320,
    y: 150,
    icon: <BlobAgent color={SALES} size={20} hop={false} />,
    name: "Qualify the lead",
    summary: "Sales Researcher",
    status: (step) => (step >= 2 ? "succeeded" : step === 1 ? "running" : "pending"),
  },
  {
    id: "if",
    x: 640,
    y: 128,
    icon: <Split className="size-4" />,
    name: "Score above 70?",
    summary: "score ≥ 70",
    code: true,
    ports: ["true", "false"],
    status: (step) => (step >= 3 ? "succeeded" : step === 2 ? "running" : "pending"),
  },
  {
    id: "approve",
    x: 960,
    y: 40,
    icon: <Hand className="size-4" />,
    name: "Ask the sales lead",
    summary: "Maya Chen · within 24 h",
    status: (step) => (step >= 5 ? "succeeded" : step >= 3 ? "waiting" : "pending"),
  },
  {
    id: "nurture",
    x: 960,
    y: 300,
    icon: <TableProperties className="size-4" />,
    name: "Add to nurture",
    summary: "Leads · update row",
    status: (step) => (step >= 3 ? "skipped" : "pending"),
  },
  {
    id: "slack",
    x: 1280,
    y: -30,
    icon: <ServiceIcon name="slack" className="size-4" />,
    name: "Post to #sales",
    summary: "Slack · send message",
    status: (step) => (step >= 5 ? "succeeded" : "pending"),
  },
  {
    id: "table",
    x: 1280,
    y: 110,
    icon: <TableProperties className="size-4" />,
    name: "Move to Qualified",
    summary: "Leads · update row",
    status: (step) => (step >= 5 ? "succeeded" : "pending"),
  },
];

/** Wires, port to port: `port` picks a branch's labelled row, `at` is the step a run first crosses it. */
const WIRES = [
  { from: "trigger", to: "agent", at: 1 },
  { from: "agent", to: "if", at: 2 },
  { from: "if", port: 0, to: "approve", at: 3, branch: true },
  { from: "if", port: 1, to: "nurture", at: 99, branch: true },
  { from: "approve", to: "slack", at: 5 },
  { from: "approve", to: "table", at: 5 },
] as const;

/** Where the camera looks at each step, in canvas pixels. */
const CAMERA: readonly { x: number; y: number }[] = [
  { x: 280, y: 193 },
  { x: 280, y: 193 },
  { x: 600, y: 193 },
  { x: 900, y: 170 },
  { x: 1080, y: 110 },
  { x: 1240, y: 120 },
  { x: 1240, y: 120 },
  { x: 1240, y: 120 },
  { x: 1240, y: 120 },
];

/** The run's own record of each step, the way the run page lists it. */
const RECORD = [
  { name: "New row in Leads", time: "0.1 s", cost: "" },
  { name: "Qualify the lead", time: "18.4 s", cost: "$0.06" },
  { name: "Score above 70?", time: "0.0 s", cost: "" },
  { name: "Ask the sales lead", time: "12 s", cost: "" },
  { name: "Post to #sales", time: "0.4 s", cost: "" },
  { name: "Move to Qualified", time: "0.1 s", cost: "" },
] as const;

function nodeOf(id: string) {
  const node = NODES.find((item) => item.id === id);
  if (!node) throw new Error(`no node ${id}`);
  return node;
}

/** The input handle sits at the card's middle, an output at its middle or on its labelled row. */
function wirePath(wire: (typeof WIRES)[number]) {
  const from = nodeOf(wire.from);
  const to = nodeOf(wire.to);
  const x1 = from.x + NODE_W;
  const y1 = "port" in wire ? from.y + NODE_H + 15 + wire.port * 18 : from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + (to.ports ? BRANCH_H : NODE_H) / 2;
  const bend = Math.max(40, (x2 - x1) / 2);
  return `M${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

function CanvasCard({ node, step }: { node: CanvasNode; step: number }) {
  const status = node.status(step);
  const look = STATUS[status];
  const live = status === "running" || status === "waiting";
  return (
    <motion.div
      className="absolute rounded-[12px] border bg-white"
      style={{ left: node.x, top: node.y, width: NODE_W, height: node.ports ? BRANCH_H : NODE_H }}
      animate={{
        opacity: status === "pending" || status === "skipped" ? 0.55 : 1,
        borderColor: live ? "rgba(91,91,214,0.45)" : "#e4e4e7",
        boxShadow: live ? "0 0 0 3px rgba(91,91,214,0.16), 0 10px 24px -14px rgba(16,24,40,0.35)" : "0 1px 2px rgba(16,24,40,0.06)",
      }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <span className="absolute top-1/2 -left-[6px] size-3 -translate-y-1/2 rounded-full border-2 border-white bg-[#a1a1aa]" />
      {node.ports ? null : <span className="absolute top-1/2 -right-[6px] size-3 -translate-y-1/2 rounded-full border-2 border-white bg-[#a1a1aa]" />}
      <div className="flex items-start gap-2.5 p-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f4f4f5] text-[#18181b]">{node.icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] leading-5 font-medium text-[#18181b]">{node.name}</span>
          <span className={`block truncate text-[12px] text-[#71717a] ${node.code ? "font-mono" : ""}`}>{node.summary}</span>
        </span>
      </div>
      <div className="flex items-center gap-1.5 px-3 text-[12px] text-[#71717a]">
        <span className={`size-2 rounded-full ${look.dot}`} />
        {look.label}
      </div>
      {node.ports ? (
        <ul className="mt-2 space-y-0.5 border-t border-[#ececef] py-1.5">
          {node.ports.map((port) => (
            <li key={port} className="relative flex h-4 items-center justify-end px-3 text-[12px] text-[#71717a]">
              {port}
              <span className="absolute -right-[6px] size-3 rounded-full border-2 border-white bg-[#5b5bd6]" />
            </li>
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
}

/**
 * The workflow on the editor's canvas: the dotted grid, the cards and their
 * wires. The camera follows the run from card to card, then pulls back to the
 * whole graph with every step's status on it.
 */
function Canvas({ step }: { step: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => entry && setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const camera = CAMERA[step] ?? CAMERA[0];
  const scale = width < 480 ? 0.7 : 1;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#fafafa] [background-image:radial-gradient(#d4d4d8_1px,transparent_1.5px)] [background-size:20px_20px]">
      <motion.div
        className="absolute top-1/2 left-1/2 origin-top-left"
        initial={false}
        animate={{ x: -(camera?.x ?? 0) * scale, y: -(camera?.y ?? 0) * scale, scale }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <svg className="absolute overflow-visible" style={{ left: 0, top: 0 }} width={1} height={1} aria-hidden>
          {WIRES.map((wire) => {
            const live = step >= wire.at;
            const d = wirePath(wire);
            return (
              <g key={`${wire.from}-${wire.to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={live ? "#5b5bd6" : "#a1a1aa"}
                  strokeOpacity={live ? 0.9 : 0.55}
                  strokeWidth={live ? 2 : 1.5}
                  strokeDasharray={wire.at === 99 ? "5 5" : undefined}
                  className="transition-[stroke] duration-500"
                />
                {step === wire.at ? (
                  <circle r="5" fill="#5b5bd6">
                    <animateMotion dur="0.9s" repeatCount="1" fill="freeze" path={d} />
                  </circle>
                ) : null}
              </g>
            );
          })}
        </svg>
        {NODES.map((node) => (
          <CanvasCard key={node.id} node={node} step={step} />
        ))}
      </motion.div>

      {/* The editor's zoom controls, bottom right, as on the real canvas. */}
      <div className="absolute right-3 bottom-3 flex flex-col overflow-hidden rounded-[8px] border border-[#e4e4e7] bg-white text-[#52525b] shadow-sm">
        <span className="flex size-7 items-center justify-center border-b border-[#ececef]"><Plus className="size-3.5" /></span>
        <span className="flex size-7 items-center justify-center border-b border-[#ececef]"><Minus className="size-3.5" /></span>
        <span className="flex size-7 items-center justify-center"><Maximize className="size-3.5" /></span>
      </div>

      {/* After the run, its record: every step's time and cost. */}
      <AnimatePresence>
        {step === 7 ? (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute top-3 right-3 bottom-3 w-[min(280px,calc(100%-24px))] overflow-hidden rounded-[12px] border border-[#ececef] bg-white shadow-[0_20px_40px_-18px_rgba(16,24,40,0.4)]"
          >
            <div className="border-b border-[#ececef] px-3 py-2.5">
              <p className="text-[13px] font-semibold text-[#18181b]">Run 1,284</p>
              <p className="text-[11.5px] text-[#71717a]">Succeeded · 41 s · $0.06 · started by a new row</p>
            </div>
            <ul className="divide-y divide-[#f4f4f5]">
              {RECORD.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.3 }}
                  className="flex items-center gap-2 px-3 py-2 text-[12px]"
                >
                  <span className="size-2 shrink-0 rounded-full bg-[#22a06b]" />
                  <span className="min-w-0 flex-1 truncate text-[#18181b]">{item.name}</span>
                  <span className="font-mono text-[11px] text-[#71717a]">{item.time}</span>
                  {item.cost ? <span className="font-mono text-[11px] text-[#18181b]">{item.cost}</span> : null}
                </motion.li>
              ))}
            </ul>
            <p className="px-3 py-2 text-[11.5px] text-[#71717a]">Input and output of every step kept. Retry from any step.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* The approval the run is waiting on, as Maya sees it. */}
      <AnimatePresence>
        {step === 4 || step === 5 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute bottom-3 left-3 w-[min(320px,calc(100%-64px))] rounded-[12px] border border-[#ececef] bg-white p-3 shadow-[0_20px_40px_-18px_rgba(16,24,40,0.4)]"
          >
            <div className="flex items-start gap-2">
              <Maya />
              <p className="min-w-0 flex-1 text-[12px] leading-snug text-[#3f3f46]">
                <span className="font-semibold text-[#18181b]">Approve Acme Corp for sales?</span> Score 82, 240 people, demo requested.
              </p>
            </div>
            <div className="mt-2 flex items-center justify-end gap-2">
              {step === 5 ? (
                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#16794c]">
                  <Check className="size-3.5" /> Maya approved · 12 s
                </span>
              ) : (
                <>
                  <span className="rounded-[8px] border border-[#e4e4e7] px-2.5 py-1 text-[12px] text-[#52525b]">Reject</span>
                  <motion.span
                    animate={{ scale: [1, 0.92, 1] }}
                    transition={{ delay: 1.2, duration: 0.3 }}
                    className="rounded-[8px] bg-[#18181b] px-2.5 py-1 text-[12px] font-medium text-white"
                  >
                    Approve
                  </motion.span>
                </>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** A voice call with the agent, asked about the lead the run just handled. */
function Call({ active }: { active: boolean }) {
  const bars = Array.from({ length: 32 }, (_, index) => index);
  return (
    <div className="flex h-full flex-col items-center text-center">
      <BlobAgent color={SALES} size={64} />
      <p className="mt-3 text-[15px] font-semibold text-[#18181b]">Sales Researcher</p>
      <p className="text-[11.5px] text-[#a1a1aa]">Voice call · 00:18</p>
      <div className="mt-4 flex h-10 items-center gap-[3px]">
        {bars.map((bar) => (
          <motion.span
            key={bar}
            className="w-[4px] rounded-full bg-[#a5b4fc]"
            animate={active ? { height: [5, 8 + ((bar * 37) % 26), 5] } : { height: 5 }}
            transition={{
              duration: 0.9 + (bar % 5) * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (bar % 7) * 0.08,
            }}
          />
        ))}
      </div>
      <div className="mt-4 w-full space-y-2 text-left text-[12.5px] leading-snug">
        <div className="flex gap-2">
          <Maya />
          <p className="rounded-[12px] bg-[#f4f4f5] px-3 py-2 text-[#27272a]">What happened with Acme?</p>
        </div>
        <div className="flex gap-2">
          <span className="mt-0.5">
            <BlobAgent color={SALES} size={22} hop={false} />
          </span>
          <p className="px-1 py-1 text-[#27272a]">
            <Typed
              text="It scored 82, you approved it at 11:43, and it is in Qualified. I posted it to #sales for Tom."
              active={active}
              done={!active}
              cps={52}
            />
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-3 pt-4">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#f4f4f5] text-[#3f3f46]">
          <Mic className="size-4" />
        </span>
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#ef4444] text-white">
          <PhoneOff className="size-4" />
        </span>
      </div>
    </div>
  );
}

function Window({ step }: { step: number }) {
  const tab = TABS[step] ?? "workflow";
  const finished = step >= 5;
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-[#ececef] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-[#f4f4f5] text-[#3f3f46]">
            <WorkflowIcon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-[#18181b]">Lead routing</p>
            <p className="hidden text-[11px] text-[#a1a1aa] sm:block">Workflow · published v3</p>
          </div>
        </div>
        <div className="flex rounded-[10px] bg-[#f4f4f5] p-0.5 text-[11.5px]">
          {(["workflow", "leads", "calls"] as const).map((name) => (
            <span key={name} className="relative px-2.5 py-1 capitalize">
              {tab === name ? (
                <motion.span
                  layoutId="soon-tab"
                  className="absolute inset-0 rounded-[8px] bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className={`relative ${tab === name ? "font-medium text-[#18181b]" : "text-[#71717a]"}`}>{name}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        {/* One tab at a time: the next waits until the last has left, so the two never overlap. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`absolute inset-0 overflow-hidden ${tab === "workflow" ? "" : "px-4 py-4"}`}
          >
            {tab === "leads" ? <Leads step={step} /> : tab === "calls" ? <Call active={step === LAST} /> : <Canvas step={step} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#ececef] px-4 py-2.5 font-mono text-[11px] text-[#71717a]">
        <span>run 1,284</span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-[1px] ${finished ? "bg-[#ecf8f2] text-[#16794c]" : "bg-[#f4f4f5] text-[#52525b]"}`}
        >
          {finished ? <Check className="size-3" /> : step >= 1 ? <Spinner /> : null}
          {finished ? "done in 41 s · $0.06" : step >= 1 ? (step === 4 ? "waiting for Maya" : "running") : "waiting for a row"}
        </span>
      </div>
    </div>
  );
}

/**
 * Work in review (#1925 workflows and tables, #2204 voice). A loop plays one
 * lead going through a workflow, a person's approval and a table, then a call
 * about it, and the promise beside it lights up as the window shows it.
 */
export function Soon() {
  const [step, setStep] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const visible = useInView(stageRef, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setStep(5);
      return;
    }
    if (!visible) return;
    const timer = window.setTimeout(() => setStep((current) => (current >= LAST ? 0 : current + 1)), step === LAST ? STEP_MS * 3 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [step, visible, reduce]);

  const lit = SPOTLIGHT[step] ?? 0;

  return (
    <section id="soon" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="Coming soon"
          title="Workflows, tables and voice."
          muted="Already in review."
          body="Work with fixed steps gets a visual editor: triggers, agents, approvals and tables, with a record of every run. Voice calls let you talk to any agent. Both are working code in open pull requests, open source like the rest: you can read them and run them today."
        />

        <Reveal delay={0.1} className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-stretch">
          <div
            ref={stageRef}
            className="relative min-w-0 overflow-hidden rounded-[28px] bg-[#16141f] p-3 shadow-[0_40px_90px_-50px_rgba(43,37,71,0.55)] ring-1 ring-black/5 sm:p-8"
          >
            <img
              src={asset("/images/night-3200.webp")}
              srcSet={assetSet("/images/night-1600.webp 1600w, /images/night-3200.webp 3200w")}
              sizes="(min-width: 1240px) 720px, 100vw"
              alt=""
              loading="lazy"
              className="pointer-events-none absolute inset-0 size-full select-none object-cover"
            />
            <div className="relative mx-auto h-[520px] max-w-[640px] overflow-hidden rounded-[18px] bg-white/95 shadow-[0_30px_80px_-30px_rgba(10,8,30,0.7)] ring-1 ring-black/5 backdrop-blur sm:h-[580px]">
              <Window step={step} />
            </div>
          </div>

          <ul className="rail min-w-0 sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-1 lg:gap-1.5">
            {DETAILS.map((detail, index) => {
              const on = index === lit;
              return (
                <li
                  key={detail.title}
                  className={`flex gap-3.5 rounded-[18px] p-3.5 ring-1 transition-[background-color,box-shadow] duration-500 ${on ? "bg-card shadow-[0_18px_40px_-26px_rgba(43,37,71,0.5)] ring-line" : "bg-transparent ring-transparent"}`}
                >
                  <span
                    className={`inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] transition-colors duration-500 ${on ? "bg-violet text-blob" : "bg-card text-ink-soft ring-1 ring-line"}`}
                  >
                    <detail.icon className="size-[18px]" strokeWidth={1.9} />
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-semibold leading-snug text-ink">{detail.title}</span>
                    <span className="mt-0.5 block text-[14px] leading-snug text-muted">{detail.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={links.workflowsPr} tone="ink">
            Follow workflows on GitHub <span aria-hidden>↗</span>
          </ButtonLink>
          <ButtonLink href={links.voicePr} tone="ghost-dark">
            Follow voice <span aria-hidden>↗</span>
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
