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
          <h2 className="text-lg font-bold text-white">Projects & Case Studies</h2>
          <p className="text-xs text-slate-400 mt-0.5">{caseStudies.length} total · shown on the Featured Work section</p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {loading && <p className="text-xs text-slate-400">Loading projects...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caseStudies.map((cs) => (
          <div key={cs.id} className="p-5 rounded-2xl bg-[#0F1D33] border border-white/10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">{cs.industry}</div>
                <h3 className="text-sm font-bold text-white truncate">{cs.title}</h3>
                <div className="text-xs text-slate-400">{cs.client}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => openEdit(cs)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(cs)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-3 line-clamp-2">{cs.summary}</p>
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
