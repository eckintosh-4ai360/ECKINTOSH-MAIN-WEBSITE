import React from 'react';
import { ChevronRight, Code2 } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { SERVICE_PHOTOS } from '../data/siteMedia';
import { getIcon } from '../lib/icons';
import { Photo, SectionHeading } from './ui';
import { Reveal } from './Reveal';

interface WhatWeDoProps {
  content: SiteContent['services'];
  onOpenPlanner: (topic?: string) => void;
}

/** The ways clients can work with us, as photo cards that go straight to contact. */
export const WhatWeDo: React.FC<WhatWeDoProps> = ({ content, onOpenPlanner }) => (
  <section id="services" aria-labelledby="services-heading" className="bg-[#f5f5f7] py-20 text-neutral-950 md:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8">
      <Reveal className="mb-10 md:mb-14">
        <SectionHeading id="services-heading" lead={content.eyebrow} rest={content.title} description={content.description} />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.slice(0, 5).map((service, index) => {
          const Icon = getIcon(service.iconName, Code2);
          const photo = SERVICE_PHOTOS[service.id];
          return (
            <Reveal key={service.id} delay={index * 70} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  {photo ? (
                    <Photo
                      photo={photo}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-blue-600">
                      <Icon className="h-12 w-12" />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-blue-600 shadow-sm backdrop-blur-md">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[21px] font-semibold leading-snug tracking-[-0.01em]">{service.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{service.shortDesc}</p>
                  <button
                    type="button"
                    onClick={() => onOpenPlanner(`Service inquiry: ${service.title}`)}
                    className="mt-auto inline-flex items-center gap-0.5 self-start pt-6 text-[15px] font-medium text-blue-600 hover:underline"
                  >
                    Discuss with us <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
