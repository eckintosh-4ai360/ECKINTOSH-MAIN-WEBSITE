import React from 'react';
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  Boxes,
  Brain,
  Calendar,
  CheckSquare,
  ChevronDown,
  ClipboardList,
  Clock,
  ExternalLink,
  FolderOpen,
  Gauge,
  GitBranch,
  HelpCircle,
  LayoutGrid,
  Layers,
  ListChecks,
  LogOut,
  Mail,
  MessageSquare,
  Mic,
  NotebookPen,
  PenLine,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Target,
  User,
  Users,
  Zap,
} from 'lucide-react';
import type { SystemDefinition } from '../types';

/* ------------------------------------------------------------------ *
 * EckinDev — AI productivity platform, modelled on the live product.
 * Layout, navigation, terminology and figures follow the running
 * workspace; the company mark is EckinDev throughout.
 * ------------------------------------------------------------------ */

type IconLike = React.ComponentType<{ className?: string }>;

interface NavRow {
  label: string;
  icon: IconLike;
  badge?: string;
}

const NAV_GROUPS: { title: string; rows: NavRow[] }[] = [
  {
    title: 'WORKSPACE',
    rows: [
      { label: 'Overview', icon: LayoutGrid },
      { label: 'Projects', icon: Layers },
      { label: 'Code Ops', icon: GitBranch, badge: 'Live' },
      { label: 'Sprints', icon: Zap, badge: 'New' },
      { label: 'Tasks', icon: CheckSquare },
      { label: 'Jot it', icon: NotebookPen },
      { label: 'Whiteboard', icon: PenLine, badge: 'New' },
      { label: 'AI Assistant', icon: Bot, badge: 'AI' },
      { label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'TEAM',
    rows: [
      { label: 'Team', icon: Users },
      { label: 'Standups', icon: ClipboardList, badge: 'New' },
      { label: 'Calendar', icon: Calendar },
    ],
  },
  {
    title: 'COMMUNICATION',
    rows: [
      { label: 'Messages', icon: MessageSquare },
      { label: 'Emails', icon: Mail },
    ],
  },
  {
    title: 'SYSTEM',
    rows: [
      { label: 'Workspaces', icon: Boxes },
      { label: 'Profile', icon: User },
      { label: 'Settings', icon: Settings },
      { label: 'Help', icon: HelpCircle },
      { label: 'Sign Out', icon: LogOut },
    ],
  },
];

/** The product's own chrome: mint canvas, teal rail, workspace switcher. */
const DevShell: React.FC<{ active: string; showTopBar?: boolean; children: React.ReactNode }> = ({
  active,
  showTopBar = true,
  children,
}) => (
  <div className="flex h-full min-h-0 bg-gradient-to-br from-[#f2fbfa] via-white to-[#eef9f8] text-[10px]">
    {/* Rail */}
    <aside className="hidden sm:flex w-[128px] shrink-0 flex-col bg-white/70 border-r-2 border-teal-500/50">
      <div className="flex items-center gap-1.5 px-2 pt-2 pb-1.5 shrink-0">
        <span className="w-5 h-5 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 grid place-items-center shrink-0">
          <GitBranch className="w-2.5 h-2.5 text-white" />
        </span>
        <span className="leading-none min-w-0">
          <span className="block text-[10px] font-black text-teal-500">EckinDev</span>
          <span className="block text-[5.5px] text-slate-400 font-medium truncate">
            SRAD – Rapid Application Development
          </span>
        </span>
      </div>

      <div className="px-2 shrink-0">
        <span className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-md border border-slate-200 bg-white">
          <span className="text-[7.5px] font-bold text-slate-700">Legacy Workspace</span>
          <ChevronDown className="w-2 h-2 text-slate-400" />
        </span>
        <span className="flex items-center justify-between gap-1 px-0.5 py-1">
          <span className="text-[6.5px] text-slate-400">Manage workspaces</span>
          <SlidersHorizontal className="w-2 h-2 text-slate-400" />
        </span>
      </div>

      <nav className="flex-1 px-1.5 overflow-hidden">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="mb-0.5">
            <div className="flex items-center gap-1 px-1 py-[3px]">
              <span className="w-1.5 h-[1px] bg-slate-300" />
              <span className="text-[5.5px] font-black tracking-[0.14em] text-slate-400">{group.title}</span>
            </div>
            {group.rows.map((row) => {
              const Icon = row.icon;
              const isActive = row.label === active;
              return (
                <div
                  key={row.label}
                  className={`flex items-center gap-1.5 px-1.5 py-[3px] rounded-md ${
                    isActive ? 'bg-teal-50 border border-teal-200 text-teal-700 font-bold' : 'text-slate-600'
                  }`}
                >
                  <Icon className={`w-2.5 h-2.5 shrink-0 ${isActive ? 'text-teal-600' : 'text-slate-500'}`} />
                  <span className="truncate text-[7.5px]">{row.label}</span>
                  {row.badge && (
                    <span className="ml-auto px-1 rounded-full bg-teal-100 text-teal-700 text-[5px] font-black shrink-0">
                      {row.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>

    {/* Main */}
    <div className="flex-1 min-w-0 flex flex-col">
      {showTopBar && (
        <header className="h-9 shrink-0 flex items-center gap-2 px-2.5">
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-200 bg-white/80 flex-1 max-w-[46%]">
            <Search className="w-2.5 h-2.5 text-slate-400 shrink-0" />
            <span className="text-[7.5px] text-slate-400 truncate">Search projects, sprints, team…</span>
            <span className="ml-auto px-1 rounded bg-slate-100 text-[5.5px] font-bold text-slate-400 shrink-0">⌘F</span>
          </span>

          <span className="ml-auto flex items-center gap-1.5 shrink-0">
            <span className="relative w-4 h-4 rounded-md border border-slate-200 bg-white grid place-items-center">
              <Bell className="w-2 h-2 text-slate-500" />
              <span className="absolute -top-px -right-px w-1 h-1 rounded-full bg-teal-500" />
            </span>
            <span className="w-4 h-4 rounded-md border border-slate-200 bg-white grid place-items-center">
              <Sun className="w-2 h-2 text-slate-500" />
            </span>
            <span className="flex items-center gap-1 pl-1">
              <span className="relative w-4.5 h-4.5 shrink-0">
                <span className="w-[18px] h-[18px] rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 grid place-items-center text-[7px] font-black text-white">
                  MK
                </span>
                <span className="absolute -bottom-px -right-px w-1.5 h-1.5 rounded-full bg-emerald-400 border border-white" />
              </span>
              <span className="leading-none hidden md:block">
                <span className="block text-[7.5px] font-bold text-slate-800">Markintosh Kojo</span>
                <span className="inline-block px-1 rounded bg-teal-100 text-teal-700 text-[5px] font-black mt-0.5">
                  USER
                </span>
              </span>
              <ChevronDown className="w-2 h-2 text-slate-400" />
            </span>
          </span>
        </header>
      )}

      <div className="flex-1 min-h-0 overflow-hidden px-2.5 pb-2">{children}</div>
    </div>
  </div>
);

/* ------------------------- Command Center -------------------------- */

const KPIS: { value: string; label: string; sub: string; tag: string; icon: IconLike; tone: string }[] = [
  { value: '4', label: 'Total Projects', sub: 'Across all teams', tag: 'ALL TIME', icon: Boxes, tone: 'bg-teal-500' },
  { value: '2', label: 'Active Sprints', sub: 'In progress now', tag: 'LIVE', icon: Zap, tone: 'bg-indigo-500' },
  { value: '3', label: 'Deployments', sub: 'Staging & Production', tag: 'THIS WEEK', icon: Rocket, tone: 'bg-emerald-500' },
  { value: '3', label: 'Open Tasks', sub: 'Awaiting action', tag: 'PENDING', icon: Clock, tone: 'bg-amber-500' },
  { value: '6', label: 'Team Members', sub: 'Active contributors', tag: 'ACTIVE', icon: Users, tone: 'bg-violet-500' },
  { value: '6', label: 'Commits Today', sub: 'Across all repos', tag: 'TODAY', icon: GitBranch, tone: 'bg-cyan-500' },
];

const SIGNALS: { label: string; value: string; tone: string; icon: IconLike }[] = [
  { label: 'FOCUS', value: '37', tone: 'text-amber-500', icon: Gauge },
  { label: 'RISK', value: '98', tone: 'text-rose-500', icon: AlertTriangle },
  { label: 'OVERDUE', value: '7', tone: 'text-rose-500', icon: Bell },
  { label: 'DUE SOON', value: '0', tone: 'text-teal-500', icon: Clock },
];

const FOCUS_RANK = [
  ['Paystack webhook integration', 'E-Commerce API · due 2026-06-09', '100', '86% risk', '98 days overdue, critical importance, already in progress', 100],
  ['Setup JWT auth middleware', 'DevFlow Platform · due 2026-06-07', '100', '86% risk', '100 days overdue, critical importance, older work item', 100],
  ['Configure GitHub Actions CI/CD', 'Mobile App v2 · due 2026-06-07', '98', '76% risk', '100 days overdue, high importance, older work item', 88],
  ['Initialize Flutter project structure', 'Mobile App v2 · due 2026-06-13', '98', '76% risk', '94 days overdue, high importance, stale for 100 days', 86],
];

const CommandCentreScene: React.FC = () => (
  <DevShell active="Overview">
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="shrink-0">
        <div className="text-[16px] font-black text-slate-900 leading-none">Command Center</div>
        <div className="text-[7.5px] text-slate-500 mt-1">
          Dev team&apos;s operations hub — sprints, deploys, standups, all in one place.
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-6 gap-1 shrink-0">
        {KPIS.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl bg-white/80 border border-slate-200/70 p-1.5 flex flex-col"
              style={{ animation: `rowIn 420ms ${i * 55}ms both` }}
            >
              <div className="flex items-start justify-between gap-1">
                <span className={`w-4 h-4 rounded-lg grid place-items-center shrink-0 ${kpi.tone}`}>
                  <Icon className="w-2 h-2 text-white" />
                </span>
                <span className="text-[5px] font-black tracking-wider text-slate-400">{kpi.tag}</span>
              </div>
              <div className="text-[15px] font-black text-slate-900 leading-none mt-1 tabular-nums">{kpi.value}</div>
              <div className="text-[6.5px] font-bold text-slate-700 mt-0.5 truncate">{kpi.label}</div>
              <div className="text-[5.5px] text-slate-400 truncate">{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* AI command panel */}
      <div className="flex-1 min-h-0 rounded-xl bg-white/60 border border-teal-100 p-1.5 flex flex-col">
        <div className="flex items-start justify-between gap-2 shrink-0">
          <span className="leading-none">
            <span className="flex items-center gap-1 text-[6px] font-black tracking-[0.14em] text-teal-600">
              <Brain className="w-2 h-2" /> AI PRODUCTIVITY COMMAND
            </span>
            <span className="block text-[10.5px] font-black text-slate-900 mt-1">
              Focus order, risk signals, and assistant memory
            </span>
          </span>
          <span className="flex gap-1 shrink-0">
            {SIGNALS.map((signal) => {
              const Icon = signal.icon;
              return (
                <span key={signal.label} className="rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-center">
                  <span className="flex items-center gap-0.5 text-[5px] font-black tracking-wider text-slate-400">
                    <Icon className="w-1.5 h-1.5" /> {signal.label}
                  </span>
                  <span className={`block text-[12px] font-black tabular-nums ${signal.tone}`}>{signal.value}</span>
                </span>
              );
            })}
          </span>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-5 gap-1.5 mt-1.5">
          {/* Focus rank */}
          <div className="col-span-3 rounded-lg bg-white border border-slate-200/70 p-1.5 flex flex-col min-h-0">
            <div className="flex items-center justify-between shrink-0 mb-1">
              <span className="flex items-center gap-1 text-[8.5px] font-black text-slate-800">
                <ListChecks className="w-2.5 h-2.5 text-teal-600" /> AI Focus Rank
              </span>
              <span className="px-1.5 py-[1px] rounded-full bg-teal-50 text-teal-700 text-[5.5px] font-black">
                7 active
              </span>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-1 overflow-hidden">
              {FOCUS_RANK.map(([title, meta, score, risk, why, bar], i) => (
                <div
                  key={title as string}
                  className="rounded-md border border-slate-200/80 px-1.5 py-1"
                  style={{ animation: `rowIn 420ms ${i * 90}ms both` }}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="flex items-center gap-1 min-w-0">
                      <span className="px-1 rounded bg-slate-100 text-[5.5px] font-black text-slate-500 shrink-0">
                        #{i + 1}
                      </span>
                      <span className="text-[8px] font-black text-slate-800 truncate">{title}</span>
                    </span>
                    <span className="text-right shrink-0 leading-none">
                      <span className="block text-[10px] font-black text-slate-900 tabular-nums">{score}</span>
                      <span className="block text-[5.5px] font-bold text-rose-500">{risk}</span>
                    </span>
                  </div>
                  <div className="text-[5.5px] text-slate-400 mt-0.5">{meta}</div>
                  <div className="text-[5.5px] text-slate-500 mt-0.5 truncate">{why}</div>
                  <div className="mt-1 h-[2px] rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-rose-500"
                      style={{ width: `${bar}%`, animation: `barGrow 700ms ${i * 90}ms ease-out both` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights + plan */}
          <div className="col-span-2 flex flex-col gap-1.5 min-h-0">
            <div className="rounded-lg bg-white border border-slate-200/70 p-1.5 shrink-0">
              <span className="flex items-center gap-1 text-[8.5px] font-black text-slate-800 mb-1">
                <Sparkles className="w-2.5 h-2.5 text-teal-600" /> Assistant Insights
              </span>
              <div className="rounded-md bg-rose-50 border border-rose-100 px-1.5 py-1">
                <div className="text-[7px] font-black text-rose-600">Delay risk detected</div>
                <div className="text-[5.5px] text-rose-500 leading-snug">
                  7 active tasks are overdue. Move the highest-scoring one into the next focus block.
                </div>
              </div>
              <div className="rounded-md bg-emerald-50 border border-emerald-100 px-1.5 py-1 mt-1">
                <div className="text-[7px] font-black text-emerald-700">Code momentum</div>
                <div className="text-[5.5px] text-emerald-600 leading-snug">
                  6 commits landed this week. Pair Code Ops review with the active sprint before merging.
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-lg bg-white border border-slate-200/70 p-1.5 flex flex-col min-h-0">
              <span className="flex items-center gap-1 text-[8.5px] font-black text-slate-800 mb-1 shrink-0">
                <Calendar className="w-2.5 h-2.5 text-teal-600" /> Smart Daily Plan
              </span>
              <div className="flex-1 min-h-0 flex flex-col justify-around gap-1">
                {[
                  ['08:30', 'Triage and unblock', 'Review overdue work, due-soon tasks, and blocked standup items.'],
                  ['09:30', 'Paystack webhook integration', 'E-Commerce API · AI score 100. 98 days overdue'],
                  ['11:15', 'Setup JWT auth middleware', 'DevFlow Platform · AI score 100. 100 days overdue'],
                ].map(([time, title, detail], i) => (
                  <div
                    key={time}
                    className="rounded-md border border-slate-200/80 px-1.5 py-1 flex gap-1.5"
                    style={{ animation: `rowIn 400ms ${i * 90}ms both` }}
                  >
                    <span className="text-[6px] font-black text-teal-600 tabular-nums shrink-0 pt-px">{time}</span>
                    <span className="min-w-0">
                      <span className="block text-[7px] font-bold text-slate-800 truncate">{title}</span>
                      <span className="block text-[5.5px] text-slate-400 truncate">{detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DevShell>
);

/* -------------------------- AI Assistant --------------------------- */

const PROMPTS: [string, IconLike][] = [
  ['Prioritize my tasks', CheckSquare],
  ['Build my daily plan', Calendar],
  ['Summarize my notes', NotebookPen],
  ['Create a Kanban board', LayoutGrid],
  ['Show predictive reminders', Zap],
  ['Explain my productivity patterns', BarChart3],
];

const AssistantScene: React.FC = () => (
  <DevShell active="AI Assistant" showTopBar={false}>
    <div className="h-full flex flex-col min-h-0 pt-2">
      <div className="shrink-0">
        <div className="text-[6px] font-black tracking-[0.16em] text-teal-600">AI ASSISTANT</div>
        <div className="text-[14px] font-black text-slate-900 mt-0.5">Chat, plan, and act across your workspace.</div>
      </div>

      <div className="flex-1 min-h-0 mt-1.5 rounded-xl bg-white/70 border border-slate-200/70 flex flex-col">
        <div className="flex-1 min-h-0 grid place-items-center px-3">
          <div className="text-center w-full max-w-[380px]">
            <span className="relative inline-block">
              <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-300 to-cyan-500 grid place-items-center">
                <Bot className="w-5 h-5 text-white" />
              </span>
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
            </span>
            <div className="text-[11px] font-black text-slate-900 mt-1.5">AI Assistant</div>
            <p className="text-[6.5px] text-slate-500 leading-snug mt-1">
              Ask questions, plan your day, and prepare actions for your tasks, calendar, notes, whiteboards, and
              generated apps.
            </p>

            <div className="grid grid-cols-3 gap-1 mt-2">
              {PROMPTS.map(([label, Icon], i) => (
                <span
                  key={label}
                  className="flex items-center gap-1 px-1.5 py-1.5 rounded-lg border border-slate-200 bg-white text-left"
                  style={{ animation: `rowIn 400ms ${i * 60}ms both` }}
                >
                  <Icon className="w-2.5 h-2.5 text-teal-600 shrink-0" />
                  <span className="text-[6.5px] font-bold text-slate-700 leading-tight">{label}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-slate-100 text-[6.5px] text-slate-400">
              <span>
                <b className="text-slate-700">4</b> boards
              </span>
              <span>
                <b className="text-slate-700">1</b> notes
              </span>
              <span>
                <b className="text-slate-700">0</b> calendar items
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-100 p-1.5">
          <div className="rounded-lg border border-slate-200 bg-white px-2 py-1.5">
            <span className="text-[7px] text-slate-400">
              Ask EckinDev AI to plan, summarize, or prepare an action…
              <span className="inline-block w-[1px] h-2.5 bg-slate-500 align-middle ml-0.5 animate-pulse" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1">
            <span className="flex items-center gap-1 text-[5.5px] text-slate-400">
              <Sparkles className="w-1.5 h-1.5 text-teal-500" /> Actions require confirmation before saving.
            </span>
            <span className="flex items-center gap-1 shrink-0">
              <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 bg-white text-[6.5px] font-bold text-slate-600">
                <Mic className="w-2 h-2" /> Talk
              </span>
              <span className="w-5 h-5 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 grid place-items-center">
                <Send className="w-2.5 h-2.5 text-white" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </DevShell>
);

/* ---------------------------- Code Ops ----------------------------- */

const BRANCHES = [
  ['dependabot/npm_and_yarn/date-fns-4.4.0', 'e845bd6b74'],
  ['dependabot/npm_and_yarn/embla-carousel-react-8.6.0', '309a53927f'],
  ['dependabot/npm_and_yarn/lucide-react-1.42.0', 'da08e538cd'],
  ['dependabot/npm_and_yarn/multi-268db90371', '385e854496'],
  ['dependabot/npm_and_yarn/radix-ui/react-menubar-1.1.24', 'c41f7a9b02'],
  ['dependabot/npm_and_yarn/radix-ui/react-navigation-menu', '7d3e1cc580'],
  ['feature/eckintosh-dev-system', 'a19f4e7712'],
  ['main', 'b892d5cfd3d4'],
];

const CodeOpsScene: React.FC = () => (
  <DevShell active="Code Ops" showTopBar={false}>
    <div className="h-full flex flex-col gap-1.5 min-h-0 pt-2">
      <div className="shrink-0">
        <div className="text-[14px] font-black text-slate-900 leading-none">Code Ops</div>
        <div className="text-[7px] text-slate-500 mt-1">
          Track repositories, inspect activity, and push code changes from inside the workspace.
        </div>
      </div>

      <div className="rounded-xl bg-white/80 border border-slate-200/70 p-1.5 shrink-0">
        <div className="flex items-start justify-between gap-2">
          <span className="leading-none">
            <span className="flex items-center gap-1 text-[5.5px] font-black tracking-[0.14em] text-teal-600">
              <GitBranch className="w-1.5 h-1.5" /> GITHUB WORKSPACE
            </span>
            <span className="block text-[10px] font-black text-slate-900 mt-1">
              Code, commits, and pull requests in one place
            </span>
            <span className="block text-[6px] text-slate-400 mt-0.5">
              Track connected repositories, inspect activity, open files, and push commits without leaving the workspace.
            </span>
          </span>
          <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 bg-white text-[6.5px] font-bold text-slate-600 shrink-0">
            <RefreshCw className="w-2 h-2" /> Refresh
          </span>
        </div>

        <div className="grid grid-cols-[1.4fr_0.7fr_1.2fr] gap-1.5 mt-1.5">
          <span>
            <span className="block text-[6px] font-bold text-slate-500 mb-0.5">Project Repository</span>
            <span className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-lg border border-slate-200 bg-white">
              <span className="text-[7px] font-bold text-slate-700 truncate">ECKINTOSH DEV SYSTEM</span>
              <ChevronDown className="w-2 h-2 text-slate-400 shrink-0" />
            </span>
          </span>
          <span>
            <span className="block text-[6px] font-bold text-slate-500 mb-0.5">Branch</span>
            <span className="flex items-center justify-between gap-1 px-1.5 py-1 rounded-lg border border-slate-200 bg-white">
              <span className="text-[7px] font-bold text-slate-700">main</span>
              <ChevronDown className="w-2 h-2 text-slate-400 shrink-0" />
            </span>
          </span>
          <span className="rounded-lg border border-teal-200 bg-teal-50/60 px-1.5 py-1">
            <span className="flex items-center gap-1 text-[6.5px] font-black text-teal-700">
              <ShieldCheck className="w-2 h-2" /> Write access ready
            </span>
            <span className="block text-[5.5px] text-teal-600 leading-snug">
              File edits and PR actions can be sent to GitHub from here.
            </span>
          </span>
        </div>

        <div className="mt-1.5 rounded-lg border border-slate-200 bg-white/70 p-1.5">
          <span className="block text-[6px] font-bold text-slate-500 mb-0.5">Create work branch</span>
          <div className="flex items-center gap-1.5">
            <span className="flex-1 px-1.5 py-1 rounded-md border border-slate-200 bg-white text-[7px] text-slate-600">
              feature/eckintosh-dev-system
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-[6.5px] font-black shrink-0">
              <Plus className="w-2 h-2" /> Create Branch
            </span>
          </div>
          <span className="block text-[5.5px] text-slate-400 mt-0.5">
            New branches start from main, then you can commit and open a pull request here.
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-5 gap-1.5">
        <div className="col-span-2 rounded-xl bg-white/80 border border-slate-200/70 p-1.5 flex flex-col min-h-0">
          <span className="flex items-center gap-1 text-[8px] font-black text-slate-800 shrink-0">
            <GitBranch className="w-2 h-2 text-teal-600" /> Branch Snapshot
          </span>
          <div className="flex-1 min-h-0 flex flex-col gap-1 mt-1 overflow-hidden">
            {BRANCHES.map(([name, sha], i) => (
              <div
                key={name}
                className="rounded-md border border-slate-200/80 bg-white px-1.5 py-1"
                style={{ animation: `rowIn 400ms ${i * 70}ms both` }}
              >
                <div className="text-[6.5px] font-bold text-slate-700 truncate">{name}</div>
                <div className="text-[5.5px] font-mono text-slate-400">{sha}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 rounded-xl bg-white/80 border border-slate-200/70 flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center gap-1 px-1.5 pt-1.5 shrink-0">
            {['Activity', 'Pull Requests', 'Code Workspace'].map((tab, i) => (
              <span
                key={tab}
                className={`px-1.5 py-[3px] rounded-md text-[6.5px] font-bold ${
                  i === 2 ? 'bg-white border border-slate-200 text-slate-800' : 'text-slate-500'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 px-1.5 py-1 shrink-0">
            <span className="leading-none min-w-0">
              <span className="block text-[5.5px] font-black tracking-[0.12em] text-teal-600">EDITING FILE</span>
              <span className="block text-[8px] font-black text-slate-900 truncate">app/api/ai/route.ts</span>
              <span className="block text-[5.5px] text-slate-400">Branch: main · SHA: b892d5cfd3d4</span>
            </span>
            <span className="flex items-center gap-1 shrink-0">
              <span className="flex items-center gap-1 px-1.5 py-1 rounded-md border border-slate-200 bg-white text-[6px] font-bold text-slate-600">
                <Sparkles className="w-1.5 h-1.5 text-teal-500" /> AI Review
              </span>
              <span className="flex items-center gap-1 px-1.5 py-1 rounded-md border border-slate-200 bg-white text-[6px] font-bold text-slate-600">
                <ExternalLink className="w-1.5 h-1.5" /> View on GitHub
              </span>
            </span>
          </div>

          <div className="mx-1.5 rounded-md bg-amber-50 border border-amber-200 px-1.5 py-1 shrink-0">
            <span className="text-[5.5px] text-amber-700 leading-snug">
              You are editing the default branch. Create or select a work branch first when this change should go through
              pull request review.
            </span>
          </div>

          <div className="flex-1 min-h-0 m-1.5 rounded-md bg-[#0d1f2d] overflow-hidden p-1.5 font-mono text-[5.5px] leading-[1.5]">
            {[
              ['9', 'const tools: Groq.Chat.ChatCompletionTool[] = [', 'text-sky-300'],
              ['11', '  { type: "function",', 'text-slate-300'],
              ['12', '    function: {', 'text-slate-300'],
              ['13', '      name: "create_project",', 'text-emerald-300'],
              ['14', '      description: "Create a new project in the EckinDev SRAD workspace.', 'text-amber-200'],
              ['15', '        Use when the user wants to create a project, Kanban board, or', 'text-amber-200'],
              ['16', '        development sprint from a natural-language request.",', 'text-amber-200'],
              ['17', '      parameters: {', 'text-slate-300'],
              ['18', '        type: "object",', 'text-slate-300'],
              ['19', '        properties: {', 'text-slate-300'],
              ['20', '          name: { type: "string", description: "Project name" },', 'text-emerald-300'],
              ['21', '          board: { type: "string", enum: ["kanban", "sprint"] },', 'text-emerald-300'],
              ['22', '          members: { type: "array", items: { type: "string" } },', 'text-emerald-300'],
              ['23', '        },', 'text-slate-300'],
              ['24', '        required: ["name"],', 'text-sky-300'],
              ['25', '      },', 'text-slate-300'],
              ['26', '    },', 'text-slate-300'],
              ['27', '  },', 'text-slate-300'],
              ['28', '];', 'text-sky-300'],
            ].map(([line, code, tone], i) => (
              <div key={line} className="flex gap-1.5" style={{ animation: `rowIn 360ms ${i * 45}ms both` }}>
                <span className="text-slate-600 w-3 text-right shrink-0">{line}</span>
                <span className={tone as string}>{code}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 px-1.5 pb-1.5 shrink-0">
            <FolderOpen className="w-2 h-2 text-slate-400" />
            <span className="text-[5.5px] text-slate-400">Repository root · app · components · hooks</span>
            <span className="ml-auto px-1 rounded bg-slate-100 text-[5.5px] font-bold text-slate-500">typescript</span>
          </div>
        </div>
      </div>
    </div>
  </DevShell>
);

/* ---------------------------- Analytics ---------------------------- */

const TREND_COMPLETED = [0, 0, 4, 0, 0, 0];
const TREND_CREATED = [0, 0, 12, 0, 0, 0];
const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

const TrendChart: React.FC = () => {
  const w = 300;
  const h = 62;
  const max = 12;
  const step = w / (MONTHS.length - 1);
  /** Catmull-Rom smoothing, so the series curves like the product's chart. */
  const toPath = (points: number[]) => {
    const pts = points.map((p, i) => [i * step, h - 8 - (p / max) * (h - 16)] as const);
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i += 1) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full flex-1 min-h-0" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${toPath(TREND_CREATED)} L${w},${h} L0,${h} Z`} fill="url(#trendFill)" />
      <path
        d={toPath(TREND_CREATED)}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="1.4"
        strokeDasharray="4 3"
        style={{ strokeDashoffset: 600, animation: 'drawLine 1.2s ease-out forwards' }}
      />
      <path
        d={toPath(TREND_COMPLETED)}
        fill="none"
        stroke="#14b8a6"
        strokeWidth="1.8"
        strokeLinecap="round"
        style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: 'drawLine 1.2s ease-out forwards' }}
      />
    </svg>
  );
};

const SUMMARY_TILES: { label: string; value: string; sub: string; tone: string; icon: IconLike }[] = [
  { label: 'COMPLETION RATE', value: '36%', sub: 'Completed tasks', tone: 'text-emerald-600', icon: Target },
  { label: 'OVERDUE TASKS', value: '7', sub: 'Need attention', tone: 'text-rose-500', icon: AlertTriangle },
  { label: 'HOURS LOGGED', value: '0h', sub: 'Total tracked time', tone: 'text-slate-800', icon: Clock },
  { label: 'ALL PROJECTS', value: '4', sub: 'Across all statuses', tone: 'text-slate-800', icon: Layers },
];

const AnalyticsScene: React.FC = () => (
  <DevShell active="Analytics" showTopBar={false}>
    <div className="h-full flex flex-col gap-1.5 min-h-0 pt-2">
      {/* Trend */}
      <div className="rounded-xl bg-white/80 border border-slate-200/70 p-1.5 flex flex-col shrink-0" style={{ height: '34%' }}>
        <div className="flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1 text-[6px] font-black tracking-[0.12em] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> 6-MONTH TASK TREND
          </span>
          <span className="flex items-center gap-2 text-[5.5px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Created
            </span>
          </span>
        </div>
        <TrendChart />
        <div className="flex justify-between text-[5.5px] text-slate-400 shrink-0">
          {MONTHS.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>

      {/* Distribution + status */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-1.5">
        <div className="rounded-xl bg-white/80 border border-slate-200/70 p-1.5 flex flex-col min-h-0">
          <span className="flex items-center gap-1 text-[6px] font-black tracking-[0.12em] text-slate-500 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" /> PROJECT DISTRIBUTION
          </span>
          <div className="flex-1 min-h-0 flex items-center justify-center gap-3">
            <svg width="62" height="62" viewBox="0 0 62 62" className="-rotate-90 shrink-0">
              <circle cx="31" cy="31" r="23" fill="none" stroke="#f59e0b" strokeWidth="12" />
              <circle
                cx="31"
                cy="31"
                r="23"
                fill="none"
                stroke="#0d9488"
                strokeWidth="12"
                strokeDasharray={`${0.75 * 2 * Math.PI * 23} ${2 * Math.PI * 23}`}
                style={{ animation: 'drawLine 1s ease-out' }}
              />
            </svg>
            <span className="space-y-1">
              {[
                ['ACTIVE', '3', 'bg-teal-600'],
                ['PAUSED', '1', 'bg-amber-500'],
              ].map(([label, value, tone]) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${tone}`} />
                  <span className="text-[6.5px] font-bold text-slate-600 w-10">{label}</span>
                  <span className="text-[8px] font-black text-slate-900 tabular-nums">{value}</span>
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-white/80 border border-slate-200/70 p-1.5 flex flex-col min-h-0">
          <span className="flex items-center gap-1 text-[6px] font-black tracking-[0.12em] text-slate-500 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> TASK STATUS BREAKDOWN
          </span>
          <div className="flex-1 min-h-0 flex items-center gap-2">
            <svg viewBox="0 0 70 70" className="h-full max-h-[70px] shrink-0">
              {[28, 20, 12].map((r) => (
                <polygon
                  key={r}
                  points={[0, 1, 2, 3, 4]
                    .map((i) => {
                      const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                      return `${35 + r * Math.cos(a)},${35 + r * Math.sin(a)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="0.6"
                />
              ))}
              <polygon
                points={[0.36, 0.18, 0.18, 0.27, 0]
                  .map((v, i) => {
                    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    const r = 8 + v * 55;
                    return `${35 + r * Math.cos(a)},${35 + r * Math.sin(a)}`;
                  })
                  .join(' ')}
                fill="#14b8a6"
                fillOpacity="0.28"
                stroke="#0d9488"
                strokeWidth="1"
                style={{ animation: 'fadeIn 900ms ease-out both' }}
              />
            </svg>
            <span className="flex-1 min-w-0 space-y-[3px]">
              {[
                ['COMPLETED', '4', '36%', 'bg-emerald-500'],
                ['IN REVIEW', '2', '18%', 'bg-violet-500'],
                ['IN PROGRESS', '2', '18%', 'bg-teal-500'],
                ['TODO', '3', '27%', 'bg-amber-500'],
                ['BACKLOG', '0', '0%', 'bg-slate-400'],
              ].map(([label, value, pct, tone]) => (
                <span key={label} className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tone}`} />
                  <span className="text-[5.5px] font-bold text-slate-600 flex-1 truncate">{label}</span>
                  <span className="text-[6.5px] font-black text-slate-800 tabular-nums">{value}</span>
                  <span className="text-[5.5px] text-slate-400 tabular-nums">({pct})</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Priority + summary */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-1.5">
        <div className="rounded-xl bg-white/80 border border-slate-200/70 p-1.5 flex flex-col min-h-0">
          <span className="flex items-center gap-1 text-[6px] font-black tracking-[0.12em] text-slate-500 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> TASKS BY PRIORITY
          </span>
          <div className="flex-1 min-h-0 flex items-end gap-2 px-1 pt-1">
            {[
              ['Critical', 2, '#ef4444'],
              ['High', 6, '#f59e0b'],
              ['Medium', 4, '#14b8a6'],
              ['Low', 0, '#cbd5e1'],
            ].map(([label, value, tone], i) => (
              <span key={label as string} className="flex-1 flex flex-col items-center justify-end h-full">
                <span
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${((value as number) / 8) * 100}%`,
                    minHeight: 1,
                    backgroundColor: tone as string,
                    animation: `barGrow 700ms ${i * 70}ms cubic-bezier(.2,.8,.2,1) both`,
                  }}
                />
                <span className="text-[5.5px] text-slate-400 mt-0.5">{label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/80 border border-slate-200/70 p-1.5 flex flex-col min-h-0">
          <span className="flex items-center gap-1 text-[6px] font-black tracking-[0.12em] text-slate-500 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> WORKSPACE SUMMARY
          </span>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-1 mt-1">
            {SUMMARY_TILES.map(({ label, value, sub, tone, icon: Icon }, i) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200/80 bg-white px-1.5 py-1 flex flex-col justify-center"
                style={{ animation: `rowIn 400ms ${i * 70}ms both` }}
              >
                <span className="flex items-center gap-1 text-[5px] font-black tracking-wider text-slate-400">
                  <Icon className="w-1.5 h-1.5" /> {label}
                </span>
                <span className={`text-[13px] font-black leading-none mt-0.5 tabular-nums ${tone}`}>{value}</span>
                <span className="text-[5px] text-slate-400 mt-0.5">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </DevShell>
);

/* ----------------------------- Export ------------------------------ */

export const aiSystem: SystemDefinition = {
  productId: 'ai-assistant',
  appName: 'EckinDev',
  appInitials: 'ED',
  url: 'eckindev.app/workspace/overview',
  scenes: [
    {
      id: 'command-center',
      label: 'Command Center',
      caption: 'Projects, sprints, deploys and commits in one hub — with AI ranking what to work on next.',
      duration: 7,
      image: {
        // Cloudinary negotiates AVIF/WebP and quality per visitor, while the
        // versioned URL gives the walkthrough a long-lived cache key.
        src: 'https://res.cloudinary.com/fdwfdt1e/image/upload/dpr_auto,f_auto,q_auto/v1790001469/eckintosh/systems/eckindev/command-center.png',
        alt: 'EckinDev Command Center dashboard',
        hotspots: [[17, 22], [44, 25], [42, 54], [75, 51], [66, 81]],
      },
    },
    {
      id: 'assistant',
      label: 'AI Assistant',
      caption: 'Ask it to prioritise, plan the day or build a board — every action confirmed before it saves.',
      duration: 6,
      image: {
        src: 'https://res.cloudinary.com/fdwfdt1e/image/upload/dpr_auto,f_auto,q_auto/v1790001471/eckintosh/systems/eckindev/ai-assistant.png',
        alt: 'EckinDev AI Assistant workspace',
        hotspots: [[50, 38], [47, 51], [66, 51], [48, 69], [73, 89]],
      },
    },
    {
      id: 'code-ops',
      label: 'Code Ops',
      caption: 'Browse repositories, edit files and open pull requests without leaving the workspace.',
      duration: 7,
      image: {
        src: 'https://res.cloudinary.com/fdwfdt1e/image/upload/dpr_auto,f_auto,q_auto/v1790001472/eckintosh/systems/eckindev/code-ops.png',
        alt: 'EckinDev Code Ops workspace',
        hotspots: [[20, 25], [70, 28], [62, 50], [47, 76], [74, 80]],
      },
    },
    {
      id: 'analytics',
      label: 'Analytics',
      caption: 'Completion trend, status mix, priority load and overdue pressure across the whole workspace.',
      duration: 6,
      image: {
        src: 'https://res.cloudinary.com/fdwfdt1e/image/upload/dpr_auto,f_auto,q_auto/v1790001473/eckintosh/systems/eckindev/analytics.png',
        alt: 'EckinDev Analytics Hub dashboard',
        hotspots: [[23, 17], [53, 18], [38, 49], [76, 50], [69, 77]],
      },
    },
  ],
};
