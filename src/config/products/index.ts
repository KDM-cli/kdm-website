import { kdm } from "./kdm";
import { dockerGuard } from "./docker-guard";

export const products = [kdm, dockerGuard];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const defaultProduct = kdm;
