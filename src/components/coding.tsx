"use client";

import { ArrowLeftRight, Check, KeyRound, LogIn } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { BlobAgent } from "@/components/blob";
import { BrandIcon, Mark, ServiceIcon, providerGlyph } from "@/components/brand-icon";
import { CodingTask } from "@/components/together";
import { Reveal, SectionHeading, SectionLinks } from "@/components/ui";
import { links } from "@/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const TECH_LEAD = "#4f7cf7";

function Card({ title, body, children, className = "" }: { title: string; body: string; children: ReactNode; className?: string }) {
  return (
    <div className={`lift flex flex-col overflow-hidden rounded-[24px] bg-card ring-1 ring-line ${className}`}>
      <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-[#f4f1fb] to-[#efeaf8] p-5 sm:p-7">{children}</div>
      <div className="px-6 pb-6 pt-5">
        <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}

/** Steps a value from 0 to `last` once the card is on screen, then holds and starts again. */
function useLoop(last: number, stepMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduce) {
      setValue(last);
      return;
    }
    if (!visible) return;
    const timer = window.setTimeout(() => setValue((current) => (current >= last ? 0 : current + 1)), value === last ? stepMs * 3 : stepMs);
    return () => window.clearTimeout(timer);
  }, [value, visible, reduce, last, stepMs]);
  return [ref, value] as const;
}

const DIFF = [
  { sign: "-", text: "message: z.string().max(200)," },
  { sign: "+", text: "message: z.string().max(5000)," },
  { sign: "+", text: "it(\"sends a 1,000-character message\", ...)" },
] as const;

function HandOff() {
  const [ref, step] = useLoop(4, 1400);
  return (
    <div ref={ref} className="w-full max-w-[460px] space-y-3">
      <div className="flex items-start gap-2.5 rounded-[14px] bg-white p-3.5 shadow-[0_18px_40px_-28px_rgba(43,37,71,0.6)] ring-1 ring-black/5">
        <ServiceIcon name="slack" className="mt-0.5 size-4 shrink-0" />
        <p className="text-[13px] leading-relaxed text-[#3f3f46]">
          <span className="font-semibold text-[#18181b]">Maya</span> <span className="text-[#a1a1aa]">in #web-team</span>
          <br />
          <span className="font-medium text-[#1264a3]">@Tech Lead</span> people say the contact form loses long messages. Can you fix it today?
        </p>
      </div>
      <div className="rounded-[14px] bg-white p-3.5 shadow-[0_18px_40px_-28px_rgba(43,37,71,0.6)] ring-1 ring-black/5">
        <p className="flex items-center gap-2 text-[12px] font-semibold text-[#18181b]">
          <BlobAgent color={TECH_LEAD} size={20} hop={false} /> Tech Lead <span className="font-normal text-[#a1a1aa]">· answering Maya</span>
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#3f3f46]">Found it: messages over 200 characters are refused. Claude Code is fixing it in our sandbox.</p>
      </div>
      <CodingTask
        progress={Math.min(step, 3)}
        harness="claude_code"
        title="Fix the contact form"
        steps={["Found the limit in forms/contact.ts", "Raised it and added a test", "Ran the test suite"]}
        result="Branch fix/contact-form · 2 files · 148 tests passed"
      />
      <motion.div
        initial={false}
        animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 8 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="overflow-hidden rounded-[12px] bg-[#0f1115] font-mono text-[11.5px] leading-[1.7] ring-1 ring-black/10"
      >
        {DIFF.map((line) => (
          <p key={line.text} className={`truncate px-3 ${line.sign === "+" ? "bg-[#12261b] text-[#86efac]" : "bg-[#2a1416] text-[#fca5a5]"}`}>
            {line.sign} {line.text}
          </p>
        ))}
      </motion.div>
    </div>
  );
}

