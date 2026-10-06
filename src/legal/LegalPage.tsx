import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

const goHome = (e: React.MouseEvent) => {
  e.preventDefault();
  window.location.hash = '';
  window.location.reload();
};

/** Shared shell for the standalone legal pages (#/privacy, #/terms). */
export const LegalPage: React.FC<LegalPageProps> = ({ title, updated, children }) => (
  <div className="min-h-screen bg-[#08111F] text-slate-100 font-sans antialiased">
    <header className="border-b border-black/[0.08] bg-white/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-12 max-w-[1080px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#hero" onClick={goHome} className="flex shrink-0 items-center gap-2" aria-label="Eckintosh home">
          <img src="/logo.png" alt="Eckintosh" className="h-7 w-auto object-contain" />
        </a>
        <a
          href="#hero"
          onClick={goHome}
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:text-neutral-950"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to site
        </a>
      </div>
    </header>

    <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{title}</h1>
      <p className="mt-2 text-xs font-mono text-slate-500">Last updated {updated}</p>

      <div className="mt-10 space-y-8 text-sm text-slate-300 leading-relaxed [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-2.5 [&_p+h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-blue-400 [&_a]:hover:text-blue-300">
        {children}
      </div>
    </main>

    <footer className="border-t border-white/10 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-[11px] text-slate-500 font-mono">
        © {new Date().getFullYear()} Eckintosh Technologies. Accra, Ghana.
      </div>
    </footer>
  </div>
);
