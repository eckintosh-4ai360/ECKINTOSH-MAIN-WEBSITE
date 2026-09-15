import React from 'react';
import { CheckCircle2, Layers, ShieldCheck, Target, TrendingUp, Users } from 'lucide-react';
import type { SiteContent } from '../data/contentData';

export const WhyUs: React.FC<{ content: SiteContent['whyUs'] }> = ({ content }) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-6 h-6 text-blue-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-indigo-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-emerald-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-500" />;
      default:
        return <Target className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="why-us" className="bg-white py-20 md:py-28 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading leading-tight">
            {content.title}
          </h2>
          <p className="text-base text-slate-600 mt-4 leading-relaxed font-normal">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((pillar, idx) => (
            <div
              key={`${pillar.title}-${idx}`}
              className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 w-fit mb-5 shadow-sm">
                  {getPillarIcon(pillar.iconName)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-blue-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{content.commitmentLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
