import {
  AlertTriangle,
  Boxes,
  FileText,
  LayoutDashboard,
  Pill,
  Printer,
  Search,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { AppBtn, AppShell, Bars, Card, Progress, Ring, SectionLabel, Stat, Table, Tag } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Dispense', icon: Pill },
    { label: 'Prescriptions', icon: FileText },
    { label: 'Stock', icon: Boxes, badge: '4' },
    { label: 'Procurement', icon: Truck },
    { label: 'Claims', icon: ShieldCheck },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Dr. Adoma', role: 'Superintendent' };

export const pharmacySystem: SystemDefinition = {
  productId: 'pharmacy-management',
  appName: 'Eckintosh Pharma',
  appInitials: 'EP',
  url: 'pharmacy.eckintosh.app/dispense',
  scenes: [
    {
      id: 'dispense',
      label: 'Dispensing Counter',
      caption: 'Search, dose-check, label and receipt — the whole counter flow in one screen.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Pharma"
          appInitials="EP"
          nav={nav('Dispense')}
          title="Dispensing Counter"
          subtitle="Ticket #0184 • Patient: Ama Serwaa • NHIS member"
          user={user}
          actions={
            <>
              <AppBtn icon={Printer}>Print label</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Pill}>
                Complete dispense
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="lg:col-span-2 flex flex-col min-h-0 overflow-hidden">
              <div className="p-2.5 border-b border-slate-100 flex items-center gap-2">
                <span className="flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Search className="w-3 h-3 text-slate-400" />
                  <span className="text-[10px] text-slate-700">amoxicill</span>
                  <span className="inline-block w-[1px] h-3 bg-slate-500 animate-pulse" />
                </span>
                <Tag tone="blue">Scanner ready</Tag>
              </div>

              <Table
                head={['Item', 'Batch', 'Expiry', 'Qty', 'Line total']}
                align={['l', 'l', 'l', 'c', 'r']}
                rows={[
                  [
                    <span className="font-semibold">Amoxicillin 500mg caps</span>,
                    <span className="font-mono text-[9px]">B-2291</span>,
                    <Tag tone="green">Mar 2027</Tag>,
                    '21',
                    <b className="tabular-nums">GHS 42.00</b>,
                  ],
                  [
                    <span className="font-semibold">Paracetamol 500mg tabs</span>,
                    <span className="font-mono text-[9px]">B-1874</span>,
                    <Tag tone="green">Nov 2026</Tag>,
                    '20',
                    <b className="tabular-nums">GHS 12.00</b>,
                  ],
                  [
                    <span className="font-semibold">ORS sachets</span>,
                    <span className="font-mono text-[9px]">B-3310</span>,
                    <Tag tone="amber">Aug 2026</Tag>,
                    '4',
                    <b className="tabular-nums">GHS 16.00</b>,
                  ],
                ]}
              />

              <div className="mt-auto p-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9.5px] text-amber-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Interaction check passed · no contraindication with patient file
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-slate-400">Total payable</div>
                  <div className="text-base font-black text-slate-900 tabular-nums">GHS 70.00</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
              <Card className="p-3 flex flex-col min-h-0">
                <SectionLabel>Patient file</SectionLabel>
                <div className="flex-1 min-h-0 flex flex-col justify-around gap-1 text-[9.5px]">
                  {[
                    ['Name', 'Ama Serwaa'],
                    ['Age / Sex', '34 · Female'],
                    ['Allergies', 'Sulfa drugs'],
                    ['Prescriber', 'Dr. K. Mensah'],
                    ['Cover', 'NHIS · 60% subsidy'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <span className="text-slate-400">{k}</span>
                      <span className={`font-semibold text-right ${k === 'Allergies' ? 'text-rose-600' : 'text-slate-800'}`}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-3 flex flex-col items-center justify-center text-center">
                <Ring value={88} accent={accent} label="42s" sub="avg dispense" size={80} />
                <p className="text-[9px] text-slate-500 mt-2 leading-relaxed">
                  Counter turnaround, measured across 180+ scripts a day.
                </p>
              </Card>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'expiry',
      label: 'Batch & Expiry',
      caption: 'Near-expiry stock surfaces early, so it moves before it becomes a write-off.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Pharma"
          appInitials="EP"
          nav={nav('Stock')}
          title="Batch & Expiry Control"
          subtitle="FEFO picking enforced • 4 items need action"
          user={user}
          actions={
            <>
              <AppBtn>Supplier returns</AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Truck}>
                Raise purchase order
              </AppBtn>
            </>
          }
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Stat label="Stock Value" value="GHS 214k" delta="99.2% count accuracy" icon={Boxes} accent={accent} />
              <Stat label="Expiring ≤ 90 days" value="4 lines" delta="GHS 3,180 at risk" deltaTone="down" icon={AlertTriangle} accent={accent} />
              <Stat label="Write-offs YTD" value="-68%" delta="vs previous year" icon={ShieldCheck} accent={accent} />
              <Stat label="Below Reorder" value="7 items" delta="PO drafted" deltaTone="flat" icon={Truck} accent={accent} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
              <Card className="lg:col-span-2 overflow-hidden min-h-0">
                <Table
                  head={['Product', 'Batch', 'Qty', 'Expires in', 'Action']}
                  align={['l', 'l', 'c', 'l', 'c']}
                  rows={[
                    [
                      <span className="font-semibold">Ciprofloxacin 500mg</span>,
                      <span className="font-mono text-[9px]">B-1102</span>,
                      '64',
                      <span className="text-rose-600 font-semibold">18 days</span>,
                      <Tag tone="rose">Discount & push</Tag>,
                    ],
                    [
                      <span className="font-semibold">Vitamin B-Complex</span>,
                      <span className="font-mono text-[9px]">B-0987</span>,
                      '120',
                      <span className="text-amber-600 font-semibold">42 days</span>,
                      <Tag tone="amber">Return window open</Tag>,
                    ],
                    [
                      <span className="font-semibold">ORS sachets</span>,
                      <span className="font-mono text-[9px]">B-3310</span>,
                      '210',
                      <span className="text-amber-600 font-semibold">76 days</span>,
                      <Tag tone="amber">Monitor</Tag>,
                    ],
                    [
                      <span className="font-semibold">Metformin 500mg</span>,
                      <span className="font-mono text-[9px]">B-2043</span>,
                      '18',
                      <span className="text-slate-500">7 months</span>,
                      <Tag tone="blue">Reorder now</Tag>,
                    ],
                  ]}
                />
              </Card>

              <Card className="p-3 flex flex-col">
                <SectionLabel>Write-off value by quarter</SectionLabel>
                <Bars
                  data={[
                    { label: 'Q1', value: 88 },
                    { label: 'Q2', value: 61 },
                    { label: 'Q3', value: 40 },
                    { label: 'Q4', value: 28 },
                  ]}
                  accent={accent}
                  highlightLast
                  fill
                />
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <div className="text-[9px] text-slate-400">Since FEFO enforcement</div>
                  <div className="text-[12px] font-black text-emerald-600">GHS 19,400 recovered</div>
                </div>
              </Card>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'claims',
      label: 'NHIS Claims',
      caption: 'Claim lines build themselves from dispensed items, and rejections get chased.',
      duration: 5,
      render: ({ accent }) => (
        <AppShell
          accent={accent}
          appName="Eckintosh Pharma"
          appInitials="EP"
          nav={nav('Claims')}
          title="Claims & Reimbursement"
          subtitle="April submission • 612 claim lines"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={FileText}>Export claim file</AppBtn>}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 min-h-0">
            <Card className="p-3 flex flex-col items-center justify-center text-center">
              <Ring value={91} accent={accent} label="91%" sub="acceptance" size={88} />
              <div className="mt-2 text-[9px] text-slate-500">
                <div className="font-semibold text-slate-700">GHS 68,410 claimed</div>
                <div>GHS 62,253 reimbursed to date</div>
              </div>
            </Card>

            <Card className="lg:col-span-2 overflow-hidden min-h-0">
              <Table
                head={['Batch', 'Lines', 'Value', 'Submitted', 'Status']}
                align={['l', 'c', 'r', 'l', 'c']}
                rows={[
                  ['CLM-2025-04A', '188', <b className="tabular-nums">GHS 21,400</b>, '02 May', <Tag tone="green">Reimbursed</Tag>],
                  ['CLM-2025-04B', '204', <b className="tabular-nums">GHS 24,860</b>, '02 May', <Tag tone="green">Reimbursed</Tag>],
                  ['CLM-2025-04C', '167', <b className="tabular-nums">GHS 16,990</b>, '09 May', <Tag tone="amber">In review</Tag>],
                  ['CLM-2025-04D', '53', <b className="tabular-nums">GHS 5,160</b>, '09 May', <Tag tone="rose">3 lines rejected</Tag>],
                ]}
              />
              <div className="px-2.5 py-2 border-t border-slate-100">
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="text-slate-500">Reimbursement ageing · 0-30 days</span>
                  <span className="font-semibold text-slate-700">74% settled</span>
                </div>
                <Progress value={74} accent={accent} height={4} />
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
  ],
};
