import {
  Banknote,
  Boxes,
  LayoutDashboard,
  Plus,
  Printer,
  ScanLine,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
  WifiOff,
} from 'lucide-react';
import { AppBtn, AppShell, Bars, Card, Progress, SectionLabel, Stat, Table, Tag, Trend } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Sell', icon: ShoppingCart },
    { label: 'Inventory', icon: Boxes, badge: '7' },
    { label: 'Purchasing', icon: Truck },
    { label: 'Customers', icon: Users },
    { label: 'Reports', icon: TrendingUp },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Mensimah A.', role: 'Branch Manager' };

const TILES = [
  ['Rice 5kg', 'GHS 78.00', 'bg-amber-100'],
  ['Cooking Oil 2L', 'GHS 46.50', 'bg-orange-100'],
  ['Milo 400g', 'GHS 52.00', 'bg-emerald-100'],
  ['Sugar 1kg', 'GHS 18.00', 'bg-sky-100'],
  ['Soap (6pc)', 'GHS 24.00', 'bg-rose-100'],
  ['Tin Tomatoes', 'GHS 9.50', 'bg-red-100'],
  ['Bottled Water', 'GHS 12.00', 'bg-cyan-100'],
  ['Detergent 1kg', 'GHS 31.00', 'bg-violet-100'],
  ['Gari 2kg', 'GHS 22.00', 'bg-yellow-100'],
  ['Evaporated Milk', 'GHS 14.50', 'bg-blue-100'],
  ['Spaghetti 500g', 'GHS 8.00', 'bg-lime-100'],
  ['Toilet Roll (4)', 'GHS 19.00', 'bg-teal-100'],
  ['Tea Bags (50)', 'GHS 27.00', 'bg-fuchsia-100'],
  ['Groundnut Paste', 'GHS 16.00', 'bg-amber-100'],
  ['Maggi Cubes', 'GHS 6.50', 'bg-orange-100'],
  ['Palm Oil 1L', 'GHS 34.00', 'bg-red-100'],
];

