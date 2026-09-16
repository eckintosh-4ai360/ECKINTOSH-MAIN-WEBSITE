import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, GraduationCap, Sparkles } from 'lucide-react';
import type { Industry, SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { Reveal } from './Reveal';

interface IndustriesProps {
  content: SiteContent['industries'];
  onOpenPlanner: (industryName?: string) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ content, onOpenPlanner }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(content.items[0] ?? null);

  useEffect(() => {
    setSelectedIndustry((current) => {
      if (!content.items.length) return null;
      return content.items.find((industry) => industry.id === current?.id) ?? content.items[0];
    });
  }, [content.items]);

  const getIndustryIcon = (iconName: string) => {
    const Icon = getIcon(iconName, GraduationCap);
    return <Icon className="w-5 h-5" />;
  };

  if (!selectedIndustry) return null;

  return (
    <section id="industries" className="bg-[#F7F9FC] py-20 md:py-28 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading leading-tight">
            {content.title}
          </h2>
          <p className="text-base text-slate-600 mt-4 leading-relaxed font-normal">
            {content.description}
          </p>
        </Reveal>

        {/* Horizontal Scroll / Grid Industry Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar mb-8 no-scrollbar">
          {content.items.map((ind) => {
            const active = selectedIndustry.id === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className={active ? 'text-blue-400' : 'text-slate-500'}>
                  {getIndustryIcon(ind.iconName)}
                </span>
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Spotlight Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                {getIndustryIcon(selectedIndustry.iconName)}
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold font-mono">
                  {selectedIndustry.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                  {selectedIndustry.name} Industry Platforms
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {selectedIndustry.description}
            </p>

            {/* Key Advantage Box */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-800">
              <div className="font-bold text-blue-900 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Strategic Operational Benefit
              </div>
              <div>{selectedIndustry.keyBenefit}</div>
            </div>

            {/* Practical Example Workflows */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Built-in Industry Use Cases
              </h4>
              <div className="space-y-2">
                {selectedIndustry.exampleUseCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenPlanner(`Industry solution for ${selectedIndustry.name}`)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
              >
                <span>Request {selectedIndustry.name} Solution Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Custom Industry Solutions List */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Ready Deployable Solutions
            </h4>
            <div className="space-y-2.5">
              {selectedIndustry.solutions.map((sol, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-900 flex items-center justify-between">
                  <span>{sol}</span>
                  <span className="text-[10px] text-blue-600 font-mono">Eckintosh Engineered</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
