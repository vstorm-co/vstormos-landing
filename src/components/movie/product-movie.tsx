"use client";

import {
  Activity,
  BookOpen,
  Bot,
  Database,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  Plug,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react";

import { LogoMark } from "@/components/logo";
import { AutomateScene, BuildScene, ChatScene, ConnectScene, ShareScene, SlackScene, TeachScene } from "@/components/movie/scenes";

/**
 * The canvas is laid out at a fixed design size and scaled to fit, so every
 * pixel value inside is a design pixel. A phone gets its own narrower canvas
 * with no sidebar; the scenes rearrange themselves for it by container query.
 */
const DESKTOP = { w: 1040, h: 600, zoom: 1.24 } as const;
// The phone canvas is already one column wide, so a zoom would only crop its edges.
const PHONE = { w: 440, h: 760, zoom: 1 } as const;
const PHONE_BELOW = 640;

interface Beat {
  ms: number;
  /** `data-cursor` of the element the pointer travels to as the beat starts. */
  cursor?: string;
  click?: boolean;
  /** `data-zoom` of the region the camera closes in on for this beat; none pulls back out. */
  zoom?: string;
}

interface Scene {
  id: string;
  label: string;
  title: string;
  body: string;
  nav: string;
  /** A scene shown in another product's window instead of the console. */
  chrome?: "slack";
  beats: readonly Beat[];
  Component: ComponentType<{ step: number }>;
}

const SCENES: readonly Scene[] = [
  {
    id: "build",
    label: "Build",
    title: "Brief it like a new colleague",
    body: "Name it, write its instructions in plain language, switch on the tools it needs and publish a version.",
    nav: "Agents",
    beats: [
      { ms: 1100, cursor: "nav-Agents", click: true },
      { ms: 1400, cursor: "agent-name" },
      { ms: 1900, cursor: "agent-instructions" },
      { ms: 1100, cursor: "cap-charts", click: true, zoom: "toolbox" },
      { ms: 1100, cursor: "cap-sandbox", click: true, zoom: "toolbox" },
      { ms: 1100, cursor: "publish", click: true },
      { ms: 2300, zoom: "surfaces" },
    ],
    Component: BuildScene,
  },
  {
    id: "teach",
    label: "Teach",
    title: "Teach it what your company knows",
    body: "Drop in a handbook. It is parsed, split and indexed on your own servers, and every answer cites the page it came from.",
    nav: "Knowledge bases",
    beats: [
      { ms: 1000, cursor: "kb-drop" },
      { ms: 800, cursor: "kb-drop", click: true },
      { ms: 800 },
      { ms: 800 },
      { ms: 900 },
      { ms: 1700, cursor: "kb-ask" },
      { ms: 3800, zoom: "kb-chat" },
    ],
    Component: TeachScene,
  },
  {
    id: "connect",
    label: "Connect",
    title: "Plug in the tools you already use",
    body: "Pick HubSpot, Notion or any of 4,700+ MCP servers, sign in once, and choose which tools the agent may call. Tools that change data can ask first.",
    nav: "MCP servers",
    beats: [
      { ms: 1300, cursor: "connect-hubspot" },
      { ms: 800, cursor: "connect-hubspot", click: true },
      { ms: 1300, cursor: "oauth-allow" },
      { ms: 800, cursor: "oauth-allow", click: true },
      { ms: 3600, zoom: "connect-tools" },
    ],
    Component: ConnectScene,
  },
  {
    id: "chat",
    label: "Chat",
    title: "Ask in the chat, pick the agent with @",
    body: "Mention an agent, drop in a file and watch every step it takes. A slash runs a command: summarize, explain, regenerate, or one your team wrote.",
    nav: "Chat",
    beats: [
      { ms: 900, cursor: "chat-composer" },
      { ms: 1300, cursor: "mention-pick" },
      { ms: 2000, cursor: "chat-composer" },
      { ms: 800, cursor: "chat-send", click: true },
      { ms: 900 },
      { ms: 900 },
      { ms: 2600, zoom: "chat-answer" },
      { ms: 1100, cursor: "chat-composer" },
      { ms: 2000, cursor: "slash-pick", zoom: "slash" },
    ],
    Component: ChatScene,
  },
  {
    id: "slack",
    label: "Slack",
    title: "It answers where your team works",
    body: "Mention it in Slack, Mattermost or Telegram. It replies in the thread, with the access of the person who asked.",
    nav: "Agents",
    chrome: "slack",
    beats: [{ ms: 1800 }, { ms: 1900 }, { ms: 4400, zoom: "slack-reply" }],
    Component: SlackScene,
  },
  {
    id: "automate",
    label: "Automate",
    title: "It runs on its own",
    body: "A routine starts it every Monday, on a new GitHub issue, a Gmail message or a webhook, and keeps the dashboard current.",
    nav: "Routines",
    beats: [
      { ms: 1100, cursor: "routine-new", click: true },
      { ms: 1600 },
      { ms: 1000, cursor: "routine-toggle", click: true },
      { ms: 700 },
      { ms: 3400, zoom: "routine-runs" },
    ],
    Component: AutomateScene,
  },
  {
    id: "share",
    label: "Share",
    title: "The answer becomes an app",
    body: "The dashboard gets a stable link and versions. Choose who opens it; every update keeps the link.",
    nav: "Apps",
    beats: [
      { ms: 2200, zoom: "kpis" },
      { ms: 1000, cursor: "share", click: true },
      { ms: 1000, cursor: "copy-link", click: true },
      { ms: 2300 },
    ],
    Component: ShareScene,
  },
];

const NAV: readonly { label: string; icon: LucideIcon; group?: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Chat", icon: MessageSquare },
  { label: "Agents", icon: Bot, group: "Build" },
  { label: "Routines", icon: Repeat },
  { label: "Apps", icon: LayoutGrid },
  { label: "Activity", icon: Activity },
  { label: "Knowledge bases", icon: Database, group: "Knowledge" },
  { label: "Skills", icon: BookOpen },
  { label: "MCP servers", icon: Plug, group: "Connections" },
];

const sceneLength = (scene: Scene) => scene.beats.reduce((total, beat) => total + beat.ms, 0);

/**
 * Where `element` sits inside `root`, in untransformed layout pixels. Offsets
 * ignore CSS transforms, so the answer holds while the camera is zoomed and
 * while a scene is still sliding in; null when `root` is not an ancestor.
 */
function layoutBox(element: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: Element | null = element;
  while (node instanceof HTMLElement && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return node === root ? { x, y, width: element.offsetWidth, height: element.offsetHeight } : null;
}

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="flex w-[196px] shrink-0 flex-col border-r border-[#ececef] bg-[#f7f7f8] px-3 py-4">
      <div className="mb-4 flex items-center gap-2 px-2">
        <LogoMark className="size-6 rounded-[7px]" />
        <span className="text-[13.5px] font-semibold text-[#18181b]">agenticos</span>
      </div>
      {NAV.map((item) => {
        const Icon = item.icon;
        const current = item.label === active;
        return (
          <div key={item.label}>
            {item.group ? <p className="mb-1 mt-4 px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-[#a1a1aa]">{item.group}</p> : null}
            <div
              data-cursor={`nav-${item.label}`}
              className={`relative flex items-center gap-2.5 rounded-[8px] px-2 py-[7px] text-[12.5px] ${current ? "font-medium text-[#18181b]" : "text-[#52525b]"}`}
            >
              {current ? (
                <motion.span layoutId="movie-nav" className="absolute inset-0 rounded-[8px] bg-[#e9e9ec]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
              ) : null}
              <Icon className="relative size-[15px]" strokeWidth={1.8} />
              <span className="relative">{item.label}</span>
            </div>
          </div>
        );
      })}
      <div className="mt-auto flex items-center gap-2 rounded-[10px] px-2 py-2">
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#ecf8f2] text-[10px] font-semibold text-[#16794c]">A</span>
        <span className="text-[11.5px] text-[#52525b]">ana@northwind.example</span>
      </div>
    </aside>
  );
}

