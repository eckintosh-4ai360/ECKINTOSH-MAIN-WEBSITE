import type { ProductAccent } from '../data/contentData';

export interface AccentTheme {
  /** Brand hex, used for SVG strokes and inline gradients. */
  hex: string;
  /** Lighter companion hex for gradient ends. */
  hex2: string;
  text: string;
  textDark: string;
  bg: string;
  bgHover: string;
  bgSoft: string;
  bgSoftDark: string;
  border: string;
  borderDark: string;
  ring: string;
  gradient: string;
  glow: string;
  dot: string;
}

export const ACCENTS: Record<ProductAccent, AccentTheme> = {
  blue: {
    hex: '#2563eb',
    hex2: '#60a5fa',
    text: 'text-blue-600',
    textDark: 'text-blue-400',
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-500',
    bgSoft: 'bg-blue-50',
    bgSoftDark: 'bg-blue-500/10',
    border: 'border-blue-200',
    borderDark: 'border-blue-500/30',
    ring: 'ring-blue-500/40',
    gradient: 'from-blue-500 to-indigo-500',
    glow: 'shadow-blue-500/30',
    dot: 'bg-blue-500',
  },
  violet: {
    hex: '#7c3aed',
    hex2: '#a78bfa',
    text: 'text-violet-600',
    textDark: 'text-violet-400',
    bg: 'bg-violet-600',
    bgHover: 'hover:bg-violet-500',
    bgSoft: 'bg-violet-50',
    bgSoftDark: 'bg-violet-500/10',
    border: 'border-violet-200',
    borderDark: 'border-violet-500/30',
    ring: 'ring-violet-500/40',
    gradient: 'from-violet-500 to-purple-500',
    glow: 'shadow-violet-500/30',
    dot: 'bg-violet-500',
  },
  cyan: {
    hex: '#0891b2',
    hex2: '#22d3ee',
    text: 'text-cyan-600',
    textDark: 'text-cyan-400',
    bg: 'bg-cyan-600',
    bgHover: 'hover:bg-cyan-500',
    bgSoft: 'bg-cyan-50',
    bgSoftDark: 'bg-cyan-500/10',
    border: 'border-cyan-200',
    borderDark: 'border-cyan-500/30',
    ring: 'ring-cyan-500/40',
    gradient: 'from-cyan-500 to-sky-500',
    glow: 'shadow-cyan-500/30',
    dot: 'bg-cyan-500',
  },
  emerald: {
    hex: '#059669',
    hex2: '#34d399',
    text: 'text-emerald-600',
    textDark: 'text-emerald-400',
    bg: 'bg-emerald-600',
    bgHover: 'hover:bg-emerald-500',
    bgSoft: 'bg-emerald-50',
    bgSoftDark: 'bg-emerald-500/10',
    border: 'border-emerald-200',
    borderDark: 'border-emerald-500/30',
    ring: 'ring-emerald-500/40',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/30',
    dot: 'bg-emerald-500',
  },
  amber: {
    hex: '#d97706',
    hex2: '#fbbf24',
    text: 'text-amber-600',
    textDark: 'text-amber-400',
    bg: 'bg-amber-600',
    bgHover: 'hover:bg-amber-500',
    bgSoft: 'bg-amber-50',
    bgSoftDark: 'bg-amber-500/10',
    border: 'border-amber-200',
    borderDark: 'border-amber-500/30',
    ring: 'ring-amber-500/40',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/30',
    dot: 'bg-amber-500',
  },
  rose: {
    hex: '#e11d48',
    hex2: '#fb7185',
    text: 'text-rose-600',
    textDark: 'text-rose-400',
    bg: 'bg-rose-600',
    bgHover: 'hover:bg-rose-500',
    bgSoft: 'bg-rose-50',
    bgSoftDark: 'bg-rose-500/10',
    border: 'border-rose-200',
    borderDark: 'border-rose-500/30',
    ring: 'ring-rose-500/40',
    gradient: 'from-rose-500 to-pink-500',
    glow: 'shadow-rose-500/30',
    dot: 'bg-rose-500',
  },
  fuchsia: {
    hex: '#c026d3',
    hex2: '#e879f9',
    text: 'text-fuchsia-600',
    textDark: 'text-fuchsia-400',
    bg: 'bg-fuchsia-600',
    bgHover: 'hover:bg-fuchsia-500',
    bgSoft: 'bg-fuchsia-50',
    bgSoftDark: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-200',
    borderDark: 'border-fuchsia-500/30',
    ring: 'ring-fuchsia-500/40',
    gradient: 'from-fuchsia-500 to-pink-500',
    glow: 'shadow-fuchsia-500/30',
    dot: 'bg-fuchsia-500',
  },
  orange: {
    hex: '#ea580c',
    hex2: '#fb923c',
    text: 'text-orange-600',
    textDark: 'text-orange-400',
    bg: 'bg-orange-600',
    bgHover: 'hover:bg-orange-500',
    bgSoft: 'bg-orange-50',
    bgSoftDark: 'bg-orange-500/10',
    border: 'border-orange-200',
    borderDark: 'border-orange-500/30',
    ring: 'ring-orange-500/40',
    gradient: 'from-orange-500 to-amber-500',
    glow: 'shadow-orange-500/30',
    dot: 'bg-orange-500',
  },
  indigo: {
    hex: '#4f46e5',
    hex2: '#818cf8',
    text: 'text-indigo-600',
    textDark: 'text-indigo-400',
    bg: 'bg-indigo-600',
    bgHover: 'hover:bg-indigo-500',
    bgSoft: 'bg-indigo-50',
    bgSoftDark: 'bg-indigo-500/10',
    border: 'border-indigo-200',
    borderDark: 'border-indigo-500/30',
    ring: 'ring-indigo-500/40',
    gradient: 'from-indigo-500 to-violet-500',
    glow: 'shadow-indigo-500/30',
    dot: 'bg-indigo-500',
  },
};

export function accentOf(key: ProductAccent | undefined): AccentTheme {
  return ACCENTS[key ?? 'blue'] ?? ACCENTS.blue;
}
