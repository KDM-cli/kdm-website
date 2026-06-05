import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocsLoader } from "@/lib/docs";
import { kdcConfig } from "@/config/products/kdc";

export const Route = createFileRoute("/kdc/docs/$slug")({
  component: KdcDocPage,
  notFoundComponent: () => (
    <div className="text-foreground">
      <h1 className="font-mono text-3xl">Doc not found</h1>
      <p className="text-foreground/60 mt-2">
        This document could not be found under the KDC documentation section.
      </p>
    </div>
  ),
  head: ({ params }) => {
    const loader = createDocsLoader("kdc");
    const doc = loader.getDoc(params.slug);
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — ${kdcConfig.displayName}` },
        { name: "description", content: doc?.description ?? `${kdcConfig.displayName} documentation page.` },
      ],
    };
  },
});

function KdcDocPage() {
  const { slug } = Route.useParams();
  const loader = createDocsLoader("kdc");
  const doc = loader.getDoc(slug);
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
