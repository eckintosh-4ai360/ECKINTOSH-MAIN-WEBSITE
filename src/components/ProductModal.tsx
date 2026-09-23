import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  MonitorPlay,
  Users,
  X,
} from 'lucide-react';
import type { Product } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';
import { systemFor } from '../systems/registry';
import { SystemViewer } from '../systems/SystemViewer';
import { useBodyScrollLock, useEscape, useFocusTrap } from '../hooks';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenPlanner: (productName?: string) => void;
}

type Tab = 'overview' | 'interface' | 'modules';

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: Layers },
  { id: 'interface', label: 'Live interface', icon: MonitorPlay },
  { id: 'modules', label: 'Modules & roles', icon: Users },
];

/** Full specification sheet for a single system, including its live walkthrough. */
export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onOpenPlanner }) => {
  const [tab, setTab] = useState<Tab>('overview');

  useBodyScrollLock(Boolean(product));
  useEscape(Boolean(product), onClose);
  const trapRef = useFocusTrap<HTMLDivElement>(Boolean(product));

  useEffect(() => {
    if (product) setTab('overview');
  }, [product]);

  if (!product) return null;

  const accent = accentOf(product.accent);
  const Icon = getIcon(product.iconName);
  const definition = systemFor(product.id);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center p-3 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        ref={trapRef}
        tabIndex={-1}
        className="relative w-full max-w-5xl bg-[#0F1D33] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white my-auto animate-scale-in"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="relative overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 opacity-90"
            style={{ background: `linear-gradient(120deg, ${accent.hex}22, transparent 60%)` }}
          />
          <div className="relative flex items-start justify-between gap-4 p-5 md:p-6">
            <div className="flex items-start gap-3.5 min-w-0">
              <span
                className="w-12 h-12 rounded-2xl grid place-items-center shrink-0"
                style={{ backgroundColor: `${accent.hex}26`, color: accent.hex2 }}
              >
                <Icon className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold border"
                    style={{ color: accent.hex2, borderColor: `${accent.hex}55`, backgroundColor: `${accent.hex}14` }}
                  >
                    {product.badge}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {product.status}
                  </span>
                  <span className="text-[11px] text-slate-500">· {product.category}</span>
                </div>
                <h2 className="text-lg md:text-2xl font-black mt-1 leading-tight">{product.name}</h2>
                <p className="text-sm text-slate-400 mt-0.5">{product.tagline}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="relative flex gap-1 px-4 md:px-6 overflow-x-auto no-scrollbar">
            {TABS.map((item) => {
              const TabIcon = item.icon;
              const selected = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                    selected ? 'text-white' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                  style={selected ? { borderColor: accent.hex, color: accent.hex2 } : undefined}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="p-5 md:p-6 space-y-5 max-h-[68vh] overflow-y-auto custom-scrollbar">
          {tab === 'overview' && (
            <div className="space-y-5 animate-fade-up">
              <p className="text-[15px] text-slate-300 leading-relaxed">{product.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {product.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                    <div className="text-xl font-black tabular-nums" style={{ color: accent.hex2 }}>
                      {metric.value}
                    </div>
                    <div className="text-[10.5px] text-slate-400 mt-0.5 leading-tight">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-3">
                    What it does
                  </h3>
                  <ul className="space-y-2">
                    {product.keyFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-[13px] text-slate-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent.hex2 }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-3">
                    Measured outcomes
                  </h3>
                  <div className="space-y-3">
                    {product.outcomes.map((outcome) => (
                      <div key={outcome.label} className="flex items-baseline gap-3">
                        <span className="text-xl font-black tabular-nums shrink-0" style={{ color: accent.hex2 }}>
                          {outcome.value}
                        </span>
                        <span className="text-[13px] text-slate-400">{outcome.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'interface' && (
            <div className="space-y-3 animate-fade-up">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] text-slate-400">
                  This is the actual interface, rendered live. Use the timeline to move between screens.
                </p>
                <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> live render
                </span>
              </div>
              {definition ? (
                <SystemViewer system={definition} accent={accent} />
              ) : (
                <p className="text-slate-400 text-sm">Walkthrough coming shortly.</p>
              )}
            </div>
          )}

          {tab === 'modules' && (
            <div className="space-y-5 animate-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {product.modules.map((module) => {
                  const ModuleIcon = getIcon(module.iconName, Layers);
                  return (
                    <div
                      key={module.name}
                      className="rounded-xl bg-white/[0.02] border border-white/10 p-3.5 flex items-start gap-3 transition-colors hover:border-white/20"
                    >
                      <span
                        className="w-8 h-8 rounded-lg grid place-items-center shrink-0"
                        style={{ backgroundColor: `${accent.hex}1f`, color: accent.hex2 }}
                      >
                        <ModuleIcon className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-bold text-white">{module.name}</div>
                        <p className="text-[12px] text-slate-400 leading-snug mt-0.5">{module.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-3 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Built-in roles
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.roles.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-1 rounded-lg text-[12px] font-medium bg-white/5 border border-white/10 text-slate-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <p className="text-[12px] text-slate-500 mt-3 leading-relaxed">
                  Each role sees only what it should. Permissions are configurable per organisation, and every action is
                  written to an audit log.
                </p>
              </div>
            </div>
          )}



          {/* Footer CTA */}
          <div
            className="rounded-xl border p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderColor: `${accent.hex}44`, background: `linear-gradient(110deg, ${accent.hex}1a, transparent)` }}
          >
            <div className="min-w-0">
              <h4 className="text-base font-bold text-white">Deploy {product.shortName} for your organisation</h4>
              <p className="text-[12.5px] text-slate-400 mt-1">{product.pricingNote}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPlanner(`Deployment enquiry: ${product.name}`);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 shrink-0"
              style={{ backgroundColor: accent.hex, boxShadow: `0 12px 30px -12px ${accent.hex}` }}
            >
              Request a demo & quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
