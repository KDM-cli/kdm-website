---
phase: 06-code-review
reviewed: 2026-05-31T12:41:00Z
depth: standard
files_reviewed: 28
files_reviewed_list:
  - src/config/products/types.ts
  - src/config/products/kdm.ts
  - src/config/products/docker-guard.ts
  - src/config/products/index.ts
  - src/context/ProductContext.tsx
  - src/components/Navbar.tsx
  - src/components/Hero.tsx
  - src/components/Features.tsx
  - src/components/Commands.tsx
  - src/components/CTA.tsx
  - src/components/Terminal.tsx
  - src/components/Footer.tsx
  - src/components/docs/DocView.tsx
  - src/routes/__root.tsx
  - src/routes/index.tsx
  - src/routes/kdm.tsx
  - src/routes/kdm.index.tsx
  - src/routes/kdm.docs.tsx
  - src/routes/kdm.docs.index.tsx
  - src/routes/kdm.docs.$slug.tsx
  - src/routes/docker-guard.tsx
  - src/routes/docker-guard.index.tsx
  - src/routes/docker-guard.docs.tsx
  - src/routes/docker-guard.docs.index.tsx
  - src/routes/docker-guard.docs.$slug.tsx
  - src/lib/docs.ts
  - src/routes/privacy.tsx
  - src/routes/terms.tsx
findings:
  critical: 2
  warning: 5
  info: 3
  total: 10
status: issues_found
---

# Phase 06: Code Review Report — Dual-Product Restructuring

**Reviewed:** 2026-05-31T12:41:00Z
**Depth:** standard
**Files Reviewed:** 28
**Status:** issues_found

## Summary

The dual-product restructuring is architecturally sound — the ProductConfig interface, ProductProvider/useProduct context pattern, and route hierarchy are well-designed. The separation of docs into product-specific directories is clean.

However, several concrete issues were found: **2 critical**, **5 warnings**, and **3 info items**. The critical issues involve placeholder links (`href="#"`) on the primary CTA buttons and a misleading "Status" footer link that points to GitHub instead of a real status page. The main structural concern is duplicate `createDocLoader` invocations (6 total for the two products) causing redundant markdown processing, plus an unsafe `dangerouslySetInnerHTML` usage in `DocView` without sanitization.

**Overall health:** Functional but not production-ready. The product-switching context pattern works correctly across all routes. The primary marketing CTAs and the footer status link need to be resolved before launch.

---

## Critical Issues

### CR-01: Primary CTA buttons lead nowhere (`href="#"`)

**Files:**
- `src/components/Hero.tsx:48`
- `src/components/CTA.tsx:16`

**Issue:** The primary call-to-action buttons on both the Hero section and the CTA section have `href="#"`, which scrolls the page to the top instead of navigating the user to an install guide, signup page, or docs. This affects both products (kdm-cli and Docker Guard).

The Hero component:
```tsx
<a href="#" className="...">{product.ctaPrimaryText}</a>
```

The CTA component:
```tsx
<a href="#" className="...">{product.ctaPrimaryText}</a>
```

For a marketing landing page, the primary conversion button being a no-op is a critical functional gap. Users clicking "Try KDM" or "Try Docker Guard" get no useful result.

**Fix:** Replace `href="#"` with a meaningful destination for each product. For example:
```tsx
// Hero.tsx — link to install guide
<a href={product.docsPath + '/installation'} className="...">
  {product.ctaPrimaryText}
</a>

// CTA.tsx — same or link to product docs
<a href={product.docsPath + '/installation'} className="...">
  {product.ctaPrimaryText}
</a>
```

Alternatively, if the intent is to scroll to commands or features, use an anchor ID:
```tsx
<a href="#install" className="...">{product.ctaPrimaryText}</a>
```

---

### CR-02: "Status" footer link points to GitHub instead of a status page

**File:** `src/components/Footer.tsx:24-29`

**Issue:** The "Status" link in the footer uses `product.githubUrl` as its target, sending users to the GitHub repository instead of a status/uptime page. This is misleading — users clicking "Status" expect to see service availability, not source code.

