import {
  Bell,
  CalendarCheck,
  Clock,
  LayoutDashboard,
  Scissors,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { AppBtn, AppShell, Avatar, Bars, Card, Progress, SectionLabel, Stat, Table, Tag } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Today', icon: LayoutDashboard },
    { label: 'Queue', icon: Users, badge: '7' },
    { label: 'Chairs', icon: Scissors },
    { label: 'Checkout', icon: Wallet },
    { label: 'Loyalty', icon: Sparkles },
    { label: 'Earnings', icon: TrendingUp },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Papa Yaw', role: 'Shop Owner' };

export const barbershopSystem: SystemDefinition = {
  productId: 'barbershop-management',
  appName: 'Eckintosh Cuts',
  appInitials: 'CT',
  url: 'shop.eckintosh.app/queue',
  scenes: [
    {
      id: 'queue',
      label: 'Walk-In Queue',
      caption: 'Walk-ins join by phone, see a real wait estimate, and get an SMS when next.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Cuts"
          appInitials="CT"
          nav={nav('Queue')}
          title="Live Queue"
          subtitle="Saturday 14:22 • 7 waiting • est. 38 min to clear"
          user={user}
          actions={
            <>
              <AppBtn icon={Bell}>Notify next 3</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Users}>
                Add walk-in
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-2.5 min-h-0">
            <Card className="lg:col-span-2 flex flex-col min-h-0">
              <div className="px-2.5 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-800">Waiting</span>
                <Tag tone="amber">avg 12 min</Tag>
              </div>
              <div className="p-2 space-y-1 overflow-hidden">
                {[
                  ['Kwesi O.', 'Fade + line-up', 'Next', 'green'],
                  ['Bright A.', 'Low cut', '~9 min', 'amber'],
                  ['Samuel T.', 'Fade + beard', '~18 min', 'slate'],
                  ['Elikem D.', 'Shave', '~24 min', 'slate'],
                  ['Junior K.', 'Kids cut', '~31 min', 'slate'],
                ].map(([name, service, wait, tone], i) => (
                  <div
                    key={name as string}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border ${
                      i === 0 ? `${accent.bgSoft} ${accent.border}` : 'bg-slate-50 border-slate-100'
                    }`}
                    style={{ animation: `rowIn 400ms ${i * 70}ms both` }}
                  >
                    <span className="w-4 text-[9px] font-black text-slate-400 tabular-nums">{i + 1}</span>
                    <Avatar name={name as string} size={20} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[9.5px] font-bold text-slate-800 truncate">{name}</div>
                      <div className="text-[8.5px] text-slate-500 truncate">{service}</div>
                    </div>
                    <Tag tone={tone as 'green' | 'amber' | 'slate'}>{wait}</Tag>
                  </div>
                ))}
              </div>
            </Card>

            <div className="lg:col-span-3 grid grid-rows-[1fr_auto] gap-2.5 min-h-0">
              <Card className="p-2.5 min-h-0">
                <SectionLabel right={<Tag tone="green">3 of 4 busy</Tag>}>Chair board</SectionLabel>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    ['Chair 1', 'Kofi', 'Fade', '6 min in', true],
                    ['Chair 2', 'Nana', 'Beard trim', '3 min in', true],
                    ['Chair 3', 'Yaw', 'Low cut', '11 min in', true],
                    ['Chair 4', 'Free', '—', 'Ready', false],
                  ].map(([chair, barber, service, time, busy], i) => (
                    <div
                      key={chair as string}
                      className={`rounded-xl border p-2 ${
                        busy ? 'bg-white border-slate-200' : 'bg-emerald-50 border-emerald-200'
                      }`}
                      style={{ animation: `rowIn 400ms ${i * 80}ms both` }}
                    >
                      <div className="text-[8.5px] text-slate-400 font-bold">{chair}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${busy ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}
                        />
                        <span className="text-[9.5px] font-bold text-slate-800 truncate">{barber}</span>
                      </div>
                      <div className="text-[8.5px] text-slate-500 truncate mt-0.5">{service}</div>
                      <div className={`text-[8.5px] font-semibold mt-1 ${busy ? 'text-slate-600' : 'text-emerald-600'}`}>
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-2">
                <Stat label="Cuts Today" value="63" delta="target 80" icon={Scissors} accent={accent} />
                <Stat label="Avg. Wait" value="12 min" delta="-38% vs paper list" icon={Clock} accent={accent} />
                <Stat label="Takings" value="GHS 2,840" delta="61% via MoMo" icon={Wallet} accent={accent} />
              </div>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'checkout',
      label: 'Fast Checkout',
      caption: 'Service, extras, tip and loyalty redemption closed in a single tap flow.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Cuts"
          appInitials="CT"
          nav={nav('Checkout')}
          title="Checkout · Kwesi O."
          subtitle="Barber: Kofi • Chair 1 • 18 minutes in chair"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={Wallet}>Take payment</AppBtn>}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="lg:col-span-2 p-2.5 flex flex-col min-h-0">
              <SectionLabel>Services rendered</SectionLabel>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  ['Fade', 'GHS 40', true],
                  ['Line-up', 'GHS 15', true],
                  ['Beard trim', 'GHS 20', false],
                  ['Hot towel', 'GHS 10', true],
                  ['Shave', 'GHS 25', false],
                  ['Kids cut', 'GHS 30', false],
                ].map(([label, price, selected], i) => (
                  <div
                    key={label as string}
                    className={`rounded-xl border p-2 ${
                      selected ? `${accent.bgSoft} ${accent.border}` : 'bg-slate-50 border-slate-200'
                    }`}
                    style={{ animation: `rowIn 380ms ${i * 50}ms both` }}
                  >
                    <div className={`text-[9.5px] font-bold ${selected ? accent.text : 'text-slate-600'}`}>{label}</div>
                    <div className="text-[9px] text-slate-500 tabular-nums">{price}</div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[9px] text-slate-400">Tip for Kofi</div>
                  <div className="flex gap-1 mt-0.5">
                    {['GHS 5', 'GHS 10', 'GHS 20'].map((tip, i) => (
                      <span
                        key={tip}
                        className={`px-2 py-1 rounded-lg text-[9px] font-bold border ${
                          i === 1 ? `${accent.bg} text-white border-transparent` : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {tip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-slate-400">Total due</div>
                  <div className="text-xl font-black text-slate-900 tabular-nums">GHS 75.00</div>
                </div>
              </div>
            </Card>

            <Card className="p-3 flex flex-col">
              <SectionLabel right={<Tag tone="green">Member</Tag>}>Loyalty</SectionLabel>
              <div className="flex gap-1 flex-wrap mb-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-5 h-5 rounded-full grid place-items-center text-[8px] font-black ${
                      i < 9 ? `${accent.bg} text-white` : 'bg-slate-100 text-slate-400 border border-dashed border-slate-300'
                    }`}
                  >
                    {i < 9 ? '✓' : 10}
                  </span>
                ))}
              </div>
              <p className="text-[9.5px] text-slate-600 leading-relaxed">
                One more cut and Kwesi&apos;s tenth is free. Tracked by phone number — no cards to lose.
              </p>
              <div className={`mt-auto rounded-lg ${accent.bgSoft} border ${accent.border} p-2`}>
                <div className="text-[9px] text-slate-500">Visits this year</div>
                <div className={`text-sm font-black ${accent.text}`}>19 · every 12 days</div>
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'earnings',
      label: 'Barber Earnings',
      caption: 'Each barber sees their own numbers, and the daily split settles automatically.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Cuts"
          appInitials="CT"
          nav={nav('Earnings')}
          title="Daily Settlement"
          subtitle="Saturday • 63 cuts • zero payout disputes"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={Wallet}>Settle to MoMo</AppBtn>}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="lg:col-span-2 overflow-hidden min-h-0">
              <Table
                head={['Barber', 'Cuts', 'Service value', 'Tips', 'Split', 'Take-home']}
                align={['l', 'c', 'r', 'r', 'c', 'r']}
                rows={[
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Kofi Baah" size={18} /> <span className="font-semibold">Kofi</span>
                    </span>,
                    '22',
                    <span className="tabular-nums">GHS 1,140</span>,
                    <span className="tabular-nums">GHS 180</span>,
                    '60%',
                    <b className="tabular-nums text-emerald-600">GHS 864</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Nana Kwaku" size={18} /> <span className="font-semibold">Nana</span>
                    </span>,
                    '18',
                    <span className="tabular-nums">GHS 890</span>,
                    <span className="tabular-nums">GHS 120</span>,
                    '60%',
                    <b className="tabular-nums text-emerald-600">GHS 654</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Yaw Antwi" size={18} /> <span className="font-semibold">Yaw</span>
                    </span>,
                    '15',
                    <span className="tabular-nums">GHS 660</span>,
                    <span className="tabular-nums">GHS 95</span>,
                    '55%',
                    <b className="tabular-nums text-emerald-600">GHS 458</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Shop Share" size={18} /> <span className="font-semibold">Shop</span>
                    </span>,
                    '—',
                    <span className="tabular-nums">GHS 2,690</span>,
                    <span className="tabular-nums">—</span>,
                    '—',
                    <b className="tabular-nums text-slate-800">GHS 1,109</b>,
                  ],
                ]}
              />
            </Card>

            <Card className="p-3 flex flex-col">
              <SectionLabel>Peak hours · Saturday</SectionLabel>
              <Bars
                data={[
                  { label: '9a', value: 4 },
                  { label: '11a', value: 9 },
                  { label: '1p', value: 14 },
                  { label: '3p', value: 18 },
                  { label: '5p', value: 12 },
                  { label: '7p', value: 6 },
                ]}
                accent={accent}
                highlightLast={false}
                fill
              />
              <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[9px]">
                  <span className="text-slate-500">Loyalty signups</span>
                  <span className="font-bold text-slate-800">64%</span>
                </div>
                <Progress value={64} accent={accent} height={4} />
                <div className="flex items-center gap-1.5 text-[9px] text-slate-500 pt-1">
                  <CalendarCheck className="w-3 h-3" /> Staff next week rostered to match peaks
                </div>
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
  ],
};
