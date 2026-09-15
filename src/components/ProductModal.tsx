import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Sparkles, Users, DollarSign, BookOpen, Send } from 'lucide-react';
import { Product } from '../data/contentData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenPlanner: (productName?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenPlanner,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive-demo' | 'specs'>('overview');
  const [demoTab, setDemoTab] = useState<'academics' | 'fees' | 'sms' | 'staff'>('fees');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0F1D33] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 md:p-6 bg-[#08111F]/90 backdrop-blur-md border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {product.status}
              </span>
              <span className="text-xs text-slate-400">{product.category}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mt-1 text-white">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Bar */}
        <div className="flex border-b border-white/10 bg-[#08111F]/50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-xs md:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab('interactive-demo')}
            className={`px-4 py-3 text-xs md:text-sm font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'interactive-demo'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Live System Preview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-3 text-xs md:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'specs'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Features & Capabilities
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <p className="text-base text-slate-200 leading-relaxed font-normal">{product.description}</p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-blue-400">{m.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Features List */}
              <div className="p-5 rounded-xl bg-slate-900/50 border border-white/10">
                <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-3">Core Modules & Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interactive-demo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Interactive System Sandbox (Live Data Model)</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Connected
                </span>
              </div>

              {/* Sub-tab selection */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/10">
                <button
                  onClick={() => setDemoTab('fees')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    demoTab === 'fees' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" /> Fees & MoMo
                </button>
                <button
                  onClick={() => setDemoTab('academics')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    demoTab === 'academics' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> Academics & Grades
                </button>
                <button
                  onClick={() => setDemoTab('sms')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    demoTab === 'sms' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" /> Parent SMS Hub
                </button>
                <button
                  onClick={() => setDemoTab('staff')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    demoTab === 'staff' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Staff Ledger
                </button>
              </div>

              {/* Sandbox Card Content */}
              <div className="p-5 rounded-xl bg-[#08111F] border border-white/10 font-mono text-xs text-slate-300">
                {demoTab === 'fees' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <div className="text-white font-bold text-sm">Tuition & Fee Settlement</div>
                        <div className="text-slate-400 text-xs font-sans">Grace Academy - Academic Year 2025/2026 Term 1</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-bold text-sm">₵42,500 Collected</div>
                        <div className="text-slate-400 text-xs font-sans">94.2% Collection Rate</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/[0.03] rounded-lg border border-white/5 flex items-center justify-between font-sans">
                        <div>
                          <div className="text-white font-semibold">Student: Kwame Mensah (Class JHS 2)</div>
                          <div className="text-slate-400 text-xs">Parent: 0244 *** 892 • Paid via MTN Mobile Money</div>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
                          Verified ₵1,200
                        </span>
                      </div>
                      <div className="p-3 bg-white/[0.03] rounded-lg border border-white/5 flex items-center justify-between font-sans">
                        <div>
                          <div className="text-white font-semibold">Student: Akosua Appiah (Class Class 4)</div>
                          <div className="text-slate-400 text-xs">Parent: 0501 *** 114 • Paid via Telecel Cash</div>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
                          Verified ₵950
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {demoTab === 'academics' && (
                  <div className="space-y-3 font-sans">
                    <div className="text-white font-bold text-sm mb-2">GES Continuous Assessment & Report Generator</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-slate-400">Class Target</div>
                        <div className="text-white font-bold text-base mt-1">Class JHS 3</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-slate-400">Enrolled</div>
                        <div className="text-white font-bold text-base mt-1">48 Students</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-slate-400">Average Grade</div>
                        <div className="text-blue-400 font-bold text-base mt-1">Grade 1 (84.6%)</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-slate-400">Reports Issued</div>
                        <div className="text-emerald-400 font-bold text-base mt-1">48 / 48 (100%)</div>
                      </div>
                    </div>
                  </div>
                )}

                {demoTab === 'sms' && (
                  <div className="space-y-3 font-sans">
                    <div className="text-white font-bold text-sm">Automated Parent Dispatch Queue</div>
                    <div className="p-3 bg-blue-950/40 rounded-lg border border-blue-500/30 text-xs space-y-1">
                      <div className="text-blue-300 font-semibold">[SMS Sent] To: 1,248 Parent Phone Contacts</div>
                      <div className="text-slate-300 font-mono italic">
                        "Dear Parent, Terminal Report for Term 1 is now available on parent portal: portal.graceacademy.edu.gh/report. Fees outstanding: ₵0.00. Thank you."
                      </div>
                    </div>
                  </div>
                )}

                {demoTab === 'staff' && (
                  <div className="space-y-2 font-sans text-xs">
                    <div className="text-white font-bold text-sm mb-2">Staff Attendance & Payroll Ledger</div>
                    <div className="flex justify-between items-center p-2.5 bg-white/5 rounded-lg">
                      <span>32 Teaching & Administrative Staff</span>
                      <span className="text-emerald-400 font-mono">100% Verified Present Today</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
                  <div className="text-blue-400 font-semibold">Security & Access</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>256-bit SSL encryption on all API routes</li>
                    <li>Granular role-based user permissions</li>
                    <li>Daily automated cloud database snapshots</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
                  <div className="text-blue-400 font-semibold">Integrations</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>MTN MoMo, Telecel Cash & AT Money APIs</li>
                    <li>Paystack Card Gateway</li>
                    <li>Hubtel Bulk SMS Network</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <h4 className="text-lg font-bold text-white">Deploy {product.name} for your institution</h4>
              <p className="text-xs text-slate-300 mt-1">Get custom setup, staff onboarding, and local payment integration within 5 business days.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPlanner(`Deployment inquiry for ${product.name}`);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap"
            >
              Request Live Demo & Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
