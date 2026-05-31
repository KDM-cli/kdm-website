---
title: Contributing
description: How to contribute to KDM as a new member of the organization.
eyebrow: Community
order: 50
---

Welcome to the KDM organization! This guide gets you from zero to your first merged pull request.

## 1. Set up your environment

```bash
git clone https://github.com/kdm-cli/kdm.git
cd kdm
npm install
npm run dev
```

You will need Node.js 20+, Docker, and a local Kubernetes context (Minikube, kind, or Docker Desktop).

## 2. Pick an issue

- Look for issues labeled `good first issue` or `help wanted`.
- Comment on the issue to claim it before starting work.
- For larger changes, open a short proposal issue first so a maintainer can sign off on the approach.

## 3. Branch and commit

- Branch naming: `feat/<short-name>`, `fix/<short-name>`, `docs/<short-name>`.
- Use [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Keep commits focused — one logical change per commit.

## 4. Code style

- TypeScript strict mode, no `any` unless justified in a comment.
- Run `npm run lint` and `npm run typecheck` before pushing.
- Add or update tests for any behavior change: `npm test`.

## 5. Documentation

Docs are ad-hoc Markdown files in `src/docs/`. To add a page, drop a new `.md` file with frontmatter:

```md
---
title: My page
description: Short summary.
eyebrow: Guide
order: 10
---
```

It appears in the docs sidebar automatically.

## 6. Open a pull request

- Fill out the PR template completely.
- Link the issue (`Closes #123`).
- Ensure CI is green.
- Request review from a code owner — they will respond within two business days.

## 7. Code of Conduct

All contributors must follow our [Code of Conduct](https://github.com/kdm-cli/kdm/blob/main/CODE_OF_CONDUCT.md). Be kind, be specific, assume good intent.

## Need help?

- Org Slack: `#kdm-dev`
- Weekly contributor sync: Thursdays 16:00 UTC
- Tag `@kdm-cli/maintainers` on a PR for an escalation
