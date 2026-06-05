---
title: Overview
description: Overview of the KDC CLI (Kubernetes Docker Commander).
eyebrow: Overview
order: 0
---

KDC stands for **Kubernetes Docker Commander**.

It is a project-centric DevOps terminal application for managing Docker, Docker Compose, Kubernetes, Helm, deployments, monitoring, and environment checks from a keyboard-first terminal dashboard.

KDC scans a project, understands which DevOps files are present, checks whether Docker and Kubernetes are available on the local machine, and then shows only the commands and menus that are useful for that project.

For example:

- Presence of a `Dockerfile` enables Docker actions.
- A `docker-compose.yml` enables Compose actions.
- Kubernetes manifests enable Kubernetes and deployment actions.
- If Docker is installed but not running, KDC reports that state and disables runtime-dependent actions where needed.

## Why We Use KDC

Docker and Kubernetes projects often require many repeated commands:

```bash
docker build
docker run
docker logs
docker compose up
docker compose down
kubectl get pods
kubectl apply
kubectl rollout status
kubectl rollout undo
```

KDC brings those workflows into one terminal-based interface.

Use KDC to:

- Quickly understand a project's deployment setup.
- Avoid manually remembering every Docker, Compose, and Kubernetes command.
- See what capabilities a project currently has.
- Detect missing files like `Dockerfile`, Compose files, or Kubernetes manifests.
- Run health checks before deploying.
- Generate project-aware menus and actions.
- Execute a deployment pipeline after checking blockers.
- Keep deployment history under the local KDC config directory.

## How KDC Works

KDC follows this flow when it starts:

1. **Project detection**

   KDC scans the selected project directory and looks for known project, Docker, Compose, Kubernetes, and Helm files.

2. **Stack detection**

   KDC detects the app stack based on known files:

   | File | Detected Stack |
   | --- | --- |
   | `package.json` | Node.js |
   | `pom.xml` | Spring Boot |
   | `Cargo.toml` | Rust |
   | `go.mod` | Go |
   | `requirements.txt` | Python |

3. **Capability detection**

   KDC converts discovered files into project capabilities:

   | File | Capability |
   | --- | --- |
   | `Dockerfile` | Docker |
   | `docker-compose.yml`, `docker-compose.yaml`, `compose.yml`, `compose.yaml` | Docker Compose |
   | `deployment.yaml`, `deployment.yml` | Kubernetes deployment |
   | `service.yaml`, `service.yml` | Kubernetes service |
   | `ingress.yaml`, `ingress.yml` | Kubernetes ingress |
   | `kustomization.yaml`, `kustomization.yml` | Kustomize |
   | `Chart.yaml` | Helm |

4. **Runtime detection**

   KDC checks whether required local tools are available:

   - Docker daemon with `docker info`
   - Kubernetes cluster with `kubectl cluster-info`
   - Minikube fallback with `minikube status`

5. **Menu and action generation**

   Based on detected files and runtime state, KDC builds the dashboard menus and command-palette actions.

6. **Execution**

   When an action runs, KDC uses standard Docker, Docker Compose, and `kubectl` commands behind the scenes.
