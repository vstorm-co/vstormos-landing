// Every figure here is the one the AgenticOS README publishes (release 1.1.1).
// The MCP count is the gallery's number and nothing else.
import type { LogoName } from "@/components/brand-icon";

/** The product release the page describes; update it with the figures below at each release. */
export const RELEASE = "1.5.0";

export const DOCS = "https://vstorm-co.github.io/agenticos";
export const REPO = "https://github.com/vstorm-co/agenticos";

export const links = {
  repo: REPO,
  docs: `${DOCS}/`,
  deck: `${DOCS}/presentation/`,
  tour: `${DOCS}/presentation/tour/`,
  install: `${DOCS}/install/`,
  firstAgent: `${DOCS}/howto/first-document-agent/`,
  useCases: `${DOCS}/use-cases/`,
  security: `${DOCS}/security/`,
  dataProtection: `${DOCS}/data-protection/`,
  comparison: `${DOCS}/about/comparison/`,
  capabilities: `${DOCS}/reference/capabilities/`,
  mcp: `${DOCS}/mcp/`,
  channels: `${DOCS}/channels/`,
  governance: `${DOCS}/governance/`,
  permissions: `${DOCS}/permissions/`,
  models: `${DOCS}/models/`,
  releaseNotes: `${DOCS}/release-notes/`,
  contributing: `${DOCS}/help/`,
  addCapability: `${DOCS}/howto/add-capability/`,
  architecture: `${DOCS}/architecture/`,
  api: `${DOCS}/api/`,
  projects: `${DOCS}/projects/`,
  codingAgent: `${DOCS}/reference/capabilities/#coding-agent`,
  visuals: `${DOCS}/reference/capabilities/#visuals`,
  workflowsPr: `${REPO}/pull/1925`,
  voicePr: `${REPO}/pull/2204`,
  securityPolicy: `${REPO}/blob/main/SECURITY.md`,
  licence: `${REPO}/blob/main/LICENSE`,
  discussions: `${REPO}/discussions`,
  vstorm: "https://vstorm.co",
  pydanticAi: "https://ai.pydantic.dev",
} as const;

export const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/vstorm-co/agenticos/main/scripts/quickstart.sh | bash";

