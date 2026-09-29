import React from 'react';
import type { Screenshot, SitePhoto } from '../data/siteMedia';

interface PhotoProps {
  photo: SitePhoto;
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes?: string;
  className?: string;
  /** Above-the-fold images load eagerly; everything else is lazy. */
  priority?: boolean;
}

/** A responsive photo served from `public/images` in two widths. */
export const Photo: React.FC<PhotoProps> = ({ photo, sizes = '100vw', className = '', priority = false }) => (
  <img
    src={`${photo.base}-1600.webp`}
    srcSet={`${photo.base}-800.webp 800w, ${photo.base}-1600.webp 1600w`}
    sizes={sizes}
    alt={photo.alt}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined}
    decoding="async"
    className={`h-full w-full object-cover ${className}`}
    style={photo.position ? { objectPosition: photo.position } : undefined}
  />
);

interface BrowserFrameProps {
  shot: Screenshot;
  className?: string;
  priority?: boolean;
  tone?: 'light' | 'dark';
}

/** A real product capture inside minimal browser chrome. */
export const BrowserFrame: React.FC<BrowserFrameProps> = ({ shot, className = '', priority = false, tone = 'light' }) => (
  <div
    className={`overflow-hidden rounded-xl shadow-[0_30px_80px_-24px_rgba(0,0,0,0.35)] ring-1 md:rounded-2xl ${
      tone === 'dark' ? 'bg-neutral-900 ring-white/10' : 'bg-white ring-black/[0.08]'
    } ${className}`}
  >
    <div
      className={`flex items-center gap-3 border-b px-3 py-2 md:px-4 md:py-2.5 ${
        tone === 'dark' ? 'border-white/10 bg-neutral-900' : 'border-black/[0.06] bg-neutral-50'
      }`}
      aria-hidden="true"
    >
      <span className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57] md:h-2.5 md:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e] md:h-2.5 md:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-[#28c840] md:h-2.5 md:w-2.5" />
      </span>
      <span
        className={`mx-auto truncate rounded-md px-3 py-0.5 text-[10px] font-medium md:text-[11px] ${
          tone === 'dark' ? 'bg-white/[0.06] text-neutral-400' : 'bg-black/[0.04] text-neutral-500'
        }`}
      >
        {shot.url}
      </span>
      <span className="w-[42px] md:w-[52px]" />
    </div>
    <img
      src={shot.src}
      alt={shot.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="block aspect-[16/9.4] w-full object-cover object-top"
    />
  </div>
);

type PillVariant = 'primary' | 'secondary' | 'light' | 'ghost-light';

const PILL_STYLES: Record<PillVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'text-blue-600 ring-1 ring-inset ring-blue-600 hover:bg-blue-600 hover:text-white',
  light: 'bg-white text-neutral-950 hover:bg-neutral-200',
  'ghost-light': 'text-white ring-1 ring-inset ring-white/40 hover:bg-white/10 hover:ring-white/70',
};

export const pillClass = (variant: PillVariant, size: 'md' | 'lg' = 'md') =>
  `inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
    size === 'lg' ? 'px-7 py-3.5 text-[17px]' : 'px-5 py-2.5 text-[15px]'
  } ${PILL_STYLES[variant]}`;

interface SectionHeadingProps {
  id: string;
  /** The first, darker phrase. */
  lead: string;
  /** The quieter phrase that follows it. */
  rest: string;
  description?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

/** Two-tone heading: a bold lead phrase followed by a softer one. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  lead,
  rest,
  description,
  tone = 'light',
  className = '',
}) => (
  <div className={className}>
    <h2
      id={id}
      className="max-w-4xl text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[40px] md:text-[48px]"
    >
      <span className={tone === 'dark' ? 'text-white' : 'text-neutral-950'}>{lead.replace(/[.\s]+$/, '')}.</span>{' '}
      <span className={tone === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}>{rest}</span>
    </h2>
    {description && (
      <p className={`mt-4 max-w-2xl text-[17px] leading-relaxed ${tone === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
        {description}
      </p>
    )}
  </div>
);
