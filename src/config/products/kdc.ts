import { Activity, ShieldAlert, Cpu, ListRestart, Layers, Sparkles } from "lucide-react";
import { ProductConfig } from "./types";
import logoUrl from "@/assets/logo.png";

export const kdcConfig: ProductConfig = {
  slug: "kdc",
  name: "kdc",
  displayName: "KDC",
  tagline: "A project-centric DevOps terminal dashboard for Docker & Kubernetes.",
  description:
    "KDC is a keyboard-first terminal application for managing Docker, Docker Compose, Kubernetes, Helm, deployments, monitoring, and environment checks with zero overhead.",
  cliName: "kdc",
  installCommand: "brew install KDM-cli/tap/kdc",
  githubUrl: "https://github.com/KDM-cli/kdc-cli",
  docsBasePath: "/kdc/docs",
  ctaHeadline: "Command.",
  ctaButtonText: "Install CLI",
  ogImage: logoUrl,
  features: [
    {
      icon: Activity,
      title: "Interactive Terminal Dashboard",
      desc: "A keyboard-first terminal UI built with ratatui showing project-aware sections for Docker, Compose, Kubernetes, and Helm.",
      cmd: "kdc",
    },
    {
      icon: Layers,
      title: "Project Scanner & Stack Detection",
      desc: "Automatically scans the project directory structure to discover stack info and infrastructure files.",
      cmd: "kdc scan",
    },
    {
      icon: Cpu,
      title: "Docker & Kubernetes Support",
      desc: "Build images, run containers, tail pod logs, inspect secrets, scale deployments, and view service ingresses.",
      cmd: "kdc doctor",
    },
    {
      icon: Sparkles,
      title: "Deployment Pipeline & Rollbacks",
      desc: "Execute a unified deployment pipeline (build stack, compile/push Docker, apply manifests) and perform safe rollbacks.",
      cmd: "kdc deploy",
    },
  ],
  commands: [
    {
      name: "scan",
      sig: "kdc scan",
      desc: "Scan the current project directory and list detected stack and capabilities.",
      output: `> kdc scan
Scanning project...
Detected Stack: Node.js (package.json found)
Capabilities:
- Docker (Dockerfile found)
- Docker Compose (docker-compose.yml found)
- Kubernetes (k8s/deployment.yaml found)`,
    },
    {
      name: "doctor",
      sig: "kdc doctor --full",
      desc: "Check readiness of local Docker daemon, Kubernetes cluster, and CLI tools.",
      output: `> kdc doctor --full
Checking local environment...
[ok] Docker CLI available (version 24.0.7)
[ok] Docker Daemon running
[ok] Kubernetes CLI available (version 1.28.2)
[ok] Kubernetes Cluster context: minikube`,
    },
  ],
  stats: [
    {
      value: "< 50ms",
      label: "Startup latency",
    },
    {
      value: "10+",
      label: "Supported stacks",
    },
    {
      value: "Zero",
      label: "External dependencies",
    },
  ],
  terminalLines: [
    { prompt: "$", text: "kdc scan" },
    { text: "SCANNING        FOUND 5 FILES · DOCKER & K8S DETECTED", out: true },
    { text: "Capabilities:   Docker, Compose, Kubernetes, Helm", out: true },
    { prompt: "$", text: "kdc doctor" },
    { text: "[ok] docker daemon connected · [ok] minikube active", out: true },
    { prompt: "$", text: "kdc deploy --environment staging" },
    { text: "Building image -> Pushing latest -> Applying manifests -> Rollout complete", out: true },
    { prompt: "$", text: "kdc", blink: true },
  ],
};
