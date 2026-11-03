import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { asset, PAGE_URL } from "@/lib/site";
import { findUseCase, useCaseGuides } from "@/use-case-guides";

export const dynamicParams = false;
export function generateStaticParams() {
  return useCaseGuides.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = findUseCase((await params).slug);
  if (!item) notFound();
  const title = item.metaTitle;
  const path = `use-cases/${item.slug}/`;
  return {
    title,
    description: item.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description: item.description,
      url: path,
      images: [{ url: item.image, width: 2400, height: 1500, alt: item.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: item.description,
      images: [item.image],
    },
  };
}
export default async function UseCasePage({ params }: Props) {
  const item = findUseCase((await params).slug);
  if (!item) notFound();
  const url = `${PAGE_URL}/use-cases/${item.slug}/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "AgenticOS",
                  item: `${PAGE_URL}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Use cases",
                  item: `${PAGE_URL}/use-cases/`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: item.title + " " + item.emphasis,
                  item: url,
                },
              ],
            },
            {
              "@type": "WebPage",
              "@id": url,
              url,
              name: item.title + " " + item.emphasis,
              description: item.description,
              dateModified: "2026-11-02",
              publisher: { "@id": "https://vstorm.co/#organization" },
            },
          ],
        }}
      />
      <Nav home={asset("/")} solid />
      <main id="content" className="bg-paper">
        <header
          id="top"
          className="relative isolate overflow-hidden bg-violet px-5 pb-14 pt-32 text-white md:px-8 md:pb-20 md:pt-40"
        >
          <img
            src={asset("/images/meadow-bg-1600.webp")}
            alt=""
            className="absolute inset-0 -z-10 size-full object-cover opacity-15 mix-blend-luminosity"
          />
          <div className="mx-auto max-w-[1240px]">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap gap-2 text-[13px] text-white/65"
            >
              <a
                href={asset("/use-cases/")}
                className="underline underline-offset-4"
              >
                Use cases
              </a>
              <span aria-hidden>/</span>
              <span>{item.label}</span>
            </nav>
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
              <h1 className="display-tight text-balance text-[clamp(2.5rem,5.7vw,4.5rem)] font-medium leading-[1.06]">
                {item.title}
                <br />
                <span className="text-blob">{item.emphasis}</span>
              </h1>
              <div>
                <p className="max-w-[54ch] text-[17px] leading-relaxed text-white/75">
                  {item.description}
                </p>
                <a
                  href={item.guide}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-medium text-violet"
                >
                  {item.guideLabel}
                  <ArrowUpRight aria-hidden className="size-4" />
                </a>
              </div>
            </div>
            <nav
              aria-label="On this page"
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-5 text-[13px] text-white/75"
            >
              <a href="#example" className="hover:text-white">
                See the example
              </a>
              <a href="#build" className="hover:text-white">
                Build your version
              </a>
              <a href="#questions" className="hover:text-white">
                Questions to settle
              </a>
            </nav>
          </div>
        </header>
        <figure
          id="example"
          className="mx-auto max-w-[1376px] scroll-mt-24 px-5 pt-12 md:px-8 md:pt-16"
        >
          <a
            href={asset(item.image)}
            aria-label="Open the full-size product screenshot"
            className="block overflow-hidden rounded-[22px] bg-violet focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
          >
            <img
              src={asset(item.image)}
              alt={item.alt}
              width={1600}
              height={1000}
              fetchPriority="high"
              className="h-auto w-full"
            />
          </a>
          <figcaption className="mx-auto mt-4 max-w-[100ch] text-[12.5px] leading-relaxed text-muted">
            {item.caption}
          </figcaption>
        </figure>
        <section
          aria-label="Input, result and check"
          className="mx-auto grid max-w-[1240px] gap-8 px-5 py-14 md:grid-cols-3 md:px-8 md:py-20"
        >
          {[
            { title: "Start with", body: item.input },
            { title: "Build toward", body: item.result },
            { title: "Check the result", body: item.check },
          ].map(({ title, body }, i) => (
            <div key={title} className="border-t border-line-strong pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                0{i + 1} / {title}
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                {body}
              </p>
            </div>
          ))}
        </section>
        <section
          id="build"
          className="scroll-mt-24 bg-card px-5 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
                From example to your data
              </p>
              <h2 className="display-tight mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] font-medium leading-tight">
                Build a version
                <br />
                <span className="text-muted">you can inspect.</span>
              </h2>
              <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-muted">
                AgenticOS runs on your infrastructure. Set up the model, tools
                and access for this task, then use the linked documentation for
                the exact configuration.
              </p>
            </div>
            <ol className="divide-y divide-line border-y border-line">
              {item.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2rem_1fr] gap-4 py-7"
                >
                  <span className="pt-1 font-mono text-[12px] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] font-medium leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          id="questions"
          className="mx-auto grid max-w-[1240px] scroll-mt-24 gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <h2 className="display-tight max-w-[18ch] text-[clamp(2rem,4vw,3rem)] font-medium leading-tight">
            Questions worth
            <br />
            <span className="text-muted">settling first.</span>
          </h2>
          <div className="divide-y divide-line border-y border-line">
            {item.questions.map(({ q, a }) => (
              <details key={q} className="group py-6">
                <summary className="cursor-pointer text-[17px] font-medium leading-snug marker:text-muted">
                  {q}
                </summary>
                <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-muted">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="bg-violet px-5 py-14 text-white md:px-8">
          <div className="mx-auto max-w-[1240px]">
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/60">
              Your next step
            </p>
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
              {[
                { label: item.guideLabel, href: item.guide },
                ...item.related,
                { label: "Explore another use case", href: "/use-cases/" },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href.startsWith("/") ? asset(href) : href}
                  className="inline-flex items-center gap-2 text-[15px] font-medium underline decoration-white/30 underline-offset-4"
                >
                  {label}
                  <ArrowRight aria-hidden className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
