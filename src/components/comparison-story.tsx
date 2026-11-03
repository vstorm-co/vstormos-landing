import {
  ArrowDown,
  ArrowRight,
  Check,
  Code2,
  Layers3,
  Server,
  Users,
} from "lucide-react";

import type { Comparison } from "@/compare";
import { CHECKED } from "@/compare";
import { comparisonStories } from "@/comparison-stories";
import { CopyButton } from "@/components/copy-button";
import { LogoMark } from "@/components/logo";
import { ButtonLink, Reveal } from "@/components/ui";
import { installCommand, links, vstorm } from "@/content";
import { asset } from "@/lib/site";

type ComparisonStory = { headline: string; emphasis: string; intro: string };
const storiesBySlug = new Map<string, ComparisonStory>(
  Object.entries(comparisonStories),
);

function storyFor(item: Comparison): ComparisonStory {
  return (
    storiesBySlug.get(item.slug) ?? {
      headline: "Your AI teammates.",
      emphasis: "Your own workspace.",
      intro: item.lead,
    }
  );
}

export function ProductComparisonHero({ item }: { item: Comparison }) {
  const story = storyFor(item);
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-violet text-white"
    >
      <img
        src={asset("/images/hero-bg-1600.webp")}
        alt=""
        width={1600}
        height={1268}
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-bottom opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-violet via-violet/90 to-violet/10"
      />
      <div className="mx-auto max-w-[1240px] px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-40">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.08em] text-white/70"
        >
          <a href={asset("/compare/")} className="hover:text-white">
            Compare
          </a>
          <span aria-hidden>/</span>
          <span aria-current="page">AgenticOS vs {item.name}</span>
        </nav>
        <div className="mt-9 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.1em] text-blob">
              <span className="size-1.5 rounded-full bg-blob" /> AgenticOS vs{" "}
              {item.name}
            </p>
            <h1 className="display-tight mt-5 text-balance text-[clamp(2.55rem,5.3vw,4.7rem)] font-medium leading-[1.06]">
              {story.headline}
              <br />
              <span className="text-blob">{story.emphasis}</span>
            </h1>
            <p className="mt-6 max-w-[48ch] text-pretty text-[17px] leading-relaxed text-white/75">
              {story.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={vstorm.contact}
                tone="white"
                className="h-12 px-6"
              >
                See it with your team{" "}
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="#examples"
                tone="ghost-light"
                className="h-12 px-5"
              >
                Explore the product <ArrowDown aria-hidden className="size-4" />
              </ButtonLink>
            </div>
            <p className="mt-6 text-[13px] text-white/60">
              Apache-2.0 · self-hosted · built on Pydantic AI
            </p>
          </div>
          <figure className="relative min-w-0">
            <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_40px_100px_-25px_rgba(0,0,0,0.45)] ring-[6px] ring-white/20 md:rounded-[22px]">
              <div className="flex items-center gap-2 border-b border-line bg-white px-4 py-3">
                <LogoMark className="size-5" />
                <span className="font-display text-xs font-semibold text-ink">
                  AgenticOS
                </span>
                <span className="ml-3 font-mono text-[13px] uppercase tracking-wider text-muted">
                  Your company workspace
                </span>
              </div>
              <img
                src={asset(item.screens[0].src)}
                width={item.screens[0].width}
                height={item.screens[0].height}
                alt={item.screens[0].alt}
                fetchPriority="high"
                className="block aspect-[8/5] w-full object-contain"
              />
            </div>
            <figcaption className="mt-4 text-[13px] text-white/65">
              Real AgenticOS interface · illustrative demo data
            </figcaption>
          </figure>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 border-t border-white/15 pt-7 sm:grid-cols-3 lg:mt-16">
          {[
            {
              Icon: Users,
              title: "Work together",
              text: "People and agents in shared Projects",
            },
            {
              Icon: Layers3,
              title: "Build around your work",
              text: "Knowledge, tools, workflows and apps",
            },
            {
              Icon: Server,
              title: "Choose how it runs",
              text: "Your infrastructure and model providers",
            },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-blob" />
              <div>
                <p className="text-[14px] font-medium">{title}</p>
                <p className="mt-1 text-[13px] text-white/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComparisonContext({ item }: { item: Comparison }) {
  return (
    <section
      aria-label="The choice"
      className="border-b border-line bg-white px-5 py-10 md:px-8 md:py-14"
    >
      <div className="mx-auto grid max-w-[1240px] gap-5 md:grid-cols-[0.65fr_1.35fr] md:gap-14">
        <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted">
          AgenticOS vs {item.name}
        </p>
        <div>
          <p className="max-w-[72ch] text-pretty text-[17px] leading-relaxed text-ink-soft">
            {item.lead}
          </p>
          <a
            href="#glance"
            className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-ink"
          >
            Jump to the side-by-side comparison{" "}
            <ArrowDown aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function ComparisonDetails({ item }: { item: Comparison }) {
  const screen = item.screens[1];
  return (
    <section
      id="differences"
      aria-labelledby="difference-title"
      className="overflow-hidden bg-violet px-5 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-blob">
            Make the platform fit the work
          </p>
          <h2
            id="difference-title"
            className="display-tight mt-5 max-w-[22ch] text-balance text-[clamp(2.1rem,4.3vw,3.5rem)] font-medium"
          >
            Build for your team.
            <br />
            <span className="text-white/70">Run it your way.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-7">
            {item.further.map((point, index) => (
              <div key={point.title} className="border-t border-white/20 pt-5">
                <p className="font-mono text-[13px] text-blob">0{index + 1}</p>
                <h3 className="mt-3 font-display text-xl font-medium">
                  {point.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  {point.body}
                </p>
              </div>
            ))}
            <div className="flex items-start gap-3 rounded-xl bg-white/5 p-5">
              <Code2 aria-hidden className="mt-1 size-5 shrink-0 text-blob" />
              <p className="text-[13px] leading-relaxed text-white/70">
                The software is Apache-2.0. Your team still owns hosting, model
                usage, updates and the policies it configures. Self-hosting
                alone does not mean zero outbound data.
              </p>
            </div>
          </div>
          <figure className="min-w-0">
            <div className="overflow-hidden rounded-[18px] bg-white ring-4 ring-white/10">
              <img
                src={asset(screen.src)}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 text-[13px] leading-relaxed text-white/60">
              {screen.caption} Product capture with illustrative data.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function ComparisonTrial({ item }: { item: Comparison }) {
  return (
    <section
      id="try"
      aria-labelledby="try-title"
      className="bg-paper px-5 py-20 md:px-8 md:py-28"
    >
      <div className="relative isolate mx-auto max-w-[1240px] overflow-hidden rounded-[28px] bg-violet p-7 text-white md:p-14">
        <img
          src={asset("/images/cta-1400.webp")}
          alt=""
          width={1400}
          height={933}
          loading="lazy"
          className="pointer-events-none absolute inset-0 -z-20 size-full object-cover opacity-35"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-violet via-violet/90 to-violet/30"
        />
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-blob">
              Make the choice on your own task
            </p>
            <h2
              id="try-title"
              className="display-tight mt-5 text-balance text-[clamp(2rem,4vw,3.3rem)] font-medium"
            >
              One useful agent.
              <br />
              <span className="text-blob">Start there.</span>
            </h2>
            <p className="mt-5 max-w-[45ch] text-[16px] leading-relaxed text-white/75">
              Bring a handbook question, a recurring report or a small research
              task. Build one agent and decide whether this is the workspace you
              want to run.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={vstorm.contact} tone="white">
                Book a working demo{" "}
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href={links.repo} tone="ghost-light">
                Explore the source <Code2 aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">
              Try it on your own infrastructure
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/65">
              Start with the installation guide and a model connection. No
              software licence fee; infrastructure and model usage are separate.
            </p>
            <div className="mt-5 rounded-2xl border border-white/20 bg-violet-deep/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[13px] uppercase tracking-wider text-white/50">
                  Terminal
                </span>
                <CopyButton
                  text={installCommand}
                  label="Copy the installation command"
                />
              </div>
              <code className="block break-all font-mono text-[13px] leading-relaxed text-white/90">
                {installCommand}
              </code>
            </div>
            <a
              href={links.install}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[13px] text-white/80 underline decoration-white/30 underline-offset-4"
            >
              Read the installation guide{" "}
              <ArrowRight aria-hidden className="size-3.5" />
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-5 text-[13px] leading-relaxed text-white/60">
          <p>
            <Check aria-hidden className="mr-1 inline size-3" /> Comparison by
            Vstorm, the team building AgenticOS. Vendor sources checked{" "}
            {item.checkedDate ?? CHECKED}.
          </p>
          <p className="mt-2">
            Documented capabilities, not a head-to-head benchmark.{" "}
            <a
              href={item.guide}
              target="_blank"
              rel="noreferrer"
              className="text-white/85 underline underline-offset-2"
            >
              Read the sources and comparison scope.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
