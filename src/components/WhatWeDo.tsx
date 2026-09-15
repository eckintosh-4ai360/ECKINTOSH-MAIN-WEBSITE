import React, { useEffect, useState } from 'react';
import { Code2, Smartphone, LayoutDashboard, Cpu, Globe, ArrowRight, Check, Sparkles, ChevronRight } from 'lucide-react';
import type { Service, SiteContent } from '../data/contentData';

interface WhatWeDoProps {
  content: SiteContent['services'];
  onOpenPlanner: (serviceName?: string) => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ content, onOpenPlanner }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(content.items[0] ?? null);

  useEffect(() => {
    setSelectedService((current) => {
      if (!content.items.length) return null;
      return content.items.find((service) => service.id === current?.id) ?? content.items[0];
    });
  }, [content.items]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-blue-600" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-indigo-600" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-6 h-6 text-emerald-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-amber-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-500" />;
      default:
        return <Code2 className="w-6 h-6 text-blue-600" />;
    }
  };

  if (!selectedService) return null;

  return (
    <section id="services" className="bg-[#F7F9FC] py-20 md:py-28 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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

        {/* Interactive Cards & Detail Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Service Cards Grid (Left 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.items.map((srv) => {
              const isSelected = selectedService.id === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20 translate-y-[-2px]'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="p-3 rounded-xl bg-slate-100/80 w-fit mb-4">
                      {getIcon(srv.iconName)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className={isSelected ? 'text-blue-600' : 'text-slate-500'}>
                      {isSelected ? content.selectedLabel : content.unselectedLabel}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Detail Architecture Panel (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                    {getIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold font-mono">{content.detailEyebrow}</span>
                    <h4 className="text-xl font-bold text-slate-900 font-heading">{selectedService.title}</h4>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {selectedService.fullDesc}
              </p>

              {/* Core Features */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> {content.featuresHeading}
                </h5>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedService.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{content.deliverablesHeading}</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedService.deliverables.map((d, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white text-slate-800 text-[11px] font-semibold rounded-md border border-slate-200">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onOpenPlanner(`Service inquiry: ${selectedService.title}`)}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>{content.ctaPrefix} {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
