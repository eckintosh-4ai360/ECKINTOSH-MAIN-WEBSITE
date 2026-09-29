import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SiteContent } from '../data/contentData';
import { SectionHeading } from './ui';
import { Reveal } from './Reveal';

/** Client quotes in a horizontally scrolling carousel with previous/next controls. */
export const Testimonials: React.FC<{ content: SiteContent['testimonials'] }> = ({ content }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateControls();
    window.addEventListener('resize', updateControls);
    return () => window.removeEventListener('resize', updateControls);
  }, [updateControls, content.items.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('figure');
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: 'smooth' });
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-[#f5f5f7] py-20 text-neutral-950 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="mb-10 md:mb-14">
          <SectionHeading
            id="testimonials-heading"
            lead={content.eyebrow}
            rest={content.title}
            description={content.description}
          />
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onScroll={updateControls}
        role="region"
        aria-label="Client testimonials"
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 sm:scroll-px-8 sm:px-8 xl:scroll-px-[calc((100%-80rem)/2+2rem)] xl:px-[calc((100%-80rem)/2+2rem)]"
      >
        {content.items.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="flex w-[86%] shrink-0 snap-start flex-col rounded-[28px] bg-white p-8 sm:w-[480px] md:p-10"
          >
            {testimonial.highlight && (
              <p className="text-[13px] font-semibold text-blue-600">{testimonial.highlight}</p>
            )}
            <blockquote className="mt-3 text-[15px] leading-relaxed text-neutral-700">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-8">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-[15px] font-semibold text-white"
              >
                {testimonial.author.charAt(0)}
              </span>
              <span className="min-w-0 leading-snug">
                <span className="block text-[15px] font-semibold text-neutral-900">{testimonial.author}</span>
                <span className="block text-[13px] text-neutral-500">
                  {testimonial.role}, {testimonial.organization}
                </span>
                <span className="block text-[12px] text-neutral-400">{testimonial.location}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl justify-end gap-3 px-6 sm:px-8">
        <CarouselButton label="Previous testimonial" disabled={!canPrev} onClick={() => scrollByCard(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </CarouselButton>
        <CarouselButton label="Next testimonial" disabled={!canNext} onClick={() => scrollByCard(1)}>
          <ChevronRight className="h-5 w-5" />
        </CarouselButton>
      </div>
    </section>
  );
};

const CarouselButton: React.FC<{
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, disabled, onClick, children }) => (
  <button
    type="button"
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className="grid h-11 w-11 place-items-center rounded-full bg-black/[0.07] text-neutral-800 transition-colors hover:bg-black/[0.12] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-black/[0.07]"
  >
    {children}
  </button>
);
