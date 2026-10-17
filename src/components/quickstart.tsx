import { ArrowUpRight } from "lucide-react";
import { Fragment } from "react";

import { ArtCard } from "@/components/art-card";
import { CopyButton } from "@/components/copy-button";
import { Reveal, SplitHeading } from "@/components/ui";
import { installCommand, links } from "@/content";

/** The URL may wrap only after a slash or a space, never inside a word, and the pipe stays with `bash`. */
function Breakable({ text }: { text: string }) {
  return (
    <>
      {text
        .replace("| bash", "| bash")
        .split(/(?<=[/ ])/)
        .map((part, index) => (
          <Fragment key={index}>
            {part}
            <wbr />
          </Fragment>
        ))}
    </>
  );
}

const STEPS = [
  {
    art: "sandbox",
    title: "Run one command",
    body: "On macOS or Linux, or inside WSL2 on Windows. It checks Docker first and changes nothing else on the machine.",
  },
  {
    art: "ask_user",
    title: "Answer four questions",
    body: "A model provider and its key, your login and an organization name. The key is stored encrypted in your own database.",
  },
  {
    art: "artifacts",
    title: "Open the console",
    body: "A working agent is already there. Ask it something, drop a PDF into a knowledge base, connect a tool.",
  },
] as const;

const FACTS = [
  { label: "Host", value: "4 vCPU · 8 GB RAM" },
  { label: "Needs", value: "Docker Compose" },
  { label: "Then open", value: "localhost:3000" },
] as const;

export function Quickstart() {
  return (
    <section id="quickstart" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <SplitHeading
          eyebrow="Quick start"
          title="Running in"
          muted="one command."
          body="The installer pulls the published images and starts a deployment with a working agent in it. Everything stays on the machine you run it on."
        />

        <Reveal delay={0.06} className="mt-12">
          <div className="rounded-[24px] bg-card p-2 shadow-[0_30px_60px_-40px_rgba(43,37,71,0.45)] ring-1 ring-line">
            <div className="flex flex-col gap-4 rounded-[18px] bg-paper p-5 md:flex-row md:items-center md:gap-6 md:p-6">
              <code className="min-w-0 flex-1 font-mono text-[14px] leading-relaxed text-ink md:text-[15px]">
                <span className="select-none text-faint">$ </span>
                <Breakable text={installCommand} />
              </code>
              <CopyButton text={installCommand} label="Copy the install command" tone="light" />
            </div>
            <dl className="grid px-2 pb-1 pt-3 sm:grid-cols-3">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-3 px-3 py-2 sm:block">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">{fact.label}</dt>
                  <dd className="text-[14px] font-medium text-ink sm:mt-0.5">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.07} className="h-full">
              <li className="h-full">
                <ArtCard art={step.art} badge={`Step ${index + 1}`} title={step.title} body={step.body} />
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[14.5px] font-medium">
          {[
            { label: "Installation guide", href: links.install },
            { label: "Your first agent", href: links.firstAgent },
            { label: "29 tutorials", href: links.useCases },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ink-soft hover:text-ink">
              {link.label} <ArrowUpRight className="size-3.5" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
