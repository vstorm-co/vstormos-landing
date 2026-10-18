"use client";

import { useState } from "react";

import { BrandIcon } from "@/components/brand-icon";
import { CopyButton } from "@/components/copy-button";
import type { BrandName } from "@/lib/brand-glyphs";
import {
  MCP_CLIENTS,
  MCP_CLIENT_NAME,
  MCP_SNIPPET_PLACE,
  mcpSnippet,
  type McpAuth,
  type McpClient,
} from "@/lib/mcp-snippets";

const CLIENT_MARK: Record<McpClient, BrandName> = {
  "claude-code": "claude",
  codex: "codex",
  cursor: "cursor",
};

const AUTH_LABEL: Record<McpAuth, string> = {
  browser: "Browser",
  key: "API key",
};

/** The console's MCP-clients settings, as a working panel: pick a client and a sign-in, copy what it needs. */
export function McpClients() {
  const [client, setClient] = useState<McpClient>("claude-code");
  const [auth, setAuth] = useState<McpAuth>("browser");
  const snippet = mcpSnippet(client, auth);

  return (
    <div className="w-full overflow-hidden rounded-[18px] bg-[#15131d] ring-1 ring-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
        <div role="tablist" aria-label="MCP client" className="-mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none]">
          {MCP_CLIENTS.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={client === id}
              onClick={() => setClient(id)}
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                client === id ? "bg-white text-ink" : "text-white/65 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <BrandIcon name={CLIENT_MARK[id]} mono className="size-3.5" />
              {MCP_CLIENT_NAME[id]}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label="Sign-in" className="flex rounded-full bg-white/[0.06] p-0.5 ring-1 ring-white/10">
          {(Object.keys(AUTH_LABEL) as McpAuth[]).map((id) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={auth === id}
              onClick={() => setAuth(id)}
              className={`rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors ${
                auth === id ? "bg-white/15 text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {AUTH_LABEL[id]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-white/40">
            {MCP_SNIPPET_PLACE[client]}
          </span>
          <CopyButton text={snippet} label={`Copy the ${MCP_CLIENT_NAME[client]} configuration`} />
        </div>
        <pre className="mt-3 min-h-[72px] overflow-auto whitespace-pre sm:h-[150px] rounded-[12px] bg-white/[0.04] p-4 font-mono text-[13px] leading-relaxed text-white/90 ring-1 ring-white/[0.06] [scrollbar-width:thin]">
          <code>{snippet}</code>
        </pre>
        <p className="mt-3 text-[13px] leading-relaxed text-white/50">
          {auth === "browser"
            ? "The client opens the console's consent page, where you choose the organization and what it may do. No key is pasted anywhere."
            : "For a client that cannot open a browser. The connection acts as the member who issued the key, within its permissions."}
        </p>
      </div>
    </div>
  );
}
