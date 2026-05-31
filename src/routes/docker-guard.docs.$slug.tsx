import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocLoader } from "@/lib/docs";

const { getDoc } = createDocLoader("docker-guard");

export const Route = createFileRoute("/docker-guard/docs/$slug")({
  component: DockerGuardDocPage,
  notFoundComponent: () => (
    <div className="text-foreground">
      <h1 className="font-mono text-3xl">Doc not found</h1>
      <p className="text-foreground/60 mt-2">
        Drop a Markdown file in <code>src/docs/docker-guard/</code> to add this page.
      </p>
    </div>
  ),
  head: ({ params }) => {
    const doc = getDoc(params.slug);
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — Docker Guard` },
        { name: "description", content: doc?.description ?? "Docker Guard documentation." },
      ],
    };
  },
});

function DockerGuardDocPage() {
  const { slug } = Route.useParams();
  const doc = getDoc(slug);
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
