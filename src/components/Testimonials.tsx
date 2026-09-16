import React from 'react';
import { Quote, Sparkles, Star } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { Reveal } from './Reveal';

export const Testimonials: React.FC<{ content: SiteContent['testimonials'] }> = ({ content }) => {
  return (
    <section className="bg-[#F7F9FC] py-20 md:py-28 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading leading-tight">
            {content.title}
          </h2>
          <p className="text-base text-slate-600 mt-4 leading-relaxed font-normal">{content.description}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((test, index) => (
            <Reveal key={test.id} delay={index * 90} className="h-full">
            <div className="h-full p-8 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl lift flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-100" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">"{test.quote}"</p>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[11px] font-semibold text-blue-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>{test.highlight}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 font-heading">{test.author}</div>
                  <div className="text-xs text-slate-500">
                    {test.role} - {test.organization}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{test.location}</div>
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
