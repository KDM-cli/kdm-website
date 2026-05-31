import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Commands } from "@/components/Commands";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { kdm } from "@/config/products/kdm";

export const Route = createFileRoute("/kdm/")({
  component: KdmLanding,
  head: () => ({
    meta: [
      { title: kdm.metadata.title },
      { name: "description", content: kdm.metadata.description },
    ],
  }),
});

function KdmLanding() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Commands />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
