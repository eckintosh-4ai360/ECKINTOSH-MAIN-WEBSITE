import React from 'react';
import type { LucideIcon } from 'lucide-react';
import type { AccentTheme } from './theme';

/* ------------------------------------------------------------------ *
 * Shared building blocks for the mock product interfaces.
 * Everything here renders as a real, laid-out app surface so the
 * previews read as software rather than as marketing illustrations.
 * ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
}

/** Left rail + top bar + content: the frame every mock screen sits in. */
export const AppShell: React.FC<{
  accent: AccentTheme;
  appName: string;
  appInitials: string;
  nav: NavItem[];
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  user?: { name: string; role: string };
  children: React.ReactNode;
  dark?: boolean;
}> = ({ accent, appName, appInitials, nav, title, subtitle, actions, user, children, dark }) => (
  <div className={`flex h-full min-h-0 text-[11px] ${dark ? 'bg-slate-950' : 'bg-slate-100'}`}>
    {/* Sidebar */}
    <aside
      className={`hidden sm:flex w-[148px] shrink-0 flex-col border-r ${
        dark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
      }`}
    >
      <div className={`flex items-center gap-2 px-3 h-11 border-b ${dark ? 'border-white/10' : 'border-slate-200'}`}>
        <div
          className={`w-6 h-6 rounded-lg bg-gradient-to-br ${accent.gradient} text-white grid place-items-center text-[9px] font-black shrink-0`}
        >
          {appInitials}
        </div>
        <span className={`font-bold truncate ${dark ? 'text-white' : 'text-slate-900'}`}>{appName}</span>
      </div>

      <nav className="flex-1 p-2 space-y-0.5 overflow-hidden">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                item.active
                  ? `${accent.bg} text-white font-semibold shadow-sm`
                  : dark
                    ? 'text-slate-400'
                    : 'text-slate-500'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span
                  className={`ml-auto px-1 rounded text-[8px] font-bold ${
                    item.active ? 'bg-white/25 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      <div className={`p-2 border-t ${dark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className={`flex items-center gap-2 px-1 py-1 rounded-lg ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <div className="w-5 h-5 rounded-full bg-slate-300 grid place-items-center text-[8px] font-bold text-slate-700 shrink-0">
            {(user?.name || 'AD').slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className={`font-semibold truncate text-[9px] ${dark ? 'text-white' : 'text-slate-800'}`}>
              {user?.name || 'Admin'}
            </div>
            <div className="text-[8px] text-slate-400 truncate">{user?.role || 'Administrator'}</div>
          </div>
        </div>
      </div>
    </aside>

    {/* Main column */}
    <div className="flex-1 min-w-0 flex flex-col">
      <header
        className={`h-11 shrink-0 flex items-center justify-between gap-3 px-3 border-b ${
          dark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
        }`}
      >
        <div className="min-w-0">
          <div className={`font-bold truncate ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</div>
          {subtitle && <div className="text-[9px] text-slate-400 truncate">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">{actions}</div>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden p-3">{children}</div>
    </div>
  </div>
);

/** Small pill button used inside the mock top bars. */
export const AppBtn: React.FC<{
  accent?: AccentTheme;
  children: React.ReactNode;
  tone?: 'solid' | 'ghost';
  icon?: LucideIcon;
  dark?: boolean;
}> = ({ accent, children, tone = 'ghost', icon: Icon, dark }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-semibold whitespace-nowrap ${
      tone === 'solid'
        ? `${accent?.bg ?? 'bg-slate-900'} text-white`
        : dark
          ? 'bg-white/5 text-slate-300 border border-white/10'
          : 'bg-slate-100 text-slate-600 border border-slate-200'
    }`}
  >
    {Icon && <Icon className="w-3 h-3" />}
    {children}
  </span>
);

export const Card: React.FC<{ className?: string; dark?: boolean; children: React.ReactNode }> = ({
  className = '',
  dark,
  children,
}) => (
  <div
    className={`rounded-xl border ${
      dark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
    } ${className}`}
  >
    {children}
  </div>
);

export const Stat: React.FC<{
  label: string;
  value: string;
  delta?: string;
  deltaTone?: 'up' | 'down' | 'flat';
  icon?: LucideIcon;
  accent?: AccentTheme;
  dark?: boolean;
}> = ({ label, value, delta, deltaTone = 'up', icon: Icon, accent, dark }) => (
  <div
    className={`rounded-xl border p-2.5 ${dark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}
  >
    <div className="flex items-start justify-between gap-1">
      <span className="text-[9px] text-slate-400 font-medium leading-tight">{label}</span>
      {Icon && accent && (
        <span className={`w-5 h-5 rounded-md ${accent.bgSoft} grid place-items-center shrink-0`}>
          <Icon className={`w-3 h-3 ${accent.text}`} />
        </span>
      )}
    </div>
    <div className={`text-base font-black mt-0.5 tabular-nums ${dark ? 'text-white' : 'text-slate-900'}`}>
      {value}
    </div>
    {delta && (
      <div
        className={`text-[9px] font-semibold ${
          deltaTone === 'up' ? 'text-emerald-500' : deltaTone === 'down' ? 'text-rose-500' : 'text-slate-400'
        }`}
      >
        {delta}
      </div>
    )}
  </div>
);

export const Tag: React.FC<{ tone?: 'green' | 'amber' | 'rose' | 'blue' | 'slate'; children: React.ReactNode }> = ({
  tone = 'slate',
  children,
}) => {
  const tones = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  return (
    <span className={`px-1.5 py-0.5 rounded-md border text-[9px] font-semibold whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  );
};

export const Avatar: React.FC<{ name: string; hue?: string; size?: number }> = ({ name, hue, size = 22 }) => {
  const palette = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-cyan-500'];
  const pick = hue || palette[name.charCodeAt(0) % palette.length];
  return (
    <span
      className={`${pick} rounded-full grid place-items-center text-white font-bold shrink-0`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')}
    </span>
  );
};

export const Progress: React.FC<{ value: number; accent: AccentTheme; height?: number; dark?: boolean }> = ({
  value,
  accent,
  height = 5,
  dark,
}) => (
  <div
    className={`w-full rounded-full overflow-hidden ${dark ? 'bg-white/10' : 'bg-slate-200'}`}
    style={{ height }}
  >
    <div
      className={`h-full rounded-full bg-gradient-to-r ${accent.gradient} transition-[width] duration-700 ease-out`}
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
);

/** Animated column chart. Bars grow in on mount via CSS transition. */
export const Bars: React.FC<{
  data: { label: string; value: number }[];
  accent: AccentTheme;
  height?: number;
  dark?: boolean;
  highlightLast?: boolean;
  /** Stretch to the parent's height instead of a fixed pixel height. */
  fill?: boolean;
}> = ({ data, accent, height = 64, dark, highlightLast, fill }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div
      className={`flex items-end gap-1.5 w-full ${fill ? 'flex-1 min-h-0' : ''}`}
      style={fill ? undefined : { height }}
    >
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <div
            className={`w-full rounded-t-[3px] ${
              highlightLast && i === data.length - 1
                ? `bg-gradient-to-t ${accent.gradient}`
                : dark
                  ? 'bg-white/15'
                  : 'bg-slate-200'
            }`}
            style={{
              height: `${(d.value / max) * 100}%`,
              animation: `barGrow 700ms ${i * 60}ms cubic-bezier(.2,.8,.2,1) both`,
              backgroundColor: highlightLast && i === data.length - 1 ? undefined : undefined,
            }}
          />
          <span className="text-[8px] text-slate-400 leading-none">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

/** Sparkline / area trend line. */
export const Trend: React.FC<{ points: number[]; accent: AccentTheme; height?: number; fill?: boolean }> = ({
  points,
  accent,
  height = 56,
  fill,
}) => {
  const w = 240;
  const h = height;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const step = w / (points.length - 1 || 1);
  const coords = points.map((p, i) => [i * step, h - 6 - ((p - min) / span) * (h - 14)] as const);
  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;
  const gid = `g-${accent.hex.slice(1)}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={fill ? 'w-full flex-1 min-h-0' : 'w-full'}
      style={fill ? undefined : { height }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent.hex} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent.hex} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke={accent.hex}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 900, strokeDashoffset: 900, animation: 'drawLine 1.1s ease-out forwards' }}
      />
      <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="3" fill={accent.hex} />
    </svg>
  );
};

/** Donut ring used for utilisation / completion figures. */
export const Ring: React.FC<{
  value: number;
  accent: AccentTheme;
  size?: number;
  label?: string;
  sub?: string;
  dark?: boolean;
}> = ({ value, accent, size = 76, label, sub, dark }) => {
  const r = size / 2 - 7;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={dark ? '#1e293b' : '#e2e8f0'} strokeWidth="7" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={accent.hex}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (value / 100) * c}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none">
        <div>
          <div className={`text-sm font-black ${dark ? 'text-white' : 'text-slate-900'}`}>{label ?? `${value}%`}</div>
          {sub && <div className="text-[8px] text-slate-400 mt-0.5">{sub}</div>}
        </div>
      </div>
    </div>
  );
};

