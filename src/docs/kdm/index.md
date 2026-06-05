---
title: KDM Documentation
description: Overview of the KDM CLI documentation.
eyebrow: Overview
order: 0
---

KDM is a unified command-line monitor for Kubernetes pods, Docker containers, and Minikube clusters. These docs cover installation, commands, and live monitoring.

## Get started

Install the CLI, point it at a cluster, and run `kdm show pods` to verify the connection. Every command works against local Docker, Minikube, and remote Kubernetes contexts.

## Adding new docs

Documentation pages are ad-hoc Markdown files. Create a new file at `src/docs/<slug>.md` with frontmatter and it appears in the sidebar automatically — no route or config changes needed.

```md
---
title: My new page
description: Short summary.
eyebrow: Guide
order: 10
---

Write Markdown here.
```
