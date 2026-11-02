import { links } from "@/content";

export type UseCaseGuide = {
  slug: string;
  metaTitle: string;
  label: string;
  title: string;
  emphasis: string;
  description: string;
  image: string;
  alt: string;
  caption: string;
  input: string;
  result: string;
  check: string;
  steps: { title: string; body: string }[];
  questions: { q: string; a: string }[];
  guide: string;
  guideLabel: string;
  related: { label: string; href: string }[];
};

export const useCaseGuides: readonly UseCaseGuide[] = [
  {
    slug: "company-knowledge-assistant",
    metaTitle: "Company knowledge assistant: self-hosted RAG and LLM wiki",
    label: "Self-hosted RAG · LLM wiki",
    title: "Give company knowledge",
    emphasis: "a useful answer.",
    description:
      "Build a company knowledge assistant with AgenticOS. Use RAG for document retrieval and a Project for maintained wiki notes, sources and shared instructions.",
    image: "/screens/highlight-app.webp",
    alt: "Company Brain demo app showing linked knowledge notes and a source preview",
    caption:
      "Company Brain is an interactive app with fictional notes and prepared answers. This preview does not perform retrieval or demonstrate a successful RAG run.",
    input:
      "A small handbook or research collection, a question it answers and a question it cannot answer.",
    result:
      "A document assistant you can test, plus a Project where sources, linked notes and an index can be maintained across chats.",
    check:
      "Inspect the source behind an answer. Ask about an absent policy, then change a source and check that obsolete material is no longer used.",
    steps: [
      {
        title: "Choose retrieval, a wiki, or both",
        body: "RAG finds material for a question; a maintained wiki organizes what the team has learned. In AgenticOS, knowledge collections provide indexed retrieval. Projects keep files and instructions across chats. One does not automatically create the other.",
      },
      {
        title: "Start with one checkable document",
        body: "Configure a compatible embedding model, create a collection and upload a small source. Wait for processing, then bind only that collection to the test agent. An available chat model alone is not an ingestion setup.",
      },
      {
        title: "Give continuing research a home",
        body: "For a wiki, agree a Project structure: sources/, inbox/, notes/, index.md and a change log. Ask Architect to plan it and inspect the proposal before approving. Creating a Project does not write all those files or schedule updates.",
      },
      {
        title: "Test the answer and the missing answer",
        body: "Ask who handles a request, what information is required and what the document leaves unspecified. Inspect retrieval and citations. Repeat after a source change; do not assume that uploading the same filename replaces old vectors.",
      },
    ],
    questions: [
      {
        q: "Is an LLM wiki the same as RAG?",
        a: "No. A wiki is a maintained set of linked notes and source records. RAG retrieves relevant material at question time. You can use a Project to maintain the wiki and a knowledge collection to add retrieval.",
      },
      {
        q: "Does self-hosting keep every document local?",
        a: "Only when the full processing path is configured that way. External embedding models, parsers, chat models and tools may receive data. Choose providers and deployment settings for the actual document policy.",
      },
      {
        q: "Does every chat know the other chats?",
        a: "Project files and instructions are shared context. Other chat transcripts are not automatically supplied as model context, even when members can open them in the interface.",
      },
    ],
    guide: `${links.docs}howto/first-document-agent/`,
    guideLabel: "Build a document assistant",
    related: [
      { label: "Plan an LLM wiki in Projects", href: links.projects },
      {
        label: "Configure ingestion and parsers",
        href: `${links.docs}file-processing/`,
      },
    ],
  },
  {
    slug: "ai-shopping-assistant",
    metaTitle: "AI shopping assistant for your website: catalog and widget",
    label: "AI shopping assistant · Website widget",
    title: "Help a shopper choose",
    emphasis: "from your catalog.",
    description:
      "Plan an AI shopping assistant for your website: catalog-based recommendations, a published agent widget and explicit boundaries for cart and order actions.",
    image: "/screens/highlight-shopping.webp",
    alt: "Trail Supply demo storefront with a trip selector, budget controls and a recommended backpack",
    caption:
      "Trail Supply is a fictional store app. Recommendations are deterministic, its bag is a demo and it contains no live agent widget, checkout or real orders.",
    input:
      "A maintained product catalog, a shopper's needs and constraints, and a clear policy for unavailable information.",
    result:
      "A visitor-facing agent that can answer within the catalog and policy you connect. Cart or order actions require a separately implemented store integration.",
    check:
      "Try a budget with no matching product, an unavailable specification and a request to act outside the agent's scope. Inspect the selected product and its source.",
    steps: [
      {
        title: "Make one shopping decision useful",
        body: "Start with a question such as which daypack suits a short hike within a budget. Choose the attributes needed to answer it. Treat inventory and prices as connected data that must be refreshed, rather than facts the model can invent.",
      },
      {
        title: "Connect only the required knowledge and tools",
        body: "Give the agent catalog and policy access. A suitable API or MCP connection can expose store operations, but a gallery listing is not a working integration. Configure authentication, allowed operations and failure behavior for your actual store.",
      },
      {
        title: "Publish the visitor-facing surface",
        body: "After testing the agent, use Availability → Website widget, configure Allowed sites and use the generated embed on your site. Review the public audience and tools before exposing it; a storefront visitor must not inherit internal company access.",
      },
      {
        title: "Keep a recommendation separate from an order",
        body: "First verify read-only recommendations. Adding to a real cart or placing an order needs store-specific tools, permissions and user confirmation appropriate to the action. The Trail Supply preview demonstrates the proposed interaction, not those integrations.",
      },
    ],
    questions: [
      {
        q: "Is this a ready-made Shopify or WooCommerce plugin?",
        a: "No. AgenticOS supplies agents and an embeddable website widget. Your catalog and commerce actions need a suitable configured integration. The demo storefront does not establish support for a particular commerce backend.",
      },
      {
        q: "Can I start with support questions instead?",
        a: "Yes. The support-widget tutorial uses a small fictional shipping and returns FAQ, tests a deliberate information gap and explains publishing the widget. It is a narrower first exercise than implementing purchases.",
      },
      {
        q: "Will the widget improve conversion?",
        a: "That requires a measured experiment in your store. The example does not establish conversion uplift, saved time or sales. Start by checking recommendation correctness and the handling of missing information.",
      },
    ],
    guide: `${links.docs}howto/support-widget/`,
    guideLabel: "Build and publish a website widget",
    related: [
      { label: "Widget availability and public API", href: links.channels },
      { label: "Control tools and permissions", href: links.permissions },
    ],
  },
  {
    slug: "ai-workspace-for-teams",
    metaTitle: "AI workspace for teams: shared Projects, files and agents",
    label: "AI workspace for teams · Shared Projects",
    title: "Give the whole team",
    emphasis: "the same starting point.",
    description:
      "Use AgenticOS Projects as a shared AI workspace for team briefs, files and instructions. Keep ongoing work together while giving agents focused responsibilities.",
    image: "/screens/highlight-launch-room.webp",
    alt: "Northwind Launch Room demo app showing launch tasks, owners, stages and a task brief",
    caption:
      "Northwind Launch Room is a seeded interactive app with fictional tasks. It illustrates a team deliverable; it is not proof that agents completed this launch or synchronized external task tools.",
    input:
      "A launch brief, owners, deadlines, source documents and the decisions a new teammate needs to understand.",
    result:
      "A Project with shared files and instructions, separate conversations and reusable artifacts the permitted team can inspect.",
    check:
      "Open a new chat in the Project and check the shared brief. Test access with another member; verify that the intended files are available without assuming every earlier transcript is in context.",
    steps: [
      {
        title: "Create a home for continuing work",
        body: "Use a Project for the launch, client engagement or monthly report. Add the common brief and instructions once. Choose a default agent for new chats; that default does not prevent other agents from answering there.",
      },
      {
        title: "Give specialists clear responsibilities",
        body: "Use focused agents for tasks such as reviewing a brief, researching a question or preparing a report. Their models, permitted tools and knowledge bindings remain agent configuration, rather than access inherited from a task label.",
      },
      {
        title: "Make decisions available as files",
        body: "Write accepted decisions and the current plan into Project files. A file written in one chat is available to later Project chats. The fact that a transcript is visible to a member does not make it automatic context for every agent.",
      },
      {
        title: "Turn the result into something reusable",
        body: "Use documents for written output or the Visuals capability for an interactive artifact, then inspect it before sharing. Check the artifact's data source and permissions. A static chart or prepared app is not automatically a live dashboard.",
      },
    ],
    questions: [
      {
        q: "Is this multiplayer AI?",
        a: "People and agents can work within shared Projects and conversations with configured access. Check the exact interaction you need: a persistent shared runtime or automatic awareness of every other chat should not be assumed.",
      },
      {
        q: "Can the team share knowledge across models?",
        a: "Project files and instructions are available to chats in that Project, while agents can use their configured model profiles. Each agent still needs the appropriate tools and knowledge permissions.",
      },
      {
        q: "Does creating a Project create the entire plan?",
        a: "No. Architect can propose or create a Project after approval. Creation does not execute the plan, write all planned files or start recurring work; those are separate actions to review.",
      },
    ],
    guide: links.projects,
    guideLabel: "Set up a shared Project",
    related: [
      { label: "Generate interactive visuals", href: links.visuals },
      { label: "Check team access", href: links.permissions },
    ],
  },
  {
    slug: "ai-workflow-automation",
    metaTitle: "AI workflow automation with agents and Virtual Tables",
    label: "AI workflow automation · Virtual Tables",
    title: "Turn a request",
    emphasis: "into tracked work.",
    description:
      "Build AI workflow automation with AgenticOS: typed steps, agent calls, MCP tools and Virtual Tables, with run history and a result someone can inspect.",
    image: "/screens/highlight-workflows.webp",
    alt: "AgenticOS visual workflow editor showing a 30-step illustrative revenue-operations draft",
    caption:
      "This 30-step revenue workflow is an illustrative draft. Its MCP connections are disabled placeholders, with no credentials or executed CRM operations.",
    input:
      "A small request or record, the fields the next person needs and a defined result to store.",
    result:
      "A published workflow version and a typed table holding results that people, agents and integrations can inspect under the same access rules.",
    check:
      "Run the smallest configured example first. Inspect each step's output and the resulting record, then test a missing field or failed tool call before expanding it.",
    steps: [
      {
        title: "Start with a runnable small template",
        body: "Public API → table prepares a configured draft and its table; Markdown notebook writes a note. The API template calls the public JSONPlaceholder sample service. They are starting points for inspection, not production CRM automations.",
      },
      {
        title: "Choose where AI belongs",
        body: "Keep known transformations explicit. Add an agent call where the request needs interpretation, and define the fields the next step expects. A visually connected canvas is not sufficient: node configuration, input bindings and execution behavior still need checking.",
      },
      {
        title: "Connect services deliberately",
        body: "MCP tool steps can call configured connections. The revenue draft illustrates Microsoft, Google, HubSpot, Salesforce and Slack tasks, but importing it does not authenticate those services or establish that every connector operation works.",
      },
      {
        title: "Store and inspect the result",
        body: "Use Virtual Tables for typed records such as leads or triage results. Publish the workflow version you will run, then inspect run history and the saved record. Read and write access is enforced by the table service, including agent tools and API calls.",
      },
    ],
    questions: [
      {
        q: "Do I need credentials for every demo node?",
        a: "You can inspect an illustrative draft without them. Executing provider operations needs configured connections and permissions. A separate six-node batch example was run locally on fictional names without models or external services; it is not the 30-step CRM draft.",
      },
      {
        q: "Should I use a workflow or an agent?",
        a: "Use explicit steps for a known sequence and an agent where interpretation or tool selection is useful. A workflow can include agent calls. Start from the required result and failure behavior, rather than making every step autonomous.",
      },
      {
        q: "Is a Virtual Table a spreadsheet integration?",
        a: "It is an AgenticOS typed record store with its own grid, views and service API. Connecting Google Sheets, Excel or a CRM is a separate integration, not something a table automatically synchronizes.",
      },
    ],
    guide: links.workflows,
    guideLabel: "Build your first workflow",
    related: [
      { label: "Store results in Virtual Tables", href: links.tables },
      { label: "Compare AgenticOS and n8n", href: "/compare/n8n/" },
    ],
  },
];

export function findUseCase(slug: string): UseCaseGuide | undefined {
  return useCaseGuides.find((guide) => guide.slug === slug);
}
