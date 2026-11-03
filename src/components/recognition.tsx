import { ArrowUpRight, Award } from "lucide-react";

export const AAIF_AWARD_SOURCE =
  "https://aaif.io/blog/winners-of-the-first-aaif-annual-technical-excellence-awards";
export const AAIF_AWARD_STORY =
  "https://vstorm.co/agentic-ai/open-agentic-ai-standards-aaif-award/";

/** Recognition of Vstorm's standards work, not a product certification. */
export function Recognition() {
  return (
    <aside
      aria-label="AAIF recognition of Vstorm"
      className="relative z-40 border-b border-line bg-paper px-5 py-7 md:px-8"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex items-start gap-4">
          <Award
            aria-hidden
            className="mt-1 size-8 shrink-0 text-violet"
            strokeWidth={1.5}
          />
          <div>
            <p className="text-[13px] text-muted">
              Built by Vstorm · recognized by the Agentic AI Foundation
            </p>
            <p className="mt-1 font-display text-[clamp(1.1rem,2vw,1.45rem)] font-medium text-ink">
              Open Agentic AI Innovation Award{" "}
              <span className="text-muted">2026</span>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-x-6 gap-y-2 pl-12 text-[13px] md:pl-0">
          <a
            href={AAIF_AWARD_SOURCE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline decoration-line-strong underline-offset-4"
          >
            AAIF announcement <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
          <a
            href={AAIF_AWARD_STORY}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted hover:text-ink"
          >
            The work behind it <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </aside>
  );
}
