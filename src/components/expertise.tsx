"use client";

import { FileText, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { BlobAgent } from "@/components/blob";
import { Reveal, SplitHeading } from "@/components/ui";

/*
 * The idea vstorm.co/agenticos puts first: a company grows by hiring people
 * with judgment, and AgenticOS keeps that judgment in files the agents read.
 * The three roles are examples; the procurement rule is the one that page gives.
 */
const ROLES = [
  {
    role: "Head of procurement",
    agent: "Procurement Desk",
    color: "#d8c84a",
    skill: {
      file: "skills/invoice-dispute.md",
      lines: ["1. Match the invoice to the PO and the delivery note.", "2. List every line that differs, with the amount.", "3. Draft the reply to the supplier in our tone."],
    },
    context: {
      file: "context/procurement-thresholds.md",
      lines: ["Disputes up to $10,000: procurement decides.", "Above $10,000: the CFO signs off.", "Preferred suppliers: see the 2026 list."],
    },
    rule: "A dispute above $10,000 waits for the CFO",
  },
  {
    role: "Customer service lead",
    agent: "Support Desk",
    color: "#f2b8c6",
    skill: {
      file: "skills/refund-request.md",
      lines: ["1. Find the order and the purchase date.", "2. Check the request against the refund policy.", "3. Answer with the page the rule comes from."],
    },
    context: {
      file: "context/refund-policy.md",
      lines: ["Full refund within 14 days of purchase.", "$200 to $2,000: the support lead approves.", "Above $2,000: finance approves."],
    },
    rule: "A refund above $200 waits for the support lead",
  },
  {
    role: "Finance controller",
    agent: "Finance Analyst",
    color: "#1fb58f",
    skill: {
      file: "skills/month-end-variance.md",
      lines: ["1. Pull this month’s ledger and last month’s.", "2. Flag every cost line that moved more than 5%.", "3. Chart it and write two sentences per flag."],
    },
    context: {
      file: "context/spend-limits.md",
      lines: ["Monthly agent budget: $100.", "Team spend cap: $3,500 a month.", "Payments above $10,000 need two approvers."],
    },
    rule: "A payment above $10,000 waits for two approvers",
  },
] as const;

function FileCard({ icon, label, file, lines, tint }: { icon: string; label: string; file: string; lines: readonly string[]; tint: string }) {
  return (
    <div className="overflow-hidden rounded-[18px] bg-card ring-1 ring-line">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="inline-flex size-6 items-center justify-center rounded-[7px] font-mono text-[11px] font-semibold" style={{ background: tint }}>
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-[12.5px] font-semibold text-ink">{label}</span>
          <span className="block truncate font-mono text-[11px] text-faint">{file}</span>
        </span>
      </div>
      <ul className="space-y-1.5 px-4 py-3.5 text-[14px] leading-snug text-ink-soft">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export function Expertise() {
  const [active, setActive] = useState(0);
  const role = ROLES[active] ?? ROLES[0];
  return (
    <section id="expertise" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SplitHeading
          eyebrow="Your experts, multiplied"
          title="Your best people’s judgment,"
          muted="in agents you own."
          body="Growing a company used to mean hiring more experienced people. Here their procedures become skills, their standing facts become context, and every agent works from both. Change a rule once and every agent that reads it answers with the new one."
        />

        <Reveal delay={0.08} className="mt-12">
          <div className="grid gap-4 rounded-[28px] bg-gradient-to-b from-[#efeaf8] to-[#e8e2f6] p-3 ring-1 ring-[#ddd6f5] md:p-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <div role="tablist" aria-label="Roles" className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col">
              {ROLES.map((entry, index) => {
                const selected = index === active;
                return (
                  <button
                    key={entry.role}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(index)}
                    className={`relative flex shrink-0 items-center gap-3 rounded-[18px] px-3.5 py-3 text-left transition-colors lg:shrink lg:rounded-[20px] lg:p-4 ${selected ? "" : "hover:bg-white/50"}`}
                  >
                    {selected ? <motion.span layoutId="expert-pill" className="absolute inset-0 rounded-[20px] bg-card shadow-[0_18px_40px_-26px_rgba(43,37,71,0.5)] ring-1 ring-line" transition={{ type: "spring", stiffness: 380, damping: 34 }} /> : null}
                    <span className="relative"><BlobAgent color={entry.color} size={34} delay={index * 0.6} hop={selected} /></span>
                    <span className="relative min-w-0">
                      <span className="block whitespace-nowrap text-[14.5px] font-semibold text-ink lg:text-[15.5px]">{entry.role}</span>
                      <span className="hidden text-[13px] text-muted lg:block">becomes {entry.agent}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="min-w-0 rounded-[22px] bg-paper/70 p-4 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div key={role.role} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="grid gap-3 md:grid-cols-2">
                  <FileCard icon="S" label="How it is done" file={role.skill.file} lines={role.skill.lines} tint="#e3f1ff" />
                  <FileCard icon="C" label="What is true today" file={role.context.file} lines={role.context.lines} tint="#fdf3d7" />
                  <div className="flex items-center gap-3 rounded-[18px] bg-violet px-5 py-4 text-white md:col-span-2">
                    <ShieldCheck className="size-5 shrink-0 text-blob" strokeWidth={1.9} />
                    <span className="text-[14.5px] font-medium">{role.rule}</span>
                    <span className="ml-auto hidden items-center gap-2 text-[13px] text-white/60 sm:flex">
                      <FileText className="size-3.5" /> read by
                      <BlobAgent color={role.color} size={18} hop={false} />
                      {role.agent}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <p className="mt-4 text-[12.5px] text-faint">Examples. Your procedures and figures go in their place.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
