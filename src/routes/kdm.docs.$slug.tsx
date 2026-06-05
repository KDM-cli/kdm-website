import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocsLoader } from "@/lib/docs";
import { kdmConfig } from "@/config/products/kdm";

export const Route = createFileRoute("/kdm/docs/$slug")({
  component: KdmDocPage,
  notFoundComponent: () => (
    <div className="text-foreground">
      <h1 className="font-mono text-3xl">Doc not found</h1>
      <p className="text-foreground/60 mt-2">
        This document could not be found under the KDM documentation section.
      </p>
    </div>
  ),
  head: ({ params }) => {
    const loader = createDocsLoader("kdm");
    const doc = loader.getDoc(params.slug);
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — ${kdmConfig.displayName}` },
        { name: "description", content: doc?.description ?? `${kdmConfig.displayName} documentation page.` },
      ],
    };
  },
});

function KdmDocPage() {
  const { slug } = Route.useParams();
  const loader = createDocsLoader("kdm");
  const doc = loader.getDoc(slug);
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