function Subscription() {
  return (
    <div className="w-full max-w-[340px] overflow-hidden rounded-[14px] bg-white shadow-[0_18px_40px_-28px_rgba(43,37,71,0.6)] ring-1 ring-black/5">
      <p className="border-b border-[#f0f0f2] px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">Model for this agent</p>
      {[
        { glyph: "openai_codex", name: "ChatGPT (Codex subscription)", note: "your plan", on: true },
        { glyph: "anthropic", name: "Claude Sonnet 5.5", note: "API key" },
        { glyph: "ollama", name: "Llama on Ollama", note: "local" },
      ].map((model) => (
        <div key={model.name} className={`flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] ${model.on ? "bg-[#f6f5ff]" : ""}`}>
          <Mark glyph={providerGlyph(model.glyph)} className="size-4 text-[#18181b]" mono />
          <span className="font-medium text-[#18181b]">{model.name}</span>
          <span className="ml-auto text-[11px] text-[#a1a1aa]">{model.note}</span>
          {model.on ? <Check className="size-3.5 text-[#5b5bd6]" /> : null}
        </div>
      ))}
      <div className="flex items-center justify-between gap-2 border-t border-[#f0f0f2] px-3.5 py-3">
        <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#18181b] px-3 text-[12px] font-medium text-white">
          <LogIn className="size-3.5" /> Sign in with ChatGPT
        </span>
        <span className="inline-flex items-center gap-1 text-[11.5px] text-[#16794c]">
          <KeyRound className="size-3.5" /> no API key
        </span>
      </div>
    </div>
  );
}

function A2A() {
  return (
    <div className="flex w-full max-w-[360px] items-stretch justify-between gap-3">
      {[
        { org: "Northwind Labs", agent: "Treasury Assistant", color: "#1fb58f" },
        { org: "Partner bank", agent: "FX Desk", color: "#7fb4f0" },
      ].map((side, index) => (
        <div key={side.org} className="contents">
          {index === 1 ? (
            <div className="flex flex-col items-center justify-center gap-1 text-[10.5px] font-medium text-[#5b5bd6]">
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowLeftRight className="size-5" />
              </motion.span>
              A2A
            </div>
          ) : null}
          <div className="flex-1 rounded-[14px] bg-white p-3 text-center shadow-[0_18px_40px_-28px_rgba(43,37,71,0.6)] ring-1 ring-black/5">
            <p className="min-h-[30px] text-[10.5px] uppercase leading-tight tracking-[0.06em] text-[#a1a1aa]">{side.org}</p>
            <span className="mx-auto mt-2 block w-fit">
              <BlobAgent color={side.color} size={34} delay={index * 0.7} />
            </span>
            <p className="mt-1 text-[12.5px] font-semibold text-[#18181b]">{side.agent}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FromClaudeCode() {
  return (
    <div className="w-full max-w-[360px] overflow-hidden rounded-[14px] bg-[#0f1115] font-mono text-[11.5px] leading-[1.75] text-[#d4d4d8] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.7)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-[#a1a1aa]">
        <BrandIcon name="claude_code" className="size-3.5" /> Claude Code
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[#a1a1aa]">{">"} Build a support agent on our help-centre docs</p>
        <p>
          <span className="text-[#c4b5fd]">agenticos</span>.create_agent <span className="text-[#86efac]">✓</span>
        </p>
        <p>
          <span className="text-[#c4b5fd]">agenticos</span>.attach_knowledge <span className="text-[#86efac]">✓</span>
        </p>
        <p className="text-[#fde68a]">Draft “Support Desk” waits for your approval</p>
      </div>
    </div>
  );
}

/** #2141 and #2190: coding harnesses as colleagues, subscriptions as models, agents across companies, the platform from a coding tool. */
export function Coding() {
  return (
    <section id="coding" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="New · Coding agents"
          title="Claude Code and Codex,"
          muted="on your team."
          body="Any agent can hand software work to Claude Code or Codex. They work on the agent's own private computer, on the subscription you already pay for, and report every step under the answer like a colleague would."
        />
        <Reveal delay={0.1} className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Card
            className="lg:row-span-2"
            title="Hand the code to the right colleague"
            body="A request in Slack reaches the Tech Lead agent, the fix goes to Claude Code in the sandbox, and the diff comes back to the thread. Nobody copies a ticket between five tools."
          >
            <HandOff />
          </Card>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Card
              title="Already paying for ChatGPT? Put it to work."
              body="Sign in with ChatGPT once and your agents run on your plan. No API key, and budgets still count every run."
            >
              <Subscription />
            </Card>
            <div className="grid gap-4 lg:grid-cols-2">
              <Card title="Agents from other companies" body="A partner's agent can ask yours, and yours can ask theirs, over the open A2A protocol. No custom integration.">
                <A2A />
              </Card>
              <Card title="AgenticOS inside Claude Code" body="Build agents, read runs and check spend from the coding tool you already live in.">
                <FromClaudeCode />
              </Card>
            </div>
          </div>
        </Reveal>
        <SectionLinks docs={links.codingAgent} docsLabel="Read about the coding agent" />
      </div>
    </section>
  );
}
