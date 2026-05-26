import { useEffect, useState } from "react";

const lines: { prompt?: string; text: string; out?: boolean; blink?: boolean }[] = [
  { prompt: "$", text: "kdm show pods" },
  { text: "NAME                    READY   STATUS    CPU    MEM", out: true },
  { text: "api-server-7d4f8b       1/1     Running   12%    248Mi", out: true },
  { text: "worker-queue-2c9a1      1/1     Running   34%    512Mi", out: true },
  { text: "redis-cache-0           1/1     Running   3%     64Mi", out: true },
  { prompt: "$", text: "kdm health containers" },
  { text: "[ok]   nginx-proxy        healthy   uptime 14d", out: true },
  { text: "[ok]   postgres-main      healthy   uptime 28d", out: true },
  { text: "[warn] log-shipper        degraded  restarts: 3", out: true },
  { prompt: "$", text: "kdm watch", blink: true },
];

export const Terminal = () => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = lines.map((_, i) =>
      setTimeout(() => setVisible((v) => Math.max(v, i + 1)), 300 + i * 280)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="border border-border bg-[rgba(255,255,255,0.03)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/50">
          ~/cluster — kdm
        </span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[360px]">
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
