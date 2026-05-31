---
phase: 04a-hero-terminal
plan: 01
subsystem: Hero & Terminal
tags: [hero, terminal, product-context, parameterization]
requires: [01-02]
provides: [LP-01]
affects:
  - src/components/Hero.tsx
  - src/components/Terminal.tsx
tech-stack:
  added: []
  patterns:
    - useProduct hook integration
    - dynamic stats grid from product config
    - dynamic terminal lines from product config
key-files:
  created: []
  modified:
    - src/components/Hero.tsx
    - src/components/Terminal.tsx
decisions: []
metrics:
  duration: ~5 min
  completed_date: 2026-05-31
---

# Phase 4a Plan 01: Hero & Terminal Parameterization Summary

Hero and Terminal components now render product-specific content from ProductContext via `useProduct()`.

The Hero displays product version, display name, tagline, description, install command, CTA text, GitHub URL, and stats from the active product config. The Terminal renders product-specific terminal simulation lines and brand name in its title bar.

## Changes Made

### `src/components/Hero.tsx`
- Added `import { useProduct } from "@/context/ProductContext"`
- Version badge: hardcoded `// v2.4.0 — cloud sync now in beta` → `{product.version}`
- H1 headline: `kdm.` → `{product.displayName}.`
- H2 tagline: hardcoded → `{product.tagline}`
- Description paragraph: hardcoded → `{product.description}`
- Install command in copy button: `npm install -g kdm-cli` → `{product.installCommand}`
- Copy function writes `product.installCommand` instead of hardcoded string
- Primary CTA button: `Try KDM` → `{product.ctaPrimaryText}`
- GitHub link URL: `https://github.com/KDM-cli/kdm-cli` → `{product.githubUrl}`
- Stats grid: 3 hardcoded divs → `product.stats.map(...)` with dynamic value/label
- All CSS classes, layout structure, grid-bg, and responsive breakpoints preserved

### `src/components/Terminal.tsx`
- Added `import { useProduct } from "@/context/ProductContext"`
- Removed module-level hardcoded `lines` array (10 terminal lines)
- Timer setup uses `product.terminalLines` instead of hardcoded `lines`
- Render loop maps over `product.terminalLines.slice(0, visible)`
- Title bar: `~/cluster — kdm` → `~/cluster — {product.brandName}`
- All CSS, animation logic, cursor blink, and layout preserved

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None — static config data only, no new trust boundary surfaces.

## Self-Check: PASSED

- [x] `src/components/Hero.tsx` — uses `useProduct`, references `product.tagline`, `product.version`, `product.installCommand`, `product.stats.map`, `product.githubUrl`, `product.displayName`, `product.ctaPrimaryText`
- [x] `src/components/Terminal.tsx` — uses `useProduct`, references `product.terminalLines`, `product.brandName`; old hardcoded `const lines` array removed
- [x] Commit `1470790` — Hero parameterization (16 insertions, 21 deletions)
- [x] Commit `ad7dea7` — Terminal parameterization (5 insertions, 16 deletions)
- [x] Build failure is pre-existing (`@tanstack/start-plugin-core` dependency issue), not introduced by these changes
