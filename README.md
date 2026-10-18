# AgenticOS landing page

The marketing site for [AgenticOS](https://github.com/vstorm-co/agenticos), the open-source,
self-hosted agent layer built by [Vstorm](https://vstorm.co). One page, exported as static HTML,
deployable to Vercel, GitHub Pages or any static host.

- **Stack:** Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, Tailwind CSS 4,
  Motion, Lenis, lucide-react.
- **Output:** a static site in `out/`, about 12 MB, with no server, database or API keys.
- **Runtime calls:** one. The browser refreshes the GitHub star count from the public GitHub API;
  if that fails, the number recorded at build time stays.

## Quick start

Requirements: [bun](https://bun.sh) 1.3 or newer. Node 22 works for the scripts in `scripts/`.

```bash
bun install
bun run dev        # http://localhost:3100
```

| Command | What it does |
| --- | --- |
| `bun run dev` | Development server on port 3100, with hot reload |
| `bun run build` | Static export into `out/` |
| `bun run preview` | Serves `out/` on port 3100, to check the build |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run gen:logos` | Regenerates `src/lib/logos.generated.ts` from the CC0 `logos` icon set |
| `bun run gen:contributors` | Refreshes contributors, their avatars and the build-time star count from GitHub |

Stop `bun run dev` before `bun run build`: both use `.next/`, and a build under a running dev
server leaves the dev server serving stale routes.

## Configuration

Both variables are read at build time. Copy `.env.example` to `.env.local` for local builds.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://agenticos.vstorm.co` | The public origin, used for canonical links, `sitemap.xml`, `robots.txt`, Open Graph and structured data |
| `NEXT_PUBLIC_BASE_PATH` | empty | Set only when the site is served from a sub-path, such as a GitHub Pages project site (`/vstormos-landing`) |

## Deploy

### Vercel

1. Import the repository in Vercel. It detects Next.js; `vercel.json` sets the install and build
   commands to bun and adds security and cache headers.
2. In **Project → Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to the production
   domain (for example `https://agenticos.vstorm.co`). Leave `NEXT_PUBLIC_BASE_PATH` unset.
3. Deploy. Every push to the default branch redeploys, and pull requests get preview URLs.

### GitHub Pages

The workflow `.github/workflows/pages.yml` builds and publishes on every push to `main`.

1. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`, or run the workflow by hand from the **Actions** tab.
3. The workflow asks Pages for the base path and the origin, so:
   - a project site is served at `https://<owner>.github.io/<repository>/`, with every asset and
     link under that path;
   - with a custom domain configured in **Settings → Pages**, the base path is empty and the site
     is served from the domain root.
4. To force the canonical origin (for example when a custom domain is added later), set a
   repository variable `SITE_URL` under **Settings → Secrets and variables → Actions → Variables**.

`public/.nojekyll` stops Jekyll from hiding the `_next/` directory, should the site ever be
published from a branch instead of the workflow.

### Any other static host

Netlify, Cloudflare Pages, S3 with CloudFront, nginx: the build command is `bun run build`, the
output directory is `out`, and `NEXT_PUBLIC_SITE_URL` should be set to the public origin. The
export uses trailing slashes (`/404/`, `index.html` in each directory) and ships a `404.html`,
which most hosts serve for missing paths without configuration.

## SEO and GEO

What the build produces, and why:

- **Metadata** in `src/app/layout.tsx`: title, description, keywords, canonical URL, Open Graph
  and Twitter cards with `public/images/og.jpg` (1200×630), robots directives with large image
  previews, theme colour, and the web app manifest (`src/app/manifest.ts`).
- **Structured data** (JSON-LD, one `@graph`): `Organization` (Vstorm), `WebSite`,
  `SoftwareApplication` (licence, price 0, version, features, download and docs links) and
  `FAQPage`, built from the same `faq` entries the page shows, so the two never disagree.
- **Crawling:** `robots.txt` allows every crawler, answer engines included, and points at
  `sitemap.xml`. Both are generated from `NEXT_PUBLIC_SITE_URL`.
- **`public/llms.txt`:** a plain-text summary for language models and AI search, following the
  [llms.txt](https://llmstxt.org) convention: what AgenticOS is, the key facts and figures, and
  links to the docs, the source and the contact page.
- **Content in the HTML:** every section is server-rendered into `index.html`, about 3,700 words
  readable without JavaScript. There is one `h1`, sections use `h2`, and every image carries
  an `alt` (empty for decorative ones).
- **Facts over claims:** figures come from the AgenticOS README and documentation, and Vstorm's
  from vstorm.co. Answer engines quote pages that state checkable facts.

To verify after a deploy:

```bash
curl -s https://<your-domain>/robots.txt
curl -s https://<your-domain>/sitemap.xml
curl -s https://<your-domain>/llms.txt | head
```

Then test the URL with Google's [Rich Results Test](https://search.google.com/test/rich-results)
for the FAQ and software markup, and with an Open Graph preview tool for the share card. Submit
`sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Updating the content

Copy, figures and links live in **`src/content.ts`**. Components only lay them out.

| To change | Where |
| --- | --- |
| Product figures (29 capabilities, 28 providers, 4,700+ MCP servers, 8 surfaces) and `RELEASE` | `src/content.ts`. Keep them in step with the AgenticOS README. The MCP count is the gallery's number and nothing else |
| FAQ (page and structured data) | `faq` in `src/content.ts` |
| Pricing plans | `src/components/pricing.tsx` |
| Vstorm offer, founders, case studies, awards, the conference talk | `vstorm` in `src/content.ts` |
| The facts in `llms.txt` | `public/llms.txt`, by hand, after any change to the figures above |
| Contributors and star count | `bun run gen:contributors`, then commit the generated file and avatars |
| Service logos | Add a row to `LOGOS` in `scripts/gen-logos.mjs`, then `bun run gen:logos` |

**Time-bound:** the announcement bar in `src/components/nav.tsx` and the `talk` entry in
`src/content.ts` advertise AGNTCon + MCPCon on 23 October 2026. Remove both after the event.

### Images and links in code

Plain `<img>` and `<a>` do not receive the base path from Next.js. Pass every path under
`public/` through the helpers in `src/lib/site.ts`:

```tsx
<img src={asset("/images/cta-1400.webp")} srcSet={assetSet("/images/cta-1400.webp 1400w, /images/cta-2800.webp 2800w")} />
```

## Project structure

```
src/
  app/                layout and metadata, the page, robots, sitemap, manifest, icons, 404
  components/         one file per section, plus shared pieces (ui, blob, logo, brand-icon)
    movie/            the "How it works" walkthrough, drawn in code
  content.ts          copy, figures and links
  lib/
    site.ts           site URL, base path and the asset helpers
    *.generated.ts    generated tables: brand glyphs, logos, contributors
    capability-art.ts isometric illustrations from the AgenticOS console
public/
  images/             photography and the engraving (hero, meadow, night, storm, footer, OG card)
  screens/            screenshots of the AgenticOS console (Northwind Labs demo organization)
  people/, contributors/, logos/
  llms.txt, .nojekyll
scripts/              logo and contributor generators
.github/workflows/    GitHub Pages deploy
```

## Sources and licences

- **Fonts:** Bricolage Grotesque, Inter and Geist Mono, SIL Open Font License 1.1, vendored in
  `src/app/fonts/` (see `OFL.txt`). The build fetches nothing from a font CDN.
- **Service logos:** the [`logos`](https://github.com/gilbarbara/logos) set, CC0, through
  `@iconify-json/logos`. Brand glyphs in `src/lib/brand-glyphs.ts` come from the AgenticOS console
  (Simple Icons CC0, Font Awesome Free CC BY 4.0, @lobehub/icons MIT). The marks are their owners'
  trademarks; the footer states they identify connection options and imply no partnership.
- **Capability illustrations** and **console screenshots:** from the AgenticOS repository.
- **Photography and the engraving:** generated images, layered and recoloured for the page.
- **Founder photos:** published by Vstorm on vstorm.co.

`examples/` holds reference screenshots used while designing. It is not part of the site and
is ignored by git.
