import { ProductMovie } from "@/components/movie/product-movie";
import { Reveal, SectionHeading } from "@/components/ui";

export function HowItWorks() {
  return (
    <section id="how" className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="How it works"
          title="From a brief to the boardroom,"
          muted="in seven steps."
          body="One agent, from its first sentence to a dashboard the board opens: built, taught, connected to your tools, asked in the chat and in Slack, put on a schedule and shared."
        />
        <Reveal delay={0.1} className="mx-auto mt-14 max-w-[1120px]">
          <ProductMovie />
        </Reveal>
      </div>
    </section>
  );
}
