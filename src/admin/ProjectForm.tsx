import React, { useState } from 'react';
import { X, Plus, Trash2, Save, UploadCloud } from 'lucide-react';
import type { CaseStudy } from '../data/contentData';
import type { CaseStudyInput } from '../lib/caseStudies';
import { uploadMedia } from '../lib/media';

interface ProjectFormProps {
  initial?: CaseStudy;
  onCancel: () => void;
  onSave: (data: CaseStudyInput) => Promise<void>;
}

type ImpactRow = { metric: string; detail: string };
type HighlightRow = { title: string; desc: string };

export const ProjectForm: React.FC<ProjectFormProps> = ({ initial, onCancel, onSave }) => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [client, setClient] = useState(initial?.client ?? '');
  const [industry, setIndustry] = useState(initial?.industry ?? '');
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '));
  const [summary, setSummary] = useState(initial?.summary ?? '');
  const [challenge, setChallenge] = useState(initial?.challenge ?? '');
  const [solution, setSolution] = useState(initial?.solution ?? '');
  const [architecture, setArchitecture] = useState((initial?.architecture ?? []).join('\n'));
  const [technologies, setTechnologies] = useState((initial?.technologies ?? []).join(', '));
  const [heroImage, setHeroImage] = useState(initial?.heroImage ?? '');
  const [impact, setImpact] = useState<ImpactRow[]>(initial?.impact ?? [{ metric: '', detail: '' }]);
  const [uiHighlights, setUiHighlights] = useState<HighlightRow[]>(
    initial?.uiHighlights ?? [{ title: '', desc: '' }]
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateImpact = (idx: number, field: keyof ImpactRow, value: string) => {
    setImpact((rows) => rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };
  const updateHighlight = (idx: number, field: keyof HighlightRow, value: string) => {
    setUiHighlights((rows) => rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const asset = await uploadMedia(file, 'projects');
      setHeroImage(asset.secure_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload media.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !client.trim() || !summary.trim()) {
      setError('Title, client, and summary are required.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        client: client.trim(),
        industry: industry.trim(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        summary: summary.trim(),
        challenge: challenge.trim(),
        solution: solution.trim(),
        architecture: architecture.split('\n').map((a) => a.trim()).filter(Boolean),
        technologies: technologies.split(',').map((t) => t.trim()).filter(Boolean),
        impact: impact.filter((row) => row.metric.trim() || row.detail.trim()),
        heroImage: heroImage.trim(),
        uiHighlights: uiHighlights.filter((row) => row.title.trim() || row.desc.trim()),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50';
  const labelClass = 'mb-1 block text-xs font-semibold text-slate-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/35 p-4 backdrop-blur-sm sm:p-6 md:p-10">
      <div className="relative my-auto flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl shadow-slate-900/20">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 p-5 backdrop-blur-md md:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600">Portfolio management</p>
            <h2 className="mt-1 text-lg font-bold text-slate-950">{initial ? 'Edit project' : 'Add new project'}</h2>
          </div>
          <button aria-label="Close project form" onClick={onCancel} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Acme Retail POS Rollout" />
            </div>
            <div>
              <label className={labelClass}>Client *</label>
              <input className={inputClass} value={client} onChange={(e) => setClient(e.target.value)} placeholder="e.g. Acme Retail Group" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Industry</label>
              <input className={inputClass} value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Retail • POS • Payments" />
            </div>
            <div>
              <label className={labelClass}>Tags (comma separated)</label>
              <input className={inputClass} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Retail, Mobile Money" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Summary *</label>
            <textarea rows={2} className={inputClass} value={summary} onChange={(e) => setSummary(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Challenge</label>
              <textarea rows={3} className={inputClass} value={challenge} onChange={(e) => setChallenge(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Solution</label>
              <textarea rows={3} className={inputClass} value={solution} onChange={(e) => setSolution(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Architecture (one per line)</label>
              <textarea rows={3} className={inputClass} value={architecture} onChange={(e) => setArchitecture(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Technologies (comma separated)</label>
              <textarea rows={3} className={inputClass} value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Hero Image URL</label>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
              <input className={inputClass} value={heroImage} onChange={(e) => setHeroImage(e.target.value)} placeholder="https://res.cloudinary.com/..." />
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                <UploadCloud className="w-3.5 h-3.5" /> {uploading ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} disabled={uploading} className="hidden" />
              </label>
            </div>
            {heroImage && (
              <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {heroImage.match(/\.(mp4|webm|mov)(\?|$)/i) ? (
                  <video src={heroImage} controls className="w-full max-h-56 bg-black" />
                ) : (
                  <img src={heroImage} alt="" className="w-full max-h-56 object-contain bg-black" />
                )}
              </div>
            )}
          </div>

          {/* Impact rows */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelClass}>Impact Metrics</label>
              <button type="button" onClick={() => setImpact((r) => [...r, { metric: '', detail: '' }])} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add row
              </button>
            </div>
            <div className="space-y-2">
              {impact.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-2">
                  <input className={inputClass} placeholder="94%" value={row.metric} onChange={(e) => updateImpact(idx, 'metric', e.target.value)} />
                  <input className={inputClass} placeholder="On-time fee collection" value={row.detail} onChange={(e) => updateImpact(idx, 'detail', e.target.value)} />
                  <button type="button" onClick={() => setImpact((r) => r.filter((_, i) => i !== idx))} className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* UI Highlights rows */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelClass}>Product Experience Highlights</label>
              <button type="button" onClick={() => setUiHighlights((r) => [...r, { title: '', desc: '' }])} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add row
              </button>
            </div>
            <div className="space-y-2">
              {uiHighlights.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-2">
                  <input className={inputClass} placeholder="Live Fleet Tracking" value={row.title} onChange={(e) => updateHighlight(idx, 'title', e.target.value)} />
                  <input className={inputClass} placeholder="Short description" value={row.desc} onChange={(e) => updateHighlight(idx, 'desc', e.target.value)} />
                  <button type="button" onClick={() => setUiHighlights((r) => r.filter((_, i) => i !== idx))} className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
            <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60">
              <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
