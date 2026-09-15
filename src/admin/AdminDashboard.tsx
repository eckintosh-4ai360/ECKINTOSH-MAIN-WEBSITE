import React, { useState } from 'react';
import { Layers, LogOut, Inbox, FolderKanban, FileJson, Image } from 'lucide-react';
import { signOutAdmin } from '../lib/adminAuth';
import { InquiriesPanel } from './InquiriesPanel';
import { ProjectsPanel } from './ProjectsPanel';
import { ContentPanel } from './ContentPanel';
import { MediaPanel } from './MediaPanel';

type Tab = 'content' | 'projects' | 'inquiries' | 'media';

export const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<Tab>('content');

  return (
    <div className="min-h-screen bg-[#08111F] text-slate-100">
      <header className="border-b border-white/10 bg-[#0B1528]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'hero';
              window.location.reload();
            }}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-white font-heading">
              Eckintosh<span className="text-blue-500">.</span> Admin
            </span>
          </a>
          <button
            onClick={() => signOutAdmin()}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 pb-3">
          <button
            onClick={() => setTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              tab === 'content' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" /> Website Content
          </button>
          <button
            onClick={() => setTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              tab === 'projects' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" /> Projects
          </button>
          <button
            onClick={() => setTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              tab === 'inquiries' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" /> Order Requests & Messages
          </button>
          <button
            onClick={() => setTab('media')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              tab === 'media' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Image className="w-3.5 h-3.5" /> Media
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        {tab === 'content' && <ContentPanel />}
        {tab === 'projects' && <ProjectsPanel />}
        {tab === 'inquiries' && <InquiriesPanel />}
        {tab === 'media' && <MediaPanel />}
      </main>
    </div>
  );
};
