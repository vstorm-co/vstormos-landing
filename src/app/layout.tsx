import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";
import "./capability-art.css";

import { ArrowCursor } from "@/components/arrow-cursor";
import { faq, links, RELEASE, vstorm } from "@/content";
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

const title = "AgenticOS: open-source AI teammates for your company";
const description =
  "The self-hosted agent layer: build, run and govern AI agents on your own infrastructure. Chat, apps, a real browser, 4,700+ MCP servers and an API, with budgets, approvals and a recorded run. Apache-2.0, built on Pydantic AI by Vstorm.";
const ogImage = { url: "/images/og.jpg", width: 1200, height: 630, alt: "AgenticOS: put AI to work across your company" };

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
    "self-hosted AI agents",
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
  twitter: { card: "summary_large_image", site: "@VstormCommunity", title, description, images: [ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

/*
 * Structured data for search engines and answer engines: who makes it, what it
 * is, what it costs, and the FAQ the page answers. Every value is a fact the
 * page itself states.
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
      memberOf: { "@type": "Organization", name: "Agentic AI Foundation", url: "https://aaif.io/" },
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
      operatingSystem: "Linux, macOS, Windows (WSL2)",
      softwareVersion: RELEASE,
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      downloadUrl: links.repo,
      installUrl: links.install,
      softwareHelp: { "@type": "CreativeWork", url: links.docs },
      featureList: [
        "29 built-in capabilities: knowledge search with citations, a real web browser, a code sandbox, a coding agent (Claude Code or Codex), drawings, charts, apps, subagents, guardrails",
        "4,700+ MCP servers in the gallery",
        "28 model providers, including a ChatGPT subscription and local models through Ollama and vLLM",
        "Projects: shared files, instructions and a sandbox, with several people and agents in one live chat",
        "8 surfaces: web chat, website widget, hosted page, HTTP API, WebSocket, Slack, Mattermost, Telegram",
        "Budgets checked before each model call, approvals, roles and groups, a hash-chained audit log",
        "Company sign-in through OIDC, LDAP and Kerberos",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Apache-2.0 licence; implementation by Vstorm on request" },
      author: { "@id": "https://vstorm.co/#organization" },
      sameAs: [links.repo, vstorm.agenticos],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}/#faq`,
      mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#2b2547",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${geistMono.variable}`}>
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
