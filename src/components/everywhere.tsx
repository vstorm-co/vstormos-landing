"use client";

import { ArrowUpRight, BatteryFull, Globe, Laptop, Signal, Smartphone, Wifi } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ServiceIcon, type LogoName } from "@/components/brand-icon";
import { SectionHeading } from "@/components/ui";
import { links } from "@/content";
import { asset } from "@/lib/site";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const surfaces = [
  { icon: Globe, label: "In your browser", title: "Send a link. Bring the team.", body: "Open your deployment, sign in and work together. Shared agents, Projects, knowledge and approvals, without installing a client.", action: "Deploy your server", href: links.deploy, platforms: [{ name: "Chrome", icon: "chrome" }, { name: "Safari", icon: "safari" }, { name: "Firefox", icon: "firefox" }] },
  { icon: Laptop, label: "On your computer", title: "Let your agents work locally.", body: "Quick Ask, approved local files and computer access. Choose your own Claude Code or Codex in chat, with optional local skills and project instructions.", action: "Choose your desktop installer", href: "#desktop-install", platforms: [{ name: "macOS", icon: "apple" }, { name: "Windows", icon: "windows" }, { name: "Linux", icon: "linux" }] },
  { icon: Smartphone, label: "On your phone", title: "Keep work moving, wherever you are.", body: "Use the mobile browser or add the console to your home screen today. Native iOS and Android are available to build from source; public store downloads are not available yet.", action: "Mobile setup and availability", href: links.mobile, platforms: [{ name: "iOS", icon: "apple" }, { name: "Android", icon: "android" }] },
] as const satisfies ReadonlyArray<{
  icon: typeof Globe; label: string; title: string; body: string; action: string; href: string;
  platforms: ReadonlyArray<{ name: string; icon: LogoName }>;
}>;

const keyboardRows = [
  ["esc", "◦", "◦", "◦", "◦", "◦", "◦", "◦", "◦", "◦", "◦", "◦", "◦", "⏻"],
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "−", "+", "delete"],
  ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "return"],
  ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift"],
] as const;

export function Everywhere() {
  const reduced = useReducedMotion();
  const scene = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start end", "start 0.12"],
  });
  // One shared timeline keeps the hinge, camera and phone in the same movement.
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 36, mass: 0.6 });
  const lidAngle = useTransform(progress, [0.08, 0.82], [78, 0]);
  const cameraAngle = useTransform(progress, [0.08, 0.9], [-12, 0]);
  const cameraScale = useTransform(progress, [0.08, 0.9], [0.88, 1]);
  const cameraY = useTransform(progress, [0.08, 0.9], [65, 0]);
  const screenShade = useTransform(progress, [0.15, 0.72], [0.85, 0]);
  const phoneY = useTransform(progress, [0.35, 0.95], [120, 0]);
  const phoneAngle = useTransform(progress, [0.35, 0.95], [9, -3]);
  const phoneOpacity = useTransform(progress, [0.35, 0.65], [0, 1]);
  return (
    <section id="everywhere" aria-label="Browser, desktop and mobile" className="everywhere-section px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading eyebrow="One workspace, wherever you work" title="Your server." muted="Your choice of screen." body="The browser, desktop app and phone connect to the same deployment. Keep your agents and company knowledge together, with the same account and access controls." />
        <figure ref={scene} className="device-scene mt-12" aria-label="AgenticOS console presented in laptop and phone frames">
          <div className="device-scene-landscape" style={{ backgroundImage: `linear-gradient(180deg, var(--color-paper), transparent 28%, transparent 70%, var(--color-paper)), url(${asset("/images/hero-bg-1600.webp")})`, backgroundPosition: "center", backgroundSize: "cover" }} aria-hidden="true" />
          <div className="device-orbit device-orbit-one" aria-hidden="true" />
          <div className="device-orbit device-orbit-two" aria-hidden="true" />
          <motion.div className="device-laptop" style={reduced ? undefined : { y: cameraY, rotateY: cameraAngle, scale: cameraScale }}>
            <motion.div className="device-laptop-lid" style={reduced ? undefined : { rotateX: lidAngle }}>
              <div className="device-lid-depth" aria-hidden />
              <div className="device-camera" aria-hidden />
              <div className="device-screen-power">
              <div className="device-desktop-toolbar" aria-hidden><span /><span /><span /><p>AgenticOS · Company workspace</p></div>
              <img src={asset("/screens/devices/desktop-chat.webp")} width={1440} height={900} alt="Full AgenticOS chat with the prepared Revenue Pulse sales review and console navigation" loading="lazy" className="device-desktop-screen" />
              </div>
              <motion.div aria-hidden className="device-screen-shade" style={reduced ? undefined : { opacity: screenShade }} />
            </motion.div>
            <div className="device-laptop-base" aria-hidden>
              <div className="device-keyboard-deck">
                <div className="device-keyboard">
                  {keyboardRows.map((row, index) => <div className="device-keyboard-row" key={index}>{row.map((key, keyIndex) => <span key={keyIndex} className={key.length > 1 ? "device-key-wide" : undefined}>{key}</span>)}</div>)}
                  <div className="device-keyboard-row"><span>fn</span><span>ctrl</span><span>⌥</span><span>⌘</span><span className="device-key-space" /><span>⌘</span><span>⌥</span><span>◀</span><span>▲</span><span>▶</span></div>
                </div>
                <div className="device-trackpad" />
              </div>
              <div className="device-front-edge"><span /></div>
            </div>
          </motion.div>
          <motion.div className="device-phone" style={reduced ? undefined : { y: phoneY, rotateZ: phoneAngle, opacity: phoneOpacity }}>
            <div className="device-phone-button device-phone-button-volume" aria-hidden />
            <div className="device-phone-button device-phone-button-power" aria-hidden />
            <div className="device-phone-glass">
            <div className="device-phone-island" aria-hidden />
            <div className="device-phone-status" aria-hidden><span>9:41</span><span className="device-phone-signals"><Signal /><Wifi /><BatteryFull /></span></div>
            <img src={asset("/screens/devices/mobile-chat.jpg")} width={390} height={844} alt="AgenticOS mobile chat comparing demo campaign costs and recommending the most efficient channel" loading="lazy" className="device-phone-screen" />
            <div className="device-phone-home" aria-hidden />
            </div>
          </motion.div>
          
        </figure>
        <div className="mt-16 grid gap-9 md:grid-cols-3 md:gap-10">
          {surfaces.map(({ icon: Icon, label, title, body, action, href, platforms }) => (
            <article key={label} className="border-t border-line-strong pt-6">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted"><Icon size={16} aria-hidden />{label}</p>
              <ul className="device-platforms" aria-label={`${label} platforms`}>
                {platforms.map(({ name, icon }) => <li key={name}><ServiceIcon name={icon} className="size-[18px]" /><span>{name}</span></li>)}
              </ul>
              <h3 className="mt-4 font-display text-[24px] font-medium leading-tight">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{body}</p>
              <a href={href} className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium underline decoration-line-strong underline-offset-4">{action}<ArrowUpRight size={15} aria-hidden /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
