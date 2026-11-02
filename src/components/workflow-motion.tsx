"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CalendarClock, CheckCheck, FileText, Pause, Play, Table2 } from "lucide-react";

import { Blob } from "@/components/blob";
import { ServiceIcon } from "@/components/brand-icon";

const DESKTOP_PATHS = [
  "M80 80 C220 80 180 220 330 220 S450 220 600 220 C740 220 720 80 860 80 S980 220 1120 220",
  "M80 220 H330 C470 220 460 220 600 220 S720 220 860 220 H1120",
  "M80 360 C220 360 190 220 330 220 C470 220 460 220 600 220 C740 220 720 360 860 360 S980 220 1120 220",
] as const;
const MOBILE_PATHS = [
  "M70 80 C70 160 200 140 200 220 V380 C200 460 70 460 70 540 C70 620 200 600 200 700",
  "M200 80 V380 C200 460 200 460 200 540 V700",
  "M330 80 C330 160 200 140 200 220 V380 C200 460 330 460 330 540 C330 620 200 600 200 700",
] as const;

type NodePosition = CSSProperties & Record<"--x" | "--y" | "--mobile-x" | "--mobile-y", string>;
interface FlowNode {
  label: string;
  detail: string;
  mark: ReactNode;
  desktop: readonly [number, number];
  mobile: readonly [number, number];
  agent?: boolean;
}
const NODES: readonly FlowNode[] = [
  { label: "Gmail", detail: "A request arrives", mark: <ServiceIcon name="gmail" />, desktop: [80, 80], mobile: [70, 80] },
  { label: "Drive", detail: "Company context", mark: <ServiceIcon name="gdrive" />, desktop: [80, 220], mobile: [200, 80] },
  { label: "Routine", detail: "On your schedule", mark: <CalendarClock />, desktop: [80, 360], mobile: [330, 80] },
  { label: "Knowledge", detail: "Find the context", mark: <FileText />, desktop: [330, 220], mobile: [200, 220] },
  { label: "Your agent", detail: "Reason. Use tools. Act.", mark: <Blob color="#bbd1ff" />, desktop: [600, 220], mobile: [200, 380], agent: true },
  { label: "Approval", detail: "A human decides", mark: <CheckCheck />, desktop: [860, 80], mobile: [70, 540] },
  { label: "Tables", detail: "Structured results", mark: <Table2 />, desktop: [860, 220], mobile: [200, 540] },
  { label: "Report", detail: "Something to share", mark: <FileText />, desktop: [860, 360], mobile: [330, 540] },
  { label: "Slack", detail: "Back to your team", mark: <ServiceIcon name="slack" />, desktop: [1120, 220], mobile: [200, 700] },
];

function position(node: FlowNode): NodePosition {
  return {
    "--x": `${node.desktop[0] / 12}%`,
    "--y": `${node.desktop[1] / 4.4}%`,
    "--mobile-x": `${node.mobile[0] / 4}%`,
    "--mobile-y": `${node.mobile[1] / 7.8}%`,
  };
}

function Threads({ mobile = false }: { mobile?: boolean }) {
  const paths = mobile ? MOBILE_PATHS : DESKTOP_PATHS;
  return (
    <svg viewBox={mobile ? "0 0 400 780" : "0 0 1200 440"} className={mobile ? "workflow-lines workflow-lines--mobile" : "workflow-lines workflow-lines--desktop"} fill="none" aria-hidden>
      {paths.map((path, index) => (
        <g key={path} className={`workflow-thread workflow-thread--${index}`}>
          <path d={path} className="workflow-track" />
          <path d={path} pathLength="1000" className="workflow-pulse" style={{ animationDelay: `${-index * 3.4}s` }} />
        </g>
      ))}
    </svg>
  );
}

/** An illustrative flow, separate from product screenshots and run telemetry. */
export function WorkflowMotion() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => setVisible(entries.some((entry) => entry.isIntersecting)), { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="workflow-motion" className="workflow-scene px-5 py-16 md:px-8 md:py-24" data-running={visible && !paused} aria-labelledby="workflow-motion-title">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">Connected work</p>
            <h2 id="workflow-motion-title" className="display-tight mt-4 max-w-[760px] text-[clamp(2rem,4.6vw,4rem)] font-medium">Different starting points.<br /><span className="text-muted">One connected workflow.</span></h2>
          </div>
          <button type="button" className="workflow-motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? <Play size={14} /> : <Pause size={14} />}{paused ? "Resume motion" : "Pause motion"}
          </button>
        </div>
        <figure className="mt-10 md:mt-14">
          <div className="workflow-canvas">
            <Threads /><Threads mobile />
            {NODES.map((node) => (
              <div key={node.label} className={`workflow-node${node.agent ? " workflow-node--agent" : ""}`} style={position(node)}>
                <span className="workflow-node-mark">{node.mark}</span>
                <span className="workflow-node-label">{node.label}</span>
                <span className="workflow-node-detail">{node.detail}</span>
              </div>
            ))}
          </div>
          <figcaption className="mx-auto mt-5 max-w-[650px] text-center text-[13px] leading-relaxed text-muted">An illustrative flow, not a live run. Configure your connections, tool permissions and approval rules for the work you want to automate.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/** A quiet visual bridge between the team and coding sections. */
export function WorkflowBridge() {
  return (
    <div className="workflow-bridge" aria-hidden>
      <svg viewBox="0 0 1200 120" fill="none" preserveAspectRatio="none">
        <path d="M-30 30 C180 30 230 100 440 100 S720 20 920 20 S1100 90 1230 90" />
        <path d="M-30 60 C180 60 230 20 440 20 S720 100 920 100 S1100 50 1230 50" />
        <path d="M-30 90 C180 90 230 60 440 60 S720 60 920 60 S1100 20 1230 20" />
      </svg>
    </div>
  );
}
