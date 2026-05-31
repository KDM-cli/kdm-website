<p align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="src/assets/logo.png">
    <img alt="KDM" src="src/assets/logo.png" width="128" height="128">
  </picture>
</p>

<h1 align="center">KDM Website</h1>

<p align="center">
  <strong>Kubernetes &amp; Docker Monitor</strong> &mdash; marketing and documentation site for the KDM CLI.
  <br>
  Built with TanStack Start, React, TypeScript, and Tailwind CSS.
</p>

<p align="center">
  <a href="https://github.com/KDM-cli/kdm-cli"><img alt="KDM CLI" src="https://img.shields.io/badge/KDM-CLI-000?style=flat-square&logo=kubernetes"></a>
  <a href="LICENSE"><img alt="License: AGPL v3" src="https://img.shields.io/badge/License-AGPL%20v3-blue?style=flat-square"></a>
  <a href="https://github.com/Yuvraj-Sarathe/kdm-website/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/Yuvraj-Sarathe/kdm-website?style=flat-square"></a>
</p>

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

---

## About

This repository contains the marketing website for **KDM** — a cloud-native CLI that streams real-time health, logs, and metrics for Kubernetes clusters, Docker hosts, and Minikube from a single unified command.

The website serves as both a landing page and documentation hub for the KDM CLI project. It features:

- **Landing page** with hero, features, live command demos, and call-to-action sections
- **Documentation** with search, sidebar navigation, and markdown-rendered content
- **Dark, monochrome design** inspired by terminal aesthetics
- **Responsive layout** optimized for all screen sizes

### Key Features (of KDM CLI)

| Feature                   | Description                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **Unified visibility**    | `kdm show <target>` — list pods, containers, runners, and Minikube nodes across clouds  |
| **Health diagnostics**    | `kdm health <target>` — probe liveness, readiness, restarts, and resource pressure      |
| **Live watch mode**       | `kdm watch` — real-time streaming metrics with millisecond updates                      |
| **Smart log tailing**     | `kdm logs <name>` — structured log parsing with multi-line stitching and instant search |
| **Cloud-synced state**    | Securely sync cluster state across your team                                            |
| **Zero-trust by default** | Read-only kubeconfig context, scoped tokens, end-to-end encrypted streams               |

> **Note:** This repo hosts the _website_. The KDM CLI tool lives at [github.com/KDM-cli/kdm-cli](https://github.com/KDM-cli/kdm-cli).

---

## Tech Stack

| Layer             | Technology                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Framework**     | [TanStack Start](https://start.tanstack.com/) (React SSR)                                                  |
| **Routing**       | [TanStack Router](https://tanstack.com/router) (file-based)                                                |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query)                                                               |
| **Styling**       | [Tailwind CSS v4](https://tailwindcss.com/) + [tw-animate-css](https://github.com/tw-in-js/tw-animate-css) |
| **UI Primitives** | [shadcn/ui](https://ui.shadcn.com/) (Radix-based)                                                          |
| **Build Tool**    | [Vite](https://vitejs.dev/)                                                                                |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                                              |
| **Icons**         | [Lucide React](https://lucide.dev/)                                                                        |
| **Deployment**    | [Cloudflare Workers](https://workers.cloudflare.com/) / [Vercel](https://vercel.com/)                      |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm (or bun, pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/Yuvraj-Sarathe/kdm-website.git
cd kdm-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
kdm-website/
├── src/
│   ├── assets/              # Static assets (logo.png, etc.)
│   ├── components/          # React components
│   │   ├── docs/            # Documentation view components
│   │   ├── ui/              # shadcn/ui primitives
│   │   ├── Commands.tsx     # Interactive command demo section
│   │   ├── CTA.tsx          # Call-to-action section
│   │   ├── Features.tsx     # Features grid section
│   │   ├── Footer.tsx       # Site footer
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── Terminal.tsx     # Terminal animation component
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities (docs, error handling, etc.)
│   ├── routes/              # TanStack Router route files
│   │   ├── __root.tsx       # Root layout + SEO config
│   │   ├── index.tsx        # Landing page
│   │   ├── docs.tsx         # Documentation layout
│   │   ├── docs.index.tsx   # Documentation index
│   │   ├── docs.$slug.tsx   # Dynamic doc pages
│   │   ├── privacy.tsx      # Privacy policy
│   │   ├── terms.tsx        # Terms of service
│   │   └── routeTree.gen.ts # Auto-generated route tree
│   ├── router.tsx           # Router configuration
│   ├── server.ts            # SSR error wrapper
│   ├── start.ts             # TanStack Start instance
│   └── styles.css           # Global styles and Tailwind theme
├── .gitignore
├── CONTRIBUTING.md          # Contribution guidelines
├── CODE_OF_CONDUCT.md       # Code of conduct
├── LICENSE                  # GNU AGPL v3
├── package.json
├── tsconfig.json
├── vite.config.ts           # Vite configuration
└── wrangler.jsonc           # Cloudflare Workers configuration
```

---

## Available Scripts

| Script              | Description                       |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start development server with HMR |
| `npm run build`     | Build for production              |
| `npm run build:dev` | Build in development mode         |
| `npm run preview`   | Preview production build locally  |
| `npm run lint`      | Run ESLint across the project     |
| `npm run format`    | Format code with Prettier         |

---

## Deployment

The site is configured for deployment to both **Cloudflare Workers** and **Vercel**.

### Cloudflare Workers

```bash
npm run build
npx wrangler deploy
```

Cloudflare configuration is in [`wrangler.jsonc`](wrangler.jsonc) — the server entry point is `src/server.ts`.

### Vercel

Deploy via the Vercel dashboard or CLI — the build process auto-detects Vercel and uses Nitro with the Vercel preset via [`vite.config.ts`](vite.config.ts).

---

## Contributing

We welcome contributions! Please read:

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — development setup, pull request guidelines, and project structure
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** — our community standards

---

## Contributors

Thanks to everyone who has contributed to this project:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://yuvraj-sarathe.github.io/Portfolio/"><img src="https://avatars.githubusercontent.com/u/216678101?v=4?s=100" width="100px;" alt="Yuvraj Sarathe"/><br /><sub><b>Yuvraj Sarathe</b></sub></a><br /><a href="#design-Yuvraj-Sarathe" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- <div align="center" style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
  <a href="https://github.com/utkarsh232005" style="text-decoration: none; color: inherit;">
    <img src="https://avatars.githubusercontent.com/u/137105846?v=4" width="64" height="64" alt="Utkarsh Patrikar" style="border-radius: 50%; display: block; margin: 0 auto;">
    <strong>Utkarsh Patrikar</strong><br>
    <span style="font-size: 0.85em;">Maintainer</span>
  </a>
  <a href="https://github.com/Yuvraj-Sarathe" style="text-decoration: none; color: inherit;">
    <img src="https://avatars.githubusercontent.com/u/188508884?v=4" width="64" height="64" alt="Yuvraj Sarathe" style="border-radius: 50%; display: block; margin: 0 auto;">
    <strong>Yuvraj Sarathe</strong><br>
    <span style="font-size: 0.85em;">Contributor</span>
  </a>
</div> -->

---

## License

This project is licensed under the **GNU Affero General Public License v3.0** — see the [LICENSE](LICENSE) file for full details.

In short, you are free to use, modify, and distribute this software. If you modify and run it on a server accessible to users, you must make your modified source code available to those users under the same license.
