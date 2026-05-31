import { createContext, useContext, type ReactNode } from "react";
import type { ProductConfig } from "@/config/products/types";
import { products, defaultProduct } from "@/config/products/index";

const ProductContext = createContext<ProductConfig>(defaultProduct);

function resolveConfig(slug?: string): ProductConfig {
  if (!slug) return defaultProduct;
  const found = products.find((p) => p.slug === slug);
  return found ?? defaultProduct;
}

export function ProductProvider({ slug, children }: { slug?: string; children: ReactNode }) {
  const config = resolveConfig(slug);
  return <ProductContext.Provider value={config}>{children}</ProductContext.Provider>;
}

export function useProduct(): ProductConfig {
  return useContext(ProductContext);
}
