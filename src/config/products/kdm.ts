import type { ProductConfig } from "./types";

export const kdm: ProductConfig = {
  slug: "kdm",
  displayName: "KDM",
  brandName: "kdm",
  tagline: "Monitor every pod and container from your terminal.",
  description:
    "KDM is a cloud-native CLI that streams real-time health, logs, and metrics for Kubernetes clusters, Docker hosts, and Minikube — all from one unified command.",
  version: "v2.4.0 — cloud sync now in beta",
  installCommand: "npm install -g kdm-cli",
  githubUrl: "https://github.com/KDM-cli/kdm-cli",
  docsPath: "/kdm/docs",

  features: [
    {
      icon: "Eye",
      title: "Unified visibility",
      desc: "Show running pods, containers, runners, and Minikube nodes — across clouds — in a single command.",
      cmd: "kdm show <target>",
    },
    {
      icon: "HeartPulse",
      title: "Health diagnostics",
      desc: "Probe liveness, readiness, restarts, and resource pressure with intelligent severity scoring.",
      cmd: "kdm health <target>",
    },
    {
      icon: "Radio",
      title: "Live watch mode",
      desc: "Stream metrics in real time with millisecond updates. Pin services, filter noise, alert on drift.",
      cmd: "kdm watch",
    },
    {
      icon: "ScrollText",
      title: "Smart log tailing",
      desc: "Tail container or pod logs with structured parsing, multi-line stitching, and instant search.",
      cmd: "kdm logs <name>",
    },
    {
      icon: "Cloud",
      title: "Cloud-synced state",
      desc: "Securely sync cluster state across your team. Share dashboards, runbooks, and incident timelines.",
      cmd: "cloud · auto",
    },
    {
      icon: "Shield",
      title: "Zero-trust by default",
      desc: "Read-only kubeconfig context, scoped tokens, and end-to-end encrypted streams. SOC 2 ready.",
      cmd: "built-in",
    },
  ],

  commands: [
    {
      name: "show",
      sig: "kdm show <target>",
      desc: "List running runners, pods, containers, or minikube clusters.",
      output: `> kdm show pods
NAMESPACE   NAME                    READY   STATUS    AGE
default     api-server-7d4f8b       1/1     Running   3d
default     worker-queue-2c9a1      1/1     Running   3d
ingress     traefik-controller-x9   1/1     Running  14d
monitoring  prometheus-0            2/2     Running  21d`,
    },
    {
      name: "health",
      sig: "kdm health <target>",
      desc: "Detailed health, liveness, and resource pressure diagnostics.",
      output: `> kdm health pods
[ok]    api-server-7d4f8b       healthy    cpu 12%   mem 248Mi
[ok]    worker-queue-2c9a1      healthy    cpu 34%   mem 512Mi
[warn]  log-shipper-abc12       degraded   restarts: 3 (last 1h)
[fail]  batch-runner-99fa1      failing    OOMKilled · 2x in 5m`,
    },
    {
      name: "watch",
      sig: "kdm watch",
      desc: "Live monitoring dashboard right inside your terminal.",
      output: `> kdm watch
+- Live - 14:02:31 ----------------------------+
| pods: 24 running · 1 pending · 0 failed      |
| cpu:  ######========  62%                    |
| mem:  ####==========  41%                    |
| net:  in 124 MB/s   out 38 MB/s              |
+----------------------------------------------+`,
    },
    {
      name: "logs",
      sig: "kdm logs <name>",
      desc: "Tail logs with structured parsing and instant search.",
      output: `> kdm logs api-server-7d4f8b -f
14:02:30 INFO  request GET /api/users 200 12ms
14:02:30 INFO  request POST /api/auth 201 48ms
14:02:31 WARN  cache miss key=user:8821
14:02:31 INFO  request GET /api/orders 200 18ms`,
    },
  ],

  stats: [
    { value: "12k+", label: "Active clusters" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "<50ms", label: "Stream latency" },
  ],

  terminalLines: [
    { prompt: "$", text: "kdm show pods" },
    { text: "NAME                    READY   STATUS    CPU    MEM", out: true },
    { text: "api-server-7d4f8b       1/1     Running   12%    248Mi", out: true },
    { text: "worker-queue-2c9a1      1/1     Running   34%    512Mi", out: true },
    { text: "redis-cache-0           1/1     Running   3%     64Mi", out: true },
    { prompt: "$", text: "kdm health containers" },
    { text: "[ok]   nginx-proxy        healthy   uptime 14d", out: true },
    { text: "[ok]   postgres-main      healthy   uptime 28d", out: true },
    { text: "[warn] log-shipper        degraded  restarts: 3", out: true },
    { prompt: "$", text: "kdm watch", blink: true },
  ],

  ctaTagline: "Ship.",
  ctaDescription:
    "Join thousands of engineers who replaced six dashboards with one CLI. Install in 30 seconds. Cancel anytime.",
  ctaPrimaryText: "Try KDM",

  metadata: {
    title: "KDM — Kubernetes & Docker Monitor CLI",
    description:
      "KDM is a cloud-native CLI for monitoring Kubernetes pods, Docker containers, and Minikube clusters in real time.",
    ogTitle: "KDM — Kubernetes & Docker Monitor CLI",
    ogDescription:
      "Monitor every pod and container from your terminal. Live health, logs, metrics — one CLI.",
  },

  copyright: "© 2026 KDM Labs",
};
