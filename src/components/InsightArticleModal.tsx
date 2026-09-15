import React from 'react';
import { X, Clock, Calendar, Share2, Check, ArrowRight, BookOpen } from 'lucide-react';
import { InsightArticle } from '../data/contentData';

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

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#0F1D33] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 md:p-6 bg-[#08111F]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Content */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div>
            <h1 className="text-xl md:text-3xl font-extrabold text-white leading-tight">{article.title}</h1>
            <div className="flex items-center justify-between mt-4 pb-4 border-b border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 font-bold text-white flex items-center justify-center text-xs">
                  {article.author.avatar}
                </div>
                <div>
                  <div className="text-white font-medium">{article.author.name}</div>
                  <div className="text-slate-400 text-[11px]">{article.author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                <button 
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="p-5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-slate-200">
            <h3 className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Key Insights & Action Items
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
            {article.contentParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Call to Action Box */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="text-base font-bold text-white">Ready to implement these solutions in your organization?</h4>
              <p className="text-xs text-slate-300 mt-1">Talk to our software engineering team in Accra today.</p>
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
