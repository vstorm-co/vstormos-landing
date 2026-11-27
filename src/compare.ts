// The comparison pages. Every claim about another product comes from the matching
// guide in the AgenticOS docs (docs/about/<guide>.md), which names its sources;
// change a figure there first, then here.
import { DOCS } from "@/content";

/** When the vendors' pages behind every guide were last read. */
export const CHECKED = "21 October 2026";

export type GlanceRow = { area: string; them: string; us: string };
export type Point = { title: string; body: string };
export type Question = { q: string; a: string };
/** A real console capture from `public/screens`, described as it is. */
export type Screen = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};
/** The nature photograph behind the page's top band. */
export type Scene = "meadow" | "lake";

export type Comparison = {
  slug: string;
  /** Vendor sources were actually inspected on this date; older guides keep their own baseline. */
  checkedDate?: string;
  /** The product compared, as its vendor writes it. */
  name: string;
  /** The page's `<title>`, before the site's " · AgenticOS" suffix. */
  metaTitle: string;
  /** The meta description and card text; 160 characters at most. */
  description: string;
  lead: string;
  glance: readonly GlanceRow[];
  further: readonly Point[];
  /** When the other product is the better fit, said plainly. */
  enough: readonly string[];
  together: string;
  faq: readonly Question[];
  /** The full guide in the docs. */
  guide: string;
  scene: Scene;
  screens: readonly [Screen, Screen];
};

const guide = (name: string) => `${DOCS}/about/${name}/`;

export const SCREENS = {
  approvals: {
    src: "/screens/approvals.webp",
    width: 1600,
    height: 1000,
    alt: "The Approvals tab of the Activity page, with approved, rejected and expired example requests and their decision history.",
    caption:
      "Approval requests and their recorded decisions stay in one place.",
  },
  spend: {
    src: "/screens/spend.webp",
    width: 1600,
    height: 1000,
    alt: "The Spend tab of the Activity page: spend in the window, month to date, cost per run, the agent spending the most and a bar chart of spend per day.",
    caption: "What every agent spent, in your provider's currency, day by day.",
  },
  builder: {
    src: "/screens/highlight-builder-test.webp",
    width: 2400,
    height: 1500,
    alt: "The Finance Analyst’s capability cards beside its draft test panel, ready for a sample question.",
    caption:
      "Configure capabilities and open the draft test panel before publishing.",
  },
  subagents: {
    src: "/screens/highlight-subagents.webp",
    width: 2400,
    height: 1500,
    alt: "A Chief of Staff agent's pricing review brief, written from what the Sales Researcher and Finance Analyst agents found.",
    caption: "Agents hand parts of a job to each other and write up one brief.",
  },
  app: {
    src: "/screens/highlight-app.webp",
    width: 2400,
    height: 1500,
    alt: "Northline supply and production App with a European supplier map, delivery exceptions and assembly windows.",
    caption:
      "A prepared supply and production planning App with fictional shipments; no ERP or carrier is connected.",
  },
} as const satisfies Record<string, Screen>;

