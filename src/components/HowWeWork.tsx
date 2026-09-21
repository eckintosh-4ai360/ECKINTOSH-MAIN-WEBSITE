import React from 'react';
import { ArrowRight, Code2, PencilRuler, Rocket, Search, TrendingUp } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { Reveal } from './Reveal';

interface HowWeWorkProps {
  content: SiteContent['howWeWork'];
  onOpenPlanner: (topic?: string) => void;
}

const STAGE_ICONS = [Search, PencilRuler, Code2, Rocket, TrendingUp];

/** A compact, sequential delivery process rather than five independent cards. */
export const HowWeWork: React.FC<HowWeWorkProps> = ({ content, onOpenPlanner }) => {
  return (
    <section id="how-we-work" aria-labelledby="how-we-work-heading" className="bg-[#F7F9FC] py-16 md:py-24 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 bg-blue-100/80 px-2.5 py-1 rounded-full border border-blue-200">
              {content.eyebrow}
            </span>
            <h2 id="how-we-work-heading" className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-slate-900 tracking-tight mt-4 leading-[1.08]">
              {content.title}
            </h2>
            <p className="max-w-lg text-sm text-slate-600 mt-4 leading-relaxed">{content.description}</p>

            <button
              type="button"
              onClick={() => onOpenPlanner(content.ctaTopic)}
              className="mt-6 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-lg inline-flex items-center gap-2"
            >
              {content.ctaLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Reveal>

          <ol className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-38px_rgba(15,23,42,0.35)] overflow-hidden divide-y divide-slate-100">
            {content.items.map((stepItem, index) => {
              const Icon = STAGE_ICONS[index % STAGE_ICONS.length];
              return (
                <Reveal key={stepItem.step} delay={index * 65} as="li">
                  <article className="group grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-4 items-center p-4 sm:p-5 transition-colors hover:bg-blue-50/45">
                    <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl grid place-items-center bg-blue-50 border border-blue-100 text-blue-600 shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-blue-600">
                        Phase {stepItem.step}
                      </span>
                      <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-0.5">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{stepItem.title}</h3>
                        <span className="text-[11px] font-medium text-slate-500">{stepItem.summary}</span>
                      </span>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1 line-clamp-2">{stepItem.details}</p>
                    </span>

                    <span className="text-xl sm:text-2xl font-black text-slate-200 tabular-nums leading-none select-none group-hover:text-blue-200 transition-colors">
                      {stepItem.step}
                    </span>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
