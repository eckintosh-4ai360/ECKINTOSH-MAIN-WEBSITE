import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';

interface CTAProps {
  content: SiteContent['cta'];
  onOpenPlanner: (topic?: string) => void;
}

export const CTA: React.FC<CTAProps> = ({ content, onOpenPlanner }) => {
  return (
    <section id="contact" className="relative bg-navy-dark py-24 md:py-32 text-white overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{content.eyebrow}</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-heading max-w-4xl mx-auto">
          {content.title}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
            {content.highlight}
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenPlanner(content.primaryTopic)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-2 group hover:scale-[1.02]"
          >
            <span>{content.primaryLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={content.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold text-sm border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{content.whatsappLabel}</span>
          </a>
        </div>

        <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400 max-w-3xl mx-auto">
          {content.contactCards.map((card) => {
            const Icon = getIcon(card.iconName, ShieldCheck);
            return (
              <div
                key={card.label}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center gap-2"
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span>{card.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
