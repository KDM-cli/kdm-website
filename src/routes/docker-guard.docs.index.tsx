import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/DocView";
import { createDocLoader } from "@/lib/docs";

const { getDoc } = createDocLoader("docker-guard");

export const Route = createFileRoute("/docker-guard/docs/")({
  component: DockerGuardDocsIndex,
  head: () => {
    const doc = getDoc("");
    return {
      meta: [
        { title: `${doc?.title ?? "Docs"} — Docker Guard` },
        { name: "description", content: doc?.description ?? "Docker Guard documentation." },
      ],
    };
  },
});

function DockerGuardDocsIndex() {
  const doc = getDoc("");
  if (!doc) throw notFound();
  return <DocView doc={doc} />;
}
