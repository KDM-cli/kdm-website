import React, { createContext, useContext, ReactNode } from "react";
import { ProductConfig, getProductConfig } from "@/config/products";

const ProductContext = createContext<ProductConfig | null>(null);

export interface ProductProviderProps {
  slug: string;
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ slug, children }) => {
  const config = getProductConfig(slug);

  if (!config) {
    throw new Error(`ProductConfig with slug "${slug}" not found in registry.`);
  }

  return (
    <ProductContext.Provider value={config}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductConfig => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export const useOptionalProduct = (): ProductConfig | null => {
  return useContext(ProductContext);
};
