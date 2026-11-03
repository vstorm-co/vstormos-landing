import { ArrowUpRight, Check, Server } from "lucide-react";
import { ServiceIcon } from "@/components/brand-icon";
import { CopyButton } from "@/components/copy-button";
import { DesktopInstall } from "@/components/desktop-install";
import { SplitHeading } from "@/components/ui";
import { installCommand, links, RELEASE, REPO } from "@/content";

const serverStart = `git clone --branch v${RELEASE} --depth 1 ${REPO}.git\ncd agenticos\nbash scripts/server-init.sh`;
const setupBrief = "Please set up an AgenticOS workspace for our team. Deployment guide: https://vstorm-co.github.io/agenticos/deploy/. Start with a Linux server (4 vCPU, 8 GB RAM), Docker Engine 24+, Compose 2.24+ and make. Configure app and API hostnames, HTTPS, backups and the first owner account. Then share the workspace URL and arrange access to our chosen model provider.";

export function Quickstart() {
  return (
    <section id="quickstart" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <SplitHeading eyebrow="Get started" title="Set it up once." muted="Bring your team." body="Set up a workspace once. Then everyone joins from a browser or the desktop app. Already have a company workspace? Go straight to the app download." />
        <div className="install-paths mt-12">
          <article id="server-setup" className="install-panel install-server">
            <p className="install-kicker">01 / For your company</p>
            <h3>A workspace<br />on your server.</h3>
            <p className="install-description">Your IT team sets it up once. Colleagues get a web address and a login, with shared agents, knowledge and access controls.</p>
            <div className="install-server-visual" aria-hidden><Server size={28} /><span>YOUR COMPANY WORKSPACE</span><div><span>Browser</span><span>Desktop</span><span>Phone</span></div></div>
            <ul className="install-requirements">
              <li><Check size={15} aria-hidden />Linux server · 4 vCPU · 8 GB RAM to start</li>
              <li><Check size={15} aria-hidden />Docker Compose · app + API hostnames · HTTPS</li>
              <li><Check size={15} aria-hidden />Your own models or provider · hosting and usage costs apply</li>
            </ul>
            <a className="install-primary-link" href={links.deploy}>Open the server setup guide<ArrowUpRight size={16} aria-hidden /></a>
            <div className="install-handoff"><p>Want your IT team to handle it?</p><CopyButton text={setupBrief} label="Copy server setup brief for your IT team" tone="light" /></div>
            <details className="install-developer"><summary>For developers · start the server setup</summary><p>Run on a prepared Linux host with Git, Docker Compose and make. This prepares configuration; continue through the guide to configure HTTPS, start services and create the first account.</p><div className="install-command"><pre><code>{serverStart}</code></pre><CopyButton text={serverStart} label="Copy server configuration commands" tone="light" /></div><a href={links.deploy}>Continue with the deployment guide →</a></details>
            <p className="install-help">Prefer help with the rollout? <a href="https://vstorm.co/contact-us/">Talk to Vstorm<ArrowUpRight size={13} aria-hidden /></a></p>
          </article>
          <DesktopInstall />
        </div>
        <div className="install-connect"><span className="install-connect-number">3</span><p><strong>Open your workspace and sign in.</strong> Ask your team for its HTTPS address. The desktop app connects to that server; installing the app does not deploy a company workspace.</p><a href={links.desktop}>First launch<ArrowUpRight size={15} aria-hidden /></a></div>
        <aside className="install-mobile"><div><ServiceIcon name="apple" className="size-[18px]" /><ServiceIcon name="android" className="size-[20px]" /></div><p><strong>iPhone or Android?</strong> Open your workspace address in your phone’s browser. Add it to your home screen for quicker access.</p><a href={links.mobile}>Mobile setup<ArrowUpRight size={14} aria-hidden /></a></aside>
        <details className="install-local"><summary>Just exploring? Run a workspace on your own computer.</summary><p>For developers: install Docker Compose, then run this on macOS or Linux, or in WSL2 on Windows. It asks for your model provider, login and organization. Open <code>http://localhost:3000</code> when setup finishes. The desktop wizard can also guide you through creating a local instance.</p><div className="install-command"><pre><code>{installCommand}</code></pre><CopyButton text={installCommand} label="Copy local quickstart command" tone="light" /></div><a href={links.install}>Local installation guide →</a></details>
      </div>
    </section>
  );
}
