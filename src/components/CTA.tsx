import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { Reveal } from './Reveal';

interface CTAProps {
  content: SiteContent['cta'];
  onOpenPlanner: (topic?: string) => void;
}

// wa.me requires Ghana's country code and omits the local leading zero.
const WHATSAPP_CHAT_URL = 'https://wa.me/233531152121';

export const CTA: React.FC<CTAProps> = ({ content, onOpenPlanner }) => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-[#08111F] py-24 md:py-32 text-white overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-blue-600/20 rounded-full blur-[170px] animate-aurora" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-semibold">
              {/* <Sparkles className="w-3.5 h-3.5 text-amber-400" /> */}
              {content.eyebrow}
            </div>

            <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-[3.2rem] font-extrabold tracking-tight leading-[1.1] mt-4">
              {content.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
                {content.highlight}
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">{content.description}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => onOpenPlanner(content.primaryTopic)}
                className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                {content.primaryLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 font-semibold text-sm border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                {content.whatsappLabel}
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-2 border-t border-white/10 pt-7 sm:grid-cols-3">
              {content.contactCards.map((card) => {
                const Icon = getIcon(card.iconName, ShieldCheck);
                return (
                  <div
                    key={card.label}
                    className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-2 text-[11.5px] text-slate-400 transition-colors hover:border-white/20 hover:text-slate-200"
                  >
                    <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{card.label}</span>
                  </div>
                );
              })}
            </div>
        </Reveal>
      </div>
    </section>
  );
};