```tsx
<a
  href={product.githubUrl}   // ← not a status page URL
  target="_blank"
  rel="noreferrer"
  className="hover:text-foreground/40 transition-colors"
>
  Status
</a>
```

The adjacent "GitHub" link also points to `product.githubUrl`, making both links identical.

**Fix:** Add a `statusUrl` field to `ProductConfig`:
```tsx
// types.ts
export interface ProductConfig {
  // ... existing fields
  statusUrl: string;
  // ...
}
```

Then in each product config:
```tsx
// kdm.ts
statusUrl: "https://status.kdm.sh",

// docker-guard.ts
statusUrl: "https://status.kdm.sh",
```

Update Footer to use it:
```tsx
<a
  href={product.statusUrl}
  target="_blank"
  rel="noreferrer"
  className="hover:text-foreground/40 transition-colors"
>
  Status
</a>
```

If no status page exists yet, either remove the "Status" link or link to a `/status` page documented as "coming soon".

---

## Warnings

### WR-01: `DocView` renders unsanitized markdown HTML (XSS vector)

**File:** `src/components/docs/DocView.tsx:17`

**Issue:** The `dangerouslySetInnerHTML` prop is used to render `doc.html` into the DOM. The HTML is produced by `marked.parse()` which does **not** sanitize the output by default. If a contributor commits a markdown file containing `<script>` tags or event handler attributes, they would execute in the context of the site.

```tsx
<div
  className="doc-prose space-y-5 leading-relaxed text-foreground/80"
  dangerouslySetInnerHTML={{ __html: doc.html }}
/>
```

While the markdown files are checked into the repo and subject to code review, defense-in-depth is recommended.

**Fix:** Sanitize the HTML output before rendering. Either:

Option A — Use DOMPurify:
```tsx
import DOMPurify from "dompurify";
// ...
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(doc.html) }}
```

Option B — Use `marked` with sanitization option (deprecated in newer versions but available):
```tsx
// In docs.ts
html: marked.parse(body, { async: false, sanitize: true }) as string,
```

Option C — Install and use `rehype-sanitize` if migrating to a more modern markdown pipeline.

---

### WR-02: `createDocLoader` called 6 times — duplicate markdown processing

**Files:**
- `src/routes/kdm.docs.tsx:6`
- `src/routes/kdm.docs.index.tsx:5`
- `src/routes/kdm.docs.$slug.tsx:5`
- `src/routes/docker-guard.docs.tsx:6`
- `src/routes/docker-guard.docs.index.tsx:5`
- `src/routes/docker-guard.docs.$slug.tsx:5`

**Issue:** Each route file independently calls `createDocLoader(product)`, which runs `import.meta.glob()` with eager loading and processes all markdown files via `parseFrontmatter` + `marked.parse()`. For kdm, this is done 3 times; for docker-guard, 3 times — **6 total invocations**, each parsing the same files from scratch.

This results in:
- 3 redundant `marked.parse()` calls for every markdown file
- 3 redundant frontmatter parsing passes
- Larger-than-necessary bundle (each glob import duplicates the markdown content at build time)

**Fix:** Share the loader results via a singleton or module-level cache:

```tsx
// In a shared location (e.g., src/lib/doc-cache.ts):
const cache = new Map<string, ReturnType<typeof createDocLoader>>();

export function getDocLoader(product: DocSlug) {
  if (!cache.has(product)) {
    cache.set(product, createDocLoader(product));
  }
  return cache.get(product)!;
}
```

Then in each route file:
```tsx
const { docList } = getDocLoader("kdm");   // shared
const { getDoc } = getDocLoader("kdm");    // same instance
```

---

### WR-03: `docker-guard-logo.png` is an orphan asset (never imported)

**File:** `src/assets/docker-guard-logo.png`

**Issue:** The Docker Guard logo placeholder was created at `src/assets/docker-guard-logo.png` but is never imported or referenced by any source file. A grep across all source files confirms zero references outside of planning documents.

This asset increases bundle size and clutters the assets directory.

