import { AGENT_COLORS, Blob } from "@/components/blob";
import { CapabilityArt } from "@/components/capability-art";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/ui";
import { figures, pilots } from "@/content";

export function Statement() {
  return (
    <section className="relative z-40 -mt-7 rounded-t-[28px] bg-paper px-5 pb-24 pt-16 md:-mt-9 md:rounded-t-[36px] md:px-8 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="display-tight mx-auto max-w-[1080px] text-balance text-center text-[clamp(1.4rem,3.6vw,3rem)] font-medium leading-[1.14]">
            AgenticOS gives every team{" "}
            <span className="inline-flex translate-y-[0.06em] items-center align-middle" aria-hidden>
              {AGENT_COLORS.slice(0, 3).map((color, index) => (
                <span
                  key={color}
                  className="inline-flex size-[1.05em] items-center justify-center rounded-full bg-paper ring-[3px] ring-paper"
                  style={{ marginLeft: index === 0 ? 0 : "-0.3em", zIndex: 3 - index }}
                >
                  <Blob color={color} className="size-full" />
                </span>
              ))}
            </span>{" "}
            AI teammates: agents that work with files, run code, browse the web and use your
            company’s tools and knowledge.{" "}
            <span className="text-faint">Built in a browser, shared with colleagues, run on servers you own.</span>
          </p>
        </Reveal>

        <dl className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:gap-4 lg:grid-cols-4">
          {figures.map((figure, index) => (
            <Reveal key={figure.label} delay={index * 0.08} className="h-full">
              <div className="spotlight lift group flex h-full flex-col overflow-hidden rounded-[22px] bg-card ring-1 ring-line">
                <div className="overflow-hidden border-b border-line">
                  <CapabilityArt id={figure.art} className="transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col-reverse justify-end p-5 md:p-6">
                  <dt className="mt-1.5 text-pretty text-[13.5px] leading-snug text-muted md:text-[14.5px]">{figure.label}</dt>
                  <dd className="display-tight text-[clamp(2.2rem,4vw,3.25rem)] font-medium text-ink">
                    <CountUp value={figure.value} />
                  </dd>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1} className="mt-14 border-t border-line pt-8 md:mt-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_repeat(3,minmax(0,1fr))] md:gap-0">
            <div className="md:pr-8">
              <p className="text-[15px] font-semibold text-ink">In pilots today</p>
              <p className="mt-1.5 text-pretty text-[13.5px] leading-snug text-muted">Their names stay theirs until they choose to share them.</p>
            </div>
            {pilots.map((pilot) => (
              <div key={pilot.sector} className="md:border-l md:border-line md:px-8">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-faint">{pilot.sector}</p>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink">{pilot.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