export const comparisons = [
  {
    slug: "chatgpt-enterprise",
    name: "ChatGPT Enterprise",
    metaTitle: "Self-hosted alternative to ChatGPT Enterprise",
    description:
      "ChatGPT Enterprise gives each employee OpenAI's assistant in OpenAI's cloud. AgenticOS runs your company's own agents on your servers, on any model.",
    lead: "ChatGPT Business and Enterprise give every employee OpenAI's assistant, plus workspace agents for shared tasks, in OpenAI's cloud. AgenticOS is for the agents your company owns: it runs on your infrastructure, uses the model you choose and answers on your website, in your chat tools and through your API.",
    glance: [
      {
        area: "Where it runs",
        them: "OpenAI's cloud; storage residency in ten regions on Enterprise",
        us: "Your infrastructure",
      },
      { area: "Source", them: "Proprietary", us: "Apache-2.0" },
      {
        area: "Models",
        them: "OpenAI only",
        us: "28 providers, OpenAI included, and local models",
      },
      {
        area: "Building agents",
        them: "Workspace agents, in research preview, with versions and sharing",
        us: "Published agents with versions, environments and YAML export",
      },
      {
        area: "Surfaces for an agent",
        them: "ChatGPT, Slack, schedules, an API trigger",
        us: "Web chat, widget, hosted page, API, WebSocket, Slack, Teams, Telegram, Mattermost, Discord, Matrix, SMS, email, iMessage and telephone calls",
      },
      {
        area: "API",
        them: "The trigger queues a run; the answer cannot be retrieved through the API",
        us: "The run API returns the run and its answer",
      },
      {
        area: "Spend control",
        them: "Credit pools and overage limits",
        us: "A budget per agent and per organization, checked before each model request",
      },
      {
        area: "Identity and audit",
        them: "SAML SSO on Business; SCIM, role-based access and the Compliance API on Enterprise",
        us: "OIDC SSO, LDAP and Kerberos, roles with per-resource grants and a tamper-evident audit log, in every deployment",
      },
      {
        area: "Pricing",
        them: "Business from $20 per seat a month, billed annually; Enterprise custom; agent work paid in credits",
        us: "No licence fee; model usage at your provider's rates",
      },
    ],
    further: [
      {
        title: "An agent your customers can reach",
        body: "OpenAI's developer page says a workspace agent's response cannot currently be retrieved through its API, and its pages list no website widget. An AgenticOS agent answers through an HTTP API that returns the result, a widget on your site, a hosted page, and Slack, Telegram and Mattermost bots.",
      },
      {
        title: "The model is your decision",
        body: "ChatGPT runs OpenAI models. AgenticOS reaches 28 providers, OpenAI and Azure OpenAI among them, plus Anthropic, Google, Mistral, Bedrock and models on your own hardware. Change one model profile and every agent on it moves, with no republish.",
      },
      {
        title: "Enterprise controls in the open-source product",
        body: "On ChatGPT, SCIM, role-based access, the Compliance API and data residency are Enterprise-only. AgenticOS ships directory group mappings, roles with per-resource grants, a tamper-evident audit log and retention per data class in every deployment. SAML and SCIM are not there yet.",
      },
      {
        title: "A platform that does not move under you",
        body: "OpenAI is shutting down Agent Builder, the Evals platform and saved prompt objects on 30 November 2026. A self-hosted platform changes when you upgrade it, and the agent spec is versioned and only moves forward, so a spec exported today still loads after an upgrade.",
      },
    ],
    enough: [
      "You want the assistant, deep research and Codex in one seat, with nothing to run.",
      "You need OpenAI's certifications, key management or Compliance API partners.",
      "You need SAML or SCIM today, which AgenticOS does not have yet.",
    ],
    together:
      "Keep ChatGPT for employees' own work, and use AgenticOS for the agents that serve customers, run behind your API or need a budget and an approver. Your own agents can run on your ChatGPT subscription instead of an API key, and the coding agent hands software work to Codex in a sandbox.",
    faq: [
      {
        q: "Is AgenticOS a self-hosted alternative to ChatGPT Enterprise?",
        a: "For agents your organization owns, yes. It runs on your infrastructure, uses OpenAI or any other provider, and publishes each agent to configured surfaces with its own budget and run history. It does not replace ChatGPT as an assistant for every employee.",
      },
      {
        q: "Can AgenticOS use OpenAI models?",
        a: "Yes. Add a model profile for OpenAI or Azure OpenAI. You can move an agent to another provider later without republishing it.",
      },
      {
        q: "What does AgenticOS cost compared with ChatGPT Enterprise?",
        a: "AgenticOS has no seat or licence fee: you pay your model provider and run a host with 4 vCPU and 8 GB of RAM. ChatGPT Business starts at $20 per seat a month billed annually, and Enterprise is priced by OpenAI's sales team.",
      },
      {
        q: "What replaces OpenAI's Agent Builder after it shuts down?",
        a: "OpenAI points users to the Agents SDK or ChatGPT workspace agents. AgenticOS is an alternative if you want a builder you host yourself, with a spec format that keeps loading across upgrades.",
      },
    ],
    guide: guide("chatgpt"),
    scene: "meadow",
    screens: [SCREENS.approvals, SCREENS.spend],
  },
  {
    slug: "claude-enterprise",
    name: "Claude Enterprise",
    metaTitle: "Self-hosted alternative to Claude Enterprise",
    description:
      "Claude Team and Enterprise give each employee Anthropic's assistant. AgenticOS runs your company's agents on your servers, on Claude or any other model.",
    lead: "Claude Team and Enterprise give each employee Anthropic's assistant: chat, Projects, Cowork, connectors and skills, on Claude models in Anthropic's cloud. AgenticOS builds agents for your organization rather than seats for your employees, and it can run them on Claude through the Anthropic API or Amazon Bedrock.",
    glance: [
      {
        area: "Unit of purchase",
        them: "A seat per employee",
        us: "A deployment; no seat fee",
      },
      {
        area: "Where it runs",
        them: "Anthropic's cloud",
        us: "Your infrastructure",
      },
      { area: "Source", them: "Proprietary", us: "Apache-2.0" },
      {
        area: "Models",
        them: "Claude only",
        us: "28 providers, Claude included, and local models",
      },
      {
        area: "What you build",
        them: "Projects, skills and plugins for people who chat",
        us: "Published agents, each a versioned spec",
      },
      {
        area: "Surfaces",
        them: "Web, desktop, mobile, Chrome, Microsoft 365, Slack through Claude Tag in beta",
        us: "Web chat, widget, hosted page, API, WebSocket, Slack, Teams, Telegram, Mattermost, Discord, Matrix, SMS, email, iMessage and telephone calls",
      },
      {
        area: "Who uses it",
        them: "Employees with a seat",
        us: "Employees, customers and systems, on configured surfaces",
      },
      {
        area: "Spend control",
        them: "Organization and user spend caps",
        us: "A budget per agent and per organization, checked before each model request",
      },
      {
        area: "Approvals",
        them: "The person running the task, or an automatic mode the organization may allow",
        us: "A run waits until a person allowed to decide approvals decides",
      },
      {
        area: "Audit log",
        them: "Enterprise only; 180 days of events",
        us: "Every deployment; tamper-evident, exported as CSV or JSONL",
      },
      {
        area: "Pricing",
        them: "Team from $20 per seat a month, billed annually; Enterprise $20 per seat plus usage at API rates, from 20 seats",
        us: "Model usage at your provider's rates, plus infrastructure",
      },
    ],
    further: [
      {
        title: "Agents for a job, not assistants for a person",
        body: "Claude Projects hold instructions and knowledge for the people who chat in them. An AgenticOS agent is a published, versioned object with environments for testing and a YAML export, and it answers anonymous visitors through a website widget or a hosted page.",
      },
      {
        title: "Approval by someone other than the requester",
        body: "In Cowork, the person running a task approves its write actions. In AgenticOS a gated tool parks the run, the alert goes to the people you choose, and only someone allowed to decide approvals can decide it, once.",
      },
      {
        title: "Enterprise controls without an Enterprise tier",
        body: "On Claude, audit logs, role-based access, SCIM and the Compliance API need Enterprise and 20 seats. AgenticOS ships a tamper-evident audit log, roles with per-resource grants, directory group mappings and retention per data class in every deployment. Custom roles and SCIM are not there yet.",
      },
      {
        title: "Knowledge you can tune",
        body: "Claude Projects switch to retrieval on their own as project knowledge grows, and expose no settings. In AgenticOS you choose the parser, chunking, OCR and image description per collection, the documents and vectors stay in your Postgres, and sync connectors keep collections current.",
      },
    ],
    enough: [
      "You want a strong assistant for every employee with nothing to operate.",
      "Cowork, Claude Code, Microsoft 365 and Chrome under one seat cover your needs.",
      "You need SAML or SCIM today. AgenticOS offers OIDC, LDAP and Kerberos, but not SAML or SCIM yet.",
    ],
    together:
      "Keep Claude for employees' everyday work, and publish the agents that need an owner, a budget or a public surface in AgenticOS, on Claude models. The coding agent hands software work to Claude Code, and Claude Code and Claude Desktop connect to AgenticOS as an MCP server to list and run your agents.",
    faq: [
      {
        q: "Can AgenticOS use Claude models?",
        a: "Yes. Add a model profile for the Anthropic API or Amazon Bedrock, and any agent can run on Claude. You pay Anthropic or AWS at their API rates.",
      },
      {
        q: "Is AgenticOS a self-hosted alternative to Claude Enterprise?",
        a: "For agents your organization publishes, yes. It runs on your infrastructure with per-agent budgets, approvals, roles and a tamper-evident audit log. It does not replace Claude as a personal assistant for every employee.",
      },
      {
        q: "Does AgenticOS charge per seat?",
        a: "No. There is no seat or licence fee. Claude Team starts at $20 per seat per month billed annually, and Claude Enterprise adds usage at API rates to its seat fee.",
      },
      {
        q: "Can people outside the company use an AgenticOS agent?",
        a: "Yes. An agent answers through a website widget, a hosted page link, the HTTP API, Slack, Teams, Telegram, Mattermost, email, SMS or a phone call, with no seat needed.",
      },
    ],
    guide: guide("claude-apps"),
    scene: "lake",
    screens: [SCREENS.approvals, SCREENS.builder],
  },
  {
    slug: "copilot-studio",
    name: "Copilot Studio",
    metaTitle: "Copilot Studio alternative you host yourself",
    description:
      "Copilot Studio builds agents in Microsoft's cloud, billed in credits. AgenticOS builds them on your servers, with any model and no fee of its own.",
    lead: "Microsoft Copilot Studio builds agents inside Power Platform, publishes them to Teams and Microsoft 365, and bills them in Copilot Credits. AgenticOS builds agents on your own infrastructure, with any model provider, and charges nothing of its own: you pay for the model.",
    glance: [
      {
        area: "Where it runs",
        them: "Microsoft's cloud, in Power Platform environments",
        us: "Your infrastructure",
      },
      { area: "Source", them: "Proprietary", us: "Apache-2.0" },
      {
        area: "Models",
        them: "GPT and Claude models; Azure Foundry models billed separately",
        us: "28 providers, including local",
      },
      {
        area: "Billing",
        them: "$0.01 per Copilot Credit pay-as-you-go, or prepaid commit units at up to 20% off",
        us: "No licence fee; model usage at your provider's rates",
      },
      {
        area: "How usage is counted",
        them: "Credits per feature: a generative answer is 2, an agent action 5",
        us: "Model tokens, priced per provider",
      },
      {
        area: "Spend enforcement",
        them: "Monthly limits per agent; agents are disabled at 125% of prepaid capacity",
        us: "A budget per agent and per organization, checked before each model request",
      },
      {
        area: "Surfaces",
        them: "Teams, Microsoft 365, SharePoint, web, WhatsApp, voice",
        us: "Web chat, widget, hosted page, API, WebSocket, Slack, Teams, Telegram, Mattermost, Discord, Matrix, SMS, email, iMessage and telephone calls",
      },
      {
        area: "Identity",
        them: "Microsoft Entra ID",
        us: "OIDC SSO including Entra, LDAP and Kerberos",
      },
      {
        area: "Governance",
        them: "Power Platform data policies, Purview audit, Entra Agent ID",
        us: "Permission catalog, grants, approvals and a tamper-evident audit log",
      },
    ],
    further: [
      {
        title: "See the model cost behind a run",
        body: "AgenticOS records model spend from its price snapshot and checks recorded spend before each model request. Missing prices can leave a run partially priced, and concurrent work can cross a budget. Hosting, tools and operation are separate costs.",
      },
      {
        title: "Any cloud, or none",
        body: "Microsoft notes that Anthropic models in its offerings are outside the EU Data Boundary. AgenticOS runs wherever you deploy it, with the provider and region you configure, or with local inference. Check embeddings, parsers, tools, traces and diagnostics separately; local inference alone does not mean zero egress.",
      },
      {
        title: "Microsoft identity without Microsoft hosting",
        body: "People sign in with Entra ID over OIDC, directory groups map to roles, and collections can sync from SharePoint and OneDrive. Configure and verify the specific MCP integrations your task needs.",
      },
      {
        title: "Open where it matters to an auditor",
        body: "Copilot Studio's governance is strong inside Microsoft's stack. AgenticOS lets you read the controls themselves: the permission catalog, the vault, the audit log's hash chain and the refusal tests that run in CI. The spec exports as YAML, so leaving means keeping your agents, not rebuilding them.",
      },
    ],
    enough: [
      "You want agents embedded in Microsoft 365 Copilot and the Power Platform ecosystem, and your users already hold the relevant licences.",
      "You need Power Platform connectors, agent flows or WhatsApp. AgenticOS supports Teams, browser voice and telephone calls through your own Twilio number; a WhatsApp channel is not included.",
      "Purview, Sentinel and Power Platform data policies are how your organization governs everything else.",
    ],
    together:
      "Keep Copilot Studio for agents that live inside Microsoft 365 Copilot. Use AgenticOS for agents on your website, in Slack or behind your API, and for teams that want the model and the data under their own contract.",
    faq: [
      {
        q: "Is AgenticOS an alternative to Microsoft Copilot Studio?",
        a: "Yes, if you want to own the platform. AgenticOS runs on your infrastructure with any model provider and no credit meter. Copilot Studio fits particularly well when you need its Microsoft 365 Copilot and Power Platform integration. AgenticOS also supports a Teams channel.",
      },
      {
        q: "Does AgenticOS work with Microsoft Entra ID and SharePoint?",
        a: "Yes. People sign in with Entra ID over OIDC, directory groups map to roles, and collections sync files from SharePoint and OneDrive.",
      },
      {
        q: "Can AgenticOS publish agents to Microsoft Teams?",
        a: "Yes. Configure a Teams bot and the published agent’s availability, then verify identity linking and access for your deployment. This is distinct from native integration inside Microsoft 365 Copilot.",
      },
      {
        q: "How much does Copilot Studio cost compared with AgenticOS?",
        a: "Copilot Studio bills $0.01 per Copilot Credit pay-as-you-go, or sells prepaid Copilot Credit Commit Units at up to 20% off. AgenticOS has no fee of its own; you pay your model provider for the tokens an agent uses.",
      },
    ],
    guide: guide("copilot-studio"),
    scene: "meadow",
    screens: [SCREENS.spend, SCREENS.builder],
  },
  {
    slug: "n8n",
    name: "n8n",
    metaTitle: "n8n alternative for AI agents, under Apache-2.0",
    description:
      "Compare AgenticOS and n8n for workflows and AI agents: self-hosting, native agents in preview, knowledge, licensing and model-spend controls.",
    lead: "n8n combines a workflow canvas with AI Agent nodes and native agents in preview, including tools, skills, knowledge and schedules. AgenticOS also offers agents and workflows. Compare the operating model, licence, access controls and model-spend policies for the task you actually need.",
    glance: [
      {
        area: "Unit of work",
        them: "Workflows, AI Agent nodes and native agents in preview",
        us: "An agent, published as a versioned spec",
      },
      {
        area: "Licence",
        them: "Sustainable Use License; .ee files need an Enterprise licence",
        us: "Apache-2.0",
      },
      {
        area: "Where it runs",
        them: "Self-hosted or n8n Cloud in Frankfurt",
        us: "Your infrastructure",
      },
      {
        area: "Sign-in",
        them: "SSO on self-hosted Business and Enterprise, and Cloud Enterprise",
        us: "OIDC SSO, LDAP and Kerberos in every deployment",
      },
      {
        area: "Roles",
        them: "Projects and roles on paid plans",
        us: "Six roles and per-resource grants in every deployment",
      },
      {
        area: "Environments and version control",
        them: "Business and above",
        us: "Environments and YAML export in every deployment",
      },
      {
        area: "Spend control",
        them: "Execution quotas per plan",
        us: "A budget per agent and per organization, checked before each model request",
      },
      {
        area: "Audit",
        them: "Log streaming on Enterprise",
        us: "Tamper-evident audit log in every deployment",
      },
      {
        area: "Human approval",
        them: "Per tool, through nine review channels",
        us: "Per capability, per tool and per MCP connection, through a shared queue",
      },
      {
        area: "Pricing",
        them: "Community free; Cloud from €20 a month for 2,500 executions, billed annually; Business €667 a month, self-hosted",
        us: "No licence fee; model usage and infrastructure",
      },
    ],
    further: [
      {
        title: "A licence without the fine print",
        body: "n8n's Sustainable Use License allows use only for internal business purposes or for non-commercial or personal use, and a self-hosted licence key checks in with n8n daily. AgenticOS is Apache-2.0: you may run it for clients, change it and build a product on it.",
      },
      {
        title: "Money, not executions",
        body: "n8n counts executions, and one agent turn is one execution, whatever the model spent. AgenticOS meters model cost: each agent's budget is checked before each model request, and delegated work counts against the parent agent.",
      },
      {
        title: "An agent a business owner can change",
        body: "Both products let you configure agents as well as workflows. n8n’s native agents are currently in preview. AgenticOS publishes agent instructions, model and capabilities as a versioned specification; compare the configuration and review process your team needs.",
      },
      {
        title: "Knowledge as a managed collection",
        body: "n8n supports retrieval workflows and knowledge bases for its native agents; self-hosted knowledge is in preview and needs a configured sandbox. AgenticOS manages collections in your Postgres, with parser choices, OCR, image description and source-sync controls.",
      },
    ],
    enough: [
      "The job is moving data between many systems, with branches, retries and schedules.",
      "You want its large integration library and visual canvas. AgenticOS also has a visual workflow canvas; node libraries and execution semantics differ.",
      "You need human review in WhatsApp or Gmail, or its large library of integration nodes. AgenticOS has Teams, email and eval runs, but no WhatsApp channel.",
    ],
    together:
      "An n8n workflow can call an AgenticOS agent over the HTTP API and get the answer back, with the agent's budget checked and the run recorded. An AgenticOS webhook trigger can start an agent when n8n posts to it.",
    faq: [
      {
        q: "Is AgenticOS an open-source alternative to n8n?",
        a: "For AI agents, yes. AgenticOS is Apache-2.0, while n8n uses the Sustainable Use License. For moving data between many systems on a visual canvas, n8n fits better, and the two work well together.",
      },
      {
        q: "Does n8n have native AI agents?",
        a: "Yes. Its official documentation describes native agents in preview on Cloud and self-hosted plans from n8n 2.32.3, alongside the AI Agent workflow node. Compare both products on your actual task rather than treating n8n as a workflow-only tool.",
      },
      {
        q: "Is n8n open source?",
        a: "Not in the OSI sense. Its Sustainable Use License allows internal business, non-commercial and personal use, and features in .ee files need an n8n Enterprise licence.",
      },
      {
        q: "How does n8n pricing compare with AgenticOS?",
        a: "n8n Cloud starts at €20 a month for 2,500 executions, billed annually, and counts each agent turn as one execution. AgenticOS has no licence fee and meters model cost against each agent's budget.",
      },
      {
        q: "Can n8n call an AgenticOS agent?",
        a: "Yes. An n8n workflow can call the AgenticOS HTTP API and get the answer back. The agent's budget is checked and the run is recorded in run history.",
      },
    ],
    guide: guide("n8n"),
    scene: "lake",
    screens: [SCREENS.builder, SCREENS.subagents],
  },
  {
    slug: "dify",
    name: "Dify",
    metaTitle: "Dify alternative with a plain Apache-2.0 licence",
    description:
      "Dify is a visual LLM app builder whose licence limits multi-tenant use. AgenticOS is Apache-2.0, with SSO, budgets and an audit log in every deployment.",
    lead: "Dify builds LLM apps and workflows on a visual canvas, self-hosted or in Dify Cloud. AgenticOS builds agents from instructions, capabilities, knowledge and a budget, and ships the controls a company asks for in the open-source product.",
    glance: [
      {
        area: "How you build",
        them: "A visual canvas of workflow, chatflow and agent nodes",
        us: "Versioned agents plus visual workflows with typed steps, branches and loops",
      },
      {
        area: "Licence",
        them: "Apache 2.0 with added conditions on multi-tenant use and the logo",
        us: "Apache-2.0",
      },
      {
        area: "Tenancy",
        them: "One workspace; several workspaces are Enterprise",
        us: "Many organizations in one deployment",
      },
      {
        area: "Roles",
        them: "Four built-in roles; custom roles are Enterprise",
        us: "Six roles, 33 permissions and per-resource grants",
      },
      {
        area: "Sign-in",
        them: "Email; SSO is Enterprise",
        us: "Email, Google, OIDC SSO, LDAP and Kerberos",
      },
      {
        area: "Audit",
        them: "Enterprise",
        us: "Tamper-evident audit log with CSV and JSONL export",
      },
      {
        area: "Spend control",
        them: "Provider billing, or Cloud message credits",
        us: "A monthly budget per agent and per organization, checked before each model request",
      },
      {
        area: "Human approval",
        them: "A Human Input node in a workflow",
        us: "Per capability, per tool and per MCP connection; the run waits until someone decides",
      },
      {
        area: "Kubernetes",
        them: "Community Helm charts; official high availability is Enterprise",
        us: "A maintained Helm chart for the API, worker and console with external data services; Docker Compose on one host; OpenShift unvalidated",
      },
    ],
    further: [
      {
        title: "Multi-tenant without a commercial licence",
        body: "Dify's licence forbids operating a multi-tenant environment without written permission, where one tenant is one workspace, and changing the logo in its frontend. AgenticOS is Apache-2.0: one deployment can serve every department, subsidiary or client, under your own brand.",
      },
      {
        title: "The controls an enterprise asks for",
        body: "Dify lists SSO, custom roles and multiple workspaces as Enterprise features. AgenticOS ships single sign-on, directory group mappings, roles with per-resource grants, a tamper-evident audit log and retention per data class in every deployment.",
      },
      {
        title: "A budget that stops the next model call",
        body: "Dify's documentation describes no spend cap enforced before model calls in the Community Edition. AgenticOS checks each agent's budget and the organization's cap before each model request, and a failed run still records its cost.",
      },
      {
        title: "Approval on the tool, not only in the flow",
        body: "Dify's Human Input node pauses a workflow and sends a form, and the request closes after the first response. In AgenticOS an approval is set per capability, per tool and per MCP connection; the run parks, the people you choose are alerted, and a second decision on a decided approval is refused.",
      },
    ],
    enough: [
      "Your team thinks in flowcharts and wants a visual canvas of nodes, loops and branches.",
      "You need its marketplace plugins, its hybrid search with rerank or its observability integrations.",
      "One workspace is enough, or the Enterprise edition's terms suit you.",
    ],
    together:
      "Both self-host and both handle document retrieval, so the choice is less about features than about the licence and the controls you need. Run the same handbook questions in both, then create a second tenant and give an agent a budget of a few cents, and compare what each allows.",
    faq: [
      {
        q: "Is AgenticOS an open-source alternative to Dify?",
        a: "Yes. Both self-host and both handle document retrieval. AgenticOS is Apache-2.0 with no multi-tenant or logo conditions, and it includes SSO, roles, budgets, approvals and a tamper-evident audit log without an enterprise edition.",
      },
      {
        q: "Can Dify run as a multi-tenant service?",
        a: "Dify's licence requires written permission to operate a multi-tenant environment, where one tenant is one workspace. AgenticOS serves many organizations from one deployment under Apache-2.0.",
      },
      {
        q: "Does AgenticOS have a visual workflow builder like Dify?",
        a: "Yes. AgenticOS includes a visual workflow builder with typed steps, branches, loops and published versions. Compare the nodes and integrations your task requires with Dify’s ecosystem.",
      },
      {
        q: "Which one costs less to run?",
        a: "Dify Community Edition and AgenticOS are both free to self-host; you pay for models and infrastructure. Dify's Enterprise features are priced by its sales team. In AgenticOS those controls are already in the open-source product.",
      },
    ],
    guide: guide("dify"),
    scene: "meadow",
    screens: [SCREENS.builder, SCREENS.approvals],
  },
  {
    slug: "sauna",
    name: "Sauna",
    metaTitle: "Self-hosted alternative to Sauna",
    description:
      "Sauna is a proactive AI assistant per person, run in its cloud. AgenticOS runs your company's agents on your servers, with any model and per-agent budgets.",
    lead: "Sauna is a proactive AI assistant for each person: it reads the inbox, calendar, documents and tools you connect, remembers what it learns, and suggests or does work on your behalf. AgenticOS gives a company as many agents as it needs, each with its own instructions, model, tools, knowledge, budget and access rules, on infrastructure the company controls.",
    glance: [
      {
        area: "What you get",
        them: "One proactive assistant per person, with memory",
        us: "Any number of agents, each a versioned spec",
      },
      {
        area: "Where it runs",
        them: "Sauna's cloud; US infrastructure for US customers, and data may be processed in the US",
        us: "Your infrastructure",
      },
      { area: "Source", them: "Proprietary", us: "Apache-2.0" },
      {
        area: "Models",
        them: "Its own Lite model on Lite; all models from Basic",
        us: "28 providers, including local models",
      },
      {
        area: "Knowledge",
        them: "Files you drop in, memory it learns and the tools you connect",
        us: "Document collections in your Postgres, with parsing and chunking you choose",
      },
      {
        area: "Surfaces",
        them: "Web app, iOS app, iMessage, Slack, Gmail, Superhuman, email",
        us: "Web chat, widget, hosted page, API, WebSocket, Slack, Teams, Telegram, Mattermost, Discord, Matrix, SMS, email, iMessage and telephone calls",
      },
      {
        area: "Sharing",
        them: "Private by default; a company-wide shared brain on Team",
        us: "Six roles, 33 permissions and per-resource grants",
      },
      {
        area: "Autonomy",
        them: "Configurable, from suggesting actions to acting on its own",
        us: "Approvals per capability, per tool and per MCP connection",
      },
      {
        area: "Compliance evidence",
        them: "SOC 2 Type II, CASA",
        us: "Your controls on your infrastructure",
      },
      {
        area: "Pricing",
        them: "Free with 10 credits a day; Lite $29, Basic $99, Pro $299 and Team $999 a month, monthly only",
        us: "No licence fee; model usage and infrastructure",
      },
    ],
    further: [
      {
        title: "Agents for the company, not one assistant per person",
        body: "Every person has their own Sauna, and a shared company brain comes with the Team plan. In AgenticOS each agent is built for its own task, with its own instructions, capabilities, knowledge and budget, and the same agent serves everyone it is shared with.",
      },
      {
        title: "Data that stays where you put it",
        body: "Sauna's policy says data may be processed in the US and wherever its sub-processors operate. It researches each new user on the public web, and its site and app load advertising pixels. AgenticOS keeps conversations, documents and vectors in your own Postgres, and a fresh install sends nothing anywhere.",
      },
      {
        title: "Approval by someone other than the requester",
        body: "Sauna lets you set how much it may do without you. In AgenticOS a gated tool parks the run until a person allowed to decide approvals decides it, every decision lands in a tamper-evident audit log, and an MCP connection carries its own approval policy.",
      },
      {
        title: "A model you choose, and a budget per agent",
        body: "Sauna's cheapest plan runs on its own Lite model, and the model picker opens from Basic. AgenticOS reaches 28 providers on every agent, and each agent has a monthly budget checked before each model request, in your provider's currency rather than in credits.",
      },
    ],
    enough: [
      "You want a personal assistant that triages your own inbox and calendar, with nothing to run.",
      "iMessage, an iOS app or Superhuman is where you want to talk to it. AgenticOS has none of these.",
      "US processing and its retention terms meet your requirements.",
    ],
    together:
      "Keep Sauna for one person's inbox, and use AgenticOS for the agents a team or its customers rely on. An AgenticOS agent can watch a mailbox through a Gmail trigger, run on a schedule, remember what it learns and publish apps, under budgets and approvals.",
    faq: [
      {
        q: "Is AgenticOS an alternative to Sauna?",
        a: "Yes, if you want agents for a team rather than one assistant per person. AgenticOS runs many agents, each with its own instructions, access, knowledge and budget, on your own infrastructure. Sauna is quicker to start for one person's inbox and runs in its own cloud.",
      },
      {
        q: "Where does Sauna store data?",
        a: "Its security page says that for US customers, infrastructure and data storage are in the United States, and its privacy policy says data may be processed in the US and wherever its sub-processors operate. AgenticOS stores everything in your own Postgres, wherever you deploy it.",
      },
      {
        q: "Can AgenticOS read my email like Sauna?",
        a: "An agent can, if you connect it. A Gmail trigger runs an agent on new mail, and an MCP server for your mailbox lets it read and draft. Each write can wait for approval.",
      },
      {
        q: "How does pricing compare?",
        a: "Sauna has a free plan with 10 credits a day and paid plans from $29 to $999 a month, billed monthly. AgenticOS has no licence fee: you pay model providers directly, and each agent has its own monthly budget.",
      },
    ],
    guide: guide("sauna"),
    scene: "lake",
    screens: [SCREENS.subagents, SCREENS.app],
  },
  {
    slug: "muse",
    name: "Muse",
    checkedDate: "2 November 2026",
    metaTitle: "AgenticOS vs Muse",
    description:
      "Compare Muse with AgenticOS: a managed personal cloud agent or a self-hosted platform for a company’s AI teammates.",
    lead: "Muse is Meta’s personal AI agent, announced on 8 September 2026. It uses a dedicated cloud VM and browser, continues work while the user is away, and asks before sensitive actions. The announcement describes an initial US rollout. Muse the agent and Muse Spark the model are different things.",
    glance: [
      {
        area: "Where it runs",
        them: "Meta’s cloud; initial US rollout described in announcement",
        us: "Your infrastructure, with model providers you select",
      },
      {
        area: "Reader’s task",
        them: "A managed personal proactive agent",
        us: "Build, share and govern agents across a company",
      },
      {
        area: "Operation",
        them: "Vendor-operated service; availability and plan conditions apply",
        us: "Apache-2.0 software; your team operates it and pays for infrastructure and models",
      },
    ],
    further: [
      {
        title: "A platform for the team",
        body: "Shared Projects, visual workflows and virtual tables connect people, agents and structured work. Configure budgets and tool approval policies, then inspect runs.",
      },
    ],
    enough: [
      "You want a managed personal assistant without running an agent platform.",
      "You meet the vendor’s availability and plan requirements.",
    ],
    together:
      "No direct interoperability is asserted. Compare the same task with synthetic inputs before choosing; these pages do not report a hands-on account test.",
    faq: [
      {
        q: "Is this a benchmark?",
        a: "No. This compares vendor documentation with AgenticOS v1.35.0. It does not establish answer quality, feature parity or comparative security.",
      },
    ],
    guide: "https://vstorm-co.github.io/agenticos/about/muse/",
    scene: "lake",
    screens: [SCREENS.builder, SCREENS.approvals],
  },
  {
    slug: "claude-duet",
    name: "Claude Duet",
    checkedDate: "2 November 2026",
    metaTitle: "AgenticOS vs Claude Duet",
    description:
      "Compare Claude Duet with AgenticOS: a managed personal cloud agent or a self-hosted platform for a company’s AI teammates.",
    lead: "Claude Duet is Anthropic’s proactive cloud agent, announced on 21 October 2026. Its research preview starts with a waitlist for US Pro, Max and Ultra subscribers. It works across connected apps and keeps working while the user is away. Access and usage follow the preview’s plan conditions.",
    glance: [
      {
        area: "Where it runs",
        them: "Anthropic’s cloud; US waitlisted research preview",
        us: "Your infrastructure, with model providers you select",
      },
      {
        area: "Reader’s task",
        them: "A managed personal proactive agent",
        us: "Build, share and govern agents across a company",
      },
      {
        area: "Operation",
        them: "Vendor-operated service; availability and plan conditions apply",
        us: "Apache-2.0 software; your team operates it and pays for infrastructure and models",
      },
    ],
    further: [
      {
        title: "A platform for the team",
        body: "Shared Projects, visual workflows and virtual tables connect people, agents and structured work. Configure budgets and tool approval policies, then inspect runs.",
      },
    ],
    enough: [
      "You want a managed personal assistant without running an agent platform.",
      "You meet the vendor’s availability and plan requirements.",
    ],
    together:
      "No direct interoperability is asserted. Compare the same task with synthetic inputs before choosing; these pages do not report a hands-on account test.",
    faq: [
      {
        q: "Is this a benchmark?",
        a: "No. This compares vendor documentation with AgenticOS v1.35.0. It does not establish answer quality, feature parity or comparative security.",
      },
    ],
    guide: "https://vstorm-co.github.io/agenticos/about/claude-duet/",
    scene: "lake",
    screens: [SCREENS.builder, SCREENS.approvals],
  },
  {
    slug: "grok-bot",
    name: "Grok Bot",
    checkedDate: "2 November 2026",
    metaTitle: "AgenticOS vs Grok Bot: choose your AI teammate platform",
    description:
      "Grok Bot or AgenticOS? Compare managed cloud bots with a self-hosted company agent platform. Explore real screens, use cases and operating tradeoffs.",
    lead: "Grok Bot gives you managed AI teammates on persistent cloud computers. AgenticOS gives your team a self-hosted platform to build, share and operate its own agents. The important choice is who runs the workspace, how you configure it and what your task needs.",
    glance: [
      {
        area: "Who runs it",
        them: "Managed service on vendor-hosted bot computers",
        us: "Your team operates the deployment on infrastructure it chooses",
      },
      {
        area: "Working with agents",
        them: "Message persistent bots; connected apps, skills and routines",
        us: "Configure agents, shared Projects, visual workflows, tables and routines",
      },
      {
        area: "Models",
        them: "Models available through the vendor service and plan",
        us: "Configure model-provider profiles, including local-model endpoints",
      },
      {
        area: "Controls",
        them: "Approvals; audit logs, SCIM and MCP allowlist documented for Enterprise",
        us: "Roles, configured tool approvals, budgets and recorded runs in the open-source platform",
      },
      {
        area: "Operating cost",
        them: "Subscription entitlement and usage conditions depend on the plan",
        us: "Apache-2.0 software, with infrastructure, models and operation paid separately",
      },
      {
        area: "What to verify",
        them: "Your plan’s tools, admin controls and data-handling conditions",
        us: "Your resource grants, model and tool destinations, diagnostics and maintenance plan",
      },
    ],
    further: [
      {
        title: "Build around the team’s job",
        body: "Configure specialist agents with the knowledge, skills and tools a task needs. Bring people and agents into shared Projects, with project files and instructions that support the work.",
      },
      {
        title: "Draw the steps you already know",
        body: "Use visual workflows for explicit sequences, call an agent where interpretation is useful, and keep structured results in Virtual Tables. A repeatable process can sit beside a conversation.",
      },
      {
        title: "Choose the runtime, then inspect the work",
        body: "Select model-provider profiles, configure tool approvals and budgets, and inspect the resulting runs. Your team owns the configuration and needs to test its policies and failure paths.",
      },
    ],
    enough: [
      "You prefer a vendor-operated bot service to managing a deployment and its updates.",
      "Its available apps, routines and desktop/mobile experience fit your task.",
      "You need its documented Enterprise administration features and have verified the relevant plan conditions.",
    ],
    together:
      "Try one bounded task before moving a setup. Recreate permitted instructions, reconnect tools, check an answer and test a rejected write. No automatic bot importer, transferred login session or direct Grok Bot integration is claimed.",
    faq: [
      {
        q: "Is AgenticOS a free version of Grok Bot?",
        a: "It is a different operating model. AgenticOS is Apache-2.0 software you host and operate. There is no software licence fee, but servers, model usage and maintenance still cost money. Grok Bot is a managed service with its own plan and usage conditions.",
      },
      {
        q: "Does Grok Bot have enterprise controls?",
        a: "Yes. Its current documentation includes Enterprise audit logs, OpenTelemetry export, SCIM and an MCP allowlist. Compare the policies your organization actually needs; this is not a claim that only AgenticOS offers controls.",
      },
      {
        q: "Can I choose models in AgenticOS?",
        a: "You configure model-provider profiles and connect agents to them, including supported local-model endpoints. Model availability, capability support and running costs depend on that configuration.",
      },
      {
        q: "Can I move my existing bots automatically?",
        a: "No automatic Grok Bot importer or login-session transfer is claimed. Start with a small manual task migration and verify tools, permissions and outputs before expanding it.",
      },
      {
        q: "Were both products benchmarked?",
        a: "No. Vendor claims are based on the documentation linked in the full guide. The AgenticOS images are product captures with illustrative data, not measured customer outcomes or evidence of a head-to-head quality advantage.",
      },
    ],
    guide: "https://vstorm-co.github.io/agenticos/about/grok-bot/",
    scene: "meadow",
    screens: [SCREENS.builder, SCREENS.approvals],
  },
  {
    slug: "openbot",
    name: "OpenBot",
    checkedDate: "2 November 2026",
    metaTitle: "AgenticOS vs OpenBot",
    description:
      "Compare OpenBot and AgenticOS: deployment, team work, operation and the scope of a self-hosted AI agent platform.",
    lead: "OpenBot is the local-first teammate workspace at openbot.run, with desktop, team server and hosting options. It supports several agent providers. AgenticOS is an Apache-2.0 company agent platform with shared Projects, visual workflows and governance controls. Compare the actual deployment and license terms you need.",
    glance: [
      {
        area: "Deployment",
        them: "Local computer, team server or hosted option",
        us: "Your infrastructure and selected model providers",
      },
      {
        area: "Scope to check",
        them: "Source-available; repository license: PolyForm Noncommercial 1.0.0",
        us: "Apache-2.0; infrastructure and model costs are separate",
      },
      {
        area: "Work",
        them: "Shared team workspace, files and agent handoffs, using connected providers",
        us: "Versioned agents, shared Projects, visual workflows, virtual tables and routines",
      },
    ],
    further: [
      {
        title: "Choose the operating model",
        body: "Configure the team’s agents, knowledge and tools, set approval policies and budgets, and inspect runs. Self-hosting also means your team owns deployment and maintenance.",
      },
    ],
    enough: [
      "Its desktop workspace and provider integrations fit your task and licensing requirements.",
      "Choose on the exact task, tool support and operating requirements; no answer-quality advantage is claimed.",
    ],
    together:
      "Treat migration as a small manual experiment: recreate permitted instructions, reconnect tools and verify a read and a rejected write. No automatic importer, transferred login session or direct interoperability is promised.",
    faq: [
      {
        q: "Were both products tested together?",
        a: "No. These pages compare documented capabilities. The linked guide names its own baseline; assess the current vendor conditions and test your task before changing systems.",
      },
    ],
    guide: "https://vstorm-co.github.io/agenticos/about/openbot/",
    scene: "meadow",
    screens: [SCREENS.builder, SCREENS.approvals],
  },
  {
    slug: "openai-dots",
    name: "OpenAI dots",
    checkedDate: "2 November 2026",
    metaTitle: "AgenticOS vs OpenAI dots",
    description:
      "Compare OpenAI dots and AgenticOS: deployment, team work, operation and the scope of a self-hosted AI agent platform.",
    lead: "A dot is an always-on personal agent in ChatGPT. It works on its own cloud computer, uses permitted connected apps and can delegate work while you keep talking. AgenticOS is a self-hosted company platform for configuring, sharing and governing agents. This is a documentation comparison, not a tested account benchmark.",
    glance: [
      {
        area: "Deployment",
        them: "OpenAI cloud; optional connected local computer has separate availability requirements",
        us: "Your infrastructure and selected model providers",
      },
      {
        area: "Scope to check",
        them: "Gradual rollout to eligible accounts; plan, region and workspace conditions apply",
        us: "Apache-2.0; infrastructure and model costs are separate",
      },
      {
        area: "Work",
        them: "Ongoing personal responsibilities, permitted connected apps and delegated cloud threads",
        us: "Versioned agents, shared Projects, visual workflows, virtual tables and routines",
      },
    ],
    further: [
      {
        title: "Choose the operating model",
        body: "Configure the team’s agents, knowledge and tools, set approval policies and budgets, and inspect runs. Self-hosting also means your team owns deployment and maintenance.",
      },
    ],
    enough: [
      "You want an ongoing personal agent in ChatGPT without operating an agent platform.",
      "Choose on the exact task, tool support and operating requirements; no answer-quality advantage is claimed.",
    ],
    together:
      "Treat migration as a small manual experiment: recreate permitted instructions, reconnect tools and verify a read and a rejected write. No automatic importer, transferred login session or direct interoperability is promised.",
    faq: [
      {
        q: "Were both products tested together?",
        a: "No. These pages compare documented capabilities. The linked guide names its own baseline; assess the current vendor conditions and test your task before changing systems.",
      },
    ],
    guide: "https://vstorm-co.github.io/agenticos/about/openai-dots/",
    scene: "meadow",
    screens: [SCREENS.builder, SCREENS.approvals],
  },
  {
    slug: "kortix",
    name: "Kortix",
    checkedDate: "26 November 2026",
    metaTitle: "Kortix CompanyOS alternative under Apache-2.0",
    description:
      "Kortix CompanyOS moved to the Elastic License 2.0 and runs agent sessions in its cloud. AgenticOS is Apache-2.0 and runs every part on your servers.",
    lead: "Kortix CompanyOS describes a company as a git repository of agents, skills and connectors. AgenticOS describes itself in almost the same words, as a layer for a company's agents. The difference is in two places a legal or IT review checks first: the licence, and where agent sessions actually run.",
    glance: [
      {
        area: "Licence",
        them: "Elastic License 2.0 since 18 February 2026; Apache-2.0 before December 2025",
        us: "Apache-2.0",
      },
      {
        area: "Where it runs",
        them: "Kortix cloud, or self-hosted web, API and database with agent sessions in Kortix's cloud sandboxes",
        us: "Your infrastructure, including the sandbox; air-gapped setups are possible",
      },
      {
        area: "Spend control",
        them: "A budget per workspace that blocks or warns",
        us: "A monthly budget per agent and per organization, checked before each model request",
      },
      {
        area: "Sign-in and roles",
        them: "SAML, SCIM, groups and custom roles behind an Enterprise licence key",
        us: "OIDC SSO, LDAP and Kerberos, six roles and per-resource grants in every deployment",
      },
      {
        area: "Audit",
        them: "Locked archive; reading it needs Enterprise",
        us: "Tamper-evident audit log with CSV and JSONL export",
      },
      {
        area: "Channels",
        them: "Slack, Teams, Telegram, Discord, email; voice experimental",
        us: "Web chat, widget, hosted page, API, Slack, Teams, Telegram, Mattermost, Discord, Matrix, SMS, email, iMessage and telephone calls",
      },
    ],
    further: [
      {
        title: "A licence that lets you host it for others",
        body: "The Elastic License 2.0 forbids providing the software to third parties as a hosted or managed service and circumventing its licence key. The Kortix licence changed three times in under a year. AgenticOS is Apache-2.0: run it for every department, subsidiary or client, under your own brand.",
      },
      {
        title: "Self-hosting that keeps the work on your servers",
        body: "Kortix documents that a self-hosted install runs the web app, API and database while agent sessions keep running in its cloud sandboxes. In AgenticOS the sandbox is part of your deployment, and a fresh install sends no prompts or documents anywhere.",
      },
      {
        title: "A budget per agent, not per workspace",
        body: "One runaway agent cannot exhaust everyone's allowance: AgenticOS checks each agent's budget and the organization's cap before each model request, and delegated work spends the parent agent's budget.",
      },
    ],
    enough: [
      "You want a company described entirely as files in one git repository and edited with a coding agent.",
      "You need SAML or SCIM today and will buy the Enterprise licence key. AgenticOS has neither yet.",
    ],
    together:
      "Run the same document task in both, then watch outbound connections from the self-hosted server while an agent works, and give an agent a budget of a few cents. The results show where the work runs and what each product stops.",
    faq: [
      {
        q: "Is Kortix CompanyOS open source?",
        a: "Not under an OSI licence. Its repository moved to the Elastic License 2.0 on 18 February 2026, which forbids offering it as a hosted service and circumventing its licence key. AgenticOS is Apache-2.0.",
      },
      {
        q: "Can Kortix run fully on my own servers?",
        a: "According to its documentation, self-hosting runs the web app, API and database, while agent sessions still run in Kortix's cloud sandboxes. AgenticOS runs every part, including the sandbox, on your infrastructure.",
      },
    ],
    guide: guide("kortix"),
    scene: "lake",
    screens: [SCREENS.spend, SCREENS.approvals],
  },
  {
    slug: "lobehub",
    name: "LobeHub",
    checkedDate: "26 November 2026",
    metaTitle: "LobeHub alternative for governed team agents",
    description:
      "LobeHub puts agents in team chats under a licence with commercial conditions. AgenticOS is Apache-2.0, with budgets, approvals and Teams, email and phone.",
    lead: "LobeHub calls its product super-agents on your team: agents that join the chat tools a team already uses, with 90+ model providers, MCP, memory and a skill market. AgenticOS makes the same promise of agents in the team's channels. The differences are the licence, the governance around each agent and how many organizations one deployment serves.",
    glance: [
      {
        area: "Licence",
        them: "LobeHub Community License: Apache 2.0 with commercial conditions",
        us: "Apache-2.0",
      },
      {
        area: "Channels",
        them: "Discord, Slack, Telegram, LINE, WeChat, Feishu, DingTalk and others; no Microsoft Teams",
        us: "Web chat, widget, hosted page, API, Slack, Teams, Telegram, Mattermost, Discord, Matrix, SMS, email, iMessage and telephone calls",
      },
      {
        area: "Spend control",
        them: "A credit pool with usage tracking",
        us: "A monthly budget per agent and per organization, checked before each model request",
      },
      {
        area: "Approvals",
        them: "Confirmed by the person using the agent",
        us: "Decided by the people you choose, per capability, tool and MCP connection",
      },
      {
        area: "Roles and audit",
        them: "Business workspace plan; SAML on Enterprise",
        us: "Six roles, per-resource grants and a tamper-evident audit log in every deployment",
      },
      {
        area: "Pricing",
        them: "Personal plans $20 to $200 a month; workspace plans from $19.90 a month",
        us: "No licence or seat fee; model usage at your provider's rates",
      },
    ],
    further: [
      {
        title: "A licence without commercial conditions",
        body: "LobeHub may be used commercially without modifying its source code; developing and distributing a derivative work needs a commercial licence, and business features are not in the open-source build. AgenticOS is Apache-2.0.",
      },
      {
        title: "Governance on every agent",
        body: "Each AgenticOS agent has an owner, published versions, a budget checked before each model request and approvals routed to someone other than the person chatting, all in one audit log.",
      },
      {
        title: "Many organizations in one deployment",
        body: "AgenticOS organizations are tenants isolated in the schema, so one deployment serves several companies or departments.",
      },
    ],
    enough: [
      "You want a polished consumer-grade chat and a large skill market for a small team.",
      "Your teams work in LINE, WeChat, Feishu or DingTalk, which AgenticOS does not cover.",
    ],
    together:
      "Add one agent to the same Slack channel in both products, ask for a tool that needs approval and decide it as someone else, then cap the agent's budget at a few cents. Compare what each allows, refuses and logs.",
    faq: [
      {
        q: "Is LobeHub open source?",
        a: "Its code is public under the LobeHub Community License, which adds conditions to Apache 2.0: commercial use without modifying the code, and a commercial licence for distributing derivative works. AgenticOS is plain Apache-2.0.",
      },
      {
        q: "Can AgenticOS agents join team chats like LobeHub agents?",
        a: "Yes. A published agent answers in Slack, Microsoft Teams, Telegram, Mattermost, Discord and Matrix, and a linked user's requests run as that person.",
      },
    ],
    guide: guide("lobehub"),
    scene: "meadow",
    screens: [SCREENS.subagents, SCREENS.approvals],
  },
  {
    slug: "onyx",
    name: "Onyx",
    checkedDate: "26 November 2026",
    metaTitle: "Onyx alternative: governed agents, not only search",
    description:
      "Onyx is strong company search with agents; its enterprise controls sit in ee directories. AgenticOS gives every agent a budget, approvals and an audit log.",
    lead: "Onyx is an open-source AI platform built around company search: chat with any model over 40+ connectors, with agents, MCP and bots in Slack and Discord. AgenticOS starts from the agent, which has an owner, versions, a budget and approvals and answers in many channels.",
    glance: [
      {
        area: "Licence",
        them: "MIT, with ee directories that need a seat licence in production",
        us: "Apache-2.0",
      },
      {
        area: "Knowledge",
        them: "40+ connectors and strong retrieval",
        us: "Knowledge bases with parser control and syncing connectors; no reranker yet",
      },
      {
        area: "Spend control",
        them: "Per workspace on Business; per user and group on Enterprise",
        us: "A monthly budget per agent and per organization, checked before each model request",
      },
      {
        area: "Approvals",
        them: "Confirmed by the user in its Craft feature",
        us: "Decided by the people you choose, per capability, tool and MCP connection",
      },
      {
        area: "Tenancy",
        them: "One organization per self-hosted install",
        us: "Many organizations in one deployment",
      },
      {
        area: "Pricing",
        them: "Community free; Business $20 per user a month; Enterprise custom",
        us: "No licence or seat fee; model usage at your provider's rates",
      },
    ],
    further: [
      {
        title: "An agent is an object with an owner",
        body: "An AgenticOS agent is a versioned spec: instructions, model, capabilities and budget, promoted through environments and exported as YAML. A business owner changes it and every change stays readable.",
      },
      {
        title: "Governance in the open-source product",
        body: "Onyx keeps SCIM, custom roles and per-user spending limits in Enterprise. AgenticOS ships budgets, approvals, the tamper-evident audit log and directory sign-in in every deployment.",
      },
      {
        title: "Channels beyond chat",
        body: "The same published agent answers in Microsoft Teams, email, SMS, telephone calls and a hosted page, and other agents reach it over A2A.",
      },
    ],
    enough: [
      "Search across many SaaS sources is the main job and its connectors cover your systems.",
      "One organization per install is enough and per-seat pricing suits you.",
    ],
    together:
      "Connect the same source in both and ask the same questions. Then give an agent a harmless tool, require a second person's approval and cap its budget at a few cents.",
    faq: [
      {
        q: "Is Onyx open source?",
        a: "Most of it is MIT. Code in its ee directories is under the Onyx Enterprise License, which needs a seat licence for production use. AgenticOS is Apache-2.0 throughout.",
      },
      {
        q: "Does AgenticOS replace enterprise search?",
        a: "It answers from synced knowledge bases, but its focus is agents that act. If search across dozens of SaaS tools is the main need, compare connector coverage first.",
      },
    ],
    guide: guide("onyx"),
    scene: "lake",
    screens: [SCREENS.builder, SCREENS.approvals],
  },
  {
    slug: "open-webui-librechat",
    name: "Open WebUI and LibreChat",
    checkedDate: "26 November 2026",
    metaTitle: "Open WebUI and LibreChat alternative for company agents",
    description:
      "Open WebUI and LibreChat give people a self-hosted chat. AgenticOS gives the company agents with owners, budgets, approvals and channels beyond the chat window.",
    lead: "Open WebUI and LibreChat are the self-hosted chat interfaces IT usually deploys first, so people stop pasting company data into personal AI accounts. AgenticOS answers a different question: which agents does the company own, who is responsible for them and what may they spend.",
    glance: [
      {
        area: "Licence",
        them: "Open WebUI: BSD-3 with a branding clause above 50 users. LibreChat: MIT, admin panel AGPL-3.0",
        us: "Apache-2.0",
      },
      {
        area: "Sign-in",
        them: "Open WebUI: OIDC, LDAP, SCIM. LibreChat: OIDC, SAML, LDAP",
        us: "OIDC SSO, LDAP and Kerberos; no SAML or SCIM yet",
      },
      {
        area: "Spend control",
        them: "Open WebUI: not described. LibreChat: token balance per user",
        us: "A monthly budget per agent and per organization, checked before each model request",
      },
      {
        area: "Agent lifecycle",
        them: "Models, presets and agents with access lists",
        us: "Published versions, environments, eval runs and YAML export",
      },
      {
        area: "Channels",
        them: "Their own web interface; LibreChat has Slack in beta",
        us: "Web chat, widget, hosted page, API, Slack, Teams, Telegram, Mattermost, Discord, Matrix, SMS, email, iMessage and telephone calls",
      },
    ],
    further: [
      {
        title: "A chat window is not an agent the company owns",
        body: "In AgenticOS an agent has an owner, a published version, environments, eval runs and a spec that exports as YAML. When it changes, you know who changed it, can test it first and can roll back.",
      },
      {
        title: "Spend and approvals per agent",
        body: "A budget stops an agent's next model request at its cap, and a tool call can wait for approval by someone other than the person chatting, with every decision in a tamper-evident audit log.",
      },
      {
        title: "The same agent where people already work",
        body: "A published agent answers in Slack, Teams, email, a website widget and over the API, with desktop and phone apps for quick asks and approvals.",
      },
    ],
    enough: [
      "You need a company chat with model choice for every employee, and agents with owners and budgets are not the goal yet.",
      "You need SAML or SCIM today. AgenticOS has neither yet.",
    ],
    together:
      "Many teams keep a chat interface for everyday use and run governed agents in AgenticOS beside it, reachable over the HTTP API and as an MCP server.",
    faq: [
      {
        q: "Is AgenticOS a self-hosted ChatGPT like Open WebUI?",
        a: "It includes web chat, but it is built around company agents, each with an owner, versions, a budget, approvals and channels. Open WebUI and LibreChat are built around the chat interface itself.",
      },
      {
        q: "Can I keep Open WebUI and add AgenticOS?",
        a: "Yes. Keep the chat interface and run governed agents in AgenticOS, which answers over the HTTP API, Slack, Teams and the other surfaces.",
      },
    ],
    guide: guide("open-webui-librechat"),
    scene: "meadow",
    screens: [SCREENS.builder, SCREENS.spend],
  },
  {
    slug: "agno",
    name: "Agno AgentOS",
    checkedDate: "26 November 2026",
    metaTitle: "AgenticOS vs Agno AgentOS: different products",
    description:
      "AgenticOS and Agno AgentOS share a similar name, not code. Compare a Python framework with a hosted control plane with an Apache-2.0 platform for companies.",
    lead: "Agno is a Python agent framework with a runtime called AgentOS and a control plane sold as a service. AgenticOS, by Vstorm, is a complete application for a company's agents: a browser console for business teams, governance and channels, all under Apache-2.0 on your servers.",
    glance: [
      {
        area: "Who builds agents",
        them: "Developers, in Python",
        us: "Business teams in a browser; engineers extend it with capabilities in code",
      },
      {
        area: "Licence",
        them: "Apache-2.0 framework and runtime; closed control plane",
        us: "Apache-2.0 for the whole application",
      },
      {
        area: "Where it runs",
        them: "Runtime on your servers; control plane as SaaS, self-hosted as an Enterprise add-on",
        us: "Your infrastructure, every part",
      },
      {
        area: "Spend control and tenancy",
        them: "Budgets not described; opt-in per-user data isolation for multi-tenant deployments",
        us: "Budgets per agent and per organization; many organizations in one deployment",
      },
      {
        area: "Pricing",
        them: "Pro $150 a month for one connection and three seats; SAML +$300 a month",
        us: "No licence or seat fee; model usage at your provider's rates",
      },
    ],
    further: [
      {
        title: "A product for the business, not only for developers",
        body: "With Agno an agent is Python code. In AgenticOS a business owner writes instructions, switches on capabilities, binds knowledge and publishes a version; configuration can only reach what engineers registered.",
      },
      {
        title: "The whole application is open source",
        body: "Agno's control plane is a hosted product, and running it yourself is an Enterprise add-on. Every part of AgenticOS, including the console, governance and channels, is Apache-2.0.",
      },
    ],
    enough: [
      "Your team writes agents in Python and wants a framework with a runtime, not a console for business users.",
      "You need WhatsApp today; AgenticOS has no WhatsApp channel.",
    ],
    together:
      "AgenticOS runs on Pydantic AI and connects to outside agents over A2A and to tools over MCP, so agents built elsewhere can sit beside governed AgenticOS agents.",
    faq: [
      {
        q: "Is AgenticOS the same as Agno AgentOS?",
        a: "No. AgenticOS is an Apache-2.0 application for company agents maintained by Vstorm at github.com/vstorm-co/agenticos. Agno AgentOS is the runtime of the Agno Python framework. They share no code.",
      },
    ],
    guide: guide("agno"),
    scene: "lake",
    screens: [SCREENS.builder, SCREENS.subagents],
  },
  {
    slug: "openagents",
    name: "OpenAgents",
    checkedDate: "26 November 2026",
    metaTitle: "OpenAgents alternative: build and govern your agents",
    description:
      "OpenAgents coordinates agents built elsewhere in a shared workspace. AgenticOS builds and governs the company's own agents, with budgets, audit and sign-in.",
    lead: "OpenAgents calls itself a collaboration OS for people and AI agents: shared threads, a browser, issues and routines, with around 27 agent runtimes such as Claude Code, Codex and Cursor plugged in. Both products are Apache-2.0, self-hosted and have desktop and phone apps. OpenAgents coordinates agents built elsewhere; AgenticOS builds, runs and governs the company's own.",
    glance: [
      {
        area: "What it is",
        them: "A shared workspace for people and agents from many runtimes",
        us: "A platform where a business team builds, publishes and governs company agents",
      },
      {
        area: "Licence",
        them: "Apache-2.0",
        us: "Apache-2.0",
      },
      {
        area: "Spend control",
        them: "Not described",
        us: "A monthly budget per agent and per organization, checked before each model request",
      },
      {
        area: "Sign-in and audit",
        them: "Roles on self-hosted; SSO and audit not described",
        us: "OIDC SSO, LDAP, Kerberos, six roles and a tamper-evident audit log",
      },
      {
        area: "Coding agents",
        them: "About 27 CLIs with their own keys",
        us: "Claude Code, Codex and other runtimes in the desktop app; the coding agent in a sandbox",
      },
    ],
    further: [
      {
        title: "Separate agents, each with an owner",
        body: "Instead of one assistant expected to do everything, a company builds several narrow agents, each with instructions, a model profile, capabilities, a budget and an owner, and sees which one did what.",
      },
      {
        title: "Governance a company review asks for",
        body: "AgenticOS checks spend before each model request, writes every action to a tamper-evident audit log, signs people in through the company directory and serves many organizations from one deployment.",
      },
    ],
    enough: [
      "Your people already use many coding agents and want one shared room for them.",
      "You want to coordinate agents rather than build and govern them.",
    ],
    together:
      "AgenticOS is an MCP server and speaks A2A, so a governed AgenticOS agent can be reached from another workspace while its budget, approvals and audit stay in AgenticOS.",
    faq: [
      {
        q: "Is OpenAgents an alternative to AgenticOS?",
        a: "Partly. Both are Apache-2.0 and self-hosted. OpenAgents is a collaboration layer for agents built elsewhere; AgenticOS builds and governs the agents, with budgets, approvals, audit and directory sign-in.",
      },
    ],
    guide: guide("openagents"),
    scene: "meadow",
    screens: [SCREENS.subagents, SCREENS.approvals],
  },
  {
    slug: "openhuman",
    name: "OpenHuman",
    checkedDate: "26 November 2026",
    metaTitle: "OpenHuman alternative for a whole organization",
    description:
      "OpenHuman is a fast GPL-3.0 agent harness for one person. AgenticOS is an Apache-2.0 platform for many agents with owners, roles, budgets and an audit log.",
    lead: "OpenHuman presents itself as the fastest and cheapest open-source agent harness, a Rust desktop app with memory, voice, desktop control, workflow graphs, 14 channels and 26 providers plus local models. AgenticOS is built for an organization rather than one person.",
    glance: [
      {
        area: "What it is",
        them: "A personal and developer agent harness, early beta",
        us: "A platform for company agents with a browser Builder",
      },
      {
        area: "Licence",
        them: "GPL-3.0",
        us: "Apache-2.0",
      },
      {
        area: "Spend control",
        them: "Cost of each call tracked",
        us: "A budget per agent and per organization, enforced before each model request",
      },
      {
        area: "Organization",
        them: "One person; no tenants, roles or SSO described",
        us: "Many organizations, six roles, per-resource grants, OIDC SSO, LDAP and Kerberos",
      },
      {
        area: "Audit",
        them: "Replayable run logs",
        us: "Tamper-evident audit log with CSV and JSONL export",
      },
    ],
    further: [
      {
        title: "Many narrow agents instead of one that does everything",
        body: "Each AgenticOS agent has a purpose, its own instructions, capabilities and budget, and a published version. You see which agent ran, what it cost and what it changed.",
      },
      {
        title: "A budget that stops, not only a counter",
        body: "AgenticOS refuses the next model request when an agent's budget or the organization's cap is reached, and delegated work spends the parent agent's budget.",
      },
    ],
    enough: [
      "One person or a developer wants the fastest local harness with desktop control.",
      "Raw efficiency on a small server matters more than roles, budgets and audit.",
    ],
    together:
      "Benchmarks measure a harness on coding tasks. For company use, add a second person with another role, run an agent past a budget of a few cents and require someone else's approval for a tool call.",
    faq: [
      {
        q: "Is OpenHuman an alternative to AgenticOS?",
        a: "For one person's agents, it can be. For a company, AgenticOS adds tenants, roles, directory sign-in, a budget enforced before each model request, approvals by someone else and an organization-wide audit log.",
      },
    ],
    guide: guide("openhuman"),
    scene: "lake",
    screens: [SCREENS.spend, SCREENS.subagents],
  },
  {
    slug: "diy-stack",
    name: "DIY stack",
    checkedDate: "26 November 2026",
    metaTitle: "AgenticOS vs a DIY stack of Open WebUI, LiteLLM and n8n",
    description:
      "Open WebUI, LiteLLM, Langfuse, n8n and Keycloak assembled by IT, or one Apache-2.0 application with budgets per agent, approvals and one audit log.",
    lead: "Many IT teams build company AI from well-known open-source parts: a chat interface, LiteLLM as a gateway with key budgets, Langfuse for traces, n8n for workflows and Keycloak for single sign-on. Every part is mature. AgenticOS integrates the same jobs in one application.",
    glance: [
      {
        area: "Spend limits",
        them: "LiteLLM budgets per key, team or tag",
        us: "A budget per agent and per organization, checked before each model request",
      },
      {
        area: "Permissions",
        them: "Separate users and roles in each part",
        us: "One permission model with six roles and per-resource grants",
      },
      {
        area: "Audit",
        them: "Separate logs per part",
        us: "One tamper-evident audit log",
      },
      {
        area: "Traces",
        them: "Langfuse",
        us: "Run history and cost, eval runs and Logfire export; no trace dashboard of its own",
      },
      {
        area: "Licences",
        them: "Sustainable Use (n8n), a branding clause (Open WebUI), enterprise directories (LiteLLM, Langfuse)",
        us: "Apache-2.0",
      },
      {
        area: "Upgrades",
        them: "Five or six release cycles",
        us: "One release and one changelog",
      },
    ],
    further: [
      {
        title: "An agent the whole stack knows about",
        body: "In a DIY stack the invoice agent's prompt sits in the chat interface, its key in LiteLLM, its traces in Langfuse and its workflow in n8n. In AgenticOS it is one versioned spec with an owner, a budget and approvals.",
      },
      {
        title: "A budget that knows which agent spent it",
        body: "LiteLLM refuses requests past a key's budget but does not know which agent, conversation or tool caused the cost. AgenticOS checks each agent's budget and charges delegated work to the delegating agent.",
      },
    ],
    enough: [
      "You already run most of the parts and need only a chat interface on top.",
      "You want Langfuse tracing and n8n's node library, and have the people to integrate them.",
    ],
    together:
      "Keep the parts you run: a LiteLLM proxy works as an AgenticOS model provider, and n8n can call AgenticOS agents over the HTTP API.",
    faq: [
      {
        q: "Can AgenticOS use our LiteLLM gateway?",
        a: "Yes. A model profile can point at a LiteLLM proxy, so your gateway's keys and routing stay in place while AgenticOS adds budgets per agent, approvals and audit.",
      },
      {
        q: "Does AgenticOS replace Langfuse?",
        a: "Not fully. AgenticOS records run history and cost, runs evaluations and exports traces to Logfire, but has no trace dashboard of its own.",
      },
    ],
    guide: guide("diy-stack"),
    scene: "meadow",
    screens: [SCREENS.spend, SCREENS.builder],
  },
  {
    slug: "langdock",
    name: "Langdock",
    checkedDate: "26 November 2026",
    metaTitle: "Langdock alternative without a seat fee",
    description:
      "Langdock is a German per-seat AI platform with strong governance. AgenticOS runs agents on your servers under Apache-2.0, with no seat fee.",
    lead: "Langdock is the most complete governance offering among European SaaS products: SAML and SCIM on every plan, custom roles, monthly limits per agent, approvals in workflows and agent evaluations, hosted on Azure in the EU. AgenticOS covers much of the same governance as open source on your own servers, and still lacks SAML, SCIM and custom roles.",
    glance: [
      {
        area: "Where it runs",
        them: "SaaS on Azure in the EU; single-tenant and on-premises for large contracts",
        us: "Your infrastructure, any cloud or on-premises",
      },
      {
        area: "Spend control",
        them: "Limits per workspace, person, group, agent and workflow",
        us: "A budget per agent and per organization, checked before each model request",
      },
      {
        area: "Sign-in and roles",
        them: "SAML and SCIM on every plan; up to five custom roles",
        us: "OIDC SSO, LDAP and Kerberos; six built-in roles; no SAML, SCIM or custom roles yet",
      },
      {
        area: "Licence",
        them: "Proprietary",
        us: "Apache-2.0",
      },
      {
        area: "Pricing",
        them: "€23.20 to €99 per user a month billed annually; workflows €449 per workspace a month",
        us: "No licence or seat fee; model usage at your provider's rates",
      },
    ],
    further: [
      {
        title: "No seat fee",
        body: "For 200 people, Langdock's published plans come to roughly €56,000 to €238,000 a year before workflow add-ons. AgenticOS has no seat fee; compare on your own usage, since seat plans include model usage within limits.",
      },
      {
        title: "Your servers, from the first user",
        body: "Langdock's dedicated and on-premises options are for large contracts. AgenticOS runs on your infrastructure from the start, with local models if you need them.",
      },
    ],
    enough: [
      "You need SAML, SCIM or custom roles today.",
      "You want a managed EU service with ISO 27001 and SOC 2 Type II reports and no servers to run.",
    ],
    together:
      "Run the same agent in both with a monthly limit of a few cents, route a tool call to a second person, then price a year for your headcount: seats against infrastructure and model usage.",
    faq: [
      {
        q: "Is AgenticOS a European alternative to Langdock?",
        a: "It is an open-source alternative you host wherever you choose, including in the EU or on-premises. Vstorm, which maintains it, is a Polish company.",
      },
      {
        q: "What does AgenticOS lack compared with Langdock?",
        a: "SAML and SCIM, custom roles and certifications for a managed service. You certify your own AgenticOS deployment; its security page maps the controls for a review.",
      },
    ],
    guide: guide("langdock"),
    scene: "lake",
    screens: [SCREENS.spend, SCREENS.approvals],
  },
  {
    slug: "dust",
    name: "Dust",
    checkedDate: "26 November 2026",
    metaTitle: "Dust alternative you host yourself",
    description:
      "Dust runs company agents in its own cloud, priced per seat. AgenticOS runs them on your servers under Apache-2.0, with a budget on every agent.",
    lead: "Dust calls itself a multiplayer operating system for enterprise AI: agents on company data, MCP as client and server, and agents in Slack, Teams, email and Zendesk. It is a hosted service in a US or EU region. AgenticOS offers agents for the same buyer on infrastructure you run.",
    glance: [
      {
        area: "Where it runs",
        them: "Dust's cloud, US or EU region; no self-hosting",
        us: "Your infrastructure, any cloud or on-premises",
      },
      {
        area: "Spend control",
        them: "Credit limits per person, group and API key",
        us: "A budget per agent and per organization, checked before each model request",
      },
      {
        area: "Audit",
        them: "Tamper-evident on Enterprise",
        us: "Tamper-evident in every deployment",
      },
      {
        area: "Pricing",
        them: "Pro €24, Max €120 per user a month billed annually",
        us: "No licence or seat fee; model usage at your provider's rates",
      },
    ],
    further: [
      {
        title: "Hosting you choose",
        body: "Dust runs only in its own cloud. AgenticOS runs where you deploy it, including on-premises and air-gapped, with local models if your data may not leave.",
      },
      {
        title: "Limits on the agent, not only on the person",
        body: "An AgenticOS agent that loops or is used heavily stops at its own budget without blocking anyone else.",
      },
    ],
    enough: [
      "You want a managed service that starts in minutes and have no team to run servers.",
      "SAML and SCIM are a requirement; AgenticOS has neither yet.",
    ],
    together:
      "Build the same agent on the same documents in both, cap its spend at a few cents, then ask your security team which of the two keeps every prompt and document inside your network.",
    faq: [
      {
        q: "Can Dust be self-hosted?",
        a: "Not according to its public pages: it runs in Dust's cloud, in a US or EU region, with single-tenant hosting on Enterprise. AgenticOS is self-hosted by design.",
      },
    ],
    guide: guide("dust"),
    scene: "meadow",
    screens: [SCREENS.builder, SCREENS.spend],
  },
  {
    slug: "mistral",
    name: "Mistral AI Studio",
    checkedDate: "26 November 2026",
    metaTitle: "Mistral AI Studio alternative with any model",
    description:
      "Mistral pairs its models with its platform. AgenticOS is an Apache-2.0 platform that runs Mistral and 27 other providers, on your own servers.",
    lead: "Mistral sells models and platform together: Le Chat Enterprise, no-code agents and AI Studio, in the cloud, serverless or self-hosted, under a strong European brand. AgenticOS adds another kind of sovereignty: the platform is open source and the choice of model stays yours, Mistral's included.",
    glance: [
      {
        area: "Models",
        them: "Mainly Mistral's",
        us: "28 providers, Mistral included, and local models",
      },
      {
        area: "Licence",
        them: "Proprietary platform; open-weight models",
        us: "Apache-2.0",
      },
      {
        area: "Governance",
        them: "A monthly spending limit per workspace, allow/ask/deny per tool, audit logs on Enterprise",
        us: "A budget per agent checked before each model request, an approvals queue and a tamper-evident audit log in every deployment",
      },
      {
        area: "Pricing",
        them: "Through sales",
        us: "No licence fee; model usage at your provider's rates",
      },
    ],
    further: [
      {
        title: "Sovereignty includes the choice of model",
        body: "AgenticOS runs agents behind a model profile with fallbacks. Switching a model changes one profile, not every agent.",
      },
      {
        title: "The platform itself is open",
        body: "Open weights do not make a platform open. Every part of AgenticOS is Apache-2.0.",
      },
    ],
    enough: [
      "You want one European vendor for both models and platform, under one contract.",
      "Mistral's models are your standard and its assistant covers what employees need.",
    ],
    together:
      "Mistral models work in AgenticOS like any other provider: keep them for most agents and route a few to another provider where it performs better.",
    faq: [
      {
        q: "Can AgenticOS use Mistral models?",
        a: "Yes. Mistral is a supported provider, and self-hosted open-weight models work through a custom endpoint on the model profile.",
      },
    ],
    guide: guide("mistral"),
    scene: "lake",
    screens: [SCREENS.builder, SCREENS.subagents],
  },
  {
    slug: "deepset",
    name: "deepset",
    checkedDate: "26 November 2026",
    metaTitle: "deepset alternative: open source all the way up",
    description:
      "deepset's Haystack Enterprise Platform is sovereign AI with EU public-sector references. AgenticOS is an open platform whose whole application is Apache-2.0.",
    lead: "deepset's Haystack Enterprise Platform calls itself the platform for sovereign AI. It runs in the cloud, self-hosted, air-gapped and on STACKIT, and powers AI@EC, the European Commission's AI platform. In AgenticOS the whole application, not only the framework, is Apache-2.0, and agents reach employees in their own channels.",
    glance: [
      {
        area: "Licence",
        them: "Proprietary platform; Haystack framework Apache-2.0",
        us: "Apache-2.0 for the whole application",
      },
      {
        area: "Where it runs",
        them: "Cloud, self-hosted, air-gapped; STACKIT since 15 October 2026",
        us: "Your infrastructure, including air-gapped",
      },
      {
        area: "Channels",
        them: "Applications and APIs built on the platform",
        us: "Slack, Teams, email, SMS, telephone calls, widget and API; desktop and phone apps",
      },
      {
        area: "References",
        them: "European Commission (AI@EC); partners Celonis, HPE, NTT DATA, Materna",
        us: "Earlier stage: no comparable public-sector reference yet",
      },
    ],
    further: [
      {
        title: "Open source all the way up",
        body: "A public body or integrator can audit every control in AgenticOS and keep running the code if the vendor relationship ends.",
      },
      {
        title: "No sales process to start",
        body: "Install AgenticOS from its repository and run a pilot on your own hardware today.",
      },
    ],
    enough: [
      "You need a vendor with public-sector references or a ready presence on STACKIT.",
      "Your team builds retrieval pipelines in Haystack and wants a managed platform around them.",
    ],
    together:
      "AgenticOS runs with Docker Compose or its Helm chart on any infrastructure that provides the resources it needs. Validate a specific European cloud before relying on it; no STACKIT deployment is documented yet.",
    faq: [
      {
        q: "Is AgenticOS a sovereign AI platform like deepset?",
        a: "Both run on your infrastructure, including air-gapped, with any model. In AgenticOS the whole application is Apache-2.0; at deepset the framework is open and the platform proprietary.",
      },
    ],
    guide: guide("deepset"),
    scene: "meadow",
    screens: [SCREENS.approvals, SCREENS.builder],
  },
  {
    slug: "slack-agents",
    name: "Claude Tag / Slackbot",
    checkedDate: "26 November 2026",
    metaTitle: "AgenticOS vs Claude Tag and Slackbot",
    description:
      "Claude Tag and Slackbot put one vendor's agent in Slack. AgenticOS puts company agents in Slack, Teams, email and the phone, with any model, on your servers.",
    lead: "Claude Tag puts Anthropic's Claude in Slack channels as a shared team member, with spend limits per organization and channel. Slackbot became a personal agent that routes work to Agentforce and other agents. Both install in a click. AgenticOS puts the company's own agents in Slack too, and in Teams, email, SMS and the phone at the same time.",
    glance: [
      {
        area: "Where it works",
        them: "Slack",
        us: "Slack, Teams, Telegram, Mattermost, Discord, Matrix, SMS, email, iMessage, telephone calls, web chat and API",
      },
      {
        area: "Models",
        them: "Claude only, or Salesforce's choice",
        us: "28 providers; a different model per agent",
      },
      {
        area: "Spend control",
        them: "Claude Tag: per organization and per channel",
        us: "A budget per agent and per organization, checked before each model request",
      },
      {
        area: "Where it runs",
        them: "Anthropic's or Salesforce's cloud",
        us: "Your infrastructure",
      },
    ],
    further: [
      {
        title: "One agent in every tool",
        body: "Each vendor's agent lives in one product. A published AgenticOS agent answers in Slack, Teams, email, SMS and the phone with one set of instructions, one knowledge base, one budget and one audit log.",
      },
      {
        title: "Approvals where the request happens",
        body: "A tool call that needs a decision appears as buttons in the same chat, or in the console and the phone app, for the people you choose.",
      },
    ],
    enough: [
      "The whole company is on Slack and one model vendor, and a one-click install matters more than control.",
      "Nobody is available to deploy and operate a platform.",
    ],
    together:
      "An AgenticOS agent can run on Claude in Slack while another agent in Teams uses a different model, both writing to the same audit log.",
    faq: [
      {
        q: "Can AgenticOS use Claude in Slack like Claude Tag?",
        a: "Yes. An AgenticOS agent can run on Claude and answer in Slack, while another agent in Microsoft Teams runs on a different model, each with its own budget.",
      },
    ],
    guide: guide("slack-agents"),
    scene: "lake",
    screens: [SCREENS.approvals, SCREENS.spend],
  },
] as const satisfies readonly Comparison[];

export function findComparison(slug: string): Comparison | undefined {
  return comparisons.find((item) => item.slug === slug);
}
