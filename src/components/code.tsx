import type { ReactNode } from "react";

export type CodeLanguage = "python" | "yaml" | "bash";

type Token = "comment" | "string" | "keyword" | "decorator" | "key" | "flag" | "variable" | "number" | "command";

const COLORS: Record<Token, string> = {
  comment: "text-white/35",
  string: "text-[#86efac]",
  keyword: "text-[#c4b5fd]",
  decorator: "text-[#fda4af]",
  key: "text-[#93c5fd]",
  flag: "text-[#fcd34d]",
  variable: "text-[#f9a8d4]",
  number: "text-[#fdba74]",
  command: "text-white font-medium",
};

/** One alternation per language; the first group that matches names the token. Enough for the snippets on this page. */
const GRAMMARS: Record<CodeLanguage, readonly [Token, string][]> = {
  python: [
    ["comment", "#.*"],
    ["string", String.raw`"""[\s\S]*?"""|"(?:[^"\\\n]|\\.)*"`],
    ["decorator", String.raw`@\w+`],
    ["keyword", String.raw`\b(?:from|import|class|def|return|if|else|None|True|False|async|await|isinstance)\b`],
    ["number", String.raw`\b\d+(?:\.\d+)?\b`],
  ],
  yaml: [
    ["comment", "#.*"],
    ["key", String.raw`^\s*(?:- )?[\w_]+(?=:)`],
    ["string", String.raw`"(?:[^"\\\n]|\\.)*"`],
    ["number", String.raw`\b\d+(?:\.\d+)?\b`],
  ],
  bash: [
    ["comment", "#.*"],
    ["string", String.raw`"(?:[^"\\\n]|\\.)*"|'[^'\n]*'`],
    ["command", String.raw`^curl\b`],
    ["flag", String.raw`(?<=\s)--?[\w-]+`],
    ["variable", String.raw`\$\w+`],
  ],
};

function highlight(code: string, language: CodeLanguage): ReactNode[] {
  const grammar = GRAMMARS[language];
  const pattern = new RegExp(grammar.map(([, source]) => `(${source})`).join("|"), "gm");
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(pattern)) {
    const index = match.index;
    if (index > last) out.push(code.slice(last, index));
    const group = match.slice(1).findIndex((value) => value !== undefined);
    const token = grammar[group]?.[0];
    out.push(
      <span key={index} className={token === undefined ? undefined : COLORS[token]}>
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function Code({ code, language }: { code: string; language: CodeLanguage }) {
  return (
    <pre className="overflow-x-auto whitespace-pre font-mono text-[11.5px] sm:text-[12.5px] leading-[1.7] text-white/80 [scrollbar-width:thin] md:text-[13px]">
      <code>{highlight(code, language)}</code>
    </pre>
  );
}
