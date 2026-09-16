import React from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  BookOpen,
  Calculator,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  CreditCard,
  ExternalLink,
  FileText,
  Filter,
  GraduationCap,
  Home,
  ListChecks,
  LogOut,
  Maximize,
  Medal,
  MessageCircle,
  MessageSquare,
  Notebook,
  Pencil,
  Plus,
  Printer,
  Receipt,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Trash2,
  Trophy,
  UserPlus,
  Users,
  Wrench,
} from 'lucide-react';
import type { SystemDefinition } from '../types';

/* ------------------------------------------------------------------ *
 * Eckintosh SMS — modelled on the live product interface.
 *
 * Layout, navigation, terminology and figures follow the running
 * system. Pupil names and IDs in the fee register are fictional: real
 * children's names and arrears must not appear on a public site.
 * ------------------------------------------------------------------ */

type IconLike = React.ComponentType<{ className?: string }>;

interface NavEntry {
  label: string;
  icon: IconLike;
  children?: string[];
}

const NAV: NavEntry[] = [
  { label: 'Dashboard', icon: Home },
  { label: 'User Management', icon: Users },
  { label: 'HR Modules', icon: ClipboardList },
  { label: 'Academics', icon: GraduationCap },
  { label: 'Assessments', icon: FileText },
  { label: 'Analytics', icon: BarChartIcon },
  { label: 'Attendance', icon: CalendarDays },
  { label: 'Behaviour', icon: Medal },
  { label: 'Communication', icon: MessageSquare },
  { label: 'Finance', icon: CreditCard },
  { label: 'Utilities', icon: Wrench },
  { label: 'Settings', icon: Settings },
  { label: 'System', icon: ShieldCheck },
];

function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M3 3v18h18" strokeLinecap="round" />
      <rect x="7" y="11" width="3" height="6" rx="1" fill="currentColor" stroke="none" />
      <rect x="12" y="7" width="3" height="10" rx="1" fill="currentColor" stroke="none" />
      <rect x="17" y="13" width="3" height="4" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The product's own chrome: white rail, search bar, utility icons, account chip. */
const SmsShell: React.FC<{
  active: string;
  expanded?: { parent: string; items: string[] };
  children: React.ReactNode;
}> = ({ active, expanded, children }) => (
  <div className="flex h-full min-h-0 bg-[#F6F8FB] text-[10px]">
    {/* Sidebar */}
    <aside className="hidden sm:flex w-[132px] shrink-0 flex-col bg-white border-r border-slate-200">
      <div className="flex items-center gap-1.5 px-2.5 h-9 shrink-0">
        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 grid place-items-center shrink-0">
          <span className="w-2 h-2 rounded-full border-[1.5px] border-white" />
        </span>
        <span className="leading-none min-w-0">
          <span className="block text-[10px] font-black text-blue-600">ES</span>
          <span className="block text-[6px] tracking-[0.12em] text-slate-400 font-semibold truncate">
            ECKINTOSH SMS
          </span>
        </span>
      </div>

      <nav className="flex-1 px-1.5 py-1 space-y-[1px] overflow-hidden">
        {NAV.map((entry) => {
          const Icon = entry.icon;
          const isOpen = expanded?.parent === entry.label;
          const isActive = entry.label === active;
          return (
            <React.Fragment key={entry.label}>
              <div
                className={`flex items-center gap-1.5 px-1.5 py-[3.5px] rounded-md ${
                  isActive ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-600'
                }`}
              >
                <Icon className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate text-[8px]">{entry.label}</span>
                {isOpen ? (
                  <ChevronDown className="w-2 h-2 ml-auto shrink-0 text-slate-400" />
                ) : (
                  <ChevronRight className={`w-2 h-2 ml-auto shrink-0 ${isActive ? 'text-white/70' : 'text-slate-300'}`} />
                )}
              </div>

              {isOpen &&
                expanded.items.map((child) => (
                  <div
                    key={child}
                    className={`flex items-center gap-1.5 pl-5 pr-1.5 py-[3px] rounded-md ${
                      child === active ? 'bg-blue-600 text-white font-semibold' : 'text-slate-500'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-[2px] shrink-0 ${
                        child === active ? 'bg-white/80' : 'bg-slate-300'
                      }`}
                    />
                    <span className="truncate text-[7.5px]">{child}</span>
                  </div>
                ))}
            </React.Fragment>
          );
        })}
      </nav>

      <div className="p-1.5 shrink-0 space-y-1">
        <div className="rounded-md border border-slate-200 px-1.5 py-1">
          <div className="text-[7.5px] font-bold text-slate-800 leading-none">Super Admin</div>
          <div className="text-[6.5px] text-slate-400 leading-none mt-0.5">Admin</div>
        </div>
        <div className="rounded-md bg-gradient-to-r from-rose-500 to-red-500 text-white flex items-center justify-center gap-1 py-1">
          <LogOut className="w-2 h-2" />
          <span className="text-[7.5px] font-bold">Logout</span>
        </div>
      </div>
    </aside>

    {/* Main column */}
    <div className="flex-1 min-w-0 flex flex-col">
      <header className="h-9 shrink-0 flex items-center gap-2 px-2.5 bg-white border-b border-slate-100">
        <span className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-slate-200 bg-white w-40 max-w-[40%]">
          <Search className="w-2.5 h-2.5 text-slate-400 shrink-0" />
          <span className="text-[8px] text-slate-400">Search…</span>
        </span>

        <span className="ml-auto flex items-center gap-1.5 shrink-0">
          {[ExternalLink, Maximize].map((Icon, i) => (
            <span key={i} className="w-4 h-4 rounded-md border border-slate-200 grid place-items-center">
              <Icon className="w-2 h-2 text-slate-500" />
            </span>
          ))}
          <Sun className="w-2.5 h-2.5 text-amber-500" />
          <Bell className="w-2.5 h-2.5 text-slate-500" />
          <span className="flex items-center gap-1 pl-1">
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 grid place-items-center text-[7px] font-black text-white">
              S
            </span>
            <span className="leading-none hidden md:block">
              <span className="block text-[8px] font-bold text-slate-800">Super Admin</span>
              <span className="block text-[6.5px] text-slate-400">Admin</span>
            </span>
            <ChevronDown className="w-2 h-2 text-slate-400" />
          </span>
        </span>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden p-2">{children}</div>
    </div>
  </div>
);

