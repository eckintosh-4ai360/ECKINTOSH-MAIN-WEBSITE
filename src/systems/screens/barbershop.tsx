import React from 'react';
import {
  BarChart3,
  Bell,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  Globe,
  History,
  Hourglass,
  LayoutGrid,
  LayoutTemplate,
  Lock,
  LogOut,
  Moon,
  Phone,
  Plus,
  Scissors,
  Search,
  Settings,
  ShoppingBag,
  Smartphone,
  Store,
  TrendingUp,
  User,
  UserCog,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import type { SystemDefinition } from '../types';

/* ------------------------------------------------------------------ *
 * E-Barber — Salon & POS System, modelled on the live product.
 * Design, navigation, terminology and figures are kept as they run.
 * Customer phone numbers and email addresses are masked, since the
 * order list would otherwise publish real contact details.
 * ------------------------------------------------------------------ */

type IconLike = React.ComponentType<{ className?: string }>;

const MENU: { label: string; icon: IconLike; caret?: boolean }[] = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Walk-ins & POS', icon: Scissors },
  { label: 'Online Orders', icon: Globe },
  { label: 'Barbers', icon: Users },
  { label: 'Services', icon: Store },
  { label: 'Sales', icon: CreditCard },
  { label: 'Expenses', icon: DollarSign },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Daily Closing', icon: Lock },
  { label: 'Website Content', icon: LayoutTemplate, caret: true },
];

const CONFIG: { label: string; icon: IconLike }[] = [
  { label: 'Users', icon: UserCog },
  { label: 'Audit Logs', icon: History },
  { label: 'Settings', icon: Settings },
];

