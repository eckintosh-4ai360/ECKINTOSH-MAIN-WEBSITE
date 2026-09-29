import React, { useEffect, useRef } from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { PHOTOS, SCREENSHOTS } from '../data/siteMedia';
import { getIcon } from '../lib/icons';
import { useReducedMotion } from '../hooks';
import { BrowserFrame, Photo, pillClass } from './ui';

interface HeroProps {
  content: SiteContent['hero'];
  onOpenPlanner: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onOpenPlanner }) => {
  const [firstCard, secondCard] = content.floatingCards;

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden bg-white pt-28 md:pt-36">
      {/* Soft colour wash behind the stage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[38%] h-[60%]">
        <div className="absolute left-[12%] top-10 h-72 w-72 rounded-full bg-blue-400/25 blur-[110px]" />
        <div className="absolute right-[14%] top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-[110px]" />
        <div className="absolute left-1/2 top-40 h-64 w-96 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[980px] px-6 text-center">
        <p className="animate-fade-up text-[15px] font-semibold md:text-[17px]">
          <span className="text-brand-gradient">{content.eyebrow}</span>
        </p>

        <h1
          id="hero-heading"
          className="animate-fade-up mt-4 text-[44px] font-bold leading-[1.04] tracking-[-0.025em] text-neutral-950 [animation-delay:80ms] sm:text-[60px] md:text-[80px]"
        >
          {content.title} <span className="text-brand-gradient">{content.highlight}</span>
        </h1>

        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-neutral-600 [animation-delay:160ms] md:text-[21px]">
          {content.description}
        </p>

        <div className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-4 [animation-delay:240ms] sm:flex-row sm:gap-6">
          <button type="button" onClick={() => onOpenPlanner(content.primaryCtaTopic)} className={pillClass('primary', 'lg')}>
            {content.primaryCtaLabel}
          </button>
          <a
            href="#solutions"
            className="group inline-flex items-center gap-1 text-[17px] font-medium text-blue-600 hover:underline"
          >
            {content.secondaryCtaLabel}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <HeroStage firstCard={firstCard} secondCard={secondCard} />
    </section>
  );
};

type FloatingCard = SiteContent['hero']['floatingCards'][number] | undefined;

/**
 * Who we build for, what we build, and who builds it: two photos flanking a
 * real product screen. The stage eases up to full size as it scrolls in.
 */
const HeroStage: React.FC<{ firstCard: FloatingCard; secondCard: FloatingCard }> = ({ firstCard, secondCard }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = stageRef.current;
    if (!node || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      // 0 while the stage sits low in the viewport, 1 once its top reaches the upper third.
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight * 0.75)));
      node.style.setProperty('--stage-scale', String(0.92 + progress * 0.08));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    // The entrance animation sits on the wrapper: its keyframes set `transform`,
    // which would otherwise override the scroll-driven scale for good.
    <div className="animate-fade-up relative mx-auto mt-14 max-w-7xl px-4 pb-16 [animation-delay:320ms] sm:px-6 md:mt-20 md:pb-24">
      <div
        ref={stageRef}
        className="grid grid-cols-2 items-end gap-3 md:gap-4 lg:grid-cols-12"
        style={{ transform: 'scale(var(--stage-scale, 1))', transformOrigin: '50% 0%' }}
      >
        <figure className="relative order-2 aspect-[4/5] overflow-hidden rounded-[24px] lg:order-1 lg:col-span-3 lg:mb-10 lg:rounded-[28px]">
          <Photo photo={PHOTOS.engineers} sizes="(min-width: 1024px) 25vw, 50vw" priority />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-white/85 px-3.5 py-2 text-center text-[12px] font-medium text-neutral-800 backdrop-blur-md">
            Engineered in Accra
          </figcaption>
        </figure>

        <div className="relative order-1 col-span-2 lg:order-2 lg:col-span-6">
          <BrowserFrame shot={SCREENSHOTS.storeAdmin} priority />
          {firstCard && <StageChip card={firstCard} className="-bottom-5 left-3 md:-left-6 md:bottom-10" />}
          {secondCard && <StageChip card={secondCard} className="-top-5 right-3 md:-right-6 md:top-16" />}
        </div>

        <figure className="relative order-3 aspect-[4/5] overflow-hidden rounded-[24px] lg:col-span-3 lg:mb-10 lg:rounded-[28px]">
          <Photo photo={PHOTOS.phoneUser} sizes="(min-width: 1024px) 25vw, 50vw" priority />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-white/85 px-3.5 py-2 text-center text-[12px] font-medium text-neutral-800 backdrop-blur-md">
            Used every day
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

const StageChip: React.FC<{ card: NonNullable<FloatingCard>; className: string }> = ({ card, className }) => {
  const Icon = getIcon(card.iconName, TrendingUp);
  return (
    <div
      className={`absolute z-10 flex items-center gap-3 rounded-2xl bg-white/90 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06] backdrop-blur-md animate-float-slow ${className}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[13px] font-semibold text-neutral-900">{card.title}</span>
        <span className="block text-[11.5px] text-neutral-500">{card.subtitle}</span>
      </span>
    </div>
  );
};
