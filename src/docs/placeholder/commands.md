---
title: Commands
description: CLI commands reference for KDC.
eyebrow: Commands
order: 2
---

This section outlines basic usage and the complete command reference for the KDC CLI.

## Basic Usage

Launch the interactive dashboard:

```bash
kdc
```

Scan the current directory:

```bash
kdc scan
```

Scan a specific project path:

```bash
kdc --project /path/to/project scan
```

Print project analysis:

```bash
kdc analysis
```

Print generated dynamic menus:

```bash
kdc menus
```

Print generated actions:

```bash
kdc actions
```

Search actions by query:

```bash
kdc actions docker
kdc actions deploy
kdc actions logs
```

Create the default config file:

```bash
kdc init-config
```

Preview deployment steps:

```bash
kdc deploy-plan
```

Run deployment:

```bash
kdc deploy
```

Deploy to a specific environment:

```bash
kdc deploy --environment development
kdc deploy --environment staging
kdc deploy --environment production
```

Run environment checks:

```bash
kdc doctor
```

Run full checks:

```bash
kdc doctor --full
```

Export doctor report as JSON:

```bash
kdc doctor --json
```

Run full checks and export JSON:

```bash
kdc doctor --full --json
```

## Complete Command List

| Command | Purpose |
| --- | --- |
| `kdc` | Opens the interactive TUI dashboard. |
| `kdc scan` | Prints detected project, stack, assets, and capabilities. |
| `kdc analysis` | Prints a full project report with missing assets and next steps. |
| `kdc menus` | Shows the generated dashboard menu tree. |
| `kdc actions` | Shows available command-palette actions. |
| `kdc actions <query>` | Filters actions by search text. |
| `kdc init-config` | Creates `config.yaml` under the KDC config directory. |
| `kdc deploy-plan` | Prints a dry-run deployment plan. |
| `kdc deploy` | Executes the deployment pipeline. |
| `kdc doctor` | Checks local Docker and Kubernetes readiness. |
