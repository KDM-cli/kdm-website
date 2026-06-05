import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Commands } from "@/components/Commands";
import { CTA } from "@/components/CTA";
import { useProduct } from "@/context/ProductContext";

import { placeholderConfig } from "@/config/products/placeholder";

export const Route = createFileRoute("/placeholder/")({
  component: PlaceholderIndex,
  head: () => ({
    meta: [
      { title: `${placeholderConfig.displayName} — ${placeholderConfig.tagline}` },
      { name: "description", content: placeholderConfig.description },
      { property: "og:title", content: `${placeholderConfig.displayName} — ${placeholderConfig.tagline}` },
      { property: "og:description", content: placeholderConfig.description },
      { property: "og:image", content: placeholderConfig.ogImage },
    ],
  }),
});

function PlaceholderIndex() {
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
