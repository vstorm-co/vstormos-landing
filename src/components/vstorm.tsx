import { ArrowRight, ArrowUpRight, CalendarClock, Check } from "lucide-react";

import { ArtCard } from "@/components/art-card";
import { CountUp } from "@/components/count-up";
import { Credentials } from "@/components/credentials";
import { Reveal } from "@/components/ui";
import { vstorm } from "@/content";
import { asset, assetSet } from "@/lib/site";

/** The isometric scene for each delivery phase: the base, the team building on it, the runbooks handed over. */
const PHASE_ART = ["tool_search", "planning", "skills"] as const;

/** A storm over the range, like the meadow above it: one photograph, framed, with the offer standing in it. */
function Stage() {
  return (
    <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0b0912] shadow-[0_40px_90px_-50px_rgba(43,37,71,0.7)] ring-1 ring-black/5">
      <img
        src={asset("/images/storm-3200.webp")}
        srcSet={assetSet("/images/storm-1600.webp 1600w, /images/storm-3200.webp 3200w")}
        sizes="(min-width: 1240px) 1240px, 100vw"
        alt=""
        loading="lazy"
        className="pointer-events-none absolute inset-0 -z-10 size-full select-none object-cover object-[78%_50%]"
      />
      {/* The bolt in the photograph, struck now and then: the sky around it flashes, twice. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_80%_55%,rgba(222,210,255,0.55),transparent_65%)] mix-blend-screen motion-reduce:hidden"
        style={{ animation: "lightning 9s linear 2s infinite", opacity: 0 }}
      />
      <div aria-hidden className="rain pointer-events-none absolute inset-0 -z-10 opacity-[0.18] motion-reduce:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0912]/90 via-[#0b0912]/45 to-transparent" />

      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:p-14">
        <div className="text-white">
          <a href={vstorm.site} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 text-[14px] font-medium text-white/70 transition-colors hover:text-white">
            Built by
            <img src={asset("/vstorm-logo-light.svg")} alt="Vstorm" width={136} height={24} className="h-[20px] w-auto" />
          </a>
          <h2 className="display-tight mt-6 text-balance text-[clamp(2.3rem,5vw,4.1rem)] font-medium">
            Want it running in your company? <span className="text-white/50">We build it in.</span>
          </h2>
          <p className="mt-5 max-w-[48ch] text-pretty text-[17px] leading-relaxed text-white/75">
            The team that builds AgenticOS maps your processes, builds the agents inside your environment and hands
            the system over to your people, or keeps running it for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={vstorm.contact}
              target="_blank"
              rel="noreferrer"
              className="shine group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-ink shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] transition-colors hover:bg-blob"
            >
              Talk to Vstorm <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={vstorm.meeting}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white/10 px-5 text-[15px] font-medium text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <CalendarClock className="size-4" /> Pick a time
            </a>
          </div>
        </div>

        <div className="rounded-[22px] bg-white/90 p-6 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white backdrop-blur-xl md:p-7">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[17px] font-semibold tracking-[-0.01em]">Talk to the founders</p>
            <p className="text-[13px] text-muted">{vstorm.call.length}</p>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {vstorm.call.hosts.map((host) => (
              <li key={host.name} className="flex items-center gap-3 rounded-[16px] bg-paper p-3 ring-1 ring-line">
                <img src={asset(host.photo)} alt="" width={52} height={52} loading="lazy" className="size-[52px] shrink-0 rounded-full object-cover" />
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold leading-snug text-ink">{host.name}</span>
                  <span className="block text-[12.5px] text-muted">{host.role}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.08em] text-faint">You leave with</p>
          <ul className="mt-2.5 space-y-2.5">
            {vstorm.call.leaveWith.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                <Check className="mt-1 size-4 shrink-0 text-ok" strokeWidth={2.6} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-[14px] bg-paper px-4 py-3 text-[13.5px] leading-relaxed text-ink-soft ring-1 ring-line">
            The first meeting maps which processes AgenticOS should take on first, what already exists for them and
            what the first ninety days look like. You speak with the engineers who would do the work.
          </p>
          <p className="mt-4 text-[13px] text-muted">
            {vstorm.call.reply} Or write to{" "}
            <a href={`mailto:${vstorm.email}`} className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              {vstorm.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export function Vstorm() {
  return (
    <section id="vstorm" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <Stage />
        </Reveal>
        <Credentials />

        <div className="mt-20 md:mt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="display-tight text-[clamp(1.7rem,3vw,2.5rem)] font-medium text-ink">
              How we deliver it <span className="text-faint">in three phases.</span>
            </h3>
            <p className="max-w-[46ch] text-[15px] text-muted">
              A transformation manager runs the change alongside: the roadmap, adoption and upskilling. You pay for
              implementation and tailoring. No subscription, no seat count, no long-term commitment.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {vstorm.phases.map((phase, index) => (
              <Reveal key={phase.n} delay={index * 0.07} className="h-full">
                <ArtCard art={PHASE_ART[index] ?? "planning"} badge={`${phase.n} · ${phase.who}`} title={phase.title} body={phase.body}>
                  <ul className="mt-auto space-y-2 border-t border-line pt-4 [margin-top:max(1.25rem,auto)]">
                    {phase.gets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-ok" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </ArtCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="display-tight text-[clamp(1.7rem,3vw,2.5rem)] font-medium text-ink">
              Agents we have put in production <span className="text-faint">for clients.</span>
            </h3>
            <a href={vstorm.caseStudies} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[14.5px] font-medium text-ink-soft hover:text-ink">
              All case studies <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vstorm.cases.map((item, index) => (
              <Reveal key={item.client} delay={index * 0.06} className="h-full">
                <a href={item.href} target="_blank" rel="noreferrer" className="spotlight lift group flex h-full flex-col rounded-[22px] bg-card p-6 ring-1 ring-line">
                  <p className="text-[13px] font-medium text-muted">{item.client}</p>
                  <p className="mt-5 flex items-baseline gap-2 font-display tracking-[-0.03em]">
                    <span className="text-[19px] text-faint line-through decoration-line-strong">{item.from}</span>
                    <ArrowRight className="size-4 self-center text-faint" />
                    <span className="text-[40px] font-medium leading-none text-ink">{item.to}</span>
                  </p>
                  <p className="mt-1.5 text-[13.5px] text-muted">{item.unit}</p>
                  <p className="mt-5 flex flex-1 items-end justify-between gap-3 border-t border-line pt-4 text-[14px] font-medium leading-snug text-ink">
                    {item.what}
                    <ArrowUpRight className="size-4 shrink-0 text-faint transition-colors group-hover:text-ink" />
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] text-faint">
            Figures from each client’s case study on vstorm.co. These are Vstorm projects, not all of them built on AgenticOS.
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {vstorm.figures.map((figure, index) => (
            <Reveal
              key={figure.label}
              delay={index * 0.07}
              className={`flex flex-col-reverse items-center justify-end px-4 text-center ${index % 2 === 1 ? "border-l border-line-strong/70" : ""} ${index === 2 ? "md:border-l md:border-line-strong/70" : ""}`}
            >
              <dt className="mt-2 min-h-[2.6em] max-w-[22ch] text-[14px] leading-snug text-muted">{figure.label}</dt>
              <dd className="display-tight text-[clamp(2.4rem,4.4vw,3.6rem)] font-medium text-ink">
                {figure.value.endsWith("+") ? <CountUp value={figure.value} /> : figure.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
