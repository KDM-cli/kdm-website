---
phase: 02b-docs
plan: 01
type: execute
wave: 5
depends_on:
  - 02a-02
files_modified:
  - src/lib/docs.ts
  - src/docs/index.md
  - src/docs/installation.md
  - src/docs/commands.md
  - src/docs/contributing.md
  - src/docs/kdm/index.md
  - src/docs/kdm/installation.md
  - src/docs/kdm/commands.md
  - src/docs/kdm/contributing.md
  - src/docs/docker-guard/index.md
  - src/docs/docker-guard/installation.md
  - src/docs/docker-guard/commands.md
autonomous: true
requirements:
  - DOC-01
  - DOC-02
must_haves:
  truths:
    - "Docs loader accepts a product slug to load the right set of markdown files"
    - "src/docs/kdm/*.md contains kdm-cli documentation"
    - "src/docs/docker-guard/*.md contains Docker Guard documentation"
    - "Old src/docs/*.md files are removed (moved to subdirectories)"
    - "Doc routes render product-appropriate content"
  artifacts:
    - path: "src/lib/docs.ts"
      provides: "Parameterized doc loader"
      exports: ["createDocLoader"]
    - path: "src/docs/kdm/index.md"
      provides: "KDM docs landing page content"
    - path: "src/docs/docker-guard/index.md"
      provides: "Docker Guard docs landing page content"
  key_links:
    - from: "src/lib/docs.ts"
      to: "src/docs/kdm/*.md"
      via: "import.meta.glob"
      pattern: "import.meta.glob"
    - from: "src/lib/docs.ts"
      to: "src/docs/docker-guard/*.md"
      via: "import.meta.glob"
      pattern: "import.meta.glob"
---

<objective>
Reorganize doc files into product-specific directories and parameterize the docs loader.

Purpose: Doc files currently live flat in `src/docs/*.md` with no product association. We need product-scoped directories (`src/docs/kdm/`, `src/docs/docker-guard/`) and a loader that accepts a product slug to load the right set. The old `getDoc`/`docList`/`allDocs` must be replaced with a factory that takes a product parameter.

Output:
- `src/docs/kdm/` — kdm-cli markdown files
- `src/docs/docker-guard/` — Docker Guard markdown files
- Updated `src/lib/docs.ts` — factory functions accepting product slug
- Old flat docs removed
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/ROADMAP.md
@src/lib/docs.ts
@src/docs/index.md
@src/docs/installation.md
@src/docs/commands.md
@src/docs/contributing.md
@src/routes/kdm.docs.index.tsx
@src/routes/kdm.docs.$slug.tsx
@src/routes/kdm.docs.tsx
@src/routes/docker-guard.docs.index.tsx
@src/routes/docker-guard.docs.$slug.tsx
@src/routes/docker-guard.docs.tsx
</context>

<interfaces>
Current docs.ts loader (58 lines):
```typescript
const modules = import.meta.glob("../docs/*.md", {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;

// parseFrontmatter(raw) => { data, body }

const docs: Doc[] = Object.entries(modules)
  .map(([path, raw]) => { ... })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const allDocs: Doc[] = docs;
export const docList: DocMeta[] = docs.map(({ html: _h, ...meta }) => meta);
export function getDoc(slug: string): Doc | undefined {
  return docs.find((d) => d.slug === slug);
}
```

