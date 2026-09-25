import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { CaseStudy } from '../data/contentData';
import { useBodyScrollLock, useEscape, useFocusTrap } from '../hooks';

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
  useBodyScrollLock(Boolean(caseStudy));
  useEscape(Boolean(caseStudy), onClose);
  const trapRef = useFocusTrap<HTMLDivElement>(Boolean(caseStudy));

  if (!caseStudy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caseStudy.title}
    >
      <div
        ref={trapRef}
        tabIndex={-1}
        className="relative my-auto flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl shadow-slate-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 p-5 backdrop-blur-md md:p-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5" /> Case Study
            </span>
            <h2 className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">{caseStudy.title}</h2>
            <p className="text-sm text-slate-500">{caseStudy.client} • {caseStudy.industry}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
              <span key={tag} className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {tag}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-slate-700">
            <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-700">Executive Summary</h3>
            <p className="text-base font-medium leading-relaxed text-slate-700">{caseStudy.summary}</p>
          </div>

          {/* Impact Metrics Bar */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-600">Key Outcomes & Real Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.impact.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-300">
                  <div className="font-mono text-2xl font-extrabold text-blue-600 md:text-3xl">{item.metric}</div>
                  <div className="mt-1 text-xs text-slate-600">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column: Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                The Challenge
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{caseStudy.challenge}</p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                The Solution
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{caseStudy.solution}</p>
            </div>
          </div>

          {/* UI & Product Experience Highlights */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-600">Product Experience Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.uiHighlights.map((hl, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-1 text-sm font-semibold text-slate-900">{hl.title}</div>
                  <div className="text-xs leading-relaxed text-slate-600">{hl.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture & Tech Stack */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-600">Technologies & Architecture</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span key={tech} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-slate-50 p-6 sm:flex-row">
            <div>
              <h4 className="text-lg font-bold text-slate-900">Have a similar operational challenge?</h4>
              <p className="mt-1 text-xs text-slate-600">We can design, build and deploy a modern custom solution for your enterprise.</p>
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
