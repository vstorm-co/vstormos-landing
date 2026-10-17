import type { MetadataRoute } from "next";

import { PAGE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Everyone may crawl, answer engines included: the page is written to be quoted. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${PAGE_URL}/sitemap.xml`,
  };
}
