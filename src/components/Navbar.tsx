import { Link } from "@tanstack/react-router";
import { Star, ChevronDown, Menu } from "lucide-react";
import { useOptionalProduct } from "@/context/ProductContext";
import { ProductConfig } from "@/config/products/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

interface ProductNavbarProps {
  product: ProductConfig;
}

interface ProductMobileMenuProps {
  product: ProductConfig;
  isKdm: boolean;
}

const ProductMobileMenu = ({ product, isKdm }: ProductMobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 text-foreground hover:text-foreground/50 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px]">
        <nav className="flex flex-col gap-6 mt-12">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[1px] text-foreground/50">Products</span>
            <SheetClose asChild>
              <Link
                to="/kdm"
                className="flex items-center justify-between gap-4 px-3 py-2 font-mono text-[10px] uppercase tracking-[1.4px] text-foreground hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
              >
                KDM Monitor
                {isKdm && <span className="h-1.5 w-1.5 bg-foreground rounded-full" />}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to="/kdc"
                className="flex items-center justify-between gap-4 px-3 py-2 font-mono text-[10px] uppercase tracking-[1.4px] text-foreground hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
              >
                KDC Commander
                {!isKdm && <span className="h-1.5 w-1.5 bg-foreground rounded-full" />}
              </Link>
            </SheetClose>
          </div>

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
            <Link
              to={`/${product.slug}/docs`}
              className="font-mono text-sm uppercase tracking-[1.4px] text-foreground hover:text-foreground/50 transition-colors"
            >
              Docs
            </Link>
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
  );
};

const ProductNavbar = ({ product }: ProductNavbarProps) => {
  const isKdm = product.slug === "kdm";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link to={`/${product.slug}`} className="font-mono text-sm uppercase tracking-[1.4px] text-foreground">
            {product.displayName}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-foreground/50 transition-colors cursor-pointer outline-none select-none">
              Products
              <ChevronDown className="h-4 w-4 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-background/95 border border-border mt-1 min-w-[150px]">
              <DropdownMenuItem asChild>
                <Link
                  to="/kdm"
                  className="flex items-center justify-between gap-4 px-3 py-2 font-mono text-[10px] uppercase tracking-[1.4px] text-foreground hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
                >
                  KDM Monitor
                  {isKdm && <span className="h-1.5 w-1.5 bg-foreground rounded-full" />}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/kdc"
                  className="flex items-center justify-between gap-4 px-3 py-2 font-mono text-[10px] uppercase tracking-[1.4px] text-foreground hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
                >
                  KDC Commander
                  {!isKdm && <span className="h-1.5 w-1.5 bg-foreground rounded-full" />}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="#features" className="text-foreground hover:text-foreground/50 transition-colors">Features</a>
          <a href="#commands" className="text-foreground hover:text-foreground/50 transition-colors">Commands</a>
          <Link to={`/${product.slug}/docs`} className="text-foreground hover:text-foreground/50 transition-colors">Docs</Link>
        </div>

        <div className="flex items-center gap-3">
          <ProductMobileMenu product={product} isKdm={isKdm} />

          {/* Desktop Star button — hidden on mobile */}
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

const NeutralNavbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="font-mono text-sm uppercase tracking-[1.4px] text-foreground hover:opacity-80 transition-opacity">
          KDM Labs
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono text-xs uppercase tracking-[1px]">
          <Link to="/kdm" className="text-foreground hover:text-foreground/50 transition-colors">KDM Monitor</Link>
          <Link to="/kdc" className="text-foreground hover:text-foreground/50 transition-colors">KDC Commander</Link>
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
                  <Link
                    to="/docs"
                    className="font-mono text-sm uppercase tracking-[1.4px] text-foreground hover:text-foreground/50 transition-colors"
                  >
                    Docs
                  </Link>
                </SheetClose>
                <div className="pt-4 border-t border-border">
                  <SheetClose asChild>
                    <a
                      href="https://github.com/KDM-cli/kdm-cli"
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
            href="https://github.com/KDM-cli/kdm-cli"
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

export const Navbar = () => {
  const product = useOptionalProduct();
  return product ? <ProductNavbar product={product} /> : <NeutralNavbar />;
};
