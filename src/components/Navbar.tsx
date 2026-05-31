import { Link } from "@tanstack/react-router";
import { Menu, Star } from "lucide-react";

import { useProduct } from "@/context/ProductContext";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const product = useProduct();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="font-mono text-sm uppercase tracking-[1.4px] text-foreground">
          {product.brandName}
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-foreground hover:text-foreground/50 transition-colors">Features</a>
          <a href="#commands" className="text-foreground hover:text-foreground/50 transition-colors">Commands</a>

          <a href={product.docsPath} className="text-foreground hover:text-foreground/50 transition-colors">Docs</a>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile hamburger trigger — visible only below md */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 text-foreground hover:text-foreground/50 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-6 mt-12">
                <SheetClose asChild>
                  <a
                    href="#features"
                    className="font-mono text-sm uppercase tracking-[1.4px] text-foreground hover:text-foreground/50 transition-colors"
                  >
                    Features
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="#commands"
                    className="font-mono text-sm uppercase tracking-[1.4px] text-foreground hover:text-foreground/50 transition-colors"
                  >
                    Commands
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href={product.docsPath}
                    className="font-mono text-sm uppercase tracking-[1.4px] text-foreground hover:text-foreground/50 transition-colors"
                  >
                    Docs
                  </a>
                </SheetClose>
                <div className="pt-4 border-t border-border">
                  <SheetClose asChild>
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-mono px-4 py-2 inline-flex items-center gap-2 border border-[rgba(255,255,255,0.2)] text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    >
                      <Star className="h-4 w-4" />
                      Star us
                    </a>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop GitHub CTA — hidden on mobile (replaced by Sheet) */}
          <a
            href={product.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex btn-mono px-4 py-2 items-center gap-2 border border-[rgba(255,255,255,0.2)] text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <Star className="h-4 w-4" />
            Star us
          </a>
        </div>
      </nav>
    </header>
  );
};
