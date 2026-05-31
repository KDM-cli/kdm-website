import * as LucideIcons from "lucide-react";
import { useProduct } from "@/context/ProductContext";

export const Features = () => {
  const product = useProduct();
  return (
    <section id="features" className="py-24 lg:py-32 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[1.4px] text-foreground/50 mb-4">
            // features
          </p>
          <h2 className="text-4xl lg:text-5xl font-normal tracking-tight mb-4">
            Built for {product.displayName}.
          </h2>
          <p className="text-base text-foreground/70">
            From quick checks to deep diagnostics, {product.displayName} gives you the tools to stay on top of your infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {product.features.map((f) => {
            const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[f.icon];
            return (
              <div
                key={f.title}
                className="group relative p-8 bg-background hover:bg-[rgba(255,255,255,0.03)] transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  {Icon && <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />}
                  <code className="font-mono text-xs uppercase tracking-[1px] text-foreground/50 px-2 py-1 border border-[rgba(255,255,255,0.2)]">
                    {f.cmd}
                  </code>
                </div>
                <h3 className="text-lg font-normal mb-2">{f.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
