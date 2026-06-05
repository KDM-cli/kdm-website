import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Commands } from "@/components/Commands";
import { CTA } from "@/components/CTA";
import { useProduct } from "@/context/ProductContext";

import { kdcConfig } from "@/config/products/kdc";

export const Route = createFileRoute("/kdc/")({
  component: KdcIndex,
  head: () => ({
    meta: [
      { title: `${kdcConfig.displayName} — ${kdcConfig.tagline}` },
      { name: "description", content: kdcConfig.description },
      { property: "og:title", content: `${kdcConfig.displayName} — ${kdcConfig.tagline}` },
      { property: "og:description", content: kdcConfig.description },
      { property: "og:image", content: kdcConfig.ogImage },
    ],
  }),
});

function KdcIndex() {
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