export const nav = [
  { label: "Product", href: "#product" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Integrations", href: "#integrations" },
  { label: "Security", href: "#control" },
  { label: "Developers", href: "#engineers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: links.docs },
] as const;

/** Keys of `PROVIDER_GLYPHS`; a missing one fails the build in `providerGlyph`. */
export const heroModels: readonly { name: string; provider: string }[] = [
  { name: "Anthropic", provider: "anthropic" },
  { name: "OpenAI", provider: "openai" },
  { name: "Gemini", provider: "google" },
  { name: "Mistral", provider: "mistral" },
  { name: "DeepSeek", provider: "deepseek" },
  { name: "Azure", provider: "azure" },
  { name: "Bedrock", provider: "bedrock" },
  { name: "Ollama", provider: "ollama" },
];

export const figures = [
  { value: "29", art: "tool_search", label: "built-in capabilities, switched on per agent" },
  { value: "28", art: "thinking", label: "model providers, hosted, your plan or local" },
  { value: "8", art: "media", label: "places one agent answers" },
  { value: "4,700+", art: "web_research", label: "MCP servers in the gallery" },
] as const;

export interface Showcase {
  id: string;
  tab: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  icon: "users" | "globe" | "flask" | "layout";
  more: { label: string; href: string };
}

export const showcase: readonly Showcase[] = [
  {
    id: "team",
    tab: "Agents as a team",
    title: "Agents that work as a team",
    body: "A lead agent hands parts of a task to colleagues and writes up what they found. You see who it asked, and what each one said.",
    image: "/screens/highlight-subagents.webp",
    alt: "A Chief of Staff agent’s brief for a board call, written from what Support Desk and Sales Researcher answered, with the two agents named under it",
    width: 1600,
    height: 1000,
    icon: "users",
    more: { label: "How subagents work", href: `${DOCS}/reference/capabilities/` },
  },
  {
    id: "browser",
    tab: "A real browser",
    title: "A real browser, right in the chat",
    body: "Watch it click through sites, take over when a sign-in needs you, and point at a spot to comment.",
    image: "/screens/highlight-browser.webp",
    alt: "A Sales Researcher’s live browser under its message in the chat, open on NASA’s Artemis III mission page",
    width: 3200,
    height: 2000,
    icon: "globe",
    more: { label: "The browser capability", href: `${DOCS}/reference/capabilities/` },
  },
  {
    id: "builder",
    tab: "Build and test",
    title: "Build, equip and test in one window",
    body: "Switch tools on from illustrated cards, then give the draft a real job in the test chat beside them, before anyone else sees the agent.",
    image: "/screens/highlight-builder-test.webp",
    alt: "The Finance Analyst’s toolbox with isometric capability cards, and its test chat drawing a chart of Q3 revenue against costs",
    width: 3200,
    height: 2000,
    icon: "flask",
    more: { label: "Build your first agent", href: `${DOCS}/first-agent/` },
  },
  {
    id: "apps",
    tab: "Apps",
    title: "Apps, not just answers",
    body: "An agent publishes a dashboard or a report as a page with a stable link and versions. Choose who can open it; updates keep the link.",
    image: "/screens/highlight-app.webp",
    alt: "The Q3 2026 board dashboard a Finance Analyst published from chat as an app: KPI cards, revenue against costs, the margin trend",
    width: 3200,
    height: 2000,
    icon: "layout",
    more: { label: "Share an app", href: `${DOCS}/artifacts/` },
  },
];

/** The README's six groups; the names add up to the 29 built-in capabilities. `art` keys the console's dioramas. */
export const capabilityGroups = [
  {
    art: "knowledge",
    title: "Knowledge and memory",
    body: "Answers from your documents with citations, and what the agent should remember.",
    names: ["Knowledge search", "Skills", "Context", "Memory", "Memory (mem0)", "Past conversations"],
  },
  {
    art: "browser_use",
    title: "Web",
    body: "Search, read pages, or drive a real browser you can take over at a sign-in.",
    names: ["Web search", "Read web pages", "Web browser"],
  },
  {
    art: "sandbox",
    title: "Files, code and output",
    body: "Its own computer with files and a shell, Claude Code or Codex for software work, and drawings and pages people can open.",
    names: ["Calculations", "Sandbox", "Coding agent", "Charts", "Visuals", "Image generation", "Apps"],
  },
  {
    art: "subagents",
    title: "Reasoning and teamwork",
    body: "Plan, think, hand parts of a job to other agents, and ask you when it is unsure.",
    names: ["Subagents", "Planning", "Thinking", "Work while tools run", "Tool search", "Date and time", "Instruction reminders", "Ask the user"],
  },
  {
    art: "guardrails",
    title: "Safety and limits",
    body: "Redact secrets and personal data, and keep long runs inside their limits.",
    names: ["Guardrails", "Long conversations", "Media offload", "Tool output limits"],
  },
  {
    art: "channel_tools",
    title: "Chat channels",
    body: "Look up people and threads in Slack, Telegram and Mattermost, where an @mention runs as the sender.",
    names: ["Channel lookup"],
  },
] as const;

export const surfaces = [
  "Web chat",
  "Website widget",
  "Hosted page",
  "HTTP API",
  "WebSocket",
  "Slack",
  "Mattermost",
  "Telegram",
] as const;

export const connections = [
  {
    title: "Business tools",
    body: "4,700+ MCP servers in the gallery, and your own. Choose which tools each agent may call.",
    brands: ["notion", "github", "linear", "jira", "hubspot", "stripe"] satisfies LogoName[],
  },
  {
    title: "Documents",
    body: "Sync Google Drive, S3 or MinIO, Git repositories, websites, SharePoint and OneDrive into knowledge bases.",
    brands: ["gdrive", "s3", "github", "onedrive"] satisfies LogoName[],
  },
  {
    title: "Events",
    body: "Start agents on a schedule, a new GitHub issue, a Gmail message or a signed webhook.",
    brands: ["github", "gmail", "webhooks"] satisfies LogoName[],
  },
  {
    title: "Chat tools",
    body: "Publish an agent to Slack, Mattermost or Telegram, where an @mention runs as the person who sent it.",
    brands: ["slack", "mattermost", "telegram"] satisfies LogoName[],
  },
] as const;

export const logoCloud: readonly LogoName[] = [
  "notion", "github", "linear", "slack", "hubspot", "stripe",
  "gdrive", "gmail", "figma", "jira", "postgres", "telegram",
  "mattermost", "onedrive", "s3", "supabase", "confluence", "asana",
];

export const controls = [
  {
    art: "channel_tools",
    title: "Roles and groups",
    body: "Roles define what people may do; groups define who you share with. Company sign-in through OIDC, LDAP or Kerberos.",
  },
  {
    art: "clock",
    title: "Budgets",
    body: "Monthly budgets per agent and organization, checked before each model request.",
  },
  {
    art: "ask_user",
    title: "Approvals",
    body: "Sensitive tools wait for a person. Every decision is recorded with who made it.",
  },
  {
    art: "conversation_search",
    title: "Audit log",
    body: "Hash-chained per organization, verifiable and exportable.",
  },
  {
    art: "guardrails",
    title: "Vault",
    body: "Envelope-encrypted credentials with a data key per secret. Values are never shown again.",
  },
  {
    art: "sandbox",
    title: "Sandboxes",
    body: "Code runs in isolated containers with no network unless needed, and CPU, process and time limits.",
  },
] as const;

export const comparison = [
  { name: "AgenticOS", where: "Your infrastructure", source: "Apache-2.0", models: "28 providers, including local ones and your ChatGPT plan", own: true },
  { name: "OpenAI dots", where: "OpenAI’s cloud", source: "Proprietary", models: "OpenAI only", own: false },
  { name: "Grok Bot", where: "xAI’s cloud", source: "Proprietary", models: "Grok only", own: false },
  { name: "Viktor", where: "Viktor’s cloud", source: "Proprietary", models: "OpenAI, Anthropic, Google, Kimi", own: false },
  { name: "n8n", where: "Self-hosted or n8n Cloud", source: "Sustainable Use License", models: "Many, including Ollama", own: false },
] as const;

export const setups = [
  {
    title: "Self-hosted, with hosted models",
    body: "AgenticOS, documents, vectors and logs run on your servers. Models come from a provider under your own contract and keys, including Azure, Bedrock and Vertex.",
    tags: ["Your servers", "Your contract", "Your keys"],
  },
  {
    title: "Fully local",
    body: "The same layer with open models through Ollama or vLLM on your hardware, local embeddings and local document parsers. Nothing leaves your network.",
    tags: ["Ollama", "vLLM", "Local parsers"],
  },
] as const;

export const faq = [
  {
    q: "Is AgenticOS free for commercial use?",
    a: "Yes. It is licensed under Apache-2.0, which allows commercial use, modification and private deployment. You pay for the infrastructure you run it on and for the model providers and services you choose.",
  },
  {
    q: "Is AgenticOS a product or a service?",
    a: "Both. It is an open-source product you can install and run yourself, and Vstorm tailors it to your processes, data and integrations when you want help. Either way the code, the data and the infrastructure stay yours.",
  },
  {
    q: "Can Vstorm roll it out for us, and what does that cost?",
    a: "Yes. Vstorm, the team that builds AgenticOS, maps your processes, builds the agents inside your environment and hands the system over to your team, or maintains it for you. You pay for implementation and tailoring: no subscription, no seat count and no long-term commitment. A first call is 15 or 30 minutes and free of charge.",
  },
  {
    q: "Do we need engineers to use it?",
    a: "Not to build agents: instructions, tools and knowledge are set up in the browser by the people who know the work. You need someone to operate the deployment, and engineers only when you want a capability that does not exist yet, which they add in typed Python.",
  },
  {
    q: "Can several people work with the same agents at once?",
    a: "Yes. A project gives a team the same files, instructions and sandbox, and its chats are shared: everyone sees who is in the room, watches an agent's answer as it is written, replies to any message and brings in another agent, tool or document with an @. Each message carries its author's name, and each person keeps their own permissions.",
  },
  {
    q: "Can it use the AI subscription we already pay for?",
    a: "Yes. A person can sign in with ChatGPT once and run agents on that plan through Codex instead of a metered API key, and the coding agent can run Claude Code or Codex on a subscription. Budgets still count every run. A subscription belongs to one person, so for agents the whole company uses, an organization API key is the better fit.",
  },
  {
    q: "Can it run with local models only?",
    a: "Yes. Configure Ollama, LiteLLM or an OpenAI-compatible server such as vLLM or LM Studio, use local embedding models through Ollama, and parse documents with PyMuPDF or LiteParse. Check each destination you configure: self-hosting the console alone does not make every model, parser or tool local.",
  },
  {
    q: "How does it keep agents under control?",
    a: "Monthly budgets per agent and per organization are checked before each model request. Sensitive tools wait for a person’s approval. Optional guardrails redact secrets and personal data, and every run is recorded with its agent version, tools, tokens and cost.",
  },
  {
    q: "Which sign-in methods and roles does it support?",
    a: "Email and password with magic links, Google, OIDC single sign-on (Entra ID, Okta, Keycloak, Auth0, Authentik), LDAP and Kerberos. Six built-in roles combine with department groups and per-resource sharing. MFA comes from your identity provider; there is no native MFA, SAML or SCIM yet.",
  },
  {
    q: "How is it different from ChatGPT Enterprise, Copilot Studio or n8n?",
    a: "AgenticOS runs on your infrastructure with any of 27 model providers and has no seat or credit fee of its own. It builds agents for the organization, published to chat, websites and APIs, rather than assistant seats for individual employees. Compared with n8n it starts from the agent rather than a workflow canvas, and many teams use both.",
  },
  {
    q: "What does it take to run?",
    a: "A host with 4 vCPU and 8 GB of RAM, Docker Compose and access to a model provider. Plan for someone to operate the deployment and for subject experts who maintain the instructions and documents.",
  },
] as const;

/** The demo organization's agents, as the screenshots show them: names, colours and what each one does there. */
export const teammates = [
  {
    name: "Chief of Staff",
    color: "#d8c84a",
    job: "Hands parts of a task to colleagues and writes up the brief.",
    ask: "Before tomorrow’s board call: ask Support Desk about the refund rule and Sales Researcher about Neno, then give me two bullets.",
    tools: ["Subagents", "Planning"],
  },
  {
    name: "Support Desk",
    color: "#f2b8c6",
    job: "Answers from the support handbook and says which page it used.",
    ask: "Who has to approve a $520 refund on day 3 under our handbook?",
    tools: ["Knowledge search", "Slack"],
  },
  {
    name: "Sales Researcher",
    color: "#f5cdb6",
    job: "Opens sites in a real browser and reports what it found.",
    ask: "What is the latest news about our competitor Neno?",
    tools: ["Web browser", "Web search"],
  },
  {
    name: "Finance Analyst",
    color: "#1fb58f",
    job: "Turns a spreadsheet into a chart and publishes the board dashboard.",
    ask: "Chart our 2026 MRR by plan from this file and tell me what stands out.",
    tools: ["Sandbox", "Charts", "Apps"],
  },
  {
    name: "Architect",
    color: "#4f7cf7",
    job: "Drafts a new agent from your description, for a person to approve.",
    ask: "Build me an agent that writes the weekly sales report.",
    tools: ["Ask the user", "Approvals"],
  },
  {
    name: "Onboarding Buddy",
    color: "#a99cf2",
    job: "Walks a new hire through the handbook and the first week.",
    ask: "Hi! I just joined the Finance team. What should I read first?",
    tools: ["Context", "Knowledge search"],
  },
] as const;

/** Vstorm's offer around AgenticOS, in the words vstorm.co/agenticos uses. */
export const vstorm = {
  site: "https://vstorm.co",
  agenticos: "https://vstorm.co/agenticos/",
  meeting: "https://vstorm.co/schedule-a-meeting/",
  contact: "https://vstorm.co/contact-us/",
  caseStudies: "https://vstorm.co/case-studies/",
  email: "info@vstorm.co",
  linkedin: "https://www.linkedin.com/company/vstormco/",
  x: "https://x.com/VstormCommunity",
  github: "https://github.com/vstorm-co",
  /** From vstorm.co/schedule-a-meeting and /contact-us, verbatim. */
  call: {
    length: "15 or 30 minutes, free of charge",
    leaveWith: [
      "A live look at real implementations relevant to your industry.",
      "One concrete, high-value process from your business mapped to an agentic AI solution.",
    ],
    hosts: [
      { name: "Antoni Kozelski", role: "CEO and co-founder", photo: "/people/antoni-kozelski.webp" },
      { name: "Bartosz Adam Gonczarek", role: "Co-founder and CTO", photo: "/people/bartosz-gonczarek.webp" },
    ],
    reply: "Reply within 48 hours, from a founder or principal engineer.",
  },
  /** Credentials as vstorm.co states them, word for word where it can be. */
  credentials: {
    pydantic: { title: "Official Pydantic implementation partner", body: "Typed, testable agents on Pydantic AI, the framework AgenticOS runs on.", href: "https://vstorm.co/pydantic-ai-development-services/" },
    aaif: { title: "Agentic AI Foundation member", body: "The first agentic AI engineering company to join, to contribute and help set where the field goes.", href: "https://aaif.io/" },
    awards: [
      { title: "Top AI company", by: "Clutch, 2023", href: "https://clutch.co/profile/vstorm-leading-ai-agent-company" },
      { title: "Technology Fast 50", by: "Deloitte, 2024" },
      { title: "Top AI company", by: "The Manifest, 2024", href: "https://themanifest.com/" },
    ],
    /** Remove after the date: the page says "speaking", not "spoke". */
    talk: {
      title: "Speaking at AGNTCon + MCPCon",
      when: "San Jose, Oct 23, 2026",
      href: "https://events.linuxfoundation.org/agntcon-mcpcon-north-america/program/schedule/?id=1348542",
      drinks: "https://luma.com/egivjdb6",
    },
  },
  /** Agents Vstorm has put in production, with the figures its case studies publish. Not AgenticOS deployments. */
  cases: [
    { client: "Schmitt-Thompson", what: "Medical triage with guideline-executing LLMs", from: "44%", to: "98%", unit: "accuracy", href: "https://vstorm.co/case-study/reaching-expert-level-medical-triage-with-guideline-executing-llms/" },
    { client: "Synera", what: "Text to engineering workflow", from: "2 hrs", to: "3 min", unit: "to generate a workflow", href: "https://vstorm.co/case-study/text-to-workflow-cuts-engineers-tedious-task-time-to-seconds-with-agentic-ai-platform/" },
    { client: "ARIJ Network", what: "Multilingual assistant for journalist training", from: "1%", to: "100%", unit: "of inquiries answered", href: "https://vstorm.co/case-study/multilingual-ai-agent-powered-chatbot-supporting-journalist-training/" },
    { client: "Mixam", what: "Order recommendation and completion", from: "~20%", to: "~40%", unit: "conversion to a final sale", href: "https://vstorm.co/case-study/ai-agent-for-order-recommendation-and-completion/" },
  ],
  phases: [
    {
      n: "01",
      title: "Foundation",
      who: "Vstorm engineers lead",
      body: "The open-source base, already built and running in production, set up in your environment.",
      gets: ["The layer running in your environment", "Your first workflow mapped"],
    },
    {
      n: "02",
      title: "Engineering",
      who: "Built together with your team",
      body: "Forward-deployed engineers map your processes, redesign them for agents, then build and tailor the system in production.",
      gets: ["Processes redesigned for agents", "Agents live on your processes"],
    },
    {
      n: "03",
      title: "Handover",
      who: "Your team runs it",
      body: "Upskilling, runbooks, documentation and pairing, so your team runs and evolves the system when we step back.",
      gets: ["Your people trained to work with agents", "A team that runs it without Vstorm"],
    },
  ],
  figures: [
    { value: "30+", label: "production deployments" },
    { value: "25+", label: "AI engineers" },
    { value: "2017", label: "building AI systems since" },
    { value: "9M+", label: "PyPI downloads of our open-source libraries" },
  ],
} as const;

const tutorial = (slug: string) => `${DOCS}/howto/${slug}/`;

/** Six of the tutorial groups in docs/use-cases.md, three tutorials each, titles as the docs give them. */
export const useCases = [
  {
    team: "Documents and knowledge",
    color: "#bbd1ff",
    count: 6,
    items: [
      { title: "Build your first document agent", body: "Answers you can check against the document", href: tutorial("first-document-agent") },
      { title: "Review a contract against your checklist", body: "A checklist skill applied to an agreement", href: tutorial("contract-review") },
      { title: "Extract invoice data into a spreadsheet", body: "Invoice PDFs read in a sandbox, written to CSV", href: tutorial("document-extraction") },
    ],
  },
  {
    team: "Customer support",
    color: "#f2b8c6",
    count: 5,
    items: [
      { title: "Put a support assistant on your website", body: "A knowledge-backed widget on a public site", href: tutorial("support-widget") },
      { title: "Answer a handbook question in Slack", body: "The document agent in a Slack thread", href: tutorial("slack-handbook-assistant") },
      { title: "Triage your inbox and draft replies", body: "New mail read by a Gmail trigger", href: tutorial("email-triage") },
    ],
  },
  {
    team: "Research and analysis",
    color: "#f5cdb6",
    count: 6,
    items: [
      { title: "Research a question with subagents", body: "Sub-questions in parallel, a sourced report", href: tutorial("deep-research-subagents") },
      { title: "Brief yourself on a company before a call", body: "A dated, sourced one-page brief", href: tutorial("account-research") },
      { title: "Turn a CSV into a chart you can check", body: "Totals, a chart and the script behind it", href: tutorial("csv-chart") },
    ],
  },
  {
    team: "Automation and teams of agents",
    color: "#1fb58f",
    count: 5,
    items: [
      { title: "Schedule a weekly report", body: "Republished as an app every week", href: tutorial("scheduled-report") },
      { title: "Triage new GitHub issues automatically", body: "Triaged the moment GitHub delivers them", href: tutorial("github-issue-triage") },
      { title: "Route requests to a team of specialists", body: "A front desk that delegates", href: tutorial("specialist-team") },
    ],
  },
  {
    team: "Content and communication",
    color: "#d8c84a",
    count: 3,
    items: [
      { title: "Turn one article into social posts", body: "Channel posts in your brand voice", href: tutorial("content-repurposing") },
      { title: "Write product descriptions from a catalogue", body: "Listings without invented facts", href: tutorial("product-descriptions") },
      { title: "Translate documents with your terminology", body: "Translation that follows a glossary skill", href: tutorial("translation-glossary") },
    ],
  },
  {
    team: "Engineering and safety",
    color: "#a99cf2",
    count: 2,
    items: [
      { title: "Review a change in a repository", body: "A diff reviewed in a sandbox", href: tutorial("code-review") },
      { title: "Keep personal data out of prompts", body: "Redacted before the model reads it", href: tutorial("pii-guardrails") },
      { title: "Call an agent from your own application", body: "Any published agent over HTTP", href: tutorial("agent-api") },
    ],
  },
] as const;
