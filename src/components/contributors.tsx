import { ArrowUpRight } from "lucide-react";

import { BrandIcon } from "@/components/brand-icon";
import { Reveal } from "@/components/ui";
import { links } from "@/content";
import { CONTRIBUTORS } from "@/lib/contributors.generated";
import { asset } from "@/lib/site";

/** Everyone who has shipped to the repository, by name, largest contribution first. */
export function Contributors() {
  return (
    <Reveal delay={0.05} className="mt-5">
      <div className="spotlight overflow-hidden rounded-[22px] bg-card ring-1 ring-line">
        <div className="flex flex-col gap-4 border-b border-line px-6 py-5 md:flex-row md:items-center md:justify-between md:px-7">
          <div>
            <p className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink">
              Built in the open by {CONTRIBUTORS.length} contributors
            </p>
            <p className="mt-1 text-[14px] text-muted">Every change reviewed in public, every release tagged on GitHub.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={links.repo} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[14px] font-medium text-white transition-colors hover:bg-violet">
              <BrandIcon name="github" mono className="size-4" /> View the repository
            </a>
            <a href={links.contributing} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1 rounded-full px-4 text-[14px] font-medium text-ink-soft ring-1 ring-line-strong transition-colors hover:text-ink">
              Contribute <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-px bg-line sm:grid-cols-5 lg:grid-cols-9">
          {CONTRIBUTORS.map((person) => (
            <li key={person.login} className="bg-card">
              <a href={person.url} target="_blank" rel="noreferrer" className="group flex h-full flex-col items-center px-3 py-5 text-center transition-colors hover:bg-paper/70">
                <img
                  src={asset(person.avatar)}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="size-14 rounded-full object-cover ring-1 ring-line transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span className="mt-3 line-clamp-2 min-h-[2.5em] text-balance text-[13px] font-semibold leading-tight text-ink">{person.name}</span>
                <span className="mt-0.5 w-full truncate text-[11.5px] text-muted">@{person.login}</span>
                <span className="mt-2 rounded-full bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-soft ring-1 ring-line">
                  {person.contributions.toLocaleString("en-US")} {person.contributions === 1 ? "commit" : "commits"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
