import React from 'react';
import { Quote, Star } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { Reveal } from './Reveal';

export const Testimonials: React.FC<{ content: SiteContent['testimonials'] }> = ({ content }) => {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-[#F7F9FC] py-16 md:py-20 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-8 md:mb-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100/80 px-2.5 py-1 rounded-full border border-blue-200">
            {content.eyebrow}
          </span>
          <h2 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading leading-tight">
            {content.title}
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed font-normal">{content.description}</p>
        </Reveal>

        <div
          className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3"
          aria-label="Client testimonials"
          role="region"
        >
          {content.items.map((test, index) => (
            <Reveal
              key={test.id}
              delay={index * 70}
              className="h-full shrink-0 snap-start basis-[86%] sm:basis-[calc((100%-0.75rem)/2)] lg:basis-[calc((100%-2.25rem)/4)]"
            >
            <div className="h-full min-h-[244px] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md lift flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-blue-100" />
                </div>

                <p className="text-[11px] text-slate-700 leading-[1.55] font-normal italic">"{test.quote}"</p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 font-heading">{test.author}</div>
                  <div className="text-[10px] text-slate-500 leading-snug">
                    {test.role} - {test.organization}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono">{test.location}</div>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
