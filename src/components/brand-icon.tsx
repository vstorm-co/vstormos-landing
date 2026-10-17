import type { SVGProps } from "react";

import { BRAND_GLYPHS, PROVIDER_GLYPHS, type BrandName, type Glyph } from "@/lib/brand-glyphs";
import { SERVICE_LOGOS, type ServiceName } from "@/lib/logos.generated";

interface MarkProps extends SVGProps<SVGSVGElement> {
  glyph: Glyph;
  /** In the surrounding text colour rather than the brand's. */
  mono?: boolean;
}

/** A brand mark from the console's generated glyph table, sized `1em`. Decorative: pair it with a label. */
export function Mark({ glyph, mono = false, ...props }: MarkProps) {
  return (
    <svg
      viewBox={glyph.viewBox}
      fill={mono || glyph.color === undefined ? "currentColor" : glyph.color}
      fillRule={glyph.fillRule}
      width="1em"
      height="1em"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {glyph.paths.map((path) => (
        <path key={path.d} d={path.d} fillOpacity={path.fillOpacity} />
      ))}
    </svg>
  );
}

/**
 * Microsoft's four squares. The shared glyph table draws Font Awesome's
 * single-colour mark for it, which reads as the Windows logo; the company mark
 * is four coloured squares, so in colour it is drawn as exactly that.
 */
function MicrosoftMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 23 23" width="1em" height="1em" aria-hidden xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
      <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
      <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
    </svg>
  );
}

export function BrandIcon({ name, mono = false, ...props }: Omit<MarkProps, "glyph"> & { name: BrandName }) {
  if (name === "microsoft" && !mono) return <MicrosoftMark {...props} />;
  return <Mark glyph={BRAND_GLYPHS[name]} mono={mono} {...props} />;
}

/** Marks the full-colour set draws only as a wordmark keep the console's current glyph. */
const GLYPH_ONLY = ["hubspot", "stripe"] as const satisfies readonly BrandName[];
export type LogoName = ServiceName | (typeof GLYPH_ONLY)[number];

/**
 * A service's mark in its own colours, as on light surfaces. The SVG bodies are
 * generated from the `logos` set (scripts/gen-logos.mjs), never typed in here.
 */
export function ServiceIcon({ name, className }: { name: LogoName; className?: string }) {
  if (name === "hubspot" || name === "stripe") return <BrandIcon name={name} className={className} />;
  const logo = SERVICE_LOGOS[name];
  return (
    <svg
      viewBox={logo.viewBox}
      width="1em"
      height="1em"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      dangerouslySetInnerHTML={{ __html: logo.body }}
    />
  );
}

/** The provider table is keyed by string; the page is rendered at build time, so a typo stops the build. */
export function providerGlyph(name: string): Glyph {
  const glyph = PROVIDER_GLYPHS[name];
  if (glyph === undefined) throw new Error(`No provider glyph named "${name}"`);
  return glyph;
}
