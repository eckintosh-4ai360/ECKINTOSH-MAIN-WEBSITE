import React from 'react';
import { CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import type { SiteContent } from '../data/contentData';

export const TrustBar: React.FC<{ content: SiteContent['trustBar'] }> = ({ content }) => {
  return (
    <section className="bg-white border-y border-slate-200 py-12 text-slate-900 relative z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">{content.title}</h2>
          <p className="text-xs text-slate-500 mt-1">{content.description}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {content.stats.map((stat, idx) => (
            <div
              key={`${stat.label}-${idx}`}
              className={`p-5 rounded-2xl transition-all duration-300 border ${
                stat.highlight
                  ? 'bg-gradient-to-b from-blue-50/80 to-white border-blue-200/80 shadow-md shadow-blue-500/5'
                  : 'bg-slate-50/80 border-slate-200/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </span>
                {stat.label.includes('Africa') ? (
                  <span className="p-1 rounded-full bg-amber-100 text-amber-700">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                )}
              </div>

              <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 font-heading tracking-tight">
                {stat.value}
              </div>

              <p className="text-xs text-slate-600 mt-1 font-medium leading-snug">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{content.footnote}</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">{content.policy}</div>
        </div>
      </div>
    </section>
  );
};
