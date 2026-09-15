import React from 'react';
import { Cpu, Layers, Database, Cloud, CreditCard } from 'lucide-react';
import type { SiteContent } from '../data/contentData';

export const TechStack: React.FC<{ content: SiteContent['techStack'] }> = ({ content }) => {
  const getCatIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend': return <Layers className="w-5 h-5 text-blue-600" />;
      case 'Backend': return <Cpu className="w-5 h-5 text-indigo-600" />;
      case 'Data & Storage': return <Database className="w-5 h-5 text-emerald-600" />;
      case 'Cloud & Infrastructure': return <Cloud className="w-5 h-5 text-sky-600" />;
      case 'Payments & Telecom': return <CreditCard className="w-5 h-5 text-amber-600" />;
      default: return <Layers className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section className="bg-white py-20 md:py-28 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading leading-tight">
            {content.title}
          </h2>
          <p className="text-base text-slate-600 mt-4 leading-relaxed font-normal">
            {content.description}
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((catGroup) => (
            <div
              key={catGroup.category}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80">
                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                  {getCatIcon(catGroup.category)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {catGroup.category}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {catGroup.items.map((item) => (
                  <div key={item.name} className="p-3 rounded-xl bg-white border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
