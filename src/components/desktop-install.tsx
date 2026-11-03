"use client";

import { useId, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Check } from "lucide-react";
import { ServiceIcon, type LogoName } from "@/components/brand-icon";
import { CopyButton } from "@/components/copy-button";
import { links, RELEASE, REPO } from "@/content";

const systems = [
  { id: "mac", name: "macOS", icon: "apple" },
  { id: "windows", name: "Windows", icon: "windows" },
  { id: "linux", name: "Linux", icon: "linux" },
] as const satisfies ReadonlyArray<{ id: string; name: string; icon: LogoName }>;
type System = (typeof systems)[number]["id"];
const brewCommand = "brew install --cask vstorm-co/agenticos/agenticos";
const packages: Record<System, ReadonlyArray<{ name: string; detail: string; file: string }>> = {
  mac: [
    { name: "Mac · Apple silicon", detail: "M-series chips · DMG", file: `AgenticOS_${RELEASE}_aarch64.dmg` },
    { name: "Mac · Intel", detail: "Intel processor · DMG", file: `AgenticOS_${RELEASE}_x64.dmg` },
  ],
  windows: [
    { name: "Windows installer", detail: "64-bit · EXE · recommended", file: `AgenticOS_${RELEASE}_x64-setup.exe` },
    { name: "Windows · IT deployment", detail: "64-bit · MSI package", file: `AgenticOS_${RELEASE}_x64_en-US.msi` },
  ],
  linux: [
    { name: "Ubuntu / Debian", detail: "64-bit Intel / AMD · DEB", file: `AgenticOS_${RELEASE}_amd64.deb` },
    { name: "Fedora / RHEL", detail: "64-bit Intel / AMD · RPM", file: `AgenticOS-${RELEASE}-1.x86_64.rpm` },
    { name: "Other distributions", detail: "64-bit Intel / AMD · AppImage", file: `AgenticOS_${RELEASE}_amd64.AppImage` },
  ],
};

export function DesktopInstall() {
  const [system, setSystem] = useState<System>("mac");
  const instance = useId();
  return (
    <article id="desktop-install" className="install-panel install-desktop">
      <p className="install-kicker">02 / On your computer</p>
      <h3>Install the app.<br />Connect to your team.</h3>
      <p className="install-description">Choose your system, install AgenticOS and enter your company’s workspace address. Your team’s agents and projects are already there.</p>
      <div role="tablist" aria-label="Desktop operating system" className="install-os-tabs">
        {systems.map(({ id, name, icon }, index) => (
          <button key={id} id={`${instance}-${id}`} type="button" role="tab" aria-selected={system === id} aria-controls={`${instance}-panel`} tabIndex={system === id ? 0 : -1}
            onClick={() => setSystem(id)}
            onKeyDown={(event) => {
              const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
              const next = event.key === "Home" ? 0 : event.key === "End" ? systems.length - 1 : step ? (index + step + systems.length) % systems.length : null;
              if (next === null) return;
              event.preventDefault();
              const entry = systems[next];
              if (!entry) return;
              setSystem(entry.id);
              document.getElementById(`${instance}-${entry.id}`)?.focus();
            }}>
            <ServiceIcon name={icon} className="size-[18px]" />{name}
          </button>
        ))}
      </div>
      <div id={`${instance}-panel`} role="tabpanel" aria-labelledby={`${instance}-${system}`} className="install-os-panel">
        <div className="install-downloads">
          {packages[system].map(({ name, detail, file }) => (
            <a key={file} href={`${REPO}/releases/download/v${RELEASE}/${file}`} className="install-download">
              <span><strong>{name}</strong><small>{detail}</small></span><ArrowDownToLine size={18} aria-hidden />
            </a>
          ))}
        </div>
        {system === "mac" && <>
          <p className="install-os-tip">Which Mac? Apple menu → About This Mac. Look for an Apple M-series chip or an Intel processor.</p>
          <div className="install-brew"><span className="install-kicker">Or use Homebrew</span><div><code>{brewCommand}</code><CopyButton text={brewCommand} label="Copy Homebrew installation command" tone="light" /></div></div>
          <details className="install-note"><summary>Opening the app on macOS</summary><p>Drag the app from the DMG into Applications. Builds are not yet Apple-notarized; macOS may ask you to allow opening in Privacy &amp; Security. The Homebrew cask clears this app’s download quarantine flag. <a href={links.desktop}>Read the Mac installation guide.</a></p></details>
        </>}
        {system === "windows" && <p className="install-os-tip">Open the EXE and follow the installer. Use MSI when your IT team manages software installations.</p>}
        {system === "linux" && <p className="install-os-tip">Open DEB or RPM in your software installer. For AppImage, allow execution in the file’s properties, then open it.</p>}
      </div>
      <p className="install-footnote"><Check size={14} aria-hidden /> No coding tools or Docker needed to connect to an existing server.</p>
      <a href={links.downloads} className="install-text-link">All release files · v{RELEASE}<ArrowUpRight size={14} aria-hidden /></a>
    </article>
  );
}
