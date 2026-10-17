import { ArrowRight } from "lucide-react";

import { ButtonLink, Eyebrow, Reveal } from "@/components/ui";
import { BlobAgent } from "@/components/blob";
import { links, vstorm } from "@/content";
import { asset, assetSet } from "@/lib/site";

export function Cta() {
  return (
    <section className="bg-paper px-5 pb-24 md:px-8 md:pb-28">
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="grain relative isolate overflow-hidden rounded-[32px] bg-violet">
          <img
            src={asset("/images/cta-2800.webp")}
            srcSet={assetSet("/images/cta-1400.webp 1400w, /images/cta-2800.webp 2800w")}
            sizes="(min-width: 1240px) 1240px, 100vw"
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-10 size-full object-cover object-[70%_50%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet/75 via-violet/35 to-transparent" />
          {/* The demo crew, standing on the jetty. */}
          <div aria-hidden className="absolute bottom-[19%] right-[16%] hidden items-end gap-1.5 md:flex">
            <BlobAgent color="#1fb58f" size={44} delay={0.4} />
            <BlobAgent color="#d8c84a" size={38} delay={1.5} />
            <BlobAgent color="#bbd1ff" size={50} delay={2.4} />
            <BlobAgent color="#f2b8c6" size={36} delay={0.9} />
          </div>
          <div className="flex min-h-[440px] flex-col items-start justify-center p-8 md:min-h-[480px] md:p-16">
            <Eyebrow tone="dark">Start now</Eyebrow>
            <h2 className="display-tight mt-6 max-w-[16ch] text-[clamp(2.2rem,5vw,4rem)] font-medium text-white">
              Put AI to work on infrastructure you control.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-white/80">
              Choose one repeated task and the person who will judge the answers. Set it up with the
              model and access rules you choose.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#quickstart" tone="white" className="h-12 px-6">
                Get started <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={vstorm.contact} tone="ghost-light" className="h-12 px-6">
                Talk to Vstorm about a rollout
              </ButtonLink>
            </div>
            <a href={links.deck} target="_blank" rel="noreferrer" className="mt-6 text-[14px] font-medium text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white">
              Or click through the 14-slide introduction
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
