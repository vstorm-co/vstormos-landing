import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/ui";
import { links } from "@/content";
import { asset } from "@/lib/site";

const choices = [
  {
    title: "AI for your company",
    question: "Which AI agent platform is best for a team?",
    answer:
      "Start with the task, the people who need access and who will operate it. AgenticOS combines shared Projects, configurable agents, workflows and tools on your infrastructure. A managed service may fit better if you do not want to run a platform.",
    href: "/compare/",
    action: "Compare the platforms",
    local: true,
  },
  {
    title: "Personal AI for work",
    question: "Do you need an assistant or a shared workspace?",
    answer:
      "A personal assistant can be enough for one person's daily tasks. AgenticOS lets you build personal work agents and share selected agents and Projects with colleagues. It is a platform to operate, not a claim to replace every consumer assistant.",
    href: "/compare/grok-bot/",
    action: "Explore the operating models",
    local: true,
  },
  {
    title: "RAG for company documents",
    question: "What makes a RAG app useful for your documents?",
    answer:
      "Check extraction, cited answers, source refresh and access before choosing. AgenticOS provides document ingestion and knowledge search, including PyMuPDF, LiteParse and LlamaParse options. Your document set and deployment determine the right configuration.",
    href: `${links.docs}howto/first-document-agent/`,
    action: "Try a document assistant",
    local: false,
  },
] as const;

export function PlatformChoice() {
  return (
    <section
      id="choose-ai-platform"
      aria-labelledby="platform-choice-title"
      className="bg-card px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
            A useful starting point
          </p>
          <h2
            id="platform-choice-title"
            className="display-tight mt-5 max-w-[24ch] text-balance text-[clamp(2.1rem,4.3vw,3.5rem)] font-medium"
          >
            Which AI setup
            <br />
            <span className="text-muted">fits your team?</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {choices.map((choice) => (
            <article
              key={choice.title}
              className="flex flex-col border-t border-line-strong pt-6"
            >
              <p className="text-[13px] font-medium text-muted">
                {choice.title}
              </p>
              <h3 className="mt-3 font-display text-[23px] font-medium leading-tight text-ink">
                {choice.question}
              </h3>
              <p className="mb-6 mt-4 flex-1 text-[15px] leading-relaxed text-muted">
                {choice.answer}
              </p>
              <a
                href={choice.local ? asset(choice.href) : choice.href}
                {...(!choice.local
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-ink underline decoration-line-strong underline-offset-4"
              >
                {choice.action}
                <ArrowRight aria-hidden className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
