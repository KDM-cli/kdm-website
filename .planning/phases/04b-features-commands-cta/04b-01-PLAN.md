---
phase: 04b-features-commands-cta
plan: 01
type: execute
wave: 3
depends_on:
  - 01-02
files_modified:
  - src/components/Features.tsx
  - src/components/Commands.tsx
  - src/components/CTA.tsx
autonomous: true
requirements:
  - LP-02
must_haves:
  truths:
    - "Features renders product-specific feature grid from ProductConfig"
    - "Commands renders product-specific command list with interactive tabs"
    - "CTA renders product-specific tagline, description, and buttons"
    - "All three components work for both kdm and Docker Guard"
  artifacts:
    - path: "src/components/Features.tsx"
      provides: "Product-aware features grid"
      contains: "useProduct"
    - path: "src/components/Commands.tsx"
      provides: "Product-aware interactive command demos"
      contains: "useProduct"
    - path: "src/components/CTA.tsx"
      provides: "Product-aware call-to-action section"
      contains: "useProduct"
  key_links:
    - from: "src/components/Features.tsx"
      to: "src/context/ProductContext.tsx"
      via: "import useProduct"
    - from: "src/components/Commands.tsx"
      to: "src/context/ProductContext.tsx"
      via: "import useProduct"
    - from: "src/components/CTA.tsx"
      to: "src/context/ProductContext.tsx"
      via: "import useProduct"
---

<objective>
Parameterize Features, Commands, and CTA components to render product-specific content from ProductConfig.

Purpose: Features, Commands, and CTA components currently hardcode kdm-cli content. They must read from ProductContext so the Docker Guard landing page shows appropriate features, commands, and call-to-action.

Output:
- Updated `src/components/Features.tsx` — features grid driven by `product.features`
- Updated `src/components/Commands.tsx` — command tabs driven by `product.commands`
- Updated `src/components/CTA.tsx` — CTA text/buttons driven by product config
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/ROADMAP.md
@src/components/Features.tsx
@src/components/Commands.tsx
@src/components/CTA.tsx
@src/context/ProductContext.tsx
@src/config/products/types.ts
</context>

