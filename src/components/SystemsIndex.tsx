import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Play, Search } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';
import { Reveal } from './Reveal';

interface SystemsIndexProps {
  content: SiteContent['products'];
  onSelectProduct: (product: Product) => void;
  onFocusSystem: (productId: string) => void;
  onOpenPlanner: (topic?: string) => void;
}

const STATUS_TONE: Record<string, string> = {
  'Live in Production': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Enterprise Ready': 'text-blue-600 bg-blue-50 border-blue-200',
  'In Beta': 'text-amber-600 bg-amber-50 border-amber-200',
};

/** Light, scannable grid of every system — the counterpart to the dark deep-dive. */
export const SystemsIndex: React.FC<SystemsIndexProps> = ({
  content,
  onSelectProduct,
  onFocusSystem,
  onOpenPlanner,
}) => {
  const categories = ['All', ...Array.from(new Set(content.items.map((item) => item.category)))];
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? content.items : content.items.filter((item) => item.category === filter);

  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="bg-white py-20 md:py-28 text-slate-900 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              The full catalogue
            </span>
            <h2 id="solutions-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-4 leading-tight">
              Every system, at a glance.
            </h2>
            <p className="text-base text-slate-600 mt-4 leading-relaxed">
              Eight platforms, each solving a specific operational problem. Pick one to open its live interface, or read
              the full specification.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenPlanner(content.ctaTopic)}
            className="self-start md:self-end shrink-0 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 whitespace-nowrap transition-all shadow-md hover:shadow-lg"
          >
            {content.ctaLabel} <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 flex-wrap mb-7">
          <Search className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`px-3 py-1.5 rounded-lg text-[11.5px] font-semibold border transition-all ${
                filter === category
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((product, index) => {
            const accent = accentOf(product.accent);
            const Icon = getIcon(product.iconName);
            return (
              <Reveal key={product.id} delay={Math.min(index, 5) * 60}>
                <article
                  className="group relative h-full rounded-2xl bg-white border border-slate-200 p-5 flex flex-col lift hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]"
                  style={{ transitionProperty: 'transform, box-shadow, border-color' }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.borderColor = `${accent.hex}66`;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.borderColor = '';
                  }}
                >
                  {/* Accent wash on hover */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(180deg, ${accent.hex}12, transparent)` }}
                  />

                  <div className="relative flex items-start justify-between gap-2 mb-4">
                    <span
                      className="w-11 h-11 rounded-xl grid place-items-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: `${accent.hex}14`, color: accent.hex }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border whitespace-nowrap ${
                        STATUS_TONE[product.status] ?? 'text-slate-600 bg-slate-50 border-slate-200'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <div className="relative flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mt-0.5">{product.shortName}</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed mt-2">{product.subtitle}</p>

                    <ul className="mt-3.5 space-y-1.5">
                      {product.keyFeatures.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-1.5 text-[11.5px] text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent.hex }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative mt-4 pt-3.5 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onFocusSystem(product.id)}
                        className="flex-1 px-3 py-2 rounded-xl text-white text-[11.5px] font-bold flex items-center justify-center gap-1.5 transition-all hover:brightness-110"
                        style={{ backgroundColor: accent.hex }}
                      >
                        <Play className="w-3 h-3 fill-white" /> See it running
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11.5px] font-bold transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
