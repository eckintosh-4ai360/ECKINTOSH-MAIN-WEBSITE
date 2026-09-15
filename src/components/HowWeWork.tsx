import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { SiteContent } from '../data/contentData';

interface HowWeWorkProps {
  content: SiteContent['howWeWork'];
  onOpenPlanner: (topic?: string) => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ content, onOpenPlanner }) => {
  return (
    <section className="bg-[#F7F9FC] py-20 md:py-28 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading leading-tight">
            {content.title}
          </h2>
          <p className="text-base text-slate-600 mt-4 leading-relaxed font-normal">
            {content.description}
          </p>
        </div>

        {/* Premium Timeline Grid */}
        <div className="relative">
          {/* Subtle Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {content.items.map((stepItem, idx) => (
              <div
                key={stepItem.step}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-blue-600 font-mono tracking-tight group-hover:scale-105 transition-transform">
                      {stepItem.step}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
                    {stepItem.title}
                  </h3>

                  <div className="text-xs font-semibold text-blue-600 mb-3">
                    {stepItem.summary}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {stepItem.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] uppercase font-mono text-slate-400">
                  Stage 0{idx + 1} Execution
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenPlanner(content.ctaTopic)}
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-lg inline-flex items-center gap-2"
          >
            <span>{content.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
