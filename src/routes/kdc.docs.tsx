import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { createDocsLoader } from "@/lib/docs";
import { kdcConfig } from "@/config/products/kdc";

export const Route = createFileRoute("/kdc/docs")({
  component: KdcDocsLayout,
  head: () => ({
    meta: [
      { title: `Docs — ${kdcConfig.displayName}` },
      { name: "description", content: `Documentation for ${kdcConfig.displayName}, the Kubernetes Docker Commander CLI.` },
    ],
  }),
});

function KdcDocsLayout() {
  const loader = createDocsLoader("kdc");

  return (
    <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12">
      <aside className="md:sticky md:top-24 self-start">
        <p className="font-mono text-xs uppercase tracking-[1.4px] text-foreground/50 mb-4">
          KDC Documentation
        </p>
        <nav className="flex flex-col gap-2 text-sm">
          {loader.docList.map((d) => {
            const to = d.slug ? `/kdc/docs/${d.slug}` : "/kdc/docs";
            return (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-foreground/50 hover:text-foreground" }}
                className="font-mono uppercase tracking-[1.4px] text-xs transition-colors"
              >
                {d.title}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="max-w-3xl">
        <Outlet />
      </main>
    </div>
  );
}
