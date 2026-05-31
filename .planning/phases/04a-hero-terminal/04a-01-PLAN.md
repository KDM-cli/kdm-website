---
phase: 04a-hero-terminal
plan: 01
type: execute
wave: 3
depends_on:
  - 01-02
files_modified:
  - src/components/Hero.tsx
  - src/components/Terminal.tsx
autonomous: true
requirements:
  - LP-01
must_haves:
  truths:
    - "Hero renders product-specific tagline, description, install command, version, stats, GitHub link"
    - "Terminal renders product-specific terminal output lines"
    - "Components work correctly for both kdm and Docker Guard products"
  artifacts:
    - path: "src/components/Hero.tsx"
      provides: "Product-aware hero section"
      contains: "useProduct"
    - path: "src/components/Terminal.tsx"
      provides: "Product-aware terminal demo"
      contains: "useProduct"
  key_links:
    - from: "src/components/Hero.tsx"
      to: "src/context/ProductContext.tsx"
      via: "import useProduct"
    - from: "src/components/Terminal.tsx"
      to: "src/context/ProductContext.tsx"
      via: "import useProduct"
---

<objective>
Parameterize Hero and Terminal components to render product-specific content from ProductConfig.

Purpose: Hero and Terminal currently hardcode kdm-cli text, install commands, stats, version badges, and terminal animations. They must read from ProductContext to render correctly on both product landing pages.

Output:
- Updated `src/components/Hero.tsx` — product-aware tagline, description, install command, stats, buttons
- Updated `src/components/Terminal.tsx` — product-aware terminal output lines
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/ROADMAP.md
@src/components/Hero.tsx
@src/components/Terminal.tsx
@src/context/ProductContext.tsx
@src/config/products/types.ts
</context>

<interfaces>
```typescript
// From ProductContext
function useProduct(): ProductConfig;

// Relevant ProductConfig fields for Hero
interface ProductConfig {
  slug: string;
  displayName: string;
  tagline: string;
  description: string;
  version: string;
  installCommand: string;
  githubUrl: string;
  stats: ProductStat[];
  ctaPrimaryText: string;
  features: ProductFeature[];
  commands: ProductCommand[];
  terminalLines: TerminalLine[];
}

interface ProductStat { value: string; label: string; }
interface ProductFeature { icon: string; title: string; desc: string; cmd: string; }
interface ProductCommand { name: string; sig: string; desc: string; output: string; }
interface TerminalLine { prompt?: string; text: string; out?: boolean; blink?: boolean; }
```
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Parameterize Hero component with useProduct</name>
  <files>src/components/Hero.tsx</files>
  <action>
    Edit `src/components/Hero.tsx`:

    1. Add import: `import { useProduct } from "@/context/ProductContext";`

    2. Inside the `Hero` component (at top):
       ```typescript
       const product = useProduct();
       ```

    3. Replace these hardcoded values:
       - Version badge `// v2.4.0 — cloud sync now in beta` → `{product.version}`
       - H1 text `kdm.` → `{product.displayName}.` (with period suffix)
       - H2 tagline → `{product.tagline}`
       - Description paragraph → `{product.description}`
       - Install command in copy button → `{product.installCommand}`
       - "Try KDM" button → `{product.ctaPrimaryText}`
       - GitHub "View on GitHub" URL → `{product.githubUrl}`
       - Stats grid (3 items) → map over `product.stats`:
         ```tsx
         {product.stats.map((stat, i) => (
           <div key={i}>
             <div className="font-mono text-2xl sm:text-3xl font-light">{stat.value}</div>
             <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
           </div>
         ))}
         ```

       - `npm install -g kdm-cli` inside the copy-to-clipboard button → `{product.installCommand}`

    4. The `copy` function should copy `product.installCommand` instead of the hardcoded string.

    5. Keep ALL CSS classes, layout structure, grid-bg background, border-b border, responsive breakpoints exactly as they are.

    6. Keep the Terminal import and usage — it's already a child component and will be parameterized in Task 2.
       The Terminal is rendered inside Hero's right column:
       ```tsx
       <div className="relative">
         <Terminal />
       </div>
       ```

    Do NOT change the layout, grid structure, or CSS classes.
    Do NOT remove the copy button or any CTA buttons.
    Do NOT add emoji.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const c=require('fs').readFileSync('src/components/Hero.tsx','utf8'); if(!c.includes('useProduct')){process.exit(1)}; if(!c.includes('product.tagline')){process.exit(2)}; if(!c.includes('product.version')){process.exit(3)}; if(!c.includes('product.installCommand')){process.exit(4)}; if(!c.includes('product.stats.map')){process.exit(5)}; if(!c.includes('product.githubUrl')){process.exit(6)}; if(!c.includes('product.displayName')){process.exit(7)}; console.log('OK')"</automated>
  </verify>
  <done>
    Hero component renders product-specific content from ProductContext. `npm run build` succeeds.
  </done>
</task>

<task type="auto">
  <name>Task 2: Parameterize Terminal component with useProduct</name>
  <files>src/components/Terminal.tsx</files>
  <action>
    Edit `src/components/Terminal.tsx`:

    1. Add import: `import { useProduct } from "@/context/ProductContext";`

    2. Replace the module-level `lines` array — it is no longer hardcoded. Move the line definitions into the component or remove them entirely.

    3. Inside the `Terminal` component (at top):
       ```typescript
       const product = useProduct();
       ```

    4. Replace the `lines` constant reference with `product.terminalLines`:
       - The `useState(0)` stays for tracking visible lines
       - The `useEffect` timer loop iterates over `product.terminalLines` instead of the hardcoded `lines`
       - The render loop maps over `product.terminalLines.slice(0, visible)`

    5. Keep the terminal header title (the breadcrumb in the top bar). Currently it shows:
       ```tsx
       <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/50">
         ~/cluster — kdm
       </span>
       ```
       Replace `kdm` with `{product.brandName}` so it reads:
       ```
       ~/cluster — kdm          (for kdm-cli)
       ~/cluster — dg           (for Docker Guard)
       ```

    6. Remove the old `const lines = [...]` array from module scope — it's no longer used.

    IMPORTANT: The `useEffect` depends on `product.terminalLines.length` for the timer schedule. The dependency array already includes `[]` (empty), which means timers are set once on mount. This is correct — the product doesn't change during a page view. Keep the empty dependency array.

    Keep all CSS, animation logic, cursor blink logic, and layout identical.
    Keep the `animate-blink` class reference.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const c=require('fs').readFileSync('src/components/Terminal.tsx','utf8'); if(!c.includes('useProduct')){process.exit(1)}; if(!c.includes('product.terminalLines')){process.exit(2)}; if(c.includes('const lines =')){process.exit(3)}; if(!c.includes('product.brandName')){process.exit(4)}; console.log('OK')"</automated>
  </verify>
  <done>
    Terminal component renders product-specific lines from ProductContext. Old hardcoded lines array removed. Build succeeds.
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
| T-04a-01-01 | Tampering | install command | accept | Install command is a static config value |
</threat_model>

<verification>
1. Visit `/kdm` — Hero shows kdm content, Terminal shows kdm commands
2. Visit `/docker-guard` — Hero shows Docker Guard content, Terminal shows dg commands
3. Copy button copies the correct install command for each product
4. Stats grid shows product-appropriate stats
5. `npm run build` succeeds
</verification>

<success_criteria>
- Hero renders product-specific tagline, description, install command, version, stats, GitHub link, CTA
- Terminal renders product-specific terminal simulation lines
- Both components usable under any product context
</success_criteria>
