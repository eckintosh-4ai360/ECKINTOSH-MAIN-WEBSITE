import React from 'react';
import {
  ArrowLeftRight,
  Award,
  Bell,
  Boxes,
  BookOpen,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Columns3,
  CreditCard,
  Download,
  FileInput,
  FileText,
  Globe,
  GraduationCap,
  House,
  LayoutGrid,
  LayoutTemplate,
  ListOrdered,
  Lock,
  MapPin,
  Moon,
  Newspaper,
  Plus,
  Printer,
  Receipt,
  RefreshCw,
  RotateCcw,
  School,
  Scissors,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Truck,
  UserCheck,
  UserCog,
  UserX,
  Users,
  X,
} from 'lucide-react';
import type { SystemDefinition } from '../types';

/* ------------------------------------------------------------------ *
 * EckinSpa admin console — modelled on the live beauty-school and
 * salon product. Layout, navigation and terminology follow the running
 * system; every person, reference and figure here is invented.
 * ------------------------------------------------------------------ */

type IconLike = React.ComponentType<{ className?: string }>;

const NAV_GROUPS: { title: string; icon: IconLike; rows: { label: string; icon: IconLike }[] }[] = [
  {
    title: 'SCHOOL',
    icon: School,
    rows: [
      { label: 'Admissions', icon: ClipboardList },
      { label: 'Students', icon: Users },
      { label: 'Graduates', icon: Award },
      { label: 'Programmes', icon: BookOpen },
      { label: 'Academics', icon: GraduationCap },
      { label: 'Attendance', icon: CalendarCheck },
      { label: 'Certificates', icon: UserCheck },
      { label: 'Fee structure', icon: FileText },
      { label: 'Fee register', icon: Receipt },
      { label: 'Payments', icon: CreditCard },
    ],
  },
  {
    title: 'SALON',
    icon: Sparkles,
    rows: [
      { label: 'Daily services', icon: Sparkles },
      { label: 'Revamping', icon: Scissors },
      { label: 'Appointments', icon: CalendarClock },
      { label: 'Service menu', icon: Scissors },
    ],
  },
  {
    title: 'SHOP',
    icon: ShoppingBag,
    rows: [
      { label: 'Orders', icon: ListOrdered },
      { label: 'Stock', icon: Boxes },
      { label: 'Stock movements', icon: ArrowLeftRight },
      { label: 'Suppliers', icon: Truck },
      { label: 'Purchase orders', icon: FileInput },
    ],
  },
  {
    title: 'ADMINISTRATION',
    icon: UserCog,
    rows: [
      { label: 'Finance overview', icon: TrendingUp },
      { label: 'Expenses', icon: TrendingDown },
      { label: 'Daily closing', icon: Lock },
      { label: 'Staff', icon: UserCog },
      { label: 'Workers', icon: Users },
      { label: 'Access', icon: ShieldCheck },
      { label: 'Website content', icon: Globe },
      { label: 'Website pages', icon: LayoutTemplate },
      { label: 'Blog', icon: Newspaper },
    ],
  },
];

