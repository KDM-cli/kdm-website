import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — KDM" },
      { name: "description", content: "Privacy Policy for KDM CLI." },
    ],
  }),
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="font-mono text-2xl uppercase tracking-[1.4px] mb-8">Privacy Policy</h1>
        <div className="doc-prose text-sm text-foreground/70 space-y-4">
          <p>KDM CLI does not collect, store, or transmit any personal data.</p>
          <p>
            The tool runs entirely in your terminal and communicates only with your local Docker
            daemon and Kubernetes API server. No telemetry, analytics, or usage data is sent to
            external servers.
          </p>
          <p>
            If you choose to install KDM via a package manager (Homebrew, npm, etc.), your
            interaction is governed by that package manager's privacy policy, not by KDM's.
          </p>
          <p>For questions, open an issue on GitHub.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
