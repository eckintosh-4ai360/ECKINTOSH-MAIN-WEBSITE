import {
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  LayoutDashboard,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wifi,
} from 'lucide-react';
import { AppBtn, AppShell, Avatar, Card, Progress, Ring, SectionLabel, Stat, Table, Tag, Trend } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Courses', icon: BookOpen },
    { label: 'Lessons', icon: Play },
    { label: 'Assessments', icon: FileText, badge: '3' },
    { label: 'Learners', icon: Users },
    { label: 'Certificates', icon: ShieldCheck },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Dr. Ansah', role: 'Training Director' };

export const learningSystem: SystemDefinition = {
  productId: 'learning-platform',
  appName: 'Eckintosh Learn',
  appInitials: 'EL',
  url: 'learn.yourinstitute.edu.gh/courses',
  scenes: [
    {
      id: 'player',
      label: 'Lesson Player',
      caption: 'Video, transcript, notes and an inline question — on a connection that struggles.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Learn"
          appInitials="EL"
          nav={nav('Lessons')}
          title="Module 3 · Working Capital"
          subtitle="Financial Management for Managers • Lesson 4 of 9"
          user={{ name: 'Adwoa Nyarko', role: 'Learner' }}
          actions={
            <>
              <AppBtn icon={Wifi}>Low-bandwidth</AppBtn>
              <AppBtn icon={Download}>Save offline</AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <div className="lg:col-span-2 grid grid-rows-[1fr_auto] gap-2.5 min-h-0">
              <Card className="overflow-hidden flex flex-col min-h-0">
                <div className="relative flex-1 bg-slate-900 grid place-items-center min-h-[92px]">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: `radial-gradient(circle at 50% 45%, ${accent.hex}55, transparent 65%)` }}
                  />
                  <span className={`relative w-9 h-9 rounded-full ${accent.bg} grid place-items-center shadow-lg`}>
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </span>
                  <span className="absolute bottom-1.5 right-2 text-[8.5px] font-mono text-white/70">08:12 / 14:30</span>
                </div>
                <div className="px-2.5 py-1.5">
                  <Progress value={57} accent={accent} height={3} />
                  <div className="flex items-center justify-between mt-1.5 text-[9px] text-slate-500">
                    <span>Auto-saved at 08:12</span>
                    <span className="flex items-center gap-1">
                      <Tag tone="blue">Transcript on</Tag>
                      <Tag tone="slate">0.75× speed</Tag>
                    </span>
                  </div>
                </div>
              </Card>

              <Card className={`p-2.5 ${accent.bgSoft} ${accent.border}`}>
                <div className="flex items-start gap-2">
                  <Sparkles className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent.text}`} />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-slate-800">Checkpoint question</div>
                    <p className="text-[9.5px] text-slate-600 mt-0.5">
                      A business with high stock turnover but late receivables is most likely short of…
                    </p>
                    <div className="grid grid-cols-3 gap-1 mt-1.5">
                      {['Equity', 'Cash', 'Inventory'].map((opt, i) => (
                        <span
                          key={opt}
                          className={`py-1 rounded-lg text-[9px] font-bold text-center border ${
                            i === 1 ? `${accent.bg} text-white border-transparent` : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-2.5 flex flex-col min-h-0">
              <SectionLabel right={<span className="text-[9px] text-slate-400">4 / 9</span>}>Course outline</SectionLabel>
              <div className="space-y-1 overflow-hidden">
                {[
                  ['1. Reading a balance sheet', true],
                  ['2. Profit vs cash', true],
                  ['3. Costing basics', true],
                  ['4. Working capital', 'current'],
                  ['5. Budgeting cycle', false],
                  ['6. Variance analysis', false],
                  ['7. Final assessment', false],
                ].map(([label, state], i) => (
                  <div
                    key={label as string}
                    className={`flex items-center gap-1.5 px-1.5 py-1 rounded-lg ${
                      state === 'current' ? `${accent.bgSoft} border ${accent.border}` : ''
                    }`}
                    style={{ animation: `rowIn 380ms ${i * 50}ms both` }}
                  >
                    {state === true ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    ) : state === 'current' ? (
                      <Play className={`w-3 h-3 shrink-0 ${accent.text}`} />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span
                      className={`text-[9.5px] truncate ${
                        state === 'current' ? `font-bold ${accent.text}` : state === true ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-2 border-t border-slate-100 text-[9px] text-slate-500">
                Certificate unlocks at 100% + pass mark
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'assessment',
      label: 'Assessments',
      caption: 'Randomised papers from a question bank, marked the second a learner submits.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Learn"
          appInitials="EL"
          nav={nav('Assessments')}
          title="End of Module 3 Test"
          subtitle="128 submissions • auto-marked • average 72%"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={FileText}>Release results</AppBtn>}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="p-3 flex flex-col items-center text-center">
              <Ring value={72} accent={accent} label="72%" sub="class average" size={86} />
              <div className="mt-2 grid grid-cols-2 gap-2 w-full text-[9px]">
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-1.5">
                  <div className="font-black text-emerald-700 text-[11px]">96</div>
                  <div className="text-emerald-600">passed</div>
                </div>
                <div className="rounded-lg bg-rose-50 border border-rose-200 p-1.5">
                  <div className="font-black text-rose-700 text-[11px]">32</div>
                  <div className="text-rose-600">need retake</div>
                </div>
              </div>
              <div className="mt-2 text-[9px] text-slate-500">Marking time saved: 14 hours</div>
            </Card>

            <Card className="lg:col-span-2 overflow-hidden min-h-0">
              <Table
                head={['Question', 'Topic', 'Correct', 'Difficulty']}
                align={['l', 'l', 'c', 'c']}
                rows={[
                  ['Q1 · Cash conversion cycle', 'Working capital', <b className="text-emerald-600">91%</b>, <Tag tone="green">Easy</Tag>],
                  ['Q2 · Receivable days formula', 'Ratios', <b className="text-emerald-600">84%</b>, <Tag tone="green">Easy</Tag>],
                  ['Q3 · Overtrading indicators', 'Diagnosis', <b className="text-amber-600">58%</b>, <Tag tone="amber">Medium</Tag>],
                  ['Q4 · Stock financing trade-off', 'Funding', <b className="text-rose-600">39%</b>, <Tag tone="rose">Hard · reteach</Tag>],
                  ['Q5 · Cash budget build', 'Budgeting', <b className="text-amber-600">66%</b>, <Tag tone="amber">Medium</Tag>],
                ]}
              />
              <div className="px-2.5 py-2 border-t border-slate-100 flex items-center gap-1.5 text-[9px] text-slate-500">
                <Sparkles className={`w-3 h-3 ${accent.text}`} />
                Q4 flagged for re-teaching — a revision clip has been queued for the cohort.
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'progress',
      label: 'Cohort Analytics',
      caption: 'Who is moving, who has stalled, and who needs a tutor to call today.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Learn"
          appInitials="EL"
          nav={nav('Learners')}
          title="Cohort 2025-B"
          subtitle="4,300 active learners • 12 cohorts running"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={Users}>Nudge 32 at-risk</AppBtn>}
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Stat label="Active Learners" value="4,300" delta="+318 this month" icon={Users} accent={accent} />
              <Stat label="Completion Rate" value="78%" delta="+11 pts after nudges" icon={CheckCircle2} accent={accent} />
              <Stat label="Avg. Lesson Load" value="1.2s" delta="on 3G" icon={Wifi} accent={accent} />
              <Stat label="Certificates Issued" value="2,914" delta="QR verifiable" icon={ShieldCheck} accent={accent} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2.5 min-h-0">
              <Card className="lg:col-span-3 p-3 flex flex-col">
                <SectionLabel right={<Tag tone="green">+11 pts</Tag>}>Weekly completion trend</SectionLabel>
                <Trend points={[48, 52, 51, 59, 63, 68, 72, 78]} accent={accent} fill />
                <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  {[
                    ['On track', '3,142'],
                    ['Slipping', '1,126'],
                    ['At risk', '32'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[9px] text-slate-400">{k}</div>
                      <div className="text-[11px] font-black text-slate-900 tabular-nums">{v}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="lg:col-span-2 p-3 flex flex-col min-h-0">
                <SectionLabel>Needs a tutor call</SectionLabel>
                <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5">
                  {[
                    ['Adwoa Nyarko', 'Stalled 9 days', 34],
                    ['Ebo Quaye', 'Failed Module 3', 51],
                    ['Hannah Mills', 'No login 2 weeks', 12],
                    ['Ibrahim Sule', 'Stalled 6 days', 47],
                  ].map(([name, reason, pct], i) => (
                    <div key={name as string} style={{ animation: `rowIn 400ms ${i * 70}ms both` }}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Avatar name={name as string} size={18} />
                        <span className="text-[9.5px] font-semibold text-slate-800 truncate flex-1">{name}</span>
                        <span className="text-[8.5px] text-rose-600 shrink-0">{reason}</span>
                      </div>
                      <Progress value={pct as number} accent={accent} height={3} />
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[9px] text-slate-500">
                  <TrendingUp className="w-3 h-3" /> Early nudges recovered 61% of stalled learners
                </div>
              </Card>
            </div>
          </div>
        </AppShell>
      ),
    },
  ],
};
