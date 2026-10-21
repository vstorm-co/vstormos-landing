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
export type Screen = { src: string; width: number; height: number; alt: string; caption: string };
/** The nature photograph behind the page's top band. */
export type Scene = "meadow" | "lake";

export type Comparison = {
  slug: string;
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

const SCREENS = {
  approvals: {
    src: "/screens/crop-approvals.webp",
    width: 1336,
    height: 760,
    alt: "The Approvals tab of the Activity page: a Sales Researcher waits to send an email and update a CRM deal, a Finance Analyst to create an invoice, each with Approve and Reject.",
    caption: "Approvals wait in one queue, for the people allowed to decide them.",
  },
  spend: {
    src: "/screens/crop-spend.webp",
    width: 1336,
    height: 760,
    alt: "The Spend tab of the Activity page: spend in the window, month to date, cost per run, the agent spending the most and a bar chart of spend per day.",
    caption: "What every agent spent, in your provider's currency, day by day.",
  },
  builder: {
    src: "/screens/highlight-builder-test.webp",
    width: 2400,
    height: 1500,
    alt: "A Finance Analyst agent in the builder: its toolbox of capabilities, switched on one by one, and a test chat beside it drawing a revenue chart.",
    caption: "An agent is built in the browser: capabilities switched on, tested in the chat beside them.",
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
    alt: "An ROI calculator an agent drew in the chat and saved as an app, with sliders for invoices, minutes per invoice and hourly cost.",
    caption: "What an agent builds can be saved as an app with its own link.",
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
      { area: "Where it runs", them: "OpenAI's cloud; storage residency in ten regions on Enterprise", us: "Your infrastructure" },
      { area: "Source", them: "Proprietary", us: "Apache-2.0" },
      { area: "Models", them: "OpenAI only", us: "28 providers, OpenAI included, and local models" },
      { area: "Building agents", them: "Workspace agents, in research preview, with versions and sharing", us: "Published agents with versions, environments and YAML export" },
      { area: "Surfaces for an agent", them: "ChatGPT, Slack, schedules, an API trigger", us: "Web chat, widget, hosted page, HTTP API, WebSocket, Slack, Telegram, Mattermost" },
      { area: "API", them: "The trigger queues a run; the answer cannot be retrieved through the API", us: "The run API returns the run and its answer" },
      { area: "Spend control", them: "Credit pools and overage limits", us: "A budget per agent and per organization, checked before each model request" },
      { area: "Identity and audit", them: "SAML SSO on Business; SCIM, role-based access and the Compliance API on Enterprise", us: "OIDC SSO, LDAP and Kerberos, roles with per-resource grants and a tamper-evident audit log, in every deployment" },
      { area: "Pricing", them: "Business from $20 per seat a month, billed annually; Enterprise custom; agent work paid in credits", us: "No licence fee; model usage at your provider's rates" },
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
        a: "For agents your organization owns, yes. It runs on your infrastructure, uses OpenAI or any other provider, and publishes each agent to eight surfaces with its own budget and run history. It does not replace ChatGPT as an assistant for every employee.",
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
      { area: "Unit of purchase", them: "A seat per employee", us: "A deployment; no seat fee" },
      { area: "Where it runs", them: "Anthropic's cloud", us: "Your infrastructure" },
      { area: "Source", them: "Proprietary", us: "Apache-2.0" },
      { area: "Models", them: "Claude only", us: "28 providers, Claude included, and local models" },
      { area: "What you build", them: "Projects, skills and plugins for people who chat", us: "Published agents, each a versioned spec" },
      { area: "Surfaces", them: "Web, desktop, mobile, Chrome, Microsoft 365, Slack through Claude Tag in beta", us: "Web chat, widget, hosted page, HTTP API, WebSocket, Slack, Telegram, Mattermost" },
      { area: "Who uses it", them: "Employees with a seat", us: "Employees, customers and systems, on eight surfaces" },
      { area: "Spend control", them: "Organization and user spend caps", us: "A budget per agent and per organization, checked before each model request" },
      { area: "Approvals", them: "The person running the task, or an automatic mode the organization may allow", us: "A run waits until a person allowed to decide approvals decides" },
      { area: "Audit log", them: "Enterprise only; 180 days of events", us: "Every deployment; tamper-evident, exported as CSV or JSONL" },
      { area: "Pricing", them: "Team from $20 per seat a month, billed annually; Enterprise $20 per seat plus usage at API rates, from 20 seats", us: "Model usage at your provider's rates, plus infrastructure" },
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
        a: "Yes. An agent answers through a website widget, a hosted page link, the HTTP API, Slack, Telegram or Mattermost, with no seat needed.",
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
      { area: "Where it runs", them: "Microsoft's cloud, in Power Platform environments", us: "Your infrastructure" },
      { area: "Source", them: "Proprietary", us: "Apache-2.0" },
      { area: "Models", them: "GPT and Claude models; Azure Foundry models billed separately", us: "28 providers, including local" },
      { area: "Billing", them: "$0.01 per Copilot Credit pay-as-you-go, or prepaid commit units at up to 20% off", us: "No licence fee; model usage at your provider's rates" },
      { area: "How usage is counted", them: "Credits per feature: a generative answer is 2, an agent action 5", us: "Model tokens, priced per provider" },
      { area: "Spend enforcement", them: "Monthly limits per agent; agents are disabled at 125% of prepaid capacity", us: "A budget per agent and per organization, checked before each model request" },
      { area: "Surfaces", them: "Teams, Microsoft 365, SharePoint, web, WhatsApp, voice", us: "Web chat, widget, hosted page, HTTP API, WebSocket, Slack, Telegram, Mattermost" },
      { area: "Identity", them: "Microsoft Entra ID", us: "OIDC SSO including Entra, LDAP and Kerberos" },
      { area: "Governance", them: "Power Platform data policies, Purview audit, Entra Agent ID", us: "Permission catalog, grants, approvals and a tamper-evident audit log" },
    ],
    further: [
      {
        title: "A bill you can predict from the model price",
        body: "Copilot Studio meters each feature in credits and adds a premium rate for reasoning models. AgenticOS records each run's model cost from a bundled price snapshot and checks the agent's budget before each model request.",
      },
      {
        title: "Any cloud, or none",
        body: "Microsoft notes that Anthropic models in its offerings are outside the EU Data Boundary. AgenticOS runs wherever you deploy it, on a provider in the region you need or on a model you run yourself, so prompts never leave your network.",
      },
      {
        title: "Microsoft identity without Microsoft hosting",
        body: "People sign in with Entra ID over OIDC, directory groups map to roles, collections sync from SharePoint and OneDrive, and agents work in Outlook, Teams and Word through Microsoft's own Work IQ MCP servers.",
      },
      {
        title: "Open where it matters to an auditor",
        body: "Copilot Studio's governance is strong inside Microsoft's stack. AgenticOS lets you read the controls themselves: the permission catalog, the vault, the audit log's hash chain and the refusal tests that run in CI. The spec exports as YAML, so leaving means keeping your agents, not rebuilding them.",
      },
    ],
    enough: [
      "Your agents belong in Teams and Microsoft 365 Copilot, and your users already hold Microsoft 365 Copilot licences.",
      "You need Power Platform connectors, agent flows, voice or WhatsApp. AgenticOS has no Teams, voice or WhatsApp channel.",
      "Purview, Sentinel and Power Platform data policies are how your organization governs everything else.",
    ],
    together:
      "Keep Copilot Studio for agents that live inside Microsoft 365 Copilot. Use AgenticOS for agents on your website, in Slack or behind your API, and for teams that want the model and the data under their own contract.",
    faq: [
      {
        q: "Is AgenticOS an alternative to Microsoft Copilot Studio?",
        a: "Yes, if you want to own the platform. AgenticOS runs on your infrastructure with any model provider and no credit meter. Copilot Studio fits better when agents live in Teams and Microsoft 365.",
      },
      {
        q: "Does AgenticOS work with Microsoft Entra ID and SharePoint?",
        a: "Yes. People sign in with Entra ID over OIDC, directory groups map to roles, and collections sync files from SharePoint and OneDrive.",
      },
      {
        q: "Can AgenticOS publish agents to Microsoft Teams?",
        a: "Not yet. It publishes to web chat, a widget, a hosted page, the HTTP API, a WebSocket, Slack, Telegram and Mattermost.",
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
      "n8n automates workflows with AI nodes under a Sustainable Use License. AgenticOS starts from the agent, under Apache-2.0, with budgets and approvals.",
    lead: "n8n is a workflow automation tool: you connect triggers, integrations and code steps on a canvas, and AI Agent nodes add models and tools. AgenticOS starts from the agent instead, with instructions, a model, capabilities, knowledge and a budget, published as a version and governed on the server.",
    glance: [
      { area: "Unit of work", them: "A workflow of nodes", us: "An agent, published as a versioned spec" },
      { area: "Licence", them: "Sustainable Use License; .ee files need an Enterprise licence", us: "Apache-2.0" },
      { area: "Where it runs", them: "Self-hosted or n8n Cloud in Frankfurt", us: "Your infrastructure" },
      { area: "Sign-in", them: "SSO on self-hosted Business and Enterprise, and Cloud Enterprise", us: "OIDC SSO, LDAP and Kerberos in every deployment" },
      { area: "Roles", them: "Projects and roles on paid plans", us: "Six roles and per-resource grants in every deployment" },
      { area: "Environments and version control", them: "Business and above", us: "Environments and YAML export in every deployment" },
      { area: "Spend control", them: "Execution quotas per plan", us: "A budget per agent and per organization, checked before each model request" },
      { area: "Audit", them: "Log streaming on Enterprise", us: "Tamper-evident audit log in every deployment" },
      { area: "Human approval", them: "Per tool, through nine review channels", us: "Per capability, per tool and per MCP connection, through a shared queue" },
      { area: "Pricing", them: "Community free; Cloud from €20 a month for 2,500 executions, billed annually; Business €667 a month, self-hosted", us: "No licence fee; model usage and infrastructure" },
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
        body: "Changing an n8n workflow means editing nodes on a canvas. An AgenticOS agent changes when its owner edits the instructions and publishes, and every version stays readable.",
      },
      {
        title: "Knowledge as a managed collection",
        body: "n8n builds retrieval from nodes: loaders, embeddings and a vector store you choose. AgenticOS keeps collections in your Postgres, with a choice of parser, OCR and image description, and sync connectors that remove what the source deleted.",
      },
    ],
    enough: [
      "The job is moving data between many systems, with branches, retries and schedules.",
      "You want its large integration library and visual canvas. AgenticOS has no workflow canvas.",
      "You need review channels such as Microsoft Teams, WhatsApp or Gmail, or its evaluation metrics.",
    ],
    together:
      "An n8n workflow can call an AgenticOS agent over the HTTP API and get the answer back, with the agent's budget checked and the run recorded. An AgenticOS webhook trigger can start an agent when n8n posts to it.",
    faq: [
      {
        q: "Is AgenticOS an open-source alternative to n8n?",
        a: "For AI agents, yes. AgenticOS is Apache-2.0, while n8n uses the Sustainable Use License. For moving data between many systems on a visual canvas, n8n fits better, and the two work well together.",
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
      { area: "How you build", them: "A visual canvas of workflow, chatflow and agent nodes", us: "Instructions, a model profile, capabilities, collections and a budget, published as a version" },
      { area: "Licence", them: "Apache 2.0 with added conditions on multi-tenant use and the logo", us: "Apache-2.0" },
      { area: "Tenancy", them: "One workspace; several workspaces are Enterprise", us: "Many organizations in one deployment" },
      { area: "Roles", them: "Four built-in roles; custom roles are Enterprise", us: "Six roles, 33 permissions and per-resource grants" },
      { area: "Sign-in", them: "Email; SSO is Enterprise", us: "Email, Google, OIDC SSO, LDAP and Kerberos" },
      { area: "Audit", them: "Enterprise", us: "Tamper-evident audit log with CSV and JSONL export" },
      { area: "Spend control", them: "Provider billing, or Cloud message credits", us: "A monthly budget per agent and per organization, checked before each model request" },
      { area: "Human approval", them: "A Human Input node in a workflow", us: "Per capability, per tool and per MCP connection; the run waits until someone decides" },
      { area: "Kubernetes", them: "Community Helm charts; official high availability is Enterprise", us: "Docker Compose on one host, with an external Postgres and more hosts documented; no Kubernetes manifests" },
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
        a: "No. AgenticOS builds agents from instructions, capabilities, knowledge and a budget, and handles multi-step work with delegation, planning and triggers. If a node canvas is how your team works, Dify fits better.",
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
      { area: "What you get", them: "One proactive assistant per person, with memory", us: "Any number of agents, each a versioned spec" },
      { area: "Where it runs", them: "Sauna's cloud; US infrastructure for US customers, and data may be processed in the US", us: "Your infrastructure" },
      { area: "Source", them: "Proprietary", us: "Apache-2.0" },
      { area: "Models", them: "Its own Lite model on Lite; all models from Basic", us: "28 providers, including local models" },
      { area: "Knowledge", them: "Files you drop in, memory it learns and the tools you connect", us: "Document collections in your Postgres, with parsing and chunking you choose" },
      { area: "Surfaces", them: "Web app, iOS app, iMessage, Slack, Gmail, Superhuman, email", us: "Web chat, widget, hosted page, HTTP API, WebSocket, Slack, Telegram, Mattermost" },
      { area: "Sharing", them: "Private by default; a company-wide shared brain on Team", us: "Six roles, 33 permissions and per-resource grants" },
      { area: "Autonomy", them: "Configurable, from suggesting actions to acting on its own", us: "Approvals per capability, per tool and per MCP connection" },
      { area: "Compliance evidence", them: "SOC 2 Type II, CASA", us: "Your controls on your infrastructure" },
      { area: "Pricing", them: "Free with 10 credits a day; Lite $29, Basic $99, Pro $299 and Team $999 a month, monthly only", us: "No licence fee; model usage and infrastructure" },
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
] as const satisfies readonly Comparison[];

export function findComparison(slug: string): Comparison | undefined {
  return comparisons.find((item) => item.slug === slug);
}
