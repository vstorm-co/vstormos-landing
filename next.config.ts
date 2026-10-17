import type { NextConfig } from "next";

// A GitHub Pages project site is served from /<repository>; everywhere else the site sits at the root.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  // A static site in out/: any static host serves it, no Node server needed.
  output: "export",
  basePath: basePath || undefined,
  // /quickstart/ rather than /quickstart.html, which every static host resolves the same way.
  trailingSlash: true,
  images: { unoptimized: true },
  // A stray lockfile in the home directory would otherwise be taken for the workspace root.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