/** Compact data table with a sticky-looking header. */
export const Table: React.FC<{
  head: string[];
  rows: React.ReactNode[][];
  dark?: boolean;
  align?: ('l' | 'r' | 'c')[];
}> = ({ head, rows, dark, align = [] }) => {
  const at = (i: number) => (align[i] === 'r' ? 'text-right' : align[i] === 'c' ? 'text-center' : 'text-left');
  return (
    <div className="w-full overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className={dark ? 'bg-white/5' : 'bg-slate-50'}>
            {head.map((h, i) => (
              <th
                key={h}
                className={`${at(i)} px-2 py-1.5 text-[8.5px] font-bold uppercase tracking-wide text-slate-400 whitespace-nowrap`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-t ${dark ? 'border-white/5' : 'border-slate-100'}`}
              style={{ animation: `rowIn 420ms ${ri * 70}ms both` }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`${at(ci)} px-2 py-1.5 align-middle ${dark ? 'text-slate-200' : 'text-slate-700'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SectionLabel: React.FC<{ children: React.ReactNode; right?: React.ReactNode; dark?: boolean }> = ({
  children,
  right,
  dark,
}) => (
  <div className="flex items-center justify-between gap-2 mb-1.5">
    <span className={`text-[9px] font-bold uppercase tracking-wider ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
      {children}
    </span>
    {right}
  </div>
);
