import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocLoader } from "@/lib/docs";

const { getDoc } = createDocLoader("kdm");

export const Route = createFileRoute("/kdm/docs/$slug")({
  component: KdmDocPage,
  notFoundComponent: () => (
    <div className="text-foreground">
      <h1 className="font-mono text-3xl">Doc not found</h1>
      <p className="text-foreground/60 mt-2">
        Drop a Markdown file in <code>src/docs/kdm/</code> to add this page.
      </p>
    </div>
  ),
  head: ({ params }) => {
    const doc = getDoc(params.slug);
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — KDM` },
        { name: "description", content: doc?.description ?? "KDM documentation." },
      ],
    };
  },
});

function KdmDocPage() {
  const { slug } = Route.useParams();
  const doc = getDoc(slug);
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
