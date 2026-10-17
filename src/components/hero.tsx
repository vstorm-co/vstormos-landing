"use client";

import { ArrowRight, Check, LayoutGrid } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { BlobAgent } from "@/components/blob";
import { Mark, providerGlyph } from "@/components/brand-icon";
import { ButtonLink } from "@/components/ui";
import { heroModels, vstorm } from "@/content";
import { asset, assetSet } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The scene is two layers of one photograph: the whole valley behind the
 * product window, and the forest cut out of it in front. Both boxes share one
 * geometry (anchored to the bottom, never narrower than `--scene-min`) and one
 * intro animation, so the cut-out sits exactly on the trees it was cut from at
 * every width and every frame; animating only one layer shows both treelines.
 */
/** Fixed positions (in % of the scene) so the server and the browser draw the same fireflies. */
const FIREFLIES = [
  [8, 79, 0], [15, 86, 2.1], [23, 76, 4.3], [31, 90, 1.2], [38, 82, 3.6], [46, 88, 0.6],
  [54, 80, 2.8], [61, 91, 5.1], [69, 78, 1.7], [76, 87, 3.9], [84, 81, 0.9], [92, 89, 4.6],
] as const;

const SCENE =
  "pointer-events-none absolute bottom-0 left-1/2 aspect-[5504/4362] w-full min-w-[var(--scene-min)] -translate-x-1/2 select-none";

