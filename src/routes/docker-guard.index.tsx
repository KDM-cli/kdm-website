import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Commands } from "@/components/Commands";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { dockerGuard } from "@/config/products/docker-guard";

export const Route = createFileRoute("/docker-guard/")({
  component: DockerGuardLanding,
  head: () => ({
    meta: [
      { title: dockerGuard.metadata.title },
      { name: "description", content: dockerGuard.metadata.description },
    ],
  }),
});

function DockerGuardLanding() {
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
