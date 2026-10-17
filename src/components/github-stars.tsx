"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandIcon } from "@/components/brand-icon";
import { links } from "@/content";
import { STARS_AT_BUILD } from "@/lib/contributors.generated";

/**
 * The repository's star count: the figure recorded at build time, refreshed
 * from GitHub once in the browser. If GitHub refuses (rate limit) the build's
 * figure stays, which is the last real number rather than a guess.
 */
export function GithubStars({ tone, size = "md" }: { tone: "light" | "dark"; size?: "md" | "lg" }) {
  const [stars, setStars] = useState<number>(STARS_AT_BUILD);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/repos/vstorm-co/agenticos", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((body: unknown) => {
        if (typeof body === "object" && body !== null && "stargazers_count" in body) {
          const count = body.stargazers_count;
          if (typeof count === "number") setStars(count);
        }
      })
      // A refusal or an abort keeps the build's figure, as the contract above says.
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const light = tone === "light";
  const height = size === "lg" ? "h-12 text-[15px]" : "h-9 text-[14px]";

  return (
    <a
      href={links.repo}
      target="_blank"
      rel="noreferrer"
      aria-label={`AgenticOS on GitHub, ${stars} stars`}
      className={`group inline-flex items-stretch overflow-hidden rounded-full font-medium ring-1 transition-colors ${height} ${
        light ? "text-white ring-white/20 backdrop-blur-md" : "text-ink ring-line-strong"
      }`}
    >
      <span className={`inline-flex items-center gap-2 pl-3.5 pr-3 transition-colors ${light ? "group-hover:bg-white/10" : "group-hover:bg-ink/[0.04]"}`}>
        <BrandIcon name="github" mono className="size-4" />
        GitHub
      </span>
      <span
        className={`inline-flex items-center gap-1.5 border-l pl-2.5 pr-3.5 tabular-nums ${
          light ? "border-white/15 bg-white/[0.06]" : "border-line-strong bg-paper"
        }`}
      >
        <Star className="size-3.5 fill-[#f2c94c] text-[#f2c94c]" strokeWidth={1.5} />
        {stars.toLocaleString("en-US")}
      </span>
    </a>
  );
}
