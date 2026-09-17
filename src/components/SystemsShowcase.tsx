import React, { useEffect, useMemo, useRef } from 'react';
import { ArrowRight, CheckCircle2, Maximize2, Plug, Sparkles } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';
import { systemFor } from '../systems/registry';
import { SystemViewer } from '../systems/SystemViewer';
import { useCountUp, useInView } from '../hooks';
import { Reveal } from './Reveal';

interface SystemsShowcaseProps {
  content: SiteContent['products'];
  onSelectProduct: (product: Product) => void;
  onOpenPlanner: (topic?: string) => void;
  /** Controlled selection so other sections can focus a system. */
  activeId: string;
  onActiveIdChange: (id: string) => void;
}

const STATUS_TONES: Record<string, string> = {
  'Live in Production': 'bg-emerald-500',
  'Enterprise Ready': 'bg-blue-500',
  'In Beta': 'bg-amber-500',
};

const MetricValue: React.FC<{ value: string; active: boolean; className?: string }> = ({
  value,
  active,
  className = '',
}) => {
  const display = useCountUp(value, active);
  return <span className={className}>{display}</span>;
};

/**
 * The centrepiece of the site: pick one of the nine systems on the left and
 * the whole panel re-themes around it while a live walkthrough of that
 * system's real interface plays on the right.
 */
export const SystemsShowcase: React.FC<SystemsShowcaseProps> = ({
  content,
  onSelectProduct,
  onOpenPlanner,
  activeId,
  onActiveIdChange,
}) => {
  const products = content.items;
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (products.length && !products.some((product) => product.id === activeId)) {
      onActiveIdChange(products[0].id);
    }
  }, [activeId, onActiveIdChange, products]);

  const active = useMemo(
    () => products.find((product) => product.id === activeId) ?? products[0],
    [activeId, products]
  );

  if (!active) return null;

  const accent = accentOf(active.accent);
  const definition = systemFor(active.id);

  return (
    <section id="systems" className="relative py-20 md:py-28 bg-[#08111F] text-white overflow-hidden">
      {/* Ambient backdrop that picks up the active system's colour */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[620px] h-[620px] rounded-full blur-[150px] opacity-25 animate-aurora transition-colors duration-1000"
          style={{ backgroundColor: accent.hex }}
        />
        <div
          className="absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full blur-[140px] opacity-20 transition-colors duration-1000"
          style={{ backgroundColor: accent.hex2 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mb-10 md:mb-14">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border transition-colors duration-500"
            style={{ color: accent.hex2, borderColor: `${accent.hex}55`, backgroundColor: `${accent.hex}14` }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-4 leading-[1.1]">
            {content.title}
          </h2>
          <p className="text-base text-slate-400 mt-4 leading-relaxed">{content.description}</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* System rail */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="hidden lg:block sticky top-24">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 px-1">
                {products.length} systems · pick one
              </div>
              <div className="space-y-1.5">
                {products.map((product) => {
                  const Icon = getIcon(product.iconName);
                  const theme = accentOf(product.accent);
                  const selected = product.id === active.id;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => onActiveIdChange(product.id)}
                      className={`w-full text-left group relative flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 ${
                        selected
                          ? 'bg-white/[0.07] border-white/15 shadow-lg'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10'
                      }`}
                      style={selected ? { boxShadow: `inset 3px 0 0 ${theme.hex}` } : undefined}
                    >
                      <span
                        className="w-8 h-8 rounded-lg grid place-items-center shrink-0 transition-colors duration-300"
                        style={{
                          backgroundColor: selected ? theme.hex : `${theme.hex}1f`,
                          color: selected ? '#fff' : theme.hex2,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-[13px] font-bold truncate transition-colors ${
                            selected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                          }`}
                        >
                          {product.shortName}
                        </span>
                        <span className="block text-[10px] text-slate-500 truncate">{product.category}</span>
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_TONES[product.status] ?? 'bg-slate-500'} ${
                          selected ? 'animate-pulse' : ''
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile rail */}
            <div ref={railRef} className="lg:hidden -mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {products.map((product) => {
                const Icon = getIcon(product.iconName);
                const theme = accentOf(product.accent);
                const selected = product.id === active.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onActiveIdChange(product.id)}
                    className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-[12px] font-semibold whitespace-nowrap transition-all ${
                      selected ? 'text-white' : 'bg-white/[0.03] border-white/10 text-slate-400'
                    }`}
                    style={
                      selected
                        ? { backgroundColor: `${theme.hex}22`, borderColor: `${theme.hex}66`, color: theme.hex2 }
                        : undefined
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {product.shortName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage */}
          <div className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div key={active.id} className="animate-fade-up">
              {/* Header line */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors duration-500"
                      style={{
                        color: accent.hex2,
                        borderColor: `${accent.hex}55`,
                        backgroundColor: `${accent.hex}14`,
                      }}
                    >
                      {active.badge}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_TONES[active.status] ?? 'bg-slate-500'}`} />
                      {active.status}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mt-1.5 truncate">{active.name}</h3>
                  <p className="text-sm text-slate-400 mt-0.5">{active.tagline}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(active)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> Full details
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenPlanner(`Demo request: ${active.name}`)}
                    className="px-3.5 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 transition-all hover:brightness-110"
                    style={{ backgroundColor: accent.hex, boxShadow: `0 10px 30px -10px ${accent.hex}` }}
                  >
                    Request demo <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Live walkthrough */}
              {definition ? (
                <SystemViewer system={definition} accent={accent} />
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-slate-400 text-sm">
                  Interface walkthrough coming shortly for {active.name}.
                </div>
              )}

              {/* Facts strip */}
              <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-6">
                {active.metrics.slice(0, 4).map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/20"
                  >
                    <MetricValue
                      value={metric.value}
                      active={statsInView}
                      className="block text-lg font-black tabular-nums"
                    />
                    <span className="block text-[10px] text-slate-400 mt-0.5 leading-tight">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Modules + integrations */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
                <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-3">
                    Modules included
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {active.modules.map((module) => {
                      const Icon = getIcon(module.iconName, CheckCircle2);
                      return (
                        <div key={module.name} className="flex items-start gap-2.5">
                          <span
                            className="w-6 h-6 rounded-lg grid place-items-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${accent.hex}1f`, color: accent.hex2 }}
                          >
                            <Icon className="w-3 h-3" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[12px] font-bold text-slate-200">{module.name}</span>
                            <span className="block text-[10.5px] text-slate-500 leading-snug">{module.desc}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-3 flex items-center gap-1.5">
                    <Plug className="w-3 h-3" /> Connects to
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.integrations.map((integration) => (
                      <span
                        key={integration}
                        className="px-2 py-1 rounded-lg text-[10.5px] font-medium bg-white/5 border border-white/10 text-slate-300"
                      >
                        {integration}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-2">
                      Ships as
                    </div>
                    <ul className="space-y-1">
                      {active.platforms.map((platform) => (
                        <li key={platform} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: accent.hex2 }} />
                          {platform}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-4 text-[10.5px] text-slate-500 leading-relaxed">{active.pricingNote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-transparent p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-base md:text-lg font-bold text-white">
                None of these nine is quite your problem?
              </h4>
              <p className="text-sm text-slate-400 mt-1">
                Most of our work starts that way. Tell us how your operation actually runs and we will design the system
                around it.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenPlanner(content.ctaTopic)}
              className="shrink-0 px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm flex items-center gap-2 transition-all"
            >
              {content.ctaLabel} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
