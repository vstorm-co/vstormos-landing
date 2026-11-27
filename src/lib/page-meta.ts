import type { Metadata } from "next";

import { PAGE_URL } from "@/lib/site";

/** Metadata for a top-level subpage: its own title, canonical and social card. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: "AgenticOS",
      title,
      description,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
  };
}

/** The breadcrumb a search engine shows for a page one level below the home page. */
export function breadcrumb(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AgenticOS", item: `${PAGE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${PAGE_URL}/${path}` },
    ],
  };
}
