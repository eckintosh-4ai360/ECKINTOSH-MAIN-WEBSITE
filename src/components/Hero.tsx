import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Play, TrendingUp } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';
import { systemFor } from '../systems/registry';
import { SystemViewer } from '../systems/SystemViewer';
import { useCountUp, useInView, usePointerSpotlight } from '../hooks';

interface HeroProps {
  content: SiteContent['hero'];
  products: Product[];
  onOpenPlanner: (topic?: string) => void;
  onSelectProduct: (productId: string) => void;
  onFocusSystem: (productId: string) => void;
}

const HeroStat: React.FC<{ value: string; label: string; active: boolean }> = ({ value, label, active }) => {
  const display = useCountUp(value, active);
  return (
    <div>
      <div className="text-xl md:text-2xl font-black text-white tabular-nums">{display}</div>
      <div className="text-[10.5px] text-slate-500 leading-tight mt-0.5">{label}</div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ content, products, onOpenPlanner, onSelectProduct, onFocusSystem }) => {
  const [activeTabId, setActiveTabId] = useState<string>(content.dashboardTabs[0]?.id ?? '');
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const spotlight = usePointerSpotlight<HTMLDivElement>();

  useEffect(() => {
    setActiveTabId((current) => {
      if (content.dashboardTabs.some((tab) => tab.id === current)) return current;
      return content.dashboardTabs[0]?.id ?? '';
    });
  }, [content.dashboardTabs]);

  const activeTab = content.dashboardTabs.find((tab) => tab.id === activeTabId) || content.dashboardTabs[0];

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeTab?.productId),
    [activeTab?.productId, products]
  );

  const accent = accentOf(activeProduct?.accent);
  const definition = activeTab?.productId ? systemFor(activeTab.productId) : undefined;

  return (
    <section
      id="hero"
      ref={spotlight.ref}
      onPointerMove={spotlight.onPointerMove}
      onPointerLeave={spotlight.onPointerLeave}
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#08111F] text-white"
    >
      {/* Ambient light layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Twin counter-rotating volumetric light rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220vmax] h-[220vmax] hero-rays-spin">
          <div className="absolute inset-0 hero-rays-bg" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220vmax] h-[220vmax] hero-rays-spin-reverse">
          <div className="absolute inset-0 hero-rays-fine opacity-70" />
        </div>

        {/* Overhead light source */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[460px] rounded-full bg-blue-400/20 blur-[130px] animate-pulse-glow" />

        {/* Lens-flare horizon line */}
        <div className="absolute top-[9%] left-1/2 -translate-x-1/2 w-[62%] h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent blur-[1px] animate-pulse-glow" />

        {/* Drifting aurora orbs */}
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] bg-blue-600/25 rounded-full blur-[150px] animate-aurora mix-blend-screen" />
        <div
          className="absolute top-1/3 -right-32 w-[560px] h-[560px] rounded-full blur-[160px] opacity-30 transition-colors duration-1000 mix-blend-screen"
          style={{ backgroundColor: accent.hex }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-[480px] h-[480px] rounded-full blur-[150px] opacity-40 animate-aurora mix-blend-screen"
          style={{ backgroundColor: accent.hex2, animationDelay: '-11s' }}
        />

        {/* Floating bokeh sparks */}
        <div className="absolute top-[22%] left-[12%] w-2 h-2 rounded-full bg-sky-300/80 blur-[1px] hero-bokeh" />
        <div className="absolute top-[14%] right-[22%] w-1.5 h-1.5 rounded-full bg-blue-200/70 blur-[1px] hero-bokeh" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-[38%] left-[24%] w-1 h-1 rounded-full bg-indigo-300/80 hero-bokeh" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[30%] right-[8%] w-1.5 h-1.5 rounded-full bg-cyan-200/70 blur-[1px] hero-bokeh" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-[55%] left-[8%] w-1 h-1 rounded-full bg-blue-300/60 hero-bokeh" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-[48%] right-[16%] w-2 h-2 rounded-full bg-sky-200/50 blur-[2px] hero-bokeh" style={{ animationDelay: '-6s' }} />
        {/* Cursor spotlight */}
        {spotlight.pos && (
          <div
            className="absolute w-[420px] h-[420px] rounded-full blur-[110px] opacity-[0.16] transition-opacity duration-300"
            style={{
              backgroundColor: accent.hex2,
              left: `calc(${spotlight.pos.x * 100}% - 210px)`,
              top: `calc(${spotlight.pos.y * 100}% - 210px)`,
            }}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08111F] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Copy column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-semibold tracking-wide">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-blue-400" />
              </span>
              {content.eyebrow}
            </div>

            <h1 className="text-[2.1rem] sm:text-5xl md:text-[3.4rem] font-extrabold tracking-tight leading-[1.08]">
              {content.title}{' '}
              <span className="shimmer-text">{content.highlight}</span>
            </h1>

            <p className="text-base text-slate-400 leading-relaxed max-w-xl">{content.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenPlanner(content.primaryCtaTopic)}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                {content.primaryCtaLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onFocusSystem(activeTab?.productId || products[0]?.id || '')}
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 hover:border-white/25 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Watch the systems run
              </button>
            </div>

            {/* Live counters */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
              <HeroStat value="9" label="Production systems" active={statsInView} />
              <HeroStat value="15,000+" label="People served daily" active={statsInView} />
              <HeroStat value="8" label="Industries covered" active={statsInView} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono mb-2">
                {content.disciplinesLabel}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-400">
                {content.disciplines.map((discipline) => (
                  <span
                    key={discipline.label}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center gap-1.5"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${discipline.color}`} />
                    {discipline.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Live product film */}
          <div className="lg:col-span-7 min-w-0">
            <div className="flex items-center gap-1.5 mb-3 overflow-x-auto no-scrollbar">
              {content.dashboardTabs.map((tab) => {
                const Icon = getIcon(tab.iconName, TrendingUp);
                const tabProduct = products.find((product) => product.id === tab.productId);
                const tabAccent = accentOf(tabProduct?.accent);
                const selected = tab.id === activeTab?.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabId(tab.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold border transition-all ${
                      selected ? 'text-white' : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                    }`}
                    style={
                      selected
                        ? { backgroundColor: `${tabAccent.hex}26`, borderColor: `${tabAccent.hex}66`, color: '#fff' }
                        : undefined
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}

              <span className="ml-auto hidden sm:flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10.5px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {content.dashboardStatusLabel}
              </span>
            </div>

            {definition ? (
              <SystemViewer key={definition.productId} system={definition} accent={accent} compact />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center text-slate-500 text-sm">
                {content.dashboardWindowLabel}
              </div>
            )}

            {activeTab && (
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                {activeTab.stats.map((stat) => {
                  const Icon = getIcon(stat.iconName, TrendingUp);
                  return (
                    <span
                      key={`${activeTab.id}-${stat.label}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: accent.hex2 }} />
                      <span className="leading-tight">
                        <span className="block text-[13px] font-bold text-white tabular-nums">
                          {stat.value}
                          {stat.suffix && <span className="text-[10px] text-slate-500 font-normal ml-1">{stat.suffix}</span>}
                        </span>
                        <span className="block text-[9.5px] text-slate-500">{stat.label}</span>
                      </span>
                    </span>
                  );
                })}

                {activeTab.productId && (
                  <button
                    type="button"
                    onClick={() => onSelectProduct(activeTab.productId!)}
                    className="ml-auto text-[11.5px] font-semibold flex items-center gap-1 hover:gap-1.5 transition-all"
                    style={{ color: accent.hex2 }}
                  >
                    {activeTab.actionLabel || 'Open system'} <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
