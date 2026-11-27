import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";
import "./capability-art.css";

import { ArrowCursor } from "@/components/arrow-cursor";
import { links, RELEASE, vstorm } from "@/content";
import { PAGE_URL } from "@/lib/site";

// Vendored from the AgenticOS console (OFL 1.1), so the build never fetches a font.
const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "400 700" },
    { path: "./fonts/inter-latin-ext.woff2", weight: "400 700" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = localFont({
  src: [
    { path: "./fonts/bricolage-grotesque-latin.woff2", weight: "300 700" },
    { path: "./fonts/bricolage-grotesque-latin-ext.woff2", weight: "300 700" },
  ],
  variable: "--font-bricolage",
  display: "swap",
});

const geistMono = localFont({
  src: [{ path: "./fonts/geist-mono-latin.woff2", weight: "400 500" }],
  variable: "--font-geist-mono",
  display: "swap",
});

const title = "AgenticOS: open-source, self-hosted AI agent platform";
const description =
  "Open-source, self-hosted AI agent platform. Run governed AI agents on your servers, on 40+ model providers or the Claude and ChatGPT plans your team has.";
const ogImage = {
  url: "/images/og.jpg",
  width: 1200,
  height: 630,
  alt: "AgenticOS: put AI to work across your company",
};

export const metadata: Metadata = {
  metadataBase: new URL(`${PAGE_URL}/`),
  title: { default: title, template: "%s · AgenticOS" },
  description,
  applicationName: "AgenticOS",
  category: "technology",
  keywords: [
    "AgenticOS",
    "AI agents",
    "AI teammates",
    "AI agent platform for business",
    "self-hosted AI agents",
    "shadow AI",
    "use Claude subscription for agents",
    "ChatGPT subscription without API key",
    "Claude Code for teams",
    "ChatGPT Enterprise alternative",
    "Copilot Studio alternative",
    "open-source agent platform",
    "agent layer",
    "on-premise AI",
    "local LLM",
    "MCP",
    "Model Context Protocol",
    "RAG",
    "Pydantic AI",
    "AI governance",
    "Vstorm",
  ],
  authors: [{ name: "Vstorm", url: "https://vstorm.co" }],
  creator: "Vstorm",
  publisher: "Vstorm",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    url: "./",
    siteName: "AgenticOS",
    locale: "en_US",
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VstormCommunity",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/*
 * Structured data for search engines and answer engines: who makes it, what it
 * is and what it costs. Every value is a fact the page itself states; each page
 * adds its own FAQ.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vstorm.co/#organization",
      name: "Vstorm",
      url: "https://vstorm.co",
      logo: `${PAGE_URL}/vstorm-logo.svg`,
      email: vstorm.email,
      sameAs: [vstorm.linkedin, vstorm.x, vstorm.github],
      award: "Open Agentic AI Innovation Award 2026 — Agentic AI Foundation",
      subjectOf: {
        "@type": "Article",
        url: "https://aaif.io/blog/winners-of-the-first-aaif-annual-technical-excellence-awards",
      },
      memberOf: {
        "@type": "Organization",
        name: "Agentic AI Foundation",
        url: "https://aaif.io/",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${PAGE_URL}/#website`,
      url: `${PAGE_URL}/`,
      name: "AgenticOS",
      inLanguage: "en",
      publisher: { "@id": "https://vstorm.co/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${PAGE_URL}/#software`,
      name: "AgenticOS",
      description,
      url: `${PAGE_URL}/`,
      image: `${PAGE_URL}/images/og.jpg`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "AI agent platform",
      operatingSystem: "Web browser; desktop on macOS, Windows and Linux",
      softwareVersion: RELEASE,
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      downloadUrl: links.downloads,
      installUrl: links.install,
      softwareHelp: { "@type": "CreativeWork", url: links.docs },
      featureList: [
        "39 built-in capabilities: knowledge search with citations, a real web browser, a code sandbox, a coding agent (Claude Code or Codex), telephone calls, drawings, charts, apps, subagents, guardrails",
        "4,700+ MCP servers in the gallery",
        "Visual workflows, virtual tables, routines and voice calls",
        "40+ model providers, local models through Ollama and vLLM, and each person's own subscriptions: Claude (Pro, Max), ChatGPT (Codex), Google Antigravity, GitHub Copilot, Grok, Kimi Code and coding plan keys",
        "Projects: shared files, instructions and a sandbox, with several people and agents in one live chat",
        "Web chat, website widget, hosted page, HTTP API, WebSocket, Slack, Microsoft Teams, Mattermost, Telegram, Discord, Matrix, SMS, email, iMessage, telephone calls, desktop and phone apps",
        "Budgets checked before each model call, approvals, roles and groups, a hash-chained audit log",
        "Company sign-in through OIDC, LDAP and Kerberos",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Apache-2.0 licence; implementation by Vstorm on request",
      },
      author: { "@id": "https://vstorm.co/#organization" },
      sameAs: [links.repo, vstorm.agenticos],
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#2b2547",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Static, built from constants in this file; nothing a visitor sends reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <ArrowCursor />
      </body>
    </html>
  );
}
