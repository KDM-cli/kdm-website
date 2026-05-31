import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/config/products/index";
import type { ProductConfig } from "@/config/products/types";

export const Route = createFileRoute("/")({
  component: HubPage,
  head: () => ({
    meta: [
      { title: "KDM Ecosystem" },
      {
        name: "description",
        content: "Open-source CLI ecosystem for Kubernetes and Docker monitoring.",
      },
    ],
  }),
});

function StatsRow({ product }: { product: ProductConfig }) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
      {product.stats.slice(0, 3).map((stat) => (
        <div key={stat.label}>
          <p className="font-mono text-lg text-foreground">{stat.value}</p>
          <p className="font-mono text-[10px] uppercase tracking-[1.4px] text-foreground/40 mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product, to }: { product: ProductConfig; to: string }) {
  return (
    <Link
      to={to}
      className="group block p-8 rounded-lg border border-border hover:border-foreground/30 transition-colors"
    >
      <h2 className="font-mono text-xl uppercase tracking-[1.4px] text-foreground mb-3">
        {product.displayName}
      </h2>
      <p className="text-sm text-foreground/50 mb-6 leading-relaxed">
        {product.description}
      </p>
      <div className="flex items-center gap-2 mb-6">
        <span className="btn-mono px-4 py-2 border border-[rgba(255,255,255,0.2)] text-foreground group-hover:bg-[rgba(255,255,255,0.05)] transition-colors">
          Explore {product.displayName}
        </span>
      </div>
      <StatsRow product={product} />
    </Link>
  );
}

function HubPage() {
  const [kdmProduct, dockerGuardProduct] = products;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="font-mono text-xs uppercase tracking-[1.4px] text-foreground/50 mb-4">
            Ecosystem
          </p>
          <h1 className="font-mono text-4xl md:text-5xl uppercase tracking-[1.4px] text-foreground mb-4">
            KDM Ecosystem
          </h1>
          <p className="text-sm text-foreground/50">
            Choose your tool
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ProductCard product={kdmProduct} to="/kdm" />
          <ProductCard product={dockerGuardProduct} to="/docker-guard" />
        </div>
      </div>
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-sm uppercase tracking-[1.4px] text-foreground">
              kdm
            </span>
            <div className="flex gap-6 font-mono text-xs uppercase tracking-[1px] text-foreground/70">
              <Link
                to="/privacy"
                className="hover:text-foreground/40 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="hover:text-foreground/40 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