/* ---------------------------- Dashboard ---------------------------- */

const STAT_CARDS = [
  { tag: 'ENROLLMENT', tagTone: 'bg-blue-50 text-blue-600', label: 'TOTAL STUDENTS', value: '158', caption: 'Active enrollments', icon: GraduationCap, iconTone: 'bg-blue-50 text-blue-500' },
  { tag: 'PEOPLE', tagTone: 'bg-emerald-50 text-emerald-600', label: 'TOTAL STAFF', value: '24', caption: 'Teaching and admin teams', icon: Users, iconTone: 'bg-emerald-50 text-emerald-500' },
  { tag: 'GUARDIANS', tagTone: 'bg-violet-50 text-violet-600', label: 'TOTAL PARENTS', value: '201', caption: 'Registered parents', icon: UserPlus, iconTone: 'bg-violet-50 text-violet-500' },
  { tag: '30 DAYS', tagTone: 'bg-amber-50 text-amber-600', label: 'ATTENDANCE RATE', value: '94.6%', caption: 'Present this week', icon: ListChecks, iconTone: 'bg-amber-50 text-amber-500' },
];

const ENROLMENT = [
  { label: 'CRECHE', value: 0, from: '#94a3b8', to: '#cbd5e1' },
  { label: 'NURSERY 1', value: 0, from: '#94a3b8', to: '#cbd5e1' },
  { label: 'NURSERY 2', value: 0, from: '#94a3b8', to: '#cbd5e1' },
  { label: 'KG 1 A', value: 1, from: '#f59e0b', to: '#fbbf24' },
  { label: 'KG 2 A', value: 31, from: '#10b981', to: '#5eead4' },
  { label: 'Basic 1 A', value: 23, from: '#8b5cf6', to: '#c4b5fd' },
  { label: 'Basic 2 A', value: 28, from: '#ef4444', to: '#fca5a5' },
  { label: 'Basic 3 A', value: 13, from: '#38bdf8', to: '#a5f3fc' },
  { label: 'Basic 4 A', value: 12, from: '#f97316', to: '#fdba74' },
  { label: 'Basic 5 A', value: 14, from: '#d946ef', to: '#f0abfc' },
  { label: 'Basic 6 A', value: 13, from: '#6366f1', to: '#a5b4fc' },
  { label: 'JHS 1 A', value: 12, from: '#14b8a6', to: '#99f6e4' },
  { label: 'JHS 2 A', value: 4, from: '#f43f5e', to: '#fda4af' },
  { label: 'JHS 3 A', value: 7, from: '#a855f7', to: '#d8b4fe' },
];

