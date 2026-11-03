import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { comparisons, findComparison } from "@/compare";
import {
  CompareFaq,
  FitAndTogether,
  GlanceTable,
  OtherComparisons,
} from "@/components/compare";
import { ComparisonExamples } from "@/components/comparison-examples";
import {
  ComparisonContext,
  ComparisonDetails,
  ComparisonTrial,
  ProductComparisonHero,
} from "@/components/comparison-story";
import { Recognition } from "@/components/recognition";
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
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: `AgenticOS vs ${item.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `AgenticOS vs ${item.name}`,
      description: item.description,
    },
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
          {
            "@type": "ListItem",
            position: 1,
            name: "AgenticOS",
            item: `${PAGE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Compare",
            item: `${PAGE_URL}/compare/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `AgenticOS vs ${item.name}`,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: item.faq.map((entry) => ({
          "@type": "Question",
          name: entry.q,
          acceptedAnswer: { "@type": "Answer", text: entry.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={data} />
      <Nav home={asset("/")} />
      <main id="content">
        <ProductComparisonHero item={item} />
        <Recognition />
        <ComparisonContext item={item} />
        <ComparisonExamples />
        <ComparisonDetails item={item} />
        <GlanceTable name={item.name} rows={item.glance} />
        <FitAndTogether
          name={item.name}
          enough={item.enough}
          together={item.together}
        />
        <CompareFaq items={item.faq} />
        <ComparisonTrial item={item} />
        <OtherComparisons
          items={comparisons.filter((other) => other.slug !== item.slug)}
          hub={links.comparison}
        />
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
