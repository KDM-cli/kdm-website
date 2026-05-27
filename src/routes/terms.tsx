import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — KDM" },
      { name: "description", content: "Terms of Service for KDM CLI." },
    ],
  }),
});

function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="font-mono text-2xl uppercase tracking-[1.4px] mb-8">Terms of Service</h1>
        <div className="doc-prose text-sm text-foreground/70 space-y-4">
          <p>KDM CLI is provided "as is" without warranty of any kind, express or implied.</p>
          <p>
            You may use, modify, and distribute this software in accordance with the terms of the
            MIT License.
          </p>
          <p>
            The authors and contributors are not liable for any damages arising from the use of this
            software.
          </p>
          <p>By using KDM, you accept these terms.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
