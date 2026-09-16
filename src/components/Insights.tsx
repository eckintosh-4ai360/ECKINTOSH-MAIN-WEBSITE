import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import type { InsightArticle, SiteContent } from '../data/contentData';
import { Reveal } from './Reveal';

interface InsightsProps {
  content: SiteContent['insights'];
  onSelectArticle: (article: InsightArticle) => void;
  onOpenPlanner: (topic?: string) => void;
}

export const Insights: React.FC<InsightsProps> = ({ content, onSelectArticle, onOpenPlanner }) => {
  return (
    <section id="insights" className="bg-white py-20 md:py-28 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <Reveal className="max-w-2xl min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {content.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading leading-tight">
              {content.title}
            </h2>
            <p className="text-base text-slate-600 mt-4 leading-relaxed font-normal">{content.description}</p>
          </Reveal>

          <div className="shrink-0">
            <button
              onClick={() => onOpenPlanner(content.ctaTopic)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <span>{content.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((art, index) => (
            <Reveal key={art.id} delay={index * 70} className="h-full">
            <article
              className="h-full p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-blue-500/40 hover:shadow-xl lift flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectArticle(art)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectArticle(art);
                }
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-blue-600 uppercase tracking-wider font-mono bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">{art.excerpt}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
