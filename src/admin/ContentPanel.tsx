import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCcw, Save } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { loadAdminContent, saveAdminContent } from '../lib/adminContent';
import { useSiteContent } from '../lib/siteContent';

const ALL = '__all__';

const SECTION_LABELS: Record<string, string> = {
  brand: 'Brand',
  navigation: 'Navigation',
  hero: 'Hero',
  trustBar: 'Trust bar',
  services: 'Services',
  products: 'Systems / products',
  industries: 'Industries',
  caseStudies: 'Case studies section',
  whyUs: 'Why us',
  howWeWork: 'How we work',
  techStack: 'Tech stack',
  testimonials: 'Testimonials',
  insights: 'Insights',
  cta: 'Contact CTA',
  footer: 'Footer',
  planner: 'Project planner',
};

/**
 * Raw content editor. The payload is large, so it can be edited one section
 * at a time; saving a section merges it back into the full document.
 */
export const ContentPanel: React.FC = () => {
  const { refresh } = useSiteContent();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [section, setSection] = useState<string>('products');
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const sections = useMemo(() => {
    if (!content) return [];
    return Object.keys(content).filter((key) => key !== 'contentVersion');
  }, [content]);

  const showSection = (source: SiteContent, key: string) => {
    const value = key === ALL ? source : (source as unknown as Record<string, unknown>)[key];
    setJsonText(JSON.stringify(value, null, 2));
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const next = await loadAdminContent();
      setContent(next);
      const key = Object.prototype.hasOwnProperty.call(next, section) ? section : ALL;
      setSection(key);
      showSection(next, key);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSectionChange = (key: string) => {
    if (!content) return;
    setSection(key);
    setSaved(false);
    setError(null);
    showSection(content, key);
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const parsed = JSON.parse(jsonText);
      const payload = (section === ALL ? parsed : { ...content, [section]: parsed }) as SiteContent;
      const savedContent = await saveAdminContent(payload);
      setContent(savedContent);
      showSection(savedContent, section);
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
          <p className="text-xs text-slate-400 mt-0.5">
            Edit one section at a time, or the whole payload. Saving merges your section back into the document.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={section}
            onChange={(event) => handleSectionChange(event.target.value)}
            disabled={loading || saving || !content}
            className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500 disabled:opacity-60"
          >
            <option value={ALL}>Everything</option>
            {sections.map((key) => (
              <option key={key} value={key}>
                {SECTION_LABELS[key] ?? key}
              </option>
            ))}
          </select>

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
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Content'}
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {saved && <p className="text-xs text-emerald-400">Saved.</p>}
      {loading && <p className="text-xs text-slate-400">Loading content…</p>}

      <textarea
        value={jsonText}
        onChange={(event) => setJsonText(event.target.value)}
        spellCheck={false}
        className="min-h-[620px] w-full rounded-2xl bg-slate-950 border border-white/10 p-4 text-xs leading-relaxed text-slate-200 font-mono focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};
