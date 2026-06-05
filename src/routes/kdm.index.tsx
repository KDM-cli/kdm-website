import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Commands } from "@/components/Commands";
import { CTA } from "@/components/CTA";
import { useProduct } from "@/context/ProductContext";

import { kdmConfig } from "@/config/products/kdm";

export const Route = createFileRoute("/kdm/")({
  component: KdmIndex,
  head: () => ({
    meta: [
      { title: `${kdmConfig.displayName} — ${kdmConfig.tagline}` },
      { name: "description", content: kdmConfig.description },
      { property: "og:title", content: `${kdmConfig.displayName} — ${kdmConfig.tagline}` },
      { property: "og:description", content: kdmConfig.description },
      { property: "og:image", content: kdmConfig.ogImage },
    ],
  }),
});

function KdmIndex() {
  const product = useProduct();

  return (
    <>
      <Hero />
      <Features features={product.features} productName={product.displayName} />
      <Commands commands={product.commands} />
      <CTA />
    </>
  );
}
