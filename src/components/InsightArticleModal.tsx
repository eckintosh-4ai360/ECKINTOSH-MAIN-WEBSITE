import React from 'react';
import { X, Clock, Calendar, Share2, Check, ArrowRight, BookOpen } from 'lucide-react';
import { InsightArticle } from '../data/contentData';
import { useBodyScrollLock, useEscape, useFocusTrap } from '../hooks';

interface InsightArticleModalProps {
  article: InsightArticle | null;
  onClose: () => void;
  onOpenPlanner: (topic?: string) => void;
}

export const InsightArticleModal: React.FC<InsightArticleModalProps> = ({
  article,
  onClose,
  onOpenPlanner,
}) => {
  const [copied, setCopied] = React.useState(false);

  useBodyScrollLock(Boolean(article));
  useEscape(Boolean(article), onClose);
  const trapRef = useFocusTrap<HTMLDivElement>(Boolean(article));

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      <div
        ref={trapRef}
        tabIndex={-1}
        className="relative my-auto flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl shadow-slate-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 p-5 backdrop-blur-md md:p-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Content */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div>
            <h1 className="text-xl font-extrabold leading-tight text-slate-900 md:text-3xl">{article.title}</h1>
            <div className="mt-4 flex items-center justify-between border-b border-slate-200 pb-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 font-bold text-white flex items-center justify-center text-xs">
                  {article.author.avatar}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{article.author.name}</div>
                  <div className="text-[11px] text-slate-500">{article.author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1 rounded-lg bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-slate-200"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-xs text-slate-700">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <BookOpen className="w-4 h-4" /> Key Insights & Action Items
            </h3>
            <ul className="list-inside list-disc space-y-1.5 text-slate-700">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-sm font-normal leading-relaxed text-slate-700">
            {article.contentParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Call to Action Box */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-slate-50 p-6 sm:flex-row">
            <div>
              <h4 className="text-base font-bold text-slate-900">Ready to implement these solutions in your organization?</h4>
              <p className="mt-1 text-xs text-slate-600">Talk to our software engineering team in Accra today.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPlanner(`Inquiry from article: ${article.title}`);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap"
            >
              Start a Conversation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
