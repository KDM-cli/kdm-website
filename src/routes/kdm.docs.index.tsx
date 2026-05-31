import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocLoader } from "@/lib/docs";

const { getDoc } = createDocLoader("kdm");

export const Route = createFileRoute("/kdm/docs/")({
  component: KdmDocsIndex,
  head: () => {
    const doc = getDoc("");
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — KDM` },
        { name: "description", content: doc?.description ?? "KDM documentation." },
      ],
    };
  },
});

function KdmDocsIndex() {
  const doc = getDoc("");
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
