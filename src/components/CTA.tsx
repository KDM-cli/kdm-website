import { useProduct } from "@/context/ProductContext";

export const CTA = () => {
  const product = useProduct();
  return (
    <section className="py-32 lg:py-48 border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="container mx-auto px-6 relative text-center">
        <h2 className="font-mono font-light tracking-tight leading-[1.05] text-foreground text-[14vw] md:text-[10vw] lg:text-[140px] mb-12">
          {product.ctaTagline}
        </h2>
        <p className="text-base text-foreground/70 max-w-xl mx-auto mb-10">
          {product.ctaDescription}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={product.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-mono px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            {product.ctaPrimaryText}
          </a>
          <a
            href={product.docsPath}
            className="btn-mono px-6 py-3 border border-[rgba(255,255,255,0.2)] text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  );
};
