import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { comparisons, findComparison } from "@/compare";
import { CompareFaq, CompareHero, Crumb, FitAndTogether, Further, GlanceTable, OtherComparisons, Screens, TryActions, TryBand } from "@/components/compare";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { links } from "@/content";
import { asset, PAGE_URL } from "@/lib/site";

// Only the comparisons in `@/compare` exist; anything else is the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((item) => ({ slug: item.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = findComparison((await params).slug);
  if (item === undefined) notFound();
  const path = `compare/${item.slug}/`;
  return {
    title: item.metaTitle,
    description: item.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: "AgenticOS",
      title: `AgenticOS vs ${item.name}`,
      description: item.description,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: `AgenticOS vs ${item.name}` }],
    },
    twitter: { card: "summary_large_image", title: `AgenticOS vs ${item.name}`, description: item.description },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const item = findComparison((await params).slug);
  if (item === undefined) notFound();
  const url = `${PAGE_URL}/compare/${item.slug}/`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AgenticOS", item: `${PAGE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Compare", item: `${PAGE_URL}/compare/` },
          { "@type": "ListItem", position: 3, name: `AgenticOS vs ${item.name}`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: item.faq.map((entry) => ({ "@type": "Question", name: entry.q, acceptedAnswer: { "@type": "Answer", text: entry.a } })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={data} />
      <Nav home={asset("/")} solid />
      <main id="content">
        <CompareHero
          scene={item.scene}
          crumb={
            <Crumb>
              <a href={asset("/compare/")} className="hover:text-ink">Compare</a>
              <span aria-hidden className="text-faint">/</span>
              <span aria-current="page">{item.name}</span>
            </Crumb>
          }
          title={`AgenticOS vs ${item.name}`}
          lead={item.lead}
          actions={<TryActions guide={item.guide} />}
        />
        <GlanceTable name={item.name} rows={item.glance} />
        <Further points={item.further} />
        <Screens screens={item.screens} />
        <FitAndTogether name={item.name} enough={item.enough} together={item.together} />
        <CompareFaq items={item.faq} />
        <TryBand guide={item.guide} />
        <OtherComparisons items={comparisons.filter((other) => other.slug !== item.slug)} hub={links.comparison} />
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
