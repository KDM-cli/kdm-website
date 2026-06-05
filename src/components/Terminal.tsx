import { useEffect, useState } from "react";
import { TerminalLine } from "@/config/products/types";

export interface TerminalProps {
  lines: TerminalLine[];
  productName: string;
}

export const Terminal = ({ lines, productName }: TerminalProps) => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timers = lines.map((_, i) =>
      setTimeout(() => setVisible((v) => Math.max(v, i + 1)), 300 + i * 280)
    );
    return () => timers.forEach(clearTimeout);
  }, [lines]);

  return (
    <div className="border border-border bg-[rgba(255,255,255,0.03)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/50">
          ~/cluster — {productName}
        </span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[240px] md:min-h-[360px]">
        {lines.slice(0, visible).map((l, i) => (
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
