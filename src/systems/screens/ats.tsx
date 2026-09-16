import {
  CalendarCheck,
  CheckCircle2,
  FileText,
  Filter,
  Globe,
  LayoutDashboard,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import { AppBtn, AppShell, Avatar, Card, Progress, Ring, SectionLabel, Stat, Table, Tag } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'Requisitions', icon: FileText },
    { label: 'Candidates', icon: Users, badge: '12' },
    { label: 'Pipeline', icon: Filter },
    { label: 'Interviews', icon: CalendarCheck },
    { label: 'Offers', icon: ShieldCheck },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Abena Sarpong', role: 'HR Director' };

const PIPELINE: { stage: string; count: number; tone: string; people: string[] }[] = [
  { stage: 'Applied', count: 214, tone: 'bg-slate-400', people: ['Kofi Anane', 'Ama Serwaa', 'Selorm Dei'] },
  { stage: 'Screened', count: 68, tone: 'bg-blue-400', people: ['Nii Armah', 'Zainab Iddrisu'] },
  { stage: 'Interview', count: 19, tone: 'bg-violet-400', people: ['Priscilla Otoo', 'Kwabena Boakye'] },
  { stage: 'Offer', count: 5, tone: 'bg-amber-400', people: ['Michael Tetteh'] },
  { stage: 'Hired', count: 3, tone: 'bg-emerald-500', people: ['Gifty Amoah'] },
];

