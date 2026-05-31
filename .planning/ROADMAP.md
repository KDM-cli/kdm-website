# KDM Website — Two-Product Restructure Roadmap

**Goal:** Restructure the single-product KDM landing site into a multi-product ecosystem hub supporting **kdm-cli** (Kubernetes & Docker Monitor CLI) and **docker-guard** (Docker monitoring CLI companion), with shared layouts, product-aware navigation, and parameterized landing components.

---

## Phases

### Pre-Phase: Meta Fix
- **Goal:** Clean up root metadata still referencing "Lovable App" placeholder.
- **Plans:** 1 plan
- **Wave:** 1

Plans:
- [x] `00-01-PLAN.md` — Replace "Lovable App" metadata with "KDM Ecosystem"

---

### Phase 1: Product Config System
- **Goal:** Define the ProductConfig contract, create config files for both products, and establish a React Context to expose the active product throughout the tree.
- **Plans:** 2 plans
- **Waves:** 1–2

Plans:
- [x] `01-01-PLAN.md` — ProductConfig types + kdm.ts + docker-guard.ts + registry index
- [x] `01-02-PLAN.md` — ProductContext provider + useProduct hook + wire into root shell

---

### Phase 2a: Routing Architecture
- **Goal:** Transform `/` from single-product landing to a hub selection page; create product-specific layout routes at `/kdm/*` and `/docker-guard/*`; restructure docs routes under each product.
- **Plans:** 2 plans
- **Waves:** 3–4

Plans:
- [x] `02a-01-PLAN.md` — Hub page at `/` + product layout route shells (`/kdm`, `/docker-guard`)
- [x] `02a-02-PLAN.md` — Product-scoped docs route groups (`/kdm/docs/*`, `/docker-guard/docs/*`)

---

### Phase 2b: Documentation System
- **Goal:** Reorganize markdown files into product-specific directories, parameterize the docs loader with product context.
- **Plans:** 1 plan
- **Wave:** 5

Plans:
- [ ] `02b-01-PLAN.md` — Split `src/docs/` into `src/docs/kdm/` + `src/docs/docker-guard/`, parameterize `docs.ts`

---

### Phase 3: Navigation & Footer
- **Goal:** Make Navbar and Footer product-aware using ProductContext; Hub page gets neutral cross-product navigation.
- **Plans:** 1 plan
- **Wave:** 3

Plans:
- [x] `03-01-PLAN.md` — Product-aware Navbar + Footer, neutral hub nav variant

---

### Phase 4a: Landing Components — Hero + Terminal
- **Goal:** Parameterize Hero and Terminal to render product-specific content from ProductConfig.
- **Plans:** 1 plan
- **Wave:** 3

Plans:
- [x] `04a-01-PLAN.md` — Parameterize Hero + Terminal components with useProduct hook

---

### Phase 4b: Landing Components — Features + Commands + CTA
- **Goal:** Parameterize Features, Commands, and CTA to render product-specific content from ProductConfig.
- **Plans:** 1 plan
- **Wave:** 3

Plans:
- [x] `04b-01-PLAN.md` — Parameterize Features + Commands + CTA with useProduct hook

---

### Phase 5: Product Assets & Metadata
- **Goal:** Add Docker Guard assets (logo, icons, OG images), finalize per-product head metadata.
- **Plans:** 1 plan
- **Wave:** 5

Plans:
- [ ] `05-01-PLAN.md` — Docker Guard brand assets + per-product route head metadata

---

## Wave Dependency Summary

| Wave | Plans | Depends On | Files Changed |
|------|-------|------------|---------------|
| 1 | 00-01, 01-01 | — | `__root.tsx`, `config/products/*` |
| 2 | 01-02 | 01-01 | `ProductContext.tsx`, `__root.tsx` |
| 3 | 02a-01, 03-01, 04a-01, 04b-01 | 01-02 | routes, components, context |
| 4 | 02a-02 | 02a-01 | product doc routes |
| 5 | 02b-01 | 02a-02 | `src/docs/`, doc loader |
| 5 | 05-01 | 02a-02, 04a-01, 04b-01 | assets, metadata |

## Success Criteria

Pre-Phase: `__root.tsx` no longer references "Lovable".
Phase 1: ProductConfig type + both product configs + context provider exist.
Phase 2a: `/` = hub, `/kdm/*` and `/docker-guard/*` resolve.
Phase 2b: Docs load per-product from `src/docs/{product}/*.md`.
Phase 3: Navbar/Footer switch branding based on product context.
Phase 4a: Hero and Terminal render product-specific copy.
Phase 4b: Features, Commands, CTA render product-specific data.
Phase 5: Docker Guard has its own logo/icons; all pages have correct meta tags.