/** The product's own chrome: dark console, teal accents, grouped rail. */
const SpaShell: React.FC<{ active: string; title: string; children: React.ReactNode }> = ({
  active,
  title,
  children,
}) => (
  <div className="flex h-full min-h-0 bg-[#0b131d] text-[10px]">
    {/* Rail */}
    <aside className="hidden sm:flex w-[124px] shrink-0 flex-col bg-[#101a26] border-r border-white/[0.06]">
      <div className="flex items-center gap-1.5 px-2 h-9 shrink-0">
        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 grid place-items-center text-[6.5px] font-black text-white shrink-0">
          ES
        </span>
        <span className="leading-none min-w-0">
          <span className="block text-[9.5px] font-black text-white truncate">EckinSpa</span>
          <span className="block text-[6px] text-slate-500">Admin console</span>
        </span>
      </div>

      <nav className="flex-1 px-1.5 overflow-hidden">
        <div
          className={`flex items-center gap-1.5 px-1.5 py-[2px] rounded-md mb-0.5 ${
            active === 'Dashboard' ? 'bg-teal-500/15 text-teal-300 font-bold' : 'text-slate-400'
          }`}
        >
          <LayoutGrid className="w-2.5 h-2.5 shrink-0" />
          <span className="text-[7.5px]">Dashboard</span>
        </div>

        {NAV_GROUPS.map((group) => {
          const GroupIcon = group.icon;
          return (
            <div key={group.title}>
              <div className="flex items-center gap-1 px-1.5 py-[1.5px]">
                <GroupIcon className="w-2 h-2 text-slate-500 shrink-0" />
                <span className="text-[5.5px] font-black tracking-[0.14em] text-slate-500">{group.title}</span>
                <ChevronDown className="w-2 h-2 text-slate-600 ml-auto shrink-0" />
              </div>
              {group.rows.map((row) => {
                const Icon = row.icon;
                const isActive = row.label === active;
                return (
                  <div
                    key={row.label}
                    className={`flex items-center gap-1.5 pl-2.5 pr-1.5 py-[1.5px] rounded-md ${
                      isActive ? 'bg-teal-500/15 text-teal-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <Icon className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate text-[7px]">{row.label}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="p-1.5 shrink-0 border-t border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-teal-400 grid place-items-center text-[6.5px] font-black text-slate-900 shrink-0">
            E
          </span>
          <span className="leading-none min-w-0">
            <span className="block text-[7px] font-bold text-white truncate">EckinSpa Owner</span>
            <span className="block text-[5.5px] text-slate-500">Super Admin</span>
          </span>
        </div>
      </div>
    </aside>

    {/* Main */}
    <div className="flex-1 min-w-0 flex flex-col">
      <header className="h-9 shrink-0 flex items-center gap-2 px-2.5 border-b border-white/[0.06]">
        <span className="text-[9.5px] font-black text-white shrink-0">{title}</span>
        <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] flex-1 max-w-[42%]">
          <Search className="w-2.5 h-2.5 text-slate-500 shrink-0" />
          <span className="text-[7px] text-slate-500 truncate">Search students, orders, products…</span>
          <span className="ml-auto px-1 rounded bg-white/[0.06] text-[5.5px] font-bold text-slate-500 shrink-0">
            Ctrl K
          </span>
        </span>
        <span className="ml-auto flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-2.5 h-2.5 text-teal-400" />
          <span className="w-4 h-4 rounded-full bg-white/[0.05] grid place-items-center">
            <Moon className="w-2 h-2 text-slate-400" />
          </span>
          <Bell className="w-2.5 h-2.5 text-slate-400" />
        </span>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden p-2">{children}</div>
    </div>
  </div>
);

/* --------------------------- Dashboard ----------------------------- */

const KPIS: { value: string; label: string; tag: string; icon: IconLike; tone: string }[] = [
  { value: '128', label: 'TOTAL STUDENTS', tag: 'ENROLLED TO DATE', icon: Users, tone: 'from-teal-400 to-cyan-500' },
  { value: '14', label: "TODAY'S ORDERS", tag: 'STOREFRONT', icon: ShoppingBag, tone: 'from-amber-400 to-orange-500' },
  { value: '6', label: 'PENDING ADMISSIONS', tag: 'AWAITING REVIEW', icon: ClipboardList, tone: 'from-fuchsia-500 to-purple-500' },
];

const SECTIONS: [string, string][] = [
  ['Students', 'Enrolment health across the school.'],
  ['Finance', 'Money in, money out, and what is still owed.'],
  ['Inventory', 'One shared stock pool.'],
  ['E-commerce', 'Storefront orders and revenue.'],
  ['Admissions', 'The application pipeline.'],
];

const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
/** [student fees, product sales, other income] in thousands of cedis. */
const INCOME: [number, number, number][] = [
  [42, 12, 4],
  [48, 15, 5],
  [61, 19, 6],
  [55, 14, 5],
  [63, 17, 7],
  [71, 21, 6],
  [68, 18, 8],
  [76, 23, 7],
  [84, 26, 9],
  [79, 22, 8],
  [91, 28, 10],
  [104, 31, 11],
];
const EXPENSES = [38, 41, 47, 44, 49, 52, 50, 55, 59, 56, 62, 68];

const RevenueChart: React.FC = () => {
  const max = 150;
  const w = 300;
  const h = 62;
  const step = w / (MONTHS.length - 1);
  const line = EXPENSES.map(
    (e, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - (e / max) * h).toFixed(1)}`
  ).join(' ');

  return (
    <div className="h-full flex gap-1">
      <div className="flex flex-col justify-between text-[5px] text-slate-500 shrink-0 pb-2.5 text-right tabular-nums">
        {['GHS 140K', 'GHS 105K', 'GHS 70K', 'GHS 35K', 'GHS 0'].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="relative flex-1 min-h-0">
          <div className="absolute inset-0 flex items-end gap-[3px]">
            {INCOME.map(([fees, product, other], i) => {
              const total = fees + product + other;
              return (
                <div key={MONTHS[i]} className="flex-1 flex flex-col justify-end h-full min-w-0">
                  <div
                    className="w-full flex flex-col justify-end rounded-t-[2px] overflow-hidden"
                    style={{
                      height: `${(total / max) * 100}%`,
                      animation: `barGrow 700ms ${i * 45}ms cubic-bezier(.2,.8,.2,1) both`,
                    }}
                  >
                    <div className="bg-purple-500" style={{ height: `${(other / total) * 100}%` }} />
                    <div className="bg-amber-400" style={{ height: `${(product / total) * 100}%` }} />
                    <div className="bg-pink-500" style={{ height: `${(fees / total) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path
              d={line}
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: 'drawLine 1.2s ease-out forwards' }}
            />
          </svg>
        </div>

        <div className="flex justify-between text-[5px] text-slate-500 shrink-0 mt-0.5">
          {MONTHS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const DashboardScene: React.FC = () => (
  <SpaShell active="Dashboard" title="Dashboard">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      {/* Hero */}
      <div className="relative rounded-xl border border-white/[0.06] overflow-hidden px-2.5 py-2 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/30 via-purple-900/20 to-transparent" />
        <div className="relative flex items-center justify-between gap-2">
          <span className="leading-none min-w-0">
            <span className="block text-[5.5px] font-black tracking-[0.16em] text-teal-400">ECKINSPA</span>
            <span className="block text-[14px] font-black text-white mt-1">Admin dashboard</span>
            <span className="block text-[6.5px] text-slate-400 mt-0.5">
              Every figure below is calculated from real transactions, not stored totals.
            </span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-400 text-slate-900 text-[7px] font-black">
              <Plus className="w-2 h-2" /> Record payment
            </span>
            <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-[7px] font-bold text-slate-300">
              More <ChevronDown className="w-1.5 h-1.5" />
            </span>
          </span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-1.5 shrink-0">
        {KPIS.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 overflow-hidden"
              style={{ animation: `rowIn 420ms ${i * 80}ms both` }}
            >
              <div className="flex items-start justify-between gap-1">
                <span className={`w-5 h-5 rounded-lg bg-gradient-to-br ${kpi.tone} grid place-items-center shrink-0`}>
                  <Icon className="w-2.5 h-2.5 text-white" />
                </span>
                <span className="text-[5px] font-black tracking-wider text-slate-500">{kpi.tag}</span>
              </div>
              <div className="text-[19px] font-black text-white leading-none mt-1.5 tabular-nums">{kpi.value}</div>
              <div className="text-[6px] font-bold tracking-wider text-slate-400 mt-1">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Collapsible summaries */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 shrink-0">
        {SECTIONS.map(([title, sub], i) => (
          <div
            key={title}
            className={`flex items-center gap-1.5 py-1 ${i === 4 ? 'col-span-2' : ''}`}
            style={{ animation: `rowIn 400ms ${i * 60}ms both` }}
          >
            <span className="w-[2px] h-5 rounded-full bg-teal-400 shrink-0" />
            <span className="leading-none min-w-0">
              <span className="block text-[8px] font-black text-white">{title}</span>
              <span className="block text-[6px] text-slate-500 truncate">{sub}</span>
            </span>
            <ChevronDown className="w-2 h-2 text-slate-600 ml-auto shrink-0" />
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="flex-1 min-h-0 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 flex flex-col">
        <div className="flex items-start justify-between gap-2 shrink-0">
          <span className="leading-none">
            <span className="block text-[9.5px] font-black text-white">Revenue and expenses</span>
            <span className="block text-[6px] text-slate-500 mt-0.5">
              Monthly, in cedis. Income streams stack; spend is the line.
            </span>
          </span>
          <span className="px-1.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[6.5px] font-bold text-slate-400 shrink-0">
            Show table
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1 shrink-0 text-[5.5px] text-slate-400">
          {[
            ['Student fees', 'bg-pink-500'],
            ['Product sales', 'bg-amber-400'],
            ['Other income', 'bg-purple-500'],
            ['Expenses', 'bg-teal-400'],
          ].map(([label, tone]) => (
            <span key={label} className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${tone}`} /> {label}
            </span>
          ))}
        </div>

        <div className="flex-1 min-h-0 mt-1 flex flex-col">
          <RevenueChart />
        </div>
      </div>
    </div>
  </SpaShell>
);

/* -------------------------- Attendance ----------------------------- */

const REGISTER: [string, string, string][] = [
  ['Adjoa Fenuku', 'STU-2026-K4P7ZR', 'Professional Makeup (Beginner)'],
  ['Akosua Birago', 'STU-2026-M9TQ2C', 'Basic Cosmetology Course'],
  ['Naa Odarkor Lamptey', 'STU-2026-B3XW8L', 'Ultimate Full Cosmetology Course'],
  ['Esinam Dzakpasu', 'STU-2026-R6HV5N', 'Professional Makeup (Beginner)'],
  ['Maame Efua Sarpong', 'STU-2026-T8YJ4D', 'Ultimate Full Cosmetology Course'],
  ['Hawa Seidu', 'STU-2026-P2ZL9F', 'Mini Full Cosmetology Course'],
  ['Serwaa Nyamekye', 'STU-2026-G7CK3V', 'Basic Cosmetology Course'],
];

const AttendanceScene: React.FC = () => (
  <SpaShell active="Attendance" title="Attendance">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="shrink-0">
        <span className="block text-[13px] font-black text-white">Attendance register</span>
        <span className="block text-[6.5px] text-slate-400 mt-0.5">
          The whole school, marked present to begin with. Change the ones who are not, then save. Narrow to a single
          programme if you would rather take one class at a time.
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 shrink-0 flex gap-2">
        <span className="flex-1 min-w-0">
          <span className="block text-[7px] font-bold text-slate-300 mb-0.5">Programme</span>
          <span className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="text-[7.5px] text-white truncate">Everyone in the school</span>
            <ChevronDown className="w-2 h-2 text-slate-500 shrink-0" />
          </span>
        </span>
        <span className="w-28 shrink-0">
          <span className="block text-[7px] font-bold text-slate-300 mb-0.5">Date</span>
          <span className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="text-[7.5px] text-white">09/16/2026</span>
            <CalendarDays className="w-2 h-2 text-slate-500 shrink-0" />
          </span>
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {[
          ['124 Present', 'bg-teal-500/15 text-teal-300 border-teal-500/25'],
          ['3 Late', 'bg-white/[0.04] text-slate-400 border-white/10'],
          ['1 Absent', 'bg-white/[0.04] text-slate-400 border-white/10'],
          ['0 Excused', 'bg-white/[0.04] text-slate-400 border-white/10'],
        ].map(([label, tone]) => (
          <span key={label} className={`px-1.5 py-1 rounded-lg border text-[6.5px] font-bold ${tone}`}>
            {label}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-1 shrink-0">
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[6.5px] font-bold text-slate-300">
            <Download className="w-2 h-2" /> Export day <ChevronDown className="w-1.5 h-1.5" />
          </span>
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[6.5px] font-bold text-slate-300">
            <Check className="w-2 h-2 text-teal-400" /> Mark all present
          </span>
        </span>
      </div>

      <div className="flex-1 min-h-0 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1.5 flex flex-col gap-1 overflow-hidden">
        {REGISTER.map(([name, id, programme], i) => (
          <div
            key={id}
            className="flex items-center gap-2 px-1.5 py-1 rounded-lg border border-white/[0.05]"
            style={{ animation: `rowIn 400ms ${i * 60}ms both` }}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[8px] font-black text-white truncate">{name}</span>
              <span className="block text-[6px] text-slate-500 truncate">
                {id} · {programme}
              </span>
            </span>
            <span className="px-1.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.07] text-[6px] text-slate-500 w-20 shrink-0">
              Note (optional)
            </span>
            <span className="flex items-center gap-1 shrink-0">
              {['Present', 'Late', 'Absent', 'Excused'].map((state) => (
                <span
                  key={state}
                  className={`px-1.5 py-[2px] rounded-md text-[6px] font-bold ${
                    state === 'Present'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'text-slate-500'
                  }`}
                >
                  {state}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  </SpaShell>
);

/* --------------------------- Payments ------------------------------ */

const PAYMENTS: [string, string, string, string][] = [
  ['PAY-2026-X7K2QD', 'Adjoa Fenuku', 'STU-2026-K4P7ZR', 'GHS 5,100.00'],
  ['PAY-2026-L3M8WV', 'Akosua Birago', 'STU-2026-M9TQ2C', 'GHS 13,100.00'],
  ['PAY-2026-B9R4TN', 'Naa Odarkor Lamptey', 'STU-2026-B3XW8L', 'GHS 4,500.00'],
  ['PAY-2026-C5H6PZ', 'Esinam Dzakpasu', 'STU-2026-R6HV5N', 'GHS 4,500.00'],
  ['PAY-2026-V2J9SF', 'Maame Efua Sarpong', 'STU-2026-T8YJ4D', 'GHS 8,000.00'],
  ['PAY-2026-D8N3KY', 'Hawa Seidu', 'STU-2026-P2ZL9F', 'GHS 1,500.00'],
  ['PAY-2026-Q6T5XB', 'Serwaa Nyamekye', 'STU-2026-G7CK3V', 'GHS 3,000.00'],
  ['PAY-2026-F4W7LC', 'Yaa Pokuaa Danso', 'STU-2026-N5QD8H', 'GHS 2,000.00'],
  ['PAY-2026-Z1G3MR', 'Abena Konadu', 'STU-2026-W2FR6J', 'GHS 3,000.00'],
  ['PAY-2026-H9P2VT', 'Dzifa Agbeko', 'STU-2026-S4LM7K', 'GHS 2,100.00'],
  ['PAY-2026-K2B6DW', 'Mansa Aidoo', 'STU-2026-V8HT3P', 'GHS 6,750.00'],
  ['PAY-2026-R7X4NQ', 'Elikplim Ahiable', 'STU-2026-C3YB9M', 'GHS 1,800.00'],
  ['PAY-2026-T5C8JL', 'Adwoa Frimpomaa', 'STU-2026-J6WK4T', 'GHS 9,400.00'],
];

const PaymentsScene: React.FC = () => (
  <SpaShell active="Payments" title="Payments">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="flex items-start justify-between gap-2 shrink-0">
        <span className="leading-none">
          <span className="block text-[13px] font-black text-white">Payments</span>
          <span className="block text-[6.5px] text-slate-400 mt-0.5">
            Every payment received, with the charges it settled.
          </span>
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-400 text-slate-900 text-[7px] font-black shrink-0">
          <Plus className="w-2 h-2" /> Record payment
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <span className="flex items-center gap-1.5 px-1.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 flex-1">
          <Search className="w-2 h-2 text-slate-500" />
          <span className="text-[6.5px] text-slate-500">Search by reference, transaction or student…</span>
        </span>
        {[
          ['All methods', ChevronDown],
          ['Columns', Columns3],
          ['Export', Download],
        ].map(([label, Icon]) => {
          const I = Icon as IconLike;
          return (
            <span
              key={label as string}
              className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[6.5px] font-bold text-slate-300 shrink-0"
            >
              {label === 'All methods' ? (
                <>
                  {label} <I className="w-1.5 h-1.5" />
                </>
              ) : (
                <>
                  <I className="w-2 h-2" /> {label}
                </>
              )}
            </span>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/[0.03]">
              {['Reference', 'Student', 'Amount', 'Method', 'Status', 'Paid', ''].map((h, i) => (
                <th
                  key={h || i}
                  className={`px-1.5 py-1 text-[6px] font-bold text-slate-400 whitespace-nowrap ${
                    h === 'Amount' ? 'text-right' : 'text-left'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map(([ref, name, id, amount], i) => (
              <tr
                key={ref}
                className="border-t border-white/[0.04]"
                style={{ animation: `rowIn 400ms ${i * 50}ms both` }}
              >
                <td className="px-1.5 py-1 text-[6.5px] font-mono text-slate-300">{ref}</td>
                <td className="px-1.5 py-1">
                  <span className="block text-[7.5px] font-bold text-white">{name}</span>
                  <span className="block text-[5.5px] text-slate-500 font-mono">{id}</span>
                </td>
                <td className="px-1.5 py-1 text-[7.5px] font-black text-white text-right tabular-nums">{amount}</td>
                <td className="px-1.5 py-1 text-[6.5px] text-slate-400">Cash</td>
                <td className="px-1.5 py-1">
                  <span className="px-1.5 py-[1px] rounded-md bg-teal-500/15 text-teal-300 text-[6px] font-bold">
                    Completed
                  </span>
                </td>
                <td className="px-1.5 py-1 text-[6.5px] text-slate-400 tabular-nums">09/09/2026</td>
                <td className="px-1.5 py-1">
                  <span className="flex items-center gap-1.5 justify-end">
                    <span className="flex items-center gap-0.5 text-[6px] font-bold text-slate-400">
                      <Printer className="w-1.5 h-1.5" /> Receipt
                    </span>
                    <span className="flex items-center gap-0.5 text-[6px] font-bold text-slate-400">
                      <RotateCcw className="w-1.5 h-1.5" /> Refund
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </SpaShell>
);

/* ------------------------- Appointments ---------------------------- */

const APPT_STATS: { value: string; label: string; icon: IconLike; tone: string }[] = [
  { value: '3', label: 'Awaiting confirmation', icon: Bell, tone: 'bg-rose-500/15 text-rose-400' },
  { value: '47', label: 'September 2026 bookings', icon: CalendarDays, tone: 'bg-teal-500/15 text-teal-300' },
  { value: '38', label: 'Salon appointments', icon: Scissors, tone: 'bg-purple-500/15 text-purple-300' },
  { value: '9', label: 'Home services', icon: House, tone: 'bg-amber-500/15 text-amber-300' },
];

const AGENDA: [string, string, string, string, string][] = [
  ['9:30 AM', 'GEL MANICURE', 'Ama Gyasi', 'Salon · 45 minutes · 024✱✱✱118', 'Confirmed'],
  ['11:00 AM', 'BRIDAL MAKEUP TRIAL', 'Selorm Attipoe', 'Salon · 90 minutes · 055✱✱✱402', 'Confirmed'],
  ['2:15 PM', 'SILK PRESS & TRIM', 'Nana Ama Brefo', 'Home service · 75 minutes · 020✱✱✱733', 'Awaiting'],
  ['6:00 PM', 'LASH EXTENSION', 'Afia Owusu-Ansah', 'Salon · 60 minutes · 027✱✱✱905', 'Confirmed'],
];

const AppointmentsScene: React.FC = () => (
  <SpaShell active="Appointments" title="Appointments">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="relative rounded-xl border border-white/[0.06] overflow-hidden px-2.5 py-2 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/25 via-purple-900/15 to-transparent" />
        <div className="relative flex items-center justify-between gap-2">
          <span className="leading-none min-w-0">
            <span className="block text-[5.5px] font-black tracking-[0.16em] text-teal-400">SALON SCHEDULE</span>
            <span className="block text-[13px] font-black text-white mt-1">Appointments</span>
            <span className="block text-[6.5px] text-slate-400 mt-0.5">
              See every salon and home-service booking by day, confirm or cancel website requests, and plan the team
              around what is coming up.
            </span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-400 text-slate-900 text-[7px] font-black">
              <Plus className="w-2 h-2" /> New appointment
            </span>
            <span className="px-1.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-[7px] font-bold text-slate-300">
              Today
            </span>
            <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-[7px] font-bold text-slate-300">
              <RefreshCw className="w-1.5 h-1.5" /> Refresh
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        {APPT_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-1.5 py-1.5"
              style={{ animation: `rowIn 400ms ${i * 70}ms both` }}
            >
              <span className={`w-5 h-5 rounded-lg grid place-items-center shrink-0 ${stat.tone}`}>
                <Icon className="w-2.5 h-2.5" />
              </span>
              <span className="leading-none min-w-0">
                <span className="block text-[13px] font-black text-white tabular-nums">{stat.value}</span>
                <span className="block text-[5.5px] text-slate-500 truncate">{stat.label}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 shrink-0">
        <span className="leading-none">
          <span className="block text-[7.5px] font-black text-white">Filter the calendar</span>
          <span className="block text-[6px] text-slate-500">Choose which service locations appear on the calendar.</span>
        </span>
        <span className="flex items-center gap-1 shrink-0">
          {['All services', 'Salon', 'Home service'].map((chip, i) => (
            <span
              key={chip}
              className={`px-1.5 py-1 rounded-full text-[6.5px] font-bold ${
                i === 0 ? 'bg-teal-400 text-slate-900' : 'bg-white/[0.05] border border-white/10 text-slate-300'
              }`}
            >
              {chip}
            </span>
          ))}
        </span>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-1.5">
        {/* Month view */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 flex flex-col min-h-0">
          <div className="flex items-start justify-between gap-2 shrink-0">
            <span className="leading-none">
              <span className="block text-[5.5px] font-black tracking-[0.14em] text-slate-500">MONTH VIEW</span>
              <span className="block text-[10px] font-black text-white mt-0.5">September 2026</span>
            </span>
            <span className="text-[6px] text-slate-500 shrink-0">47 bookings</span>
          </div>

          <div className="flex-1 min-h-0 mt-1.5 rounded-lg bg-[#0d1620] border border-white/[0.05] p-1.5 flex flex-col">
            <div className="flex items-center justify-between px-1 shrink-0">
              <ChevronLeft className="w-2 h-2 text-slate-500" />
              <span className="text-[7px] font-bold text-white">September 2026</span>
              <ChevronRight className="w-2 h-2 text-slate-500" />
            </div>
            <div className="grid grid-cols-7 gap-[1px] mt-1 text-center shrink-0">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="text-[5.5px] text-slate-500 font-bold">
                  {d}
                </span>
              ))}
            </div>
            <div className="flex-1 min-h-0 grid grid-cols-7 grid-rows-5 gap-[1px] mt-0.5">
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 1;
                const valid = day >= 1 && day <= 30;
                const isToday = day === 16;
                const busy = [3, 8, 11, 16, 19, 22, 25, 29].includes(day);
                return (
                  <span
                    key={i}
                    className={`grid place-items-center rounded text-[6px] ${
                      isToday
                        ? 'bg-teal-400 text-slate-900 font-black'
                        : busy
                          ? 'bg-teal-500/10 text-teal-300 font-bold'
                          : 'text-slate-500'
                    }`}
                  >
                    {valid ? day : ''}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Daily agenda */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 flex flex-col min-h-0">
          <div className="flex items-start justify-between gap-2 shrink-0">
            <span className="leading-none min-w-0">
              <span className="block text-[5.5px] font-black tracking-[0.14em] text-slate-500">DAILY AGENDA</span>
              <span className="block text-[10px] font-black text-white mt-0.5 truncate">
                Wednesday, September 16, 2026
              </span>
            </span>
            <span className="px-1.5 py-[1px] rounded-full bg-teal-500/15 text-teal-300 text-[5.5px] font-black shrink-0">
              4 appointments
            </span>
          </div>

          <div className="flex-1 min-h-0 mt-1.5 flex flex-col gap-1 overflow-hidden">
            {AGENDA.map(([time, service, client, meta, status], i) => (
              <div
                key={time}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-1.5 py-1"
                style={{ animation: `rowIn 420ms ${i * 80}ms both` }}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="flex items-center gap-1 min-w-0">
                    <span className="w-4 h-4 rounded-full bg-white/[0.05] grid place-items-center shrink-0">
                      <Clock className="w-2 h-2 text-slate-400" />
                    </span>
                    <span className="text-[7.5px] font-black text-white truncate">
                      {time} · {service}
                    </span>
                  </span>
                  <span
                    className={`px-1.5 py-[1px] rounded-md text-[5.5px] font-black shrink-0 ${
                      status === 'Confirmed'
                        ? 'bg-teal-500/15 text-teal-300'
                        : 'bg-amber-500/15 text-amber-300'
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <div className="text-[7px] font-bold text-slate-300 mt-0.5 pl-5">{client}</div>
                <div className="flex items-center gap-1 text-[5.5px] text-slate-500 mt-0.5 pl-5">
                  <MapPin className="w-1.5 h-1.5" /> {meta}
                </div>
                {i === 3 && (
                  <div className="flex items-center gap-1 mt-1 pl-5">
                    <span className="flex items-center gap-0.5 px-1.5 py-[2px] rounded-md bg-teal-400 text-slate-900 text-[5.5px] font-black">
                      <CalendarCheck className="w-1.5 h-1.5" /> Completed
                    </span>
                    <span className="flex items-center gap-0.5 px-1.5 py-[2px] rounded-md bg-white/[0.05] border border-white/10 text-[5.5px] font-bold text-slate-300">
                      <UserX className="w-1.5 h-1.5" /> No-show
                    </span>
                    <span className="flex items-center gap-0.5 px-1.5 py-[2px] rounded-md text-[5.5px] font-bold text-rose-400">
                      <X className="w-1.5 h-1.5" /> Cancel booking
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </SpaShell>
);

/* ----------------------------- Export ------------------------------ */

export const beautySystem: SystemDefinition = {
  productId: 'beauty-management',
  appName: 'EckinSpa',
  appInitials: 'ES',
  url: 'eckinspa.app/admin/dashboard',
  scenes: [
    {
      id: 'dashboard',
      label: 'Admin Dashboard',
      caption: 'School, salon and shop in one console — every figure recalculated from real transactions.',
      duration: 7,
      render: () => <DashboardScene />,
    },
    {
      id: 'appointments',
      label: 'Appointments',
      caption: 'Salon and home-service bookings by day, with website requests confirmed or cancelled here.',
      duration: 7,
      render: () => <AppointmentsScene />,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      caption: 'The whole school marked present to begin with — change the exceptions and save.',
      duration: 6,
      render: () => <AttendanceScene />,
    },
    {
      id: 'payments',
      label: 'Payments',
      caption: 'Every payment received, the charges it settled, and a receipt or refund a click away.',
      duration: 6,
      render: () => <PaymentsScene />,
    },
  ],
};
