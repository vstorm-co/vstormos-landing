import { ArrowRight, Mail } from "lucide-react";

import { BlobAgent } from "@/components/blob";
import { BrandIcon, ServiceIcon } from "@/components/brand-icon";
import { Logo } from "@/components/logo";
import { links, vstorm } from "@/content";
import { asset, assetSet } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    items: [
      { label: "Highlights", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Integrations", href: "#integrations" },
      { label: "Security", href: "#control" },
      { label: "Quick start", href: "#quickstart" },
    ],
  },
  {
    title: "Learn",
    items: [
      { label: "Documentation", href: links.docs },
      { label: "Introduction deck", href: links.deck },
      { label: "Product tour", href: links.tour },
      { label: "29 tutorials", href: links.useCases },
      { label: "Comparisons", href: asset("/compare/") },
      { label: "Release notes", href: links.releaseNotes },
    ],
  },
  {
    title: "Build on it",
    items: [
      { label: "Architecture", href: links.architecture },
      { label: "HTTP API", href: links.api },
      { label: "Add a capability", href: links.addCapability },
      { label: "Contributing", href: links.contributing },
      { label: "Security policy", href: links.securityPolicy },
    ],
  },
  {
    title: "Vstorm",
    items: [
      { label: "About Vstorm", href: vstorm.site },
      { label: "AgenticOS rollouts", href: vstorm.agenticos },
      { label: "Case studies", href: vstorm.caseStudies },
      { label: "Schedule a meeting", href: vstorm.meeting },
      { label: "Contact", href: vstorm.contact },
    ],
  },
] as const;

const SOCIAL = [
  { label: "AgenticOS on GitHub", href: links.repo, icon: <BrandIcon name="github" mono className="size-[18px]" /> },
  { label: "Vstorm on LinkedIn", href: vstorm.linkedin, icon: <ServiceIcon name="linkedin" className="size-[17px] brightness-0 invert" /> },
  { label: "Vstorm on X", href: vstorm.x, icon: <ServiceIcon name="x" className="size-[15px] brightness-0 invert" /> },
  { label: "Built on Pydantic AI", href: links.pydanticAi, icon: <BrandIcon name="pydantic" mono className="size-[18px]" /> },
] as const;

/** The engraving's sky is the footer colour, so the illustration rises out of it with no edge.
 * `home` sends the in-page links back to the home page from any other page. */
export function Footer({ home = "" }: { home?: string }) {
  return (
    <footer className="relative overflow-hidden bg-violet text-white">
      <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-16 md:px-8 md:pt-20">
        {/* The last ask on the page: a call or a mail, with the reply time Vstorm promises. */}
        <div className="beam grain relative overflow-hidden rounded-[26px] bg-gradient-to-br from-white/[0.09] to-white/[0.03] p-6 ring-1 ring-white/10 md:p-9">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-blob/25 blur-[90px]" />
          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="hidden shrink-0 -space-x-3 sm:flex">
                {vstorm.call.hosts.map((host) => (
                  <img key={host.name} src={asset(host.photo)} alt={host.name} width={56} height={56} loading="lazy" className="size-14 rounded-full object-cover ring-[3px] ring-violet" />
                ))}
              </div>
              <div>
                <p className="display-tight text-balance text-[clamp(1.6rem,2.8vw,2.3rem)] font-medium">
                  Thinking about a rollout? <span className="text-white/50">Let’s map your first workflow.</span>
                </p>
                <p className="mt-2 text-[14.5px] text-white/60">
                  {vstorm.call.length}, with the founders. {vstorm.call.reply}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={vstorm.contact}
                target="_blank"
                rel="noreferrer"
                className="shine group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-ink shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] transition-colors hover:bg-blob"
              >
                Talk to Vstorm <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${vstorm.email}?subject=${encodeURIComponent("AgenticOS")}`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white/10 px-5 text-[15px] font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
              >
                <Mail className="size-4" /> {vstorm.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-20 lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 lg:col-span-1">
            <Logo tone="light" />
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/60">
              Open-source AI teammates for your company. The self-hosted agent layer, built and maintained by{" "}
              <a href={vstorm.site} target="_blank" rel="noreferrer" className="text-white/85 underline decoration-white/25 underline-offset-4 hover:decoration-white">
                Vstorm
              </a>
              .
            </p>
            <ul className="mt-6 flex gap-2">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="inline-flex size-10 items-center justify-center rounded-[12px] bg-white/[0.07] text-white ring-1 ring-white/10 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-[16px] font-medium tracking-[-0.01em]">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href.startsWith("#") ? `${home}${item.href}` : item.href}
                      {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="text-[14.5px] text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Vstorm Sp. z o.o. AgenticOS is open source under Apache-2.0.</p>
          <p>
            <a href={links.licence} target="_blank" rel="noreferrer" className="hover:text-white">
              Licence
            </a>
            <span className="px-2">·</span>
            Logos identify connection options and do not imply a partnership.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* The name stands behind the range: the engraving's night is transparent, its peaks are not. */}
        <p
          aria-hidden
          className="display-tight pointer-events-none absolute inset-x-0 top-[4%] select-none bg-gradient-to-b from-[#bbd1ff]/45 via-[#bbd1ff]/20 to-transparent bg-clip-text text-center text-[clamp(4.5rem,18vw,17rem)] font-semibold leading-none text-transparent"
        >
          AgenticOS
        </p>
        <img
          src={asset("/images/footer-3200.webp")}
          srcSet={assetSet("/images/footer-1600.webp 1600w, /images/footer-3200.webp 3200w")}
          sizes="100vw"
          alt="An engraving of a pine valley: a cabin beside a mountain lake under high peaks"
          loading="lazy"
          className="relative left-1/2 z-10 block w-full min-w-[900px] -translate-x-1/2"
        />
        {/* One agent taking the long way home along the meadow. */}
        <div aria-hidden className="pointer-events-none absolute bottom-[3.5%] left-0 z-20 w-full overflow-hidden">
          <div className="w-max animate-[walk_38s_linear_infinite]">
            <div className="animate-[walk-step_0.6s_ease-in-out_infinite]">
              <BlobAgent color="#bbd1ff" size={34} hop={false} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
