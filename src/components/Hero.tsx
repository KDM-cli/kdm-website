import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Terminal } from "./Terminal";

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("npm install -g kdm-cli");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
          kdm.
        </h1>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-2xl lg:text-3xl font-normal leading-tight max-w-xl">
              Monitor every pod and container from your terminal.
            </h2>
            <p className="text-base text-foreground/70 max-w-xl leading-relaxed">
              KDM is a cloud-native CLI that streams real-time health, logs, and metrics
              for Kubernetes clusters, Docker hosts, and Minikube — all from one unified command.
            </p>

            <button
              onClick={copy}
              className="group flex items-center justify-between gap-3 px-4 py-3 w-full max-w-md border border-[rgba(255,255,255,0.2)] font-mono text-sm hover:border-foreground/50 transition-colors"
            >
              <span className="text-foreground/50">$</span>
              <span className="flex-1 text-left">npm install -g kdm-cli</span>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 text-foreground/50 group-hover:text-foreground transition-colors" />}
            </button>

            <div className="flex flex-wrap gap-3">
              <a href="#" className="btn-mono px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Try KDM
              </a>
              <a href="https://github.com/KDM-cli/kdm-cli" className="btn-mono px-6 py-3 border border-[rgba(255,255,255,0.2)] text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                View on GitHub
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="font-mono text-3xl font-light">12k+</div>
                <div className="text-xs text-foreground/50 mt-1">Active clusters</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-light">99.99%</div>
                <div className="text-xs text-foreground/50 mt-1">Uptime SLA</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-light">&lt;50ms</div>
                <div className="text-xs text-foreground/50 mt-1">Stream latency</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
};
