// Patches @lovable.dev/vite-tanstack-config to prefer the ESM entrypoint
// (dist/index.js) over the CJS one (dist/index.cjs) for import contexts.
// Required for Node.js >=22.12 compat — the CJS file does require("vite"),
// which is ESM-only, causing ERR_REQUIRE_CYCLE_MODULE.
const fs = require("fs");
const path = require("path");

const pkgPath = path.resolve(
  __dirname,
  "..",
  "node_modules",
  "`@lovable.dev`",
  "vite-tanstack-config",
  "package.json",
);

if (!fs.existsSync(pkgPath)) {
  console.warn("[patch-lovable-config] package not found — skipping");
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

if (pkg.exports) {
  console.log("[patch-lovable-config] exports already present — nothing to do");
  process.exit(0);
}

pkg.exports = {
  ".": {
    import: "./dist/index.js",
    require: "./dist/index.cjs",
  },
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("[patch-lovable-config] added exports field to prefer ESM entrypoint");
