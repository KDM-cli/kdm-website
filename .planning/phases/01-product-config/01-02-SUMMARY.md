---
phase: 01-product-config
plan: 02
subsystem: "Product Context"
tags:
  - context
  - react-provider
  - product-config
requires:
  - 01-01 (product config types + registry)
provides:
  - ProductContext with Provider + useProduct hook
affects:
  - src/routes/__root.tsx (wraps children in ProductProvider)
tech-stack:
  added:
    - "React createContext / useContext for product config propagation"
  patterns:
    - "Explicit slug prop (no router coupling) — routes pass slug to Provider"
key-files:
  created:
    - src/context/ProductContext.tsx
  modified:
    - src/routes/__root.tsx
decisions:
  - "Provider accepts explicit slug prop instead of reading URL internally (keeps it pure, no router dependency)"
  - "resolveConfig helper validates slug against products array, falls back to defaultProduct for unknown slugs (implements T-01-02-01 mitigation)"
metrics:
  duration: "~10 min"
  completed: "2026-05-31"
---

# Phase 1 Plan 2: Product Context Summary

Wire ProductConfig into React context so every component can access the active product's config.

## Tasks Executed

### Task 1: Create ProductContext with provider and useProduct hook
**Commit:** `d8daaa9`

Created `src/context/ProductContext.tsx`:
- `ProductContext` (internal): `createContext<ProductConfig>(defaultProduct)`
- `resolveConfig(slug?)`: Looks up product by slug in the registry array; falls back to `defaultProduct` when slug is missing or unknown (threat mitigation T-01-02-01)
- `ProductProvider({ slug?, children })`: Wraps children in `ProductContext.Provider`
- `useProduct()`: Returns current `ProductConfig` from context (never undefined)

### Task 2: Wire ProductProvider into root shell
**Commit:** `8df6438`

Added `ProductProvider` wrapping around `<Outlet />` in `RootComponent`:
- Import: `import { ProductProvider } from "@/context/ProductContext"`
- Wrapped: `<ProductProvider><Outlet /></ProductProvider>` inside `QueryClientProvider`
- No `slug` prop passed — defaults to KDM config (neutral mode)

## Deviations from Plan

None — plan executed exactly as written.

## Pre-existing Issues (Out of Scope)

The following build/tooling issues existed before our changes and are not caused by this plan:

| Issue | Details |
|-------|---------|
| `npm run build` fails | `nitro` dependency missing `unenv` module — pre-existing bundler config issue |
| `npx tsc --noEmit` has errors | Missing type declarations (`@tanstack/react-router`, `recharts`, `react-hook-form`) — pre-existing, all in files we didn't touch |
| `npm run lint` fails | Missing `acorn` module in `espree` — pre-existing dependency resolution issue |

Our `ProductContext.tsx` has zero type/lint errors. The only errors in `__root.tsx` are the same pre-existing declaration-file issues that existed before our edit.

## Verification

- [x] `ProductProvider` imported and used in `src/routes/__root.tsx` (3 occurrences: import + opening tag + closing tag)
- [x] `useProduct` exported from `src/context/ProductContext.tsx` (1 occurrence)
- [x] Both tasks committed individually with proper format
- [x] TypeScript reports zero new errors from our changes

## Success Criteria

- [x] ProductContext.tsx exposes `ProductProvider` and `useProduct`
- [x] `useProduct()` returns a valid ProductConfig at all times (defaultProduct ensures it's never undefined)
- [x] Root component wraps app tree in ProductProvider
- [ ] Build passes — BLOCKED by pre-existing nitro/unenv dependency issue (out of scope)

## Key Files

**Created:**
- `src/context/ProductContext.tsx` (28 lines) — Provider, useProduct hook, resolveConfig helper

**Modified:**
- `src/routes/__root.tsx` (+3 lines) — added ProductProvider import + wrapping

## Self-Check: PASSED

- `src/context/ProductContext.tsx` — exists and verified
- `src/routes/__root.tsx` — contains ProductProvider import and usage
- `d8daaa9` — commit exists
- `8df6438` — commit exists

## What Wave 3 Should Execute

Wave 3 should proceed with **Phase 2a: Product Routing** (route layouts that pass product slugs to ProductProvider):

1. **Create KDM route layout** (`src/routes/kdm.tsx` or similar) that wraps children in `<ProductProvider slug="kdm">`
2. **Create Docker Guard route layout** (`src/routes/docker-guard.tsx`) that wraps children in `<ProductProvider slug="docker-guard">`
3. **Create route definitions** in `src/router.tsx` or `src/routes/` to serve `/kdm/*` and `/docker-guard/*` paths
4. Each layout should use `useProduct()` to access its config for rendering product-specific content

The product context is now ready for use — any component in the tree can call `useProduct()` to get the active product's configuration.
