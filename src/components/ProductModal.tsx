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
        className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl shadow-slate-900/20 animate-scale-in"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div
            className="absolute inset-0 opacity-90"
            style={{ background: `linear-gradient(120deg, ${accent.hex}22, transparent 60%)` }}
          />
          <div className="relative flex items-start justify-between gap-4 p-5 md:p-6">
            <div className="flex items-start gap-3.5 min-w-0">
              <span
                className="w-12 h-12 rounded-2xl grid place-items-center shrink-0"
                style={{ backgroundColor: `${accent.hex}26`, color: accent.hex }}
              >
                <Icon className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold border"
                    style={{ color: accent.hex, borderColor: `${accent.hex}55`, backgroundColor: `${accent.hex}14` }}
                  >
                    {product.badge}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {product.status}
                  </span>
                  <span className="text-[11px] text-slate-500">· {product.category}</span>
                </div>
                <h2 className="mt-1 text-lg font-black leading-tight text-slate-900 md:text-2xl">{product.name}</h2>
                <p className="mt-0.5 text-sm text-slate-600">{product.tagline}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
                    selected ? 'text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                  style={selected ? { borderColor: accent.hex, color: accent.hex } : undefined}
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
              <p className="text-[15px] leading-relaxed text-slate-700">{product.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {product.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xl font-black tabular-nums" style={{ color: accent.hex }}>
                      {metric.value}
                    </div>
                    <div className="mt-0.5 text-[10.5px] leading-tight text-slate-600">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-3">
                    What it does
                  </h3>
                  <ul className="space-y-2">
                    {product.keyFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-[13px] text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent.hex }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-3">
                    Measured outcomes
                  </h3>
                  <div className="space-y-3">
                    {product.outcomes.map((outcome) => (
                      <div key={outcome.label} className="flex items-baseline gap-3">
                        <span className="shrink-0 text-xl font-black tabular-nums" style={{ color: accent.hex }}>
                          {outcome.value}
                        </span>
                        <span className="text-[13px] text-slate-600">{outcome.label}</span>
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
                <p className="text-[13px] text-slate-600">
                  This is the actual interface, rendered live. Use the timeline to move between screens.
                </p>
                <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> live render
                </span>
              </div>
              {definition ? (
                <SystemViewer system={definition} accent={accent} />
              ) : (
                <p className="text-sm text-slate-600">Walkthrough coming shortly.</p>
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
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition-colors hover:border-slate-300"
                    >
                      <span
                        className="w-8 h-8 rounded-lg grid place-items-center shrink-0"
                        style={{ backgroundColor: `${accent.hex}1f`, color: accent.hex }}
                      >
                        <ModuleIcon className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-bold text-slate-900">{module.name}</div>
                        <p className="mt-0.5 text-[12px] leading-snug text-slate-600">{module.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-3 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Built-in roles
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-medium text-slate-700"
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
              <h4 className="text-base font-bold text-slate-900">Deploy {product.shortName} for your organisation</h4>
              <p className="mt-1 text-[12.5px] text-slate-600">{product.pricingNote}</p>
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
