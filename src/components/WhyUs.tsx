import React from 'react';
import { CheckCircle2, Target } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { Reveal } from './Reveal';

const ICON_TONES = [
  'bg-blue-50 text-blue-600 border-blue-100',
  'bg-indigo-50 text-indigo-600 border-indigo-100',
  'bg-emerald-50 text-emerald-600 border-emerald-100',
  'bg-amber-50 text-amber-600 border-amber-100',
  'bg-rose-50 text-rose-600 border-rose-100',
  'bg-cyan-50 text-cyan-600 border-cyan-100',
];

export const WhyUs: React.FC<{ content: SiteContent['whyUs'] }> = ({ content }) => (
  <section id="why-us" aria-labelledby="why-us-heading" className="bg-white py-20 md:py-28 text-slate-900 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl mb-14">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
          {content.eyebrow}
        </span>
        <h2 id="why-us-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-4 leading-tight">
          {content.title}
        </h2>
        <p className="text-base text-slate-600 mt-4 leading-relaxed">{content.description}</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {content.items.map((pillar, index) => {
          const Icon = getIcon(pillar.iconName, Target);
          return (
            <Reveal key={`${pillar.title}-${index}`} delay={index * 70}>
              <article className="group h-full p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400/50 hover:bg-white lift hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.4)] flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <span
                    className={`w-12 h-12 rounded-2xl border grid place-items-center transition-transform duration-300 group-hover:scale-105 ${
                      ICON_TONES[index % ICON_TONES.length]
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-3xl font-black text-slate-200 tabular-nums leading-none select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-[13.5px] text-slate-600 mt-2.5 leading-relaxed flex-1">{pillar.description}</p>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-2 text-[11.5px] font-semibold text-blue-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {content.commitmentLabel}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
