import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { asset, PAGE_URL } from "@/lib/site";
import { useCaseGuides } from "@/use-case-guides";

const description =
  "Explore AgenticOS use cases: company knowledge and LLM wikis, website shopping assistants, shared team Projects and AI workflows with Virtual Tables.";
export const metadata: Metadata = {
  title: "AI agent use cases for teams, knowledge and automation",
  description,
  alternates: { canonical: "use-cases/" },
  openGraph: {
    title: "Put AgenticOS to work",
    description,
    url: "use-cases/",
    images: [
      {
        url: "/screens/highlight-workflows.webp",
        width: 2400,
        height: 1500,
        alt: "AgenticOS workflow example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Put AgenticOS to work",
    description,
    images: ["/screens/highlight-workflows.webp"],
  },
};

export default function UseCaseIndex() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "AgenticOS use cases",
          itemListElement: useCaseGuides.map((guide, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: guide.title + " " + guide.emphasis,
            url: `${PAGE_URL}/use-cases/${guide.slug}/`,
          })),
        }}
      />
      <Nav home={asset("/")} solid />
      <main id="content" className="bg-paper">
        <header
          id="top"
          className="relative overflow-hidden bg-violet px-5 pb-20 pt-36 text-white md:px-8 md:pb-28 md:pt-44"
        >
          <img
            src={asset("/images/meadow-bg-1600.webp")}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-15 mix-blend-luminosity"
          />
          <div className="relative mx-auto max-w-[1240px]">
            <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-white/65">
              AgenticOS in practice
            </p>
            <h1 className="display-tight mt-6 max-w-[18ch] text-balance text-[clamp(2.7rem,6.5vw,5.5rem)] font-medium">
              What would you like
              <br />
              <span className="text-blob">your agents to do?</span>
            </h1>
            <p className="mt-7 max-w-[62ch] text-[18px] leading-relaxed text-white/75">
              Start with a result someone on the team can check. Explore a
              concrete example, see the product, then follow the setup guide for
              your own data.
            </p>
          </div>
        </header>
        <section
          aria-label="Use case guides"
          className="mx-auto grid max-w-[1240px] gap-x-12 gap-y-16 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24"
        >
          {useCaseGuides.map((guide, i) => (
            <article key={guide.slug}>
              <a
                href={asset(`/use-cases/${guide.slug}/`)}
                className="group block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-violet"
              >
                <div className="overflow-hidden rounded-[20px] bg-violet">
                  <img
                    src={asset(guide.image)}
                    alt={guide.alt}
                    width={1600}
                    height={1000}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="aspect-[8/5] w-full object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
                  />
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                  {guide.label}
                </p>
                <h2 className="display-tight mt-3 max-w-[24ch] text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-tight">
                  {guide.title}{" "}
                  <span className="text-muted">{guide.emphasis}</span>
                </h2>
                <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-muted">
                  {guide.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-ink">
                  Explore the example{" "}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </a>
            </article>
          ))}
        </section>
        <section className="border-t border-line bg-card px-5 py-12 md:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6">
            <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted">
              Choosing the platform comes after choosing the task. Compare
              operating models, access controls and the tools your team needs.
            </p>
            <a
              href={asset("/compare/")}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-white"
            >
              Compare platforms <ArrowRight aria-hidden className="size-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
