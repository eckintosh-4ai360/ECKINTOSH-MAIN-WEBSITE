import React from 'react';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { pillClass } from './ui';
import { Reveal } from './Reveal';

interface CTAProps {
  content: SiteContent['cta'];
  onOpenPlanner: (topic?: string) => void;
}

// wa.me requires Ghana's country code and omits the local leading zero.
const WHATSAPP_CHAT_URL = 'https://wa.me/233531152121';

export const CTA: React.FC<CTAProps> = ({ content, onOpenPlanner }) => (
  <section
    id="contact"
    aria-labelledby="contact-heading"
    className="relative isolate overflow-hidden bg-black py-28 text-white md:py-40"
  >
    {/* The brand wave, pushed back so the headline carries the section. */}
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <img src="/hero-wide.jpg" alt="" loading="lazy" decoding="async" className="hero-bg-drift h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(0,0,0,0.75),rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.6))]" />
    </div>

    <Reveal className="mx-auto max-w-[880px] px-6 text-center">
      <p className="text-[15px] font-semibold text-sky-300">{content.eyebrow}</p>

      <h2
        id="contact-heading"
        className="mt-4 text-[40px] font-bold leading-[1.05] tracking-[-0.025em] sm:text-[52px] md:text-[64px]"
      >
        {content.title} <span className="text-brand-gradient-light">{content.highlight}</span>
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-neutral-300 md:text-[19px]">
        {content.description}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button type="button" onClick={() => onOpenPlanner(content.primaryTopic)} className={pillClass('light', 'lg')}>
          {content.primaryLabel}
        </button>
        <a
          href={WHATSAPP_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={pillClass('ghost-light', 'lg')}
        >
          <MessageSquare className="h-4 w-4 text-emerald-400" />
          {content.whatsappLabel}
        </a>
      </div>

      <ul className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-white/15 pt-8 text-[14px] text-neutral-300">
        {content.contactCards.map((card) => {
          const Icon = getIcon(card.iconName, ShieldCheck);
          return (
            <li key={card.label} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-sky-300" />
              {card.label}
            </li>
          );
        })}
      </ul>
    </Reveal>
  </section>
);
