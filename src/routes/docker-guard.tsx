import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ProductProvider } from "@/context/ProductContext";

export const Route = createFileRoute("/docker-guard")({
  component: DockerGuardLayout,
});

function DockerGuardLayout() {
  return (
    <ProductProvider slug="docker-guard">
      <Outlet />
    </ProductProvider>
  );
}
