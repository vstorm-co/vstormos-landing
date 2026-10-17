"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Fades a block up once it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  const look =
    tone === "dark"
      ? "border-white/15 bg-white/[0.06] text-blob"
      : "border-line-strong/70 bg-card text-ink-soft shadow-[0_1px_0_rgba(22,20,31,0.04)]";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] ${look}`}
    >
      <span className={`size-1.5 rounded-full ${tone === "dark" ? "bg-blob" : "bg-violet"}`} />
      {children}
    </span>
  );
}

/** A section title whose second phrase is muted, the way the page speaks: claim, then qualification. */
export function SectionHeading({
  eyebrow,
  title,
  muted,
  body,
  tone = "light",
  align = "center",
}: {
  eyebrow: string;
  title: string;
  muted?: string;
  body?: ReactNode;
  tone?: "light" | "dark";
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`display-tight max-w-[24ch] text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium ${tone === "dark" ? "text-white" : "text-ink"}`}
      >
        {title}
        {muted ? (
          <>
            {" "}
            <span className={tone === "dark" ? "text-white/45" : "text-faint"}>{muted}</span>
          </>
        ) : null}
      </h2>
      {body ? (
        <p
          className={`max-w-[60ch] text-balance text-[17px] leading-relaxed ${tone === "dark" ? "text-white/65" : "text-muted"}`}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

/** The title on the left, the explanation on the right: breaks the run of centred sections. */
export function SplitHeading({
  eyebrow,
  title,
  muted,
  body,
}: {
  eyebrow: string;
  title: string;
  muted?: string;
  body: ReactNode;
}) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end md:gap-12">
      <div className="flex flex-col items-start gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display-tight text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium text-ink">
          {title}
          {muted ? (
            <>
              {" "}
              <span className="text-faint">{muted}</span>
            </>
          ) : null}
        </h2>
      </div>
      <div className="max-w-[48ch] text-pretty text-[17px] leading-relaxed text-muted md:pb-2">{body}</div>
    </Reveal>
  );
}

type ButtonTone = "ink" | "white" | "ghost-light" | "ghost-dark";

const BUTTON_TONES: Record<ButtonTone, string> = {
  ink: "bg-ink text-white hover:bg-violet shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_24px_-12px_rgba(22,20,31,0.6)]",
  white: "bg-white text-ink hover:bg-blob shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]",
  "ghost-light": "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/20",
  "ghost-dark": "bg-card text-ink ring-1 ring-line-strong hover:ring-ink/40",
};

export function ButtonLink({
  href,
  children,
  tone = "ink",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`shine group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium transition-[background-color,box-shadow,color] duration-300 ${BUTTON_TONES[tone]} ${className}`}
    >
      {children}
    </a>
  );
}
