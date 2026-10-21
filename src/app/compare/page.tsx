import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { comparisons } from "@/compare";
import { CompareHero, Crumb, TryActions } from "@/components/compare";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/ui";
import { links } from "@/content";
import { asset } from "@/lib/site";

const description =
  "How AgenticOS compares with ChatGPT Enterprise, Claude Enterprise, Copilot Studio, n8n, Dify and Sauna: where each runs, which models, what controls and what it costs.";

export const metadata: Metadata = {
  title: "Compare AgenticOS with ChatGPT, Claude, Copilot Studio and more",
  description,
  alternates: { canonical: "compare/" },
  openGraph: {
    type: "website",
    url: "compare/",
    siteName: "AgenticOS",
    title: "Compare AgenticOS",
    description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Compare AgenticOS" }],
  },
};

export default function CompareIndex() {
  return (
    <>
      <Nav home={asset("/")} solid />
      <main id="content">
        <CompareHero
          scene="meadow"
          crumb={<Crumb>Compare</Crumb>}
          title={
            <>
              The agent layer you run yourself, <span className="text-muted">next to the products you already know.</span>
            </>
          }
          lead="Most products in this space are an assistant per employee or a builder inside a vendor's cloud. AgenticOS runs your company's agents on your infrastructure, on any model, with budgets, approvals and an audit log in the open-source product. Each comparison below says where the other product fits better, too."
          actions={<TryActions guide={links.comparison} />}
        />
        <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
          <ul className="mx-auto max-w-[1240px] divide-y divide-line border-y border-line">
            {comparisons.map((item, index) => (
              <li key={item.slug}>
                <Reveal delay={index * 0.04}>
                  <a href={asset(`/compare/${item.slug}/`)} className="group grid gap-2 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-10">
                    <span className="display-tight text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium text-ink transition-colors group-hover:text-violet">
                      AgenticOS vs {item.name}
                    </span>
                    <span className="text-pretty text-[15.5px] leading-relaxed text-muted">{item.description}</span>
                    <ArrowRight className="hidden size-5 text-faint transition-[transform,color] group-hover:translate-x-1 group-hover:text-ink md:block" />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-[1240px] text-[15px] text-muted">
            Coding agents, AI teammates and vendor platforms are compared in{" "}
            <a href={links.comparison} target="_blank" rel="noreferrer" className="font-medium text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
              the docs
            </a>
            , with every source linked.
          </p>
        </section>
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
