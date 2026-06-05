import { useOptionalProduct } from "@/context/ProductContext";
import { Link } from "@tanstack/react-router";

export const Footer = () => {
  const product = useOptionalProduct();

  return (
    <footer className="py-12 border-t border-border mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm uppercase tracking-[1.4px]">
              {product ? product.displayName : "KDM Labs"}
            </span>
            <span className="text-xs text-foreground/50">
              © 2026 {product ? `${product.displayName} Labs` : "KDM Labs"}
            </span>
          </div>
          <div className="flex gap-6 font-mono text-xs uppercase tracking-[1px] text-foreground/70">
            <Link to="/privacy" className="hover:text-foreground/40 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground/40 transition-colors">
              Terms
            </Link>
            <a
              href={product ? `${product.githubUrl}/actions` : "https://github.com/KDM-cli/kdm-cli/actions"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground/40 transition-colors"
            >
              Status
            </a>
            <a
              href={product ? product.githubUrl : "https://github.com/KDM-cli/kdm-cli"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground/40 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
