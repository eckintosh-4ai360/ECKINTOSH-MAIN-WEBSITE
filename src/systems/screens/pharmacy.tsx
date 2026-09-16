import React from 'react';
import {
  AlertTriangle,
  Archive,
  Bell,
  Bot,
  Boxes,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Database,
  DollarSign,
  Download,
  FileText,
  LayoutGrid,
  LogOut,
  Moon,
  PanelLeft,
  Pencil,
  Plus,
  Printer,
  ScanBarcode,
  ScrollText,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Sun,
  TrendingUp,
  Truck,
  Upload,
  Users,
} from 'lucide-react';
import type { SystemDefinition } from '../types';

/* ------------------------------------------------------------------ *
 * Eckintosh Pharmacy Software — modelled on the live desktop product.
 * Layout, navigation and terminology follow the running system; the
 * figures are representative demo data rather than live shop records.
 * ------------------------------------------------------------------ */

type IconLike = React.ComponentType<{ className?: string }>;

const NAV: { label: string; icon: IconLike }[] = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Inventory', icon: Boxes },
  { label: 'PharmInfo', icon: Search },
  { label: 'Cashier Mode', icon: CreditCard },
  { label: 'Prescriptions', icon: ClipboardList },
  { label: 'Insurance', icon: ShieldCheck },
  { label: 'Reports', icon: FileText },
  { label: 'Audit Logs', icon: ScrollText },
  { label: 'AI Assistant', icon: Bot },
  { label: 'Restocking', icon: Truck },
  { label: 'Alerts', icon: Bell },
  { label: 'Settings', icon: Settings },
  { label: 'Users', icon: Users },
];

