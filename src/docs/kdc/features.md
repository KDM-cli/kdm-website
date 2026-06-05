---
title: Features
description: Features and deployment behaviors of KDC.
eyebrow: Features
order: 3
---

KDC is packed with features designed to wrap your local Docker and Kubernetes toolchains.

## Interactive Terminal Dashboard

KDC provides a terminal UI built with `ratatui` and `crossterm`.

The dashboard can show project-aware sections such as:

- Dashboard
- Docker
- Compose
- Kubernetes
- Helm
- Deployments
- Monitoring
- Settings

Menus appear only when relevant files or capabilities are detected.

## Project Scanner

KDC scans your project for infrastructure and stack files.

It ignores noisy folders such as:

- `.git`
- `target`
- `node_modules`
- `.venv`
- `dist`
- `build`

## Stack Detection

KDC detects these application stacks:

- Node.js
- Spring Boot
- Rust
- Go
- Python
- Unknown

This helps KDC recommend build commands and project actions.

## Docker Support

KDC includes Docker support for:

- Building images
- Rebuilding images without cache
- Running containers
- Stopping containers
- Restarting containers
- Listing containers
- Inspecting containers
- Listing images
- Tagging images
- Deleting images
- Pushing images
- Fetching container logs
- Listing networks
- Listing volumes

## Docker Compose Support

KDC supports Compose workflows such as:

- `docker compose up`
- `docker compose down`
- `docker compose restart`
- Fetching Compose logs
- Listing Compose services
- Listing running Compose services

## Kubernetes Support

KDC wraps common `kubectl` operations for:

- Namespaces
- Pods
- Deployments
- Services
- Ingress
- ConfigMaps
- Secrets
- Events

Supported actions include:

- Listing resources
- Getting YAML details
- Fetching pod logs
- Deleting pods
- Scaling deployments

## Deployment Pipeline

KDC can create and execute a deployment pipeline.

The pipeline includes:

1. Build application.
2. Docker build.
3. Docker push.
4. Kubernetes deployment update.
5. Rollout verification.

Before deployment, KDC checks blockers such as:

- Missing `Dockerfile`
- Docker daemon not running
- Missing Kubernetes manifests
- Kubernetes cluster not connected

Deployment environments map to namespaces:

| Environment | Namespace |
| --- | --- |
| `development`, `dev` | `default` |
| `staging`, `stg` | `staging` |
| `production`, `prod` | `production` |

## Rollback Support

KDC includes Kubernetes rollback helpers using:

```bash
kubectl rollout undo
kubectl rollout history
```

It can roll back to the previous revision or a specific target revision.

## Doctor Checks

The `doctor` command checks whether the local environment is ready.

Basic checks include:

- Docker CLI availability
- Docker daemon status
- Kubernetes tooling availability

Full checks include:

- Docker version
- Kubernetes current context
- Registry connectivity, if configured
- OS-specific install hints

## Config And Local Storage

By default, KDC stores local state under:

```bash
~/.kdc
```

You can override it with:

```bash
KDC_HOME=/custom/path kdc
```

KDC stores files such as:

- `config.yaml`
- `history.yaml`
- `deploy_history.yaml`
- `doctor_report.json`
- `command_history.yaml`
- `project_cache.yaml`

Default config values include:

```yaml
theme: dark
default_environment: development
registry: null
default_namespace: default
```
