import type { CSSProperties } from "react";

import { CAPABILITY_ART, CAPABILITY_HUE } from "@/lib/capability-art";

/**
 * A capability's isometric diorama, as the console's Toolbox draws it. The SVG
 * strings are copied from the product repo (`capability-art/art.generated.ts`),
 * generated from its own design canvas, so nobody's input reaches this markup.
 */
export function CapabilityArt({ id, className = "" }: { id: string; className?: string }) {
  const svg = CAPABILITY_ART[id];
  if (svg === undefined) throw new Error(`No capability art named "${id}"`);
  const style = { "--h": CAPABILITY_HUE[id] ?? 265 } as CSSProperties;
  return (
    <div className={`cap-art ${className}`} style={style}>
      <div className="stage v-B aspect-video" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
