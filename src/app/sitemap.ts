import type { MetadataRoute } from "next";

import { PAGE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${PAGE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${PAGE_URL}/llms.txt`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];
}
