"use client";

import { ArrowUp, AtSign, Check, Code2, CornerDownRight, FileText, FolderOpen, Radio, Reply, Users } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { BlobAgent } from "@/components/blob";
import { BrandIcon, ServiceIcon } from "@/components/brand-icon";
import { Typed } from "@/components/movie/parts";
import { SpotlightList } from "@/components/spotlight-list";
import { Reveal, SectionHeading, SectionLinks } from "@/components/ui";
import { links } from "@/content";
import { asset, assetSet } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 1900;
const LAST = 10;
const CHIEF = "#d8c84a";

const PEOPLE = [
  { id: "maya", name: "Maya", initials: "MC", color: "#f0a77f" },
  { id: "tom", name: "Tom", initials: "TB", color: "#7fb4f0" },
  { id: "you", name: "You", initials: "JR", color: "#a99cf2" },
] as const;

/** What the room shows, and which promise beside it the step proves. */
const DETAILS = [
  { icon: Users, title: "See who is in the room", body: "Everyone with the chat open, at a glance, as in a shared document." },
  { icon: Radio, title: "Watch work as it happens", body: "A colleague's agent answers live on your screen. Nobody pastes the output into Slack." },
  { icon: Reply, title: "Reply to anyone, person or agent", body: "The agent knows who said what, and whose word changed the plan." },
  { icon: AtSign, title: "Bring anything in with @", body: "A tool, an agent, a document: one keystroke and it joins the conversation." },
  { icon: FolderOpen, title: "One project, one memory", body: "Files, instructions and a computer that every chat in the project shares." },
  { icon: Code2, title: "Hand code to Claude Code or Codex", body: "They build in the project's computer while the whole room watches, step by step." },
] as const;

const SPOTLIGHT: readonly number[] = [0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 5];

function Avatar({ person, size = 28, ring = true }: { person: (typeof PEOPLE)[number]; size?: number; ring?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${ring ? "ring-2 ring-white" : ""}`}
      style={{ width: size, height: size, background: person.color, fontSize: size * 0.38 }}
    >
      {person.initials}
    </span>
  );
}

function Mention({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span className="mx-0.5 inline-flex translate-y-[2px] items-center gap-1 rounded-[6px] bg-[#eef2ff] px-1.5 py-[1px] text-[12.5px] font-medium text-[#3b3fb8]">
      {color ? <BlobAgent color={color} size={13} hop={false} /> : null}
      {children}
    </span>
  );
}

function Line({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          layout
          initial={{ opacity: 0, y: 12, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Spinner() {
  return <span className="size-3 shrink-0 animate-spin rounded-full border-[1.5px] border-[#d4d4d8] border-t-[#18181b]" />;
}

/** A coding agent's task under an answer, the way the console shows one. */
export function CodingTask({
  progress,
  harness = "codex",
  title = "Build the launch page",
  steps = ["Read brief.pdf and channels.csv", "Wrote landing/index.html", "Ran the checks"],
  result = "Preview ready · 3 files changed · checks passed",
}: {
  progress: number;
  harness?: "codex" | "claude_code";
  title?: string;
  steps?: readonly string[];
  result?: string;
}) {
  const done = progress >= steps.length;
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#e6e6ea] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[#f0f0f2] px-3 py-2">
        <span className="flex items-center gap-2 text-[12px] font-medium text-[#18181b]">
          <BrandIcon name={harness} className="size-4" />
          {harness === "codex" ? "Codex" : "Claude Code"} · {title}
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-[1px] text-[10.5px] font-medium ${done ? "bg-[#ecf8f2] text-[#16794c]" : "bg-[#f4f4f5] text-[#52525b]"}`}>
          {done ? <Check className="size-3" /> : <Spinner />} {done ? "Ready" : "Working"}
        </span>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {steps.map((step, index) => (
          <li key={step} className={`flex items-center gap-2 text-[12px] transition-colors ${index < progress ? "text-[#3f3f46]" : index === progress ? "text-[#18181b]" : "text-[#c4c4cc]"}`}>
            {index < progress ? <Check className="size-3.5 text-[#22a06b]" /> : index === progress ? <Spinner /> : <span className="size-3.5 rounded-full border border-[#e4e4e7]" />}
            <span className="font-mono text-[11.5px]">{step}</span>
          </li>
        ))}
      </ul>
      {done ? <div className="border-t border-[#f0f0f2] bg-[#fafafa] px-3 py-2 text-[11.5px] text-[#52525b]">{result}</div> : null}
    </div>
  );
}

