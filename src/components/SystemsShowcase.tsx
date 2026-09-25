import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { accentOf, type AccentTheme } from '../systems/theme';
import { useInView, useReducedMotion } from '../hooks';
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

/** Radius of the ring the module nodes sit on, as a % of the orbit's width. */
const NODE_RADIUS = 36;
/** How long each module stays highlighted while the orbit auto-plays. */
const CYCLE_MS = 2800;

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Accent deepened toward navy so small text and white-on-accent buttons keep
 * at least 4.5:1 contrast on white (amber, orange and teal fall short on their own).
 */
const inkOf = (hex: string) => `color-mix(in srgb, ${hex} 75%, #0f172a)`;

/**
 * Infographic of one system: the product sits at the hub and its modules
 * orbit around it. Modules highlight in turn; hover or tap to take over.
 */
const SystemOrbit: React.FC<{ product: Product; accent: AccentTheme }> = ({ product, accent }) => {
  const modules = product.modules;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.35 });

  const autoPlaying = !reduced && !pinned && !hovering && inView && modules.length > 1;

  useEffect(() => {
    if (!autoPlaying) return;
    const id = window.setInterval(() => setActiveIndex((index) => (index + 1) % modules.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [autoPlaying, modules.length]);

  const nodes = modules.map((module, index) => {
    const angle = ((-90 + (index * 360) / modules.length) * Math.PI) / 180;
    return {
      module,
      index,
      x: 50 + NODE_RADIUS * Math.cos(angle),
      y: 50 + NODE_RADIUS * Math.sin(angle),
      // Labels on the top-most nodes sit above them so they never crowd the hub.
      labelAbove: Math.sin(angle) < -0.6,
    };
  });

  const HubIcon = getIcon(product.iconName);
  const current = modules[activeIndex];

  return (
    <div className="lg:flex lg:items-center lg:gap-8">
      <div
        ref={ref}
        className="relative mx-auto aspect-square w-full max-w-[520px] lg:mx-0 lg:w-[64%] lg:shrink-0"
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <div
          className="pointer-events-none absolute inset-[24%] rounded-full opacity-[0.14] blur-3xl transition-colors duration-700"
          style={{ backgroundColor: accent.hex }}
        />

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(15,23,42,0.2)"
            strokeWidth="0.3"
            strokeDasharray="0.4 1.6"
            className="orbit-spin"
          />
          <circle cx="50" cy="50" r={NODE_RADIUS} fill="none" stroke={accent.hex} strokeOpacity="0.28" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="0.3" />

          {nodes.map(({ index, x, y }) =>
            index === activeIndex ? (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={accent.hex}
                strokeWidth="0.45"
                strokeLinecap="round"
                className="orbit-flow"
              />
            ) : (
              <line key={index} x1="50" y1="50" x2={x} y2={y} stroke="rgba(15,23,42,0.09)" strokeWidth="0.25" />
            )
          )}
        </svg>

        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="hub-pulse absolute inset-0 rounded-full border"
            style={{ borderColor: accent.hex }}
            aria-hidden="true"
          />
          <div
            className="relative flex h-full w-full flex-col items-center justify-center rounded-full border text-center"
            style={{
              borderColor: `${accent.hex}40`,
              background: `radial-gradient(circle at 50% 28%, ${accent.hex}1f, transparent 72%), #ffffff`,
              boxShadow: `0 0 0 8px ${accent.hex}0d, 0 24px 50px -20px ${accent.hex}99`,
            }}
          >
            <HubIcon className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: accent.hex }} />
            <span className="mt-1.5 text-xl font-black tabular-nums leading-none text-slate-900 sm:mt-2 sm:text-2xl">
              {modules.length}
            </span>
            <span className="mt-1 text-[8.5px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">
              Modules
            </span>
          </div>
        </div>

        {/* Module nodes */}
        {nodes.map(({ module, index, x, y, labelAbove }) => {
          const Icon = getIcon(module.iconName);
          const on = index === activeIndex;
          return (
            <div
              key={module.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <button
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setActiveIndex(index);
                  setPinned(true);
                }}
                onFocus={() => setActiveIndex(index)}
                className="animate-scale-in group relative flex flex-col items-center"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 sm:h-14 sm:w-14 ${
                    on ? 'scale-110' : 'border-slate-200 bg-white shadow-sm group-hover:border-slate-300 group-hover:shadow-md'
                  }`}
                  style={
                    on
                      ? {
                          backgroundColor: accent.hex,
                          borderColor: accent.hex,
                          color: '#fff',
                          boxShadow: `0 0 0 6px ${accent.hex}1f, 0 12px 28px -10px ${accent.hex}`,
                        }
                      : { color: accent.hex }
                  }
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span
                  className={`absolute left-1/2 w-24 -translate-x-1/2 text-center text-[10.5px] font-semibold leading-tight transition-colors sm:w-28 sm:text-xs ${
                    labelAbove ? 'bottom-full mb-2' : 'top-full mt-2'
                  } ${on ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'}`}
                >
                  {module.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Caption for the highlighted module */}
      <div className="mx-auto mt-8 min-h-[5.5rem] max-w-md text-center lg:mx-0 lg:mt-0 lg:min-h-0 lg:flex-1 lg:text-left">
        {current && (
          <div key={activeIndex} className="animate-fadeIn">
            <p className="text-sm font-bold text-slate-900">
              <span className="mr-2 font-mono text-[11px] font-semibold" style={{ color: inkOf(accent.hex) }}>
                {pad(activeIndex + 1)}
              </span>
              {current.name}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{current.desc}</p>
            {autoPlaying && (
              <span className="mx-auto mt-3 block h-0.5 w-12 overflow-hidden rounded-full bg-slate-200 lg:mx-0">
                <span
                  className="cycle-progress block h-full rounded-full"
                  style={{ backgroundColor: accent.hex, animationDuration: `${CYCLE_MS}ms` }}
                />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * The centrepiece of the site: pick one of the systems from the track and
 * the stage re-themes around it, showing its outcomes and module map.
 */
export const SystemsShowcase: React.FC<SystemsShowcaseProps> = ({
  content,
  onSelectProduct,
  onOpenPlanner,
  activeId,
  onActiveIdChange,
}) => {
  const products = content.items;

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
  const activeIndex = products.indexOf(active);

  return (
    <section
      id="systems"
      aria-labelledby="systems-heading"
      className="relative py-20 md:py-28 bg-white text-slate-900 border-b border-slate-200 overflow-hidden"
    >
      {/* Soft wash that picks up the active system's colour */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-0 w-[640px] h-[640px] rounded-full blur-[160px] opacity-[0.07] transition-colors duration-1000"
          style={{ backgroundColor: accent.hex }}
        />
        <div
          className="absolute -bottom-40 left-0 w-[420px] h-[420px] rounded-full blur-[140px] opacity-[0.06] transition-colors duration-1000"
          style={{ backgroundColor: accent.hex }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mb-12 md:mb-16">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border transition-colors duration-500"
            style={{ color: inkOf(accent.hex), borderColor: `${accent.hex}33`, backgroundColor: `${accent.hex}0d` }}
          >
            {content.eyebrow}
          </span>
          <h2 id="systems-heading" className="text-1xl sm:text-4xl md:text-4xl font-extrabold tracking-tight mt-4 leading-[1.1]">
            {content.title}
          </h2>
          <p className="text-base text-slate-600 mt-2 leading-relaxed">{content.description}</p>
        </Reveal>

        {/* System track */}
        <Reveal>
          {/* <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            {products.length} systems · pick one
          </p> */}
          <div className="-mx-4 px-4 overflow-x-auto no-scrollbar lg:mx-0 lg:px-0 lg:overflow-visible">
            <div
              className="relative flex gap-1 pt-1 pb-2 lg:grid lg:gap-2"
              style={{ gridTemplateColumns: `repeat(${products.length}, minmax(0, 1fr))` }}
            >
              <div
                className="pointer-events-none absolute top-[1.8rem] hidden h-px bg-gradient-to-r from-slate-200/40 via-slate-300 to-slate-200/40 lg:block"
                style={{ left: `${50 / products.length}%`, right: `${50 / products.length}%` }}
                aria-hidden="true"
              />
              {products.map((product) => {
                const Icon = getIcon(product.iconName);
                const theme = accentOf(product.accent);
                const selected = product.id === active.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onActiveIdChange(product.id)}
                    className="group relative flex w-[5.75rem] shrink-0 flex-col items-center gap-2.5 text-center lg:w-auto"
                  >
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full border transition-all duration-300 ${
                        selected
                          ? 'scale-110'
                          : 'border-slate-200 bg-white text-slate-500 shadow-sm group-hover:border-slate-300 group-hover:text-slate-900 group-hover:shadow-md'
                      }`}
                      style={
                        selected
                          ? {
                              backgroundColor: theme.hex,
                              borderColor: theme.hex,
                              color: '#fff',
                              boxShadow: `0 0 0 5px ${theme.hex}1f, 0 10px 24px -10px ${theme.hex}`,
                            }
                          : undefined
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`text-xs font-semibold leading-tight transition-colors ${
                        selected ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'
                      }`}
                    >
                      {product.shortName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Stage */}
        <div
          key={active.id}
          className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
        >
          <div className="animate-fade-up lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-500">
              <span className="font-semibold" style={{ color: inkOf(accent.hex) }}>
                {pad(activeIndex + 1)} / {pad(products.length)}
              </span>
              <span className="h-px w-6 bg-slate-300" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_TONES[active.status] ?? 'bg-slate-500'}`} />
                {active.status}
              </span>
            </div>

            <h3 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.12]">{active.name}</h3>
            <p className="mt-3 text-base md:text-lg text-slate-600 leading-relaxed">{active.tagline}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onOpenPlanner(`Demo request: ${active.name}`)}
                className="group px-5 py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:brightness-110 hover:-translate-y-0.5"
                style={{ backgroundColor: inkOf(accent.hex), boxShadow: `0 12px 28px -14px ${accent.hex}` }}
              >
                Request demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onSelectProduct(active)}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 shadow-sm text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Maximize2 className="w-4 h-4" /> Full details
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SystemOrbit product={active} accent={accent} />
          </div>
        </div>
      </div>
    </section>
  );
};
