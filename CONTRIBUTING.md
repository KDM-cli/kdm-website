# Contributing to KDM Website

Thank you for considering contributing to the KDM website. This document outlines the guidelines for contributions.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Issues

- **Bug reports:** Open a GitHub issue with a clear title and description, steps to reproduce, expected behavior, and actual behavior.
- **Feature requests:** Open a GitHub issue describing the feature, its use case, and any relevant context.
- **Documentation improvements:** Open a GitHub issue or submit a pull request directly.

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Make your changes
4. Run the project locally to verify (`npm run dev`)
5. Run the linter (`npm run lint`)
6. Commit your changes following [conventional commits](https://www.conventionalcommits.org/)
7. Push to your fork and open a pull request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/kdm-website.git
cd kdm-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Project Structure

```
src/
├── assets/         # Static assets (images, icons)
├── components/     # React components
│   ├── docs/       # Documentation view components
│   └── ui/         # UI primitives (shadcn/ui)
├── hooks/          # React hooks
├── lib/            # Utility functions and libraries
├── routes/         # TanStack Router route definitions
├── router.tsx      # Router configuration
├── server.ts       # SSR error wrapper (entry point)
├── start.ts        # TanStack Start instance
└── styles.css      # Tailwind CSS v4 styles
```

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR.
- Write descriptive commit messages using conventional commits.
- Ensure all lint checks pass before submitting.
- Update documentation if your change introduces new behavior.

## Tech Stack

| Tool                                                  | Purpose                       |
| ----------------------------------------------------- | ----------------------------- |
| [TanStack Start](https://start.tanstack.com/)         | React SSR framework           |
| [TanStack Router](https://tanstack.com/router)        | File-based routing            |
| [TanStack Query](https://tanstack.com/query)          | Data fetching and caching     |
| [Tailwind CSS v4](https://tailwindcss.com/)           | Utility-first CSS             |
| [shadcn/ui](https://ui.shadcn.com/)                   | UI component primitives       |
| [Vite](https://vitejs.dev/)                           | Build tool                    |
| [Cloudflare Workers](https://workers.cloudflare.com/) | Deployment target             |
| [Vercel](https://vercel.com/)                         | Alternative deployment target |

## License

By contributing, you agree that your contributions will be licensed under the [GNU AGPL v3](LICENSE).
