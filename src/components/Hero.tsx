import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { SiteContent } from '../data/contentData';

interface HeroProps {
  content: SiteContent['hero'];
  onOpenPlanner: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onOpenPlanner }) => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#08111F] text-white"
    >
      {/* Background art: the portrait original on phones, a rotated landscape cut everywhere else. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <picture className="block h-full w-full">
          <source media="(max-width: 639px)" srcSet="/tw0.jpg" />
          <img
            src="/hero-wide.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="hero-bg-drift h-full w-full object-cover object-[50%_45%] sm:object-center"
          />
        </picture>

        {/* Readability scrims: darken behind the copy, keep the wave's peak bright on the right. */}
        <div className="absolute inset-0 bg-[#08111F]/45 sm:bg-[#08111F]/10" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#08111F]/95 via-[#08111F]/65 to-[#08111F]/0 sm:block" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_55%,rgba(8,17,31,0.55),transparent_70%)]" />

        {/* Blend into the navbar above and the next section below. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#08111F] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#08111F] via-[#08111F]/70 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6 md:min-h-[min(100svh,880px)] md:pt-36 lg:px-8">
        <div className="max-w-2xl">
          <p className="animate-fade-up mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200">
            <span className="h-px w-8 bg-gradient-to-r from-sky-300 to-transparent" aria-hidden="true" />
            {content.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="animate-fade-up text-[2.5rem] font-extrabold leading-[1.04] tracking-tight [animation-delay:80ms] sm:text-6xl md:text-[4.25rem]"
          >
            {content.title}{' '}
            <span className="bg-gradient-to-r from-sky-200 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              {content.highlight}
            </span>
          </h1>

          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-slate-300 [animation-delay:160ms] sm:text-lg">
            {content.description}
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenPlanner(content.primaryCtaTopic)}
              className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/40"
            >
              {content.primaryCtaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#systems"
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/[0.12]"
            >
              {content.secondaryCtaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#systems"
        aria-label="Scroll to our work"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 transition-colors hover:text-white md:flex"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
};