export const atsSystem: SystemDefinition = {
  productId: 'ats-recruitment',
  appName: 'Eckintosh Recruit',
  appInitials: 'ER',
  url: 'careers.yourcompany.com/admin/pipeline',
  scenes: [
    {
      id: 'pipeline',
      label: 'Hiring Pipeline',
      caption: 'Every applicant sits in exactly one stage, with an SLA timer running on each.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Recruit"
          appInitials="ER"
          nav={nav('Pipeline')}
          title="Senior Accounts Officer"
          subtitle="Finance • Accra • Requisition REQ-2041 • Closing in 6 days"
          user={user}
          actions={
            <>
              <AppBtn icon={Filter}>Stage rules</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Users}>
                Move 4 forward
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Stat label="Total Applicants" value="214" delta="+38 in 24 hrs" icon={Users} accent={accent} />
              <Stat label="Auto-Screened" value="68" delta="72% less manual review" icon={Filter} accent={accent} />
              <Stat label="Avg. Time in Stage" value="2.4 days" delta="Within SLA" icon={CalendarCheck} accent={accent} />
              <Stat label="Offer Acceptance" value="86%" delta="+9% vs last quarter" icon={ShieldCheck} accent={accent} />
            </div>

            <div className="grid grid-cols-5 gap-1.5 min-h-0">
              {PIPELINE.map((col, ci) => (
                <div key={col.stage} className="flex flex-col min-h-0 rounded-xl bg-white border border-slate-200 p-1.5">
                  <div className="flex items-center justify-between px-1 pb-1.5 mb-1 border-b border-slate-100">
                    <span className="flex items-center gap-1 text-[9px] font-bold text-slate-600">
                      <span className={`w-1.5 h-1.5 rounded-full ${col.tone}`} /> {col.stage}
                    </span>
                    <span className="text-[9px] font-black text-slate-800 tabular-nums">{col.count}</span>
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    {col.people.map((person, pi) => (
                      <div
                        key={person}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-1.5"
                        style={{ animation: `rowIn 420ms ${(ci * 3 + pi) * 55}ms both` }}
                      >
                        <div className="flex items-center gap-1.5">
                          <Avatar name={person} size={16} />
                          <span className="text-[9px] font-semibold text-slate-800 truncate">{person}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                          <span className="text-[8.5px] text-slate-500 tabular-nums">
                            {(9.4 - ci * 0.6 - pi * 0.3).toFixed(1)} fit
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'screening',
      label: 'Smart Screening',
      caption: 'CVs are parsed into comparable fields, then scored against the criteria you set.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Recruit"
          appInitials="ER"
          nav={nav('Candidates')}
          title="Screening Results"
          subtitle="214 CVs parsed • weighted against 6 role criteria"
          user={user}
          actions={
            <>
              <AppBtn icon={ShieldCheck}>Blind mode: ON</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={CheckCircle2}>
                Shortlist top 10
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-2.5 min-h-0">
            <Card className="lg:col-span-3 overflow-hidden min-h-0">
              <Table
                head={['Candidate', 'Experience', 'Key skills matched', 'Fit score']}
                align={['l', 'c', 'l', 'r']}
                rows={[
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Priscilla Otoo" size={18} />
                      <span className="font-semibold">Priscilla Otoo</span>
                    </span>,
                    '7 yrs',
                    <span className="flex gap-1 flex-wrap">
                      <Tag tone="green">IFRS</Tag>
                      <Tag tone="green">Payroll</Tag>
                      <Tag tone="green">SAP</Tag>
                    </span>,
                    <b className={`tabular-nums ${accent.text}`}>9.4</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Kwabena Boakye" size={18} />
                      <span className="font-semibold">Kwabena Boakye</span>
                    </span>,
                    '6 yrs',
                    <span className="flex gap-1 flex-wrap">
                      <Tag tone="green">IFRS</Tag>
                      <Tag tone="green">Audit</Tag>
                      <Tag tone="slate">SAP</Tag>
                    </span>,
                    <b className={`tabular-nums ${accent.text}`}>8.8</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Nii Armah" size={18} />
                      <span className="font-semibold">Nii Armah</span>
                    </span>,
                    '5 yrs',
                    <span className="flex gap-1 flex-wrap">
                      <Tag tone="green">Payroll</Tag>
                      <Tag tone="green">Tax</Tag>
                    </span>,
                    <b className="tabular-nums text-slate-700">8.1</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Zainab Iddrisu" size={18} />
                      <span className="font-semibold">Zainab Iddrisu</span>
                    </span>,
                    '4 yrs',
                    <span className="flex gap-1 flex-wrap">
                      <Tag tone="green">IFRS</Tag>
                      <Tag tone="slate">Audit</Tag>
                    </span>,
                    <b className="tabular-nums text-slate-700">7.6</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Selorm Dei" size={18} />
                      <span className="font-semibold">Selorm Dei</span>
                    </span>,
                    '2 yrs',
                    <span className="flex gap-1 flex-wrap">
                      <Tag tone="slate">Payroll</Tag>
                    </span>,
                    <b className="tabular-nums text-slate-400">5.2</b>,
                  ],
                ]}
              />
            </Card>

            <div className="lg:col-span-2 grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
              <Card className="p-3 flex flex-col min-h-0">
                <SectionLabel>Scoring weights</SectionLabel>
                <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5">
                  {[
                    ['Relevant experience', 30],
                    ['Professional qualification', 25],
                    ['Systems proficiency', 20],
                    ['Sector exposure', 15],
                    ['Location fit', 10],
                  ].map(([label, weight]) => (
                    <div key={label as string}>
                      <div className="flex justify-between text-[9px] mb-0.5">
                        <span className="text-slate-600">{label}</span>
                        <span className="text-slate-400 tabular-nums">{weight}%</span>
                      </div>
                      <Progress value={(weight as number) * 3.3} accent={accent} height={4} />
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-3 flex flex-col justify-center items-center text-center">
                <Ring value={72} accent={accent} label="-72%" sub="manual review" size={84} />
                <p className="text-[9px] text-slate-500 mt-2 leading-relaxed">
                  214 CVs reduced to a ranked shortlist of 10 in under four minutes.
                </p>
              </Card>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'interviews',
      label: 'Interview Desk',
      caption: 'Panels, slots and scorecards are booked together — no calendar tennis.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Recruit"
          appInitials="ER"
          nav={nav('Interviews')}
          title="Interview Scheduler"
          subtitle="Week of 12 May • 3 panels • auto-invites sent"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={CalendarCheck}>Confirm slots</AppBtn>}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="lg:col-span-2 p-3 min-h-0 flex flex-col">
              <SectionLabel right={<Tag tone="blue">Panel availability synced</Tag>}>Thursday 15 May</SectionLabel>
              <div className="grid grid-cols-4 gap-1.5 flex-1">
                {['09:00', '10:30', '12:00', '14:00'].map((slot, i) => (
                  <div
                    key={slot}
                    className={`rounded-lg border p-2 flex flex-col ${
                      i === 1 ? `${accent.bgSoft} ${accent.border}` : 'bg-slate-50 border-slate-200'
                    }`}
                    style={{ animation: `rowIn 400ms ${i * 80}ms both` }}
                  >
                    <span className="text-[9px] font-bold text-slate-700">{slot}</span>
                    {i === 1 ? (
                      <>
                        <div className="mt-1.5 flex items-center gap-1">
                          <Avatar name="Priscilla Otoo" size={16} />
                          <span className="text-[8.5px] font-semibold text-slate-800 truncate">P. Otoo</span>
                        </div>
                        <span className="mt-auto text-[8px] text-slate-500">Panel: Finance + HR</span>
                      </>
                    ) : i === 3 ? (
                      <>
                        <div className="mt-1.5 flex items-center gap-1">
                          <Avatar name="Kwabena Boakye" size={16} />
                          <span className="text-[8.5px] font-semibold text-slate-800 truncate">K. Boakye</span>
                        </div>
                        <span className="mt-auto text-[8px] text-slate-500">Panel: Finance</span>
                      </>
                    ) : (
                      <span className="mt-auto text-[8px] text-slate-400">Open slot</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-3 text-[9px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Zoom link auto-attached
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Or Boardroom 2, Head Office
                </span>
              </div>
            </Card>

            <Card className="p-3 flex flex-col min-h-0">
              <SectionLabel>Panel scorecard</SectionLabel>
              <div className="space-y-2">
                {[
                  ['Technical depth', 5],
                  ['Communication', 4],
                  ['Ownership', 5],
                  ['Culture add', 4],
                ].map(([criteria, score]) => (
                  <div key={criteria as string} className="flex items-center justify-between">
                    <span className="text-[9.5px] text-slate-600">{criteria}</span>
                    <span className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`w-2.5 h-2.5 ${
                            n <= (score as number) ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
              <div className={`mt-auto rounded-lg ${accent.bgSoft} border ${accent.border} p-2`}>
                <div className="text-[9px] text-slate-500">Panel recommendation</div>
                <div className={`text-[11px] font-black ${accent.text}`}>Proceed to offer</div>
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'careers',
      label: 'Career Portal',
      caption: 'The public side: a branded job board applicants can finish on a phone.',
      duration: 5,
      render: ({ accent }) => (
        <div className="h-full bg-slate-100 flex flex-col text-[11px]">
          <div className="h-11 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-lg bg-gradient-to-br ${accent.gradient} text-white grid place-items-center text-[9px] font-black`}
              >
                YC
              </div>
              <span className="font-bold text-slate-900">Careers at Your Company</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-slate-500">
              <span>Open roles</span>
              <span>Life here</span>
              <span className={`px-2 py-1 rounded-lg ${accent.bg} text-white font-semibold`}>My application</span>
            </div>
          </div>

          <div className="flex-1 min-h-0 p-4 overflow-hidden">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-black text-slate-900">We are hiring across 7 teams</h3>
              <p className="text-[10px] text-slate-500 mt-0.5 mb-3">
                Apply in under four minutes. Track your own status from your phone.
              </p>

              <div className="flex gap-1.5 mb-2.5">
                {['All roles', 'Finance', 'Engineering', 'Operations'].map((chip, i) => (
                  <span
                    key={chip}
                    className={`px-2 py-1 rounded-lg text-[9px] font-semibold border ${
                      i === 0 ? `${accent.bg} text-white border-transparent` : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {chip}
                  </span>
                ))}
                <span className="ml-auto flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-slate-200 text-[9px] text-slate-400">
                  <Search className="w-2.5 h-2.5" /> Search
                </span>
              </div>

              <div className="space-y-1.5">
                {[
                  ['Senior Accounts Officer', 'Finance • Accra • Full-time', '214 applicants', true],
                  ['Backend Engineer (Node.js)', 'Engineering • Hybrid • Full-time', '96 applicants', false],
                  ['Customer Operations Lead', 'Operations • Kumasi • Full-time', '51 applicants', false],
                  ['Field Sales Executive', 'Commercial • Takoradi • Contract', '38 applicants', false],
                ].map(([role, meta, count, featured], i) => (
                  <div
                    key={role as string}
                    className={`rounded-xl border p-2.5 flex items-center justify-between gap-3 bg-white ${
                      featured ? accent.border : 'border-slate-200'
                    }`}
                    style={{ animation: `rowIn 420ms ${i * 70}ms both` }}
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">{role}</div>
                      <div className="text-[9px] text-slate-500">{meta}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] text-slate-400">{count}</span>
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold text-white ${accent.bg}`}>
                        Apply
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
};
