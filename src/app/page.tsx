import { Capabilities } from "@/components/capabilities";
import { Control } from "@/components/control";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
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

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Spotlights />
      <FloatingCta />
      <Nav />
      <main id="content">
        <Hero />
        <Statement />
        <Teammates />
        <Together />
        <Coding />
        <Expertise />
        <HowItWorks />
        <Showcase />
        <Draws />
        <Capabilities />
        <UseCases />
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
