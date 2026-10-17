"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { GithubStars } from "@/components/github-stars";
import { Logo } from "@/components/logo";
import { nav, vstorm } from "@/content";

const SECTION_IDS = nav.flatMap((item) => (item.href.startsWith("#") ? [item.href.slice(1)] : []));

/** Which in-page section the reader is in: the last one whose top has passed a line under the bar. */
function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const update = () => {
      const line = 140;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element !== null && element.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return active;
}

/** Transparent over the hero's sky; a paper bar once the page scrolls past it. */
export function Nav() {
  const { talk } = vstorm.credentials;
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const edge = hero === null ? window.innerHeight : hero.offsetHeight - 80;
      setSolid(window.scrollY > Math.min(edge, window.innerHeight * 0.9));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        light
          ? "bg-transparent"
          : "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      {/* The talk, while it is still ahead; the bar folds away once the page scrolls past the hero. */}
      <AnimatePresence initial={false}>
        {light ? (
          <motion.div
            key="announce"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-[#1d1931] text-white"
          >
            <p className="mx-auto flex max-w-[1240px] items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center text-[13px] md:px-8">
              <span className="hidden size-1.5 shrink-0 animate-pulse rounded-full bg-blob sm:inline-block" aria-hidden />
              <span className="text-white/80">
                <span className="font-medium text-white">Meet us at AGNTCon + MCPCon</span>
                <span className="hidden sm:inline"> · San Jose · Oct 23. We’re speaking, then hosting drinks.</span>
              </span>
              <a href={talk.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 font-medium text-blob underline decoration-blob/40 underline-offset-4 hover:decoration-blob">
                Our talk <ArrowRight className="size-3.5" />
              </a>
              <a href={talk.drinks} target="_blank" rel="noreferrer" className="hidden shrink-0 items-center gap-1 font-medium text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white md:inline-flex">
                Join the drinks
              </a>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <nav aria-label="Main" className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 md:h-[72px] md:px-8">
        <a href="#top" aria-label="AgenticOS home" onClick={() => setOpen(false)}>
          <Logo tone={light ? "light" : "dark"} />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const current = item.href === `#${active}`;
            const external = item.href.startsWith("http");
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={current ? "true" : undefined}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`relative rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                    light
                      ? "text-white/80 hover:text-white"
                      : current
                        ? "bg-ink/[0.06] text-ink"
                        : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  {external ? <span aria-hidden className="ml-0.5 text-[11px] opacity-50">↗</span> : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <GithubStars tone={light ? "light" : "dark"} />
          </div>
          <a
            href={vstorm.contact}
            target="_blank"
            rel="noreferrer"
            className={`shine hidden h-9 items-center gap-1.5 rounded-full px-4 text-[14px] font-medium transition-colors sm:inline-flex ${
              light ? "bg-white text-ink hover:bg-blob" : "bg-ink text-white hover:bg-violet"
            }`}
          >
            Book a demo
            <ArrowRight className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex size-10 items-center justify-center rounded-full transition-colors xl:hidden ${
              light ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/[0.05]"
            }`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper xl:hidden"
          >
            <div className="px-5 pb-6 pt-2">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="flex items-center justify-between border-b border-line py-4 text-[17px] font-medium text-ink"
                    >
                      {item.label}
                      <ArrowRight className="size-4 text-faint" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2">
                <GithubStars tone="dark" />
                <a
                  href={vstorm.contact}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[14px] font-medium text-white"
                >
                  Book a demo
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