function ModelList({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center ${className}`}>
      {heroModels.map((model) => (
        <li key={model.name} className="flex shrink-0 items-center gap-2 text-white/85">
          <Mark glyph={providerGlyph(model.provider)} mono className="size-[18px]" />
          <span className="font-display text-[15px] font-medium tracking-[-0.01em]">{model.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number, y = 22) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE },
        };
  // On the way down the copy drifts up and fades, and the window climbs out of the forest faster than the page.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const copyOpacity = useTransform(scrollYProgress, [0, 0.35], [1, reduce ? 1 : 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.5], [0, reduce ? 0 : -60]);
  const windowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const settle = reduce
    ? {}
    : { initial: { scale: 1.05 }, animate: { scale: 1 }, transition: { duration: 2.6, ease: EASE } };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate overflow-hidden bg-violet [--scene-min:940px] md:[--scene-min:1100px]"
    >
      <motion.div className={SCENE} style={{ transformOrigin: "50% 100%" }} {...settle}>
        <img
          src={asset("/images/hero-bg-3200.webp")}
          srcSet={assetSet("/images/hero-bg-1600.webp 1600w, /images/hero-bg-3200.webp 3200w")}
          sizes="max(100vw, 1100px)"
          alt=""
          className="size-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col items-center px-5 pt-[156px] text-center md:px-8 md:pt-[184px]">
        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="flex flex-col items-center">
        <motion.a
          href="#product"
          {...rise(0.1, 12)}
          className="group inline-flex items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3 text-[13px] font-medium text-white/85 ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/[0.16]"
        >
          <span className="rounded-full bg-blob px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-violet">
            Open source
          </span>
          <span>
            Self-hosted · Apache-2.0<span className="hidden sm:inline"> · built on Pydantic AI</span>
          </span>
          <ArrowRight className="size-3.5 opacity-70 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <motion.h1
          {...rise(0.2)}
          className="display-tight mt-7 text-balance text-[clamp(2.6rem,7vw,5.75rem)] font-medium text-white [text-shadow:0_2px_30px_rgba(29,25,49,0.35)]"
        >
          Put AI to work <br className="hidden sm:block" />
          across your{" "}
          <span className="relative inline-block">
            company.
            {/* A hand-drawn stroke under the word the page is about, drawn once the headline lands. */}
            <svg viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-[2%] h-[0.22em] w-[94%] overflow-visible" aria-hidden>
              <motion.path
                d="M4 16 C 60 7, 150 4, 296 10"
                fill="none"
                stroke="#bbd1ff"
                strokeWidth="7"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.32)}
          className="mt-6 max-w-[54ch] text-pretty text-[clamp(1.02rem,1.5vw,1.2rem)] leading-relaxed text-white/80"
        >
          The open-source agent layer for shared agents, company knowledge and automation, on
          infrastructure you control.
        </motion.p>

        <motion.div {...rise(0.44)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={vstorm.contact} tone="white" className="h-12 px-6">
            Book a demo
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
          <ButtonLink href="#quickstart" tone="ghost-light" className="h-12 px-6">
            Get started free
          </ButtonLink>
        </motion.div>

        <motion.p {...rise(0.56, 8)} className="mt-5 text-[13.5px] font-medium text-white/65">
          Free to run yourself under Apache-2.0. Rolled out by{" "}
          <a href="#vstorm" className="text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white">
            Vstorm
          </a>{" "}
          when you want help.
        </motion.p>
        </motion.div>

        <motion.div style={{ y: windowY }} className="flex w-full justify-center">

        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 140 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1.6, delay: 0.5, ease: EASE },
              })}
          className="relative mt-16 w-full max-w-[1120px] md:mt-20"
        >
          {/* Three agents sitting on the window's top edge, one with something to say. */}
          <div aria-hidden className="absolute -top-[42px] right-[7%] z-10 flex items-end gap-1 md:-top-[54px]">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 2.1, ease: EASE }}
              className="absolute -top-10 right-0 hidden whitespace-nowrap rounded-[12px] rounded-br-[4px] bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] sm:block"
            >
              3 calls are waiting on you
            </motion.span>
            {/* BlobAgent is inline-flex itself, so the breakpoint switch lives on a wrapper. */}
            <span className="flex items-end gap-1 md:hidden">
              <BlobAgent color="#d8c84a" size={34} delay={0.2} />
              <BlobAgent color="#1fb58f" size={40} delay={1.1} />
              <BlobAgent color="#bbd1ff" size={32} delay={2.0} />
            </span>
            <span className="hidden items-end gap-1 md:flex">
              <BlobAgent color="#d8c84a" size={50} delay={0.2} />
              <BlobAgent color="#1fb58f" size={58} delay={1.1} />
              <BlobAgent color="#bbd1ff" size={46} delay={2.0} />
            </span>
          </div>

          {/* What the agents are doing right now, from the demo organization: an approval and a published app. */}
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
            className="absolute -left-[72px] top-[18%] z-10 hidden w-[300px] xl:block"
          >
            <div className="animate-[bob_6s_ease-in-out_infinite] rounded-[16px] bg-white/90 p-3.5 text-left shadow-[0_24px_60px_-20px_rgba(20,14,48,0.65)] ring-1 ring-white backdrop-blur-md">
              <div className="flex items-start gap-2.5">
                <BlobAgent color="#f5cdb6" size={26} hop={false} />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold leading-snug text-ink">Sales Researcher wants to send email</p>
                  <p className="truncate text-[11.5px] text-muted">ops@baltic-logistics.example</p>
                </div>
              </div>
              <div className="mt-3 flex gap-1.5">
                <span className="inline-flex h-7 items-center gap-1 rounded-full bg-ink px-3 text-[11.5px] font-medium text-white"><Check className="size-3" /> Approve</span>
                <span className="inline-flex h-7 items-center rounded-full px-3 text-[11.5px] font-medium text-ink-soft ring-1 ring-line">Reject</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.85, ease: EASE }}
            className="absolute -right-[56px] top-[46%] z-10 hidden w-[256px] xl:block"
          >
            <div className="animate-[bob_7s_ease-in-out_-2s_infinite] rounded-[16px] bg-white/90 p-3.5 text-left shadow-[0_24px_60px_-20px_rgba(20,14,48,0.65)] ring-1 ring-white backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex size-8 items-center justify-center rounded-[10px] bg-[#eef0ff] text-[#5b5bd6]"><LayoutGrid className="size-4" /></span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold leading-snug text-ink">Q3 2026 Board Dashboard</p>
                  <p className="text-[11.5px] text-muted">Published by Finance Analyst · v2</p>
                </div>
              </div>
              <div className="mt-3 flex items-end gap-1" aria-hidden>
                {/* Jul, Aug, Sep: revenue against costs, the same pairs the dashboard shows. */}
                {[46, 35, 51, 38, 58, 40].map((height, index) => (
                  <span key={index} className={`w-full rounded-t-[3px] ${index % 2 === 0 ? "bg-[#5b5bd6]" : "bg-[#a5b4fc]"}`} style={{ height }} />
                ))}
              </div>
            </div>
          </motion.div>

          <div aria-hidden className="pointer-events-none absolute -inset-x-10 -top-16 h-56 rounded-full bg-blob/30 blur-[70px]" />
          <div className="relative rounded-[16px] bg-white/15 p-1 shadow-[0_40px_120px_-30px_rgba(18,14,40,0.75),0_0_0_1px_rgba(255,255,255,0.08)_inset] ring-1 ring-white/25 backdrop-blur-sm md:rounded-[20px] md:p-2">
            {reduce ? null : (
              <span aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]">
                <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent" style={{ animation: "glint 1.8s cubic-bezier(0.22,1,0.36,1) 2.3s both" }} />
              </span>
            )}
            <picture>
              <source media="(max-width: 639px)" srcSet={assetSet("/screens/hero-mobile.webp")} width={2442} height={1700} />
              <img
                src={asset("/screens/highlight-dashboard.webp")}
                alt="The AgenticOS dashboard: a greeting, a carousel of what agents can do, this period’s runs, completion, decisions waiting and spend"
                width={2922}
                height={1758}
                className="w-full rounded-[12px] bg-white md:rounded-[14px]"
              />
            </picture>
          </div>
        </motion.div>

        </motion.div>

        {/* Room for the forest to climb over the window's lower edge, and for the model row under it. */}
        <div aria-hidden className="h-[calc(max(100vw,var(--scene-min))*0.11)] md:h-[calc(max(100vw,var(--scene-min))*0.085)]" />
      </div>

      {reduce ? null : (
        <div aria-hidden className={`${SCENE} z-[25]`}>
          {FIREFLIES.map(([left, top, delay]) => (
            <span
              key={`${left}-${top}`}
              className="absolute block"
              style={{ left: `${left}%`, top: `${top}%`, animation: `firefly-drift ${9 + (left % 5)}s ease-in-out ${-delay}s infinite` }}
            >
              <span
                className="block size-[5px] rounded-full bg-[#fff6c8] shadow-[0_0_10px_3px_rgba(255,236,150,0.65)]"
                style={{ animation: `firefly-glow ${3.2 + (top % 3)}s ease-in-out ${-delay * 1.3}s infinite` }}
              />
            </span>
          ))}
        </div>
      )}

      <motion.div className={`${SCENE} z-20`} style={{ transformOrigin: "50% 100%" }} {...settle}>
        <img
          src={asset("/images/hero-fg-3200.webp")}
          srcSet={assetSet("/images/hero-fg-1600.webp 1600w, /images/hero-fg-3200.webp 3200w")}
          sizes="max(100vw, 1100px)"
          alt=""
          className="size-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0c0b10]/80 to-transparent" />
      </motion.div>

      <motion.div
        {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 1.2 } })}
        className="absolute inset-x-0 bottom-0 z-30 pb-12 md:pb-14"
      >
        <p className="sr-only">Works with the models you already use:</p>
        {/* Phones: one moving line instead of three wrapped ones over the screenshot. */}
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] lg:hidden" aria-hidden>
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 pr-8">
            <ModelList className="gap-8" />
            <ModelList className="gap-8" />
          </div>
        </div>
        <div className="mx-auto hidden max-w-[1240px] items-center justify-between gap-8 px-8 lg:flex">
          <p aria-hidden className="max-w-[22ch] text-[13.5px] font-medium leading-snug text-white/65">
            Works with the models you already use
          </p>
          <ModelList className="gap-x-8 lg:gap-x-10" />
        </div>
      </motion.div>
    </section>
  );
}
