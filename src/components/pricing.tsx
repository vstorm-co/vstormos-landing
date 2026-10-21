import { ArrowRight, Check } from "lucide-react";

import { CapabilityArt } from "@/components/capability-art";
import { Reveal, SplitHeading } from "@/components/ui";
import { links, vstorm } from "@/content";
import { asset } from "@/lib/site";

interface Plan {
  art: string;
  name: string;
  price: string;
  priceNote: string;
  body: string;
  points: readonly string[];
  cta: { label: string; href: string; external: boolean };
  featured?: boolean;
}

/*
 * Three ways to have it, in the terms the product and Vstorm publish: the
 * licence (Apache-2.0, every control in every deployment), and Vstorm's offer
 * (implementation and tailoring, no subscription or seat count, maintenance
 * when the team is not ready to own it). No figure is invented here.
 */
const PLANS: readonly Plan[] = [
  {
    art: "memory_files",
    name: "Run it yourself",
    price: "$0",
    priceNote: "Apache-2.0 licence",
    body: "The whole product on your own servers, running in about 10 minutes. No seat fee: the 200th person costs what the fifth did. You pay for the server and the models you choose.",
    points: [
      "Every capability, surface and integration",
      "Company sign-in, roles, budgets, approvals and audit in every deployment",
      "Commercial use, modification and private deployment",
      "Community help on GitHub",
    ],
    cta: { label: "Get started free", href: "#quickstart", external: false },
  },
  {
    art: "subagents",
    name: "Rolled out by Vstorm",
    price: "Per project",
    priceNote: "Implementation and tailoring",
    body: "The team that builds AgenticOS sets it up in your environment and puts your first workflows into production.",
    points: [
      "Your processes mapped and redesigned for agents",
      "Agents built and tested in production with your team",
      "Training, runbooks and documentation at handover",
      "No subscription, no seat count, no long-term commitment",
    ],
    cta: { label: "Book a demo", href: vstorm.contact, external: true },
    featured: true,
  },
  {
    art: "clock",
    name: "Run by Vstorm",
    price: "Ongoing",
    priceNote: "If you are not ready to own it yet",
    body: "Vstorm maintains the platform for you, on your infrastructure, until your own team takes it over.",
    points: [
      "Vstorm maintains the platform for you",
      "Your team takes it over after training, when it is ready",
      "Nothing in AgenticOS needs Vstorm’s permission to keep running",
      "The platform, code, data, infrastructure and models stay yours",
    ],
    cta: { label: "Talk to Vstorm", href: vstorm.contact, external: true },
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const dark = plan.featured === true;
  return (
    <article
      className={`spotlight relative flex h-full flex-col overflow-hidden rounded-[24px] ${
        dark ? "beam bg-violet text-white shadow-[0_40px_90px_-40px_rgba(43,37,71,0.8)] [--spot:rgba(187,209,255,0.14)]" : "lift bg-card text-ink ring-1 ring-line"
      }`}
    >
      <div className={`relative overflow-hidden ${dark ? "" : "border-b border-line"}`}>
        <CapabilityArt id={plan.art} />
        {dark ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] font-medium text-white shadow-sm">
            With the team that builds it
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-[20px] font-medium tracking-[-0.02em]">{plan.name}</h3>
        <p className="mt-4">
          <span className="display-tight block text-[34px] font-medium leading-none">{plan.price}</span>
          <span className={`mt-2 block text-[13.5px] ${dark ? "text-white/60" : "text-muted"}`}>{plan.priceNote}</span>
        </p>
        <p className={`mt-3 text-pretty text-[14.5px] leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{plan.body}</p>
        <ul className={`mb-8 mt-6 space-y-2.5 border-t pt-5 ${dark ? "border-white/10" : "border-line"}`}>
          {plan.points.map((point) => (
            <li key={point} className={`flex items-start gap-2.5 text-[14px] leading-snug ${dark ? "text-white/85" : "text-ink-soft"}`}>
              <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-blob" : "text-ok"}`} strokeWidth={2.6} />
              {point}
            </li>
          ))}
        </ul>
        <a
          href={plan.cta.href}
          {...(plan.cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
          className={`shine group mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-colors ${
            dark ? "bg-white text-ink hover:bg-blob" : "bg-paper text-ink ring-1 ring-line-strong hover:ring-ink/40"
          }`}
        >
          {plan.cta.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SplitHeading
          eyebrow="Pricing"
          title="Free to run."
          muted="Help when you want it."
          body={
            <>
              No seat fees and no credits: AgenticOS is Apache-2.0 software. Run it yourself, or have the team that
              builds it put it into production for you. Model usage is billed by your own provider, under your own
              contract.{" "}
              <a href={asset("/compare/")} className="font-medium text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink">
                Compare with per-seat products
              </a>
            </>
          }
        />
        <div className="rail sm:grid mt-14 gap-4 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.07} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
