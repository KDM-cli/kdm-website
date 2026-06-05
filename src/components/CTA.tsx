import { Link } from "@tanstack/react-router";
import { useProduct } from "@/context/ProductContext";

interface CTAProps {
  ctaHref?: string;
}

export const CTA = ({ ctaHref }: CTAProps) => {
  const { ctaHeadline, ctaButtonText, docsBasePath } = useProduct();
  const href = ctaHref || `${docsBasePath}/installation`;
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  return (
    <section className="py-32 lg:py-48 border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="container mx-auto px-6 relative text-center">
        <h2 className="font-mono font-light tracking-tight leading-[1.05] text-foreground text-[14vw] md:text-[10vw] lg:text-[140px] mb-12">
          {ctaHeadline}
        </h2>
        <p className="text-base text-foreground/70 max-w-xl mx-auto mb-10">
          Join thousands of engineers who replaced six dashboards with one CLI.
          Install in 30 seconds. Cancel anytime.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mono px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              {ctaButtonText}
            </a>
          ) : (
            <Link
              to={href}
              className="btn-mono px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              {ctaButtonText}
            </Link>
          )}
          <Link to={docsBasePath} className="btn-mono px-6 py-3 border border-[rgba(255,255,255,0.2)] text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors">
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
};
