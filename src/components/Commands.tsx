import { useState } from "react";

const commands = [
  {
    name: "show",
    sig: "kdm show <target>",
    desc: "List running runners, pods, containers, or minikube clusters.",
    output: `> kdm show pods
NAMESPACE   NAME                    READY   STATUS    AGE
default     api-server-7d4f8b       1/1     Running   3d
default     worker-queue-2c9a1      1/1     Running   3d
ingress     traefik-controller-x9   1/1     Running  14d
monitoring  prometheus-0            2/2     Running  21d`,
  },
  {
    name: "health",
    sig: "kdm health <target>",
    desc: "Detailed health, liveness, and resource pressure diagnostics.",
    output: `> kdm health pods
[ok]    api-server-7d4f8b       healthy    cpu 12%   mem 248Mi
[ok]    worker-queue-2c9a1      healthy    cpu 34%   mem 512Mi
[warn]  log-shipper-abc12       degraded   restarts: 3 (last 1h)
[fail]  batch-runner-99fa1      failing    OOMKilled · 2x in 5m`,
  },
  {
    name: "watch",
    sig: "kdm watch",
    desc: "Live monitoring dashboard right inside your terminal.",
    output: `> kdm watch
+- Live - 14:02:31 ----------------------------+
| pods: 24 running · 1 pending · 0 failed      |
| cpu:  ######========  62%                    |
| mem:  ####==========  41%                    |
| net:  in 124 MB/s   out 38 MB/s              |
+----------------------------------------------+`,
  },
  {
    name: "logs",
    sig: "kdm logs <name>",
    desc: "Tail logs with structured parsing and instant search.",
    output: `> kdm logs api-server-7d4f8b -f
14:02:30 INFO  request GET /api/users 200 12ms
14:02:30 INFO  request POST /api/auth 201 48ms
14:02:31 WARN  cache miss key=user:8821
14:02:31 INFO  request GET /api/orders 200 18ms`,
  },
];

export const Commands = () => {
  const [active, setActive] = useState(0);
  const cmd = commands[active];

  return (
    <section id="commands" className="py-24 lg:py-32 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs uppercase tracking-[1.4px] text-foreground/50 mb-4">
            // commands
          </p>
          <h2 className="text-4xl lg:text-5xl font-normal tracking-tight mb-4">
            Simple syntax. Powerful output.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          <div className="flex lg:flex-col gap-px bg-border">
            {commands.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                className={`text-left p-5 transition-colors whitespace-nowrap lg:whitespace-normal flex-1 ${
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
