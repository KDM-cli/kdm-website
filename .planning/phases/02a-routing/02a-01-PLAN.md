---
phase: 02a-routing
plan: 01
type: execute
wave: 3
depends_on:
  - 01-02
files_modified:
  - src/routes/index.tsx
  - src/routes/kdm.tsx
  - src/routes/docker-guard.tsx
autonomous: true
requirements:
  - ROUTE-01
  - ROUTE-02
must_haves:
  truths:
    - "/ renders a hub/selection page showing both products"
    - "/kdm renders the kdm-cli landing page"
    - "/docker-guard renders the Docker Guard landing page"
    - "Privacy and Terms remain at root level with neutral layout"
    - "Navigation between hub and product pages works"
  artifacts:
    - path: "src/routes/index.tsx"
      provides: "Hub/selection page at /"
      contains: "HubPage"
    - path: "src/routes/kdm.tsx"
      provides: "Product layout for /kdm/* routes"
      contains: "ProductProvider slug='kdm'"
    - path: "src/routes/docker-guard.tsx"
      provides: "Product layout for /docker-guard/* routes"
      contains: "ProductProvider slug='docker-guard'"
  key_links:
    - from: "src/routes/index.tsx"
      to: "src/routes/kdm.tsx"
      via: "Link component to='/kdm'"
    - from: "src/routes/index.tsx"
      to: "src/routes/docker-guard.tsx"
      via: "Link component to='/docker-guard'"
    - from: "src/routes/kdm.tsx"
      to: "src/context/ProductContext.tsx"
      via: "import ProductProvider"
    - from: "src/routes/docker-guard.tsx"
      to: "src/context/ProductContext.tsx"
      via: "import ProductProvider"
---

<objective>
Transform the single-product route structure into a hub-and-product layout architecture.

Purpose: Per the approved routing approach (Approach C — Hub + Redirect), `/` becomes a product selection hub, `/kdm/*` serves kdm-cli content, and `/docker-guard/*` serves Docker Guard content. Product layout routes set the correct ProductContext slug so all child components render the right branded content.

Output:
- Updated `src/routes/index.tsx` — hub selection page
- New `src/routes/kdm.tsx` — kdm product layout
- New `src/routes/docker-guard.tsx` — Docker Guard product layout
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/ROADMAP.md
@src/routes/index.tsx
@src/context/ProductContext.tsx
@src/config/products/types.ts
@src/config/products/index.ts
</context>

<interfaces>
From src/context/ProductContext.tsx:
```typescript
function ProductProvider({ slug, children }: { slug?: string; children: ReactNode }): JSX.Element;
function useProduct(): ProductConfig;
```

Existing route file pattern (src/routes/docs.tsx):
```typescript
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});
function DocsLayout() { ... }
```
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Convert index.tsx from single-product landing to hub selection page</name>
  <files>src/routes/index.tsx</files>
  <action>
    Rewrite `src/routes/index.tsx`:

    Replace the entire file content. The new hub page:
    
    1. Imports:
       - `import { createFileRoute, Link } from "@tanstack/react-router"`
       - `import { products } from "@/config/products/index"`
       - `import type { ProductConfig } from "@/config/products/types"`

    2. Route definition:
       ```typescript
       export const Route = createFileRoute("/")({
         component: HubPage,
         head: () => ({
           meta: [
             { title: "KDM Ecosystem" },
             { name: "description", content: "Open-source CLI ecosystem for Kubernetes and Docker monitoring." },
           ],
         }),
       });
       ```

    3. `HubPage` function:
       - Full viewport height (`min-h-screen`)
       - Top section: "KDM Ecosystem" as the primary heading with "Choose your tool" subtitle
       - Two product cards side by side (stacked on mobile), each linking to `{product.slug}` via `<Link to="/kdm">` / `<Link to="/docker-guard">`
       - Each card shows:
         - Product `displayName` as heading
         - `description` as text
         - "Explore {displayName}" button
         - Stats section (3 stats from config)
       - Footer at bottom with links to /privacy and /terms
       - Dark theme styling consistent with existing design (bg-background, text-foreground, border-border)
       - Use `font-mono` class, `uppercase tracking-[1.4px]` for labels, same border/button styling patterns as existing components
    
    4. Remove imports of Navbar, Hero, Features, Commands, CTA, Footer — none of these belong on the hub page.

    The hub page is a clean, minimal gateway. Think of it like a product launchpad.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const c=require('fs').readFileSync('src/routes/index.tsx','utf8'); if(!c.includes('HubPage')){process.exit(1)}; if(!c.includes('KDM Ecosystem')){process.exit(2)}; if(c.includes('Navbar')||c.includes('Hero')||c.includes('Features')){process.exit(3)}; if(!c.includes('/kdm')||!c.includes('/docker-guard')){process.exit(4)}; console.log('OK')"</automated>
  </verify>
  <done>
    `src/routes/index.tsx` renders a product selection hub with cards for both products, no hardcoded kdm branding.
    `npm run build` succeeds.
  </done>
</task>

<task type="auto">
  <name>Task 2: Create kdm and docker-guard product layout routes</name>
  <files>src/routes/kdm.tsx, src/routes/docker-guard.tsx</files>
  <action>
    Create two layout route files that follow the same pattern:

    **`src/routes/kdm.tsx`:**
    ```typescript
    import { createFileRoute, Outlet } from "@tanstack/react-router";
    import { ProductProvider } from "@/context/ProductContext";

    export const Route = createFileRoute("/kdm")({
      component: KdmLayout,
    });

    function KdmLayout() {
      return (
        <ProductProvider slug="kdm">
          <Outlet />
        </ProductProvider>
      );
    }
    ```
    
    **`src/routes/docker-guard.tsx`:**
    ```typescript
    import { createFileRoute, Outlet } from "@tanstack/react-router";
    import { ProductProvider } from "@/context/ProductContext";

    export const Route = createFileRoute("/docker-guard")({
      component: DockerGuardLayout,
    });

    function DockerGuardLayout() {
      return (
        <ProductProvider slug="docker-guard">
          <Outlet />
        </ProductProvider>
      );
    }
    ```

    These are pure layout shells — they only set the ProductContext and render `<Outlet />`. All content (Navbar, Hero, Features, etc.) lives in the child route components.

    Do NOT add head metadata — child routes handle that.
    Do NOT add any other components or imports.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const k=require('fs').readFileSync('src/routes/kdm.tsx','utf8'); if(!k.includes('slug=\"kdm\"')){process.exit(1)}; const d=require('fs').readFileSync('src/routes/docker-guard.tsx','utf8'); if(!d.includes('slug=\"docker-guard\"')){process.exit(2)}; console.log('OK')"</automated>
  </verify>
  <done>
    Both `src/routes/kdm.tsx` and `src/routes/docker-guard.tsx` exist, set their respective ProductContext slugs, and render `<Outlet />`. Build compiles.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| n/a | Static routes, no user input |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-02a-01-01 | Spoofing | route slug | accept | Slug is hardcoded in route file, not user-provided |
</threat_model>

<verification>
1. Visit `/` — shows hub selection page
2. Visit `/kdm` — renders kdm layout (empty shell until landing routes are created)
3. Visit `/docker-guard` — renders Docker Guard layout (empty shell until landing routes)
4. `npm run build` succeeds
5. TanStack Router route tree auto-generates new routes
</verification>

<success_criteria>
- `/` = hub selection page with links to both products
- `/kdm` and `/docker-guard` routes exist and compile
- Privacy and Terms routes remain unchanged at root level
</success_criteria>
