import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, MessageSquare, Send, X } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { submitInquiry } from '../lib/inquiries';
import { useBodyScrollLock, useEscape, useFocusTrap } from '../hooks';

interface ProjectPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  content: SiteContent['planner'];
}

export const ProjectPlannerModal: React.FC<ProjectPlannerModalProps> = ({ isOpen, onClose, initialTopic = '', content }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [projectType, setProjectType] = useState<string>(content.defaultProjectType);
  const [timeline, setTimeline] = useState<string>(content.defaultTimeline);
  const [budget, setBudget] = useState<string>(content.defaultBudget);
  const [fullName, setFullName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTopic) {
      setNotes(`Interested in: ${initialTopic}`);
    }
  }, [initialTopic]);

  useEffect(() => {
    setProjectType((current) => current || content.defaultProjectType);
    setTimeline((current) => current || content.defaultTimeline);
    setBudget((current) => current || content.defaultBudget);
  }, [content.defaultBudget, content.defaultProjectType, content.defaultTimeline]);

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    setError(null);
    onClose();
  };

  useBodyScrollLock(isOpen);
  useEscape(isOpen, resetForm);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitInquiry({
        projectType,
        timeline,
        budget,
        fullName,
        organization,
        phone,
        email,
        notes,
      });
      setSubmitted(true);
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  // A plain anchor rather than window.open: popup blockers on mobile Safari
  // and in-app browsers silently swallow scripted opens, leaving the button dead.
  const whatsappDirectUrl =
    `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(
      `Hello Eckintosh Technologies,\n\nI want to start a project:\n- Service: ${projectType}\n- Timeline: ${timeline}\n- Name: ${fullName}\n- Organization: ${organization}\n- Phone: ${phone}\n- Notes: ${notes || 'N/A'}`
    )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={resetForm}
      role="dialog"
      aria-modal="true"
      aria-label={content.title}
    >
      <div
        ref={trapRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl bg-[#0F1D33] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 md:p-6 bg-[#08111F]/90 backdrop-blur-md border-b border-white/10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">{content.eyebrow}</div>
            <h2 className="text-xl font-bold text-white mt-0.5">{content.title}</h2>
          </div>
          <button
            onClick={resetForm}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted && (
          <div className="flex border-b border-white/10 bg-[#08111F]/50 px-6 py-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400/50'
                      : step > s
                        ? 'bg-emerald-500 text-slate-950 font-extrabold'
                        : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s ? 'OK' : s}
                </div>
                <span className={`text-xs hidden sm:inline ${step === s ? 'text-white font-semibold' : 'text-slate-400'}`}>
                  {s === 1 ? 'Solution Type' : s === 2 ? 'Timeline & Budget' : 'Contact Details'}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300">{content.projectTypePrompt}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.projectTypeOptions.map((opt) => {
                  const Icon = getIcon(opt.iconName, Building2);
                  const selected = projectType === opt.title;
                  return (
                    <button
                      type="button"
                      key={opt.title}
                      onClick={() => setProjectType(opt.title)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all text-left ${
                        selected
                          ? 'bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/10'
                          : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${selected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{opt.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  Next: Timeline & Budget <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Target Launch Timeline</label>
                <div className="grid grid-cols-3 gap-2">
                  {content.timelineOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTimeline(option)}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                        timeline === option
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-900 text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Estimated Investment Range</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {content.budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBudget(option)}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                        budget === option
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-900 text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  Next: Contact Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame Mensah"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / School Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex High School / Grace Ltd"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +233 24 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. kwame@organization.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Details or Questions</label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you're trying to build or solve..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
                >
                  <Send className="w-3.5 h-3.5" /> {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">{content.successTitle}</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{fullName}</span>. {content.successDescription} ({projectType})
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 text-left space-y-1">
                <div>
                  <span className="text-slate-400">Solution:</span> {projectType}
                </div>
                <div>
                  <span className="text-slate-400">Timeline:</span> {timeline}
                </div>
                <div>
                  <span className="text-slate-400">Phone:</span> {phone}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" /> Connect Directly on WhatsApp
                </a>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
