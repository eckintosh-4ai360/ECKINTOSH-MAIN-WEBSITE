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
  new: 'border-blue-100 bg-blue-50 text-blue-700',
  read: 'border-slate-200 bg-slate-100 text-slate-600',
  archived: 'border-amber-100 bg-amber-50 text-amber-700',
};

export const InquiriesPanel: React.FC<{ targetId?: string }> = ({ targetId }) => {
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

  useEffect(() => {
    if (!targetId || !inquiries.some((inquiry) => inquiry.id === targetId)) return;
    setStatusFilter('all');
    setExpandedId(targetId);
    window.requestAnimationFrame(() => {
      document.getElementById(`admin-inquiry-${targetId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [inquiries, targetId]);

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
          <h2 className="text-base font-bold text-slate-950">Order Requests & Messages</h2>
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
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-xs text-slate-500">Loading inquiries...</p>}

      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No inquiries here yet.
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((inq) => {
          const expanded = expandedId === inq.id;
          return (
            <div
              key={inq.id}
              id={`admin-inquiry-${inq.id}`}
              className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${
                targetId === inq.id ? 'border-blue-400 ring-4 ring-blue-100' : 'border-slate-200'
              }`}
            >
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
                      <span className="text-sm font-bold text-slate-950 truncate">{inq.fullName || 'Unnamed'}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusStyles[inq.status]}`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">
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
                <div className="space-y-4 border-t border-slate-100 px-4 pb-5 pt-4 md:px-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-500" /> {inq.phone || '—'}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-500" /> {inq.email || '—'}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" /> {inq.organization || '—'}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-500">Timeline:</span> {inq.timeline} &nbsp;
                      <span className="text-slate-500">Budget:</span> {inq.budget}
                    </div>
                  </div>

                  {inq.notes && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                      {inq.notes}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    {inq.status !== 'read' && (
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'read')}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Read
                      </button>
                    )}
                    {inq.status !== 'archived' && (
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'archived')}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                      >
                        <Archive className="w-3.5 h-3.5" /> Archive
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(inq.id)}
                        className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs text-red-600 hover:bg-red-100"
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
