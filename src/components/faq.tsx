import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";

import { BrandIcon } from "@/components/brand-icon";
import { Reveal, SectionHeading } from "@/components/ui";
import { faq, links, vstorm } from "@/content";
import { asset } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-8">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="What teams ask"
            muted="before they start."
            body="Licence, local models, control, sign-in and what it takes to run."
          />
          <Reveal delay={0.08}>
            <div className="spotlight lift overflow-hidden rounded-[22px] bg-card ring-1 ring-line">
              <div className="flex items-center gap-4 border-b border-line bg-paper/60 px-6 py-5">
                <div className="flex shrink-0 -space-x-2.5">
                  {vstorm.call.hosts.map((host) => (
                    <img key={host.name} src={asset(host.photo)} alt={host.name} width={48} height={48} loading="lazy" className="size-12 shrink-0 rounded-full object-cover ring-[3px] ring-card" />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-[15.5px] font-semibold text-ink">Something we did not answer?</p>
                  <p className="text-[13.5px] text-muted">Ask the founders. {vstorm.call.length}.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-5">
                <a href={vstorm.contact} target="_blank" rel="noreferrer" className="shine group inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-[14px] font-medium text-white transition-colors hover:bg-violet">
                  Talk to Vstorm <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href={links.docs} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1 rounded-full px-4 text-[14px] font-medium text-ink-soft ring-1 ring-line-strong transition-colors hover:text-ink">
                  Documentation <ArrowUpRight className="size-3.5" />
                </a>
                <a href={links.discussions} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] font-medium text-ink-soft ring-1 ring-line-strong transition-colors hover:text-ink">
                  <BrandIcon name="github" mono className="size-4" /> Discussions
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.06} className="min-w-0">
          <div className="divide-y divide-line rounded-[22px] bg-card ring-1 ring-line">
            {faq.map((item) => (
              <details key={item.q} className="group px-6 md:px-7">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[16.5px] font-medium text-ink transition-colors hover:text-violet">
                  {item.q}
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-paper ring-1 ring-line transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <Plus className="size-3.5" strokeWidth={2.4} />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 pr-10 text-pretty text-[15px] leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
