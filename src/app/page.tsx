import { Capabilities } from "@/components/capabilities";
import { Control } from "@/components/control";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Integrations } from "@/components/integrations";
import { Nav } from "@/components/nav";
import { Ownership } from "@/components/ownership";
import { Quickstart } from "@/components/quickstart";
import { Showcase } from "@/components/showcase";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Spotlights } from "@/components/spotlights";
import { FloatingCta } from "@/components/floating-cta";
import { Statement } from "@/components/statement";
import { Teammates } from "@/components/teammates";
import { Together } from "@/components/together";
import { Coding } from "@/components/coding";
import { Draws } from "@/components/draws";
import { Soon } from "@/components/soon";
import { UseCases } from "@/components/use-cases";
import { Engineers } from "@/components/engineers";
import { Expertise } from "@/components/expertise";
import { Pricing } from "@/components/pricing";
import { Vstorm } from "@/components/vstorm";
import { Recognition } from "@/components/recognition";
import { Everywhere } from "@/components/everywhere";
import { PlatformChoice } from "@/components/platform-choice";
import { WorkflowBridge, WorkflowMotion } from "@/components/workflow-motion";
import { faq } from "@/content";
import { PAGE_URL } from "@/lib/site";

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}/#faq`,
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqData} />
      <SmoothScroll />
      <Spotlights />
      <FloatingCta />
      <Nav />
      <main id="content">
        <Hero />
        <Statement />
        <Recognition />
        <Teammates />
        <Together />
        <WorkflowBridge />
        <Coding />
        <Everywhere />
        <Expertise />
        <HowItWorks />
        <WorkflowMotion />
        <Showcase />
        <Draws />
        <Capabilities />
        <UseCases />
        <PlatformChoice />
        <Integrations />
        <Soon />
        <Control />
        <Ownership />
        <Engineers />
        <Pricing />
        <Vstorm />
        <Quickstart />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
