import { ArrowUpRight } from "lucide-react";

import { ArtCard } from "@/components/art-card";

import { Reveal, SplitHeading } from "@/components/ui";
import { controls, links } from "@/content";
import { asset } from "@/lib/site";


function ScreenCard({ src, alt, title, body }: { src: string; alt: string; title: string; body: string }) {
  return (
    <article className="spotlight lift flex h-full flex-col overflow-hidden rounded-[24px] bg-card ring-1 ring-line">
      <div className="p-7 pb-0 md:p-8 md:pb-0">
        <h3 className="font-display text-[21px] font-medium tracking-[-0.02em]">{title}</h3>
        <p className="mt-2 max-w-[48ch] text-pretty text-[15px] leading-relaxed text-muted">{body}</p>
      </div>
      {/* The screen runs off the card's right and bottom edges: a window into the console, not a thumbnail. */}
      <div className="ml-7 mt-7 flex-1 overflow-hidden rounded-tl-[14px] bg-[#f3f4f6] shadow-[0_0_0_1px_var(--color-line),0_20px_50px_-24px_rgba(22,20,31,0.35)] [mask-composite:intersect] [mask-image:linear-gradient(90deg,#000_72%,transparent),linear-gradient(180deg,#000_70%,transparent)] md:ml-8">
        <img src={asset(src)} alt={alt} loading="lazy" width={1336} height={760} className="aspect-[1336/640] w-[118%] max-w-none object-cover object-left-top" />
      </div>
    </article>
  );
}

export function Control() {
  return (
    <section id="control" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SplitHeading
          eyebrow="Control"
          title="Every request passes"
          muted="the same controls."
          body="Roles, budgets, approvals, guardrails and a recorded run, whether the request came from chat, Slack, a schedule or the API. Administrators decide who uses each agent, what it may spend and which actions wait for a person."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal>
            <ScreenCard
              src="/screens/crop-approvals.webp"
              alt="Approvals waiting: an agent wants to send an email, update a CRM deal or create an invoice, each with Approve and Reject"
              title="A person decides what matters"
              body="Sensitive tools wait for approval. The run pauses, the request lands here, and the decision is recorded with who made it."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ScreenCard
              src="/screens/crop-spend.webp"
              alt="Spend over time and where the money went, by agent, with each agent’s share of the monthly budget"
              title="Spend you can see before it happens"
              body="Monthly budgets per agent and organization are checked before each model request, and every run records its tokens and cost."
            />
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-5 lg:grid-cols-3">
          {controls.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 0.06} className="h-full">
              <ArtCard art={item.art} title={item.title} body={item.body} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14.5px] font-medium">
          {[
            { label: "Security and data flows", href: links.security },
            { label: "Data protection", href: links.dataProtection },
            { label: "Roles and permissions", href: links.permissions },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ink-soft hover:text-ink">
              {link.label} <ArrowUpRight className="size-3.5" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
