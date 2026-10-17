import { Trophy } from "lucide-react";
import type { ReactNode } from "react";

import { BrandIcon } from "@/components/brand-icon";
import { Reveal } from "@/components/ui";
import { vstorm } from "@/content";
import { asset } from "@/lib/site";

interface Item {
  mark: ReactNode;
  title: string;
  caption: string;
  href?: string;
}

function Wordmark({ children }: { children: ReactNode }) {
  return <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">{children}</span>;
}

/** Recognition as vstorm.co states it: one band, five equal cells, each a mark over two short lines. */
export function Credentials() {
  const { pydantic, aaif, awards } = vstorm.credentials;
  const items: readonly Item[] = [
    {
      mark: (
        <span className="inline-flex items-center gap-2">
          <BrandIcon name="pydantic" className="size-6" />
          <Wordmark>Pydantic</Wordmark>
        </span>
      ),
      title: "Official implementation partner",
      caption: "AgenticOS runs on Pydantic AI",
      href: pydantic.href,
    },
    {
      mark: <img src={asset("/logos/aaif.svg")} alt="Agentic AI Foundation" width={838} height={203} className="h-8 w-auto" />,
      title: aaif.title,
      caption: "The first agentic AI engineering company to join",
      href: aaif.href,
    },
    ...awards.map((award) => ({
      mark: (
        <span className="inline-flex items-center gap-2">
          <Trophy className="size-5 text-[#c08a12]" strokeWidth={1.9} />
          <Wordmark>{award.by.split(",")[0]}</Wordmark>
        </span>
      ),
      title: award.title,
      caption: award.by.split(", ")[1] ?? "",
      ...("href" in award ? { href: award.href } : {}),
    })),
  ];

  return (
    <Reveal className="mt-5">
      <div className="overflow-hidden rounded-[22px] bg-card ring-1 ring-line">
        <p className="border-b border-line px-6 py-3.5 text-center font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">
          Recognised by the industry
        </p>
        <ul className="grid grid-cols-2 gap-px bg-line md:grid-cols-5">
          {items.map((item, index) => {
            const body = (
              <>
                <span className="flex h-10 items-center justify-center">{item.mark}</span>
                <span className="mt-4 block text-[14px] font-semibold leading-snug text-ink">{item.title}</span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{item.caption}</span>
              </>
            );
            const cell = "flex h-full flex-col items-center px-4 py-6 text-center";
            return (
              <li key={item.title + index} className={`bg-card ${index === items.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className={`${cell} transition-colors hover:bg-paper/70`}>
                    {body}
                  </a>
                ) : (
                  <div className={cell}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
