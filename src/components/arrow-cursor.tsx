"use client";

import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, summary, [role='tab'], [role='radio'], label";

/**
 * The visitor's pointer drawn the way the product movie draws Ana's: a dark
 * arrow with a white edge that ripples on a click. Only for a mouse, and not
 * for readers who ask for reduced motion; everyone else keeps the native cursor.
 */
export function ArrowCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [overControl, setOverControl] = useState(false);
  const [press, setPress] = useState(0);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("arrow-cursor");
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setOverControl(event.target instanceof Element && event.target.closest(INTERACTIVE) !== null);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPress((count) => count + 1);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      root.classList.remove("arrow-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <AnimatePresence>
          {press > 0 ? (
            <motion.span
              key={press}
              className="absolute -left-4 -top-4 size-8 rounded-full border-2 border-[#5b5bd6]"
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ) : null}
        </AnimatePresence>
        <motion.svg
          key={`press-${press}`}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          className="-ml-[3px] -mt-[2px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
          initial={{ scale: 0.82 }}
          animate={{ scale: overControl ? 0.92 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M4 2.5 20 11l-7 1.8-3.4 6.7Z" fill="#18181b" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
