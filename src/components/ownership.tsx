import { ArrowUpRight, Check, Cloud, HardDrive } from "lucide-react";

import { Reveal, SectionHeading } from "@/components/ui";
import { comparison, links, setups } from "@/content";
import { asset } from "@/lib/site";

const LAYERS = ["Process logic", "Data", "Models", "Codebase", "Infrastructure"] as const;

/** The comparison vstorm.co/agenticos makes: how many of the five layers stay yours. */
const LAYER_MODELS = [
  { name: "Full lock-in platform", own: 0 },
  { name: "Semi lock-in platform", own: 3 },
  { name: "AgenticOS", own: 5 },
] as const;

export function Ownership() {
  return (
    <section id="ownership" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="Sovereignty"
          title="Your servers, your models,"
          muted="your rules."
          body="AgenticOS is Apache-2.0 software you can inspect, modify and operate. AI teammates are arriving in every vendor’s cloud; this is the one you run yourself, on any model, with the source open."
        />

        <Reveal delay={0.05} className="mt-14">
          <div className="grid gap-4 md:grid-cols-3">
            {LAYER_MODELS.map((model) => (
              <div key={model.name} className={`spotlight rounded-[22px] p-6 ring-1 ${model.own === 5 ? "bg-violet text-white ring-violet" : "bg-card text-ink ring-line"}`}>
                <p className={`text-[13px] font-medium ${model.own === 5 ? "text-blob" : "text-muted"}`}>{model.name}</p>
                <p className="display-tight mt-2 text-[44px] font-medium leading-none">
                  {model.own}
                  <span className={model.own === 5 ? "text-white/45" : "text-faint"}> of 5</span>
                </p>
                <p className={`mt-1 text-[13.5px] ${model.own === 5 ? "text-white/70" : "text-muted"}`}>layers you own</p>
                <ul className="mt-5 space-y-2">
                  {LAYERS.map((layer, i) => {
                    const owned = i < model.own;
                    return (
                      <li key={layer} className={`flex items-center gap-2.5 text-[14px] ${owned ? "" : model.own === 5 ? "text-white/40" : "text-faint"}`}>
                        <span className={`inline-flex size-5 items-center justify-center rounded-full ${owned ? (model.own === 5 ? "bg-blob text-violet" : "bg-ok text-white") : "ring-1 ring-current"}`}>
                          {owned ? <Check className="size-3" strokeWidth={3} /> : null}
                        </span>
                        {model.own === 5 ? layer : owned ? "Yours" : "The vendor’s"}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[13px] text-faint">
            Process logic, data, models, codebase and infrastructure. Nothing in AgenticOS needs anyone’s permission to keep running.
          </p>
        </Reveal>

        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-5">
          {setups.map((setup, index) => {
            const night = index === 1;
            const Icon = night ? HardDrive : Cloud;
            return (
              <Reveal key={setup.title} delay={index * 0.08} className="h-full">
                {/* Day for models you rent under your own contract, night for a deployment that never leaves the building. */}
                <article className="relative isolate flex h-full min-h-[520px] flex-col justify-end overflow-hidden rounded-[28px] p-3 shadow-[0_40px_90px_-50px_rgba(43,37,71,0.6)] ring-1 ring-black/5 md:min-h-[560px] md:p-4">
                  <img
                    src={asset(night ? "/images/night-1600.webp" : "/images/meadow-bg-1600.webp")}
                    alt=""
                    loading="lazy"
                    className={`pointer-events-none absolute inset-0 -z-10 size-full select-none object-cover ${night ? "object-[40%_60%]" : "object-[30%_40%]"}`}
                  />
                  <span
                    className={`absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-medium backdrop-blur-md md:left-6 md:top-6 ${
                      night ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-white/75 text-ink ring-1 ring-white"
                    }`}
                  >
                    <Icon className="size-4" strokeWidth={1.9} /> Setup {index + 1}
                  </span>
                  <div className="rounded-[22px] bg-white/90 p-6 text-ink shadow-[0_30px_60px_-30px_rgba(43,37,71,0.5)] ring-1 ring-white backdrop-blur-xl md:p-7">
                    <h3 className="display-tight text-[clamp(1.5rem,2.2vw,1.9rem)] font-medium">{setup.title}</h3>
                    <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-muted">{setup.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {setup.tags.map((tag) => (
                        <li key={tag} className="rounded-full bg-paper px-3 py-1 text-[13px] font-medium text-ink-soft ring-1 ring-line">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.05} className="mt-5">
          <ul className="space-y-2 md:hidden">
            {comparison.map((row) => (
              <li key={row.name} className={`rounded-[18px] p-5 ring-1 ${row.own ? "bg-blob/30 ring-blob" : "bg-card ring-line"}`}>
                <p className="flex items-center gap-2 font-semibold text-ink">
                  {row.own ? <Check className="size-4 text-ok" strokeWidth={3} /> : null}
                  {row.name}
                </p>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[14px]">
                  <dt className="text-faint">Runs</dt>
                  <dd className={row.own ? "font-medium text-ink" : "text-muted"}>{row.where}</dd>
                  <dt className="text-faint">Source</dt>
                  <dd className={row.own ? "font-medium text-ink" : "text-muted"}>{row.source}</dd>
                  <dt className="text-faint">Models</dt>
                  <dd className={row.own ? "font-medium text-ink" : "text-muted"}>{row.models}</dd>
                </dl>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-hidden rounded-[24px] bg-card ring-1 ring-line md:block">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">AgenticOS compared with AI teammate products and n8n</caption>
              <thead>
                <tr className="border-b border-line text-[12.5px] uppercase tracking-[0.06em] text-faint">
                  <th scope="col" className="px-7 py-4 font-mono font-medium">Product</th>
                  <th scope="col" className="px-4 py-4 font-mono font-medium">Where it runs</th>
                  <th scope="col" className="px-4 py-4 font-mono font-medium">Source</th>
                  <th scope="col" className="px-7 py-4 font-mono font-medium">Models</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.name} className={`border-b border-line last:border-0 ${row.own ? "bg-blob/25" : ""}`}>
                    <th scope="row" className="px-7 py-4 font-semibold text-ink">
                      <span className="inline-flex items-center gap-2">
                        {row.own ? <Check className="size-4 text-ok" strokeWidth={3} /> : null}
                        {row.name}
                      </span>
                    </th>
                    <td className={`px-4 py-4 ${row.own ? "font-medium text-ink" : "text-muted"}`}>{row.where}</td>
                    <td className={`px-4 py-4 ${row.own ? "font-medium text-ink" : "text-muted"}`}>{row.source}</td>
                    <td className={`px-7 py-4 ${row.own ? "font-medium text-ink" : "text-muted"}`}>{row.models}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-[14px] text-muted">
            Each cell comes from the vendor’s own pages.{" "}
            <a href={links.comparison} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-ink-soft hover:text-ink">
              Every comparison, in detail <ArrowUpRight className="size-3.5" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
