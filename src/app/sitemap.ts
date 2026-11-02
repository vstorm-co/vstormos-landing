import type { MetadataRoute } from "next";

import { comparisons } from "@/compare";
import { useCaseGuides } from "@/use-case-guides";
import { PAGE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Date of the meaningful content revision, not the time a host rebuilds the same pages.
const CONTENT_UPDATED = new Date("2026-11-02T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${PAGE_URL}/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${PAGE_URL}/llms.txt`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${PAGE_URL}/compare/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${PAGE_URL}/use-cases/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...useCaseGuides.map((item) => ({
      url: `${PAGE_URL}/use-cases/${item.slug}/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...comparisons.map((item) => ({
      url: `${PAGE_URL}/compare/${item.slug}/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
