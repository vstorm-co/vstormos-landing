import type { MetadataRoute } from "next";

import { comparisons } from "@/compare";
import { PAGE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${PAGE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${PAGE_URL}/llms.txt`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${PAGE_URL}/compare/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...comparisons.map((item) => ({
      url: `${PAGE_URL}/compare/${item.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
