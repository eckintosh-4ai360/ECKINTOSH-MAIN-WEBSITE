import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  FileJson,
  FolderKanban,
  Image,
  Inbox,
  Layers,
  LogOut,
  PanelLeft,
  Search,
  Settings,
  X,
} from 'lucide-react';
import { signOutAdmin } from '../lib/adminAuth';
import { searchAdmin, type AdminSearchResult } from '../lib/adminSearch';
import { InquiriesPanel } from './InquiriesPanel';
import { ProjectsPanel } from './ProjectsPanel';
import { ContentPanel } from './ContentPanel';
import { MediaPanel } from './MediaPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import { SettingsPanel } from './SettingsPanel';

type Tab = 'content' | 'projects' | 'inquiries' | 'media' | 'analytics' | 'settings';

const navigation: { id: Tab; label: string; description: string; icon: typeof FileJson }[] = [
  { id: 'content', label: 'Website content', description: 'Copy, navigation & sections', icon: FileJson },
  { id: 'projects', label: 'Projects', description: 'Case studies & featured work', icon: FolderKanban },
  { id: 'inquiries', label: 'Inbox', description: 'Requests & contact messages', icon: Inbox },
  { id: 'media', label: 'Media library', description: 'Images and video uploads', icon: Image },
  { id: 'analytics', label: 'Traffic', description: 'First-party pageview analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', description: 'Email notifications & integrations', icon: Settings },
];

const pageCopy: Record<Tab, { eyebrow: string; title: string; description: string }> = {
  content: {
    eyebrow: 'Content management',
    title: 'Keep the website current.',
    description: 'Update the words, links, services and systems visitors see across the site.',
  },
  projects: {
    eyebrow: 'Portfolio management',
    title: 'Show the work with context.',
    description: 'Create and maintain the case studies shown in Featured Work.',
  },
  inquiries: {
    eyebrow: 'Client inbox',
    title: 'Turn interest into conversations.',
    description: 'Review incoming project requests and keep your follow-ups organized.',
  },
  media: {
    eyebrow: 'Asset management',
    title: 'Upload once, use anywhere.',
    description: 'Store image and video assets, then paste the secure URL into your content.',
  },
  analytics: {
    eyebrow: 'Traffic',
    title: 'See what visitors are looking at.',
    description: 'Cookie-free pageview counts collected straight from this site — no third-party script.',
  },
  settings: {
    eyebrow: 'Configuration',
    title: 'Know the moment someone reaches out.',
    description: 'Connect a Gmail account so every new inquiry lands in your inbox as well as the admin inbox.',
  },
};

export const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<Tab>('content');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AdminSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchTarget, setSearchTarget] = useState<{ scope: Tab; target: string } | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const activePage = pageCopy[tab];

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInput.current?.focus();
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < 2) {
      setSearchResults([]);
      setSearching(false);
      setSearchError(null);
      return;
    }

    let active = true;
    const timer = window.setTimeout(async () => {
      setSearching(true);
      setSearchError(null);
      try {
        const results = await searchAdmin(query);
        if (active) setSearchResults(results);
      } catch (error) {
        if (active) {
          setSearchResults([]);
          setSearchError(error instanceof Error ? error.message : 'Search could not be completed.');
        }
      } finally {
        if (active) setSearching(false);
      }
    }, 220);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [searchQuery]);

  const selectTab = (nextTab: Tab) => {
    setTab(nextTab);
    setSidebarOpen(false);
    setSearchTarget(null);
  };

  const openSearchResult = (result: AdminSearchResult) => {
    selectTab(result.scope);
    setSearchTarget({ scope: result.scope, target: result.target });
    setSearchQuery('');
    setSearchResults([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[278px] flex-col border-r border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 transition-transform lg:translate-x-0 lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            window.location.hash = 'hero';
            window.location.reload();
          }}
          className="mb-9 flex items-center gap-3 rounded-2xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Layers className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-extrabold tracking-tight text-slate-950">
              Eckintosh<span className="text-blue-600">.</span>
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Admin workspace</span>
          </span>
        </a>

        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Workspace</div>
        <nav className="space-y-1.5" aria-label="Admin sections">
          {navigation.map(({ id, label, description, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => selectTab(id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  active ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active ? 'bg-white/15' : 'bg-slate-100 text-slate-500 group-hover:bg-white'}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold">{label}</span>
                  <span className={`mt-0.5 block truncate text-[10px] ${active ? 'text-blue-100' : 'text-slate-400'}`}>{description}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              window.location.hash = 'hero';
              window.location.reload();
            }}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            View website <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => signOutAdmin()}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[278px]">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-lg sm:px-7 lg:px-10">
          <div className="mx-auto flex max-w-7xl items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
              aria-label="Open navigation"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
            <div className="hidden shrink-0 text-xs font-medium text-slate-400 xl:block">Eckintosh / <span className="text-slate-700">{navigation.find((item) => item.id === tab)?.label}</span></div>
            <div className="relative min-w-0 flex-1 lg:max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInput}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setSearchQuery('');
                    searchInput.current?.blur();
                  }
                }}
                placeholder="Search all admin content…"
                aria-label="Search all admin content"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-16 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : (
                <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-400 lg:block">⌘ K</span>
              )}

              {searchQuery.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.55rem)] max-h-[min(32rem,calc(100vh-5rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Search results</span>
                    <span className="text-[10px] text-slate-400">{searching ? 'Searching…' : `${searchResults.length} found`}</span>
                  </div>
                  {searchError && <p className="mx-2 mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{searchError}</p>}
                  {!searching && !searchError && searchResults.length === 0 && (
                    <p className="px-3 py-5 text-center text-xs text-slate-500">No matching text found in your admin data.</p>
                  )}
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => openSearchResult(result)}
                      className="block w-full rounded-xl px-3 py-3 text-left transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="mb-1 flex items-center justify-between gap-3">
                        <span className="truncate text-xs font-bold text-slate-800">{result.title}</span>
                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">{result.scope}</span>
                      </span>
                      <span className="block truncate text-[11px] font-medium text-blue-600">{result.subtitle}</span>
                      {result.match && <span className="mt-1 block line-clamp-2 text-[11px] leading-4 text-slate-500">{result.match}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pl-1 pr-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-extrabold text-blue-700">EA</span>
              <span className="text-[11px] font-semibold text-slate-600">Admin</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-7 lg:px-10 lg:py-10">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">{activePage.eyebrow}</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{activePage.title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">{activePage.description}</p>
          </div>

          {tab === 'content' && <ContentPanel targetSection={searchTarget?.scope === 'content' ? searchTarget.target : undefined} />}
          {tab === 'projects' && <ProjectsPanel targetId={searchTarget?.scope === 'projects' ? searchTarget.target : undefined} />}
          {tab === 'inquiries' && <InquiriesPanel targetId={searchTarget?.scope === 'inquiries' ? searchTarget.target : undefined} />}
          {tab === 'media' && <MediaPanel targetId={searchTarget?.scope === 'media' ? searchTarget.target : undefined} />}
          {tab === 'analytics' && <AnalyticsPanel />}
          {tab === 'settings' && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
};
