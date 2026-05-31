import { useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";

export const Terminal = () => {
  const product = useProduct();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = product.terminalLines.map((_, i) =>
      setTimeout(() => setVisible((v) => Math.max(v, i + 1)), 300 + i * 280)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="border border-border bg-[rgba(255,255,255,0.03)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/50">
          ~/cluster — {product.brandName}
        </span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[240px] md:min-h-[360px]">
        {product.terminalLines.slice(0, visible).map((l, i) => (
          <div key={i} className="flex gap-2">
            {l.prompt && <span className="text-foreground/50">{l.prompt}</span>}
            <span className={l.out ? "text-foreground/70" : "text-foreground"}>
              {l.text}
              {l.blink && i === visible - 1 && (
                <span className="inline-block w-2 h-4 bg-foreground ml-1 align-middle animate-blink" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
