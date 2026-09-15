import React, { useState } from 'react';
import { ArrowRight, GraduationCap, Truck, Building2, ShoppingBag, CheckCircle, ChevronDown } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';

interface SolutionsProps {
  content: SiteContent['products'];
  onSelectProduct: (product: Product) => void;
  onOpenPlanner: (topic?: string) => void;
}

const PAGE_SIZE = 4;

export const Solutions: React.FC<SolutionsProps> = ({ content, onSelectProduct, onOpenPlanner }) => {
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const visibleProducts = content.items.slice(0, visibleCount);
  const hasMore = content.items.length > visibleProducts.length;

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'eckintosh-school':
        return <GraduationCap className="w-6 h-6 text-blue-600" />;
      case 'cleanconnect':
        return <Truck className="w-6 h-6 text-emerald-600" />;
      case 'eckintosh-hr':
        return <Building2 className="w-6 h-6 text-indigo-600" />;
      case 'adepa-mall':
        return <ShoppingBag className="w-6 h-6 text-amber-600" />;
      default:
        return <GraduationCap className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="solutions" className="bg-white py-20 md:py-28 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
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

          <div>
            <button
              onClick={() => onOpenPlanner(content.ctaTopic)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <span>{content.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200 hover:border-blue-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header line */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                      {getProductIcon(prod.id)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        {prod.category}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 font-heading">
                        {prod.name}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-100/80 text-blue-700 border border-blue-200 whitespace-nowrap">
                    {prod.badge}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {prod.subtitle}
                </p>

                {/* Key Feature Checkmarks */}
                <div className="space-y-2 mb-6 p-4 rounded-xl bg-white border border-slate-200/80">
                  {prod.keyFeatures.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics bar */}
                <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-slate-100/80 rounded-xl border border-slate-200 text-center mb-6">
                  {prod.metrics.slice(0, 3).map((m, idx) => (
                    <div key={idx}>
                      <div className="text-sm font-bold text-slate-900 font-mono">{m.value}</div>
                      <div className="text-[10px] text-slate-500">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Product CTA */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Status: <strong className="text-emerald-600">{prod.status}</strong></span>
                <button
                  onClick={() => onSelectProduct(prod)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 group-hover:gap-2"
                >
                  <span>View Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Read More / Show More */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs border border-slate-200 flex items-center gap-2 transition-all"
            >
              <span>Read More Products ({content.items.length - visibleProducts.length} more)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