const GenderDonut: React.FC = () => {
  const male = 77;
  const female = 81;
  const total = male + female;
  const r = 30;
  const c = 2 * Math.PI * r;
  const maleLen = (male / total) * c;

  return (
    <div className="relative grid place-items-center shrink-0" style={{ width: 82, height: 82 }}>
      <svg width={82} height={82} className="-rotate-90">
        <circle cx={41} cy={41} r={r} fill="none" stroke="#ec4899" strokeWidth="15" />
        <circle
          cx={41}
          cy={41}
          r={r}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="15"
          strokeDasharray={`${maleLen} ${c - maleLen}`}
          style={{ animation: 'drawLine 1.1s ease-out' }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-center leading-none">
        <span>
          <span className="block text-[13px] font-black text-slate-900">{total}</span>
          <span className="block text-[7px] text-slate-400 mt-0.5">Total</span>
        </span>
      </span>
    </div>
  );
};

const DashboardScene: React.FC = () => (
  <SmsShell active="Dashboard">
    <div className="h-full grid grid-rows-[auto_auto_1fr] gap-2 min-h-0">
      {/* Greeting banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#4f6ff0] via-[#6d5ef0] to-[#8b5cf6] px-3 py-2.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[15px] font-black text-white leading-tight">Hello Super Admin</div>
          <div className="text-[8px] text-white/80 mt-0.5">You are logged in as an Administrator</div>
          <div className="text-[8px] text-white/80">Here&apos;s what&apos;s happening in your school today.</div>
          <div className="flex gap-1.5 mt-1.5">
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/15 text-[7.5px] text-white font-semibold">
              <CalendarDays className="w-2 h-2" /> Sep 16, 2026
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/15 text-[7.5px] text-white font-semibold">
              <Clock className="w-2 h-2" /> Academic Year 2026-2027
            </span>
          </div>
        </div>
        <span className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white text-[8.5px] font-bold text-blue-600 shrink-0">
          <RefreshCw className="w-2.5 h-2.5" /> Refresh
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
        {STAT_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl bg-white border border-slate-200/80 p-2 flex flex-col"
              style={{ animation: `rowIn 420ms ${i * 70}ms both` }}
            >
              <div className="flex items-start justify-between gap-1">
                <span className={`px-1.5 py-[1px] rounded-md text-[6.5px] font-black tracking-wider ${card.tagTone}`}>
                  {card.tag}
                </span>
                <span className={`w-5 h-5 rounded-lg grid place-items-center shrink-0 ${card.iconTone}`}>
                  <Icon className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="text-[7px] font-bold tracking-[0.1em] text-slate-500 mt-1.5">{card.label}</div>
              <div className="text-[19px] font-black text-slate-900 leading-none mt-0.5 tabular-nums">{card.value}</div>
              <div className="flex items-center justify-between gap-1 mt-auto pt-1.5">
                <span className="text-[6.5px] text-slate-400 truncate">{card.caption}</span>
                <span className="w-3.5 h-3.5 rounded-full border border-slate-200 grid place-items-center shrink-0">
                  <ArrowUpRight className="w-2 h-2 text-slate-400" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1.5 min-h-0">
        <div className="rounded-xl bg-white border border-slate-200/80 flex flex-col min-h-0">
          <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-slate-100">
            <BarChartIcon className="w-2.5 h-2.5 text-blue-500" />
            <span className="text-[9.5px] font-bold text-slate-800">Students by Gender</span>
          </div>
          <div className="flex-1 min-h-0 grid place-items-center py-1">
            <GenderDonut />
          </div>
          <div className="grid grid-cols-2 px-3 pb-2 gap-2">
            <span>
              <span className="block text-[7px] font-bold text-slate-600">Male</span>
              <span className="block text-[12px] font-black text-blue-600 tabular-nums">77</span>
            </span>
            <span>
              <span className="block text-[7px] font-bold text-slate-600">Female</span>
              <span className="block text-[12px] font-black text-pink-500 tabular-nums">81</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl bg-white border border-slate-200/80 flex flex-col min-h-0">
          <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-slate-100">
            <BarChartIcon className="w-2.5 h-2.5 text-blue-500" />
            <span className="text-[9.5px] font-bold text-slate-800">Enrollment Breakdown</span>
          </div>

          <div className="flex-1 min-h-0 flex gap-1 px-2 pt-2 pb-1">
            <div className="flex flex-col justify-between text-[6px] text-slate-400 shrink-0 pb-3 tabular-nums">
              {[32, 24, 16, 8, 0].map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
            <div className="flex-1 flex items-end gap-[3px] min-w-0">
              {ENROLMENT.map((bar, i) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
                  <span className="text-[6px] font-bold text-slate-500 tabular-nums leading-none mb-0.5">
                    {bar.value}
                  </span>
                  <div
                    className="w-full rounded-t-[2px]"
                    style={{
                      height: `${(bar.value / 32) * 100}%`,
                      minHeight: bar.value === 0 ? 1 : 2,
                      background: `linear-gradient(to top, ${bar.from}, ${bar.to})`,
                      animation: `barGrow 700ms ${i * 45}ms cubic-bezier(.2,.8,.2,1) both`,
                    }}
                  />
                  <span className="text-[5px] text-slate-400 mt-0.5 origin-center -rotate-45 whitespace-nowrap h-3">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 px-2 pb-1.5 pt-1 border-t border-slate-100 text-[6.5px]">
            <span className="text-slate-400">
              Total Classes <b className="text-slate-700">14</b>
            </span>
            <span className="text-slate-400">
              Total Enrolled <b className="text-slate-700">158</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  </SmsShell>
);

/* ------------------------------ Fees ------------------------------- */

const FEE_TABS: { label: string; icon: IconLike; tone: string; active?: boolean }[] = [
  { label: 'FEES', icon: CreditCard, tone: 'bg-blue-50 text-blue-600', active: true },
  { label: 'CHECK STATEMENT', icon: FileText, tone: 'bg-emerald-50 text-emerald-600' },
  { label: 'PREPARE BILL', icon: ClipboardList, tone: 'bg-amber-50 text-amber-600' },
  { label: 'ADMISSION', icon: UserPlus, tone: 'bg-violet-50 text-violet-600' },
  { label: 'PAYMENT LIST', icon: Receipt, tone: 'bg-orange-50 text-orange-600' },
  { label: 'GENERATE BILL', icon: Printer, tone: 'bg-rose-50 text-rose-600' },
  { label: 'FEES ARREARS', icon: AlertTriangle, tone: 'bg-lime-50 text-lime-600' },
];

const FEE_ROWS = [
  ['HSPS0926202', 'ADWOA BEKOE', 'BASIC 4', 'Basic 4 A', '2099.93', '1000.00', '1099.93'],
  ['HSPS0926078', 'KWABENA ANTWI', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
  ['HSPS0926032', 'AKUA DARKO', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
  ['HSPS0926004', 'YAW OFOSU', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
  ['HSPS0926117', 'ABENA NYARKO', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
  ['HSPS0926145', 'KOJO BADU', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
  ['HSPS0926088', 'EFUA MENSAH', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
  ['HSPS0926063', 'KWESI AMPOFO', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
  ['HSPS0926129', 'AMA TETTEH', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
  ['HSPS0926051', 'NANA AKOTO', 'BASIC 4', 'Basic 4 A', '2099.93', '0.00', '2099.93'],
];

const FeesScene: React.FC = () => (
  <SmsShell active="Finance">
    <div className="h-full grid grid-rows-[auto_auto_auto_1fr] gap-1.5 min-h-0">
      {/* Module tabs */}
      <div className="flex gap-1 overflow-hidden">
        {FEE_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <span
              key={tab.label}
              className={`flex items-center gap-1 px-1.5 py-1 rounded-full border whitespace-nowrap ${
                tab.active ? 'bg-blue-50/70 border-blue-200' : 'bg-white border-slate-200'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-md grid place-items-center shrink-0 ${tab.tone}`}>
                <Icon className="w-2 h-2" />
              </span>
              <span className={`text-[6.5px] font-bold ${tab.active ? 'text-blue-700' : 'text-slate-600'}`}>
                {tab.label}
              </span>
            </span>
          );
        })}
      </div>

      {/* Finance desk summary */}
      <div className="rounded-xl bg-white border border-slate-200/80 px-2 py-1.5 flex items-center gap-1.5 flex-wrap">
        <span className="w-6 h-6 rounded-lg bg-blue-50 grid place-items-center shrink-0">
          <CreditCard className="w-3 h-3 text-blue-600" />
        </span>
        <span className="leading-none mr-1">
          <span className="block text-[6px] font-black tracking-[0.12em] text-slate-400">FINANCE DESK</span>
          <span className="block text-[11px] font-black text-slate-900">Student Fees</span>
        </span>
        {['Term One', '2026 – 2027', '12 records'].map((chip) => (
          <span key={chip} className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[7px] font-semibold text-slate-600">
            {chip}
          </span>
        ))}
        <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[7.5px] font-bold text-slate-700">
          FEES <span className="text-slate-900">GH₵ 25,199.16</span>
        </span>
        <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[7.5px] font-bold text-emerald-700">
          PAID <span>GH₵ 1,000.00</span>
        </span>
        <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-[7.5px] font-bold text-orange-700">
          ARREARS <span>GH₵ 24,199.16</span>
        </span>
        <span className="ml-auto flex gap-1 shrink-0">
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[7px] font-bold text-blue-700">
            <FileText className="w-2 h-2" /> Generate Receipt
          </span>
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-[7px] font-bold text-rose-600">
            <Trash2 className="w-2 h-2" /> Delete All Fees
          </span>
        </span>
      </div>

      {/* Filters */}
      <div className="rounded-xl bg-white border border-slate-200/80 px-2 py-1.5">
        <div className="flex items-center justify-between mb-1">
          <span className="flex items-center gap-1 text-[7px] font-black tracking-[0.12em] text-slate-500">
            <Filter className="w-2 h-2" /> FILTERS
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[6.5px] text-slate-500">Showing 1–12 of 12</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {[
            ['TERM', 'Term One • Current'],
            ['ACADEMIC YEAR', '2026 – 2027'],
            ['LEVEL', 'All Levels'],
            ['CLASS', 'All Classes'],
            ['PAGE SIZE', '25 rows'],
            ['SEARCH', 'Search student name or ID'],
          ].map(([label, value], i) => (
            <span key={label} className="min-w-0">
              <span className="block text-[6px] font-bold tracking-wider text-slate-400 mb-0.5">{label}</span>
              <span className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-md border border-slate-200 bg-white">
                <span className={`text-[7px] truncate ${i === 5 ? 'text-slate-400' : 'text-slate-700 font-semibold'}`}>
                  {value}
                </span>
                {i < 5 && <ChevronDown className="w-2 h-2 text-slate-400 shrink-0" />}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Fee register */}
      <div className="rounded-xl bg-white border border-slate-200/80 flex flex-col min-h-0 overflow-hidden">
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100">
          <span className="leading-none">
            <span className="block text-[6px] font-black tracking-[0.12em] text-slate-400">FEE REGISTER</span>
            <span className="block text-[9.5px] font-black text-slate-900">Student balances and payment intake</span>
          </span>
          <span className="text-[6.5px] text-slate-400">Active window: Term One • 2026 – 2027</span>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/70">
              {['STUDENT ID', 'FULL NAME', 'LEVEL', 'CLASS', 'STATUS', 'TOTAL FEES', 'PAID', 'ARREARS', 'RECEIVE PAYMENT'].map(
                (head) => (
                  <th
                    key={head}
                    className="px-1.5 py-1 text-left text-[6px] font-black tracking-wider text-slate-400 whitespace-nowrap"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {FEE_ROWS.map((row, i) => (
              <tr key={row[0]} className="border-t border-slate-100" style={{ animation: `rowIn 420ms ${i * 80}ms both` }}>
                <td className="px-1.5 py-1 text-[7px] font-semibold text-blue-600">{row[0]}</td>
                <td className="px-1.5 py-1 text-[7.5px] font-black text-slate-800 whitespace-nowrap">{row[1]}</td>
                <td className="px-1.5 py-1 text-[6.5px] text-slate-500">{row[2]}</td>
                <td className="px-1.5 py-1 text-[6.5px] text-slate-500">{row[3]}</td>
                <td className="px-1.5 py-1">
                  <span className="px-1.5 py-[1px] rounded-full bg-orange-50 border border-orange-200 text-[6px] font-bold text-orange-600">
                    PENDING
                  </span>
                </td>
                <td className="px-1.5 py-1 text-[7px] font-semibold text-slate-700 tabular-nums">{row[4]}</td>
                <td className="px-1.5 py-1 text-[7px] font-bold text-emerald-600 tabular-nums">{row[5]}</td>
                <td className="px-1.5 py-1 text-[7px] font-bold text-orange-600 tabular-nums">{row[6]}</td>
                <td className="px-1.5 py-1">
                  <span className="flex items-center gap-1">
                    <span className="px-1.5 py-[2px] rounded-md border border-slate-200 text-[6px] text-slate-400">
                      Amount
                    </span>
                    <span className="px-1.5 py-[2px] rounded-md bg-blue-50 border border-blue-200 text-[6px] font-black text-blue-700 whitespace-nowrap">
                      RECEIVE PAYMENT
                    </span>
                    <span className="w-3.5 h-3.5 rounded-md bg-amber-50 border border-amber-200 grid place-items-center shrink-0">
                      <Pencil className="w-1.5 h-1.5 text-amber-600" />
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </SmsShell>
);

/* -------------------------- Report card ---------------------------- */

const EDIT_ACTIONS: { label: string; tone: string; icon: IconLike }[] = [
  { label: 'Add Subject', tone: 'bg-emerald-500', icon: Plus },
  { label: 'Add Score Column', tone: 'bg-blue-500', icon: Plus },
  { label: 'Delete Selected', tone: 'bg-slate-600', icon: Trash2 },
  { label: 'Grade Scale', tone: 'bg-amber-500', icon: Trophy },
];

const SUBJECTS = [
  'English Language',
  'Mathematics',
  'Integrated Science',
  'R.M.E',
  'Fanti',
  'Career Technology',
  'Creative Arts',
  'Social Studies',
  'Computing',
];

const ReportCardScene: React.FC = () => (
  <SmsShell active="Report Card" expanded={{ parent: 'Assessments', items: ['Exams', 'Assignments', 'Results', 'Report Card'] }}>
    <div className="h-full rounded-xl bg-[#0f2137] overflow-hidden flex flex-col min-h-0">
      {/* Designer toolbar */}
      <div className="px-2 py-1.5 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <span className="leading-none">
            <span className="block text-[11px] font-black text-white">Report Card Designer</span>
            <span className="flex gap-1 mt-1">
              {['Saved 0', 'Archives 0'].map((chip) => (
                <span key={chip} className="px-1.5 py-[1px] rounded-md bg-white/10 text-[6.5px] font-semibold text-slate-300">
                  {chip}
                </span>
              ))}
            </span>
          </span>
          <span className="px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-[7.5px] font-black text-emerald-300">
            Weight 100%
          </span>
        </div>

        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
          <span className="text-[6px] font-black tracking-wider text-slate-500">EDIT</span>
          {EDIT_ACTIONS.map(({ label, tone, icon: Icon }) => (
            <span key={label} className={`flex items-center gap-1 px-1.5 py-1 rounded-md ${tone} text-white`}>
              <Icon className="w-2 h-2" />
              <span className="text-[6.5px] font-bold">{label}</span>
            </span>
          ))}
          <span className="text-[6px] font-black tracking-wider text-slate-500 ml-1">CURRENT</span>
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-violet-500 text-white">
            <Printer className="w-2 h-2" />
            <span className="text-[6.5px] font-bold">Print Current</span>
          </span>
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-teal-500 text-white">
            <Save className="w-2 h-2" />
            <span className="text-[6.5px] font-bold">Save Report Card</span>
          </span>
        </div>
      </div>

      {/* The card */}
      <div className="flex-1 min-h-0 overflow-hidden px-2 pb-2">
        <div className="h-full rounded-lg bg-[#132b47] border border-white/10 p-2 flex flex-col min-h-0">
          <div className="text-center shrink-0">
            <div className="text-[10px] font-black text-white tracking-wide">ECKINTOSH SMS</div>
            <div className="text-[6.5px] font-bold text-sky-300 tracking-[0.12em] mt-0.5 border-y border-white/10 py-0.5">
              END OF TERM ONE REPORT CARD
            </div>
            <div className="text-[8px] font-black text-white tracking-wide mt-0.5">JUNIOR HIGH SCHOOL</div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1.5 shrink-0">
            {[
              ['NAME OF PUPIL:', 'Student full name'],
              ['CLASS:', 'e.g. JHS 2B'],
              ['NO. ON ROLL:', 'Roll number'],
              ['NEXT TERM BEGINS:', 'Date'],
              ['OVERALL POSITION:', 'e.g. 3rd'],
              ['LINK TO STUDENT:', 'Search and select student…'],
            ].map(([label, placeholder]) => (
              <span key={label} className="flex items-center gap-1 min-w-0">
                <span className="text-[6px] font-black tracking-wider text-slate-400 shrink-0">{label}</span>
                <span className="flex-1 border-b border-white/15 text-[6.5px] text-slate-500 truncate">{placeholder}</span>
              </span>
            ))}
          </div>

          <div className="mt-1.5 flex-1 min-h-0 overflow-hidden rounded-md border border-white/10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-1.5 py-1 text-left text-[6px] font-black tracking-wider text-slate-300">SUBJECT</th>
                  {['Class Score', 'Exam Score'].map((head) => (
                    <th key={head} className="px-1 py-1 text-center">
                      <span className="block text-[6px] font-black tracking-wider text-slate-300">{head}</span>
                      <span className="block text-[6px] text-sky-300 font-bold">50 %</span>
                    </th>
                  ))}
                  {['TOTAL (100%)', 'POS.', 'GRADE', 'REMARKS'].map((head) => (
                    <th key={head} className="px-1 py-1 text-center text-[6px] font-black tracking-wider text-slate-300">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((subject, i) => (
                  <tr key={subject} className="border-t border-white/5" style={{ animation: `rowIn 380ms ${i * 45}ms both` }}>
                    <td className="px-1.5 py-[3px] text-[6.5px] font-bold text-white whitespace-nowrap">{subject}</td>
                    {Array.from({ length: 6 }).map((_, ci) => (
                      <td key={ci} className="px-1 py-[3px] text-center text-[6.5px] text-slate-500">
                        –
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-1.5 shrink-0 border-t border-white/10 pt-1 text-center">
            <div className="text-[6px] font-black tracking-[0.12em] text-sky-300">INTERPRETATION OF MARKS</div>
            <div className="flex justify-center gap-2 mt-0.5 flex-wrap text-[6px] text-slate-400">
              {[
                ['A', '80–100 — Excellence'],
                ['B', '70–79 — Very Good'],
                ['C', '60–69 — Good'],
                ['D', '50–59 — Average'],
                ['E', '45–49 — Pass'],
              ].map(([grade, range]) => (
                <span key={grade}>
                  <b className="text-sky-300">({grade})</b> {range}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </SmsShell>
);

/* -------------------------- Study tools ---------------------------- */

const FEATURED = [
  { title: 'Discussion Forums', corner: 'COMMUNITY', subject: 'All Subjects', icon: MessageCircle, tone: 'from-blue-50 to-indigo-50 border-blue-100', desc: 'Class discussion forums for students and teachers. Ask questions, share resources, and collaborate.', tags: ['#discussion', '#forum', '#questions'], cta: 'Join discussion' },
  { title: 'Dictionary & Meaning Explorer', corner: 'LANGUAGE', subject: 'Literacy / English', icon: BookOpen, tone: 'from-emerald-50 to-teal-50 border-emerald-100', desc: 'Search for words to find their meanings, parts of speech, pronunciation, and examples.', tags: ['#dictionary', '#vocabulary'], cta: 'Search words' },
  { title: 'Calculator', corner: 'MATH', subject: 'Numeracy / Math', icon: Calculator, tone: 'from-amber-50 to-orange-50 border-amber-100', desc: 'Phone-style arithmetic with live preview, parentheses, and percentage practice.', tags: ['#calculator', '#arithmetic'], cta: 'Open calculator' },
  { title: 'BECE Passco', corner: 'EXAM PREP', subject: 'Exam Prep', icon: Notebook, tone: 'from-rose-50 to-pink-50 border-rose-100', desc: 'Open the BECE past questions archive from 1990 to 2022 for revision and practice.', tags: ['#BECE', '#past questions'], cta: 'Open Passco' },
];

const ALL_TOOLS: [string, string, string, string, string, string][] = [
  ['Audio Learning & Pronunciation', 'Nursery', '10 min', 'Literacy / English', '#audio', 'bg-rose-50 text-rose-600'],
  ['Alphabet Matching Game', 'Nursery', '8 min', 'Literacy / English', '#letters', 'bg-rose-50 text-rose-600'],
  ['Counting with Fruits', 'Nursery', '6 min', 'Numeracy / Math', '#counting', 'bg-rose-50 text-rose-600'],
  ['Colour Mixing Explorer', 'Nursery', '7 min', 'Creative Arts', '#colours', 'bg-rose-50 text-rose-600'],
  ['My Body Parts Puzzle', 'Nursery', '8 min', 'Our World & People', '#body', 'bg-rose-50 text-rose-600'],
  ['Twi/Ga Greetings Match', 'Nursery', '6 min', 'Ghanaian Language', '#greetings', 'bg-rose-50 text-rose-600'],
  ['Weather Watcher', 'Nursery', '5 min', 'Our World & People', '#weather', 'bg-rose-50 text-rose-600'],
  ['Phonics Sound Builder', 'KG 1–2', '10 min', 'Literacy / English', '#CVC', 'bg-amber-50 text-amber-600'],
  ['Number Line Adventures', 'KG 1–2', '10 min', 'Numeracy / Math', '#number line', 'bg-amber-50 text-amber-600'],
];

const StudyToolsScene: React.FC = () => (
  <SmsShell
    active="Study Tools"
    expanded={{
      parent: 'Academics',
      items: ['Classes', 'Subjects', 'Lessons', 'Library', 'Study Tools'],
    }}
  >
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-[12px]">📚</span>
          <span className="text-[12px] font-black text-slate-900">Study Tools Catalogue</span>
        </div>
        <div className="text-[7px] text-slate-500 mt-0.5">
          73 interactive learning prompts · Ghana NaCCA curriculum · Nursery → JHS 3
        </div>
      </div>

      <div className="shrink-0 space-y-1">
        <span className="flex items-center gap-1 px-1.5 py-1 rounded-md border border-slate-200 bg-white w-48">
          <Search className="w-2 h-2 text-slate-400" />
          <span className="text-[7px] text-slate-400">Search topics, tags or subjects…</span>
        </span>
        <div className="flex gap-1 flex-wrap">
          {['All Levels', 'Nursery', 'KG 1–2', 'Primary 1–3', 'Primary 4–6', 'JHS 1–3'].map((chip, i) => (
            <span
              key={chip}
              className={`px-1.5 py-[2px] rounded-full text-[6.5px] font-bold ${
                i === 0 ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {['All Subjects', 'Literacy / English', 'Numeracy / Math', 'Exam Prep', 'Science', 'Our World & People', 'Computing / ICT', 'RME', 'Creative Arts', 'Ghanaian Language'].map(
            (chip, i) => (
              <span
                key={chip}
                className={`px-1.5 py-[2px] rounded-full text-[6.5px] font-bold ${
                  i === 0 ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                {chip}
              </span>
            )
          )}
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between">
        <span className="leading-none">
          <span className="block text-[6px] font-black tracking-[0.12em] text-slate-400">FEATURED TOOLS</span>
          <span className="block text-[9.5px] font-black text-slate-900">Fast access to the essentials</span>
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[6px] text-slate-500">4 highlighted</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        {FEATURED.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.title}
              className={`rounded-xl bg-gradient-to-br border p-1.5 flex flex-col ${tool.tone}`}
              style={{ animation: `rowIn 420ms ${i * 70}ms both` }}
            >
              <div className="flex items-start justify-between gap-1">
                <span className="w-5 h-5 rounded-md bg-white grid place-items-center shrink-0 shadow-sm">
                  <Icon className="w-2.5 h-2.5 text-slate-600" />
                </span>
                <span className="text-[5.5px] font-black tracking-wider text-slate-400">{tool.corner}</span>
              </div>
              <div className="text-[8px] font-black text-slate-900 leading-tight mt-1">{tool.title}</div>
              <div className="text-[6px] text-slate-500 mt-0.5">{tool.subject}</div>
              <p className="text-[6px] text-slate-500 leading-snug mt-1 line-clamp-3">{tool.desc}</p>
              <div className="flex gap-0.5 flex-wrap mt-1">
                {tool.tags.map((tag) => (
                  <span key={tag} className="px-1 py-[1px] rounded bg-white/70 text-[5.5px] text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-1.5 px-1.5 py-1 rounded-md bg-blue-600 text-white text-[6.5px] font-bold text-center">
                {tool.cta} →
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-black text-slate-900">All study tools</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[6px] text-slate-500">69 tools</span>
        </div>
        <div className="grid grid-cols-3 auto-rows-fr gap-1.5 h-[calc(100%-1.1rem)]">
          {ALL_TOOLS.map(([title, level, time, subject, tag, tone], i) => (
            <div
              key={title}
              className="rounded-lg bg-white border border-slate-200 p-1.5"
              style={{ animation: `rowIn 400ms ${i * 55}ms both` }}
            >
              <div className="flex items-center gap-1">
                <span className={`px-1 py-[1px] rounded text-[5.5px] font-bold ${tone}`}>{level}</span>
                <span className="flex items-center gap-0.5 text-[5.5px] text-slate-400">
                  <Clock className="w-1.5 h-1.5" /> {time}
                </span>
                <ChevronDown className="w-2 h-2 text-slate-300 ml-auto" />
              </div>
              <div className="text-[7.5px] font-black text-slate-900 leading-tight mt-0.5">{title}</div>
              <div className="text-[6px] text-slate-500">{subject}</div>
              <span className="inline-block px-1 py-[1px] rounded bg-slate-50 text-[5.5px] text-slate-400 mt-0.5">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SmsShell>
);

/* ----------------------------- Export ------------------------------ */

export const schoolSystem: SystemDefinition = {
  productId: 'school-management',
  appName: 'Eckintosh SMS',
  appInitials: 'ES',
  url: 'sms.eckintosh.app/dashboard',
  scenes: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      caption: 'Enrolment, staff, guardians and attendance the moment an administrator signs in.',
      duration: 7,
      render: () => <DashboardScene />,
    },
    {
      id: 'fees',
      label: 'Finance Desk',
      caption: 'The fee register: balances, arrears ageing and payment intake against every pupil.',
      duration: 7,
      render: () => <FeesScene />,
    },
    {
      id: 'report-card',
      label: 'Report Card Designer',
      caption: 'Schools build their own terminal report layout — subjects, weightings and grade scale.',
      duration: 6,
      render: () => <ReportCardScene />,
    },
    {
      id: 'study-tools',
      label: 'Study Tools',
      caption: '73 interactive learning tools mapped to the Ghana NaCCA curriculum, Nursery to JHS 3.',
      duration: 6,
      render: () => <StudyToolsScene />,
    },
  ],
};
