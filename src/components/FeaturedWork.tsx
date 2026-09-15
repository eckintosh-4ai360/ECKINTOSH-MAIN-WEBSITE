import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Filter, Sparkles } from 'lucide-react';
import type { CaseStudy, SiteContent } from '../data/contentData';
import { subscribeCaseStudies, type ManagedCaseStudy } from '../lib/caseStudies';

interface FeaturedWorkProps {
  content: SiteContent['caseStudies'];
  onSelectCaseStudy: (cs: CaseStudy) => void;
  onOpenPlanner: (topic?: string) => void;
}

const PAGE_SIZE = 6;

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ content, onSelectCaseStudy, onOpenPlanner }) => {
  const [filter, setFilter] = useState<string>('All');
  const [caseStudies, setCaseStudies] = useState<ManagedCaseStudy[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    const unsubscribe = subscribeCaseStudies(setCaseStudies, (err) => console.error('Failed to load case studies:', err));
    return unsubscribe;
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter]);

  const filterCategories = content.filters.length ? content.filters : ['All'];
  const filteredStudies =
    filter === 'All' ? caseStudies : caseStudies.filter((cs) => cs.tags.includes(filter) || cs.industry.includes(filter));
  const visibleStudies = filteredStudies.slice(0, visibleCount);
  const hasMore = filteredStudies.length > visibleStudies.length;

  return (
    <section id="work" className="bg-[#0B1528] py-20 md:py-28 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              {content.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-3 font-heading leading-tight">
              {content.title}
            </h2>
            <p className="text-base text-slate-300 mt-4 leading-relaxed font-normal">{content.description}</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filter === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {visibleStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-2xl bg-[#0F1D33] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-blue-500/40 hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6 md:p-7 space-y-5">
                <div>
                  <div className="text-[11px] font-mono text-blue-400 font-semibold uppercase tracking-wider mb-1">
                    {cs.industry}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors font-heading">
                    {cs.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 font-mono">{cs.client}</div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">{cs.summary}</p>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold font-mono">
                    Measurable Impact
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-blue-400 font-mono">{cs.impact[0]?.metric}</span>
                    <span className="text-xs text-slate-300">{cs.impact[0]?.detail}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cs.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/10 text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectCaseStudy(cs)}
                  className="w-full py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-semibold text-xs border border-blue-500/30 transition-all flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center gap-2 transition-all"
            >
              <span>Read More Case Studies ({filteredStudies.length - visibleStudies.length} more)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">{content.bannerTitle}</div>
              <div className="text-xs text-slate-300">{content.bannerDescription}</div>
            </div>
          </div>
          <button
            onClick={() => onOpenPlanner(content.bannerCtaTopic)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs whitespace-nowrap shadow-lg shadow-blue-600/20"
          >
            {content.bannerCtaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};
