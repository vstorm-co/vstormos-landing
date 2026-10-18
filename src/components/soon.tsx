"use client";

import { Check, GitBranch, Hand, History, Mic, PhoneOff, Table2, Workflow as WorkflowIcon, Zap } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

const STEPS = [
  {
    id: "trigger",
    icon: <Zap className="size-4 text-[#e0a10b]" />,
    title: "New row in Leads",
    kind: "Trigger",
    at: 1,
    result: "Acme Corp",
  },
  {
    id: "agent",
    icon: <BlobAgent color={SALES} size={18} hop={false} />,
    title: "Qualify the lead",
    kind: "Agent · Sales Researcher",
    at: 2,
    result: "score 82 · mid-market",
  },
  {
    id: "check",
    icon: <GitBranch className="size-4 text-[#5b5bd6]" />,
    title: "Score above 70?",
    kind: "Condition",
    at: 3,
    result: "yes",
  },
  {
    id: "approve",
    icon: <Hand className="size-4 text-[#db2777]" />,
    title: "Ask the sales lead",
    kind: "Approval",
    at: 5,
    result: "Maya approved",
  },
  {
    id: "slack",
    icon: <ServiceIcon name="slack" className="size-4" />,
    title: "Post to #sales",
    kind: "Slack",
    at: 5,
    result: "posted",
  },
  {
    id: "table",
    icon: <Table2 className="size-4 text-[#16794c]" />,
    title: "Move to Qualified",
    kind: "Table",
    at: 5,
    result: "updated",
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

/** The workflow as the console draws it, read top to bottom, lighting up as the run reaches each step. */
function Flow({ step }: { step: number }) {
  return (
    <div className="relative">
      <div className="space-y-2">
        {STEPS.map((item, index) => {
          const done = step >= item.at && !(item.id === "approve" && step < 5);
          const branch = item.id === "slack" || item.id === "table";
          // The branch after the approval waits without a spinner: nothing runs until Maya answers.
          const running = !done && !branch && step === item.at - 1 && step >= 1 && index > 0;
          return (
            <div key={item.id} className={`relative ${branch ? "ml-6 sm:ml-8" : ""}`}>
              {index > 0 ? (
                <span
                  className={`absolute -top-2 h-2 w-px ${branch ? "left-[-10px] sm:left-[-14px]" : "left-[22px]"} ${done ? "bg-[#a5b4fc]" : "bg-[#e4e4e7]"}`}
                />
              ) : null}
              <motion.div
                animate={{
                  backgroundColor: done ? "#ffffff" : "#fafafa",
                  boxShadow: done ? "0 0 0 1px #c7d2fe, 0 10px 24px -16px rgba(91,91,214,0.6)" : running ? "0 0 0 1px #d4d4d8" : "0 0 0 1px #ececef",
                }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex items-center gap-2.5 rounded-[11px] px-2.5 py-2"
              >
                <span className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-[8px] bg-[#f4f4f5]">{item.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[12.5px] font-semibold ${done || running ? "text-[#18181b]" : "text-[#a1a1aa]"}`}>{item.title}</span>
                  <span className="block truncate text-[10.5px] text-[#a1a1aa]">{item.kind}</span>
                </span>
                {done ? (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex shrink-0 items-center gap-1 text-[11px] text-[#16794c]"
                  >
                    <Check className="size-3.5" /> <span className="hidden sm:inline">{item.result}</span>
                  </motion.span>
                ) : running ? (
                  <Spinner />
                ) : null}
              </motion.div>
              {/* The approval opens under its step, the way the person asked sees it. */}
              {item.id === "approve" ? (
                <AnimatePresence initial={false}>
                  {step === 4 ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 rounded-[12px] border border-[#fbcfe8] bg-[#fdf2f8] p-2.5">
                        <div className="flex items-start gap-2">
                          <Maya />
                          <p className="min-w-0 flex-1 text-[12px] leading-snug text-[#3f3f46]">
                            <span className="font-semibold text-[#18181b]">Approve Acme Corp for sales?</span> Score 82, 240 people, demo requested.
                          </p>
                        </div>
                        <div className="mt-2 flex items-center justify-end gap-2">
                          <span className="rounded-[8px] border border-[#e4e4e7] bg-white px-2.5 py-1 text-[12px] text-[#52525b]">Reject</span>
                          <motion.span
                            animate={{ scale: [1, 0.92, 1] }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                            className="rounded-[8px] bg-[#18181b] px-2.5 py-1 text-[12px] font-medium text-white"
                          >
                            Approve
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-2 pl-[50px] text-[10.5px] text-[#a1a1aa]">no → nurture list</p>
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
            className="absolute inset-0 overflow-hidden px-4 py-4"
          >
            {tab === "leads" ? <Leads step={step} /> : tab === "calls" ? <Call active={step === LAST} /> : <Flow step={step} />}
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
