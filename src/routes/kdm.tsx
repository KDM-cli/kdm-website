import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ProductProvider } from "@/context/ProductContext";

export const Route = createFileRoute("/kdm")({
  component: KdmLayout,
});

function KdmLayout() {
  return (
    <ProductProvider slug="kdm">
      <Outlet />
    </ProductProvider>
  );
}
