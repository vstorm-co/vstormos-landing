import { ArrowRight } from "lucide-react";

import { CompareFaq } from "@/components/compare";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { PageHero } from "@/components/page-hero";
import { Subscriptions } from "@/components/subscriptions";
import { ButtonLink, Reveal, SplitHeading } from "@/components/ui";
import { links } from "@/content";
import { breadcrumb, pageMetadata } from "@/lib/page-meta";
import { asset, PAGE_URL } from "@/lib/site";

const PATH = "subscriptions/";
const title = "Use your Claude, ChatGPT and Gemini plans with AI agents";
const description =
  "Run AI agents on the Claude Pro or Max, ChatGPT, Gemini and GitHub Copilot plans your team already pays for. No API key, self-hosted, open source.";

export const metadata = pageMetadata(PATH, title, description);

/** How the feature behaves for a team, from docs/models.md#subscription-accounts (AgenticOS 1.95). */
const howItWorks = [
  {
    title: "Each person connects their own",
    body: "Sign in from the model picker or Settings → Subscriptions, with a code entered on the provider's page. Accounts are kept apart per person and per organization; nobody else's chat can use yours.",
  },
  {
    title: "Asked once, at onboarding",
    body: "New members are asked which subscriptions they already have and can connect them before their first chat. It stays optional.",
  },
  {
    title: "See what is left",
    body: "Settings shows each account's quota windows, remaining share and reset time. Claude, Codex, Antigravity and Kimi Code are read without spending a request.",
  },
  {
    title: "The same controls",
    body: "Chats on a subscription go through the same roles, approvals and audit log. Budgets record them without a price, because a plan's allowance is not metered per token.",
  },
  {
    title: "Company work on company models",
    body: "Schedules, workflows, API calls and website visitors have no person behind them, so a subscription is never used for them. They run on company keys or your own models.",
  },
  {
    title: "Leaving is clean",
    body: "When someone leaves the organization, a background job deletes their sign-ins. The agents, skills and knowledge they built stay with the company.",
  },
] as const;

const faq = [
  {
    q: "Can I use my Claude Pro or Max subscription with AgenticOS?",
    a: "Yes. Choose Claude Code (Pro, Max) under Your subscriptions in the model picker and connect your account. Your agents then run on that plan inside AgenticOS, with its instructions and tools, and with no Anthropic API key. Anthropic sets the terms for using a plan outside its own apps; check them before relying on it.",
  },
  {
    q: "Can agents run on a ChatGPT plan without an API key?",
    a: "Yes. Connect ChatGPT through Codex, and a person's agents run on their own ChatGPT plan instead of a metered OpenAI API key.",
  },
  {
    q: "Does it work with Gemini or a Google account?",
    a: "Yes. Connect a Google Antigravity account in the console, or use Gemini through Antigravity as a local coding agent in the desktop app. A Gemini API key also works as a regular model provider.",
  },
  {
    q: "Which coding plans work through a plan key?",
    a: "OpenCode Go, Kimi Code, the Z.AI GLM Coding Plan, the Alibaba Coding Plan, Ollama Cloud and MiniMax. Store the plan's key and its own model list appears; a plan key is not interchangeable with the vendor's metered API key.",
  },
  {
    q: "Can the whole team share one subscription?",
    a: "No. A subscription belongs to the person who signed in, and a chat uses only that person's accounts. Give shared and automated agents a company key from any of 40+ providers, or run them on your own models through Ollama or vLLM.",
  },
  {
    q: "Do budgets and approvals still apply?",
    a: "Yes. Roles, approvals and the audit log apply to every chat. Budgets record subscription runs without a price, since the provider does not meter a plan per token, and the remaining allowance is shown per account.",
  },
  {
    q: "Do the providers allow this?",
    a: "Each provider sets its own terms, and some restrict using a plan outside their own apps or coding tools and may limit or suspend an account. AgenticOS states this in the console and the account owner accepts the risk. For work the whole company relies on, use company API keys or your own models.",
  },
] as const;

export default function SubscriptionsPage() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb(PATH, "Subscriptions"),
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}/${PATH}#faq`,
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.q,
          acceptedAnswer: { "@type": "Answer", text: entry.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={data} />
      <Nav home={asset("/")} solid />
      <main id="content">
        <PageHero
          scene="meadow"
          crumb="Subscriptions"
          title={
            <>
              It works with the AI subscriptions{" "}
              <span className="text-accent">you already pay for.</span>
            </>
          }
          lead="Sign in with Claude, ChatGPT, Google Antigravity, GitHub Copilot, Grok or Kimi, and your agents in AgenticOS run on that plan, with no API key. Your people keep the plan they like; the work moves into an open-source workspace your company runs and governs."
          actions={
            <>
              <ButtonLink href={asset("/#quickstart")} className="h-12 px-6">
                Get started free <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={links.subscriptionAccounts} tone="ghost-dark" className="h-12 px-6">
                How sign-in works <span aria-hidden>↗</span>
              </ButtonLink>
            </>
          }
        />
        <Subscriptions onPage />

        <section className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
          <div className="mx-auto max-w-[1240px]">
            <SplitHeading
              eyebrow="For a team"
              title="Personal plans,"
              muted="company rules."
              body="A subscription stays with the person who pays for it. What they build with it, and the controls around it, belong to the company."
            />
            <Reveal delay={0.08} className="mt-12">
              <ul className="grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
                {howItWorks.map((item) => (
                  <li key={item.title} className="border-b border-line py-7">
                    <h3 className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink">{item.title}</h3>
                    <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <CompareFaq items={faq} title="Questions about" muted="subscriptions." />
        <Cta />
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
