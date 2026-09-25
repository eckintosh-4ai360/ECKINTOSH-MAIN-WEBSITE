import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { getIcon as lookupIcon } from '../lib/icons';

interface WhatWeDoProps {
  content: SiteContent['services'];
  onOpenPlanner: (serviceName?: string, startAtContact?: boolean) => void;
}

/** A focused overview of the five ways clients can work with us. */
export const WhatWeDo: React.FC<WhatWeDoProps> = ({ content, onOpenPlanner }) => {
  const getIcon = (iconName: string) => {
    const Icon = lookupIcon(iconName, Code2);
    return <Icon className="h-6 w-6 text-blue-600" />;
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-slate-200 bg-[#F7F9FC] py-10 text-slate-900 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="rounded-full border border-blue-200 bg-blue-100/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
            {content.eyebrow}
          </span>
          <h2
            id="services-heading"
            className="mt-3 font-heading text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
          >
            {content.title}
          </h2>
          <p className="mt-4 text-base font-normal leading-relaxed text-slate-600">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.slice(0, 5).map((service) => (
            <article
              key={service.id}
              className="flex min-h-[19rem] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div>
                <div className="mb-4 w-fit rounded-xl bg-slate-100/80 p-3">{getIcon(service.iconName)}</div>
                <h3 className="font-heading text-xl font-bold leading-snug text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm font-normal leading-relaxed text-slate-600">{service.shortDesc}</p>
              </div>

              <button
                type="button"
                onClick={() => onOpenPlanner(`Service inquiry: ${service.title}`, true)}
                className="group mt-auto flex w-full items-center justify-between border-t border-slate-100 pt-6 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
              >
                Discuss with Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
