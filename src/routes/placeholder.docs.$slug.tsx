import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocsLoader } from "@/lib/docs";
import { placeholderConfig } from "@/config/products/placeholder";

export const Route = createFileRoute("/placeholder/docs/$slug")({
  component: PlaceholderDocPage,
  notFoundComponent: () => (
    <div className="text-foreground">
      <h1 className="font-mono text-3xl">Doc not found</h1>
      <p className="text-foreground/60 mt-2">
        This document could not be found under the KDC documentation section.
      </p>
    </div>
  ),
  head: ({ params }) => {
    const loader = createDocsLoader("placeholder");
    const doc = loader.getDoc(params.slug);
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — ${placeholderConfig.displayName}` },
        { name: "description", content: doc?.description ?? `${placeholderConfig.displayName} documentation page.` },
      ],
    };
  },
});

function PlaceholderDocPage() {
  const { slug } = Route.useParams();
  const loader = createDocsLoader("placeholder");
  const doc = loader.getDoc(slug);
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
