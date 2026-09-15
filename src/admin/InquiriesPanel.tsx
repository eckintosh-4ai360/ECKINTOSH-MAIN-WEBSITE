import React, { useEffect, useMemo, useState } from 'react';
import { Mail, Phone, Building2, Trash2, ChevronDown, ChevronUp, Circle, CheckCircle2, Archive } from 'lucide-react';
import { subscribeInquiries, updateInquiryStatus, deleteInquiry, type Inquiry, type InquiryStatus } from '../lib/inquiries';

const STATUS_FILTERS: { label: string; value: InquiryStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Archived', value: 'archived' },
];

const statusStyles: Record<InquiryStatus, string> = {
  new: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  read: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  archived: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
};

export const InquiriesPanel: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeInquiries(
      (data) => {
        setInquiries(data);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, []);

  const filtered = useMemo(
    () => (statusFilter === 'all' ? inquiries : inquiries.filter((i) => i.status === statusFilter)),
    [inquiries, statusFilter]
  );

  const newCount = inquiries.filter((i) => i.status === 'new').length;

  const toggleExpand = (inq: Inquiry) => {
    const opening = expandedId !== inq.id;
    setExpandedId(opening ? inq.id : null);
    if (opening && inq.status === 'new') {
      updateInquiryStatus(inq.id, 'read').catch(console.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry permanently?')) return;
    try {
      await deleteInquiry(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Order Requests & Messages</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {inquiries.length} total{newCount > 0 && <span className="text-blue-400 font-semibold"> · {newCount} new</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-xs text-slate-400">Loading inquiries...</p>}

      {!loading && filtered.length === 0 && (
        <div className="p-8 rounded-2xl bg-[#0F1D33] border border-white/10 text-center text-sm text-slate-400">
          No inquiries here yet.
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((inq) => {
          const expanded = expandedId === inq.id;
          return (
            <div key={inq.id} className="rounded-2xl bg-[#0F1D33] border border-white/10 overflow-hidden">
              <button
                onClick={() => toggleExpand(inq)}
                className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {inq.status === 'new' ? (
                    <Circle className="w-2.5 h-2.5 text-blue-400 fill-blue-400 shrink-0" />
                  ) : (
                    <span className="w-2.5 h-2.5 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white truncate">{inq.fullName || 'Unnamed'}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusStyles[inq.status]}`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {inq.projectType} {inq.organization && `· ${inq.organization}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : ''}
                  </span>
                  {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {expanded && (
                <div className="px-4 md:px-5 pb-5 pt-1 border-t border-white/10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-slate-500" /> {inq.phone || '—'}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-slate-500" /> {inq.email || '—'}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" /> {inq.organization || '—'}
                    </div>
                    <div className="text-slate-300">
                      <span className="text-slate-500">Timeline:</span> {inq.timeline} &nbsp;
                      <span className="text-slate-500">Budget:</span> {inq.budget}
                    </div>
                  </div>

                  {inq.notes && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 leading-relaxed">
                      {inq.notes}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    {inq.status !== 'read' && (
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'read')}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Read
                      </button>
                    )}
                    {inq.status !== 'archived' && (
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'archived')}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5"
                      >
                        <Archive className="w-3.5 h-3.5" /> Archive
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-300 flex items-center gap-1.5 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
