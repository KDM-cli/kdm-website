import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Terminal } from "./Terminal";
import { useProduct } from "@/context/ProductContext";

export const Hero = () => {
  const { displayName, tagline, description, installCommand, githubUrl, stats, terminalLines } = useProduct();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(installCommand)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.error("Failed to copy text using clipboard API: ", err);
        try {
          const textarea = document.createElement("textarea");
          textarea.value = installCommand;
          textarea.style.position = "fixed";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textarea);
          if (successful) {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } else {
            console.error("execCommand copy fallback failed");
          }
        } catch (fallbackErr) {
          console.error("Copy fallback execution failed: ", fallbackErr);
        }
      });
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="container mx-auto px-6 pt-24 pb-24 lg:pt-32 lg:pb-40 relative">
        <div className="flex items-center gap-2 mb-12">
          <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/50">
            // v2.4.0 — cloud sync now in beta
          </span>
        </div>

        <h1 className="font-mono font-light tracking-tight leading-[1.05] text-foreground text-[14vw] md:text-[12vw] lg:text-[180px] xl:text-[220px] mb-12">
          {displayName.toLowerCase()}.
        </h1>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-2xl lg:text-3xl font-normal leading-tight max-w-xl">
              {tagline}
            </h2>
            <p className="text-base text-foreground/70 max-w-xl leading-relaxed">
              {description}
            </p>

            <button
              onClick={copy}
              className="group flex items-center justify-between gap-3 px-4 py-3 w-full max-w-md border border-[rgba(255,255,255,0.2)] font-mono text-sm hover:border-foreground/50 transition-colors"
            >
              <span className="text-foreground/50">$</span>
              <span className="flex-1 text-left">{installCommand}</span>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 text-foreground/50 group-hover:text-foreground transition-colors" />}
            </button>

            <div className="flex flex-wrap gap-3">
              <a href="#" className="btn-mono px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Try {displayName.toUpperCase()}
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="btn-mono px-6 py-3 border border-[rgba(255,255,255,0.2)] text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                View on GitHub
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-mono text-2xl sm:text-3xl font-light">{stat.value}</div>
                  <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Terminal lines={terminalLines} productName={displayName} />
          </div>
        </div>
      </div>
    </section>
  );
};
