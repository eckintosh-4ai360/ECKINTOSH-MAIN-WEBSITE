import React, { useEffect, useState } from 'react';
import { ArrowRight, DollarSign, GraduationCap, Smartphone, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import type { SiteContent } from '../data/contentData';

interface HeroProps {
  content: SiteContent['hero'];
  onOpenPlanner: (topic?: string) => void;
  onSelectProduct: (productId: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  GraduationCap,
  Smartphone,
  TrendingUp,
  Users,
};

const badgeClasses = {
  green: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || TrendingUp;
}

export const Hero: React.FC<HeroProps> = ({ content, onOpenPlanner, onSelectProduct }) => {
  const [activeCardTab, setActiveCardTab] = useState<string>(content.dashboardTabs[0]?.id ?? '');

  useEffect(() => {
    setActiveCardTab((current) => {
      if (content.dashboardTabs.some((tab) => tab.id === current)) return current;
      return content.dashboardTabs[0]?.id ?? '';
    });
  }, [content.dashboardTabs]);

  const activeTab = content.dashboardTabs.find((tab) => tab.id === activeCardTab) || content.dashboardTabs[0];
  const firstFloating = content.floatingCards[0];
  const secondFloating = content.floatingCards[1];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-navy-dark text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>{content.eyebrow}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
              {content.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-300">
                {content.highlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              {content.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenPlanner(content.primaryCtaTopic)}
                className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>{content.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#work"
                className="px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all flex items-center justify-center gap-2 hover:border-white/20"
              >
                {content.secondaryCtaLabel}
              </a>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-mono mb-2">
                {content.disciplinesLabel}
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-medium text-slate-300">
                {content.disciplines.map((discipline, idx) => (
                  <React.Fragment key={discipline.label}>
                    {idx > 0 && <span className="text-slate-600">-</span>}
                    <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${discipline.color}`} />
                      {discipline.label}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-[#0F1D33]/90 border border-white/10 p-5 md:p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2 truncate">{content.dashboardWindowLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-emerald-400 font-mono shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {content.dashboardStatusLabel}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {content.dashboardTabs.map((tab) => {
                  const Icon = getIcon(tab.iconName);
                  const active = activeCardTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCardTab(tab.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        active
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab && (
                <div className="min-h-[210px] flex flex-col justify-between">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-500/30 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-2 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30 shrink-0">
                          {React.createElement(getIcon(activeTab.iconName), { className: 'w-5 h-5' })}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate">{activeTab.title}</div>
                          <div className="text-[11px] text-slate-400 truncate">{activeTab.subtitle}</div>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${
                          badgeClasses[activeTab.badgeTone]
                        }`}
                      >
                        {activeTab.badge}
                      </span>
                    </div>

                    <div className={`grid gap-3 pt-2 ${activeTab.stats.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {activeTab.stats.map((stat) => {
                        const Icon = getIcon(stat.iconName);
                        return (
                          <div key={`${activeTab.id}-${stat.label}`} className="p-3.5 rounded-lg bg-slate-900/80 border border-white/10">
                            <div className="text-xs text-slate-400 flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5 text-blue-400" /> {stat.label}
                            </div>
                            <div className="text-2xl font-black text-white mt-1 font-mono">
                              {stat.value}{' '}
                              {stat.suffix && (
                                <span className="text-xs text-slate-400 font-sans font-normal">{stat.suffix}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-[11px] text-slate-400">{activeTab.note}</span>
                      {activeTab.productId && activeTab.actionLabel && (
                        <button
                          onClick={() => onSelectProduct(activeTab.productId!)}
                          className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 shrink-0"
                        >
                          {activeTab.actionLabel} <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {!activeTab.productId && activeTab.footerRight && (
                        <span className="text-blue-400 font-mono text-[11px] shrink-0">{activeTab.footerRight}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {firstFloating && (
              <div className="hidden sm:block absolute -top-6 -right-6 z-20 animate-float-slow">
                <FloatingCard card={firstFloating} tone="blue" />
              </div>
            )}

            {secondFloating && (
              <div className="hidden sm:block absolute -bottom-6 -left-6 z-20 animate-float-reverse">
                <FloatingCard card={secondFloating} tone="green" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingCard: React.FC<{ card: SiteContent['hero']['floatingCards'][number]; tone: 'blue' | 'green' }> = ({
  card,
  tone,
}) => {
  const Icon = getIcon(card.iconName);
  const border = tone === 'blue' ? 'border-blue-500/40' : 'border-emerald-500/40';
  const icon = tone === 'blue' ? 'bg-blue-600/30 text-blue-400' : 'bg-emerald-600/30 text-emerald-400';

  return (
    <div className={`p-3.5 rounded-xl bg-[#08111F]/90 border ${border} shadow-2xl backdrop-blur-md text-xs flex items-center gap-3`}>
      <div className={`w-8 h-8 rounded-lg ${icon} flex items-center justify-center`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="font-bold text-white">{card.title}</div>
        <div className="text-[10px] text-slate-400">{card.subtitle}</div>
      </div>
    </div>
  );
};
