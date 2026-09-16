import {
  Boxes,
  CalendarCheck,
  Camera,
  Clock,
  LayoutDashboard,
  MessageSquare,
  Scissors,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { AppBtn, AppShell, Avatar, Card, Progress, Ring, SectionLabel, Stat, Table, Tag } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Calendar', icon: CalendarCheck, badge: '9' },
    { label: 'Clients', icon: Users },
    { label: 'Payments', icon: Wallet },
    { label: 'Team', icon: Scissors },
    { label: 'Retail', icon: Boxes },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Akua Mensah', role: 'Salon Owner' };

const STYLISTS = ['Akua', 'Yaa', 'Efua', 'Naana'];
const SLOTS = ['09:00', '10:30', '12:00', '13:30', '15:00'];

const BOOKINGS: Record<string, { client: string; service: string; tone: string }> = {
  '09:00-Akua': { client: 'Esi B.', service: 'Silk press', tone: 'bg-fuchsia-100 border-fuchsia-300' },
  '10:30-Yaa': { client: 'Naa D.', service: 'Braids', tone: 'bg-violet-100 border-violet-300' },
  '10:30-Akua': { client: 'Ama S.', service: 'Colour', tone: 'bg-pink-100 border-pink-300' },
  '12:00-Efua': { client: 'Gifty A.', service: 'Manicure', tone: 'bg-rose-100 border-rose-300' },
  '13:30-Naana': { client: 'Abena K.', service: 'Facial', tone: 'bg-fuchsia-100 border-fuchsia-300' },
  '13:30-Yaa': { client: 'Adjoa M.', service: 'Wash & set', tone: 'bg-purple-100 border-purple-300' },
  '15:00-Akua': { client: 'Selina O.', service: 'Wig install', tone: 'bg-pink-100 border-pink-300' },
};

export const beautySystem: SystemDefinition = {
  productId: 'beauty-management',
  appName: 'Eckintosh Beauty',
  appInitials: 'EB',
  url: 'salon.eckintosh.app/calendar',
  scenes: [
    {
      id: 'calendar',
      label: 'Booking Diary',
      caption: 'A live diary per stylist — drag a slot and the client gets the new time by SMS.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Beauty"
          appInitials="EB"
          nav={nav('Calendar')}
          title="Thursday 15 May"
          subtitle="9 booked • 4 slots open • 87% chair utilisation"
          user={user}
          actions={
            <>
              <AppBtn icon={Clock}>Waitlist · 3</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={CalendarCheck}>
                New booking
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-2.5 min-h-0">
            <Card className="lg:col-span-3 p-2.5 flex flex-col min-h-0">
              <div className="grid grid-cols-[42px_repeat(4,1fr)] gap-1 mb-1">
                <span />
                {STYLISTS.map((s) => (
                  <div key={s} className="flex items-center justify-center gap-1">
                    <Avatar name={s} size={16} />
                    <span className="text-[9px] font-bold text-slate-700">{s}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 grid grid-rows-5 gap-1 min-h-0">
                {SLOTS.map((slot, ri) => (
                  <div key={slot} className="grid grid-cols-[42px_repeat(4,1fr)] gap-1 min-h-0">
                    <span className="text-[8.5px] text-slate-400 font-mono self-center">{slot}</span>
                    {STYLISTS.map((stylist, ci) => {
                      const booking = BOOKINGS[`${slot}-${stylist}`];
                      return (
                        <div
                          key={stylist}
                          className={`rounded-lg border px-1.5 py-1 overflow-hidden ${
                            booking ? booking.tone : 'bg-slate-50 border-dashed border-slate-200'
                          }`}
                          style={{ animation: `rowIn 360ms ${(ri * 4 + ci) * 35}ms both` }}
                        >
                          {booking ? (
                            <>
                              <div className="text-[8.5px] font-bold text-slate-800 truncate">{booking.client}</div>
                              <div className="text-[8px] text-slate-600 truncate">{booking.service}</div>
                            </>
                          ) : (
                            <div className="text-[8px] text-slate-300 h-full grid place-items-center">open</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
              <Card className="p-3 flex flex-col items-center text-center">
                <Ring value={87} accent={accent} label="87%" sub="chair used" size={76} />
                <div className="mt-2 text-[9px] text-slate-500">Deposits collected on 8 of 9 bookings</div>
              </Card>
              <Card className="p-3 flex flex-col">
                <SectionLabel>Today at a glance</SectionLabel>
                <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5 text-[9.5px]">
                  {[
                    ['Expected revenue', 'GHS 3,240'],
                    ['Deposits held', 'GHS 810'],
                    ['No-shows', '0'],
                    ['Rebooked on exit', '6 of 9'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-400">{k}</span>
                      <span className="font-bold text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[9px] text-slate-500">
                  <MessageSquare className="w-3 h-3" /> Reminders sent 24 hrs ahead
                </div>
              </Card>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'client',
      label: 'Client Record',
      caption: 'Formulas, allergies and past results follow the client, not the stylist.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Beauty"
          appInitials="EB"
          nav={nav('Clients')}
          title="Esi Bonsu"
          subtitle="Client since Mar 2023 • 26 visits • VIP tier"
          user={user}
          actions={
            <>
              <AppBtn icon={Camera}>Add photo</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Sparkles}>
                Start service
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="p-3 flex flex-col">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Avatar name="Esi Bonsu" size={34} />
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-[11px]">Esi Bonsu</div>
                  <div className="text-[9px] text-slate-400">024✱✱✱771 · Osu</div>
                </div>
              </div>
              <div className="space-y-1.5 text-[9.5px] pt-2">
                {[
                  ['Hair type', '4B · medium density'],
                  ['Colour formula', '6N + 20 vol · 35 min'],
                  ['Allergies', 'Ammonia-based dye'],
                  ['Preferred stylist', 'Akua'],
                  ['Lifetime value', 'GHS 9,480'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-slate-400 shrink-0">{k}</span>
                    <span className={`font-semibold text-right ${k === 'Allergies' ? 'text-rose-600' : 'text-slate-800'}`}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="lg:col-span-2 overflow-hidden min-h-0">
              <Table
                head={['Date', 'Service', 'Stylist', 'Spend', 'Notes']}
                align={['l', 'l', 'l', 'r', 'l']}
                rows={[
                  ['15 May', 'Silk press + trim', 'Akua', <b className="tabular-nums">GHS 320</b>, <Tag tone="blue">Today</Tag>],
                  ['12 Apr', 'Colour refresh', 'Akua', <b className="tabular-nums">GHS 480</b>, <span className="text-slate-500">Loved the tone</span>],
                  ['08 Mar', 'Deep conditioning', 'Yaa', <b className="tabular-nums">GHS 180</b>, <span className="text-slate-500">Scalp sensitive</span>],
                  ['02 Feb', 'Wig install', 'Akua', <b className="tabular-nums">GHS 600</b>, <span className="text-slate-500">Booked 3 visits ahead</span>],
                ]}
              />
              <div className="p-2.5 border-t border-slate-100 grid grid-cols-3 gap-2">
                {[
                  ['Visits / year', '11'],
                  ['Avg. ticket', 'GHS 364'],
                  ['Rebooking rate', '92%'],
                ].map(([k, v]) => (
                  <div key={k} className="text-center">
                    <div className="text-[9px] text-slate-400">{k}</div>
                    <div className="text-[11px] font-black text-slate-900">{v}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'commission',
      label: 'Commissions',
      caption: 'Month-end runs itself: services, retail, tips and each stylist’s split.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Beauty"
          appInitials="EB"
          nav={nav('Team')}
          title="Commission Run · May"
          subtitle="4 service providers • auto-calculated from completed services"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={Wallet}>Approve payouts</AppBtn>}
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Stat label="Service Revenue" value="GHS 38,420" delta="+24% vs April" icon={Scissors} accent={accent} />
              <Stat label="Retail Sales" value="GHS 6,180" delta="back-bar deducted" icon={Boxes} accent={accent} />
              <Stat label="No-Show Rate" value="3.1%" delta="-63% since deposits" icon={CalendarCheck} accent={accent} />
              <Stat label="Rebooking Rate" value="71%" delta="on exit from chair" icon={TrendingUp} accent={accent} />
            </div>

            <Card className="overflow-hidden min-h-0">
              <Table
                head={['Stylist', 'Services', 'Revenue', 'Rate', 'Retail bonus', 'Payout']}
                align={['l', 'c', 'r', 'c', 'r', 'r']}
                rows={[
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Akua Mensah" size={18} /> <span className="font-semibold">Akua</span>
                    </span>,
                    '84',
                    <span className="tabular-nums">GHS 14,880</span>,
                    '45%',
                    <span className="tabular-nums">GHS 412</span>,
                    <b className="tabular-nums text-emerald-600">GHS 7,108</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Yaa Asantewaa" size={18} /> <span className="font-semibold">Yaa</span>
                    </span>,
                    '71',
                    <span className="tabular-nums">GHS 10,240</span>,
                    '40%',
                    <span className="tabular-nums">GHS 286</span>,
                    <b className="tabular-nums text-emerald-600">GHS 4,382</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Efua Owusu" size={18} /> <span className="font-semibold">Efua</span>
                    </span>,
                    '58',
                    <span className="tabular-nums">GHS 7,640</span>,
                    '40%',
                    <span className="tabular-nums">GHS 190</span>,
                    <b className="tabular-nums text-emerald-600">GHS 3,246</b>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Naana Quartey" size={18} /> <span className="font-semibold">Naana</span>
                    </span>,
                    '46',
                    <span className="tabular-nums">GHS 5,660</span>,
                    '35%', 
                    <span className="tabular-nums">GHS 148</span>,
                    <b className="tabular-nums text-emerald-600">GHS 2,129</b>,
                  ],
                ]}
              />
              <div className="px-2.5 py-2 border-t border-slate-100">
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="text-slate-500">Team target · GHS 42,000</span>
                  <span className="font-semibold text-slate-700">91% achieved</span>
                </div>
                <Progress value={91} accent={accent} height={4} />
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
  ],
};
