import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { HIDDEN_SYSTEM_IDS, SYSTEM_CATEGORIES, systemCategoryFor } from '../data/systemCategories';
import { FEATURED_SYSTEM_IDS, SYSTEM_MEDIA, type SystemMedia } from '../data/siteMedia';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';
import { BrowserFrame, Photo, SectionHeading, pillClass } from './ui';
import { Reveal } from './Reveal';

interface SystemsIndexProps {
  content: SiteContent['products'];
  onSelectProduct: (product: Product) => void;
  onOpenPlanner: (topic?: string) => void;
}

const categoryRank = (product: Product) => {
  const index = SYSTEM_CATEGORIES.findIndex((category) =>
    (category.productIds as readonly string[]).includes(product.id)
  );
  return index === -1 ? SYSTEM_CATEGORIES.length : index;
};

/** Product-launch style tiles: flagship systems full width, the rest two-up. */
export const SystemsIndex: React.FC<SystemsIndexProps> = ({ content, onSelectProduct, onOpenPlanner }) => {
  const catalogue = content.items
    .filter((item) => !HIDDEN_SYSTEM_IDS.has(item.id))
    .sort((a, b) => categoryRank(a) - categoryRank(b));

  const featured = FEATURED_SYSTEM_IDS.map((id) => catalogue.find((item) => item.id === id)).filter(
    (item): item is Product => Boolean(item)
  );
  const rest = catalogue.filter((item) => !featured.includes(item));

  const tileProps = { onSelectProduct, onOpenPlanner };

  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="bg-white pb-20 pt-20 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <Reveal className="px-3 pb-10 sm:px-4 md:pb-14">
          <SectionHeading id="solutions-heading" lead={content.eyebrow} rest={content.title} description={content.description} />
        </Reveal>

        <div className="space-y-3">
          {featured.map((product) => (
            <SystemTile key={product.id} product={product} featured {...tileProps} />
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {rest.map((product, index) => (
            <SystemTile
              key={product.id}
              product={product}
              // An odd tile out closes the grid at full width.
              wide={rest.length % 2 === 1 && index === rest.length - 1}
              {...tileProps}
            />
          ))}
        </div>

        <p className="mt-12 px-3 text-center text-[17px] text-neutral-600">
          Need something none of these cover?{' '}
          <button
            type="button"
            onClick={() => onOpenPlanner(content.ctaTopic)}
            className="inline-flex items-center font-medium text-blue-600 hover:underline"
          >
            {content.ctaLabel} <ChevronRight className="h-4 w-4" />
          </button>
        </p>
      </div>
    </section>
  );
};

interface SystemTileProps {
  product: Product;
  featured?: boolean;
  wide?: boolean;
  onSelectProduct: (product: Product) => void;
  onOpenPlanner: (topic?: string) => void;
}

const SystemTile: React.FC<SystemTileProps> = ({ product, featured = false, wide = false, onSelectProduct, onOpenPlanner }) => {
  const media = SYSTEM_MEDIA[product.id];
  const dark = media?.tone === 'dark';
  const accent = accentOf(product.accent);
  const headingId = `system-${product.id}`;

  return (
    <Reveal className={wide ? 'lg:col-span-2' : ''}>
      <article
        aria-labelledby={headingId}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] ${
          dark ? 'bg-neutral-950 text-white' : 'bg-[#f5f5f7] text-neutral-950'
        } ${featured ? 'min-h-[620px] md:min-h-[740px]' : 'min-h-[560px] md:min-h-[640px]'}`}
      >
        <div className="relative z-10 px-6 pt-12 text-center md:pt-14">
          <p className="text-[13px] font-semibold" style={{ color: dark ? accent.hex2 : accent.hex }}>
            {systemCategoryFor(product)}
          </p>
          <h3
            id={headingId}
            className={`mt-1.5 font-semibold tracking-[-0.025em] ${
              featured ? 'text-[40px] leading-[1.05] md:text-[56px]' : 'text-[32px] leading-[1.1] md:text-[40px]'
            }`}
          >
            {product.shortName}
          </h3>
          <p
            className={`mx-auto mt-2 max-w-xl ${featured ? 'text-[19px] md:text-[24px]' : 'text-[17px] md:text-[19px]'} leading-snug ${
              dark ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            {product.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={() => onSelectProduct(product)} className={pillClass('primary')}>
              Learn more
            </button>
            <button
              type="button"
              onClick={() => onOpenPlanner(`Demo request: ${product.name}`)}
              className={pillClass(dark ? 'ghost-light' : 'secondary')}
            >
              Request a demo
            </button>
          </div>
        </div>

        <div className="relative mt-10 flex flex-1 flex-col md:mt-12">
          <TileMedia product={product} media={media} featured={featured} wide={wide} dark={dark} />
        </div>
      </article>
    </Reveal>
  );
};

const TileMedia: React.FC<{
  product: Product;
  media: SystemMedia | undefined;
  featured: boolean;
  wide: boolean;
  dark: boolean;
}> = ({ product, media, featured, wide, dark }) => {
  const accent = accentOf(product.accent);
  const full = featured || wide;
  const sizes = full ? '(min-width: 1280px) 1256px, 100vw' : '(min-width: 1024px) 50vw, 100vw';
  const zoom = 'transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]';

  const tileFrom = dark ? 'from-neutral-950' : 'from-[#f5f5f7]';

  // The system in use beside its real screen: stacked on phones, side by side above.
  if (media?.photo && media.screenshot) {
    return (
      <div className="relative flex-1 overflow-hidden md:min-h-[440px]">
        <div className="relative h-72 sm:h-80 md:absolute md:inset-y-0 md:left-0 md:h-auto md:w-[62%]">
          <Photo photo={media.photo} sizes={full ? '(min-width: 768px) 62vw, 100vw' : '(min-width: 1024px) 31vw, 100vw'} className={zoom} />
          <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${tileFrom} to-transparent`} />
          <div className={`absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l ${tileFrom} to-transparent md:block`} />
        </div>
        <div
          className={`relative mx-auto -mt-24 w-[88%] translate-y-6 transition-transform duration-700 group-hover:translate-y-3 md:absolute md:bottom-0 md:right-8 md:mt-0 ${
            full ? 'md:w-[50%]' : 'md:w-[56%]'
          }`}
        >
          <BrowserFrame shot={media.screenshot} tone={dark ? 'dark' : 'light'} />
        </div>
      </div>
    );
  }

  // A photo of the system in use, with its headline numbers.
  if (media?.photo) {
    return (
      <div className={`relative flex-1 overflow-hidden ${full ? 'min-h-[340px] md:min-h-[440px]' : 'min-h-[320px]'}`}>
        <div className="absolute inset-0">
          <Photo photo={media.photo} sizes={sizes} className={zoom} />
        </div>
        {/* Blend the photo's top edge into the tile. */}
        <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${tileFrom} to-transparent`} />
        <MetricChips product={product} full={full} />
      </div>
    );
  }

  // A real screen rising out of the bottom of the tile.
  if (media?.screenshot) {
    return (
      <div className="relative flex flex-1 items-end justify-center overflow-hidden px-6 md:px-10">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-2/3 w-3/4 -translate-x-1/2 rounded-full blur-[90px]"
          style={{ backgroundColor: `${accent.hex}55` }}
        />
        <div
          className={`relative translate-y-8 transition-transform duration-700 group-hover:translate-y-4 ${
            full ? 'w-full max-w-4xl' : 'w-full'
          }`}
        >
          <BrowserFrame shot={media.screenshot} tone={dark ? 'dark' : 'light'} />
        </div>
      </div>
    );
  }

  // No media yet: a large icon on a wash of the system's accent.
  const Icon = getIcon(product.iconName);
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden pb-12">
      <div
        aria-hidden="true"
        className="absolute inset-x-10 bottom-0 top-6 rounded-full blur-[80px]"
        style={{ backgroundColor: `${accent.hex}33` }}
      />
      <span
        className="relative grid h-36 w-36 place-items-center rounded-[36px] text-white shadow-2xl"
        style={{ background: `linear-gradient(135deg, ${accent.hex}, ${accent.hex2})` }}
      >
        <Icon className="h-16 w-16" />
      </span>
    </div>
  );
};

/** Headline numbers laid over the photo, like the stats on a product page. */
const MetricChips: React.FC<{ product: Product; full: boolean }> = ({ product, full }) => {
  const metrics = product.metrics.slice(0, full ? 3 : 2);
  if (!metrics.length) return null;

  return (
    <ul className="absolute inset-x-4 bottom-4 flex flex-wrap justify-center gap-2 md:bottom-6 md:gap-3">
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className="rounded-2xl bg-white/85 px-4 py-2.5 text-center shadow-lg shadow-black/10 backdrop-blur-md md:px-5 md:py-3"
        >
          <span className="block text-[17px] font-semibold tracking-tight text-neutral-950 md:text-[21px]">{metric.value}</span>
          <span className="block text-[11px] text-neutral-600 md:text-[12px]">{metric.label}</span>
        </li>
      ))}
    </ul>
  );
};
