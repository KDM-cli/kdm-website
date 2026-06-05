import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocsLoader } from "@/lib/docs";
import { placeholderConfig } from "@/config/products/placeholder";

export const Route = createFileRoute("/placeholder/docs/")({
  component: PlaceholderDocsIndex,
  head: () => {
    const loader = createDocsLoader("placeholder");
    const doc = loader.getDoc("");
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — ${placeholderConfig.displayName}` },
        { name: "description", content: doc?.description ?? `${placeholderConfig.displayName} documentation.` },
      ],
    };
  },
});

function PlaceholderDocsIndex() {
  const loader = createDocsLoader("placeholder");
  const doc = loader.getDoc("");
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