**Fix:** Either:
- Remove the file if the logo is not yet needed: `git rm src/assets/docker-guard-logo.png`
- Or import and use it (e.g., in the Navbar for Docker Guard branding or in the `/docker-guard` landing page)

---

### WR-04: `getProductBySlug` is exported but never used (dead code)

**File:** `src/config/products/index.ts:6-8`

**Issue:** The `getProductBySlug` function is exported from the products index but is never imported by any source file. The product context uses its own `products.find(...)` inline logic, and all route files hardcode product slugs directly into `ProductProvider`.

```tsx
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
```

**Fix:** Either:
- Remove the function if unused
- Or refactor `ProductContext.resolveConfig` to use it:
  ```tsx
  import { getProductBySlug, defaultProduct } from "@/config/products/index";
  function resolveConfig(slug?: string): ProductConfig {
    return slug ? getProductBySlug(slug) ?? defaultProduct : defaultProduct;
  }
  ```

---

### WR-05: Hub page destructing of `products` assumes exactly 2 elements

**File:** `src/routes/index.tsx:56`

**Issue:** The `HubPage` component destructures the `products` array into exactly two cards:

```tsx
const [kdmProduct, dockerGuardProduct] = products;
```

If a third product is added to the array and this line isn't updated, the third product would silently be ignored. If only one product remains, `dockerGuardProduct` would be `undefined`, causing a runtime error when passed to `ProductCard`.

**Fix:** Use a more resilient pattern that iterates over all products:

```tsx
function HubPage() {
  return (
    ...
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          product={product}
          to={`/${product.slug}`}
        />
      ))}
    </div>
    ...
  );
}
```

This requires removing the explicit `kdmProduct`/`dockerGuardProduct` destructuring and the `StatsRow`/`ProductCard` type signature stays the same.

---

## Info

### IN-01: Terminal `useEffect` missing dependency `[product]`

**File:** `src/components/Terminal.tsx:8-13`

**Issue:** The `useEffect` references `product.terminalLines` but does not include `product` in the dependency array:

```tsx
useEffect(() => {
  const timers = product.terminalLines.map((_, i) =>
    setTimeout(() => setVisible((v) => Math.max(v, i + 1)), 300 + i * 280)
  );
  return () => timers.forEach(clearTimeout);
}, []);   // ← missing `product` dependency
```

In practice this is unlikely to cause bugs — the Terminal component remounts when switching between products via route navigation — but it violates the `react-hooks/exhaustive-deps` rule and could cause stale closures if the component's lifecycle changes in the future.

**Fix:** Add `product` to the dependency array:
```tsx
}, [product]);
```

---

### IN-02: Hub page footer hardcodes "kdm" brand name

**File:** `src/routes/index.tsx:81`

**Issue:** The hub page footer renders a hardcoded brand string rather than using a shared constant or product config:

```tsx
<span className="font-mono text-sm uppercase tracking-[1.4px] text-foreground">
  kdm
</span>
```

Consider using the ecosystem name from a shared constant or the `defaultProduct.brandName`.

**Fix:**
```tsx
<span className="...">{defaultProduct.brandName}</span>
```

---

### IN-03: Privacy and Terms pages have hardcoded "KDM" in page titles

**Files:**
- `src/routes/privacy.tsx:10`
- `src/routes/terms.tsx:10`

**Issue:** Both pages use hardcoded titles:
```tsx
{ title: "Privacy Policy — KDM" }
{ title: "Terms of Service — KDM" }
```

These pages render under the root `ProductProvider` (defaults to kdm), so the branding is coincidentally correct. However, if these pages are ever shared across products or the default product changes, the titles would be wrong.

**Fix:** Use the default product's metadata for branding:
```tsx
import { defaultProduct } from "@/config/products/index";
// ...
{ title: `Privacy Policy — ${defaultProduct.displayName}` }
```

---

## Verification: Old docs routes properly removed

✅ **Confirmed:** The glob search for `src/routes/docs*` returns no results. The old flat doc routes (`src/routes/docs.tsx`, `src/routes/docs.index.tsx`, `src/routes/docs.$slug.tsx`) have been properly deleted and replaced with product-specific routes under `src/routes/kdm.docs.*` and `src/routes/docker-guard.docs.*`.

