import React from 'react';
import { ArrowRight, CheckCircle2, Clock, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { usePointerSpotlight } from '../hooks';
import { Reveal } from './Reveal';

interface CTAProps {
  content: SiteContent['cta'];
  onOpenPlanner: (topic?: string) => void;
}

const PROMISES = [
  'A written scope and fixed quote before any code is committed',
  'Weekly demos so you see progress, not status reports',
  'Source code and data ownership handed over on delivery',
];

// wa.me requires Ghana's country code and omits the local leading zero.
const WHATSAPP_CHAT_URL = 'https://wa.me/233531152121';

export const CTA: React.FC<CTAProps> = ({ content, onOpenPlanner }) => {
  const spotlight = usePointerSpotlight<HTMLElement>();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      ref={spotlight.ref}
      onPointerMove={spotlight.onPointerMove}
      onPointerLeave={spotlight.onPointerLeave}
      className="relative bg-[#08111F] py-24 md:py-32 text-white overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-blue-600/20 rounded-full blur-[170px] animate-aurora" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[130px]" />
        {spotlight.pos && (
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[110px] bg-indigo-400/15"
            style={{
              left: `calc(${spotlight.pos.x * 100}% - 200px)`,
              top: `calc(${spotlight.pos.y * 100}% - 200px)`,
            }}
          />
        )}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Pitch */}
          <Reveal className="lg:col-span-3">
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

            <p className="text-base text-slate-400 leading-relaxed mt-4 max-w-xl">{content.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-8 pt-7 border-t border-white/10">
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

          {/* What you get */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                What happens next
              </div>

              <ol className="mt-4 space-y-4">
                {[
                  ['You tell us the problem', 'Four questions, about two minutes. No sales script.'],
                  ['We come back within 2 hours', 'With a first read on scope, approach and rough cost.'],
                  ['You get a written proposal', 'Fixed price, fixed milestones, nothing hidden in the margins.'],
                ].map(([title, detail], index) => (
                  <li key={title} className="flex gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-500/25 text-blue-300 grid place-items-center text-[11px] font-black shrink-0">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-bold text-white">{title}</span>
                      <span className="block text-[12px] text-slate-400 leading-snug mt-0.5">{detail}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
                {PROMISES.map((promise) => (
                  <div key={promise} className="flex items-start gap-2 text-[12px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    {promise}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