Product doc routes use these imports. Must be refactored to accept a product slug.
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Reorganize doc markdown files into product subdirectories</name>
  <files>
    src/docs/kdm/index.md,
    src/docs/kdm/installation.md,
    src/docs/kdm/commands.md,
    src/docs/kdm/contributing.md,
    src/docs/docker-guard/index.md,
    src/docs/docker-guard/installation.md,
    src/docs/docker-guard/commands.md,
    src/docs/index.md,
    src/docs/installation.md,
    src/docs/commands.md,
    src/docs/contributing.md
  </files>
  <action>
    Step 1 — Create the kdm docs subdirectory with exact copies of current docs:
    - Create `src/docs/kdm/` directory
    - Copy `src/docs/index.md` → `src/docs/kdm/index.md` (update frontmatter: title → "KDM Documentation", description references kdm-cli)
    - Copy `src/docs/installation.md` → `src/docs/kdm/installation.md` (keep as-is, references kdm)
    - Copy `src/docs/commands.md` → `src/docs/kdm/commands.md` (keep as-is, references kdm)
    - Copy `src/docs/contributing.md` → `src/docs/kdm/contributing.md` (keep as-is)

    Step 2 — Create the docker-guard docs subdirectory:
    - Create `src/docs/docker-guard/` directory
    - Create `src/docs/docker-guard/index.md` with Docker Guard content:
      ```markdown
      ---
      title: Docker Guard Documentation
      description: Overview of the Docker Guard CLI documentation.
      eyebrow: Overview
      order: 0
      ---

      Docker Guard is a lightweight CLI for monitoring Docker container security, health, and resource usage in real time. These docs cover installation, commands, and event monitoring.

      ## Get started

      Install Docker Guard, point it at your Docker host, and run `dg ps` to verify. Every command works against local Docker and remote hosts.

      ## Adding new docs

      Create a new file at `src/docs/docker-guard/<slug>.md` with frontmatter.
      ```
    - Create `src/docs/docker-guard/installation.md` with Docker Guard install content:
      ```markdown
      ---
      title: Installation
      description: Install Docker Guard on macOS, Linux, and Windows.
      eyebrow: Guide
      order: 1
      ---

      ## npm

      ```bash
      npm install -g docker-guard
      ```

      ## Verify

      ```bash
      dg --version
      ```
      ```
    - Create `src/docs/docker-guard/commands.md` with Docker Guard commands:
      ```markdown
      ---
      title: Commands
      description: Reference for all Docker Guard CLI commands.
      eyebrow: Reference
      order: 2
      ---

      Every Docker Guard subcommand, with examples.

      ```text
      Usage: dg [options] [command]

      Options:
        -V, --version    output the version number
        -h, --help       display help for command
      ```

      ## Subcommands

      - `dg guard [--strict]` — Watch containers for security threats.
      - `dg ps` — List containers with resource usage and threat status.
      - `dg health <container>` — Show health diagnostics.
      - `dg events --follow` — Stream live container events.
      - `dg audit` — View immutable audit trail.
      - `dg help [command]` — Display help for command.
      ```

    Step 3 — Remove old flat doc files:
    - Delete `src/docs/index.md`
    - Delete `src/docs/installation.md`
    - Delete `src/docs/commands.md`
    - Delete `src/docs/contributing.md`

    Do NOT move files via git mv — copy then delete. The loader will be updated in Task 2.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const k=['src/docs/kdm/index.md','src/docs/kdm/installation.md','src/docs/kdm/commands.md','src/docs/kdm/contributing.md']; k.forEach(f=>{if(!require('fs').existsSync(f)){console.error('Missing kdm doc:',f);process.exit(1)}}); const d=['src/docs/docker-guard/index.md','src/docs/docker-guard/installation.md','src/docs/docker-guard/commands.md']; d.forEach(f=>{if(!require('fs').existsSync(f)){console.error('Missing dg doc:',f);process.exit(2)}}); const old=['src/docs/index.md','src/docs/installation.md','src/docs/commands.md','src/docs/contributing.md']; old.forEach(f=>{if(require('fs').existsSync(f)){console.error('Old doc still exists:',f);process.exit(3)}}); console.log('OK')"</automated>
  </verify>
  <done>
    File structure: `src/docs/kdm/*.md` (4 files) + `src/docs/docker-guard/*.md` (3 files), old flat docs removed.
  </done>
</task>

<task type="auto">
  <name>Task 2: Parameterize the docs loader with createDocLoader factory</name>
  <files>src/lib/docs.ts</files>
  <action>
    Rewrite `src/lib/docs.ts` to export a factory function instead of pre-loaded singletons:

    Remove these exports: `allDocs`, `docList`, `getDoc` (the module-level ones)
    Add these exports:

    1. `export type DocSlug = "kdm" | "docker-guard"`

    2. `export function createDocLoader(product: DocSlug)`:
       - Returns an object `{ allDocs, docList, getDoc }`
       - Uses conditional `import.meta.glob` with different glob patterns based on `product`:
         - For `"kdm"`: `import.meta.glob("../docs/kdm/*.md", { query: "?raw", import: "default", eager: true })`
         - For `"docker-guard"`: `import.meta.glob("../docs/docker-guard/*.md", { query: "?raw", import: "default", eager: true })`
       - The rest of the logic (parseFrontmatter, sort, build Doc objects) is identical to the current implementation
       - Returns: `{ allDocs: Doc[], docList: DocMeta[], getDoc: (slug: string) ⇒ Doc | undefined }`

    3. Keep `parseFrontmatter` as a module-private function (not exported)

    4. Keep the `DocMeta`, `Doc` interfaces exported exactly as they are (for DocView consumer)

    IMPORTANT: `import.meta.glob` is a build-time transform in Vite. It does NOT accept dynamic strings. Use a conditional to pick between two static glob patterns:
    ```typescript
    function createDocLoader(product: DocSlug) {
      const modules: Record<string, string> = product === "kdm"
        ? import.meta.glob("../docs/kdm/*.md", { query: "?raw", import: "default", eager: true })
        : import.meta.glob("../docs/docker-guard/*.md", { query: "?raw", import: "default", eager: true });
      // ... rest of logic
    }
    ```

    Do NOT use `import.meta.glob` with a dynamic variable — Vite requires a static string literal.
    Do NOT keep the old module-level `getDoc`, `docList`, `allDocs` exports — they'll break if the old flat docs are gone.
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const c=require('fs').readFileSync('src/lib/docs.ts','utf8'); if(!c.includes('createDocLoader')){process.exit(1)}; if(c.includes('export const allDocs')||c.includes('export const docList')){process.exit(2)}; if(!c.includes('import.meta.glob')){process.exit(3)}; console.log('OK')"</automated>
  </verify>
  <done>
    `src/lib/docs.ts` exports `createDocLoader(product)` factory. Old top-level exports removed. `npx tsc --noEmit` passes.
  </done>
