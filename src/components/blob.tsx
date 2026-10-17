import type { CSSProperties } from "react";

const BODY =
  "M84.91 51.44C84.91 71.47 72.07 83.63 50.89 83.63C29.72 83.63 16.87 71.47 16.87 51.44C16.87 31.41 29.72 19.26 50.89 19.26C72.07 19.26 84.91 31.41 84.91 51.44Z";
const LEFT_EYE =
  "M47.24 45.43C47.13 52.95 46.91 53.47 43.77 53.42C40.64 53.37 40.43 52.85 40.54 45.34C40.65 37.82 40.87 37.3 44.01 37.35C47.14 37.4 47.35 37.92 47.24 45.43Z";
const RIGHT_EYE =
  "M65.15 45.55C65.37 54.87 65.14 55.52 61.7 55.6C58.26 55.68 58 55.04 57.79 45.72C57.57 36.41 57.79 35.76 61.24 35.68C64.68 35.59 64.93 36.24 65.15 45.55Z";

/**
 * An agent face the way the console draws one: the logo's blob with two pill
 * eyes, in an agent's own colour. Decorative.
 */
export function Blob({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="16 18 70 67" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d={BODY} />
      <g fill="#0b0f18">
        <path d={LEFT_EYE} />
        <path d={RIGHT_EYE} />
      </g>
    </svg>
  );
}

/**
 * A blob that is alive: it hops now and then (squash and stretch, a shadow that
 * shrinks as it rises), blinks and glances around. `delay` desynchronises a
 * row of them; `hop={false}` keeps it on the ground for a busy spot. The
 * keyframes live in globals.css and stop under reduced motion.
 */
export function BlobAgent({
  color,
  size = 56,
  delay = 0,
  hop = true,
  className = "",
}: {
  color: string;
  size?: number;
  delay?: number;
  hop?: boolean;
  className?: string;
}) {
  const timing = (name: string, seconds: number, extra = 0): CSSProperties => ({
    animation: `${name} ${seconds}s ease-in-out ${-(delay + extra)}s infinite`,
  });
  return (
    <span
      aria-hidden
      className={`relative inline-flex flex-col items-center ${className}`}
      style={{ width: size, height: size * 1.12 }}
    >
      <span
        className="block origin-bottom"
        style={{ width: size, height: size, ...(hop ? timing("blob-hop", 3.4) : {}) }}
      >
        <svg viewBox="16 18 70 67" className="size-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
          <path fill={color} d={BODY} />
          <path fill="#ffffff" fillOpacity={0.28} d="M30 34c5-8 14-11 21-11-9 3-15 8-18 16z" />
          <g style={{ transformBox: "fill-box", transformOrigin: "center", ...timing("blob-look", 7.5, 1.3) }}>
            <g fill="#0b0f18" style={{ transformBox: "fill-box", transformOrigin: "center", ...timing("blob-blink", 5.2, 0.7) }}>
              <path d={LEFT_EYE} />
              <path d={RIGHT_EYE} />
            </g>
          </g>
        </svg>
      </span>
      <span
        className="mt-[-6%] block h-[8%] w-[62%] rounded-[50%] bg-ink"
        style={hop ? timing("blob-shadow", 3.4) : { opacity: 0.2 }}
      />
    </span>
  );
}

/** The colours the demo organization's agents wear in the screenshots. */
export const AGENT_COLORS = ["#bbd1ff", "#1fb58f", "#d8c84a", "#f2b8c6", "#9b8cf0"] as const;
