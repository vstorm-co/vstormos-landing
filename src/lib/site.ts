/**
 * Where the site is served, read at build time.
 *
 * `NEXT_PUBLIC_SITE_URL` is the public origin used for canonical links, the
 * sitemap, Open Graph and structured data. `NEXT_PUBLIC_BASE_PATH` is set only
 * when the site lives under a sub-path, as a GitHub Pages project site does
 * (`/vstormos-landing`); it is empty on Vercel or a custom domain.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://agenticos.vstorm.co").replace(/\/$/, "");

/** The public URL of the page root, base path included. */
export const PAGE_URL = `${SITE_URL}${BASE_PATH}`;

/** A file from `public/`, under the base path. Plain `<img>` and `<a>` do not get it from Next. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** The same, for every candidate in a `srcSet`. */
export function assetSet(set: string): string {
  return set.replace(/(^|,\s*)\//g, `$1${BASE_PATH}/`);
}
