import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { comparisons } from "@/compare";
import { CompareHero, Crumb, TryActions } from "@/components/compare";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/ui";
import { links } from "@/content";
import { asset } from "@/lib/site";

const description =
  "Compare AI agent platforms for team workspaces, workflow automation and personal assistants. Review deployment, licensing, controls and fit with AgenticOS.";

export const metadata: Metadata = {
  title: "Compare AgenticOS with ChatGPT, Claude, Copilot Studio and more",
  description,
  alternates: { canonical: "compare/" },
  openGraph: {
    type: "website",
    url: "compare/",
    siteName: "AgenticOS",
    title: "Compare AgenticOS",
    description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Compare AgenticOS",
      },
    ],
  },
};

const groups = [
  {
    id: "team-workspaces",
    title: "A workspace for the team",
    description:
      "Compare shared work, company knowledge, deployment and the people who will operate it.",
    slugs: ["chatgpt-enterprise", "claude-enterprise", "sauna", "grok-bot"],
  },
  {
    id: "agent-builders",
    title: "Agents and workflow automation",
    description:
      "Compare the canvas, native agents, integrations, model-spend policies and licences.",
    slugs: ["copilot-studio", "n8n", "dify"],
  },
  {
    id: "personal-assistants",
    title: "Personal and coding assistants",
    description:
      "Compare a personal task surface with a company platform. Check each product’s own intended scope.",
    slugs: ["openbot", "openai-dots", "muse", "claude-duet"],
  },
];

export default function CompareIndex() {
  return (
    <>
      <Nav home={asset("/")} solid />
      <main id="content">
        <CompareHero
          scene="meadow"
          crumb={<Crumb>Compare</Crumb>}
          title={
            <>
              Which AI platform fits the work?{" "}
              <span className="text-muted">Start with the job.</span>
            </>
          }
          lead="Compare the job, deployment, licence and operating controls. Some products offer managed assistants, others combine agents and workflows with self-hosting. AgenticOS provides a shared workspace on your infrastructure with configurable model providers. Each guide explains where the alternative may fit better."
          actions={<TryActions guide={links.comparison} />}
        />
        <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
          <nav
            aria-label="Comparison categories"
            className="mx-auto mb-14 flex max-w-[1240px] flex-wrap gap-3"
          >
            {groups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full bg-card px-5 py-3 text-[14px] font-medium text-ink ring-1 ring-line-strong transition-colors hover:bg-white"
              >
                {group.title}
              </a>
            ))}
          </nav>
          <div className="mx-auto max-w-[1240px] space-y-20">
            {groups.map((group) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-title`}
                className="scroll-mt-28"
              >
                <div className="mb-6 grid gap-4 md:grid-cols-[0.9fr_1.6fr] md:gap-10">
                  <h2
                    id={`${group.id}-title`}
                    className="font-display text-[clamp(1.7rem,3vw,2.3rem)] font-medium leading-tight"
                  >
                    {group.title}
                  </h2>
                  <p className="max-w-[60ch] text-[15px] leading-relaxed text-muted">
                    {group.description}
                  </p>
                </div>
                <ul className="divide-y divide-line border-y border-line">
                  {comparisons
                    .filter((item) => group.slugs.includes(item.slug))
                    .map((item, index) => (
                      <li key={item.slug}>
                        <Reveal delay={index * 0.04}>
                          <a
                            href={asset(`/compare/${item.slug}/`)}
                            className="group grid gap-3 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-10"
                          >
                            <span className="display-tight text-[clamp(1.4rem,2.6vw,2rem)] font-medium text-ink transition-colors group-hover:text-violet">
                              AgenticOS vs {item.name}
                            </span>
                            <span className="text-pretty text-[15px] leading-relaxed text-muted">
                              {item.description}
                            </span>
                            <ArrowRight
                              aria-hidden
                              className="hidden size-5 text-faint transition-[transform,color] group-hover:translate-x-1 group-hover:text-ink md:block"
                            />
                          </a>
                        </Reveal>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[1240px] text-[15px] text-muted">
            Coding agents, AI teammates and vendor platforms are compared in{" "}
            <a
              href={links.comparison}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink"
            >
              the docs
            </a>
            , with every source linked.
          </p>
        </section>
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