</task>

<task type="auto">
  <name>Task 3: Update doc route files to use createDocLoader</name>
  <files>
    src/routes/kdm.docs.tsx,
    src/routes/kdm.docs.index.tsx,
    src/routes/kdm.docs.$slug.tsx,
    src/routes/docker-guard.docs.tsx,
    src/routes/docker-guard.docs.index.tsx,
    src/routes/docker-guard.docs.$slug.tsx
  </files>
  <action>
    Update all 6 product doc route files to use the new `createDocLoader` API instead of the old module-level exports:

    **For `src/routes/kdm.docs.tsx`:**
    - Change: `import { docList } from "@/lib/docs"` → `import { createDocLoader } from "@/lib/docs"`
    - Add at top level or inside component: `const { docList } = createDocLoader("kdm")`
    - Link paths must reference `/kdm/docs/{d.slug}` (already correct from 02a-02)
    - Keep the rest of the component logic identical

    **For `src/routes/kdm.docs.index.tsx`:**
    - Change: `import { getDoc } from "@/lib/docs"` → `import { createDocLoader } from "@/lib/docs"`
    - Use: `const { getDoc } = createDocLoader("kdm")`
    - Everything else stays the same

    **For `src/routes/kdm.docs.$slug.tsx`:**
    - Same pattern as index — replace import, use `createDocLoader("kdm")`

    **For docker-guard doc routes:**
    - Same pattern but use `createDocLoader("docker-guard")`
    - Link paths must reference `/docker-guard/docs/{d.slug}` (already correct)

    IMPORTANT: Call `createDocLoader` inside the component function or at module level but NOT inside the Route.head callback — `import.meta.glob` runs at module init and must be at the top level of the module or inside a function that runs at module init time.

    Best pattern:
    ```typescript
    const { docList } = createDocLoader("kdm");

    export const Route = createFileRoute("/kdm/docs")({
      component: KdmDocsLayout,
    });
    ```
  </action>
  <verify>
    <automated>cd D:\Desktop\Yuvraj\kdm-website && node -e "const routes=['src/routes/kdm.docs.tsx','src/routes/kdm.docs.index.tsx','src/routes/kdm.docs.$slug.tsx','src/routes/docker-guard.docs.tsx','src/routes/docker-guard.docs.index.tsx','src/routes/docker-guard.docs.$slug.tsx']; routes.forEach(f=>{const c=require('fs').readFileSync(f,'utf8'); if(!c.includes('createDocLoader')){console.error(f,'missing createDocLoader');process.exit(1)}}); console.log('OK')"</automated>
  </verify>
  <done>
    All 6 product doc route files use createDocLoader with correct product slug. Build succeeds.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| n/a | Markdown files read from filesystem at build time, no user input |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-02b-01-01 | Tampering | doc files | accept | Markdown content is version-controlled, static at build time |
</threat_model>

<verification>
1. `createDocLoader("kdm")` returns kdm docs
2. `createDocLoader("docker-guard")` returns Docker Guard docs
3. Old flat docs removed from `src/docs/`
4. `npx tsc --noEmit` passes
5. `npm run build` succeeds
</verification>

<success_criteria>
- `src/docs/kdm/` has 4 markdown files
- `src/docs/docker-guard/` has 3 markdown files
- Old flat `src/docs/*.md` removed
- `createDocLoader(product)` factory works with both product slugs
- All 6 doc route files updated to use the factory
- Build compiles and docs render per-product
</success_criteria>