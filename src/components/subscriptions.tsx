import { ArrowUpRight, Check, KeyRound, Laptop, LogIn, Server } from "lucide-react";

import { Mark, providerGlyph } from "@/components/brand-icon";
import { ButtonLink, Reveal, SplitHeading } from "@/components/ui";
import { companyModels, links, subscriptionRoutes, subscriptionTerms } from "@/content";
import { asset } from "@/lib/site";

const ROUTE_ICON = { "sign-in": LogIn, "plan-keys": KeyRound, desktop: Laptop } as const;

const PICKER = [
  {
    group: "Your subscriptions",
    rows: [
      { glyph: "anthropic", name: "Claude Code (Pro, Max)", note: "connected", on: true },
      { glyph: "openai_codex", name: "ChatGPT (Codex)", note: "connected" },
      { glyph: "github", name: "GitHub Copilot", note: "Connect" },
    ],
  },
  {
    group: "Organization keys",
    rows: [{ glyph: "anthropic", name: "Claude Sonnet 5.5", note: "API key" }],
  },
  {
    group: "On your hardware",
    rows: [{ glyph: "ollama", name: "Llama on Ollama", note: "local" }],
  },
] as const;

/** The console's model picker as a person sees it: their own plans first, company keys and local models beside them. */
export function SubscriptionPicker() {
  return (
    <div className="w-full max-w-[360px] overflow-hidden rounded-[14px] bg-white shadow-[0_18px_40px_-28px_rgba(43,37,71,0.6)] ring-1 ring-black/5">
      <p className="border-b border-[#f0f0f2] px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">
        Model for this agent
      </p>
      {PICKER.map((section) => (
        <div key={section.group} className="border-b border-[#f0f0f2] last:border-b-0">
          <p className="px-3.5 pb-1 pt-2.5 text-[10.5px] font-medium text-[#a1a1aa]">{section.group}</p>
          {section.rows.map((model) => {
            const on = "on" in model && model.on;
            return (
              <div
                key={model.name}
                className={`flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] ${on ? "bg-[#f6f5ff]" : ""}`}
              >
                <Mark glyph={providerGlyph(model.glyph)} className="size-4 text-[#18181b]" mono />
                <span className="font-medium text-[#18181b]">{model.name}</span>
                <span
                  className={`ml-auto text-[11px] ${model.note === "Connect" ? "font-medium text-[#5b5bd6]" : "text-[#a1a1aa]"}`}
                >
                  {model.note}
                </span>
                {on ? <Check className="size-3.5 text-[#5b5bd6]" /> : null}
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex items-center justify-between gap-2 border-t border-[#f0f0f2] px-3.5 py-3">
        <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#18181b] px-3 text-[12px] font-medium text-white">
          <LogIn className="size-3.5" /> Connect
        </span>
        <span className="inline-flex items-center gap-1 text-[11.5px] text-[#16794c]">
          <KeyRound className="size-3.5" /> no API key
        </span>
      </div>
    </div>
  );
}

/** Personal plans, with company keys and own models beside them: the subscription angle never stands alone. */
export function Subscriptions({ onPage = false }: { onPage?: boolean }) {
  return (
    <section id="subscriptions" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        {onPage ? null : (
          <SplitHeading
            eyebrow="Your subscriptions"
            title="It works with the AI subscriptions"
            muted="you already pay for."
            body="Each person signs in with the Claude, ChatGPT, Gemini or Copilot plan they already have, and their agents run on it with no API key. Everything the company shares runs on company keys or your own models."
          />
        )}

        <div className={`grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5 ${onPage ? "" : "mt-14"}`}>
          <Reveal className="h-full">
            <div className="flex h-full items-center justify-center rounded-[24px] bg-gradient-to-b from-[#f4f1fb] to-[#efeaf8] p-6 ring-1 ring-line sm:p-10">
              <SubscriptionPicker />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <ul className="flex h-full flex-col divide-y divide-line rounded-[24px] bg-card px-6 ring-1 ring-line md:px-8">
              {subscriptionRoutes.map((route) => {
                const Icon = ROUTE_ICON[route.id];
                return (
                  <li key={route.id} className="py-6 md:py-7">
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-[18px] text-violet" strokeWidth={1.9} />
                      <h3 className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink">{route.title}</h3>
                    </div>
                    <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted">{route.body}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {route.plans.map((plan) => (
                        <li
                          key={plan}
                          className="rounded-full bg-paper px-2.5 py-1 text-[12.5px] font-medium text-ink-soft ring-1 ring-line"
                        >
                          {plan}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-5">
          <div className="flex flex-col gap-4 rounded-[22px] bg-card p-6 ring-1 ring-line md:flex-row md:items-center md:gap-8 md:p-7">
            <div className="flex shrink-0 items-center gap-2.5">
              <Server className="size-[18px] text-violet" strokeWidth={1.9} />
              <h3 className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink">{companyModels.title}</h3>
            </div>
            <p className="text-pretty text-[15px] leading-relaxed text-muted">{companyModels.body}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-[90ch] text-pretty text-center text-[13px] leading-relaxed text-faint">
            {subscriptionTerms}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {onPage ? (
            <ButtonLink href={asset("/#quickstart")}>Run it in 10 minutes</ButtonLink>
          ) : (
            <ButtonLink href={asset("/subscriptions/")}>Every supported plan</ButtonLink>
          )}
          <ButtonLink href={links.subscriptionAccounts} tone="ghost-dark">
            How sign-in works <span aria-hidden>↗</span>
          </ButtonLink>
          {onPage ? null : (
            <a
              href={links.models}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 text-[14px] font-medium text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink"
            >
              All model providers <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