<interfaces>
```typescript
function useProduct(): ProductConfig;

interface ProductConfig {
  displayName: string;
  features: ProductFeature[];
  commands: ProductCommand[];
  ctaTagline: string;
  ctaDescription: string;
  ctaPrimaryText: string;
  docsPath: string;
  githubUrl: string;
}

interface ProductFeature {
  icon: string;      // Lucide icon name (e.g. "Eye", "Shield")
  title: string;
  desc: string;
  cmd: string;
}

interface ProductCommand {
  name: string;
  sig: string;
  desc: string;
  output: string;
}
```
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Parameterize Features component with useProduct</name>
  <files>src/components/Features.tsx</files>
  <action>
    Edit `src/components/Features.tsx`:

    1. Add import: `import { useProduct } from "@/context/ProductContext";`

    2. Add icon resolution — the config stores icon names as strings (e.g. "Eye", "Shield"), but Features.tsx uses actual Lucide icon components. Create a lookup map inside the component:
       ```typescript
       import * as LucideIcons from "lucide-react";
       ```

    3. Inside the `Features` component (at top):
       ```typescript
       const product = useProduct();
       ```

    4. Remove the module-level `const features = [...]` array — it's no longer needed.

    5. Replace the heading and description:
       - `// features` label stays (it's an architectural label, not product-specific)
       - `"One CLI for the entire stack."` heading → `{product.displayName} features`
         Actually, make it dynamic: something like `"Everything {product.displayName} does."` or keep a generic heading.
         Use: `"Built for {product.displayName}."` — keep the same h2 style.
       - Description paragraph → replace with a generic: `"From quick checks to deep diagnostics, {product.displayName} gives you the tools to stay on top of your infrastructure."` using template literal.
       Keep these dynamic but maintain the same tone.

    6. Replace the features grid iteration:
       ```tsx
       {product.features.map((f) => {
         const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[f.icon];
         return (
           <div key={f.title} className="group relative p-8 bg-background hover:bg-[rgba(255,255,255,0.03)] transition-colors">
             <div className="flex items-center justify-between mb-6">
               {Icon && <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />}
               <code className="font-mono text-xs uppercase tracking-[1px] text-foreground/50 px-2 py-1 border border-[rgba(255,255,255,0.2)]">
                 {f.cmd}
               </code>
             </div>
             <h3 className="text-lg font-normal mb-2">{f.title}</h3>
             <p className="text-sm text-foreground/70 leading-relaxed">{f.desc}</p>
           </div>
         );
       })}
       ```

    7. Keep ALL CSS classes, grid layout (`grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border`), section structure, and responsive breakpoints exactly as they are.
    
    8. Keep the section `id="features"` for scroll anchor.

    Do NOT remove the section ID or CSS classes.
    Do NOT hardcode feature data — use `product.features`.
    Do NOT change the layout structure.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const c=require('fs').readFileSync('src/components/Features.tsx','utf8'); if(!c.includes('useProduct')){process.exit(1)}; if(!c.includes('product.features.map')){process.exit(2)}; if(!c.includes('LucideIcons')){process.exit(3)}; if(c.includes('const features =')){process.exit(4)}; console.log('OK')"</automated>
  </verify>
  <done>
    Features component renders product-specific features grid. Build succeeds.
  </done>
</task>

<task type="auto">
  <name>Task 2: Parameterize Commands component with useProduct</name>
  <files>src/components/Commands.tsx</files>
  <action>
    Edit `src/components/Commands.tsx`:

    1. Add import: `import { useProduct } from "@/context/ProductContext";`

    2. Inside the `Commands` component (at top):
       ```typescript
       const product = useProduct();
       ```

    3. Remove the module-level `const commands = [...]` array.

    4. Replace all references from `commands` to `product.commands`:
       - `const [active, setActive] = useState(0)` stays
       - `const cmd = commands[active]` → `const cmd = product.commands[active]`
       - `commands.map((c, i) ⇒ ...)` → `product.commands.map((c, i) ⇒ ...)`

    5. Replace the heading:
       - `"Simple syntax. Powerful output."` → Keep as-is (it's generic enough to work for both products)
       - Or make it dynamic: `"{product.displayName} commands"` — keep the same style.

    6. The section `id="commands"` stays for scroll anchor.
    7. All CSS classes, grid layout, tab buttons, terminal output styling stay identical.

    Do NOT change the layout, responsive behavior, or CSS classes.
    Do NOT hardcode command data.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const c=require('fs').readFileSync('src/components/Commands.tsx','utf8'); if(!c.includes('useProduct')){process.exit(1)}; if(!c.includes('product.commands')){process.exit(2)}; if(c.includes('const commands =')){process.exit(3)}; console.log('OK')"</automated>
  </verify>
  <done>
    Commands component renders product-specific command tabs. Build succeeds.
  </done>
</task>

<task type="auto">
  <name>Task 3: Parameterize CTA component with useProduct</name>
  <files>src/components/CTA.tsx</files>
  <action>
    Edit `src/components/CTA.tsx`:

    1. Add import: `import { useProduct } from "@/context/ProductContext";`

    2. Inside the `CTA` component (at top):
       ```typescript
       const product = useProduct();
       ```

    3. Replace hardcoded values:
       - Big CTA word `Ship.` → `{product.ctaTagline}`
       - CTA description paragraph → `{product.ctaDescription}`
       - Primary button text `"Start Now"` → `{product.ctaPrimaryText}`
       - Docs button link `/docs` → `{product.docsPath}` (use plain `<a>` since `<Link>` requires static `to`)

    4. The `Link` import may no longer be needed for the docs button (replaced with `<a>`). But keep the import if the primary button uses `<Link>`. 
       - If the primary button currently uses `<a href="#">`, keep it as `<a href="#">{product.ctaPrimaryText}</a>` 
       - If the docs button uses `<Link to="/docs">`, replace with `<a href={product.docsPath} ...>Read the docs</a>`

    5. Keep ALL CSS classes, grid-bg background, section padding, responsive sizing, and layout.
    6. Keep the section border and overflow-hidden classes.

    Do NOT change the layout structure or CSS.
    Do NOT hardcode CTA text.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const c=require('fs').readFileSync('src/components/CTA.tsx','utf8'); if(!c.includes('useProduct')){process.exit(1)}; if(!c.includes('product.ctaTagline')){process.exit(2)}; if(!c.includes('product.ctaDescription')){process.exit(3)}; if(!c.includes('product.ctaPrimaryText')){process.exit(4)}; if(!c.includes('product.docsPath')){process.exit(5)}; console.log('OK')"</automated>
  </verify>
  <done>
    CTA component renders product-specific tagline, description, and buttons. Build succeeds.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| n/a | Static config data, no user input |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-04b-01-01 | Tampering | feature/command icons | accept | Icon names resolved from Lucide library at build time |
</threat_model>

<verification>
1. Visit `/kdm` — Features shows kdm features, Commands shows kdm commands, CTA shows "Try KDM"
2. Visit `/docker-guard` — Features shows Docker Guard features, Commands shows dg commands, CTA shows "Try Docker Guard"
3. All interactive elements (command tabs, copy buttons) work for both products
4. `npm run build` succeeds
</verification>

<success_criteria>
- Features, Commands, CTA render product-specific content from ProductContext
- All three components maintain existing styling and layout
- Each product landing page shows correct content for all components
</success_criteria>
