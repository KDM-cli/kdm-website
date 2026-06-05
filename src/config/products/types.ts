import { ComponentType } from "react";

export interface Feature {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  cmd: string;
}

export interface CommandExample {
  name: string;
  sig: string;
  desc: string;
  output: string;
}

export interface StatCounter {
  value: string;
  label: string;
}

export interface TerminalLine {
  prompt?: string;
  text: string;
  out?: boolean;
  blink?: boolean;
}

export interface ProductConfig {
  slug: string;
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  cliName: string;
  installCommand: string;
  githubUrl: string;
  docsBasePath: string;
  ctaHeadline: string;
  ctaButtonText: string;
  ogImage: string;
  features: Feature[];
  commands: CommandExample[];
  stats: StatCounter[];
  terminalLines: TerminalLine[];
}
