import { kdmConfig } from "./kdm";
import { kdcConfig } from "./kdc";
import { ProductConfig } from "./types";

export * from "./types";
export * from "./kdm";
export * from "./kdc";

export const productsRegistry: Record<string, ProductConfig> = {
  kdm: kdmConfig,
  kdc: kdcConfig,
};

export function getProductConfig(slug: string): ProductConfig | undefined {
  return productsRegistry[slug];
}