/** The product's own chrome: deep-green rail on a warm cream canvas. */
const PharmaShell: React.FC<{
  active: string;
  banner?: string;
  children: React.ReactNode;
}> = ({ active, banner, children }) => (
  <div className="flex h-full min-h-0 bg-gradient-to-br from-[#f6efe5] via-[#faf6ef] to-[#f3ece1] text-[10px]">
    {/* Rail */}
    <aside className="hidden sm:flex w-[118px] shrink-0 flex-col bg-[#0e3b2e] p-1.5">
      <div className="rounded-xl bg-gradient-to-br from-[#2f6b52] to-[#5f9d80] p-1.5 shrink-0">
        <div className="flex items-start justify-between gap-1">
          <span className="text-[5px] font-black tracking-[0.16em] text-white/60 leading-tight">
            DESKTOP
            <br />
            PHARMACY
          </span>
          <PanelLeft className="w-2 h-2 text-white/60 shrink-0" />
        </div>
        <div className="text-[9px] font-black text-white leading-tight mt-1">
          Eckintosh Pharmacy Software
        </div>
      </div>

      <nav className="flex-1 mt-1.5 space-y-[1px] overflow-hidden">
        {NAV.map((row) => {
          const Icon = row.icon;
          const isActive = row.label === active;
          return (
            <div
              key={row.label}
              className={`flex items-center gap-1.5 px-1.5 py-[3.5px] rounded-lg ${
                isActive ? 'bg-[#1d5943] text-white font-bold' : 'text-[#a9c9ba]'
              }`}
            >
              <Icon className="w-2.5 h-2.5 shrink-0" />
              <span className="truncate text-[7.5px]">{row.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>

    {/* Main */}
    <div className="flex-1 min-w-0 flex flex-col">
      <header className="shrink-0 flex items-center gap-1.5 px-2.5 pt-2">
        <span className="flex-1 min-w-0 rounded-xl bg-white/80 border border-white px-2 py-1.5">
          <span className="block text-[5.5px] font-black tracking-[0.16em] text-slate-400">PHARMACY WORKSPACE</span>
          <span className="block text-[10.5px] font-black text-slate-800 truncate">
            {banner ?? "Ready for today's operations"}
          </span>
        </span>

        <span className="flex items-center gap-1 shrink-0">
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white/80 border border-white">
            <Bell className="w-2.5 h-2.5 text-emerald-700" />
            <span className="px-1 rounded-full bg-amber-100 text-amber-700 text-[6px] font-black">24</span>
          </span>
          <span className="flex items-center gap-0.5 p-0.5 rounded-lg bg-white/80 border border-white">
            <span className="w-4 h-4 rounded-md bg-emerald-600 grid place-items-center">
              <Sun className="w-2 h-2 text-white" />
            </span>
            <span className="w-4 h-4 grid place-items-center">
              <Moon className="w-2 h-2 text-slate-400" />
            </span>
          </span>
          <span className="px-1.5 py-1 rounded-lg bg-white/80 border border-white leading-none">
            <span className="block text-[7.5px] font-black text-slate-800">Eckintosh</span>
            <span className="block text-[5.5px] font-bold tracking-[0.14em] text-slate-400">ADMIN</span>
          </span>
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white border border-slate-200">
            <LogOut className="w-2 h-2 text-slate-500" />
            <span className="text-[7px] font-bold text-slate-600">Sign Out</span>
          </span>
        </span>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden px-2.5 pt-1.5 pb-2">{children}</div>
    </div>
  </div>
);

/* --------------------------- Dashboard ----------------------------- */

const STATS: {
  label: string;
  chip?: string;
  chipTone?: string;
  value: string;
  caption: string;
  bar: string;
  icon: IconLike;
  iconTone: string;
  cardTone: string;
}[] = [
  {
    label: "TODAY'S SALES",
    chip: 'TODAY',
    chipTone: 'bg-emerald-100 text-emerald-700',
    value: 'GH₵ 3,480.00',
    caption: 'Daily collected revenue',
    bar: 'from-cyan-400 to-sky-500',
    icon: ShoppingBag,
    iconTone: 'bg-emerald-50 text-emerald-600',
    cardTone: 'bg-white',
  },
  {
    label: 'MONTHLY REVENUE',
    value: 'GH₵ 86,240.00',
    caption: 'Current month turnover',
    bar: 'from-sky-400 to-blue-500',
    icon: DollarSign,
    iconTone: 'bg-emerald-50 text-emerald-600',
    cardTone: 'bg-white',
  },
  {
    label: 'MONTHLY PROFIT',
    value: 'GH₵ 21,560.00',
    caption: 'Gross margin movement',
    bar: 'from-amber-400 to-orange-400',
    icon: TrendingUp,
    iconTone: 'bg-amber-50 text-amber-600',
    cardTone: 'bg-gradient-to-br from-amber-50/80 to-white',
  },
  {
    label: 'RISK ALERTS',
    chip: 'ACTION NEEDED',
    chipTone: 'text-rose-500',
    value: '18',
    caption: '12 low stock · 6 expiring',
    bar: 'from-rose-400 to-red-500',
    icon: AlertTriangle,
    iconTone: 'bg-rose-50 text-rose-500',
    cardTone: 'bg-gradient-to-br from-rose-50/80 to-white',
  },
];

const REVENUE = [38, 42, 36, 51, 47, 55, 49, 62, 58, 71, 66, 74, 69, 82, 78, 86];
const PROFIT = [9, 11, 8, 13, 12, 14, 12, 16, 15, 18, 17, 19, 18, 21, 20, 22];

const AreaChart: React.FC = () => {
  const w = 300;
  const h = 78;
  const max = 100;
  const step = w / (REVENUE.length - 1);

  const smooth = (points: number[]) => {
    const pts = points.map((p, i) => [i * step, h - 6 - (p / max) * (h - 12)] as const);
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i += 1) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(
        p2[0] -
        (p3[0] - p1[0]) / 6
      ).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full flex-1 min-h-0" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pharmFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" y1={h * g} x2={w} y2={h * g} stroke="#e7e2d8" strokeWidth="0.5" strokeDasharray="2 2" />
      ))}
      <path d={`${smooth(REVENUE)} L${w},${h} L0,${h} Z`} fill="url(#pharmFill)" />
      <path
        d={smooth(REVENUE)}
        fill="none"
        stroke="#0d9488"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{ strokeDasharray: 700, strokeDashoffset: 700, animation: 'drawLine 1.2s ease-out forwards' }}
      />
      <path
        d={smooth(PROFIT)}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.3"
        strokeDasharray="3 2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const TOP_SELLERS: [string, number, string][] = [
  ['Paracetamol 500mg', 100, '#0d9488'],
  ['Amoxicillin 500mg', 78, '#14b8a6'],
  ['GML Apeti Tablet', 64, '#2dd4bf'],
  ['ORS Sachets', 47, '#5eead4'],
  ['Vitamin B-Complex', 33, '#99f6e4'],
];

const DashboardScene: React.FC = () => (
  <PharmaShell active="Dashboard">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="flex items-start justify-between gap-2 shrink-0">
        <span className="leading-none">
          <span className="block text-[5.5px] font-black tracking-[0.16em] text-emerald-600">OVERVIEW</span>
          <span className="block text-[14px] font-black text-slate-800 mt-1">Pharmacy Dashboard</span>
          <span className="block text-[6.5px] text-slate-500 mt-0.5">
            Daily revenue, stock health, expiry alerts, and recent dispensing activity all in one place.
          </span>
        </span>
        <span className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-emerald-700 text-white text-[7.5px] font-black shrink-0">
          <ShoppingBag className="w-2.5 h-2.5" /> New Sale
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-xl border border-white p-1.5 ${stat.cardTone}`}
              style={{ animation: `rowIn 420ms ${i * 70}ms both` }}
            >
              <div className="flex items-start justify-between gap-1">
                <span className="min-w-0">
                  <span className="block text-[5.5px] font-black tracking-[0.14em] text-slate-400 truncate">
                    {stat.label}
                  </span>
                  {stat.chip && (
                    <span
                      className={`inline-block mt-0.5 px-1 rounded text-[5px] font-black tracking-wider ${stat.chipTone}`}
                    >
                      {stat.chip}
                    </span>
                  )}
                </span>
                <span className={`w-5 h-5 rounded-lg grid place-items-center shrink-0 ${stat.iconTone}`}>
                  <Icon className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="text-[13px] font-black text-slate-800 leading-none mt-1 tabular-nums">{stat.value}</div>
              <div className={`h-[2.5px] w-12 rounded-full bg-gradient-to-r ${stat.bar} mt-1`} />
              <div className="text-[5.5px] text-slate-400 mt-1">{stat.caption}</div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-5 gap-1.5">
        <div className="col-span-3 rounded-xl bg-white border border-white p-1.5 flex flex-col min-h-0">
          <span className="shrink-0 leading-none">
            <span className="block text-[9.5px] font-black text-slate-800">Financial Overview</span>
            <span className="block text-[6px] text-slate-400 mt-0.5">Revenue vs. Profit over the last 30 days</span>
          </span>
          <div className="flex-1 min-h-0 flex gap-1 mt-1">
            <div className="flex flex-col justify-between text-[5px] text-slate-400 shrink-0 pb-2 tabular-nums text-right">
              {['GH₵100', 'GH₵75', 'GH₵50', 'GH₵25', 'GH₵0'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <AreaChart />
              <div className="flex justify-between text-[5px] text-slate-400 shrink-0">
                {['Aug 18', 'Aug 22', 'Aug 26', 'Aug 30', 'Sep 03', 'Sep 07', 'Sep 11', 'Sep 16'].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1 shrink-0 text-[5.5px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-[2px] rounded-full bg-teal-600" /> Revenue
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-[2px] rounded-full bg-amber-500" /> Profit
            </span>
          </div>
        </div>

        <div className="col-span-2 rounded-xl bg-white border border-white p-1.5 flex flex-col min-h-0">
          <span className="shrink-0 leading-none">
            <span className="block text-[9.5px] font-black text-slate-800">Top Sellers</span>
            <span className="block text-[6px] text-slate-400 mt-0.5">
              Top 5 highest-volume medicines in the last 30 days
            </span>
          </span>
          <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5 mt-1">
            {TOP_SELLERS.map(([name, pct, tone], i) => (
              <div key={name} style={{ animation: `rowIn 420ms ${i * 80}ms both` }}>
                <div className="flex justify-between text-[5.5px] mb-0.5">
                  <span className="text-slate-600 font-semibold truncate">{name}</span>
                  <span className="text-slate-400 tabular-nums shrink-0">{Math.round(pct * 2.4)} units</span>
                </div>
                <div className="h-[6px] rounded-md bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-md"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: tone,
                      animation: `barGrow 700ms ${i * 80}ms cubic-bezier(.2,.8,.2,1) both`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </PharmaShell>
);

/* --------------------------- Inventory ----------------------------- */

const INVENTORY: [string, string, string, string, string, string, string, string][] = [
  ['Paracetamol 500mg', 'STE-PAR-F5509B', 'Tablet', '412', '0211 · GreenCross Wholesale', 'GH₵ 1.20', 'GH₵ 2.00', '07 Sep 2027'],
  ['Amoxicillin 500mg', 'AMX-CAP-BT3QC2', 'Capsules', '186', '0004 · PharmaOne Distributors', 'GH₵ 1.80', 'GH₵ 3.50', '21 Mar 2027'],
  ['Abidec drops', 'ABI-DRP-T6ZG7E', 'Drop', '64', '0183 · PharmaOne Distributors', 'GH₵ 112.00', 'GH₵ 180.00', '13 Oct 2027'],
  ['Aboniki balm', 'ABO-BAL-CLGUT8', 'Balm', '128', '0150 · PharmaOne Distributors', 'GH₵ 7.40', 'GH₵ 12.00', '20 Dec 2028'],
  ['Abyco capsules', 'ABY-CAP-JY87AT', 'Capsules', '9', '0160 · GreenCross Wholesale', 'GH₵ 7.10', 'GH₵ 12.00', '18 Oct 2027'],
  ['ORS sachets', 'ORS-SAC-QNYRA3', 'Sachet', '240', '0198 · GreenCross Wholesale', 'GH₵ 1.90', 'GH₵ 4.00', '02 Jun 2027'],
  ['Vitamin B-Complex', 'VIT-TAB-KP21XZ', 'Tablet', '43', '0087 · MedSource Ghana', 'GH₵ 3.60', 'GH₵ 6.50', '11 Oct 2026'],
  ['Ciprofloxacin 500mg', 'CIP-TAB-MW04LQ', 'Tablet', '92', '0221 · MedSource Ghana', 'GH₵ 2.40', 'GH₵ 4.20', '30 Apr 2028'],
];

const InventoryScene: React.FC = () => (
  <PharmaShell active="Inventory" banner="Batch-aware stock, FEFO ready">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="flex items-start justify-between gap-2 shrink-0">
        <span className="leading-none min-w-0">
          <span className="block text-[5.5px] font-black tracking-[0.16em] text-emerald-600">INVENTORY</span>
          <span className="block text-[13px] font-black text-slate-800 mt-1">Batch-aware medicine management</span>
          <span className="block text-[6.5px] text-slate-500 mt-0.5">
            Maintain medicine profiles, monitor FEFO readiness, and add new batches with pricing, expiry, and supplier
            data.
          </span>
        </span>
        <span className="px-2 py-1.5 rounded-xl bg-white border border-slate-200 text-[7px] font-bold text-slate-600 shrink-0 whitespace-nowrap">
          View archived medicines
        </span>
      </div>

      <div className="rounded-xl bg-white border border-white p-1.5 shrink-0 flex items-center gap-2">
        <span className="min-w-0 flex-1">
          <span className="block text-[5.5px] font-black tracking-[0.14em] text-slate-400">INVENTORY WORKSPACE</span>
          <span className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-black text-slate-800">Medicine inventory</span>
            <span className="px-1.5 py-[1px] rounded-full bg-slate-100 text-[6px] font-bold text-slate-600">
              296 medicines
            </span>
            <span className="px-1.5 py-[1px] rounded-full bg-amber-100 text-[6px] font-bold text-amber-700">
              12 low stock
            </span>
          </span>
          <span className="block text-[6px] text-slate-400 mt-0.5">
            Search, review batches, and manage active stock from one table.
          </span>
        </span>

        <span className="rounded-lg bg-slate-50 border border-slate-200 px-1.5 py-1 text-center shrink-0">
          <span className="block text-[5.5px] text-slate-400">Units on hand</span>
          <span className="block text-[10px] font-black text-slate-800 tabular-nums">4,675</span>
        </span>
        <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white border border-slate-200 text-[7px] font-bold text-slate-600 shrink-0">
          <Upload className="w-2 h-2" /> Import
        </span>
        <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white border border-slate-200 text-[7px] font-bold text-slate-600 shrink-0">
          <Download className="w-2 h-2" /> Export <ChevronDown className="w-1.5 h-1.5" />
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-700 text-white text-[7px] font-black shrink-0">
          <Plus className="w-2 h-2" /> Add medicine
        </span>
      </div>

      <div className="flex-1 min-h-0 rounded-xl bg-white border border-white flex flex-col overflow-hidden">
        <div className="flex items-center gap-1.5 p-1.5 shrink-0">
          <span className="min-w-0">
            <span className="block text-[9.5px] font-black text-slate-800">Current inventory</span>
            <span className="block text-[5.5px] text-slate-400">
              296 of 296 medicines shown · next batch follows FEFO order.
            </span>
          </span>
          <span className="ml-auto flex items-center gap-1 shrink-0">
            <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 bg-white w-28">
              <Search className="w-2 h-2 text-slate-400" />
              <span className="text-[6.5px] text-slate-400 truncate">Search name, SKU or category</span>
            </span>
            {['All categories', 'Any supplier', 'Any expiry'].map((f) => (
              <span
                key={f}
                className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 bg-white text-[6.5px] font-semibold text-slate-600"
              >
                {f} <ChevronDown className="w-1.5 h-1.5 text-slate-400" />
              </span>
            ))}
          </span>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/70">
                {['MEDICINE', 'CATEGORY', 'STOCK', 'NEXT BATCH', 'PURCHASE', 'SELLING', 'EXPIRY', 'ACTIONS'].map((h) => (
                  <th
                    key={h}
                    className="px-1.5 py-1 text-left text-[5.5px] font-black tracking-wider text-slate-400 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INVENTORY.map(([name, sku, cat, stock, batch, buy, sell, exp], i) => {
                const low = Number(stock) < 20;
                return (
                  <tr key={sku} className="border-t border-slate-100" style={{ animation: `rowIn 420ms ${i * 70}ms both` }}>
                    <td className="px-1.5 py-1">
                      <span className="block text-[7.5px] font-black text-slate-800">{name}</span>
                      <span className="block text-[5.5px] text-slate-400 font-mono">SKU {sku}</span>
                    </td>
                    <td className="px-1.5 py-1 text-[6.5px] text-slate-500">{cat}</td>
                    <td className="px-1.5 py-1">
                      <span
                        className={`px-1.5 py-[1px] rounded-full text-[6px] font-bold ${
                          low ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {stock} units
                      </span>
                      <span className="block text-[5px] text-slate-400 mt-0.5">Threshold 20</span>
                    </td>
                    <td className="px-1.5 py-1 text-[5.5px] text-slate-500">{batch}</td>
                    <td className="px-1.5 py-1 text-[6.5px] text-slate-600 tabular-nums">{buy}</td>
                    <td className="px-1.5 py-1 text-[7px] font-black text-slate-800 tabular-nums">{sell}</td>
                    <td className="px-1.5 py-1 text-[6.5px] text-slate-600">{exp}</td>
                    <td className="px-1.5 py-1">
                      <span className="flex items-center gap-1">
                        <span className="flex items-center gap-0.5 px-1.5 py-[2px] rounded-md border border-slate-200 text-[6px] font-bold text-slate-600">
                          <Pencil className="w-1.5 h-1.5" /> Edit
                        </span>
                        <span className="flex items-center gap-0.5 px-1.5 py-[2px] rounded-md bg-rose-500 text-white text-[6px] font-bold">
                          <Archive className="w-1.5 h-1.5" /> Archive
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </PharmaShell>
);

/* -------------------------- Cashier Mode --------------------------- */

const CATALOG: [string, string, string, string, string][] = [
  ['Paracetamol 500mg', 'STE-PAR-F5509B', 'Tablet', '412 available', 'GH₵ 2.00'],
  ['Amoxicillin 500mg', 'AMX-CAP-BT3QC2', 'Capsules', '186 available', 'GH₵ 3.50'],
  ['Abidec drops', 'ABI-DRP-T6ZG7E', 'Drop', '64 available', 'GH₵ 180.00'],
  ['Aboniki balm', 'ABO-BAL-CLGUT8', 'Balm', '128 available', 'GH₵ 12.00'],
  ['Abytone capsules', 'ABY-CAP-4X8V2I', 'Capsules', '94 available', 'GH₵ 5.00'],
  ['Abytone syrup', 'ABY-SYP-S2S8BT', 'Syrup', '39 available', 'GH₵ 35.00'],
  ['ORS sachets', 'ORS-SAC-QNYRA3', 'Sachet', '240 available', 'GH₵ 4.00'],
  ['Abyvita capsules', 'ABY-CAP-QNYRA3', 'Capsules', '57 available', 'GH₵ 3.00'],
  ['Adutwumwaa mixture', 'ADU-MIX-FU63E4', 'Mixture', '31 available', 'GH₵ 30.00'],
  ['Vitamin B-Complex', 'VIT-TAB-KP21XZ', 'Tablet', '208 available', 'GH₵ 6.50'],
  ['Ciprofloxacin 500mg', 'CIP-TAB-MW04LQ', 'Tablet', '92 available', 'GH₵ 4.20'],
  ['Metformin 500mg', 'MET-TAB-RD88YH', 'Tablet', '145 available', 'GH₵ 2.80'],
];

const CART: [string, string, string][] = [
  ['Paracetamol 500mg', '× 12', 'GH₵ 24.00'],
  ['Amoxicillin 500mg', '× 15', 'GH₵ 52.50'],
  ['ORS sachets', '× 6', 'GH₵ 24.00'],
];

const POS_TILES: { label: string; value: string; icon: IconLike }[] = [
  { label: 'Catalog results', value: '292', icon: Boxes },
  { label: 'Units in cart', value: '33', icon: ShoppingCart },
  { label: 'Current total', value: 'GH₵ 100.50', icon: FileText },
];

const CashierScene: React.FC = () => (
  <PharmaShell active="Cashier Mode" banner="Counter open · FEFO deduction live">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="shrink-0">
        <span className="block text-[5.5px] font-black tracking-[0.16em] text-emerald-600">POINT OF SALE</span>
        <span className="block text-[13px] font-black text-slate-800 mt-0.5">Dedicated cashier mode</span>
        <span className="block text-[6.5px] text-slate-500 mt-0.5">
          A fast, table-based dispensing workspace with barcode-ready search, stock visibility, automatic totals, FEFO
          batch deduction, and one-click receipt printing.
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 shrink-0">
        {POS_TILES.map(({ label, value, icon: Icon }, i) => (
          <span
            key={label}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-50/70 border border-emerald-100 px-1.5 py-1"
            style={{ animation: `rowIn 400ms ${i * 70}ms both` }}
          >
            <span className="w-5 h-5 rounded-lg bg-white grid place-items-center shrink-0">
              <Icon className="w-2.5 h-2.5 text-emerald-600" />
            </span>
            <span className="leading-none">
              <span className="block text-[5.5px] text-slate-500">{label}</span>
              <span className="block text-[10px] font-black text-slate-800 tabular-nums">{value}</span>
            </span>
          </span>
        ))}
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-5 gap-1.5">
        {/* Catalog */}
        <div className="col-span-3 rounded-xl bg-white border border-white flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-start justify-between gap-1.5 p-1.5 shrink-0">
            <span className="min-w-0">
              <span className="flex items-center gap-1 text-[9.5px] font-black text-slate-800">
                <ScanBarcode className="w-2.5 h-2.5 text-emerald-600" /> Medicine catalog
              </span>
              <span className="block text-[5.5px] text-slate-400 mt-0.5">
                Scan or search by medicine name, SKU, or barcode, then add directly to the sale.
              </span>
            </span>
            <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 bg-white shrink-0">
              <Search className="w-2 h-2 text-slate-400" />
              <span className="text-[6.5px] text-slate-400">Search or scan barcode</span>
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/70">
                  {['MEDICINE', 'CATEGORY', 'STOCK', 'PRICE', 'ACTION'].map((h) => (
                    <th
                      key={h}
                      className="px-1.5 py-1 text-left text-[5.5px] font-black tracking-wider text-slate-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATALOG.map(([name, sku, cat, stock, price], i) => (
                  <tr
                    key={sku}
                    className={`border-t border-slate-100 ${i === 1 ? 'bg-slate-50/70' : ''}`}
                    style={{ animation: `rowIn 400ms ${i * 55}ms both` }}
                  >
                    <td className="px-1.5 py-1">
                      <span className="block text-[7.5px] font-black text-slate-800">{name}</span>
                      <span className="block text-[5px] text-slate-400 font-mono">SKU {sku}</span>
                    </td>
                    <td className="px-1.5 py-1 text-[6.5px] text-slate-500">{cat}</td>
                    <td className="px-1.5 py-1">
                      <span className="px-1.5 py-[1px] rounded-full bg-emerald-50 text-emerald-700 text-[6px] font-bold">
                        {stock}
                      </span>
                    </td>
                    <td className="px-1.5 py-1 text-[7.5px] font-black text-slate-800 tabular-nums">{price}</td>
                    <td className="px-1.5 py-1">
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-[2px] rounded-md bg-emerald-700 text-white text-[6px] font-black">
                        <Plus className="w-1.5 h-1.5" /> Add
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current sale */}
        <div className="col-span-2 rounded-xl bg-white border border-white flex flex-col min-h-0 p-1.5">
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="w-5 h-5 rounded-lg bg-emerald-50 grid place-items-center">
              <ShoppingCart className="w-2.5 h-2.5 text-emerald-600" />
            </span>
            <span className="leading-none">
              <span className="block text-[9.5px] font-black text-slate-800">Current sale</span>
              <span className="block text-[5.5px] text-slate-400">3 items · walk-in customer</span>
            </span>
          </span>

          <div className="mt-1 space-y-[3px] shrink-0">
            {CART.map(([item, qty, total], i) => (
              <div
                key={item}
                className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-lg bg-slate-50 border border-slate-100"
                style={{ animation: `rowIn 400ms ${i * 80}ms both` }}
              >
                <span className="text-[6.5px] font-bold text-slate-700 truncate">{item}</span>
                <span className="text-[5.5px] text-slate-400 shrink-0">{qty}</span>
                <span className="text-[6.5px] font-black text-slate-800 tabular-nums shrink-0">{total}</span>
              </div>
            ))}
          </div>

          <div className="mt-1.5 shrink-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[5.5px] font-black tracking-wider text-slate-400">PAYMENT</span>
              <span className="text-[5.5px] font-black tracking-wider text-slate-400">AMOUNT PAID</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="flex rounded-lg bg-slate-100 p-[2px] shrink-0">
                <span className="px-1.5 py-[2px] rounded-md bg-white text-[6.5px] font-bold text-slate-700">Cash</span>
                <span className="px-1.5 py-[2px] text-[6.5px] font-bold text-slate-400">Mobile</span>
              </span>
              <span className="flex-1 px-1.5 py-1 rounded-lg border border-slate-200 text-[6.5px] font-bold text-slate-700 text-right tabular-nums">
                120.00
              </span>
            </div>
          </div>

          <div className="mt-1.5 rounded-lg bg-slate-50 border border-slate-100 px-1.5 py-1 shrink-0">
            {[
              ['Subtotal', 'GH₵ 100.50'],
              ['Change', 'GH₵ 19.50'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-[6px] text-slate-500">
                <span>{k}</span>
                <span className="tabular-nums">{v}</span>
              </div>
            ))}
            <div className="flex items-baseline justify-between pt-1 mt-1 border-t border-slate-200">
              <span className="text-[7px] font-black text-slate-700">Total</span>
              <span className="text-[13px] font-black text-emerald-600 tabular-nums">GH₵ 100.50</span>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-1.5 shrink-0">
            <span className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-emerald-700 text-white text-[7.5px] font-black">
              <CreditCard className="w-2 h-2" /> Complete sale
            </span>
            <span className="px-2 py-1.5 rounded-lg border border-slate-200 text-[7px] font-bold text-slate-500">
              Clear
            </span>
          </div>

          <div className="mt-auto pt-1.5 shrink-0">
            <span className="block text-[7px] font-black text-slate-700">Recent sales</span>
            {[
              ['SAL-MU3FNI3R', 'GH₵ 86.00'],
              ['SAL-MU0HR9UE', 'GH₵ 142.50'],
            ].map(([ref, amount]) => (
              <div key={ref} className="flex items-center justify-between gap-1 mt-0.5">
                <span className="leading-none min-w-0">
                  <span className="block text-[6px] font-bold text-slate-700 font-mono truncate">{ref}</span>
                  <span className="block text-[5px] text-slate-400">Walk-in customer</span>
                </span>
                <span className="text-[6.5px] font-black text-slate-800 tabular-nums shrink-0">{amount}</span>
                <span className="flex items-center gap-0.5 px-1 py-[2px] rounded-md border border-slate-200 text-[5.5px] font-bold text-slate-500 shrink-0">
                  <Printer className="w-1.5 h-1.5" /> Print
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </PharmaShell>
);

/* ------------------------- AI Assistant ---------------------------- */

const AssistantScene: React.FC = () => (
  <PharmaShell active="AI Assistant" banner="Assistant ready · live database">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="shrink-0">
        <span className="block text-[5.5px] font-black tracking-[0.16em] text-emerald-600">AI ASSISTANT</span>
        <span className="block text-[13px] font-black text-slate-800 mt-0.5">Inventory intelligence</span>
        <span className="block text-[6.5px] text-slate-500 mt-0.5">
          Ask the system about stock levels, restock gaps, expiring batches, purchase activity, and other pharmacy
          metrics. Every answer is generated from a live database query.
        </span>
      </div>

      <div className="rounded-xl bg-white border border-white p-1.5 shrink-0">
        <div className="flex items-start gap-1.5">
          <span className="w-5 h-5 rounded-lg bg-emerald-50 grid place-items-center shrink-0">
            <Bot className="w-2.5 h-2.5 text-emerald-600" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1">
              <span className="text-[9.5px] font-black text-slate-800">Admin-only database assistant</span>
              <span className="px-1.5 py-[1px] rounded-full bg-slate-100 text-[5.5px] font-bold text-slate-500">
                GHS workspace
              </span>
            </span>
            <span className="block text-[5.5px] text-slate-400 mt-0.5">
              This assistant queries Eckintosh Pharmacy&apos;s live data. It does not use hardcoded answers, and it shows
              the SQL it generated for each reply.
            </span>
          </span>
        </div>

        <div className="mt-1.5">
          <span className="flex items-center gap-1 text-[5.5px] font-black tracking-wider text-slate-400 mb-1">
            <Sparkles className="w-1.5 h-1.5 text-emerald-500" /> QUICK PROMPTS
          </span>
          <div className="flex flex-wrap gap-1">
            {[
              'How many active medicines are in the shop?',
              'How many units of paracetamol are left?',
              'Which medicines should we restock right now?',
              'Which batches are expiring within 30 days?',
            ].map((prompt) => (
              <span
                key={prompt}
                className="px-1.5 py-1 rounded-full border border-slate-200 bg-white text-[6.5px] font-semibold text-slate-600"
              >
                {prompt}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-xl bg-white border border-white flex flex-col p-1.5">
        <div className="flex items-center justify-between gap-2 shrink-0">
          <span className="leading-none">
            <span className="block text-[9.5px] font-black text-slate-800">Ask the assistant</span>
            <span className="block text-[5.5px] text-slate-400 mt-0.5">
              Try natural questions like &ldquo;How many drugs are getting to expiry?&rdquo;
            </span>
          </span>
          <span className="px-1.5 py-[1px] rounded-full bg-emerald-50 text-emerald-700 text-[5.5px] font-black shrink-0">
            Ready
          </span>
        </div>

        <div className="flex-1 min-h-0 mt-1.5 flex flex-col justify-end gap-1 overflow-hidden">
          <div className="flex justify-end">
            <span className="max-w-[70%] rounded-xl rounded-br-sm bg-emerald-700 text-white px-2 py-1 text-[6.5px]">
              Which batches are expiring within 30 days?
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-100 px-2 py-1.5">
            <p className="text-[6.5px] text-slate-700 leading-relaxed">
              Six batches expire before 16 October. Two are worth flagging now:{' '}
              <b>Abyco capsules</b> (batch 0160, 9 units) and <b>Vitamin B-Complex</b> (batch 0087, 43 units). The other
              four are low-value and within their supplier return window.
            </p>
            <div className="mt-1 rounded-lg bg-[#10261f] px-1.5 py-1 font-mono text-[5.5px] leading-[1.6]">
              <div className="text-teal-300">SELECT m.name, b.batch_no, b.qty, b.expires_on</div>
              <div className="text-slate-300">FROM batches b JOIN medicines m ON m.id = b.medicine_id</div>
              <div className="text-slate-300">
                WHERE b.expires_on &lt;= CURRENT_DATE + INTERVAL &apos;30 days&apos;
              </div>
              <div className="text-amber-200">ORDER BY b.expires_on ASC;</div>
            </div>
            <span className="flex items-center gap-1 mt-1 text-[5px] text-slate-400">
              <Database className="w-1.5 h-1.5" /> 6 rows · 41 ms · live query
            </span>
          </div>
        </div>

        <div className="shrink-0 mt-1.5">
          <div className="rounded-lg border border-slate-200 bg-white px-1.5 py-1.5">
            <span className="text-[6.5px] text-slate-400">
              Ask about stock, medicine balance, restocking, expiry, purchases, or sales…
              <span className="inline-block w-[1px] h-2 bg-slate-500 align-middle ml-0.5 animate-pulse" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1">
            <span className="text-[5px] text-slate-400">
              Press Ctrl+Enter to send. Responses are generated from the live database.
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-600/80 text-white text-[6.5px] font-black shrink-0">
              <Send className="w-2 h-2" /> Ask assistant
            </span>
          </div>
        </div>
      </div>
    </div>
  </PharmaShell>
);

/* ----------------------------- Export ------------------------------ */

export const pharmacySystem: SystemDefinition = {
  productId: 'pharmacy-management',
  appName: 'Eckintosh Pharmacy',
  appInitials: 'EP',
  url: 'pharmacy.eckintosh.app/dashboard',
  scenes: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      caption: "Today's takings, month-to-date margin, stock risk and dispensing trend on one screen.",
      duration: 7,
      render: () => <DashboardScene />,
    },
    {
      id: 'inventory',
      label: 'Inventory',
      caption: 'Batch-aware stock with FEFO ordering, supplier, purchase price and expiry on every line.',
      duration: 7,
      render: () => <InventoryScene />,
    },
    {
      id: 'cashier',
      label: 'Cashier Mode',
      caption: 'Scan or search, add to the sale, take cash or Mobile Money — batches deduct by expiry order.',
      duration: 7,
      render: () => <CashierScene />,
    },
    {
      id: 'assistant',
      label: 'AI Assistant',
      caption: 'Ask in plain language; it writes the SQL, runs it against live stock, and shows its working.',
      duration: 6,
      render: () => <AssistantScene />,
    },
  ],
};
