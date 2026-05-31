import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { createDocLoader } from "@/lib/docs";

const { docList } = createDocLoader("kdm");

export const Route = createFileRoute("/kdm/docs")({
  component: KdmDocsLayout,
  head: () => ({
    meta: [
      { title: "Docs — KDM" },
      {
        name: "description",
        content: "Documentation for KDM, the Kubernetes & Docker Monitor CLI.",
      },
    ],
  }),
});

function KdmDocsLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12">
        <aside className="md:sticky md:top-24 self-start">
          <p className="font-mono text-xs uppercase tracking-[1.4px] text-foreground/50 mb-4">
            Documentation
          </p>
          <nav className="flex flex-col gap-2 text-sm">
            {docList.map((d) => {
              const to = d.slug ? `/kdm/docs/${d.slug}` : "/kdm/docs";
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
      <Footer />
    </div>
  );
}
