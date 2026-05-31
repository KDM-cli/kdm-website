import { Link } from "@tanstack/react-router";

import { useProduct } from "@/context/ProductContext";

export const Footer = () => {
  const product = useProduct();

  return (
    <footer className="py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm uppercase tracking-[1.4px]">{product.brandName}</span>
            <span className="text-xs text-foreground/50">{product.copyright}</span>
          </div>
          <div className="flex gap-6 font-mono text-xs uppercase tracking-[1px] text-foreground/70">
            <Link to="/privacy" className="hover:text-foreground/40 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground/40 transition-colors">
              Terms
            </Link>
            <a
              href={`${product.githubUrl}/issues`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground/40 transition-colors"
            >
              Issues
            </a>
            <a
              href={product.githubUrl}
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
