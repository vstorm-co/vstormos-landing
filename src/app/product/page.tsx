import { ArrowRight } from "lucide-react";

import { Cta } from "@/components/cta";
import { Draws } from "@/components/draws";
import { Everywhere } from "@/components/everywhere";
import { Expertise } from "@/components/expertise";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { PageHero } from "@/components/page-hero";
import { PlatformChoice } from "@/components/platform-choice";
import { Showcase } from "@/components/showcase";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Spotlights } from "@/components/spotlights";
import { ButtonLink } from "@/components/ui";
import { WorkflowMotion } from "@/components/workflow-motion";
import { links } from "@/content";
import { breadcrumb, pageMetadata } from "@/lib/page-meta";
import { asset } from "@/lib/site";

const PATH = "product/";

export const metadata = pageMetadata(
  PATH,
  "Product tour: AI teammates, apps and workflows",
  "A tour of AgenticOS: AI teammates that delegate, browse, run code, draw, build apps and follow your team's skills, in the browser, desktop and phone apps.",
);

export default function ProductPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(PATH, "Product")] }} />
      <SmoothScroll />
      <Spotlights />
      <Nav home={asset("/")} solid />
      <main id="content">
        <PageHero
          scene="lake"
          crumb="Product"
          title={
            <>
              See what AI teammates do{" "}
              <span className="text-accent">in AgenticOS.</span>
            </>
          }
          lead="Agents that hand work to each other, a real browser, apps people open by link, drawings from your documents, skills written by your best people, and the browser, desktop and phone apps they all run in. Real product screens with demonstration data."
          actions={
            <>
              <ButtonLink href={asset("/#quickstart")} className="h-12 px-6">
                Get started free <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={links.tour} tone="ghost-dark" className="h-12 px-6">
                Click through the tour <span aria-hidden>↗</span>
              </ButtonLink>
            </>
          }
        />
        <Showcase />
        <Expertise />
        <Draws />
        <WorkflowMotion />
        <Everywhere />
        <PlatformChoice />
        <Cta />
      </main>
      <Footer home={asset("/")} />
    </>
  );
}
