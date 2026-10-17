"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { vstorm } from "@/content";
import { asset } from "@/lib/site";

/**
 * A small "Book a demo" pill in the corner once the hero has scrolled away. It
 * steps aside where it would cover the product movie, and where the page
 * already asks the same thing: the pricing, the Vstorm section and the footer.
 */
export function FloatingCta() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const quiet = ["how", "pricing", "vstorm", "faq"];
    const update = () => {
      const hero = document.getElementById("top");
      const pastHero = hero !== null && hero.getBoundingClientRect().bottom < 0;
      const footer = document.querySelector("footer");
      const nearEnd = footer !== null && footer.getBoundingClientRect().top < window.innerHeight;
      const inQuiet = quiet.some((id) => {
        const box = document.getElementById(id)?.getBoundingClientRect();
        return box !== undefined && box.top < window.innerHeight * 0.6 && box.bottom > window.innerHeight * 0.4;
      });
      setShown(pastHero && !nearEnd && !inQuiet);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {shown ? (
        <motion.a
          href={vstorm.contact}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="shine group fixed bottom-5 right-5 z-40 hidden h-12 md:inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-1.5 pr-5 text-[14.5px] font-medium text-white shadow-[0_20px_40px_-14px_rgba(22,20,31,0.6)] ring-1 ring-white/10 transition-colors hover:bg-violet md:bottom-7 md:right-7"
        >
          <span className="flex -space-x-2">
            {vstorm.call.hosts.map((host) => (
              <img key={host.name} src={asset(host.photo)} alt="" width={36} height={36} className="size-9 rounded-full object-cover ring-2 ring-ink" />
            ))}
          </span>
          Book a demo
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
