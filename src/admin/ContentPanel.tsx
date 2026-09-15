import React, { useEffect, useState } from 'react';
import { RefreshCcw, Save } from 'lucide-react';
import { loadAdminContent, saveAdminContent } from '../lib/adminContent';
import { useSiteContent } from '../lib/siteContent';

export const ContentPanel: React.FC = () => {
  const { refresh } = useSiteContent();
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const content = await loadAdminContent();
      setJsonText(JSON.stringify(content, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const parsed = JSON.parse(jsonText);
      const savedContent = await saveAdminContent(parsed);
      setJsonText(JSON.stringify(savedContent, null, 2));
      await refresh();
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid content JSON.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Website Content</h2>
          <p className="text-xs text-slate-400 mt-0.5">Full database-rendered content payload.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={loading || saving}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold flex items-center gap-2 disabled:opacity-60"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Reload
          </button>
          <button
            onClick={handleSave}
            disabled={loading || saving}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {saved && <p className="text-xs text-emerald-400">Saved to Neon.</p>}
      {loading && <p className="text-xs text-slate-400">Loading content...</p>}

      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        spellCheck={false}
        className="min-h-[620px] w-full rounded-2xl bg-slate-950 border border-white/10 p-4 text-xs leading-relaxed text-slate-200 font-mono focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};
