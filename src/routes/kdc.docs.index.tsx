import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocsLoader } from "@/lib/docs";
import { kdcConfig } from "@/config/products/kdc";

export const Route = createFileRoute("/kdc/docs/")({
  component: KdcDocsIndex,
  head: () => {
    const loader = createDocsLoader("kdc");
    const doc = loader.getDoc("");
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — ${kdcConfig.displayName}` },
        { name: "description", content: doc?.description ?? `${kdcConfig.displayName} documentation.` },
      ],
    };
  },
});

function KdcDocsIndex() {
  const loader = createDocsLoader("kdc");
  const doc = loader.getDoc("");
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