export const posSystem: SystemDefinition = {
  productId: 'inventory-pos',
  appName: 'Eckintosh POS',
  appInitials: 'PS',
  url: 'pos.eckintosh.app/terminal-02',
  scenes: [
    {
      id: 'terminal',
      label: 'POS Terminal',
      caption: 'Touch or scan, split the tender, print the receipt — eleven seconds end to end.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh POS"
          appInitials="PS"
          nav={nav('Sell')}
          title="Terminal 02 · Osu Branch"
          subtitle="Cashier: Mensimah A. · Shift 14:00 – 22:00"
          user={user}
          actions={
            <>
              <AppBtn icon={WifiOff}>Offline mode OK</AppBtn>
              <AppBtn icon={ScanLine}>Scanner live</AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-2.5 min-h-0">
            <div className="lg:col-span-3 grid grid-cols-4 auto-rows-fr gap-1.5 min-h-0 overflow-hidden">
              {TILES.map((tile, i) => (
                <div
                  key={tile[0]}
                  className={`rounded-xl border border-slate-200 ${tile[2]} p-2 flex flex-col justify-between min-h-[46px]`}
                  style={{ animation: `rowIn 380ms ${i * 35}ms both` }}
                >
                  <span className="text-[9px] font-bold text-slate-800 leading-tight">{tile[0]}</span>
                  <span className="text-[9px] font-black text-slate-700 tabular-nums">{tile[1]}</span>
                </div>
              ))}
            </div>

            <Card className="lg:col-span-2 flex flex-col min-h-0">
              <div className="px-2.5 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-800">Cart · 4 items</span>
                <Tag tone="blue">Sale #A-3391</Tag>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden p-2 space-y-1">
                {[
                  ['Rice 5kg', '2', 'GHS 156.00'],
                  ['Cooking Oil 2L', '1', 'GHS 46.50'],
                  ['Milo 400g', '1', 'GHS 52.00'],
                  ['Sugar 1kg', '3', 'GHS 54.00'],
                ].map(([item, qty, total], i) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-100"
                    style={{ animation: `rowIn 380ms ${i * 70}ms both` }}
                  >
                    <span className="text-[9.5px] font-semibold text-slate-800 truncate">{item}</span>
                    <span className="text-[9px] text-slate-400 shrink-0">×{qty}</span>
                    <span className="text-[9.5px] font-bold text-slate-900 tabular-nums shrink-0">{total}</span>
                  </div>
                ))}
              </div>

              <div className="p-2.5 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[9.5px] text-slate-500">
                  <span>Subtotal</span>
                  <span className="tabular-nums">GHS 308.50</span>
                </div>
                <div className="flex justify-between text-[9.5px] text-slate-500">
                  <span>VAT + levies</span>
                  <span className="tabular-nums">GHS 33.94</span>
                </div>
                <div className="flex justify-between items-baseline pt-1.5 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-700">Total</span>
                  <span className="text-lg font-black text-slate-900 tabular-nums">GHS 342.44</span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1">
                  <span className={`py-1.5 rounded-lg text-[9px] font-bold text-white text-center ${accent.bg}`}>
                    MoMo
                  </span>
                  <span className="py-1.5 rounded-lg text-[9px] font-bold text-slate-700 bg-slate-100 border border-slate-200 text-center">
                    Cash
                  </span>
                  <span className="py-1.5 rounded-lg text-[9px] font-bold text-slate-700 bg-slate-100 border border-slate-200 text-center">
                    Card
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[8.5px] text-slate-400 pt-0.5">
                  <Printer className="w-2.5 h-2.5" /> Receipt prints + SMS copy to customer
                </div>
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'inventory',
      label: 'Stock Control',
      caption: 'Live stock across every branch, with variance reasons attached to each count.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh POS"
          appInitials="PS"
          nav={nav('Inventory')}
          title="Stock Control"
          subtitle="6 branches • last sync 14 seconds ago"
          user={user}
          actions={
            <>
              <AppBtn icon={Plus}>Stock count</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Truck}>
                Transfer stock
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Stat label="Stock On Hand" value="GHS 486k" delta="across 6 branches" icon={Boxes} accent={accent} />
              <Stat label="Below Reorder" value="7 SKUs" delta="PO suggested" deltaTone="down" icon={Truck} accent={accent} />
              <Stat label="Shrinkage" value="-41%" delta="since counts went digital" icon={TrendingUp} accent={accent} />
              <Stat label="Dead Stock" value="GHS 9,120" delta="no movement 90 days" deltaTone="flat" icon={Banknote} accent={accent} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
              <Card className="lg:col-span-2 overflow-hidden min-h-0">
                <Table
                  head={['Product', 'Osu', 'Madina', 'Tema', 'Status']}
                  align={['l', 'c', 'c', 'c', 'c']}
                  rows={[
                    ['Rice 5kg', '148', '92', '61', <Tag tone="green">Healthy</Tag>],
                    ['Cooking Oil 2L', '34', '18', '9', <Tag tone="amber">Reorder Tema</Tag>],
                    ['Milo 400g', '210', '164', '188', <Tag tone="green">Healthy</Tag>],
                    ['Sugar 1kg', '6', '12', '4', <Tag tone="rose">Critical</Tag>],
                    ['Detergent 1kg', '88', '71', '54', <Tag tone="green">Healthy</Tag>],
                  ]}
                />
              </Card>

              <Card className="p-3 flex flex-col">
                <SectionLabel right={<Tag tone="green">+12.4%</Tag>}>Sales trend · 8 weeks</SectionLabel>
                <Trend points={[22, 26, 24, 31, 29, 36, 34, 41]} accent={accent} fill />
                <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-slate-500">Gross margin</span>
                    <span className="font-bold text-slate-800">28.6%</span>
                  </div>
                  <Progress value={72} accent={accent} height={4} />
                </div>
              </Card>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'reports',
      label: 'Owner Report',
      caption: 'End of day: what each branch sold, what it earned, and who sold it.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh POS"
          appInitials="PS"
          nav={nav('Reports')}
          title="Daily Z-Report"
          subtitle="Wednesday 14 May • all branches consolidated"
          user={{ name: 'Nii Okai', role: 'Business Owner' }}
          actions={<AppBtn accent={accent} tone="solid" icon={Printer}>Email to owners</AppBtn>}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="lg:col-span-2 p-3 flex flex-col">
              <SectionLabel right={<span className="text-[9px] text-slate-400">GHS thousands</span>}>
                Takings by branch
              </SectionLabel>
              <Bars
                data={[
                  { label: 'Osu', value: 18.4 },
                  { label: 'Madina', value: 14.1 },
                  { label: 'Tema', value: 11.8 },
                  { label: 'Spintex', value: 9.2 },
                  { label: 'Kasoa', value: 7.6 },
                  { label: 'Kumasi', value: 16.3 },
                ]}
                accent={accent}
                highlightLast
                fill
              />
              <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                {[
                  ['Total takings', 'GHS 77,400'],
                  ['Transactions', '1,914'],
                  ['Avg. basket', 'GHS 40.44'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[9px] text-slate-400">{k}</div>
                    <div className="text-[11px] font-black text-slate-900 tabular-nums">{v}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-3 flex flex-col min-h-0">
              <SectionLabel>Cashier leaderboard</SectionLabel>
              <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5">
                {[
                  ['Mensimah A.', 'GHS 14,220', 96],
                  ['Kojo D.', 'GHS 11,860', 80],
                  ['Adwoa B.', 'GHS 9,340', 63],
                  ['Isaac O.', 'GHS 7,110', 48],
                ].map(([name, amount, pct], i) => (
                  <div key={name as string} style={{ animation: `rowIn 400ms ${i * 80}ms both` }}>
                    <div className="flex justify-between text-[9.5px] mb-0.5">
                      <span className="font-semibold text-slate-700">{name}</span>
                      <span className="text-slate-500 tabular-nums">{amount}</span>
                    </div>
                    <Progress value={pct as number} accent={accent} height={4} />
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] text-slate-400">Cash variance</span>
                <span className="text-[10px] font-black text-emerald-600">GHS 0.00</span>
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
  ],
};
