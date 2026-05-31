import { useState } from "react";
import { useProduct } from "@/context/ProductContext";

export const Commands = () => {
  const [active, setActive] = useState(0);
  const product = useProduct();
  const cmd = product.commands[active];

  return (
    <section id="commands" className="py-24 lg:py-32 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs uppercase tracking-[1.4px] text-foreground/50 mb-4">
            // commands
          </p>
          <h2 className="text-4xl lg:text-5xl font-normal tracking-tight mb-4">
            {product.displayName} commands
          </h2>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          <div className="flex lg:flex-col gap-px bg-border overflow-x-auto">
            {product.commands.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                className={`text-left p-5 transition-colors whitespace-nowrap lg:whitespace-normal flex-1 min-h-[44px] ${
                  active === i
                    ? "bg-[rgba(255,255,255,0.05)] border-l-2 border-l-foreground"
                    : "bg-background hover:bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                <div className="font-mono text-sm mb-1">{c.sig}</div>
                <div className="text-xs text-foreground/70 hidden lg:block">{c.desc}</div>
              </button>
            ))}
          </div>

          <div className="border border-border bg-[rgba(255,255,255,0.03)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/50">
                {cmd.sig}
              </span>
            </div>
            <pre className="p-6 font-mono text-sm leading-relaxed text-foreground/90 overflow-x-auto whitespace-pre">
{cmd.output}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
