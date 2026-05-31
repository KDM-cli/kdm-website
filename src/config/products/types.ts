export interface ProductFeature {
  icon: string;
  title: string;
  desc: string;
  cmd: string;
}

export interface ProductCommand {
  name: string;
  sig: string;
  desc: string;
  output: string;
}

export interface ProductStat {
  value: string;
  label: string;
}

export interface TerminalLine {
  prompt?: string;
  text: string;
  out?: boolean;
  blink?: boolean;
}

export interface ProductMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface ProductConfig {
  slug: string;
  displayName: string;
  brandName: string;
  tagline: string;
  description: string;
  version: string;
  installCommand: string;
  githubUrl: string;
  docsPath: string;
  features: ProductFeature[];
  commands: ProductCommand[];
  stats: ProductStat[];
  terminalLines: TerminalLine[];
  ctaTagline: string;
  ctaDescription: string;
  ctaPrimaryText: string;
  metadata: ProductMetadata;
  copyright: string;
}
