import React from 'react';
import { CheckCircle2, MapPin, Target } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { PHOTOS } from '../data/siteMedia';
import { getIcon } from '../lib/icons';
import { Photo, SectionHeading } from './ui';
import { Reveal } from './Reveal';

interface WhyUsProps {
  content: SiteContent['whyUs'];
  location: string;
}

/** Where we build from, beside what working with us is like. */
export const WhyUs: React.FC<WhyUsProps> = ({ content, location }) => (
  <section id="why-us" aria-labelledby="why-us-heading" className="bg-white py-20 text-neutral-950 md:py-28">
    <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
      <div className="lg:sticky lg:top-20">
        <Reveal>
          <SectionHeading id="why-us-heading" lead={content.eyebrow} rest={content.title} description={content.description} />
        </Reveal>

        <Reveal delay={100}>
          <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[28px] lg:aspect-[5/4]">
            <Photo photo={PHOTOS.accra} sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[13px] font-medium text-neutral-900 backdrop-blur-md">
              <MapPin className="h-4 w-4 text-blue-600" />
              Built in {location}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <ol className="divide-y divide-black/10 border-y border-black/10">
        {content.items.map((pillar, index) => {
          const Icon = getIcon(pillar.iconName, Target);
          return (
            <Reveal as="li" key={`${pillar.title}-${index}`} delay={index * 60} className="flex gap-5 py-8 md:gap-8 md:py-10">
              <span className="w-8 shrink-0 pt-1 text-[15px] font-semibold tabular-nums text-neutral-400">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="flex items-center gap-3 text-[24px] font-semibold tracking-[-0.01em] md:text-[28px]">
                  <Icon className="h-6 w-6 shrink-0 text-blue-600" />
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-neutral-600">{pillar.description}</p>
              </div>
            </Reveal>
          );
        })}
        <li className="flex items-center gap-3 py-6 text-[15px] font-medium text-neutral-700">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          {content.commitmentLabel}
        </li>
      </ol>
    </div>
  </section>
);
