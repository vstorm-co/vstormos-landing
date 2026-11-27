import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Cta } from "@/components/cta";
import { Engineers } from "@/components/engineers";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { PageHero } from "@/components/page-hero";
import { Spotlights } from "@/components/spotlights";
import { ButtonLink, Reveal } from "@/components/ui";
import { links } from "@/content";
import { breadcrumb, pageMetadata } from "@/lib/page-meta";
import { asset } from "@/lib/site";

const PATH = "developers/";

export const metadata = pageMetadata(
  PATH,
  "For developers: Pydantic AI, HTTP API and MCP server",
  "Extend AgenticOS in typed Python on Pydantic AI: capabilities, YAML agent specs, an HTTP API, a WebSocket and an MCP server. Apache-2.0 and self-hosted.",
);

const start = [
  { label: "Architecture", body: "Routes, services and repositories, and how a run moves through them.", href: links.architecture },
  { label: "Add a capability", body: "A tool the model can call, its settings form and its scopes, in typed Python.", href: links.addCapability },
  { label: "HTTP API", body: "Run published agents, stream answers and read runs from your own code.", href: links.api },
  { label: "MCP server", body: "Drive agents, runs and knowledge from Claude Code, Codex or Cursor.", href: links.mcp },
  { label: "Contributing", body: "How changes are proposed, reviewed and released in the open.", href: links.contributing },
] as const;

export default function DevelopersPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(PATH, "Developers")] }} />
      <Spotlights />
      <Nav home={asset("/")} solid />
      <main id="content">
        <PageHero
          scene="meadow"
          crumb="Developers"
          title={
            <>
              An agent platform{" "}
              <span className="text-accent">your engineers can extend.</span>
            </>
          }
          lead="Capabilities are typed Python on Pydantic AI, agents are YAML specs in your own repository, and every published agent answers over an HTTP API, a WebSocket and an MCP server. Apache-2.0, built in the open."
          actions={
            <>
              <ButtonLink href={links.repo} className="h-12 px-6">
                View the repository <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={links.addCapability} tone="ghost-dark" className="h-12 px-6">
                Add a capability <span aria-hidden>↗</span>
              </ButtonLink>
            </>
          }
        />
        <Engineers />
        <section className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
          <Reveal className="mx-auto max-w-[1240px]">
            <h2 className="display-tight text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium text-ink">Start here</h2>
            <ul className="mt-8 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {start.map((item) => (
                <li key={item.label} className="border-b border-line">
                  <a href={item.href} target="_blank" rel="noreferrer" className="group block py-6">
                    <span className="flex items-center gap-1 font-display text-[19px] font-medium tracking-[-0.02em] text-ink group-hover:text-violet">
                      {item.label} <ArrowUpRight className="size-4" />
                    </span>
                    <span className="mt-2 block text-pretty text-[15px] leading-relaxed text-muted">{item.body}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
        <Cta />
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
