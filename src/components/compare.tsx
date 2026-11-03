import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import type { ReactNode } from "react";

import type { GlanceRow, Question, Scene } from "@/compare";
import { CHECKED } from "@/compare";
import { ButtonLink, Eyebrow, Reveal } from "@/components/ui";
import { asset, assetSet } from "@/lib/site";

const SCENES = {
  meadow: {
    src: "/images/meadow-bg-1600.webp",
    set: "/images/meadow-bg-1600.webp 1600w, /images/meadow-bg-3200.webp 3200w",
    position: "object-[50%_85%]",
  },
  lake: {
    src: "/images/cta-1400.webp",
    set: "/images/cta-1400.webp 1400w, /images/cta-2800.webp 2800w",
    position: "object-[50%_70%]",
  },
} as const satisfies Record<
  Scene,
  { src: string; set: string; position: string }
>;

/**
 * The page's top band: a bright nature photograph with the copy on its sky.
 * A paper wash keeps the text readable where the sky is busiest; `id="top"` is
 * what the nav measures.
 */
export function CompareHero({
  scene,
  crumb,
  title,
  lead,
  actions,
  checkedDate = CHECKED,
}: {
  scene: Scene;
  crumb: ReactNode;
  title: ReactNode;
  lead: string;
  actions: ReactNode;
  checkedDate?: string;
}) {
  const image = SCENES[scene];
  return (
    <section id="top" className="relative isolate overflow-hidden bg-paper">
      <img
        src={asset(image.src)}
        srcSet={assetSet(image.set)}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        className={`pointer-events-none absolute inset-0 -z-20 size-full select-none object-cover ${image.position}`}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-paper/90 via-paper/55 to-paper/0"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-paper"
      />
      <div className="mx-auto max-w-[1240px] px-5 pb-40 pt-36 md:px-8 md:pb-56 md:pt-44">
        <div className="flex max-w-[780px] flex-col items-start gap-6">
          {crumb}
          <h1 className="display-tight text-balance text-[clamp(2.4rem,6vw,4.4rem)] font-medium text-ink">
            {title}
          </h1>
          <p className="max-w-[60ch] text-pretty text-[17.5px] leading-relaxed text-ink-soft">
            {lead}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">{actions}</div>
          <p className="rounded-full bg-white/70 px-3 py-1 text-[13px] text-muted ring-1 ring-white backdrop-blur-md">
            Vendor sources checked {checkedDate}. See the linked guide for its
            AgenticOS baseline and review scope.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Crumb({ children }: { children: ReactNode }) {
  return (
    <nav aria-label="Breadcrumb">
      <Eyebrow>{children}</Eyebrow>
    </nav>
  );
}

export function TryActions({ guide }: { guide: string }) {
  return (
    <>
      <ButtonLink href={asset("/#quickstart")} className="h-12 px-6">
        Get started free <ArrowRight className="size-4" />
      </ButtonLink>
      <ButtonLink href={guide} tone="ghost-dark" className="h-12 px-6">
        The full comparison <span aria-hidden>↗</span>
      </ButtonLink>
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  muted,
}: {
  eyebrow: string;
  title: string;
  muted?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display-tight max-w-[24ch] text-balance text-[clamp(1.9rem,3.8vw,3rem)] font-medium text-ink">
        {title}
        {muted ? (
          <>
            {" "}
            <span className="text-muted">{muted}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}

/** Both products row by row: a table on a wide screen, one card per area on a phone. */
export function GlanceTable({
  name,
  rows,
}: {
  name: string;
  rows: readonly GlanceRow[];
}) {
  return (
    <section
      id="glance"
      aria-labelledby="glance-heading"
      className="bg-paper px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div id="glance-heading">
            <SectionTitle
              eyebrow="At a glance"
              title={`${name} and AgenticOS,`}
              muted="side by side."
            />
          </div>
        </Reveal>
        <Reveal delay={0.05} className="mt-12">
          <ul className="grid gap-3 md:hidden">
            {rows.map((row) => (
              <li
                key={row.area}
                className="rounded-[18px] bg-card p-5 ring-1 ring-line"
              >
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
                  {row.area}
                </p>
                <dl className="mt-3 grid gap-3 text-[14.5px]">
                  <div>
                    <dt className="text-[13px] text-muted">{name}</dt>
                    <dd className="text-muted">{row.them}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-muted">AgenticOS</dt>
                    <dd className="font-medium text-ink">{row.us}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-hidden rounded-[24px] bg-card ring-1 ring-line md:block">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">
                {name} compared with AgenticOS
              </caption>
              <thead>
                <tr className="border-b border-line text-[12.5px] uppercase tracking-[0.06em] text-muted">
                  <th
                    scope="col"
                    className="w-[20%] px-7 py-4 font-mono font-medium"
                  >
                    Area
                  </th>
                  <th
                    scope="col"
                    className="w-[38%] px-4 py-4 font-mono font-medium"
                  >
                    {name}
                  </th>
                  <th
                    scope="col"
                    className="bg-blob/25 px-7 py-4 font-mono font-medium text-ink-soft"
                  >
                    AgenticOS
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.area}
                    className="border-b border-line align-top last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-7 py-4 font-semibold text-ink"
                    >
                      {row.area}
                    </th>
                    <td className="px-4 py-4 text-muted">{row.them}</td>
                    <td className="bg-blob/25 px-7 py-4 font-medium text-ink">
                      <span className="inline-flex gap-2">
                        <Check
                          className="mt-1 size-4 shrink-0 text-ok"
                          strokeWidth={3}
                        />
                        {row.us}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The honest half: when the other product fits better, and how the two work together. */
export function FitAndTogether({
  name,
  enough,
  together,
}: {
  name: string;
  enough: readonly string[];
  together: string;
}) {
  return (
    <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionTitle
            eyebrow="Choose the operating model"
            title={`Choose ${name}`}
            muted="when it fits the job."
          />
          <ul className="mt-8 space-y-4">
            {enough.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-t border-line pt-4 text-[15.5px] leading-relaxed text-ink-soft"
              >
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-faint"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.06}>
          <SectionTitle
            eyebrow="Choose AgenticOS"
            title="Run the platform."
            muted="Make it your own."
          />
          <ul className="mt-8 space-y-4">
            {[
              "Your team wants to operate the platform and choose its infrastructure and model providers.",
              "You want shared Projects, configurable specialist agents and explicit workflows in one workspace.",
              "You want open-source software you can inspect and extend, and accept responsibility for operating it.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 border-t border-line pt-4 text-[15.5px] leading-relaxed text-ink-soft"
              >
                <Check
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-violet"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="border-t border-line-strong pt-7 lg:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Before changing your setup
          </p>
          <p className="mt-3 max-w-[90ch] text-[15px] leading-relaxed text-ink-soft">
            {together}
          </p>
        </div>
      </div>
    </section>
  );
}

export function CompareFaq({ items }: { items: readonly Question[] }) {
  return (
    <section id="faq" className="bg-card px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <SectionTitle
            eyebrow="FAQ"
            title="What people ask"
            muted="before they switch."
          />
        </Reveal>
        <Reveal delay={0.06} className="min-w-0">
          <div className="divide-y divide-line rounded-[22px] bg-paper ring-1 ring-line">
            {items.map((item) => (
              <details key={item.q} className="group px-6 md:px-7">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[16.5px] font-medium text-ink transition-colors hover:text-violet">
                  {item.q}
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-card ring-1 ring-line transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <Plus className="size-3.5" strokeWidth={2.4} />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 pr-10 text-pretty text-[15px] leading-relaxed text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Every comparison on the site, the current one left out, and the full set in the docs. */
export function OtherComparisons({
  items,
  hub,
}: {
  items: readonly { slug: string; name: string }[];
  hub: string;
}) {
  return (
    <section className="bg-paper px-5 pb-24 pt-4 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px] border-t border-line-strong pt-10">
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
          Other comparisons
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {items.map((item) => (
            <li key={item.slug}>
              <a
                href={asset(`/compare/${item.slug}/`)}
                className="text-[17px] font-medium text-ink-soft underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
              >
                AgenticOS vs {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href={hub}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[17px] font-medium text-muted transition-colors hover:text-ink"
            >
              Every comparison in the docs <ArrowUpRight className="size-4" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