✅ **Confirmed:** The `routeTree.gen.ts` correctly registers all 14 routes including both product hierarchies. No orphan route entries exist.

✅ **Confirmed:** The `"Lovable App"` string has been completely replaced with `"KDM Ecosystem"` across all head metadata sections.

---

## Cross-Cutting Concern: ProductContext nesting

The root `__root.tsx` wraps the entire app in `<ProductProvider>` (slug-less → defaults to `kdm`). The product layout routes nest another `<ProductProvider slug="kdm|docker-guard">`. This nesting is:

- **Harmless** for `/kdm` and `/docker-guard` routes (inner provider shadows outer)
- **Correct** for `/privacy`, `/terms`, and `/` (no inner provider → gets `kdm` defaults)
- **Redundant** for `/kdm` specifically (inner `slug="kdm"` produces the same config as the root default)

This is not a bug but is worth noting: the root-level `ProductProvider` could be removed if all routes either provide their own or are fine with `kdm` defaults. However, doing so would break the `/privacy` and `/terms` pages which currently depend on the root provider for Navbar/Footer context.

---

## File Inventory

| File | Status | Notes |
|---|---|---|
| `src/config/products/types.ts` | ✅ Clean | Well-typed interface |
| `src/config/products/kdm.ts` | ✅ Clean | Complete product config |
| `src/config/products/docker-guard.ts` | ✅ Clean | Complete product config |
| `src/config/products/index.ts` | ⚠️ WR-04 | Dead `getProductBySlug` export |
| `src/context/ProductContext.tsx` | ✅ Clean | Correct context pattern |
| `src/components/Navbar.tsx` | ✅ Clean | Dynamic branding from context |
| `src/components/Hero.tsx` | 🔴 CR-01 | `href="#"` on primary CTA |
| `src/components/Features.tsx` | ⚠️ WR-01 note | Dynamic icon resolution is fragile but works |
| `src/components/Commands.tsx` | ✅ Clean | State managed correctly |
| `src/components/CTA.tsx` | 🔴 CR-01 | `href="#"` on primary CTA |
| `src/components/Terminal.tsx` | ℹ️ IN-01 | Missing useEffect dependency |
| `src/components/Footer.tsx` | 🔴 CR-02 | "Status" link misdirects to GitHub |
| `src/components/docs/DocView.tsx` | ⚠️ WR-01 | Unsanitized HTML rendering |
| `src/lib/docs.ts` | ✅ Clean | Parameterized doc loader |
| `src/routes/__root.tsx` | ✅ Clean | Provider setup correct |
| `src/routes/index.tsx` | ⚠️ WR-05 | Fragile array destructuring |
| `src/routes/kdm.tsx` | ✅ Clean | Correct context override |
| `src/routes/kdm.index.tsx` | ✅ Clean | Correct head metadata |
| `src/routes/kdm.docs.tsx` | ⚠️ WR-02 | Duplicate createDocLoader |
| `src/routes/kdm.docs.index.tsx` | ⚠️ WR-02 | Duplicate createDocLoader |
| `src/routes/kdm.docs.$slug.tsx` | ⚠️ WR-02 | Duplicate createDocLoader |
| `src/routes/docker-guard.tsx` | ✅ Clean | Correct context override |
| `src/routes/docker-guard.index.tsx` | ✅ Clean | Correct head metadata |
| `src/routes/docker-guard.docs.tsx` | ⚠️ WR-02 | Duplicate createDocLoader |
| `src/routes/docker-guard.docs.index.tsx` | ⚠️ WR-02 | Duplicate createDocLoader |
| `src/routes/docker-guard.docs.$slug.tsx` | ⚠️ WR-02 | Duplicate createDocLoader |
| `src/routes/privacy.tsx` | ℹ️ IN-03 | Hardcoded product name in title |
| `src/routes/terms.tsx` | ℹ️ IN-03 | Hardcoded product name in title |

---

_Reviewed: 2026-05-31T12:41:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
