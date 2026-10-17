import { ArrowLeft } from "lucide-react";

import { BlobAgent } from "@/components/blob";
import { Logo } from "@/components/logo";
import { asset, assetSet } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-violet text-white">
      <header className="mx-auto w-full max-w-[1240px] px-5 py-5 md:px-8">
        <a href={asset("/")} aria-label="AgenticOS home">
          <Logo tone="light" />
        </a>
      </header>
      <div className="relative z-10 mx-auto flex max-w-[640px] flex-1 flex-col items-center justify-center px-5 pb-10 text-center">
        <BlobAgent color="#bbd1ff" size={64} />
        <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.12em] text-blob">404</p>
        <h1 className="display-tight mt-3 text-[clamp(2.2rem,6vw,3.6rem)] font-medium">This trail ends in the woods.</h1>
        <p className="mt-4 text-[16.5px] leading-relaxed text-white/70">The page you were after is not here. The agents are back at the start.</p>
        <a
          href={asset("/")}
          className="shine mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-ink transition-colors hover:bg-blob"
        >
          <ArrowLeft className="size-4" /> Back to AgenticOS
        </a>
      </div>
      <img
        src={asset("/images/footer-3200.webp")}
        srcSet={assetSet("/images/footer-1600.webp 1600w, /images/footer-3200.webp 3200w")}
        sizes="100vw"
        alt=""
        className="relative left-1/2 block w-full min-w-[900px] -translate-x-1/2"
      />
    </main>
  );
}
