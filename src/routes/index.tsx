import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Cpu, Layers } from "lucide-react";

import hubLogo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Antigravity Labs — Developer Console Suites" },
      {
        name: "description",
        content: "High-performance developer utilities for cluster monitoring, log routing, and real-time terminal diagnostics.",
      },
      { property: "og:title", content: "Antigravity Labs — Developer Console Suites" },
      {
        property: "og:description",
        content: "High-performance developer utilities for cluster monitoring, log routing, and real-time terminal diagnostics.",
      },
      { property: "og:image", content: hubLogo },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden />

      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-20 lg:py-32 flex flex-col justify-center relative">
        <div className="max-w-3xl mb-20">
          <p className="font-mono text-xs uppercase tracking-[2px] text-foreground/50 mb-4">// developer terminal tools</p>
          <h1 className="text-5xl lg:text-7xl font-mono font-light tracking-tight mb-6 leading-tight">
            Antigravity <span className="font-bold">Labs.</span>
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
            A suite of lightweight, high-performance command-line applications designed to replace bulky graphical dashboards with direct terminal-driven streams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* KDM Card */}
          <div className="group relative border border-border bg-[rgba(255,255,255,0.02)] hover:border-foreground/30 hover:bg-[rgba(255,255,255,0.04)] p-8 lg:p-12 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="h-6 w-6 text-foreground/75" strokeWidth={1.5} />
                <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/40">// cluster monitor</span>
              </div>
              <h2 className="text-3xl font-mono tracking-tight mb-4 text-foreground group-hover:translate-x-1 transition-transform">
                kdm.
              </h2>
              <p className="text-foreground/75 text-sm leading-relaxed mb-6">
                Monitor every Kubernetes pod, Docker container, and Minikube cluster dynamically from your terminal. Streams real-time container logs, lifecycle changes, and diagnostics with sub-50ms latency.
              </p>
              <ul className="space-y-2.5 text-xs text-foreground/60 mb-10 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-foreground/50 rounded-full" />
                  Real-time health diagnostic alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-foreground/50 rounded-full" />
                  Zero-config terminal watchdog UI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-foreground/50 rounded-full" />
                  SOC 2 ready read-only streams
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                to="/kdm"
                className="btn-mono w-full justify-center px-6 py-3.5 bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 transition-all font-mono text-sm"
              >
                Explore KDM
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/kdm/docs"
                className="w-full text-center block text-xs font-mono uppercase tracking-[1px] text-foreground/50 hover:text-foreground transition-colors py-2"
              >
                Read KDM Docs
              </Link>
            </div>
          </div>

          {/* KDC Card */}
          <div className="group relative border border-border bg-[rgba(255,255,255,0.02)] hover:border-foreground/30 hover:bg-[rgba(255,255,255,0.04)] p-8 lg:p-12 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Layers className="h-6 w-6 text-foreground/75" strokeWidth={1.5} />
                <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/40">// devops commander</span>
              </div>
              <h2 className="text-3xl font-mono tracking-tight mb-4 text-foreground group-hover:translate-x-1 transition-transform">
                kdc.
              </h2>
              <p className="text-foreground/75 text-sm leading-relaxed mb-6">
                Manage Docker, Compose, Kubernetes, Helm, deployments, monitoring, and environment checks from a keyboard-first terminal dashboard. Automatically scans projects to show only relevant commands and menus.
              </p>
              <ul className="space-y-2.5 text-xs text-foreground/60 mb-10 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-foreground/50 rounded-full" />
                  Interactive terminal UI with ratatui
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-foreground/50 rounded-full" />
                  Automated stack detection & capabilities scanner
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-foreground/50 rounded-full" />
                  Unified deployment pipeline & environment checks
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                to="/kdc"
                className="btn-mono w-full justify-center px-6 py-3.5 bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 transition-all font-mono text-sm"
              >
                Explore KDC
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/kdc/docs"
                className="w-full text-center block text-xs font-mono uppercase tracking-[1px] text-foreground/50 hover:text-foreground transition-colors py-2"
              >
                Read KDC Docs
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
