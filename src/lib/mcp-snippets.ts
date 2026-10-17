/**
 * How each MCP client is pointed at a deployment's own MCP server - the same
 * commands the console's Settings → MCP clients prints, ported from the product
 * repo's `frontend/src/components/settings/mcp-snippets.ts` for three clients.
 * Keep the two in step when the product's commands change.
 */

export const MCP_CLIENTS = ["claude-code", "codex", "cursor"] as const;
export type McpClient = (typeof MCP_CLIENTS)[number];
export type McpAuth = "browser" | "key";

export const MCP_CLIENT_NAME: Record<McpClient, string> = {
  "claude-code": "Claude Code",
  codex: "Codex",
  cursor: "Cursor",
};

export const MCP_URL = "https://<your-deployment>/mcp";

const SERVER = "agenticos";
const KEY_VARIABLE = "AGENTICOS_API_KEY";
const KEY_PLACEHOLDER = "Bearer aos_…";

function claudeCode(auth: McpAuth, url: string): string {
  const add = ["claude", "mcp", "add", "--transport", "http", SERVER, url].join(" ");
  return auth === "key" ? `${add} \\\n  --header "Authorization: Bearer $${KEY_VARIABLE}"` : add;
}

function codex(auth: McpAuth, url: string): string {
  const add = ["codex", "mcp", "add", SERVER, "--url", url].join(" ");
  return auth === "key"
    ? [add, "--bearer-token-env-var", KEY_VARIABLE].join(" ")
    : [add, ["codex", "mcp", "login", SERVER].join(" ")].join("\n");
}

function cursor(auth: McpAuth, url: string): string {
  const server = auth === "key" ? { url, headers: { Authorization: KEY_PLACEHOLDER } } : { url };
  return JSON.stringify({ mcpServers: { [SERVER]: server } }, null, 2);
}

export function mcpSnippet(client: McpClient, auth: McpAuth, url: string = MCP_URL): string {
  switch (client) {
    case "claude-code":
      return claudeCode(auth, url);
    case "codex":
      return codex(auth, url);
    case "cursor":
      return cursor(auth, url);
  }
}

/** Where the snippet goes: a shell command, or Cursor's config file. */
export const MCP_SNIPPET_PLACE: Record<McpClient, string> = {
  "claude-code": "Terminal",
  codex: "Terminal",
  cursor: ".cursor/mcp.json",
};
