import { marked } from "marked";

export type DocSlug = "kdm" | "docker-guard";

export interface DocMeta {
  slug: string;
  title: string;
  description?: string;
  eyebrow?: string;
  order: number;
}

export interface Doc extends DocMeta {
  html: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) data[key] = value;
  }
  return { data, body: match[2] };
}

export function createDocLoader(product: DocSlug) {
  const modules: Record<string, string> =
    product === "kdm"
      ? import.meta.glob("../docs/kdm/*.md", {
          query: "?raw",
          import: "default",
          eager: true,
        })
      : import.meta.glob("../docs/docker-guard/*.md", {
          query: "?raw",
          import: "default",
          eager: true,
        });

  const docs: Doc[] = Object.entries(modules)
    .map(([path, raw]) => {
      const file = path.split("/").pop()!.replace(/\.md$/, "");
      const slug = file === "index" ? "" : file;
      const { data, body } = parseFrontmatter(raw);
      return {
        slug,
        title: data.title ?? slug ?? "Untitled",
        description: data.description,
        eyebrow: data.eyebrow,
        order: data.order ? Number(data.order) : 999,
        html: marked.parse(body, { async: false }) as string,
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  const allDocs: Doc[] = docs;
  const docList: DocMeta[] = docs.map(({ html: _h, ...meta }) => meta);
  const getDoc = (slug: string): Doc | undefined =>
    docs.find((d) => d.slug === slug);

  return { allDocs, docList, getDoc };
}
