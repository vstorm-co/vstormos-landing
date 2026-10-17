import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BlobAgent } from "@/components/blob";
import { Reveal, SplitHeading } from "@/components/ui";
import { links, useCases } from "@/content";

export function UseCases() {
  return (
    <section id="use-cases" className="relative z-10 -mt-10 rounded-t-[32px] bg-paper px-5 py-24 md:-mt-14 md:rounded-t-[44px] md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <SplitHeading
          eyebrow="Use cases"
          title="Start with one task"
          muted="your team repeats."
          body="29 tutorials give you a sample input, the configuration, the exact prompt and a check you can run. Pick the one whose result somebody on the team can judge."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((group, index) => (
            <Reveal key={group.team} delay={(index % 3) * 0.07} className="h-full">
              <article className="spotlight lift group/card flex h-full flex-col rounded-[22px] bg-card p-6 ring-1 ring-line">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink">{group.team}</h3>
                    <p className="mt-0.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-faint">
                      {group.count} tutorials
                    </p>
                  </div>
                  <BlobAgent color={group.color} size={40} delay={index * 0.7} />
                </div>
                <ul className="mt-5 flex flex-1 flex-col divide-y divide-line border-t border-line">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link flex items-center justify-between gap-3 py-3.5"
                      >
                        <span>
                          <span className="block text-[14.5px] font-medium leading-snug text-ink group-hover/link:text-violet">{item.title}</span>
                          <span className="mt-0.5 block text-[13px] text-muted">{item.body}</span>
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-faint transition-[transform,color] group-hover/link:translate-x-0.5 group-hover/link:text-ink" />
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-center gap-2 text-center">
          <a
            href={links.useCases}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-card px-5 text-[14.5px] font-medium text-ink ring-1 ring-line-strong transition-colors hover:ring-ink/40"
          >
            All 29 tutorials <ArrowUpRight className="size-4" />
          </a>
          <p className="max-w-[60ch] text-[13px] text-faint">
            Starting points with reference runs by the maintainers, not customer case studies.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
