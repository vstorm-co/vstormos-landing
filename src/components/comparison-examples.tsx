"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { comparisonExamples } from "@/comparison-stories";
import { DOCS } from "@/content";
import { asset } from "@/lib/site";

/** A small, keyboard-accessible selector over real product captures. */
export function ComparisonExamples() {
  const [example, setExample] = useState<(typeof comparisonExamples)[number]>(
    comparisonExamples[0],
  );

  return (
    <section
      id="examples"
      aria-labelledby="examples-title"
      className="bg-paper px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-muted">
              What you could put to work
            </p>
            <h2
              id="examples-title"
              className="display-tight mt-5 max-w-[20ch] text-balance text-[clamp(2.1rem,4.3vw,3.5rem)] font-medium"
            >
              Pick a job.
              <br />
              <span className="text-muted">See it in action.</span>
            </h2>
          </div>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted">
            A useful agent should leave you with something you can use. Explore
            three examples from the AgenticOS product.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
          <div>
            <div
              role="group"
              aria-label="Choose a product example"
              className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1"
            >
              {comparisonExamples.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={example.id === entry.id}
                  aria-controls="example-detail"
                  onClick={() => setExample(entry)}
                  className={`group flex items-center gap-4 rounded-2xl p-4 text-left transition-colors lg:p-5 ${example.id === entry.id ? "bg-violet text-white" : "bg-transparent text-ink-soft hover:bg-white"}`}
                >
                  <span
                    className={`font-mono text-[13px] ${example.id === entry.id ? "text-blob" : "text-faint"}`}
                  >
                    0{index + 1}
                  </span>
                  <span className="flex-1 font-display text-[17px] font-medium">
                    {entry.label}
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="hidden size-4 shrink-0 sm:hidden lg:block"
                  />
                </button>
              ))}
            </div>
            <div id="example-detail" className="mt-8 lg:mt-10">
              <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted">
                {example.role}
              </p>
              <h3 className="display-tight mt-3 text-balance font-display text-[25px] font-medium">
                {example.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                {example.body}
              </p>
              <ol className="mt-5 space-y-3">
                {example.steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 text-[13px] text-ink-soft"
                  >
                    <span className="font-mono text-faint">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              <a
                href={`${DOCS}/${example.guide}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium underline decoration-line-strong underline-offset-4"
              >
                {example.linkLabel}
                <ArrowRight aria-hidden className="size-4" />
              </a>
            </div>
          </div>
          <figure className="min-w-0 self-start overflow-hidden rounded-[22px] bg-white shadow-[0_24px_70px_-28px_rgba(43,37,71,0.22)] ring-1 ring-line">
            <div
              className="flex items-center gap-1.5 border-b border-line px-4 py-3"
              aria-hidden
            >
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="ml-3 font-mono text-[13px] text-muted">
                agenticos / {example.role.toLowerCase()}
              </span>
            </div>
            <img
              key={example.screen.src}
              src={asset(example.screen.src)}
              width={example.screen.width}
              height={example.screen.height}
              alt={example.screen.alt}
              className="block aspect-[8/5] w-full object-contain"
              loading="lazy"
            />
            <figcaption className="border-t border-line px-5 py-4 text-[13px] leading-relaxed text-muted">
              AgenticOS product capture · illustrative demo data.{" "}
              {example.id === "app"
                ? "Calculator outputs depend on its assumptions; they are not measured customer savings."
                : "Inspect the output against your own task and sources."}{" "}
              <a
                href={asset(example.screen.src)}
                target="_blank"
                rel="noreferrer"
                className="ml-1 font-medium text-ink underline underline-offset-2"
              >
                View full-size screen ↗
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