/** The product's own chrome: near-black rail, orange accent, light canvas. */
const BarberShell: React.FC<{ active: string; title: string; children: React.ReactNode }> = ({
  active,
  title,
  children,
}) => (
  <div className="flex h-full min-h-0 bg-[#f1f5f9] text-[10px]">
    {/* Rail */}
    <aside className="hidden sm:flex w-[126px] shrink-0 flex-col bg-[#111827]">
      <div className="flex items-center gap-1.5 px-2 py-2 shrink-0">
        <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 grid place-items-center shrink-0">
          <Scissors className="w-3 h-3 text-white" />
        </span>
        <span className="leading-none min-w-0">
          <span className="block text-[10px] font-black text-white">E-Barber</span>
          <span className="block text-[5.5px] text-slate-400 truncate mt-0.5">Salon &amp; POS System</span>
        </span>
      </div>

      <nav className="flex-1 px-1.5 overflow-hidden">
        <div className="text-[5.5px] font-black tracking-[0.16em] text-slate-500 px-1.5 py-1">MENU</div>
        {MENU.map((row) => {
          const Icon = row.icon;
          const isActive = row.label === active;
          return (
            <div
              key={row.label}
              className={`flex items-center gap-1.5 px-1.5 py-[4px] rounded-lg mb-[1px] ${
                isActive ? 'bg-white text-slate-900 font-black' : 'text-slate-300'
              }`}
            >
              <Icon className={`w-2.5 h-2.5 shrink-0 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
              <span className="truncate text-[7.5px]">{row.label}</span>
              {row.caret && <ChevronDown className="w-2 h-2 ml-auto shrink-0 text-slate-500" />}
            </div>
          );
        })}

        <div className="text-[5.5px] font-black tracking-[0.16em] text-slate-500 px-1.5 py-1 mt-1 border-t border-white/[0.06]">
          CONFIGURATION
        </div>
        {CONFIG.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="flex items-center gap-1.5 px-1.5 py-[4px] rounded-lg text-slate-300">
              <Icon className="w-2.5 h-2.5 shrink-0 text-slate-400" />
              <span className="truncate text-[7.5px]">{row.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="p-1.5 shrink-0">
        <span className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[7.5px] font-black">
          <Plus className="w-2 h-2" /> New Walk-in
        </span>
      </div>
    </aside>

    {/* Main */}
    <div className="flex-1 min-w-0 flex flex-col">
      <header className="h-9 shrink-0 flex items-center gap-2 px-2.5 bg-white border-b border-slate-200">
        <span className="text-[10.5px] font-black text-slate-900 truncate">{title}</span>
        <span className="ml-auto flex items-center gap-1.5 shrink-0">
          <Moon className="w-2.5 h-2.5 text-slate-500" />
          <span className="relative">
            <Bell className="w-2.5 h-2.5 text-slate-500" />
            <span className="absolute -top-px -right-px w-1 h-1 rounded-full bg-orange-500" />
          </span>
          <span className="w-px h-3 bg-slate-200 mx-0.5" />
          <span className="leading-none text-right">
            <span className="block text-[7.5px] font-black text-slate-900">E-Shop Owner</span>
            <span className="block text-[5.5px] text-slate-400 mt-0.5">Superadmin</span>
          </span>
          <span className="w-5 h-5 rounded-full bg-orange-500 grid place-items-center text-[6.5px] font-black text-white shrink-0">
            EO
          </span>
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 text-[7px] font-bold text-slate-600">
            <LogOut className="w-2 h-2" /> Logout
          </span>
        </span>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden p-2">{children}</div>
    </div>
  </div>
);

/* --------------------------- Dashboard ----------------------------- */

const TILES: { label: string; value: string; caption: string; tone: string; icon: IconLike }[] = [
  { label: 'TOTAL WALK-INS', value: '0', caption: '0 waiting • 0 completed', tone: 'bg-blue-600', icon: Users },
  { label: 'COMPLETED SERVICES', value: '0', caption: 'Out of 0 visits recorded', tone: 'bg-emerald-500', icon: ShoppingBag },
  { label: 'TOTAL REVENUE', value: 'GH₵ 0.00', caption: 'Gross revenue collected', tone: 'bg-purple-500', icon: CreditCard },
  { label: 'NET PROFIT', value: 'GH₵ 0.00', caption: 'Revenue (GH₵ 0) - Expenses (GH₵ 0)', tone: 'bg-orange-500', icon: TrendingUp },
];

const QUICK_ACTIONS: { title: string; sub: string; icon: IconLike; tone: string }[] = [
  { title: 'New Walk-in', sub: 'Register customer, select ba…', icon: Plus, tone: 'bg-orange-50 text-orange-500' },
  { title: 'Services & Catalog', sub: 'Add services, update prices …', icon: Store, tone: 'bg-blue-50 text-blue-500' },
  { title: 'Analytics & Reports', sub: 'Review revenue, profit, and …', icon: BarChart3, tone: 'bg-purple-50 text-purple-500' },
  { title: 'Manage Users & Staff', sub: 'Manage staff accounts and p…', icon: Users, tone: 'bg-emerald-50 text-emerald-500' },
  { title: 'Daily Closing', sub: 'Reconcile cash sales and clo…', icon: Lock, tone: 'bg-amber-50 text-amber-500' },
];

const PAYMENT_ROWS: { label: string; icon: IconLike; tone: string }[] = [
  { label: 'Cash Sales', icon: Wallet, tone: 'text-emerald-500' },
  { label: 'Mobile Money (MoMo)', icon: Smartphone, tone: 'text-blue-500' },
  { label: 'Card Sales', icon: CreditCard, tone: 'text-amber-500' },
];

const DashboardScene: React.FC = () => (
  <BarberShell active="Dashboard" title="Dashboard">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      {/* Hero */}
      <div className="rounded-xl bg-[#111827] px-2.5 py-2 flex items-center justify-between gap-2 shrink-0">
        <span className="leading-none min-w-0">
          <span className="flex items-center gap-1 text-[6px] font-black tracking-[0.12em] text-orange-400">
            <Scissors className="w-2 h-2" /> GOOD DAY, E-SHOP OWNER!
          </span>
          <span className="block text-[14px] font-black text-white mt-1">Welcome back to your dashboard</span>
          <span className="block text-[6.5px] text-slate-400 mt-0.5">
            Here&apos;s what&apos;s happening with your barbershop operations today.
          </span>
        </span>
        <span className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white text-slate-900 text-[7.5px] font-black shrink-0">
          <Plus className="w-2.5 h-2.5 text-orange-500" /> New Walk-in
        </span>
      </div>

      {/* Timeframe */}
      <div className="rounded-xl bg-white border border-slate-200 px-2 py-1.5 flex items-center justify-between gap-2 shrink-0">
        <span className="flex items-center gap-1 text-[6.5px] font-black tracking-[0.1em] text-slate-500">
          <Calendar className="w-2 h-2" /> FILTER TIMEFRAME:
        </span>
        <span className="flex items-center gap-1 shrink-0">
          {['Today', 'This Week', 'This Month', 'Last Month'].map((t, i) => (
            <span
              key={t}
              className={`px-1.5 py-1 rounded-full text-[6.5px] font-bold ${
                i === 0 ? 'bg-[#111827] text-white' : 'text-slate-500'
              }`}
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      {/* Coloured tiles */}
      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        {TILES.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.label}
              className={`rounded-xl ${tile.tone} p-2 text-white`}
              style={{ animation: `rowIn 420ms ${i * 70}ms both` }}
            >
              <div className="flex items-start justify-between gap-1">
                <span className="text-[6px] font-black tracking-wider">{tile.label}</span>
                <span className="w-4.5 h-4.5 rounded-lg bg-white/20 grid place-items-center shrink-0 p-1">
                  <Icon className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="text-[17px] font-black leading-none mt-1.5 tabular-nums">{tile.value}</div>
              <div className="text-[5.5px] text-white/80 mt-1">{tile.caption}</div>
            </div>
          );
        })}
      </div>

      {/* Lower grid */}
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-1.5">
        <div className="col-span-2 flex flex-col gap-1.5 min-h-0">
          <div className="rounded-xl bg-white border border-slate-200 p-2 shrink-0">
            <div className="flex items-start justify-between gap-2">
              <span className="leading-none">
                <span className="block text-[9.5px] font-black text-slate-900">Recent Walk-ins &amp; Sales</span>
                <span className="block text-[6px] text-slate-400 mt-0.5">Latest customer activity and status</span>
              </span>
              <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-slate-100 text-[6.5px] font-bold text-slate-600 shrink-0">
                <Eye className="w-2 h-2" /> View all
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 text-center text-[6.5px] text-slate-400">
              No recent visits recorded. Click <b className="text-slate-700">+ New Walk-in</b> to register a customer.
            </div>
          </div>

          <div className="flex-1 min-h-0 rounded-xl bg-white border border-slate-200 p-2 flex flex-col">
            <div className="flex items-start justify-between gap-2 shrink-0">
              <span className="leading-none">
                <span className="block text-[9.5px] font-black text-slate-900">Financial Overview</span>
                <span className="block text-[6px] text-slate-400 mt-0.5">Revenue, Expenses and Net Profit breakdown</span>
              </span>
              <span className="flex items-center gap-1.5 text-[5.5px] text-slate-500 shrink-0">
                {[
                  ['Revenue', 'bg-blue-600'],
                  ['Expenses', 'bg-orange-500'],
                  ['Net Profit', 'bg-emerald-500'],
                ].map(([label, tone]) => (
                  <span key={label} className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${tone}`} /> {label}
                  </span>
                ))}
              </span>
            </div>

            <div className="flex-1 min-h-0 flex gap-1 mt-1">
              <div className="flex flex-col justify-between text-[5px] text-slate-400 shrink-0 pb-3 text-right">
                {['GH₵4', 'GH₵3', 'GH₵2', 'GH₵1', 'GH₵0'].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex-1 min-h-0 flex flex-col justify-between py-1">
                  {[0, 1, 2, 3, 4].map((g) => (
                    <span key={g} className="h-px bg-slate-100" />
                  ))}
                </div>
                <span className="text-[5.5px] text-slate-400 text-center shrink-0">Wed, Sep 16</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-1 shrink-0 text-[5.5px] text-slate-500">
              {[
                ['Expenses', 'bg-orange-500'],
                ['Net Profit', 'bg-emerald-500'],
                ['Revenue', 'bg-blue-600'],
              ].map(([label, tone]) => (
                <span key={label} className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${tone}`} /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 min-h-0">
          <div className="rounded-xl bg-white border border-slate-200 p-2 flex flex-col min-h-0">
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="w-4.5 h-4.5 rounded-lg bg-orange-50 grid place-items-center p-1">
                <TrendingUp className="w-2.5 h-2.5 text-orange-500" />
              </span>
              <span className="leading-none">
                <span className="block text-[9px] font-black text-slate-900">Quick Actions</span>
                <span className="block text-[5.5px] text-slate-400 mt-0.5">Open areas you use most</span>
              </span>
            </span>
            <div className="mt-1 space-y-[3px]">
              {QUICK_ACTIONS.map((action, i) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.title}
                    className="flex items-center gap-1.5 px-1.5 py-1 rounded-lg border border-slate-100"
                    style={{ animation: `rowIn 400ms ${i * 60}ms both` }}
                  >
                    <span className={`w-4 h-4 rounded-md grid place-items-center shrink-0 ${action.tone}`}>
                      <Icon className="w-2 h-2" />
                    </span>
                    <span className="leading-none min-w-0 flex-1">
                      <span className="block text-[7px] font-black text-slate-800 truncate">{action.title}</span>
                      <span className="block text-[5px] text-slate-400 truncate mt-0.5">{action.sub}</span>
                    </span>
                    <span className="text-slate-300 shrink-0 text-[7px]">→</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-2 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[8.5px] font-black text-slate-900">Payment Methods Today</span>
              <span className="text-[5.5px] text-slate-400 shrink-0">Reconciliation</span>
            </div>
            <div className="mt-1 space-y-0.5">
              {PAYMENT_ROWS.map(({ label, icon: Icon, tone }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-1 py-1 border-b border-slate-100 last:border-0"
                >
                  <span className="flex items-center gap-1 text-[6.5px] font-semibold text-slate-600">
                    <Icon className={`w-2 h-2 ${tone}`} /> {label}
                  </span>
                  <span className="text-[7.5px] font-black text-slate-900 tabular-nums">GH₵ 0.00</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </BarberShell>
);

/* ------------------------- Walk-in modal --------------------------- */

const WALKIN_FIELDS: { label: string; placeholder: string; icon: IconLike }[] = [
  { label: 'CUSTOMER NAME *', placeholder: 'e.g. John Mensah', icon: User },
  { label: 'PHONE NUMBER (OPTIONAL)', placeholder: 'e.g. 024 123 4567', icon: Phone },
];

const TENDERS: { label: string; icon: IconLike; selected: boolean }[] = [
  { label: 'Cash', icon: Wallet, selected: true },
  { label: 'Mobile Money', icon: Smartphone, selected: false },
  { label: 'Card', icon: CreditCard, selected: false },
];

const WalkInScene: React.FC = () => (
  <BarberShell active="Walk-ins & POS" title="Walk-ins & POS">
    <div className="relative h-full min-h-0">
      {/* Blurred page behind */}
      <div className="absolute inset-0 blur-[2px] opacity-40 flex flex-col gap-1.5 pointer-events-none">
        <div className="rounded-xl bg-white border border-slate-200 px-2 py-2 flex items-center justify-between">
          <span className="leading-none">
            <span className="block text-[12px] font-black text-slate-900">Walk-ins &amp; Front Desk Queue</span>
            <span className="block text-[6px] text-slate-400 mt-0.5">
              Register incoming walk-in clients, assign barbers and track transactions
            </span>
          </span>
          <span className="px-2 py-1.5 rounded-lg bg-orange-500 text-white text-[7px] font-black">+ New Walk-in</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {['CUSTOMERS TODAY', 'WAITING', 'IN PROGRESS', 'COMPLETED', 'REVENUE TODAY'].map((t) => (
            <div key={t} className="rounded-xl bg-white border border-slate-200 p-2">
              <span className="block text-[5.5px] font-black text-slate-400">{t}</span>
              <span className="block text-[14px] font-black text-slate-900 mt-1">0</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-white border border-slate-200 h-16" />
      </div>

      {/* Modal */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-[62%] rounded-xl bg-white shadow-2xl overflow-hidden animate-scale-in">
          <div className="bg-[#111827] px-2 py-1.5 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-lg bg-orange-500 grid place-items-center shrink-0">
              <Scissors className="w-2.5 h-2.5 text-white" />
            </span>
            <span className="leading-none min-w-0">
              <span className="block text-[9.5px] font-black text-white">New Walk-in Registration</span>
              <span className="block text-[5.5px] text-slate-400 mt-0.5">Record customer visit &amp; transaction</span>
            </span>
            <span className="ml-auto w-4 h-4 rounded-full bg-white/10 grid place-items-center shrink-0">
              <X className="w-2 h-2 text-slate-300" />
            </span>
          </div>

          <div className="p-2 space-y-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              {WALKIN_FIELDS.map(({ label, placeholder, icon: Icon }) => (
                <span key={label}>
                  <span className="block text-[5.5px] font-black tracking-wider text-slate-500 mb-0.5">{label}</span>
                  <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200">
                    <Icon className="w-2 h-2 text-slate-400 shrink-0" />
                    <span className="text-[7px] text-slate-400 truncate">{placeholder}</span>
                  </span>
                </span>
              ))}
            </div>

            <span className="block">
              <span className="block text-[5.5px] font-black tracking-wider text-slate-500 mb-0.5">SELECT SERVICE *</span>
              <span className="flex gap-1.5">
                <span className="flex-1 px-1.5 py-1 rounded-lg bg-orange-500 text-white">
                  <span className="block text-[7px] font-black">Veniam velit consec</span>
                  <span className="block text-[6.5px] font-bold">GH₵ 38.00</span>
                </span>
                <span className="flex-1 px-1.5 py-1 rounded-lg border border-slate-200">
                  <span className="block text-[7px] font-black text-slate-800">Trim Hair</span>
                  <span className="block text-[6.5px] text-slate-500">GH₵ 50.00</span>
                </span>
              </span>
            </span>

            <span className="block">
              <span className="block text-[5.5px] font-black tracking-wider text-slate-500 mb-0.5">ASSIGN BARBER *</span>
              <span className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-lg bg-[#111827] w-1/2">
                <span className="leading-none">
                  <span className="block text-[7px] font-black text-white">Witch Styla</span>
                  <span className="block text-[5.5px] text-slate-400 mt-0.5">Comm: 33.00%</span>
                </span>
                <Check className="w-2.5 h-2.5 text-orange-400 shrink-0" />
              </span>
            </span>

            <div className="grid grid-cols-2 gap-1.5">
              <span>
                <span className="block text-[5.5px] font-black tracking-wider text-slate-500 mb-0.5">
                  AMOUNT CHARGED (GH₵)
                </span>
                <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200">
                  <span className="text-[6px] font-bold text-slate-400">GH₵</span>
                  <span className="text-[8px] font-black text-slate-800">38.00</span>
                </span>
              </span>
              <span>
                <span className="block text-[5.5px] font-black tracking-wider text-slate-500 mb-0.5">INITIAL STATUS</span>
                <span className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-lg border border-slate-200">
                  <span className="flex items-center gap-1 text-[7px] font-semibold text-slate-700">
                    <Hourglass className="w-2 h-2 text-amber-500" /> Waiting in Queue
                  </span>
                  <ChevronDown className="w-2 h-2 text-slate-400 shrink-0" />
                </span>
              </span>
            </div>

            <span className="block">
              <span className="block text-[5.5px] font-black tracking-wider text-slate-500 mb-0.5">PAYMENT METHOD</span>
              <span className="flex gap-1.5">
                {TENDERS.map(({ label, icon: Icon, selected }) => (
                  <span
                    key={label}
                    className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[7px] font-black ${
                      selected ? 'bg-emerald-600 text-white' : 'border border-slate-200 text-slate-600'
                    }`}
                  >
                    <Icon className="w-2 h-2" /> {label}
                  </span>
                ))}
              </span>
            </span>

            <div className="flex gap-1.5 pt-0.5">
              <span className="flex-1 py-1.5 rounded-lg border border-slate-200 text-[7.5px] font-bold text-slate-600 text-center">
                Cancel
              </span>
              <span className="flex-[2] flex items-center justify-center gap-1 py-1.5 rounded-lg bg-orange-500 text-white text-[7.5px] font-black">
                <Check className="w-2 h-2" /> REGISTER CUSTOMER
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BarberShell>
);

/* ------------------------- Online orders --------------------------- */

const ORDERS: {
  code: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  barber: string;
  items: string;
  item: string;
  amount: string;
  status: string;
  tone: string;
}[] = [
  { code: '#CB-93016', name: 'Mark Aggrey', phone: '050✱✱✱4023', email: 'e✱✱✱✱✱@gmail.com', date: '2026-08-13', time: '10:00 AM', barber: 'Any Available', items: '1 item', item: 'Executive Fade & Lineup', amount: 'GH₵ 54.00', status: 'Completed', tone: 'bg-emerald-50 text-emerald-600' },
  { code: '#CB-60093', name: 'Jude Forson', phone: '054✱✱✱2516', email: '0✱✱✱✱✱@gmail.com', date: '2026-08-13', time: '10:00 AM', barber: 'Any Available', items: '1 item', item: 'Young Gentleman Cut (Under 12)', amount: 'GH₵ 36.00', status: 'Confirmed', tone: 'bg-blue-50 text-blue-600' },
  { code: '#CB-40931', name: 'Jude Forson', phone: '054✱✱✱2516', email: '0✱✱✱✱✱@gmail.com', date: '2026-08-13', time: '03:40 PM', barber: 'Any Available', items: '1 item', item: 'Executive Fade & Lineup', amount: 'GH₵ 54.00', status: 'Confirmed', tone: 'bg-blue-50 text-blue-600' },
  { code: '#CB-68810', name: 'Labore corporis et e', phone: '+1 (613) ✱✱✱-9654', email: 'w✱✱✱✱✱@mailinator.com', date: '2026-08-11', time: '10:00 AM', barber: 'Any Available', items: '1 item', item: 'Classic Scissor Cut', amount: 'GH₵ 48.00', status: 'Confirmed', tone: 'bg-blue-50 text-blue-600' },
  { code: '#CB-44267', name: 'Markintosh Kojo', phone: '050✱✱✱4023', email: 'e✱✱✱✱✱@gmail.com', date: '2026-08-11', time: '10:00 AM', barber: 'Any Available', items: '1 item', item: 'Executive Fade & Lineup', amount: 'GH₵ 50.00', status: 'Confirmed', tone: 'bg-blue-50 text-blue-600' },
  { code: '#CB-66060', name: 'Mark Aggrey', phone: '123✱✱✱789', email: '', date: '2026-08-10', time: '10:00 AM', barber: 'Leo Hayes', items: '1 item', item: 'The Royal Crown Treatment', amount: 'GH₵ 90.00', status: 'Cancelled', tone: 'bg-rose-50 text-rose-600' },
  { code: '#CB-31948', name: 'Ethan Hunt', phone: '(555) ✱✱✱-5432', email: 'e✱✱✱✱✱@example.com', date: '2026-08-09', time: '11:00 AM', barber: 'Julian Rivera', items: '2 items', item: 'The Royal Crown Treatment', amount: 'GH₵ 99.00', status: 'Completed', tone: 'bg-emerald-50 text-emerald-600' },
];

const OrdersScene: React.FC = () => (
  <BarberShell active="Online Orders" title="Online Orders">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="rounded-xl bg-white border border-slate-200 px-2 py-1.5 shrink-0">
        <span className="flex items-center gap-1 text-[11px] font-black text-slate-900">
          <Globe className="w-3 h-3 text-orange-500" /> Online Orders
        </span>
        <span className="block text-[6.5px] text-slate-400 mt-0.5">
          Bookings and purchases placed through the client website, synced live from the shared database.
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        {[
          ['TOTAL ORDERS', '8', 'text-slate-900', 'bg-white border border-slate-200'],
          ['ACTIVE BOOKINGS', '5', 'text-blue-600', 'bg-white border border-slate-200'],
          ['COMPLETED', '2', 'text-emerald-600', 'bg-white border border-slate-200'],
          ['TOTAL REVENUE', 'GH₵ 431.00', 'text-orange-400', 'bg-[#111827]'],
        ].map(([label, value, tone, card], i) => (
          <div key={label} className={`rounded-xl px-2 py-1.5 ${card}`} style={{ animation: `rowIn 420ms ${i * 70}ms both` }}>
            <span className={`block text-[5.5px] font-black tracking-wider ${i === 3 ? 'text-orange-400' : 'text-slate-400'}`}>
              {label}
            </span>
            <span className={`block text-[15px] font-black mt-1 tabular-nums ${tone}`}>{value}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white border border-slate-200 px-2 py-1.5 flex items-center justify-between gap-2 shrink-0">
        <span className="flex items-center gap-0.5">
          {['All', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((t, i) => (
            <span
              key={t}
              className={`px-1.5 py-1 rounded-lg text-[6.5px] font-bold ${
                i === 0 ? 'bg-white border border-slate-200 text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              {t}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 shrink-0">
          <Search className="w-2 h-2 text-slate-400" />
          <span className="text-[6.5px] text-slate-400">Search customer, order code, pho</span>
        </span>
      </div>

      <div className="flex-1 min-h-0 rounded-xl bg-white border border-slate-200 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/70">
              {['ORDER CODE', 'CUSTOMER', 'APPOINTMENT', 'BARBER', 'ITEMS', 'AMOUNT', 'STATUS'].map((h) => (
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
            {ORDERS.map((order, i) => (
              <tr
                key={order.code}
                className="border-t border-slate-100"
                style={{ animation: `rowIn 400ms ${i * 50}ms both` }}
              >
                <td className="px-1.5 py-1 text-[6.5px] font-bold text-slate-700">{order.code}</td>
                <td className="px-1.5 py-1">
                  <span className="block text-[7.5px] font-black text-slate-900">{order.name}</span>
                  <span className="block text-[5px] text-slate-400">{order.phone}</span>
                  {order.email && <span className="block text-[5px] text-slate-400">{order.email}</span>}
                </td>
                <td className="px-1.5 py-1">
                  <span className="flex items-center gap-0.5 text-[6px] font-semibold text-slate-700">
                    <CalendarDays className="w-1.5 h-1.5 text-slate-400" /> {order.date}
                  </span>
                  <span className="flex items-center gap-0.5 text-[5.5px] text-slate-400">
                    <Clock className="w-1.5 h-1.5" /> {order.time}
                  </span>
                </td>
                <td className="px-1.5 py-1 text-[6.5px] text-slate-600">{order.barber}</td>
                <td className="px-1.5 py-1">
                  <span className="block text-[5.5px] text-slate-400">{order.items}</span>
                  <span className="block text-[6.5px] text-slate-700">{order.item}</span>
                </td>
                <td className="px-1.5 py-1 text-[7.5px] font-black text-slate-900 tabular-nums whitespace-nowrap">
                  {order.amount}
                </td>
                <td className="px-1.5 py-1">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-[2px] rounded-md text-[6px] font-black ${order.tone}`}
                  >
                    {order.status} <ChevronDown className="w-1.5 h-1.5" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </BarberShell>
);

/* -------------------------- Daily closing -------------------------- */

const ClosingScene: React.FC = () => (
  <BarberShell active="Daily Closing" title="End-of-Day Daily Closing">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="rounded-xl bg-white border border-slate-200 px-2 py-1.5 flex items-start justify-between gap-2 shrink-0">
        <span className="leading-none">
          <span className="block text-[11px] font-black text-slate-900">End-of-Day Daily Closing</span>
          <span className="block text-[6.5px] text-slate-400 mt-0.5">
            Reconcile daily cash till, verify MoMo &amp; card totals, and lock daily register
          </span>
        </span>
        <span className="flex items-center gap-1 shrink-0">
          <span className="text-[6px] font-black tracking-wider text-slate-500">CLOSING DATE:</span>
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 text-[7px] font-bold text-slate-700">
            09/16/2026 <CalendarDays className="w-2 h-2 text-slate-400" />
          </span>
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 shrink-0">
        <div className="col-span-3 rounded-xl bg-white border border-slate-200 p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-lg bg-orange-50 grid place-items-center shrink-0">
                <Lock className="w-2.5 h-2.5 text-orange-500" />
              </span>
              <span className="leading-none">
                <span className="block text-[9px] font-black text-slate-900">DAILY CLOSING SUMMARY</span>
                <span className="block text-[5.5px] text-slate-400 mt-0.5">Date: 2026-09-16</span>
              </span>
            </span>
            <span className="px-1.5 py-[2px] rounded-md bg-amber-100 text-amber-700 text-[6px] font-black shrink-0">
              OPEN REGISTER
            </span>
          </div>

          <div className="flex items-center justify-between gap-1 mt-2 pb-1 border-b border-slate-100">
            <span className="text-[7px] text-slate-600">Customers Served Today:</span>
            <span className="text-[9px] font-black text-slate-900">0</span>
          </div>

          <div className="mt-1 space-y-0.5">
            {['Cash Sales:', 'Mobile Money (MoMo) Sales:', 'Card Sales:'].map((label) => (
              <div key={label} className="flex items-center justify-between gap-1">
                <span className="text-[6.5px] text-slate-600">{label}</span>
                <span className="text-[7px] font-bold text-slate-800 tabular-nums">GH₵ 0.00</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-1 mt-1 pt-1 border-t-2 border-slate-800">
            <span className="text-[8px] font-black text-slate-900">TOTAL SALES:</span>
            <span className="text-[9px] font-black text-emerald-600 tabular-nums">GH₵ 0.00</span>
          </div>

          <div className="flex items-center justify-between gap-1 mt-1">
            <span className="text-[6.5px] font-bold text-orange-500">Less Operational Expenses:</span>
            <span className="text-[6.5px] font-bold text-orange-500 tabular-nums">- GH₵ 0.00</span>
          </div>

          <div className="mt-1.5 rounded-lg bg-[#111827] px-2 py-1.5 flex items-center justify-between gap-1">
            <span className="text-[8.5px] font-black text-white">EXPECTED BALANCE:</span>
            <span className="text-[10px] font-black text-orange-400 tabular-nums">GH₵ 0.00</span>
          </div>
        </div>

        <div className="col-span-2 rounded-xl bg-white border border-slate-200 p-2">
          <span className="flex items-center gap-1 text-[9px] font-black text-slate-900">
            <DollarSign className="w-2.5 h-2.5 text-orange-500" /> Till Reconciliation
          </span>

          <span className="block text-[5.5px] font-black tracking-wider text-slate-500 mt-1.5 mb-0.5">
            ACTUAL CASH COUNTED IN TILL (GH₵)
          </span>
          <span className="block px-1.5 py-1.5 rounded-lg border border-slate-200 text-[9px] font-black text-slate-800">
            0
          </span>

          <span className="flex items-center justify-between gap-1 mt-1 px-1.5 py-1 rounded-lg border border-slate-200">
            <span className="text-[6px] font-bold text-slate-600">Discrepancy / Variance:</span>
            <span className="flex items-center gap-0.5 text-[6.5px] font-black text-emerald-600">
              <Check className="w-2 h-2" /> Balance Exact Match
            </span>
          </span>

          <span className="block text-[5.5px] font-black tracking-wider text-slate-500 mt-1.5 mb-0.5">
            CLOSING NOTES / DISCREPANCY EXPLANATION
          </span>
          <span className="block px-1.5 py-1 rounded-lg border border-slate-200 text-[6px] text-slate-400 leading-snug h-8">
            e.g. Till balanced. All MoMo payments confirmed by Abena.
          </span>

          <span className="flex items-center justify-center gap-1 mt-1.5 py-1.5 rounded-lg bg-orange-500 text-white text-[8px] font-black">
            <Lock className="w-2 h-2" /> [ CLOSE DAY ]
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-xl bg-white border border-slate-200 p-2 flex flex-col overflow-hidden">
        <span className="flex items-center gap-1 text-[9px] font-black text-slate-900 shrink-0">
          <Clock className="w-2.5 h-2.5 text-orange-500" /> Daily Closing Archives
        </span>

        <table className="w-full border-collapse mt-1">
          <thead>
            <tr>
              {[
                'CLOSING DATE',
                'CLOSED BY',
                'CUSTOMERS',
                'TOTAL SALES',
                'EXPENSES',
                'EXPECTED BALANCE',
                'CASH COUNTED',
                'DISCREPANCY',
              ].map((h) => (
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
            {[
              ['2026-08-12', 'E-Shop Owner', '1', 'GH₵ 50.00', 'GH₵ 0.00', 'GH₵ 50.00', 'GH₵ 50.00', 'GH₵ 0.00', 'text-emerald-600'],
              ['2026-08-09', 'E-Shop Owner', '2', 'GH₵ 100.00', 'GH₵ 0.00', 'GH₵ 100.00', 'GH₵ 50.00', 'GH₵ -50.00', 'text-rose-600'],
            ].map((row, i) => (
              <tr key={row[0]} className="border-t border-slate-100" style={{ animation: `rowIn 420ms ${i * 90}ms both` }}>
                <td className="px-1.5 py-1 text-[6.5px] font-black text-slate-800">{row[0]}</td>
                <td className="px-1.5 py-1 text-[6.5px] text-slate-600">{row[1]}</td>
                <td className="px-1.5 py-1 text-[6.5px] text-slate-600">{row[2]}</td>
                <td className="px-1.5 py-1 text-[6.5px] font-bold text-emerald-600 tabular-nums">{row[3]}</td>
                <td className="px-1.5 py-1 text-[6.5px] font-bold text-orange-500 tabular-nums">{row[4]}</td>
                <td className="px-1.5 py-1 text-[6.5px] font-bold text-slate-800 tabular-nums">{row[5]}</td>
                <td className="px-1.5 py-1 text-[6.5px] font-bold text-slate-800 tabular-nums">{row[6]}</td>
                <td className={`px-1.5 py-1 text-[6.5px] font-black tabular-nums ${row[8]}`}>{row[7]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </BarberShell>
);

/* ----------------------------- Export ------------------------------ */

export const barbershopSystem: SystemDefinition = {
  productId: 'barbershop-management',
  appName: 'E-Barber',
  appInitials: 'EB',
  url: 'ebarber.app/dashboard',
  scenes: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      caption: 'Walk-ins, completed services, revenue and net profit, filtered by any timeframe.',
      duration: 7,
      render: () => <DashboardScene />,
    },
    {
      id: 'walk-in',
      label: 'Walk-in & POS',
      caption: 'Register a walk-in at the front desk: service, barber, commission, amount and tender.',
      duration: 7,
      render: () => <WalkInScene />,
    },
    {
      id: 'orders',
      label: 'Online Orders',
      caption: 'Website bookings land here live, with appointment slot, barber and status on each.',
      duration: 7,
      render: () => <OrdersScene />,
    },
    {
      id: 'closing',
      label: 'Daily Closing',
      caption: 'Count the till, explain any variance, lock the register — and keep the archive.',
      duration: 6,
      render: () => <ClosingScene />,
    },
  ],
};
