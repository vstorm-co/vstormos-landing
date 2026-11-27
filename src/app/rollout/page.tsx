import { ArrowRight } from "lucide-react";

import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { PageHero } from "@/components/page-hero";
import { Spotlights } from "@/components/spotlights";
import { ButtonLink } from "@/components/ui";
import { Vstorm } from "@/components/vstorm";
import { vstorm } from "@/content";
import { breadcrumb, pageMetadata } from "@/lib/page-meta";
import { asset } from "@/lib/site";

const PATH = "rollout/";

export const metadata = pageMetadata(
  PATH,
  "Rollout by Vstorm: implementation and support",
  "Vstorm, the team behind AgenticOS, rolls it out in your company: processes mapped, agents in production, your people trained and support after. No seat fees.",
);

export default function RolloutPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(PATH, "Rollout")] }} />
      <Spotlights />
      <Nav home={asset("/")} solid />
      <main id="content">
        <PageHero
          scene="lake"
          crumb="Rollout"
          title={
            <>
              AgenticOS, rolled out{" "}
              <span className="text-ink-soft">by the team that builds it.</span>
            </>
          }
          lead="Vstorm maps your processes, builds the agents inside your environment, trains your people and hands the system over, or keeps running it for you. You pay for implementation and tailoring, with no subscription, no seat count and no long-term commitment."
          actions={
            <>
              <ButtonLink href={vstorm.contact} className="h-12 px-6">
                Talk to Vstorm <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={vstorm.caseStudies} tone="ghost-dark" className="h-12 px-6">
                Case studies <span aria-hidden>↗</span>
              </ButtonLink>
            </>
          }
        />
        <Vstorm />
        <Cta />
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
