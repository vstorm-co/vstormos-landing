import { SCREENS } from "@/compare";

/** Editorial framing, separate from the sourced vendor comparison records. */
export const comparisonStories = {
  "chatgpt-enterprise": {
    headline: "Your team’s AI.",
    emphasis: "One place to work.",
    intro:
      "Bring agents, company knowledge and the work they produce into a shared workspace your team operates.",
  },
  "claude-enterprise": {
    headline: "Your knowledge.",
    emphasis: "Ready for work.",
    intro:
      "Build agents around your team’s documents, tools and procedures, then give people a shared place to work with them.",
  },
  "copilot-studio": {
    headline: "Build the agent.",
    emphasis: "Own the platform.",
    intro:
      "Your tools, your model providers and your infrastructure. Put the agent beside the people and processes it works with.",
  },
  dify: {
    headline: "Build the agent.",
    emphasis: "Bring the team.",
    intro:
      "Choose the workspace around the agent: shared Projects, explicit workflows, reusable knowledge and work people can inspect.",
  },
  n8n: {
    headline: "Keep the flow.",
    emphasis: "Add teammates.",
    intro:
      "Use explicit automation where you know the steps, and give agents the tasks that need interpretation. Choose where the two meet.",
  },
  sauna: {
    headline: "AI teammates.",
    emphasis: "Made for your team.",
    intro:
      "Give the team agents built around its own knowledge and tools, with a workspace and operating model you can configure.",
  },
  "grok-bot": {
    headline: "Your AI team.",
    emphasis: "Your servers.",
    intro:
      "Build specialists around your company’s knowledge, let people work with them in shared Projects, and run the platform on infrastructure you choose.",
  },
  "openai-dots": {
    headline: "Your AI team.",
    emphasis: "Your workspace.",
    intro:
      "Move from a useful assistant to a shared place for your team’s agents, tools and results. Choose the operating model that fits.",
  },
  openbot: {
    headline: "Own the agent.",
    emphasis: "Bring the team.",
    intro:
      "Bring your company’s agents into one workspace, choose their models and tools, and keep the platform under your operation.",
  },
  muse: {
    headline: "Personal AI?",
    emphasis: "Meet team AI.",
    intro:
      "A personal assistant and a company agent platform solve different jobs. Explore what your team could build in a shared workspace.",
  },
  "claude-duet": {
    headline: "AI for your team.",
    emphasis: "A place to work.",
    intro:
      "Bring company knowledge, specialist agents and the people doing the work together on a platform you operate.",
  },
} as const;

export const comparisonExamples = [
  {
    id: "research",
    label: "A brief for the meeting",
    role: "Research & operations",
    title: "Ask the specialists. Get one brief.",
    body: "Let a lead agent bring together research and analysis from specialist agents. In this example, the brief names its sources and flags the missing financial inputs instead of inventing a margin.",
    steps: [
      "Define the question",
      "Connect specialist agents",
      "Review the combined brief",
    ],
    screen: SCREENS.subagents,
    guide: "projects/",
    linkLabel: "Explore shared Projects",
  },
  {
    id: "finance",
    label: "An analyst for your data",
    role: "Finance & reporting",
    title: "Give the question to an agent built for it.",
    body: "Configure a Finance Analyst with the capabilities the task needs. Open the draft test panel beside the Builder, try a sample question and check its answer before publishing.",
    steps: [
      "Choose the capabilities",
      "Try a sample question",
      "Check the result",
    ],
    screen: SCREENS.builder,
    guide: "howto/first-document-agent/",
    linkLabel: "Build your first agent",
  },
  {
    id: "app",
    label: "An app people can use",
    role: "Internal tools",
    title: "Make the output useful beyond the chat.",
    body: "Keep an interactive tool under a stable app link. This seeded Company Brain example connects six fictional source notes so a reader can explore the context; it is not a live retrieval or model call.",
    steps: [
      "Explore the knowledge map",
      "Read the source preview",
      "Share the reviewed app",
    ],
    screen: SCREENS.app,
    guide: "artifacts/",
    linkLabel: "Explore agent-built apps",
  },
] as const;
