---
phase: 02a-routing
plan: 02
type: execute
wave: 4
depends_on:
  - 02a-01
files_modified:
  - src/routes/kdm.index.tsx
  - src/routes/kdm.docs.tsx
  - src/routes/kdm.docs.index.tsx
  - src/routes/kdm.docs.$slug.tsx
  - src/routes/docker-guard.index.tsx
  - src/routes/docker-guard.docs.tsx
  - src/routes/docker-guard.docs.index.tsx
  - src/routes/docker-guard.docs.$slug.tsx
  - src/routes/docs.tsx
  - src/routes/docs.index.tsx
  - src/routes/docs.$slug.tsx
autonomous: true
requirements:
  - ROUTE-03
must_haves:
  truths:
    - "/kdm renders the kdm landing page (Hero, Features, Commands, CTA, Footer)"
    - "/docker-guard renders the Docker Guard landing page (Hero, Features, Commands, CTA, Footer)"
    - "/kdm/docs/ and /kdm/docs/:slug render documentation"
    - "/docker-guard/docs/ and /docker-guard/docs/:slug render documentation"
    - "Old /docs, /docs/, /docs/:slug routes redirect or are removed"
  artifacts:
    - path: "src/routes/kdm.index.tsx"
      provides: "kdm-cli landing page (Hero + Features + Commands + CTA + Navbar + Footer)"
    - path: "src/routes/docker-guard.index.tsx"
      provides: "Docker Guard landing page"
    - path: "src/routes/kdm.docs.tsx"
      provides: "Sidebar layout for kdm docs"
    - path: "src/routes/docker-guard.docs.tsx"
      provides: "Sidebar layout for Docker Guard docs"
    - path: "src/routes/kdm.docs.index.tsx"
      provides: "KDM docs index page"
    - path: "src/routes/docker-guard.docs.index.tsx"
      provides: "Docker Guard docs index page"
    - path: "src/routes/kdm.docs.$slug.tsx"
      provides: "KDM doc detail page"
    - path: "src/routes/docker-guard.docs.$slug.tsx"
      provides: "Docker Guard doc detail page"
  key_links:
    - from: "src/routes/kdm.index.tsx"
      to: "src/components/Hero"
      via: "import"
    - from: "src/routes/docker-guard.index.tsx"
      to: "src/components/Hero"
      via: "import"
    - from: "src/routes/kdm.docs.tsx"
      to: "src/lib/docs"
      via: "import docList"
    - from: "src/routes/docker-guard.docs.tsx"
      to: "src/lib/docs"
      via: "import docList"
---

<objective>
Create landing page and documentation routes under each product namespace.