function Room({ step }: { step: number }) {
  const [maya, tom, you] = PEOPLE;
  const present = step >= 0 ? PEOPLE : [];
  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* The project's bar: its name, its tabs and who is here. */}
      <div className="flex items-center justify-between gap-3 border-b border-[#ececef] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-[#f4f4f5] text-[11px] font-semibold text-[#3f3f46]">Q3</span>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-[#18181b]">Q3 launch</p>
            <p className="hidden text-[11px] text-[#a1a1aa] sm:block">Project · brief.pdf, channels.csv, brand-book.md</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {present.map((person, index) => (
              <motion.span key={person.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.18, type: "spring", stiffness: 420, damping: 18 }} className="relative">
                <Avatar person={person} size={26} />
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#22c55e] ring-2 ring-white" />
              </motion.span>
            ))}
          </div>
          <span className="hidden text-[11.5px] text-[#71717a] sm:inline">3 here</span>
        </div>
      </div>

      {/* The thread; older lines fade out under the bar as new ones arrive. */}
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 py-4 text-[13px] leading-relaxed text-[#27272a] [mask-image:linear-gradient(180deg,transparent,#000_56px)]">
        <Line show={step >= 1}>
          <div className="flex gap-2.5">
            {maya ? <Avatar person={maya} size={24} ring={false} /> : null}
            <div className="min-w-0">
              <p className="text-[11.5px] font-semibold text-[#18181b]">Maya</p>
              <p>
                <Mention color={CHIEF}>Chief of Staff</Mention> draft the launch plan from the brief and the channel list
              </p>
            </div>
          </div>
        </Line>

        <Line show={step >= 2}>
          <div className="flex gap-2.5">
            <span className="mt-0.5"><BlobAgent color={CHIEF} size={24} hop={false} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-semibold text-[#18181b]">
                Chief of Staff <span className="font-normal text-[#a1a1aa]">· answering Maya</span>
              </p>
              <div className="mt-1 space-y-1 text-[12px] text-[#52525b]">
                <p className="flex items-center gap-1.5">
                  <BlobAgent color="#f5cdb6" size={14} hop={false} /> Asked Sales Researcher <Check className="size-3 text-[#22a06b]" />
                </p>
                <p className="flex items-center gap-1.5">
                  <BlobAgent color="#1fb58f" size={14} hop={false} /> Asked Finance Analyst {step >= 3 ? <Check className="size-3 text-[#22a06b]" /> : <Spinner />}
                </p>
              </div>
              {step >= 3 ? (
                <p className="mt-1.5">
                  <Typed text="Launch on November 4: organic first, then a paid wave in week two. Budget $60k across three channels." active={step === 3} done={step > 3} cps={60} />
                </p>
              ) : null}
            </div>
          </div>
        </Line>

        <Line show={step === 4}>
          <p className="flex items-center gap-2 pl-[34px] text-[11.5px] text-[#a1a1aa]">
            {tom ? <Avatar person={tom} size={16} ring={false} /> : null} Tom is typing
            <span className="inline-flex gap-0.5">
              {[0, 1, 2].map((dot) => (
                <motion.span key={dot} className="size-1 rounded-full bg-[#a1a1aa]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }} />
              ))}
            </span>
          </p>
        </Line>

        <Line show={step >= 5}>
          <div className="flex gap-2.5">
            {tom ? <Avatar person={tom} size={24} ring={false} /> : null}
            <div className="min-w-0">
              <p className="text-[11.5px] font-semibold text-[#18181b]">Tom</p>
              <div className="mt-1 flex items-start gap-1.5 rounded-[8px] border-l-2 border-[#d8c84a] bg-[#fafaf5] px-2 py-1 text-[11.5px] text-[#71717a]">
                <CornerDownRight className="mt-0.5 size-3 shrink-0" /> Chief of Staff: Launch on November 4: organic first…
              </div>
              <p className="mt-1">Budget is $40k, not 60. Keep the paid wave small.</p>
            </div>
          </div>
        </Line>

        <Line show={step >= 6}>
          <div className="flex gap-2.5">
            <span className="mt-0.5"><BlobAgent color={CHIEF} size={24} hop={false} /></span>
            <div className="min-w-0">
              <p className="text-[11.5px] font-semibold text-[#18181b]">
                Chief of Staff <span className="font-normal text-[#a1a1aa]">· answering Tom</span>
              </p>
              <p>
                <Typed text="Updated to $40k: $28k organic and partners, $12k paid in week two. Finance Analyst checked the split." active={step === 6} done={step > 6} cps={60} />
              </p>
            </div>
          </div>
        </Line>

        <Line show={step >= 8}>
          <div className="flex gap-2.5">
            {you ? <Avatar person={you} size={24} ring={false} /> : null}
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-semibold text-[#18181b]">You</p>
              <p>
                <Mention>
                  <BrandIcon name="codex" className="size-3" /> Codex
                </Mention>{" "}
                build the launch page from this plan
              </p>
              {step >= 9 ? (
                <div className="mt-2">
                  <CodingTask progress={step >= 10 ? 3 : 2} />
                </div>
              ) : null}
            </div>
          </div>
        </Line>
      </div>

      {/* The composer, where `@` brings a tool, an agent or a document in. */}
      <div className="relative border-t border-[#ececef] px-4 py-3">
        <AnimatePresence>
          {step === 7 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute bottom-[calc(100%-6px)] left-4 w-[230px] overflow-hidden rounded-[12px] border border-[#e6e6ea] bg-white p-1 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)]"
            >
              {[
                { icon: <BrandIcon name="codex" className="size-4" />, name: "Codex", kind: "Coding agent", on: true },
                { icon: <ServiceIcon name="linear" className="size-4" />, name: "Linear", kind: "MCP server" },
                { icon: <BlobAgent color="#1fb58f" size={16} hop={false} />, name: "Finance Analyst", kind: "Agent" },
                { icon: <FileText className="size-4 text-[#71717a]" />, name: "brand-book.md", kind: "Project file" },
              ].map((item) => (
                <div key={item.name} className={`flex items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-[12.5px] ${item.on ? "bg-[#f4f4f5]" : ""}`}>
                  {item.icon}
                  <span className="font-medium text-[#18181b]">{item.name}</span>
                  <span className="ml-auto text-[11px] text-[#a1a1aa]">{item.kind}</span>
                </div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div className="flex items-center gap-2 rounded-[14px] border border-[#e4e4e7] bg-white px-3 py-2">
          <span className="min-h-[20px] flex-1 text-[13px] text-[#a1a1aa]">
            {step === 7 ? <span className="text-[#18181b]">@</span> : "Message Q3 launch, or type @ to bring something in"}
          </span>
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#18181b] text-white">
            <ArrowUp className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Projects (#2141): several people and their agents in one live chat. A loop
 * plays a launch being planned, and the promise beside it lights up as the room
 * shows it.
 */
export function Together() {
  const [step, setStep] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const visible = useInView(stageRef, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setStep(LAST);
      return;
    }
    if (!visible) return;
    const timer = window.setTimeout(() => setStep((current) => (current >= LAST ? 0 : current + 1)), step === LAST ? STEP_MS * 2.6 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [step, visible, reduce]);

  const lit = SPOTLIGHT[step] ?? 0;

  return (
    <section id="together" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="New · Projects"
          title="Your team and your agents,"
          muted="in one live room."
          body="A project gives everyone the same files, instructions and a shared computer for the agents. Invite your colleagues and work the way a team works: see who is here, watch an agent's answer as it is written, reply to anyone and bring any tool in with an @."
        />

        <Reveal delay={0.1} className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-stretch">
          <div ref={stageRef} className="relative min-w-0 overflow-hidden rounded-[28px] bg-[#dfe7ef] p-3 shadow-[0_40px_90px_-50px_rgba(43,37,71,0.55)] ring-1 ring-black/5 sm:p-8">
            <img
              src={asset("/images/cta-2800.webp")}
              srcSet={assetSet("/images/cta-1400.webp 1400w, /images/cta-2800.webp 2800w")}
              sizes="(min-width: 1240px) 720px, 100vw"
              alt=""
              loading="lazy"
              className="pointer-events-none absolute inset-0 size-full select-none object-cover"
            />
            <div className="relative mx-auto h-[500px] max-w-[640px] overflow-hidden rounded-[18px] bg-white/95 shadow-[0_30px_80px_-30px_rgba(16,24,40,0.55)] ring-1 ring-black/5 backdrop-blur sm:h-[580px]">
              <Room step={step} />
            </div>
          </div>

          <SpotlightList items={DETAILS} lit={lit} onPick={(index) => setStep(Math.max(0, SPOTLIGHT.indexOf(index)))} />
        </Reveal>

        <SectionLinks docs={links.projects} docsLabel="How projects work" />

        <Reveal delay={0.15} className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[14px] text-muted">
          <span>Y Combinator put “multiplayer AI” in its Fall 2026 Requests for Startups.</span>
          <a href="https://www.ycombinator.com/rfs" target="_blank" rel="noreferrer" className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            In AgenticOS it ships today, open source.
          </a>
        </Reveal>
      </div>
    </section>
  );
}
