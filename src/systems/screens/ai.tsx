import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Paperclip,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { AppBtn, AppShell, Card, Progress, SectionLabel, Stat, Table, Tag } from '../kit';
import type { SystemDefinition } from '../types';

const nav = (active: string) =>
  [
    { label: 'Workspace', icon: LayoutDashboard },
    { label: 'Chat', icon: MessageSquare },
    { label: 'Documents', icon: FileText, badge: '9' },
    { label: 'Drafts', icon: Sparkles },
    { label: 'Agents', icon: Cpu },
    { label: 'Governance', icon: ShieldCheck },
  ].map((item) => ({ ...item, active: item.label === active }));

const user = { name: 'Kofi Asare', role: 'Operations Lead' };

export const aiSystem: SystemDefinition = {
  productId: 'ai-assistant',
  appName: 'Eckintosh AI',
  appInitials: 'AI',
  url: 'ai.yourcompany.internal/workspace',
  scenes: [
    {
      id: 'chat',
      label: 'Knowledge Chat',
      caption: 'Answers come from your own policy library — with the exact page cited.',
      duration: 7,
      render: ({ accent }) => (
        <AppShell
          dark
          accent={accent}
          appName="Eckintosh AI"
          appInitials="AI"
          nav={nav('Chat')}
          title="Finance policy assistant"
          subtitle="Grounded in 18,600 indexed internal documents"
          user={user}
          actions={
            <>
              <AppBtn dark icon={ShieldCheck}>
                Private tenancy
              </AppBtn>
              <AppBtn accent={accent} tone="solid" icon={Sparkles}>
                New thread
              </AppBtn>
            </>
          }
        >
          <div className="h-full flex flex-col gap-2 min-h-0">
            <div className="flex-1 min-h-0 flex flex-col justify-end gap-2 overflow-hidden">
              <div className="flex justify-end">
                <div className="max-w-[72%] rounded-2xl rounded-br-sm bg-slate-800 border border-white/10 px-3 py-2 text-[10.5px] text-slate-100">
                  What is our approval limit for a single supplier payment, and who signs above it?
                </div>
              </div>

              <div className="flex gap-2">
                <div
                  className={`w-6 h-6 rounded-lg bg-gradient-to-br ${accent.gradient} grid place-items-center shrink-0`}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-slate-900 border border-white/10 px-3 py-2.5 space-y-2">
                  <p className="text-[10.5px] text-slate-200 leading-relaxed">
                    A single supplier payment up to{' '}
                    <span className={`font-bold ${accent.textDark}`}>GHS 50,000</span> is approved by the Finance
                    Manager. Anything above that requires two signatures: the Finance Manager plus a Director.
                    Payments above <span className={`font-bold ${accent.textDark}`}>GHS 250,000</span> also need
                    Board ratification at the next sitting.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-white/10">
                    <span className="text-[8.5px] text-slate-500 mr-1 pt-0.5">Sources:</span>
                    <Tag tone="blue">Finance Policy v4 · p.12</Tag>
                    <Tag tone="blue">Delegation Matrix 2025 · §3.2</Tag>
                    <Tag tone="blue">Board Minutes · Mar 2025</Tag>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-6 h-6 shrink-0" />
                <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                  <span className="flex gap-0.5">
                    <span className={`w-1 h-1 rounded-full ${accent.dot} animate-bounce`} style={{ animationDelay: '0ms' }} />
                    <span className={`w-1 h-1 rounded-full ${accent.dot} animate-bounce`} style={{ animationDelay: '140ms' }} />
                    <span className={`w-1 h-1 rounded-full ${accent.dot} animate-bounce`} style={{ animationDelay: '280ms' }} />
                  </span>
                  drafting the approval memo…
                </div>
              </div>
            </div>

            <div className="shrink-0 rounded-xl bg-slate-900 border border-white/10 p-2 flex items-center gap-2">
              <Paperclip className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="flex-1 text-[10px] text-slate-500">
                Ask anything, or type / for an action
                <span className="inline-block w-[1px] h-3 bg-slate-400 align-middle ml-0.5 animate-pulse" />
              </span>
              <span className={`w-6 h-6 rounded-lg ${accent.bg} grid place-items-center shrink-0`}>
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
            </div>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'documents',
      label: 'Document Intelligence',
      caption: 'Scanned invoices become clean, checkable rows — with confidence per field.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          dark
          accent={accent}
          appName="Eckintosh AI"
          appInitials="AI"
          nav={nav('Documents')}
          title="Invoice extraction batch"
          subtitle="9 documents • processed in 11 seconds"
          user={user}
          actions={
            <AppBtn accent={accent} tone="solid" icon={CheckCircle2}>
              Post to ledger
            </AppBtn>
          }
        >
          <div className="h-full grid grid-rows-[auto_1fr] gap-2.5 min-h-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Stat dark label="Documents Read" value="18,600" icon={FileText} accent={accent} />
              <Stat dark label="Field Accuracy" value="97.8%" delta="+2.1% after tuning" icon={Zap} accent={accent} />
              <Stat dark label="Avg. Processing" value="1.4s" delta="per page" icon={Cpu} accent={accent} />
              <Stat dark label="Hours Saved" value="310 hrs" delta="this month" icon={Sparkles} accent={accent} />
            </div>

            <Card dark className="overflow-hidden min-h-0">
              <Table
                dark
                head={['Document', 'Supplier', 'Invoice no.', 'Amount', 'Confidence']}
                align={['l', 'l', 'l', 'r', 'c']}
                rows={[
                  [
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-slate-500" /> INV-scan-0417.pdf
                    </span>,
                    'Ashanti Supplies Ltd',
                    'AS/2025/0417',
                    <b className="tabular-nums">GHS 12,480.00</b>,
                    <Tag tone="green">99%</Tag>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-slate-500" /> INV-scan-0418.pdf
                    </span>,
                    'Volta Logistics',
                    'VL-8829',
                    <b className="tabular-nums">GHS 3,150.00</b>,
                    <Tag tone="green">98%</Tag>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-slate-500" /> receipt-fuel-mar.jpg
                    </span>,
                    'GOIL Service Station',
                    'GOIL-7741',
                    <b className="tabular-nums">GHS 890.50</b>,
                    <Tag tone="amber">86% · review</Tag>,
                  ],
                  [
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-slate-500" /> INV-scan-0421.pdf
                    </span>,
                    'Accra Print Works',
                    'APW/1102',
                    <b className="tabular-nums">GHS 2,200.00</b>,
                    <Tag tone="green">97%</Tag>,
                  ],
                ]}
              />
              <div className="px-2.5 py-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[9px] text-slate-500">3 of 4 ready to post automatically</span>
                <div className="w-32">
                  <Progress dark value={88} accent={accent} height={4} />
                </div>
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
    {
      id: 'agents',
      label: 'Workflow Agents',
      caption: 'Multi-step jobs run on a schedule and report back when something needs a human.',
      duration: 6,
      render: ({ accent }) => (
        <AppShell
          dark
          accent={accent}
          appName="Eckintosh AI"
          appInitials="AI"
          nav={nav('Agents')}
          title="Automation agents"
          subtitle="4 active • 1,204 runs this month • 2 awaiting approval"
          user={user}
          actions={<AppBtn accent={accent} tone="solid" icon={Cpu}>New agent</AppBtn>}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-2.5 min-h-0">
            <div className="space-y-2 min-h-0 overflow-hidden">
              {[
                ['Daily sales digest', 'Reads POS totals → drafts summary → emails directors at 18:00', 'Running', 'green'],
                ['Invoice inbox sweep', 'Watches accounts@ → extracts fields → queues for posting', 'Running', 'green'],
                ['Contract expiry watch', 'Flags agreements ending in 30 days → notifies Legal', 'Needs approval', 'amber'],
                ['Support triage', 'Classifies WhatsApp tickets → routes by urgency', 'Running', 'green'],
              ].map(([name, desc, status, tone], i) => (
                <div
                  key={name as string}
                  className="rounded-xl bg-slate-900 border border-white/10 p-2.5"
                  style={{ animation: `rowIn 420ms ${i * 80}ms both` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-5 h-5 rounded-lg ${accent.bgSoftDark} grid place-items-center shrink-0`}>
                        <Cpu className={`w-3 h-3 ${accent.textDark}`} />
                      </span>
                      <span className="text-[10.5px] font-bold text-white truncate">{name}</span>
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[8.5px] font-bold border whitespace-nowrap ${
                        tone === 'green'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <Card dark className="p-3 flex flex-col min-h-0">
              <SectionLabel dark right={<Tag tone="blue">Live log</Tag>}>
                Run trace — Daily sales digest
              </SectionLabel>
              <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5 font-mono text-[9px] overflow-hidden">
                {[
                  ['18:00:01', 'Trigger fired · schedule', 'ok'],
                  ['18:00:02', 'Fetched 6 branch totals from POS API', 'ok'],
                  ['18:00:04', 'Detected variance: Osu branch -18% vs 7-day avg', 'warn'],
                  ['18:00:06', 'Drafted summary with variance call-out', 'ok'],
                  ['18:00:07', 'Delivered to 4 directors + #leadership', 'ok'],
                ].map(([time, msg, level], i) => (
                  <div key={time as string} className="flex gap-2" style={{ animation: `rowIn 400ms ${i * 110}ms both` }}>
                    <span className="text-slate-600 shrink-0">{time}</span>
                    <span
                      className={
                        level === 'warn' ? 'text-amber-400' : level === 'ok' ? 'text-slate-300' : 'text-slate-400'
                      }
                    >
                      {msg}
                    </span>
                  </div>
                ))}
              </div>
              <div className={`rounded-lg ${accent.bgSoftDark} border ${accent.borderDark} p-2 mt-2`}>
                <div className="text-[9px] text-slate-400">Total runtime</div>
                <div className={`text-[12px] font-black ${accent.textDark}`}>6.4 seconds · zero human touches</div>
              </div>
            </Card>
          </div>
        </AppShell>
      ),
    },
  ],
};
