import {
  Boxes,
  Heart,
  LayoutDashboard,
  MapPin,
  Search,
  ShoppingBag,
  Star,
  Store,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from 'lucide-react';
import { AppBtn, AppShell, Avatar, Card, Progress, SectionLabel, Stat, Table, Tag, Trend } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'Storefront', icon: Store },
    { label: 'Orders', icon: Boxes, badge: '5' },
    { label: 'Delivery', icon: Truck },
    { label: 'Vendors', icon: Users },
    { label: 'Payouts', icon: Wallet },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Adepa Retail', role: 'Store Owner' };

const PRODUCTS = [
  ['Kente Tote Bag', 'GHS 180', 'bg-amber-100', '4.8'],
  ['Shea Butter Set', 'GHS 95', 'bg-emerald-100', '4.9'],
  ['Ankara Shirt', 'GHS 240', 'bg-rose-100', '4.7'],
  ['Beaded Necklace', 'GHS 120', 'bg-violet-100', '5.0'],
  ['Leather Sandals', 'GHS 310', 'bg-orange-100', '4.6'],
  ['Black Soap 500g', 'GHS 45', 'bg-slate-200', '4.8'],
];

export const ecommerceSystem: SystemDefinition = {
  productId: 'ecommerce-platform',
  appName: 'Eckintosh Commerce',
  appInitials: 'EC',
  url: 'shop.adepamall.com',
  scenes: [
    {
      id: 'storefront',
      label: 'Storefront',
      caption: 'The customer view: fast catalogue, honest delivery cost, three taps to pay.',
      duration: 6,
      render: ({ accent }) => (
        <div className="h-full bg-white flex flex-col text-[11px]">
          <div className="h-11 shrink-0 border-b border-slate-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-lg bg-gradient-to-br ${accent.gradient} text-white grid place-items-center text-[9px] font-black`}
              >
                AM
              </div>
              <span className="font-black text-slate-900">Adepa Mall</span>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 w-48">
              <Search className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] text-slate-400">Search 2,400 products</span>
            </span>
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-slate-400" />
              <span className={`relative px-2 py-1 rounded-lg ${accent.bg} text-white text-[9px] font-bold`}>
                Cart · 3
              </span>
            </div>
          </div>

          <div className="flex-1 min-h-0 p-3 overflow-hidden bg-slate-50">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2.5 h-full">
              <div className="lg:col-span-3 min-h-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-800">Trending in Accra</span>
                  <span className="text-[9px] text-slate-400">Free delivery over GHS 300</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {PRODUCTS.map((p, i) => (
                    <div
                      key={p[0]}
                      className="rounded-xl bg-white border border-slate-200 overflow-hidden"
                      style={{ animation: `rowIn 400ms ${i * 60}ms both` }}
                    >
                      <div className={`h-12 ${p[2]} grid place-items-center`}>
                        <ShoppingBag className="w-4 h-4 text-slate-500/60" />
                      </div>
                      <div className="p-1.5">
                        <div className="text-[9px] font-bold text-slate-800 truncate">{p[0]}</div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className={`text-[9.5px] font-black ${accent.text}`}>{p[1]}</span>
                          <span className="flex items-center gap-0.5 text-[8px] text-slate-400">
                            <Star className="w-2 h-2 text-amber-500 fill-amber-500" />
                            {p[3]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="lg:col-span-2 p-2.5 flex flex-col min-h-0">
                <SectionLabel>Checkout</SectionLabel>
                <div className="space-y-1 flex-1">
                  {[
                    ['Kente Tote Bag ×1', 'GHS 180.00'],
                    ['Shea Butter Set ×2', 'GHS 190.00'],
                    ['Delivery · Osu zone', 'GHS 15.00'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[9.5px]">
                      <span className="text-slate-500 truncate">{k}</span>
                      <span className="font-semibold text-slate-800 tabular-nums shrink-0">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-baseline pt-1.5 mt-1.5 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-700">Total</span>
                    <span className="text-base font-black text-slate-900 tabular-nums">GHS 385.00</span>
                  </div>
                </div>

                <div className="space-y-1 mt-2">
                  {[
                    ['MTN Mobile Money', true],
                    ['Telecel Cash', false],
                    ['Card · Visa / Mastercard', false],
                    ['Pay on delivery', false],
                  ].map(([label, selected]) => (
                    <div
                      key={label as string}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-[9px] font-semibold ${
                        selected ? `${accent.bgSoft} ${accent.border} ${accent.text}` : 'bg-white border-slate-200 text-slate-500'
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full border-2 ${
                          selected ? `${accent.bg} border-transparent` : 'border-slate-300'
                        }`}
                      />
                      {label}
                    </div>
                  ))}
                  <div className={`py-2 rounded-lg ${accent.bg} text-white text-[10px] font-black text-center mt-1.5`}>
                    Pay GHS 385.00
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'orders',
      label: 'Order Desk',
      caption: 'Fulfilment board, rider assignment and customer tracking in a single queue.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Commerce"
          appInitials="EC"
          nav={nav('Orders')}
          title="Order Fulfilment"
          subtitle="5 awaiting dispatch • 3 riders on shift"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={Truck}>Assign riders</AppBtn>}
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Stat label="Orders Today" value="147" delta="+22% vs last Wed" icon={Boxes} accent={accent} />
              <Stat label="Checkout Completion" value="96%" delta="MoMo leading" icon={Wallet} accent={accent} />
              <Stat label="Avg. Delivery" value="2.4 hrs" delta="Greater Accra" icon={Truck} accent={accent} />
              <Stat label="Repeat Customers" value="61%" delta="within 60 days" icon={TrendingUp} accent={accent} />
            </div>

            <Card className="overflow-hidden min-h-0">
              <Table
                head={['Order', 'Customer', 'Zone', 'Value', 'Stage']}
                align={['l', 'l', 'l', 'r', 'c']}
                rows={[
                  [
                    <span className="font-mono text-[9px]">#AM-9241</span>,
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Esi Bonsu" size={18} /> <span className="font-semibold">Esi Bonsu</span>
                    </span>,
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-2.5 h-2.5" /> Osu
                    </span>,
                    <b className="tabular-nums">GHS 385.00</b>,
                    <Tag tone="blue">Packed</Tag>,
                  ],
                  [
                    <span className="font-mono text-[9px]">#AM-9240</span>,
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Yaw Fosu" size={18} /> <span className="font-semibold">Yaw Fosu</span>
                    </span>,
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-2.5 h-2.5" /> Madina
                    </span>,
                    <b className="tabular-nums">GHS 240.00</b>,
                    <Tag tone="amber">Rider en route</Tag>,
                  ],
                  [
                    <span className="font-mono text-[9px]">#AM-9238</span>,
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Naa Dedei" size={18} /> <span className="font-semibold">Naa Dedei</span>
                    </span>,
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-2.5 h-2.5" /> Tema
                    </span>,
                    <b className="tabular-nums">GHS 612.50</b>,
                    <Tag tone="green">Delivered</Tag>,
                  ],
                  [
                    <span className="font-mono text-[9px]">#AM-9236</span>,
                    <span className="flex items-center gap-1.5">
                      <Avatar name="Kwesi Arthur" size={18} /> <span className="font-semibold">Kwesi Arthur</span>
                    </span>,
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-2.5 h-2.5" /> Spintex
                    </span>,
                    <b className="tabular-nums">GHS 95.00</b>,
                    <Tag tone="slate">Awaiting pack</Tag>,
                  ],
                ]}
              />
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'payouts',
      label: 'Vendor Payouts',
      caption: 'Multi-vendor settlement: commission applied, payouts reconciled to the cedi.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Commerce"
          appInitials="EC"
          nav={nav('Payouts')}
          title="Vendor Settlement Run"
          subtitle="Week 20 • 34 active vendors"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={Wallet}>Release payouts</AppBtn>}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="lg:col-span-2 overflow-hidden min-h-0">
              <Table
                head={['Vendor', 'Orders', 'Gross', 'Commission', 'Net payout']}
                align={['l', 'c', 'r', 'r', 'r']}
                rows={[
                  ['Adepa Crafts', '42', <span className="tabular-nums">GHS 8,420</span>, <span className="tabular-nums text-slate-400">-GHS 842</span>, <b className="tabular-nums text-emerald-600">GHS 7,578</b>],
                  ['Serwaa Beauty', '31', <span className="tabular-nums">GHS 4,960</span>, <span className="tabular-nums text-slate-400">-GHS 496</span>, <b className="tabular-nums text-emerald-600">GHS 4,464</b>],
                  ['Kumasi Leather', '18', <span className="tabular-nums">GHS 5,580</span>, <span className="tabular-nums text-slate-400">-GHS 558</span>, <b className="tabular-nums text-emerald-600">GHS 5,022</b>],
                  ['Volta Organics', '27', <span className="tabular-nums">GHS 2,430</span>, <span className="tabular-nums text-slate-400">-GHS 243</span>, <b className="tabular-nums text-emerald-600">GHS 2,187</b>],
                ]}
              />
              <div className="px-2.5 py-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] text-slate-400">Settlement to 34 MoMo wallets</span>
                <span className="text-[11px] font-black text-slate-900 tabular-nums">GHS 41,206 total</span>
              </div>
            </Card>

            <Card className="p-3 flex flex-col">
              <SectionLabel right={<Tag tone="green">+18.2%</Tag>}>Platform GMV · 8 weeks</SectionLabel>
              <Trend points={[18, 21, 20, 26, 24, 33, 37, 44]} accent={accent} fill />
              <div className="mt-2 space-y-1.5 pt-2 border-t border-slate-100">
                {[
                  ['Cart recovery via SMS', 68],
                  ['Repeat purchase rate', 61],
                  ['Vendor retention', 92],
                ].map(([label, pct]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-[9px] mb-0.5">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-semibold text-slate-700 tabular-nums">{pct}%</span>
                    </div>
                    <Progress value={pct as number} accent={accent} height={4} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
  ],
};
