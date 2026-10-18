"use client";

import {
  ArrowUp,
  CalendarClock,
  Check,
  FileText,
  Hash,
  Link2,
  Lock,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  UploadCloud,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { BlobAgent } from "@/components/blob";
import { ServiceIcon, type LogoName } from "@/components/brand-icon";
import { CapabilityArt } from "@/components/capability-art";
import { CountUp } from "@/components/count-up";
import { BarChart, Panel, Pill, Toggle, Typed } from "@/components/movie/parts";

/*
 * Every scene is laid out twice by container query: the base classes are the
 * phone canvas (440 px wide), `@2xl:` is the desktop one (the console's main
 * area, 844 px). `data-cursor` marks what the pointer travels to, `data-zoom`
 * what the camera closes in on; both are read by product-movie.tsx.
 */

const FINANCE = "#1fb58f";
const SUPPORT = "#f2b8c6";
const SALES = "#f5cdb6";
const EASE = [0.22, 1, 0.36, 1] as const;

const appear = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.45, ease: EASE },
};

function Spinner() {
  return <span className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-[#d4d4d8] border-t-[#18181b]" />;
}

/** Build: name the agent, brief it, switch tools on, publish. */
export function BuildScene({ step }: { step: number }) {
  const capabilities = [
    { id: "knowledge", name: "Knowledge search", on: true },
    { id: "code_execution", name: "Calculations", on: true },
    { id: "charts", name: "Charts", on: step >= 4, target: "cap-charts" },
    { id: "sandbox", name: "Sandbox", on: step >= 5, target: "cap-sandbox" },
  ];
  const published = step >= 6;
  return (
    <div className="flex h-full flex-col gap-4 p-5 @2xl:p-6">
      <div className="flex flex-col gap-3 @2xl:flex-row @2xl:items-start @2xl:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ecf8f2] ring-1 ring-[#d6efe3]">
            <AnimatePresence>
              {step >= 1 ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 420, damping: 16 }}>
                  <BlobAgent color={FINANCE} size={32} hop={false} />
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>
          <div>
            <p className="flex items-center gap-2 text-[11px] text-[#71717a]">
              Agents › New agent
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f4f5] px-2 py-[1px] text-[10.5px] text-[#52525b]">
                <Sparkles className="size-3 text-[#d97757]" /> Claude Sonnet 5.5
              </span>
            </p>
            <p data-cursor="agent-name" className="mt-0.5 min-h-[28px] min-w-[200px] text-[22px] font-semibold tracking-[-0.01em] text-[#18181b]">
              <Typed text="Finance Analyst" active={step === 1} done={step > 1} />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {published ? (
              <motion.span key="pub" {...appear}>
                <Pill tone="ok">published · v1</Pill>
              </motion.span>
            ) : (
              <motion.span key="draft" {...appear}>
                <Pill>draft</Pill>
              </motion.span>
            )}
          </AnimatePresence>
          <span
            data-cursor="publish"
            className={`ml-auto inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-medium text-white transition-colors @2xl:ml-0 ${published ? "bg-[#3f3f46]" : "bg-[#18181b]"}`}
          >
            <Upload className="size-3.5" /> Publish
          </span>
        </div>
      </div>

      <Panel className="p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">Instructions</p>
        <p data-cursor="agent-instructions" className="mt-2 min-h-[60px] text-[13px] leading-relaxed text-[#3f3f46] @2xl:min-h-[40px]">
          <Typed
            text="Answer questions about spend, revenue and invoices, and turn a spreadsheet into a chart and a short finding."
            active={step === 2}
            done={step > 2}
            cps={70}
          />
        </p>
      </Panel>

      <div data-zoom="toolbox">
        <p className="mb-2 text-[12px] font-medium text-[#3f3f46]">
          Toolbox <span className="font-normal text-[#a1a1aa]">· {capabilities.filter((c) => c.on).length} of 29 on</span>
        </p>
        <div className="grid grid-cols-2 gap-3 @2xl:grid-cols-4">
          {capabilities.map((capability) => (
            <div
              key={capability.id}
              data-cursor={capability.target}
              className={`overflow-hidden rounded-[12px] border bg-white transition-colors duration-300 ${capability.on ? "border-[#d4d4d8]" : "border-[#ececef]"}`}
            >
              <div className={`transition-[filter,opacity] duration-500 ${capability.on ? "" : "opacity-70 saturate-[0.3]"}`}>
                <CapabilityArt id={capability.id} />
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <span className="truncate text-[12.5px] font-medium text-[#18181b]">{capability.name}</span>
                <Toggle on={capability.on} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-zoom="surfaces" className="flex flex-wrap items-center gap-2">
        <span className="text-[12px] font-medium text-[#3f3f46]">Answers in</span>
        {["Web chat", "Slack", "Mattermost", "Website widget", "HTTP API"].map((surface, index) => (
          <motion.span
            key={surface}
            initial={false}
            animate={{ opacity: published ? 1 : 0.45 }}
            transition={{ delay: published ? index * 0.08 : 0 }}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] ${published ? "border-[#bfe5d2] bg-[#ecf8f2] text-[#16794c]" : "border-[#e6e6ea] text-[#71717a]"}`}
          >
            {published ? <Check className="size-3" /> : null}
            {surface}
          </motion.span>
        ))}
      </div>

      <div className="hidden grid-cols-2 gap-3 @2xl:grid">
        <Panel className="flex items-center justify-between px-4 py-3">
          <span>
            <span className="block text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">Who can use it</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[12.5px] font-medium text-[#18181b]">
              <Users className="size-3.5" /> Finance, Board
            </span>
          </span>
          <span className="text-[11.5px] text-[#71717a]">2 groups</span>
        </Panel>
        <Panel className="px-4 py-3">
          <span className="flex items-center justify-between text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">
            Monthly budget <span className="normal-case tracking-normal text-[#3f3f46]">$40.00</span>
          </span>
          <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[#f1f1f3]">
            <span className="block h-full w-[11%] rounded-full bg-[#5b5bd6]" />
          </span>
        </Panel>
      </div>

      <AnimatePresence>
        {published ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-x-5 bottom-5 flex items-center gap-2.5 rounded-[12px] bg-[#18181b] px-4 py-3 text-[12.5px] text-white shadow-xl @2xl:left-auto @2xl:right-5"
          >
            <Check className="size-4 shrink-0 text-[#6ee7b7]" /> Finance Analyst is live in chat, Slack and the API
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Teach: a handbook goes into a knowledge base, and an answer cites the page it came from. */
export function TeachScene({ step }: { step: number }) {
  const uploaded = step >= 2;
  const stages = [
    { label: "Parsed", at: 2 },
    { label: "Split into chunks", at: 3 },
    { label: "Embedded and indexed", at: 4 },
  ];
  const ready = step >= 5;
  return (
    <div className="flex h-full flex-col gap-4 p-5 @2xl:grid @2xl:grid-cols-[1.05fr_1fr] @2xl:p-6">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[11px] text-[#71717a]">Knowledge bases ›</p>
          <p className="text-[20px] font-semibold tracking-[-0.01em] text-[#18181b]">Support handbook</p>
          <p className="text-[12px] text-[#71717a]">Plans, refunds, account access and the support SLA.</p>
        </div>
        <div
          data-cursor="kb-drop"
          className={`flex flex-col items-center justify-center gap-1.5 rounded-[14px] border-2 border-dashed px-4 py-4 text-center transition-colors duration-300 @2xl:gap-2 @2xl:py-6 ${
            step === 1 ? "border-[#5b5bd6] bg-[#f3f3ff]" : "border-[#e4e4e7] bg-[#fafafa]"
          }`}
        >
          <UploadCloud className={`size-6 ${step === 1 ? "text-[#5b5bd6]" : "text-[#a1a1aa]"}`} />
          <p className="text-[12.5px] font-medium text-[#3f3f46]">Drop files to add them</p>
          <p className="text-[11px] text-[#a1a1aa]">PDF, DOCX, slides, sheets, scans with OCR</p>
        </div>
        <AnimatePresence>
          {uploaded ? (
            <motion.div {...appear}>
              <Panel className="p-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-8 items-center justify-center rounded-[8px] bg-[#fdecec] text-[#c2410c]">
                    <FileText className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-[#18181b]">support-handbook-2026.pdf</p>
                    <p className="text-[11px] text-[#71717a]">Parser: PyMuPDF · runs locally</p>
                  </div>
                  {ready ? <Pill tone="ok">Ready</Pill> : <Pill tone="warn">Processing</Pill>}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[#f1f1f3] pt-3 @2xl:block @2xl:space-y-1.5">
                  {stages.map((stage) => (
                    <li key={stage.label} className="flex items-center gap-2 text-[12px] text-[#52525b]">
                      {step > stage.at || ready ? (
                        <Check className="size-3.5 text-[#22a06b]" />
                      ) : step === stage.at ? (
                        <Spinner />
                      ) : (
                        <span className="size-3.5 rounded-full border-2 border-[#e4e4e7]" />
                      )}
                      {stage.label}
                    </li>
                  ))}
                </ul>
              </Panel>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <Panel className="hidden p-3.5 @2xl:block">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">How this base reads files</p>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px]">
            {[
              ["Parser", "PyMuPDF, local"],
              ["Chunking", "By heading"],
              ["OCR for scans", "On"],
              ["Embeddings", "Local or hosted"],
            ].map(([label, value]) => (
              <p key={label} className="flex justify-between gap-2"><span className="text-[#71717a]">{label}</span><span className="font-medium text-[#18181b]">{value}</span></p>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="flex min-h-0 flex-1 flex-col p-4">
        <div className="flex items-center gap-2 border-b border-[#f1f1f3] pb-3">
          <BlobAgent color={SUPPORT} size={22} hop={false} />
          <span className="text-[13px] font-semibold text-[#18181b]">Support Desk</span>
          <span className="text-[11px] text-[#a1a1aa]">· test chat</span>
        </div>
        <div data-zoom="kb-chat" className="flex-1 space-y-3 pt-3">
          {step >= 5 ? (
            <p data-cursor="kb-ask" className="ml-auto max-w-[90%] rounded-[12px] bg-[#f1f1f3] px-3 py-2 text-[12.5px] text-[#18181b]">
              <Typed text="Who has to approve a $520 refund on day 3?" active={step === 5} done={step > 5} cps={36} />
            </p>
          ) : (
            <p data-cursor="kb-ask" className="pt-6 text-center text-[12px] text-[#a1a1aa]">{uploaded ? "Indexing…" : "Add a document to ask about it"}</p>
          )}
          {step >= 6 ? (
            <motion.div {...appear} className="space-y-2">
              <p className="text-[12.5px] leading-relaxed text-[#27272a]">
                The <b>support lead</b>. Refunds between $200 and $2,000 need their approval; up to $200 any agent can approve, and above $2,000 it goes to finance. Day 3 is inside the 14-day full-refund window.
              </p>
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 18 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-2.5 py-1 text-[11px] font-medium text-[#4338ca]"
              >
                <FileText className="size-3" /> support-handbook-2026.pdf · p.12
              </motion.span>
            </motion.div>
          ) : null}
        </div>
      </Panel>
    </div>
  );
}

const GALLERY: readonly { name: string; logo: LogoName; blurb: string; connected?: boolean; target?: string }[] = [
  { name: "Notion", logo: "notion", blurb: "Docs and wikis", connected: true },
  { name: "GitHub", logo: "github", blurb: "Repositories and issues", connected: true },
  { name: "HubSpot", logo: "hubspot", blurb: "Contacts and deals", target: "connect-hubspot" },
  { name: "Linear", logo: "linear", blurb: "Issues and projects" },
  { name: "Google Drive", logo: "gdrive", blurb: "Files and folders" },
  { name: "Jira", logo: "jira", blurb: "Issues and sprints" },
];

const HUBSPOT_TOOLS: readonly { name: string; writes: boolean }[] = [
  { name: "Search deals", writes: false },
  { name: "Read a contact", writes: false },
  { name: "Update a deal stage", writes: true },
  { name: "Add a note to a deal", writes: true },
];

/** Connect: a SaaS tool joins through the MCP gallery and its own sign-in; the agent gets chosen tools. */
export function ConnectScene({ step }: { step: number }) {
  const consent = step === 2 || step === 3;
  const connected = step >= 4;
  return (
    <div className="relative flex h-full flex-col gap-4 p-5 @2xl:p-6">
      <div className="flex flex-col gap-3 @2xl:flex-row @2xl:items-end @2xl:justify-between">
        <div>
          <p className="text-[20px] font-semibold tracking-[-0.01em] text-[#18181b]">MCP servers</p>
          <p className="text-[12px] text-[#71717a]">Connect a service once, then choose which tools each agent may call.</p>
        </div>
        <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[#e6e6ea] bg-white px-3.5 text-[12.5px] text-[#a1a1aa] @2xl:w-[260px]">
          <Search className="size-3.5" /> Search 4,700+ servers
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 @2xl:grid @2xl:grid-cols-[1.45fr_1fr]">
        <div className="grid content-start gap-2">
          {GALLERY.map((server) => {
            const live = server.connected === true || (server.logo === "hubspot" && connected);
            return (
              <div
                key={server.name}
                className={`flex items-center gap-3 rounded-[12px] border bg-white px-3 py-2.5 transition-colors duration-500 ${
                  server.logo === "hubspot" && step >= 1 ? "border-[#c7d2fe] bg-[#fafaff]" : "border-[#e6e6ea]"
                }`}
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#f7f7f8]">
                  <ServiceIcon name={server.logo} className="size-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold text-[#18181b]">{server.name}</p>
                  <p className="truncate text-[11px] text-[#71717a]">{server.blurb}</p>
                </div>
                {live ? (
                  <Check className="size-4 shrink-0 text-[#22a06b]" aria-label="Connected" />
                ) : (
                  <span
                    data-cursor={server.target}
                    className={`inline-flex h-7 shrink-0 items-center rounded-full px-2.5 text-[11.5px] font-medium ${
                      server.target ? "bg-[#18181b] text-white" : "border border-[#e6e6ea] text-[#3f3f46]"
                    }`}
                  >
                    Connect
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <Panel className="flex min-h-[230px] flex-col p-4">
          <AnimatePresence mode="wait">
            {connected ? (
              <motion.div key="tools" {...appear} data-zoom="connect-tools" className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <ServiceIcon name="hubspot" className="size-5" />
                  <p className="text-[14px] font-semibold text-[#18181b]">HubSpot</p>
                  <Pill tone="ok">Connected</Pill>
                </div>
                <p className="flex items-center gap-1.5 text-[11.5px] text-[#71717a]">
                  For <BlobAgent color={SALES} size={14} hop={false} /> <b className="font-medium text-[#3f3f46]">Sales Researcher</b>
                </p>
                <ul className="space-y-2">
                  {HUBSPOT_TOOLS.map((tool, index) => (
                    <motion.li
                      key={tool.name}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.12, duration: 0.4, ease: EASE }}
                      className="flex items-center justify-between gap-2 rounded-[10px] bg-[#f7f7f8] px-3 py-2"
                    >
                      <span className="text-[12px] font-medium text-[#18181b]">{tool.name}</span>
                      <span className="flex items-center gap-2">
                        {tool.writes ? (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#94650a]">
                            <ShieldCheck className="size-3" /> Asks first
                          </span>
                        ) : null}
                        <Toggle on />
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div key="empty" {...appear} className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#f4f4f5] text-[#a1a1aa]">
                  <Link2 className="size-4" />
                </span>
                <p className="text-[12.5px] font-medium text-[#3f3f46]">Pick a server to connect</p>
                <p className="max-w-[220px] text-[11.5px] text-[#a1a1aa]">Its tools appear here, each one switched on or off per agent.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Panel>
      </div>

      <AnimatePresence>
        {consent ? (
          <motion.div
            key="consent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#18181b]/25 p-5 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="w-full max-w-[340px] overflow-hidden rounded-[16px] bg-white shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-[#f1f1f3] bg-[#fbfbfc] px-4 py-2.5 text-[11px] text-[#71717a]">
                <Lock className="size-3" /> app.hubspot.com
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <ServiceIcon name="hubspot" className="size-7" />
                  <span className="text-[#d4d4d8]">⇄</span>
                  <span className="inline-flex size-7 items-center justify-center rounded-[8px] bg-[#2b2547]">
                    <BlobAgent color="#bbd1ff" size={18} hop={false} />
                  </span>
                </div>
                <p className="mt-4 text-[14.5px] font-semibold text-[#18181b]">Connect AgenticOS to Northwind Labs</p>
                <p className="mt-1 text-[12px] text-[#71717a]">AgenticOS will be able to:</p>
                <ul className="mt-2.5 space-y-1.5 text-[12px] text-[#3f3f46]">
                  <li className="flex items-center gap-2"><Check className="size-3.5 text-[#22a06b]" /> Read contacts and companies</li>
                  <li className="flex items-center gap-2"><Check className="size-3.5 text-[#22a06b]" /> Read and update deals</li>
                </ul>
                <span
                  data-cursor="oauth-allow"
                  className={`mt-5 inline-flex h-9 w-full items-center justify-center rounded-full text-[12.5px] font-medium text-white transition-colors ${step === 3 ? "bg-[#3f3f46]" : "bg-[#ff7a59]"}`}
                >
                  {step === 3 ? "Connecting…" : "Connect app"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Ask: a colleague mentions the agent in Slack and it answers in the thread, with a chart. */
export function SlackScene({ step }: { step: number }) {
  return (
    <div className="flex h-full">
      <aside className="hidden w-[196px] shrink-0 flex-col gap-1 bg-[#3f0e40] px-3 py-4 text-[12.5px] text-white/70 @2xl:flex">
        <p className="mb-3 flex items-center gap-2 px-2 text-[14px] font-semibold text-white">
          <ServiceIcon name="slack" className="size-4" /> Northwind Labs
        </p>
        {["general", "finance", "support", "board"].map((channel) => (
          <p key={channel} className={`flex items-center gap-1.5 rounded-[6px] px-2 py-1 ${channel === "finance" ? "bg-[#1164a3] text-white" : ""}`}>
            <Hash className="size-3.5" /> {channel}
          </p>
        ))}
        <p className="mb-1 mt-4 px-2 text-[10.5px] uppercase tracking-[0.08em] text-white/45">Apps</p>
        {[{ name: "Finance Analyst", color: FINANCE }, { name: "Support Desk", color: SUPPORT }].map((app) => (
          <p key={app.name} className="flex items-center gap-2 px-2 py-1">
            <BlobAgent color={app.color} size={14} hop={false} /> {app.name}
          </p>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex items-center gap-1.5 border-b border-[#ececef] px-5 py-3 text-[14px] font-semibold text-[#18181b]">
          <ServiceIcon name="slack" className="size-4 @2xl:hidden" />
          <Hash className="size-4" /> finance
        </div>
        <div className="flex-1 space-y-4 overflow-hidden px-5 py-4">
          <div className="flex gap-3 opacity-80">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-[#c7d2fe] text-[13px] font-semibold text-[#3730a3]">T</span>
            <div>
              <p className="text-[13px]"><b className="text-[#18181b]">Tomasz</b> <span className="text-[11px] text-[#a1a1aa]">9:12</span></p>
              <p className="text-[13px] text-[#27272a]">The board deck goes out Thursday. Numbers by Wednesday, please.</p>
            </div>
          </div>
          <p className="flex items-center gap-3 text-[11px] font-medium text-[#71717a]"><span className="h-px flex-1 bg-[#ececef]" />Today<span className="h-px flex-1 bg-[#ececef]" /></p>
          <motion.div {...appear} className="flex gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-[#fde68a] text-[13px] font-semibold text-[#92400e]">M</span>
            <div>
              <p className="text-[13px]"><b className="text-[#18181b]">Marta</b> <span className="text-[11px] text-[#a1a1aa]">9:41</span></p>
              <p className="text-[13px] text-[#27272a]">
                <span className="rounded-[4px] bg-[#e8f5fa] px-1 text-[#1264a3]">@Finance Analyst</span> can you chart Q3 revenue against costs for the board deck?
              </p>
            </div>
          </motion.div>
          {step >= 1 ? (
            <motion.div {...appear} data-zoom="slack-reply" className="flex gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-[#ecf8f2]">
                <BlobAgent color={FINANCE} size={24} hop={false} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px]">
                  <b className="text-[#18181b]">Finance Analyst</b>{" "}
                  <span className="rounded-[3px] bg-[#f1f1f3] px-1 text-[10px] font-semibold text-[#71717a]">APP</span>{" "}
                  <span className="text-[11px] text-[#a1a1aa]">9:41</span>
                </p>
                {step === 1 ? (
                  <p className="flex items-center gap-2 text-[12.5px] text-[#71717a]">
                    <Spinner />
                    Reading ledgerly-revenue-2026.csv, running Python…
                  </p>
                ) : (
                  <motion.div {...appear} className="space-y-2">
                    <p className="text-[13px] leading-relaxed text-[#27272a]">
                      Revenue grew faster than costs: up 27% from July to September while costs rose 13%, so the margin widened every month.
                    </p>
                    <Panel className="max-w-[440px] p-3.5">
                      <p className="text-[12px] font-semibold text-[#18181b]">Q3 revenue vs costs ($ thousands)</p>
                      <div className="mt-2"><BarChart grow height={112} /></div>
                    </Panel>
                    <p className="text-[11.5px] text-[#71717a]">Worked for 12s · read the file, ran Python, drew a chart · <span className="text-[#1264a3]">Open in AgenticOS</span></p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : null}
        </div>
        <div className="m-4 mt-0 rounded-[10px] border border-[#d4d4d8] px-3 py-2.5 text-[12.5px] text-[#a1a1aa]">Message #finance</div>
      </div>
    </div>
  );
}

/** Automate: a routine runs the agent every Monday and keeps the dashboard current. */
export function AutomateScene({ step }: { step: number }) {
  const formOpen = step >= 1;
  const active = step >= 3;
  const runs = [
    { when: "Mon, Oct 12 · 08:00", version: "v3" },
    { when: "Mon, Oct 5 · 08:00", version: "v2" },
  ];
  return (
    <div className="flex h-full flex-col gap-4 p-5 @2xl:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[20px] font-semibold tracking-[-0.01em] text-[#18181b]">Routines</p>
          <p className="text-[12px] text-[#71717a]">Start an agent on a schedule, a GitHub issue, a Gmail message or a signed webhook.</p>
        </div>
        <span data-cursor="routine-new" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-[#18181b] px-3.5 text-[12.5px] font-medium text-white">
          <Plus className="size-3.5" /> New routine
        </span>
      </div>

      <AnimatePresence>
        {formOpen ? (
          <motion.div {...appear}>
            <Panel className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold text-[#18181b]">
                  <Typed text="Weekly board numbers" active={step === 1} done={step > 1} cps={30} />
                </p>
                <span data-cursor="routine-toggle" className="flex items-center gap-2 text-[12px] text-[#52525b]">
                  {active ? "Active" : "Off"} <Toggle on={active} />
                </span>
              </div>
              <div className="mt-3 grid gap-2.5 text-[12px] @2xl:grid-cols-3">
                <div className="rounded-[10px] bg-[#f7f7f8] p-3">
                  <p className="text-[10.5px] uppercase tracking-[0.06em] text-[#a1a1aa]">When</p>
                  <p className="mt-1 flex items-center gap-1.5 font-medium text-[#18181b]"><CalendarClock className="size-3.5" /> Every Monday, 08:00</p>
                </div>
                <div className="rounded-[10px] bg-[#f7f7f8] p-3">
                  <p className="text-[10.5px] uppercase tracking-[0.06em] text-[#a1a1aa]">Agent</p>
                  <p className="mt-1 flex items-center gap-1.5 font-medium text-[#18181b]"><BlobAgent color={FINANCE} size={14} hop={false} /> Finance Analyst</p>
                </div>
                <div className="rounded-[10px] bg-[#f7f7f8] p-3">
                  <p className="text-[10.5px] uppercase tracking-[0.06em] text-[#a1a1aa]">Or start it on</p>
                  <p className="mt-1 flex items-center gap-1.5 font-medium text-[#18181b]">
                    <ServiceIcon name="gmail" className="size-3.5" /> <ServiceIcon name="github" className="size-3.5" /> <ServiceIcon name="webhooks" className="size-3.5" />
                  </p>
                </div>
              </div>
              <p className="mt-3 rounded-[10px] border border-[#f1f1f3] px-3 py-2 text-[12px] text-[#52525b]">
                Refresh the Q3 board dashboard from the latest ledger and note anything that moved more than 5%.
              </p>
            </Panel>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {step >= 4 ? (
        <motion.div {...appear} data-zoom="routine-runs">
          <p className="mb-2 text-[12px] font-medium text-[#3f3f46]">Runs</p>
          <div className="space-y-2">
            {runs.map((run, index) => (
              <motion.div
                key={run.when}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.25, duration: 0.45, ease: EASE }}
              >
                <Panel className="flex flex-col gap-1 px-4 py-3 @2xl:flex-row @2xl:items-center @2xl:justify-between">
                  <div className="flex items-center gap-3">
                    <Check className="size-4 text-[#22a06b]" />
                    <span className="text-[12.5px] font-medium text-[#18181b]">{run.when}</span>
                    <span className="text-[11.5px] text-[#71717a]">Finished · 35.9 s</span>
                  </div>
                  <span className="pl-7 text-[11.5px] text-[#52525b] @2xl:pl-0">Updated Q3 2026 Board Dashboard → <b>{run.version}</b></span>
                </Panel>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

/** Share: the result is an app with a stable link and versions. */
export function ShareScene({ step }: { step: number }) {
  const kpis = [
    { label: "Revenue", value: "618", prefix: "$", suffix: "k", note: "▲ 14% vs Q2" },
    { label: "Costs", value: "449", prefix: "$", suffix: "k", note: "Jul – Sep total" },
    { label: "Margin", value: "27.3%", note: "▲ 8.5 pts Jul to Sep" },
    { label: "Active customers", value: "1,284", note: "End of Q3" },
  ];
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-[#ececef] px-5 py-3 @2xl:px-6">
        <div className="flex min-w-0 items-center gap-2.5 text-[13px]">
          <span className="truncate font-semibold text-[#18181b]">Q3 2026 Board Dashboard</span>
          <span className="hidden items-center gap-1 text-[12px] text-[#71717a] @2xl:inline-flex"><Lock className="size-3" /> Only people with access</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Pill>v1 · Latest</Pill>
          <span data-cursor="share" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#18181b] px-3.5 text-[12.5px] font-medium text-white">
            <Users className="size-3.5" /> Share
          </span>
        </div>
      </div>
      <div className="flex-1 space-y-4 bg-[#f7f7f8] p-5 @2xl:p-6">
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.12em] text-[#71717a]">Northwind Labs · Board report</p>
          <p className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-[#18181b]">Q3 2026 Dashboard</p>
        </div>
        <div data-zoom="kpis" className="grid grid-cols-2 gap-3 @2xl:grid-cols-4">
          {kpis.map((kpi, index) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: EASE }}>
              <Panel className="p-3.5">
                <p className="text-[11.5px] text-[#71717a]">{kpi.label}</p>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[#18181b]">
                  {kpi.prefix}
                  {kpi.value.includes(".") ? kpi.value : <CountUp value={kpi.value} />}
                  {kpi.suffix}
                </p>
                <p className={`mt-0.5 text-[11px] ${kpi.note.startsWith("▲") ? "font-medium text-[#16794c]" : "text-[#71717a]"}`}>{kpi.note}</p>
              </Panel>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-3 @2xl:grid-cols-[1.3fr_1fr]">
          <Panel className="p-4">
            <p className="text-[12.5px] font-semibold text-[#18181b]">Revenue vs costs</p>
            <p className="text-[11px] text-[#71717a]">Monthly, $k</p>
            <div className="mt-2"><BarChart grow height={120} /></div>
          </Panel>
          <Panel className="p-4">
            <p className="text-[12.5px] font-semibold text-[#18181b]">Margin trend</p>
            <p className="text-[11px] text-[#71717a]">Monthly margin, % of revenue</p>
            <svg viewBox="0 0 200 100" className="mt-3 h-[96px] w-full overflow-visible @2xl:h-[110px]">
              <motion.path d="M10 82 L100 56 L190 18" fill="none" stroke="#5b5bd6" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.4, ease: EASE }} />
              {[[10, 82], [100, 56], [190, 18]].map(([x, y], index) => (
                <motion.circle key={x} cx={x} cy={y} r="4" fill="white" stroke="#5b5bd6" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + index * 0.35 }} />
              ))}
            </svg>
          </Panel>
        </div>
      </div>

      <AnimatePresence>
        {step >= 2 ? (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute right-5 top-[52px] w-[270px] rounded-[14px] border border-[#e6e6ea] bg-white p-4 shadow-2xl @2xl:right-6"
          >
            <p className="text-[13px] font-semibold text-[#18181b]">Share this app</p>
            <p className="mt-1 text-[11.5px] text-[#71717a]">Updates keep the same link; earlier versions stay readable.</p>
            <div className="mt-3 flex items-center justify-between rounded-[10px] bg-[#f4f4f5] px-3 py-2 text-[12px]">
              <span className="flex items-center gap-1.5 text-[#3f3f46]"><Users className="size-3.5" /> Finance group</span>
              <span className="text-[#71717a]">Can view</span>
            </div>
            <span data-cursor="copy-link" className={`mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-full text-[12.5px] font-medium transition-colors ${step >= 3 ? "bg-[#ecf8f2] text-[#16794c]" : "bg-[#18181b] text-white"}`}>
              {step >= 3 ? <><Check className="size-3.5" /> Link copied</> : <><Link2 className="size-3.5" /> Copy link</>}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const COMMANDS: readonly { name: string; description: string }[] = [
  { name: "summarize", description: "Ask the agent to summarize the conversation so far." },
  { name: "explain", description: "Ask the agent to explain its last response in simpler terms." },
  { name: "regen", description: "Regenerate the last assistant response." },
  { name: "weekly-report", description: "Your command: this week’s numbers as a board brief." },
];

const PICKER: readonly { name: string; color: string; job: string }[] = [
  { name: "Finance Analyst", color: FINANCE, job: "Spend, revenue and invoices" },
  { name: "Support Desk", color: SUPPORT, job: "Answers from the handbook" },
  { name: "Sales Researcher", color: SALES, job: "Browses the web for you" },
];

function MentionChip({ name, color }: { name: string; color: string }) {
  return (
    <span className="mx-0.5 inline-flex translate-y-[2px] items-center gap-1 rounded-full bg-[#ecf8f2] px-1.5 py-[1px] text-[12.5px] font-medium text-[#16794c] ring-1 ring-[#cdeedd]">
      <BlobAgent color={color} size={13} hop={false} />
      {name}
    </span>
  );
}

/** Chat: the console's own chat, where an @mention picks the agent and a slash runs a command. */
export function ChatScene({ step }: { step: number }) {
  const mentionOpen = step === 1;
  const chipped = step >= 2;
  const sent = step >= 4;
  const slash = step >= 7;
  return (
    <div className="flex h-full">
      <aside className="hidden w-[208px] shrink-0 flex-col gap-1 border-r border-[#ececef] p-3 @2xl:flex">
        <span className="mb-2 inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[#e6e6ea] text-[12px] font-medium text-[#3f3f46]">
          <Plus className="size-3.5" /> New chat
        </span>
        <p className="px-2 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.08em] text-[#a1a1aa]">Today</p>
        {[
          { title: "Q3 revenue vs costs", color: FINANCE, current: true },
          { title: "Refund rule for day 3", color: SUPPORT },
          { title: "Neno, latest news", color: SALES },
          { title: "Board call brief", color: "#d8c84a" },
        ].map((chat) => (
          <p key={chat.title} className={`flex items-center gap-2 rounded-[8px] px-2 py-1.5 text-[12px] ${chat.current && sent ? "bg-[#f1f1f3] font-medium text-[#18181b]" : "text-[#52525b]"}`}>
            <BlobAgent color={chat.color} size={14} hop={false} />
            <span className="truncate">{chat.title}</span>
          </p>
        ))}
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex-1 space-y-4 overflow-hidden p-5 @2xl:p-6">
          {sent ? (
            <>
              <motion.div {...appear} className="ml-auto flex max-w-[86%] flex-col items-end gap-1.5">
                <span className="inline-flex items-center gap-2 rounded-[10px] border border-[#e6e6ea] bg-white px-3 py-1.5 text-[11.5px] text-[#3f3f46]">
                  <FileText className="size-3.5 text-[#16794c]" /> ledgerly-revenue-2026.csv
                </span>
                <span className="rounded-[14px] bg-[#f1f1f3] px-4 py-2.5 text-[13px] leading-relaxed text-[#18181b]">
                  <MentionChip name="Finance Analyst" color={FINANCE} /> chart Q3 revenue against costs and tell me what stands out.
                </span>
              </motion.div>
              <motion.div {...appear} transition={{ ...appear.transition, delay: 0.2 }} data-zoom="chat-answer" className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <BlobAgent color={FINANCE} size={22} hop={false} />
                  <span className="text-[13px] font-semibold text-[#18181b]">Finance Analyst</span>
                  <span className="text-[11.5px] text-[#a1a1aa]">{step >= 6 ? "Worked for 12s · 3 steps" : "Working…"}</span>
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 pl-1 text-[12px] text-[#52525b]">
                  {["Read the file", "Ran Python", "Drew a chart"].map((label, index) => (
                    <li key={label} className="flex items-center gap-1.5">
                      {step >= 6 || index < step - 4 ? <Check className="size-3.5 text-[#22a06b]" /> : <Spinner />}
                      {label}
                    </li>
                  ))}
                </ul>
                {step >= 6 ? (
                  <motion.div {...appear} className="space-y-2.5">
                    <Panel className="max-w-[480px] p-3.5">
                      <p className="text-[12px] font-semibold text-[#18181b]">Q3 revenue vs costs ($ thousands)</p>
                      <div className="mt-2"><BarChart grow height={104} /></div>
                    </Panel>
                    <p className="max-w-[560px] text-[13px] leading-relaxed text-[#27272a]">
                      Revenue grew faster than costs: up 27% from July to September while costs rose 13%, so the margin widened every month.
                    </p>
                  </motion.div>
                ) : null}
              </motion.div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 pb-10 text-center">
              <BlobAgent color="#bbd1ff" size={44} />
              <p className="text-[16px] font-semibold text-[#18181b]">Good afternoon, Ana</p>
              <p className="text-[12.5px] text-[#71717a]">Type @ to pick an agent, / for a command.</p>
            </div>
          )}
        </div>

        <div className="relative p-4 pt-0">
          <AnimatePresence>
            {mentionOpen ? (
              <motion.div {...appear} className="absolute bottom-[calc(100%-6px)] left-4 w-[280px] rounded-[14px] border border-[#e6e6ea] bg-white p-1.5 shadow-xl">
                <p className="px-2.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">Agents</p>
                {PICKER.map((agent, index) => (
                  <p key={agent.name} data-cursor={index === 0 ? "mention-pick" : undefined} className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 ${index === 0 ? "bg-[#f4f4f5]" : ""}`}>
                    <BlobAgent color={agent.color} size={20} hop={false} />
                    <span>
                      <span className="block text-[12.5px] font-medium text-[#18181b]">{agent.name}</span>
                      <span className="block text-[11px] text-[#71717a]">{agent.job}</span>
                    </span>
                  </p>
                ))}
              </motion.div>
            ) : null}
            {slash ? (
              <motion.div {...appear} data-zoom="slash" className="absolute bottom-[calc(100%-6px)] left-4 w-[360px] rounded-[14px] border border-[#e6e6ea] bg-white p-1.5 shadow-xl">
                <p className="px-2.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">Commands</p>
                {COMMANDS.map((command, index) => (
                  <p key={command.name} data-cursor={index === 0 ? "slash-pick" : undefined} className={`rounded-[10px] px-2.5 py-1.5 ${index === 0 && step >= 8 ? "bg-[#f4f4f5]" : ""}`}>
                    <span className="block font-mono text-[12px] font-medium text-[#18181b]">/{command.name}</span>
                    <span className="block text-[11px] text-[#71717a]">{command.description}</span>
                  </p>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="rounded-[14px] border border-[#e6e6ea] bg-white p-3 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.12)]">
            <p data-cursor="chat-composer" className="min-h-[40px] text-[13px] leading-relaxed text-[#18181b]">
              {sent && !slash ? (
                <span className="text-[#a1a1aa]">Reply to Finance Analyst…</span>
              ) : slash ? (
                <span className="font-mono">/</span>
              ) : chipped ? (
                <>
                  <MentionChip name="Finance Analyst" color={FINANCE} />
                  <Typed text=" chart Q3 revenue against costs and tell me what stands out." active={step === 2} done={step > 2} cps={52} />
                </>
              ) : (
                <Typed text="@Fin" active={step <= 1} done={false} cps={8} />
              )}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                {chipped && !sent ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e6ea] px-2 py-1 text-[11px] text-[#3f3f46]">
                    <FileText className="size-3 text-[#16794c]" /> ledgerly-revenue-2026.csv
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e6ea] px-2 py-1 text-[11px] text-[#71717a]">
                    <Sparkles className="size-3 text-[#d97757]" /> Claude Sonnet 5.5
                  </span>
                )}
              </span>
              <span data-cursor="chat-send" className={`inline-flex size-8 items-center justify-center rounded-full text-white transition-colors ${chipped && !sent ? "bg-[#18181b]" : "bg-[#d4d4d8]"}`}>
                <ArrowUp className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
