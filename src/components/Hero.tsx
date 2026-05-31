import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Terminal } from "./Terminal";
import { useProduct } from "@/context/ProductContext";

export const Hero = () => {
  const product = useProduct();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(product.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="container mx-auto px-6 pt-24 pb-24 lg:pt-32 lg:pb-40 relative">
        <div className="flex items-center gap-2 mb-12">
          <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/50">
            {product.version}
          </span>
        </div>

        <h1 className="font-mono font-light tracking-tight leading-[1.05] text-foreground text-[14vw] md:text-[12vw] lg:text-[180px] xl:text-[220px] mb-12">
          {product.displayName}.
        </h1>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-2xl lg:text-3xl font-normal leading-tight max-w-xl">
              {product.tagline}
            </h2>
            <p className="text-base text-foreground/70 max-w-xl leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={copy}
              className="group flex items-center justify-between gap-3 px-4 py-3 w-full max-w-md border border-[rgba(255,255,255,0.2)] font-mono text-sm hover:border-foreground/50 transition-colors"
            >
              <span className="text-foreground/50">$</span>
              <span className="flex-1 text-left">{product.installCommand}</span>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 text-foreground/50 group-hover:text-foreground transition-colors" />}
            </button>

            <div className="flex flex-wrap gap-3">
              <a href={product.docsPath} className="btn-mono px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors">
                {product.ctaPrimaryText}
              </a>
              <a href={product.githubUrl} className="btn-mono px-6 py-3 border border-[rgba(255,255,255,0.2)] text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                View on GitHub
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
              {product.stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-mono text-2xl sm:text-3xl font-light">{stat.value}</div>
                  <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
};