/** The phone canvas swaps the sidebar for a top bar naming the page. */
function PhoneBar({ active }: { active: string }) {
  const item = NAV.find((entry) => entry.label === active);
  const Icon = item?.icon ?? Bot;
  return (
    <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-[#ececef] bg-[#f7f7f8] px-4">
      <LogoMark className="size-6 rounded-[7px]" />
      <span className="text-[13px] font-semibold text-[#18181b]">agenticos</span>
      <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11.5px] font-medium text-[#3f3f46] ring-1 ring-[#e6e6ea]">
        <Icon className="size-3.5" strokeWidth={1.8} /> {active}
      </span>
    </div>
  );
}

/** The named pointer, with a ripple on each click. */
function Pointer({ x, y, clickKey }: { x: number; y: number; clickKey: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-50"
      initial={false}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
    >
      <AnimatePresence>
        {clickKey > 0 ? (
          <motion.span
            key={clickKey}
            className="absolute -left-4 -top-4 size-8 rounded-full border-2 border-[#5b5bd6]"
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        ) : null}
      </AnimatePresence>
      <motion.svg key={`press-${clickKey}`} width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" initial={{ scale: 0.82 }} animate={{ scale: 1 }} transition={{ duration: 0.25 }}>
        <path d="M4 2.5 20 11l-7 1.8-3.4 6.7Z" fill="#18181b" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      </motion.svg>
      <span className="absolute left-[18px] top-[18px] whitespace-nowrap rounded-full rounded-tl-[3px] bg-[#5b5bd6] px-2 py-[3px] text-[10.5px] font-medium text-white shadow-md">
        Ana
      </span>
    </motion.div>
  );
}

const NO_CAMERA = { x: 0, y: 0, scale: 1 };

export function ProductMovie() {
  // The movie opens on the chat, the scene a visitor recognises first; it then plays on and wraps to Build.
  const [sceneIndex, setSceneIndex] = useState(() => Math.max(0, SCENES.findIndex((scene) => scene.label === "Chat")));
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState({ x: DESKTOP.w * 0.6, y: DESKTOP.h * 0.7 });
  const [clickKey, setClickKey] = useState(0);
  const [camera, setCamera] = useState(NO_CAMERA);
  const [frameWidth, setFrameWidth] = useState<number>(DESKTOP.w);
  const [started, setStarted] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const visible = useInView(frameRef, { amount: 0.35 });
  const reduce = useReducedMotion();
  const playing = visible && !reduce;

  const canvas = frameWidth < PHONE_BELOW ? PHONE : DESKTOP;
  const phone = canvas === PHONE;
  const scale = frameWidth / canvas.w;

  const scene = SCENES[sceneIndex] ?? SCENES[0];
  if (scene === undefined) throw new Error("The product movie has no scenes");
  const beat = scene.beats[step];

  useLayoutEffect(() => {
    const element = frameRef.current;
    if (element === null) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry !== undefined) setFrameWidth(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const find = useCallback((attribute: "data-cursor" | "data-zoom", name: string) => {
    const root = cameraRef.current;
    if (root === null) return null;
    const element = root.querySelector<HTMLElement>(`[${attribute}="${name}"]`);
    return element === null ? null : layoutBox(element, root);
  }, []);

  // Travel to this beat's target, then press it; and point the camera.
  const direct = useCallback(
    (current: Beat | undefined) => {
      if (current === undefined) return undefined;
      const target = current.cursor === undefined ? null : find("data-cursor", current.cursor);
      if (target !== null) {
        setPointer({ x: target.x + target.width * 0.5, y: target.y + target.height * 0.55 });
      }
      const aimCamera = () => {
        const region = current.zoom === undefined || reduce || canvas.zoom === 1 ? null : find("data-zoom", current.zoom);
        if (region === null) {
          setCamera(NO_CAMERA);
          return;
        }
        const s = canvas.zoom;
        const clamp = (value: number, size: number) => Math.min(0, Math.max(size - size * s, value));
        setCamera({
          scale: s,
          x: clamp(canvas.w / 2 - s * (region.x + region.width / 2), canvas.w),
          y: clamp(canvas.h / 2 - s * (region.y + region.height / 2), canvas.h),
        });
      };
      // A zoom region often mounts with this very beat, behind an exit animation; look once it is there.
      const timers = [window.setTimeout(aimCamera, current.zoom === undefined ? 0 : 520)];
      if (target !== null && current.click) timers.push(window.setTimeout(() => setClickKey((key) => key + 1), 620));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    },
    [find, canvas, reduce],
  );

  // A scene's first beat waits for the previous scene's exit, or its targets are not mounted yet.
  useEffect(() => {
    let release: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      release = direct(beat);
    }, step === 0 ? 480 : 60);
    return () => {
      window.clearTimeout(timer);
      release?.();
    };
  }, [sceneIndex, step, beat, direct, started]);

  useEffect(() => {
    if (!playing || beat === undefined) return;
    const timer = window.setTimeout(() => {
      if (step + 1 < scene.beats.length) {
        setStep(step + 1);
      } else {
        setSceneIndex((index) => (index + 1) % SCENES.length);
        setStep(0);
        setCamera(NO_CAMERA);
        setStarted((value) => value + 1);
      }
    }, beat.ms);
    return () => window.clearTimeout(timer);
  }, [playing, beat, step, scene]);

  // Reduced motion: each scene is shown finished, and the reader moves between them.
  const shownStep = reduce ? scene.beats.length - 1 : step;
  const elapsed = scene.beats.slice(0, step).reduce((total, item) => total + item.ms, 0);

  const go = (index: number) => {
    setSceneIndex(index);
    setStep(0);
    setCamera(NO_CAMERA);
    setStarted((value) => value + 1);
  };

  const SceneComponent = scene.Component;
  const showSidebar = !phone && scene.chrome !== "slack";

  return (
    <div>
      <ol className="flex gap-1.5 overflow-x-auto rounded-[18px] bg-card p-1.5 ring-1 ring-line [scrollbar-width:none] md:grid md:grid-cols-7 [&::-webkit-scrollbar]:hidden">
        {SCENES.map((item, index) => {
          const current = index === sceneIndex;
          return (
            <li key={item.id} className="shrink-0 md:shrink">
              <button
                type="button"
                onClick={() => go(index)}
                aria-current={current ? "step" : undefined}
                className={`relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[13px] px-4 py-2.5 text-[13px] font-medium transition-colors duration-300 sm:text-[14px] md:py-3 lg:justify-start lg:px-4 ${
                  current ? "bg-ink text-white" : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                }`}
              >
                <span className={`hidden size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] lg:inline-flex ${current ? "bg-white/15" : "bg-ink/[0.06]"}`}>
                  {index + 1}
                </span>
                {item.label}
                {current && playing ? (
                  <motion.span
                    key={`bar-${started}-${index}`}
                    className="absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-blob/80"
                    initial={{ scaleX: elapsed / sceneLength(item) }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: (sceneLength(item) - elapsed) / 1000, ease: "linear" }}
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mx-auto mb-6 mt-6 min-h-[104px] max-w-[660px] text-center md:min-h-[78px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-[clamp(1.25rem,2vw,1.6rem)] font-medium tracking-[-0.02em] text-ink">{scene.title}</p>
            <p className="mt-1.5 text-balance text-[15px] leading-relaxed text-muted md:text-[15.5px]">{scene.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="beam mx-auto max-w-[1120px] rounded-[22px] bg-gradient-to-b from-[#ece8fb] to-[#e2dcf6] p-1.5 [--beam:#8b7cf6] shadow-[0_40px_90px_-50px_rgba(43,37,71,0.6)] ring-1 ring-[#ddd6f5] md:p-3">
        <div ref={frameRef} className="relative overflow-hidden rounded-[16px] bg-white ring-1 ring-black/5" style={{ height: canvas.h * scale }}>
          <div
            className="absolute left-0 top-0 origin-top-left font-sans"
            style={{ width: canvas.w, height: canvas.h, transform: `scale(${scale})` }}
            aria-hidden
          >
            <motion.div
              ref={cameraRef}
              className="relative flex size-full origin-top-left flex-col bg-white"
              initial={false}
              animate={camera}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="flex h-9 shrink-0 items-center gap-2 border-b border-[#ececef] bg-[#fbfbfc] px-4">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="mx-auto truncate rounded-full bg-[#f1f1f3] px-3 py-0.5 text-[11px] text-[#71717a]">
                  {scene.chrome === "slack" ? "app.slack.com · Northwind Labs" : "agenticos.your-company.com"}
                </span>
              </div>
              {phone && scene.chrome !== "slack" ? <PhoneBar active={scene.nav} /> : null}
              <div className="flex min-h-0 flex-1">
                {showSidebar ? <Sidebar active={scene.nav} /> : null}
                <main className="@container relative min-w-0 flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${scene.id}-${started}`}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <SceneComponent step={shownStep} />
                    </motion.div>
                  </AnimatePresence>
                </main>
              </div>
              {reduce || scene.chrome === "slack" ? null : <Pointer x={pointer.x} y={pointer.y} clickKey={clickKey} />}
            </motion.div>
          </div>
        </div>
        <p className="sr-only">
          An animated walk-through of the console: {SCENES.map((item) => `${item.label}: ${item.body}`).join(" ")}
        </p>
      </div>
    </div>
  );
}
