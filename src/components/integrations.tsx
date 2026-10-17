import { ArrowUpRight, Braces, Globe, MessageSquare, PanelBottom, Radio, type LucideIcon } from "lucide-react";

import { ServiceIcon, type LogoName } from "@/components/brand-icon";
import { McpClients } from "@/components/mcp-clients";
import { Reveal, SplitHeading } from "@/components/ui";
import { connections, links, logoCloud, surfaces } from "@/content";

const SURFACE_MARK: Record<(typeof surfaces)[number], { icon: LucideIcon } | { brand: LogoName }> = {
  "Web chat": { icon: MessageSquare },
  "Website widget": { icon: PanelBottom },
  "Hosted page": { icon: Globe },
  "HTTP API": { icon: Braces },
  WebSocket: { icon: Radio },
  Slack: { brand: "slack" },
  Mattermost: { brand: "mattermost" },
  Telegram: { brand: "telegram" },
};

function SurfaceMark({ surface }: { surface: (typeof surfaces)[number] }) {
  const mark = SURFACE_MARK[surface];
  if ("brand" in mark) return <ServiceIcon name={mark.brand} className="size-4" />;
  const Icon = mark.icon;
  return <Icon className="size-4 text-ink-soft" strokeWidth={1.9} />;
}

export function Integrations() {
  return (
    <section id="integrations" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <SplitHeading
          eyebrow="Integrations"
          title="Connect the apps"
          muted="your team already uses."
          body={
            <>
              An agent can read a Notion brief, search SharePoint documents or answer in Slack, under
              the same access rules and budget.{" "}
              <a href={links.mcp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink">
                How connections work <ArrowUpRight className="size-3.5" />
              </a>
            </>
          }
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {connections.map((item, index) => (
              <Reveal key={item.title} delay={(index % 2) * 0.07} className="h-full">
                <article className="spotlight lift flex h-full flex-col rounded-[22px] bg-card p-6 ring-1 ring-line">
                  <div className="flex gap-1.5">
                    {item.brands.map((brand) => (
                      <span
                        key={brand}
                        className="inline-flex size-9 items-center justify-center rounded-[11px] bg-paper ring-1 ring-line"
                      >
                        <ServiceIcon name={brand} className="size-[18px]" />
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-5 font-display text-[20px] font-medium tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col rounded-[22px] bg-card p-3 ring-1 ring-line">
              {/* 6×4: the count takes the middle 2×2, two hatched cells keep it reading as a map, not a list. */}
              <div className="grid flex-1 grid-flow-dense grid-cols-6 gap-2">
                <div className="beam col-span-2 col-start-3 row-span-2 row-start-2 flex flex-col items-center justify-center rounded-[16px] bg-gradient-to-b from-[#24203a] to-ink p-3 text-center text-white shadow-[0_24px_50px_-24px_rgba(43,37,71,0.7)]">
                  <p className="display-tight text-[clamp(1.5rem,3vw,2.5rem)] font-medium">4,700+</p>
                  <p className="mt-1 text-[12px] leading-snug text-white/70 md:text-[13px]">MCP servers in the gallery</p>
                </div>
                {logoCloud.map((brand, index) => (
                  <span
                    key={brand}
                    // Tiles take turns lighting up; the order is shuffled by a stride so it never reads as a wave.
                    style={{ animation: `tile-pop 13.5s ease-in-out ${-((index * 7) % logoCloud.length) * 0.75}s infinite` }}
                    className="flex aspect-square items-center justify-center rounded-[14px] bg-paper ring-1 ring-line motion-reduce:!animate-none"
                  >
                    <ServiceIcon name={brand} className="size-6 md:size-7" />
                  </span>
                ))}
                <span aria-hidden className="hatch aspect-square rounded-[14px] ring-1 ring-line" />
                <span aria-hidden className="hatch aspect-square rounded-[14px] ring-1 ring-line" />
              </div>
              <p className="px-2 pb-1 pt-3 text-[12.5px] text-faint">
                Registry listings are publisher metadata; each connection needs its own setup and review.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-5">
          <div className="rounded-[22px] bg-card p-6 ring-1 ring-line md:p-7">
            <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-display text-[20px] font-medium tracking-[-0.02em]">One agent, eight places it answers</h3>
              <p className="text-[15px] text-muted">Publish once: the same agent, rules and history everywhere.</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {surfaces.map((surface) => (
                <li
                  key={surface}
                  className="flex items-center gap-2 rounded-full bg-paper py-2 pl-3 pr-4 text-[13.5px] font-medium text-ink-soft ring-1 ring-line"
                >
                  <SurfaceMark surface={surface} />
                  {surface}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-5">
          <div className="grain relative grid gap-8 overflow-hidden rounded-[24px] bg-violet p-6 text-white md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
            <div className="min-w-0">
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-blob">AgenticOS is an MCP server too</p>
              <h3 className="display-tight mt-4 text-balance text-[clamp(1.6rem,2.6vw,2.3rem)] font-medium">
                Work in AgenticOS from Claude Code, Codex or Cursor
              </h3>
              <p className="mt-4 text-pretty text-[15.5px] leading-relaxed text-white/70">
                Add it with one command. Your coding assistant can list and run agents, read runs
                and what they cost, and search and fill knowledge bases, within what you allowed.
                Publishing an agent and touching a credential stay in the console.
              </p>
            </div>
            <div className="min-w-0">
              <McpClients />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
