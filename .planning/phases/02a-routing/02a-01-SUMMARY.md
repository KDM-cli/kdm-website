---
phase: 02a-routing
plan: 01
subsystem: Route Architecture
tags: [routing, hub-page, product-context, tanstack-router]
requires: [01-02]
provides: [ROUTE-01, ROUTE-02]
affects:
  - src/routes/index.tsx
  - src/routes/kdm.tsx
  - src/routes/docker-guard.tsx
tech-stack:
  added: []
  patterns: [ProductProvider wrapping per product route, Hub + Layout routing pattern]
key-files:
  created:
    - src/routes/kdm.tsx
    - src/routes/docker-guard.tsx
  modified:
    - src/routes/index.tsx
decisions: []
metrics:
  duration: ~26 min
  completed_date: 2026-05-31
---

# Phase 02a Plan 01: Hub and Product Layout Routes Summary

Transform the single-product route structure into a hub-and-product layout architecture. `/` becomes a product selection hub, `/kmd/*` serves kdm-cli content, and `/docker-guard/*` serves Docker Guard content.

## Changes Made

### `src/routes/index.tsx` — Hub selection page
- Replaced single-product KDM landing page (Navbar + Hero + Features + Commands + CTA + Footer) with a clean product selection hub
- Shows "KDM Ecosystem" heading with "Choose your tool" subtitle
- Two product cards side-by-side (stacked on mobile) with links to `/kdm` and `/docker-guard`
- Each card shows product `displayName`, `description`, "Explore" button, and 3 stats from config
- Inline footer with links to `/privacy` and `/terms`
- Dark theme styling (`bg-background`, `text-foreground`, `border-border`, `font-mono`)
- Route head metadata: title="KDM Ecosystem", description for SEO

### `src/routes/kdm.tsx` — KDM layout route (NEW)
- Creates route at `/kdm` using `createFileRoute("/kdm")`
- Wraps children in `<ProductProvider slug="kdm">` so all child components render kdm-branded content
- Pure layout shell with `<Outlet />` — no content components, no head metadata
- All landing page content (Navbar, Hero, Features, etc.) will live in child routes

### `src/routes/docker-guard.tsx` — Docker Guard layout route (NEW)
- Creates route at `/docker-guard` using `createFileRoute("/docker-guard")`
- Wraps children in `<ProductProvider slug="docker-guard">` for Docker Guard branding
- Pure layout shell with `<Outlet />` — same pattern as kdm layout

### Build fixes (pre-existing)
- Added `unenv` dependency (missing transitive dependency for nitro build)
- Added `docs/` to `.gitignore` (build output directory)

## Commit History

| Hash | Message |
|------|---------|
| `8715365` | `feat(02a-routing): convert index.tsx to product-hub selection page` |
| `b574e9c` | `feat(02a-routing): create kdm and docker-guard product layout routes` |
| `287463d` | `chore(02a-routing): add unenv dependency and docs/ to gitignore` |

## Verification Results

- ✅ `npm run build` succeeds (client + SSR)
- ✅ `src/routes/index.tsx` — HubPage component with product cards linking to `/kdm` and `/docker-guard`
- ✅ `src/routes/kdm.tsx` — `ProductProvider slug="kdm"` wrapping `<Outlet />`
- ✅ `src/routes/docker-guard.tsx` — `ProductProvider slug="docker-guard"` wrapping `<Outlet />`
- ✅ Route tree regenerated — `/kdm` and `/docker-guard` in generated types
- ✅ Privacy and Terms routes remain unchanged at root level

## Deviations from Plan

None — plan executed exactly as written.

**Note:** Plan-to-execute mentioned updating privacy/terms for "neutral Navbar variant" but this was not included in the task definitions and the success criteria explicitly says "Privacy and Terms routes remain unchanged at root level." Left as-is per the authoritative task definitions.

## Known Stubs

None.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundary surfaces introduced.

## Self-Check: PASSED

- [x] `src/routes/index.tsx` — HubPage component, no old imports, has `/kdm` and `/docker-guard` links
- [x] `src/routes/kdm.tsx` — exists with `ProductProvider slug="kdm"` + `<Outlet />`
- [x] `src/routes/docker-guard.tsx` — exists with `ProductProvider slug="docker-guard"` + `<Outlet />`
- [x] Build passes cleanly
- [x] Route tree includes both new routes
