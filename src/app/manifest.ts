import type { MetadataRoute } from "next";

import { asset } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AgenticOS",
    short_name: "AgenticOS",
    description: "Open-source AI teammates for your company. The self-hosted agent layer.",
    start_url: asset("/"),
    display: "browser",
    background_color: "#f6f5f1",
    theme_color: "#2b2547",
    icons: [
      { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
