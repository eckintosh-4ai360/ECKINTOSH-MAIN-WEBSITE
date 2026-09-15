import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { CaseStudy } from '../data/contentData';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenPlanner: (initialTopic?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenPlanner,
}) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0F1D33] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 md:p-6 bg-[#08111F]/90 backdrop-blur-md border-b border-white/10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Case Study
            </span>
            <h2 className="text-xl md:text-2xl font-bold mt-1 text-white">{caseStudy.title}</h2>
            <p className="text-sm text-slate-400">{caseStudy.client} • {caseStudy.industry}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                {tag}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div className="p-5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-slate-200">
            <h3 className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-1">Executive Summary</h3>
            <p className="text-base text-slate-200 font-medium leading-relaxed">{caseStudy.summary}</p>
          </div>

          {/* Impact Metrics Bar */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-3">Key Outcomes & Real Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.impact.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-blue-500/40 transition-all">
                  <div className="text-2xl md:text-3xl font-extrabold text-blue-400 font-mono">{item.metric}</div>
                  <div className="text-xs text-slate-300 mt-1">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column: Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                The Challenge
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.challenge}</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                The Solution
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>

          {/* UI & Product Experience Highlights */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-3">Product Experience Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.uiHighlights.map((hl, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-sm font-semibold text-white mb-1">{hl.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{hl.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture & Tech Stack */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-3">Technologies & Architecture</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <h4 className="text-lg font-bold text-white">Have a similar operational challenge?</h4>
              <p className="text-xs text-slate-300 mt-1">We can design, build and deploy a modern custom solution for your enterprise.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPlanner(`Project based on ${caseStudy.title}`);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap"
            >
              Let's Build It <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
