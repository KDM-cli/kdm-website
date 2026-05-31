import type { ProductConfig } from "./types";

export const dockerGuard: ProductConfig = {
  slug: "docker-guard",
  displayName: "Docker Guard",
  brandName: "dg",
  tagline: "Secure and monitor every container in real time.",
  description:
    "Docker Guard is a lightweight CLI that watches Docker containers for anomalies, resource pressure, and security events — all from your terminal with zero configuration.",
  version: "v1.0.0 — real-time container security",
  installCommand: "npm install -g docker-guard",
  githubUrl: "https://github.com/KDM-cli/docker-guard",
  docsPath: "/docker-guard/docs",

  features: [
    {
      icon: "Shield",
      title: "Container security",
      desc: "Real-time threat detection for running containers with automated quarantine and alerting.",
      cmd: "dg guard",
    },
    {
      icon: "Eye",
      title: "Process visibility",
      desc: "See every process, network connection, and file change inside your containers instantly.",
      cmd: "dg ps",
    },
    {
      icon: "HeartPulse",
      title: "Health checks",
      desc: "Monitor container health with CPU, memory, I/O, and restart tracking with severity scoring.",
      cmd: "dg health",
    },
    {
      icon: "Radio",
      title: "Live events",
      desc: "Stream container events — start, stop, OOM, health degradation — in real time with millisecond precision.",
      cmd: "dg events",
    },
    {
      icon: "ScrollText",
      title: "Audit logs",
      desc: "Immutable audit trail of every container action with structured search and export.",
      cmd: "dg audit",
    },
    {
      icon: "Cloud",
      title: "Multi-host sync",
      desc: "Centrally monitor containers across multiple Docker hosts with encrypted streaming.",
      cmd: "cloud · auto",
    },
  ],

  commands: [
    {
      name: "guard",
      sig: "dg guard",
      desc: "Watch containers for security threats in real time.",
      output: `> dg guard
CONTAINER      STATUS   THREAT   RISK   UPTIME
api-gateway    safe     none     low    14d
redis-cache    safe     none     low    28d
log-worker     alert    crypto   high   2h`,
    },
    {
      name: "ps",
      sig: "dg ps",
      desc: "List all running containers with resource usage.",
      output: `> dg ps
CONTAINER      STATUS   CPU    MEM      NET I/O
api-gateway    running  12%    248Mi    124 MB/s
redis-cache    running  3%     64Mi     38 MB/s
log-worker     running  34%    512Mi    56 MB/s`,
    },
    {
      name: "health",
      sig: "dg health <container>",
      desc: "Detailed health diagnostics for a container.",
      output: `> dg health log-worker
[ok]   cpu       34%    threshold: 80%
[ok]   mem       512Mi  threshold: 1Gi
[warn] restarts  3      last 1h
[ok]   uptime    14d`,
    },
    {
      name: "events",
      sig: "dg events",
      desc: "Stream live container events.",
      output: `> dg events
14:02:30  api-gateway   started   replica 3
14:02:31  redis-cache   health    ok
14:02:32  log-worker    alert     crypto miner detected`,
    },
  ],

  stats: [
    { value: "50k+", label: "Containers monitored" },
    { value: "99.9%", label: "Threat detection rate" },
    { value: "<10ms", label: "Alert latency" },
  ],

  terminalLines: [
    { prompt: "$", text: "dg ps" },
    { text: "CONTAINER    STATUS   CPU    MEM    THREATS", out: true },
    { text: "api-gateway  running  12%    248Mi  none", out: true },
    { text: "redis-cache  running  3%     64Mi   none", out: true },
    { text: "log-worker   running  34%    512Mi  medium", out: true },
    { prompt: "$", text: "dg guard --strict" },
    { text: "[ok]   api-gateway       safe      uptime 14d", out: true },
    { text: "[ok]   redis-cache       safe      uptime 28d", out: true },
    { text: "[warn] log-worker        alert     crypto miner detected", out: true },
    { prompt: "$", text: "dg events --follow", blink: true },
  ],

  ctaTagline: "Secure.",
  ctaDescription:
    "Join thousands of DevOps engineers who protect their containers with Docker Guard. Install in 30 seconds.",
  ctaPrimaryText: "Try Docker Guard",

  metadata: {
    title: "Docker Guard — Real-time Container Security CLI",
    description:
      "Docker Guard is a lightweight CLI for monitoring Docker container security, health, and resource usage in real time.",
    ogTitle: "Docker Guard — Real-time Container Security CLI",
    ogDescription:
      "Secure and monitor every container from your terminal. Real-time threat detection, health checks, audit logs — one CLI.",
  },

  copyright: "© 2026 KDM Labs",
};
