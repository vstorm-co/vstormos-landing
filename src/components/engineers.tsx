"use client";

import { ArrowUpRight, Workflow } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { ArtCard } from "@/components/art-card";
import { BrandIcon, ServiceIcon, type LogoName } from "@/components/brand-icon";
import { Code, type CodeLanguage } from "@/components/code";
import { Contributors } from "@/components/contributors";
import { CopyButton } from "@/components/copy-button";
import { Reveal, SplitHeading } from "@/components/ui";
import { links } from "@/content";
import { asset } from "@/lib/site";

/*
 * The three files follow the product: a capability modelled on
 * docs/howto/add-capability.md, an excerpt of what `AgentSpec.to_yaml()` writes
 * for this agent (spec_version 13, empty defaults left out), and the run call
 * from docs/api.md.
 */
const FILES: readonly { name: string; language: CodeLanguage; caption: string; code: string }[] = [
  {
    name: "capabilities/weather.py",
    language: "python",
    caption: "A capability is typed Python: the tool’s docstring is the prompt the model reads, the config is a validated model the console draws as a form, and scopes decide who may use it.",
    code: `async def current_weather(city: str) -> Forecast:
    """Get the current weather for a city.

    Use this when an answer depends on today's conditions
    rather than a seasonal average.
    """
    return await weather_api.current(city)


class WeatherConfig(BaseModel):
    units: Literal["metric", "imperial"] = Field(
        default="metric",
        description="metric for °C and km/h, imperial for °F and mph.",
    )


@register(
    id="weather",                   # stable in every published spec
    name="Weather",
    description="Read current conditions instead of assuming them.",
    config_schema=WeatherConfig,    # the settings form, validated at publish
    scopes=("weather:read",),       # what a role or an API key needs
)
def build(ctx: CapabilityBuildContext) -> Weather:
    return Weather(config=WeatherConfig.model_validate(ctx.config))`,
  },
  {
    name: "finance-analyst.yaml",
    language: "yaml",
    caption: "Every published agent is a versioned spec. Export it, keep it in your own repository, review changes in a pull request.",
    code: `spec_version: 13
name: Finance Analyst
description: Spend, revenue and invoices, charted.
instructions: Answer questions about spend, revenue and invoices. Turn a spreadsheet into a chart and
  a short finding.
capabilities:
- id: knowledge
  approval: default
  enabled: true
- id: charts
  approval: default
  enabled: true
- id: artifacts
  approval: required
  enabled: true
budget:
  monthly_usd: 40.0
# … defaults, collections, skills, MCP servers and notifications`,
  },
  {
    name: "run.sh",
    language: "bash",
    caption: "Any published agent is an endpoint. A run returns its id, the output, the status, the tokens and the cost.",
    code: `curl -X POST "$BASE/api/v1/agents/$AGENT_ID/run" \\
  -H "Authorization: Bearer $AGENTICOS_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "How do I rotate a provider key?"}'

# A call without conversation_id opens a new conversation
# and returns its id; send it back to continue.`,
  },
];

const POINTS = [
  { art: "code_execution", title: "Code defines what exists", body: "Capabilities, connectors and catalog entries are typed Python on Pydantic AI. Configuration only reaches what code registered." },
  { art: "context", title: "Agents are files", body: "A spec exports to YAML for your repository, with versions, rollback and a diff that shows what changed." },
  { art: "subagents", title: "One runner behind every surface", body: "Chat, Slack, a routine and the API run the same agent, through the same budgets, approvals and recorded run." },
  { art: "web_fetch", title: "An API, a WebSocket and an MCP server", body: "Call agents from your own code, stream tokens, or drive the organization from Claude Code or Cursor." },
] as const;

const STACK: readonly ({ name: string } & ({ logo: LogoName } | { glyph: "pydantic" } | { text: string }))[] = [
  { name: "Pydantic AI", glyph: "pydantic" },
  { name: "Python", logo: "python" },
  { name: "FastAPI", logo: "fastapi" },
  { name: "PostgreSQL + pgvector", logo: "postgres" },
  { name: "Redis or Valkey", logo: "valkey" },
  { name: "Prefect workers", text: "workers" },
  { name: "Next.js", logo: "nextjs" },
  { name: "Docker Compose", logo: "docker" },
];

export function Engineers() {
  const [active, setActive] = useState(0);
  const file = FILES[active] ?? FILES[0];
  if (file === undefined) return null;

  return (
    <section id="engineers" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SplitHeading
          eyebrow="For engineers"
          title="Code defines,"
          muted="configuration composes."
          body={
            <>
              Business teams assemble agents in the browser. Engineers extend what there is to assemble, review it
              like any other code, and own every line.{" "}
              <a href={links.addCapability} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink">
                Add a capability <ArrowUpRight className="size-3.5" />
              </a>
            </>
          }
        />

        <Reveal delay={0.06} className="mt-12">
          {/* The code window stands in the night photograph, the way the product screens stand in the lake. */}
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#141026] p-4 shadow-[0_40px_90px_-50px_rgba(43,37,71,0.7)] ring-1 ring-black/5 sm:p-8 lg:p-12">
            <img
              src={asset("/images/night-1600.webp")}
              alt=""
              loading="lazy"
              className="pointer-events-none absolute inset-0 -z-10 size-full select-none object-cover object-[60%_70%]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#141026]/30 via-transparent to-[#141026]/60" />
            <div className="mx-auto max-w-[940px] rounded-[18px] bg-white/15 p-1.5 shadow-[0_30px_80px_-30px_rgba(10,6,30,0.9)] ring-1 ring-white/25 backdrop-blur-sm">
              <div className="overflow-hidden rounded-[13px] bg-[#141221]">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pl-4 pr-2">
                  <span className="flex shrink-0 gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                  </span>
                  <div role="tablist" aria-label="Example files" className="flex min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]">
                    {FILES.map((entry, index) => (
                      <button
                        key={entry.name}
                        type="button"
                        role="tab"
                        aria-selected={index === active}
                        onClick={() => setActive(index)}
                        className={`relative shrink-0 px-3.5 py-3 font-mono text-[12.5px] transition-colors ${
                          index === active ? "text-white" : "text-white/45 hover:text-white/80"
                        }`}
                      >
                        {entry.name}
                        {index === active ? (
                          <motion.span layoutId="code-tab" className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-blob" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
                        ) : null}
                      </button>
                    ))}
                  </div>
                  <CopyButton text={file.code} label={`Copy ${file.name}`} />
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="min-h-[470px] p-5 md:px-7 md:py-6">
                      <Code code={file.code} language={file.language} />
                    </div>
                    <p className="border-t border-white/[0.06] px-5 py-4 text-[14px] leading-relaxed text-white/65 md:px-7">{file.caption}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.06} className="h-full">
              <ArtCard art={point.art} title={point.title} body={point.body} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05} className="mt-5">
          <div className="overflow-hidden rounded-[22px] bg-card ring-1 ring-line">
            <p className="border-b border-line px-6 py-3.5 text-center font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">Built on</p>
            <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-8">
              {STACK.map((item) => (
                <li key={item.name} className="flex flex-col items-center justify-center gap-2.5 bg-card px-3 py-5 text-center">
                  {"logo" in item ? (
                    <ServiceIcon name={item.logo} className="size-7" />
                  ) : "glyph" in item ? (
                    <BrandIcon name={item.glyph} className="size-7" />
                  ) : (
                    <Workflow className="size-7 text-ink-soft" strokeWidth={1.6} />
                  )}
                  <span className="text-[13px] font-medium leading-snug text-ink">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Contributors />
      </div>
    </section>
  );
}
