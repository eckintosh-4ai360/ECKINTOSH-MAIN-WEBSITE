import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { subscribeAdminCaseStudies, addCaseStudy, updateCaseStudy, deleteCaseStudy, type ManagedCaseStudy, type CaseStudyInput } from '../lib/caseStudies';
import { ProjectForm } from './ProjectForm';

export const ProjectsPanel: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<ManagedCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedCaseStudy | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeAdminCaseStudies(
      (data) => {
        setCaseStudies(data);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, []);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (cs: ManagedCaseStudy) => {
    setEditing(cs);
    setFormOpen(true);
  };

  const handleSave = async (data: CaseStudyInput) => {
    if (editing) {
      await updateCaseStudy(editing.id, data);
    } else {
      await addCaseStudy(data);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleDelete = async (cs: ManagedCaseStudy) => {
    if (!confirm(`Delete "${cs.title}" permanently?`)) return;
    try {
      await deleteCaseStudy(cs.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-950">Projects & Case Studies</h2>
          <p className="text-xs text-slate-400 mt-0.5">{caseStudies.length} total · shown on the Featured Work section</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">{error}</p>}
      {loading && <p className="text-xs text-slate-500">Loading projects...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caseStudies.map((cs) => (
          <div key={cs.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-blue-600 uppercase tracking-wider">{cs.industry}</div>
                <h3 className="text-sm font-bold text-slate-950 truncate">{cs.title}</h3>
                <div className="text-xs text-slate-500">{cs.client}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button aria-label={`Edit ${cs.title}`} onClick={() => openEdit(cs)} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-blue-600">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button aria-label={`Delete ${cs.title}`} onClick={() => handleDelete(cs)} className="rounded-lg border border-red-100 bg-red-50 p-2 text-red-500 hover:bg-red-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-xs leading-5 text-slate-500 mt-3 line-clamp-2">{cs.summary}</p>
          </div>
        ))}
      </div>

      {formOpen && (
        <ProjectForm
          initial={editing ?? undefined}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
