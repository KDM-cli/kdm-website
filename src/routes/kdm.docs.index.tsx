import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocsLoader } from "@/lib/docs";
import { kdmConfig } from "@/config/products/kdm";

export const Route = createFileRoute("/kdm/docs/")({
  component: KdmDocsIndex,
  head: () => {
    const loader = createDocsLoader("kdm");
    const doc = loader.getDoc("");
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — ${kdmConfig.displayName}` },
        { name: "description", content: doc?.description ?? `${kdmConfig.displayName} documentation.` },
      ],
    };
  },
});

function KdmDocsIndex() {
  const loader = createDocsLoader("kdm");
  const doc = loader.getDoc("");
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
