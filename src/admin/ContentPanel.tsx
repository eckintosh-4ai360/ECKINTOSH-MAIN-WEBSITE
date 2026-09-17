import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCcw, RotateCcw, Save } from 'lucide-react';
import { DEFAULT_SITE_CONTENT, type SiteContent } from '../data/contentData';
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

  /**
   * Replace the editor with what the current build ships for this section.
   * Useful when a record saved by an older build is shadowing new defaults
   * (contact details, new list items) that were never edited by hand.
   */
  const handleLoadDefaults = () => {
    const value =
      section === ALL
        ? DEFAULT_SITE_CONTENT
        : (DEFAULT_SITE_CONTENT as unknown as Record<string, unknown>)[section];
    if (value === undefined) {
      setError(`The current build ships no defaults for "${section}".`);
      return;
    }
    setError(null);
    setSaved(false);
    setJsonText(JSON.stringify(value, null, 2));
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
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-base font-bold text-slate-950">Choose a section to edit</h2>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
            Edit one section at a time, or the whole payload. Saving merges your section back into the document.
            “Shipped defaults” loads what this build ships, so you can review before saving over a stale record.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={section}
            onChange={(event) => handleSectionChange(event.target.value)}
            disabled={loading || saving || !content}
            className="min-w-40 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
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
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Reload
          </button>
          <button
            onClick={handleLoadDefaults}
            disabled={loading || saving}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-60"
            title="Replace the editor with this build's shipped content for the selected section. Nothing is saved until you press Save."
          >
            <RotateCcw className="w-3.5 h-3.5" /> Shipped defaults
          </button>
          <button
            onClick={handleSave}
            disabled={loading || saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Content'}
          </button>
        </div>
      </div>

      {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">{error}</p>}
      {saved && <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">Content saved successfully.</p>}
      {loading && <p className="text-xs text-slate-400">Loading content…</p>}

      <textarea
        value={jsonText}
        onChange={(event) => setJsonText(event.target.value)}
        spellCheck={false}
        className="min-h-[620px] w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs leading-relaxed text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      />
    </div>
  );
};
