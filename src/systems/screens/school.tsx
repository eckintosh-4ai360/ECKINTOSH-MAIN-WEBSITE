import {
  BookOpen,
  CalendarCheck,
  Download,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Search,
  Send,
  Users,
  Wallet,
} from 'lucide-react';
import { AppBtn, AppShell, Avatar, Bars, Card, Progress, Ring, SectionLabel, Stat, Table, Tag, Trend } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Students', icon: Users },
    { label: 'Academics', icon: BookOpen },
    { label: 'Fees', icon: Wallet },
    { label: 'Attendance', icon: CalendarCheck },
    { label: 'Parents', icon: MessageSquare, badge: '6' },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Nana Boateng', role: 'Head Teacher' };

export const schoolSystem: SystemDefinition = {
  productId: 'school-management',
  appName: 'Eckintosh School',
  appInitials: 'ES',
  url: 'graceacademy.eckintosh.app/dashboard',
  scenes: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      caption: 'Term overview: enrolment, collections, attendance and arrears on one screen.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh School"
          appInitials="ES"
          nav={nav('Dashboard')}
          title="Term 1 Overview"
          subtitle="Grace Academy • 2025/2026 Academic Year"
          user={user}
          actions={
            <>
              <AppBtn icon={Search}>Search</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Download}>
                Export
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Stat label="Enrolled Students" value="1,248" delta="+42 this term" icon={Users} accent={accent} />
              <Stat label="Fees Collected" value="GHS 42,500" delta="94.2% of target" icon={Wallet} accent={accent} />
              <Stat label="Attendance Today" value="98.4%" delta="+1.2% vs last week" icon={CalendarCheck} accent={accent} />
              <Stat label="Outstanding" value="GHS 2,610" delta="31 accounts" deltaTone="down" icon={GraduationCap} accent={accent} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
              <Card className="lg:col-span-2 p-3 flex flex-col min-h-0">
                <SectionLabel right={<Tag tone="green">Live</Tag>}>Fee collection by week</SectionLabel>
                <Trend points={[14, 19, 17, 26, 31, 29, 38, 42]} accent={accent} fill />
                <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  {[
                    ['MTN MoMo', 'GHS 26,400'],
                    ['Telecel Cash', 'GHS 9,850'],
                    ['Bank / Card', 'GHS 6,250'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[9px] text-slate-400">{k}</div>
                      <div className="text-[11px] font-bold text-slate-800 tabular-nums">{v}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-3 flex flex-col min-h-0">
                <SectionLabel>Attendance by class</SectionLabel>
                <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5 overflow-hidden">
                  {[
                    ['JHS 3', 96],
                    ['JHS 2', 99],
                    ['JHS 1', 97],
                    ['Class 6', 94],
                    ['Class 5', 100],
                  ].map(([cls, pct]) => (
                    <div key={cls as string}>
                      <div className="flex justify-between text-[9px] mb-0.5">
                        <span className="text-slate-600 font-medium">{cls}</span>
                        <span className="text-slate-400 tabular-nums">{pct}%</span>
                      </div>
                      <Progress value={pct as number} accent={accent} height={4} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'fees',
      label: 'Fees & MoMo',
      caption: 'Every Mobile Money payment lands against the right student and receipts itself.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh School"
          appInitials="ES"
          nav={nav('Fees')}
          title="Fee Settlement"
          subtitle="Term 1 • Auto-reconciled from Mobile Money"
          user={user}
          actions={
            <>
              <AppBtn>Filter: Paid</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Plus}>
                Record Payment
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <Card className="p-3 flex items-center gap-3 lg:col-span-1">
                <Ring value={94} accent={accent} label="94%" sub="collected" />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400">Term target</div>
                  <div className="text-sm font-black text-slate-900 tabular-nums">GHS 45,110</div>
                  <div className="text-[9px] text-emerald-600 font-semibold">GHS 42,500 received</div>
                </div>
              </Card>
              <Card className="p-3 lg:col-span-2">
                <SectionLabel right={<span className="text-[9px] text-slate-400">last 7 days</span>}>
                  Daily settlement volume
                </SectionLabel>
                <Bars
                  data={[
                    { label: 'Mon', value: 32 },
                    { label: 'Tue', value: 48 },
                    { label: 'Wed', value: 41 },
                    { label: 'Thu', value: 62 },
                    { label: 'Fri', value: 55 },
                    { label: 'Sat', value: 24 },
                    { label: 'Sun', value: 71 },
                  ]}
                  accent={accent}
                  height={52}
                  highlightLast
                />
              </Card>
            </div>

            <Card className="overflow-hidden min-h-0">
              <Table
                head={['Student', 'Class', 'Channel', 'Amount', 'Status']}
                align={['l', 'l', 'l', 'r', 'c']}
                rows={[
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Kwame Mensah" size={18} />
                      <span className="font-semibold">Kwame Mensah</span>
                    </span>,
                    'JHS 2',
                    <span className="text-slate-500">MTN MoMo • 024✱✱✱892</span>,
                    <span className="font-bold tabular-nums">GHS 1,200</span>,
                    <Tag tone="green">Verified</Tag>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Akosua Appiah" size={18} />
                      <span className="font-semibold">Akosua Appiah</span>
                    </span>,
                    'Class 4',
                    <span className="text-slate-500">Telecel Cash • 050✱✱✱114</span>,
                    <span className="font-bold tabular-nums">GHS 950</span>,
                    <Tag tone="green">Verified</Tag>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Yaw Osei" size={18} />
                      <span className="font-semibold">Yaw Osei</span>
                    </span>,
                    'JHS 3',
                    <span className="text-slate-500">Paystack card</span>,
                    <span className="font-bold tabular-nums">GHS 1,450</span>,
                    <Tag tone="green">Verified</Tag>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Efua Danso" size={18} />
                      <span className="font-semibold">Efua Danso</span>
                    </span>,
                    'Class 6',
                    <span className="text-slate-500">Part payment plan</span>,
                    <span className="font-bold tabular-nums">GHS 400</span>,
                    <Tag tone="amber">Balance GHS 500</Tag>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Kojo Amponsah" size={18} />
                      <span className="font-semibold">Kojo Amponsah</span>
                    </span>,
                    'JHS 1',
                    <span className="text-slate-500">No payment recorded</span>,
                    <span className="font-bold tabular-nums text-slate-400">GHS 0</span>,
                    <Tag tone="rose">Arrears</Tag>,
                  ],
                ]}
              />
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'reports',
      label: 'Terminal Report',
      caption: 'Teachers enter raw scores once — aggregates, grades and remarks generate themselves.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh School"
          appInitials="ES"
          nav={nav('Academics')}
          title="Terminal Report Builder"
          subtitle="JHS 3 • 48 students • GES continuous assessment"
          user={user}
          actions={
            <>
              <AppBtn>Preview</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Download}>
                Publish 48 reports
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-2.5 min-h-0">
            <Card className="lg:col-span-3 p-3 flex flex-col min-h-0 overflow-hidden">
              <SectionLabel right={<Tag tone="blue">Auto-calculated</Tag>}>Score sheet — Kwame Mensah</SectionLabel>
              <Table
                head={['Subject', 'Class (30)', 'Exam (70)', 'Total', 'Grade']}
                align={['l', 'c', 'c', 'c', 'c']}
                rows={[
                  ['Mathematics', '27', '62', <b className="tabular-nums">89</b>, <Tag tone="green">1 · Excellent</Tag>],
                  ['English Language', '25', '58', <b className="tabular-nums">83</b>, <Tag tone="green">1 · Excellent</Tag>],
                  ['Integrated Science', '24', '54', <b className="tabular-nums">78</b>, <Tag tone="blue">2 · Very Good</Tag>],
                  ['Social Studies', '22', '51', <b className="tabular-nums">73</b>, <Tag tone="blue">3 · Good</Tag>],
                  ['ICT', '28', '66', <b className="tabular-nums">94</b>, <Tag tone="green">1 · Excellent</Tag>],
                ]}
              />
            </Card>

            <div className="lg:col-span-2 grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
              <Card className="p-3 flex items-center gap-3">
                <Ring value={84} accent={accent} label="84.6" sub="aggregate" />
                <div>
                  <div className="text-[10px] text-slate-400">Position in class</div>
                  <div className="text-sm font-black text-slate-900">4th of 48</div>
                  <div className="text-[9px] text-emerald-600 font-semibold">Up 3 places from Term 3</div>
                </div>
              </Card>
              <Card className="p-3 flex flex-col min-h-0">
                <SectionLabel>Generated remarks</SectionLabel>
                <p className="text-[10px] leading-relaxed text-slate-600 italic">
                  “Kwame has shown consistent improvement across the sciences and remains one of the strongest ICT
                  students in the class. Encourage more written practice in Social Studies.”
                </p>
                <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[9px] text-slate-400">Class teacher sign-off</span>
                  <Tag tone="green">Ready to publish</Tag>
                </div>
              </Card>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'sms',
      label: 'Parent Hub',
      caption: 'One message reaches 1,248 parents, personalised with each child’s balance and result.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh School"
          appInitials="ES"
          nav={nav('Parents')}
          title="Parent Communication Hub"
          subtitle="Broadcast • personalised per student"
          user={user}
          actions={
            <AppBtn accent={accent} tone="solid" icon={Send}>
              Send to 1,248
            </AppBtn>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-2.5 min-h-0">
            <Card className="p-3 flex flex-col">
              <SectionLabel right={<Tag tone="blue">Merge fields on</Tag>}>Compose broadcast</SectionLabel>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[10px] leading-relaxed text-slate-700 flex-1">
                Dear <span className={`px-1 rounded ${accent.bgSoft} ${accent.text} font-semibold`}>{'{parent_name}'}</span>,
                the Term 1 report for{' '}
                <span className={`px-1 rounded ${accent.bgSoft} ${accent.text} font-semibold`}>{'{student_name}'}</span> is
                now on the parent portal. Outstanding balance:{' '}
                <span className={`px-1 rounded ${accent.bgSoft} ${accent.text} font-semibold`}>{'{balance}'}</span>. Thank
                you. — Grace Academy
                <span className="inline-block w-[1px] h-3 bg-slate-800 align-middle ml-0.5 animate-pulse" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
                <span>163 characters · 1 SMS credit each</span>
                <span className="font-semibold text-slate-600">Cost: GHS 49.92</span>
              </div>
            </Card>

            <Card className="p-3 flex flex-col min-h-0">
              <SectionLabel right={<span className="text-[9px] text-emerald-600 font-bold">99.6% delivered</span>}>
                Delivery stream
              </SectionLabel>
              <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5 overflow-hidden">
                {[
                  ['Mrs. Adjei', '024✱✱✱892', 'Delivered', 'green'],
                  ['Mr. Owusu', '055✱✱✱201', 'Delivered', 'green'],
                  ['Mrs. Tetteh', '050✱✱✱114', 'Delivered', 'green'],
                  ['Mr. Asante', '027✱✱✱677', 'Sending', 'amber'],
                  ['Mrs. Baidoo', '020✱✱✱438', 'Queued', 'slate'],
                ].map(([name, phone, status, tone]) => (
                  <div
                    key={name as string}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <Avatar name={name as string} size={18} />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-800 truncate text-[10px]">{name}</div>
                      <div className="text-[8.5px] text-slate-400">{phone}</div>
                    </div>
                    <Tag tone={tone as 'green' | 'amber' | 'slate'}>{status}</Tag>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-2">
                <Progress value={82} accent={accent} />
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
  ],
};