Purpose: After Phase 2a Plan 1 establishes the layout shells (/kdm, /docker-guard), this plan creates the actual content routes — landing pages at /kdm/ and /docker-guard/, and docs routes under /kdm/docs/* and /docker-guard/docs/*. The old /docs routes are removed.

Output:
- Landing route files for both products
- Doc route files for both products (layout + index + slug)
- Old /docs routes deleted
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/ROADMAP.md
@src/routes/index.tsx (original — content to move)
@src/routes/docs.tsx
@src/routes/docs.index.tsx
@src/routes/docs.$slug.tsx
@src/components/Navbar.tsx
@src/components/Hero.tsx
@src/components/Features.tsx
@src/components/Commands.tsx
@src/components/CTA.tsx
@src/components/Footer.tsx
@src/components/docs/DocView.tsx
@src/lib/docs.ts
</context>

<interfaces>
From src/lib/docs.ts:
```typescript
export interface DocMeta { slug: string; title: string; description?: string; eyebrow?: string; order: number; }
export interface Doc extends DocMeta { html: string; }
export const allDocs: Doc[];
export const docList: DocMeta[];
export function getDoc(slug: string): Doc | undefined;
```

Existing docs.tsx sidebar (reference pattern):
```typescript
function DocsLayout() {
  return (
    <div className="...">
      <Navbar />
      <div className="container grid grid-cols-[220px_1fr] gap-12">
        <aside>
          <nav>{docList.map(d => <Link to={`/docs/${d.slug}`}>...</Link>)}</nav>
        </aside>
        <main><Outlet /></main>
      </div>
      <Footer />
    </div>
  );
}
```

Original index.tsx (content to repurpose):
```typescript
function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main><Hero /><Features /><Commands /><CTA /></main>
      <Footer />
    </div>
  );
}
```
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Create product landing pages (kdm.index.tsx, docker-guard.index.tsx)</name>
  <files>src/routes/kdm.index.tsx, src/routes/docker-guard.index.tsx</files>
  <action>
    Create two landing page route files:

    **`src/routes/kdm.index.tsx`**: 
    - Import: `createFileRoute`, Navbar, Hero, Features, Commands, CTA, Footer
    - Route path: `/kdm/` (TanStack file convention: `kdm.index.tsx`)
    - Component renders: full landing page with Navbar → Hero → Features → Commands → CTA → Footer
    - Head metadata: Use kdm product metadata from config (title, description, og tags)
    - Same structure as the ORIGINAL `src/routes/index.tsx` (the single-product kdm page that was replaced by the hub)
    - The meta block should use the kdm product's metadata values from the imported config, NOT hardcoded strings

    **`src/routes/docker-guard.index.tsx`**:
    - Same structure as kdm.index.tsx but for Docker Guard
    - Route path: `/docker-guard/`
    - Head metadata: Use docker-guard product metadata
    - Component renders: same landing layout with Navbar → Hero → Features → Commands → CTA → Footer

    Both files follow the pattern:
    ```typescript
    import { createFileRoute } from "@tanstack/react-router";
    import { Navbar } from "@/components/Navbar";
    import { Hero } from "@/components/Hero";
    // ... other components
    
    export const Route = createFileRoute("/kdm/")({
      component: KdmLanding,
      head: () => ({
        meta: [{ title: "..." }, { name: "description", content: "..." }],
      }),
    });
    
    function KdmLanding() {
      return (
        <div className="min-h-screen">
          <Navbar />
          <main><Hero /><Features /><Commands /><CTA /></main>
          <Footer />
        </div>
      );
    }
    ```

    The content is NOT hardcoded — components read from ProductContext (set by the parent layout route created in 02a-01).

    Do NOT import or reference the old config products directly in the component tree — the ProductContext from the parent layout shell already provides the right config.
    Do NOT add duplicate Navbar/Footer imports that would conflict with docs pages.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const k=require('fs').readFileSync('src/routes/kdm.index.tsx','utf8'); if(!k.includes('/kdm/')){process.exit(1)}; if(!k.includes('Navbar')||!k.includes('Hero')||!k.includes('Footer')){process.exit(2)}; const d=require('fs').readFileSync('src/routes/docker-guard.index.tsx','utf8'); if(!d.includes('/docker-guard/')){process.exit(3)}; console.log('OK')"</automated>
  </verify>
  <done>
    Both landing pages exist, compile, and reference landing components. `/kdm` shows kdm content, `/docker-guard` shows Docker Guard content.
  </done>
</task>

<task type="auto">
  <name>Task 2: Create product-scoped documentation routes and remove old /docs routes</name>
  <files>
    src/routes/kdm.docs.tsx,
    src/routes/kdm.docs.index.tsx,
    src/routes/kdm.docs.$slug.tsx,
    src/routes/docker-guard.docs.tsx,
    src/routes/docker-guard.docs.index.tsx,
    src/routes/docker-guard.docs.$slug.tsx,
    src/routes/docs.tsx,
    src/routes/docs.index.tsx,
    src/routes/docs.$slug.tsx
  </files>
  <action>
    Part A—Create product doc routes (4 kdm + 4 docker-guard):

    **`src/routes/kdm.docs.tsx`**: Documentation layout for kdm
    - Import: `createFileRoute, Link, Outlet`, Navbar, Footer, `docList` from `@/lib/docs`
    - Route: `/kdm/docs` (via `kdm.docs.tsx` convention)
    - Components: Navbar at top, sidebar with doc links, `<Outlet />` main area, Footer at bottom
    - Sidebar links point to `/kdm/docs/{d.slug}` (not `/docs/{d.slug}`)
    - Head: title "Docs — KDM", description about KDM documentation

    **`src/routes/kdm.docs.index.tsx`**: Index page for kdm docs
    - Import: `createFileRoute, notFound`, DocView, `getDoc` from `@/lib/docs`
    - Route: `/kdm/docs/`
    - Get doc with slug "" (empty string — the index doc)
    - If not found, throw notFound()
    - Head: title from doc metadata + " — KDM"

    **`src/routes/kdm.docs.$slug.tsx`**: Dynamic doc page for kdm
    - Same pattern as original docs.$slug.tsx but for /kdm/docs/$slug
    - Head: `{doc?.title ?? "Docs"} — KDM`
    - 404 message: mention `src/docs/kdm/` directory

    **`src/routes/docker-guard.docs.tsx`**: Documentation layout for docker-guard
    - Same structure as kdm.docs.tsx but references /docker-guard/docs/{d.slug}
    - Head: title "Docs — Docker Guard"
    - Sidebar links point to `/docker-guard/docs/{d.slug}`

    **`src/routes/docker-guard.docs.index.tsx`**: Index page for Docker Guard docs
    - Same pattern as kdm.docs.index.tsx
    - Head: title from doc + " — Docker Guard"

    **`src/routes/docker-guard.docs.$slug.tsx`**: Dynamic doc page for Docker Guard
    - Same pattern as kdm.docs.$slug.tsx
    - Head: `{doc?.title ?? "Docs"} — Docker Guard`
    - 404 message: mention `src/docs/docker-guard/` directory

    Part B—Remove old /docs routes:

    Delete the files: `src/routes/docs.tsx`, `src/routes/docs.index.tsx`, `src/routes/docs.$slug.tsx`

    After deletion, run `npm run build` to regenerate the route tree. The old `/docs/*` files no longer exist, so all links must use the new `/kdm/docs/*` paths.

    IMPORTANT: Do NOT import or pass product slug manually in these routes. The ProductContext from the parent layout (`/kdm` or `/docker-guard`) is already set. These doc routes are children of the product layouts and inherit the context.

    The docs loader (`src/lib/docs.ts`) currently loads from `../docs/*.md`. It will be parameterized in Phase 2b. For now, all doc routes will display kdm content until that phase updates the glob patterns. This is intentional — the routes need to exist first.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const files=['src/routes/kdm.docs.tsx','src/routes/kdm.docs.index.tsx','src/routes/kdm.docs.$slug.tsx','src/routes/docker-guard.docs.tsx','src/routes/docker-guard.docs.index.tsx','src/routes/docker-guard.docs.$slug.tsx']; files.forEach(f=>{if(!require('fs').existsSync(f)){console.error('Missing:',f);process.exit(1)}}); const old=['src/routes/docs.tsx','src/routes/docs.index.tsx','src/routes/docs.$slug.tsx']; old.forEach(f=>{if(require('fs').existsSync(f)){console.error('Still exists:',f);process.exit(2)}}); console.log('OK')"</automated>
  </verify>
  <done>
    All product doc routes exist and old /docs routes are removed. Build regenerates route tree correctly.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| n/a | Static file-routed content, no user input |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-02a-02-01 | Tampering | doc route files | accept | Routes are static files, not user-generated |
</threat_model>

<verification>
1. `/kdm/docs/` renders sidebar with kdm doc links
2. `/docker-guard/docs/` renders sidebar with Docker Guard doc links
3. Old `/docs` routes return 404 (deleted)
4. `npm run build` success with regenerated route tree
</verification>

<success_criteria>
- Product landing pages render Navbar + Hero + Features + Commands + CTA + Footer
- Product doc routes exist and show correct sidebar
- Old /docs routes removed
- Build succeeds
</success_criteria>