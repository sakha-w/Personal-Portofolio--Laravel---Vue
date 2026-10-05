export const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

export const colorPalette = {
  lavender: {
    bg: 'bg-lavender/30',
    border: 'border-lavender',
    text: 'text-ink',
    strong: 'text-lavender-strong',
    subtle: 'bg-lavender/25',
  },
  blue: {
    bg: 'bg-blue/35',
    border: 'border-blue',
    text: 'text-ink',
    strong: 'text-blue-strong',
    subtle: 'bg-blue/25',
  },
  mint: {
    bg: 'bg-mint/35',
    border: 'border-mint',
    text: 'text-ink',
    strong: 'text-mint-strong',
    subtle: 'bg-mint/25',
  },
  peach: {
    bg: 'bg-peach/40',
    border: 'border-peach',
    text: 'text-ink',
    strong: 'text-peach-strong',
    subtle: 'bg-peach/25',
  },
  pink: {
    bg: 'bg-pink/40',
    border: 'border-pink',
    text: 'text-ink',
    strong: 'text-pink-strong',
    subtle: 'bg-pink/25',
  },
} as const;

export const colorKeys = Object.keys(colorPalette) as Array<keyof typeof colorPalette>;

export function getColorSet(index: number) {
  const key = colorKeys[index % colorKeys.length];
  return colorPalette[key];
}

export function getIssuerColorSet(index: number) {
  const issuerOrder = ['mint', 'blue', 'lavender', 'peach', 'pink'] as const;
  const key = issuerOrder[index % issuerOrder.length];
  return colorPalette[key];
}

export const glassClasses = {
  card: 'glass-card rounded-2xl',
  cardHover: 'glass-card rounded-2xl group',
  subtle: 'glass-subtle rounded-xl',
  navPill: 'glass-nav-pill',
  input: 'glass-input',
  buttonPrimary: 'glass-button-primary',
  buttonSecondary: 'glass-button-secondary',
} as const;

export const spacing = {
  section: 'space-y-10',
  sectionSm: 'space-y-8',
  container: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
  cardPadding: 'p-6 sm:p-8',
  cardPaddingSm: 'p-5 sm:p-6',
} as const;

export const typography = {
  monoXs: 'font-mono text-xs leading-normal tracking-normal',
  monoXsBold: 'font-mono text-xs leading-normal tracking-normal font-bold',
  monoXs11: 'font-mono text-xs leading-normal tracking-normal text-[11px]',
  heading: 'font-bold tracking-normal text-ink',
  headingXl: 'text-3xl sm:text-4xl',
  heading2xl: 'text-4xl sm:text-5xl',
  bodySm: 'text-sm leading-relaxed text-muted',
  bodyBase: 'text-base leading-relaxed text-muted',
} as const;

export const transitions = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  colors: 'transition-colors',
  transform: 'transition-transform',
} as const;

export const commonPatterns = {
  skeleton: {
    base: 'animate-pulse',
    title: 'h-4 bg-[#686A73]/10 rounded w-1/3',
    subtitle: 'h-6 bg-[#686A73]/15 rounded w-3/4',
    text: 'h-3 bg-[#686A73]/10 rounded w-full',
    card: 'h-5 bg-[#686A73]/10 rounded w-1/2',
  },
  divider: 'border-t border-[#686A73]/15',
  sectionHeader: 'border-b border-[#686A73]/15 pb-4',
  tagBase: 'px-2.5 py-0.5 rounded-full border font-medium font-mono text-xs leading-normal tracking-normal',
} as const;