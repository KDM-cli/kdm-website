import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductProvider } from "@/context/ProductContext";

export const Route = createFileRoute("/kdc")({
  component: KdcLayout,
});

function KdcLayout() {
  return (
    <ProductProvider slug="kdc">
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ProductProvider>
  );
}
