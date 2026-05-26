import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="font-mono text-sm uppercase tracking-[1.4px] text-foreground">
          kdm
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-foreground hover:text-foreground/50 transition-colors">Features</a>
          <a href="#commands" className="text-foreground hover:text-foreground/50 transition-colors">Commands</a>

          <Link to="/docs" className="text-foreground hover:text-foreground/50 transition-colors">Docs</Link>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/KDM-cli/kdm-cli"
            target="_blank"
            rel="noreferrer"
            className="btn-mono px-4 py-2 inline-flex items-center gap-2 border border-[rgba(255,255,255,0.2)] text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <Star className="h-4 w-4" />
            Star us
          </a>
        </div>
      </nav>
    </header>
  );
};
