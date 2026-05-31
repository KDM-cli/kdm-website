---
phase: 01-product-config
plan: 01
type: execute
tags:
  - product-config
  - types
  - branding
requires:
  - BLOCKER-03 (preflight metadata fix)
provides:
  - ProductConfig interface and supporting types
  - kdm-cli product configuration
  - Docker Guard product configuration
  - Product registry with slug lookup
affects:
  - src/config/products/types.ts
  - src/config/products/kdm.ts
  - src/config/products/docker-guard.ts
  - src/config/products/index.ts
tech-stack:
  added:
    - ProductConfig type system (src/config/products/)
  patterns:
    - Single-source-of-truth for all branded strings
    - Serializable config (icon as string, not ReactNode)
key-files:
  created:
    - src/config/products/types.ts
    - src/config/products/kdm.ts
    - src/config/products/docker-guard.ts
    - src/config/products/index.ts
  modified: []
metrics:
  duration: ~15m
  completed: 2026-05-31
---

# Phase 01 Product Config Plan 01: ProductConfig Types + Config Files Summary

Created the shared type system and two concrete product config files so all components can read product-specific content from a single source of truth.

## Files Created

### 1. `src/config/products/types.ts` — Interfaces
- `ProductFeature` — Lucide icon name, title, desc, cmd
- `ProductCommand` — name, sig, desc, output
- `ProductStat` — value, label
- `TerminalLine` — prompt, text, out, blink
- `ProductMetadata` — title, description, ogTitle, ogDescription
- `ProductConfig` — full config combining all types

### 2. `src/config/products/kdm.ts` — kdm-cli config
Populated from exact content in existing components:
- 6 features (Eye, HeartPulse, Radio, ScrollText, Cloud, Shield)
- 4 commands (show, health, watch, logs) with terminal output tables
- 3 stats (12k+, 99.99%, <50ms)
- 9 terminal lines (from Terminal.tsx)
- CTA, SEO metadata, copyright

### 3. `src/config/products/docker-guard.ts` — Docker Guard config
Complete Docker Guard branding:
- 6 features (Shield, Eye, HeartPulse, Radio, ScrollText, Cloud)
- 4 commands (guard, ps, health, events)
- 3 stats (50k+, 99.9%, <10ms)
- 10 terminal lines with dg commands
- CTA ("Secure."), SEO metadata, copyright

### 4. `src/config/products/index.ts` — Registry
- `products` array: `[kdm, dockerGuard]`
- `getProductBySlug(slug)` — lookup function
- `defaultProduct` — fallback to kdm

## Decisions Made

- `icon` field is `string` (Lucide icon name) rather than `ReactNode` — keeps configs serializable and import-free
- Default product is `kdm` — ensures backward compatibility
- Registry exports `products` and `getProductBySlug` rather than individual configs — consumers use the registry

## Verification

- Content checks on all 4 files: all expected fields present ✓
- All branded strings from existing components captured in kdm.ts ✓

## Deferred Issues

- `npx tsc --noEmit` could not run — the project's vite dependency is not fully installed (pre-existing issue), causing a `vite/client` type reference error in tsconfig. This does not affect the validity of the config files.

## Deviations from Plan

None — all tasks executed exactly as specified.

## Known Stubs

None — all config fields populated with real content.

## Threat Flags

None — static configuration data, no user input.

## Self-Check: PASSED

- `src/config/products/types.ts` — 6 exported interfaces ✓
- `src/config/products/kdm.ts` — full ProductConfig with all fields ✓
- `src/config/products/docker-guard.ts` — full Docker Guard config ✓
- `src/config/products/index.ts` — products array + getProductBySlug + defaultProduct ✓
- Commits:
  - `5f27964` — types.ts
  - `b3f42c4` — kdm.ts
  - `0afc7c8` — docker-guard.ts
  - `e2e4c9c` — index.ts
