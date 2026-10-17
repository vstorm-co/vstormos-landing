"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

const TONES = {
  dark: "bg-white/10 text-white ring-white/15 hover:bg-white/20",
  light: "bg-card text-ink ring-line-strong hover:ring-ink/40",
} as const;

/** Copies `text`; says so when the browser refuses (insecure origin, permissions) instead of pretending. */
export function CopyButton({ text, label, tone = "dark" }: { text: string; label: string; tone?: keyof typeof TONES }) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(
          () => setState("copied"),
          () => setState("failed"),
        );
      }}
      aria-label={label}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium ring-1 transition-[background-color,box-shadow] ${TONES[tone]}`}
    >
      {state === "copied" ? <Check className={`size-3.5 ${tone === "dark" ? "text-[#6ee7b7]" : "text-ok"}`} /> : <Copy className="size-3.5" />}
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}</span>
    </button>
  );
}
