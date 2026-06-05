import { kdmConfig } from "./kdm";
import { placeholderConfig } from "./placeholder";
import { ProductConfig } from "./types";

export * from "./types";
export * from "./kdm";
export * from "./placeholder";

export const productsRegistry: Record<string, ProductConfig> = {
  kdm: kdmConfig,
  placeholder: placeholderConfig,
};

export function getProductConfig(slug: string): ProductConfig | undefined {
  return productsRegistry[slug];
}
