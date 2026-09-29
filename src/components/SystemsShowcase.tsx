import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { HIDDEN_SYSTEM_IDS, SYSTEM_CATEGORIES } from '../data/systemCategories';
import { getIcon } from '../lib/icons';
import { Reveal } from './Reveal';

interface SystemsShowcaseProps {
  content: SiteContent['products'];
  onSelectProduct: (product: Product) => void;
  onOpenPlanner: (topic?: string) => void;
  activeId: string;
  onActiveIdChange: (id: string) => void;
}

export const SystemsShowcase: React.FC<SystemsShowcaseProps> = ({
  content,
  onSelectProduct,
  onOpenPlanner,
  activeId,
  onActiveIdChange,
}) => {
  const products = content.items.filter((product) => !HIDDEN_SYSTEM_IDS.has(product.id));
  const categories: { id: string; name: string; description: string; iconName: string; products: Product[] }[] = SYSTEM_CATEGORIES.map((category) => ({
    ...category,
    products: category.productIds
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product)),
  })).filter((category) => category.products.length > 0);

  const uncategorized = products.filter((product) =>
    !SYSTEM_CATEGORIES.some((category) => (category.productIds as readonly string[]).includes(product.id))
  );
  if (uncategorized.length) {
    categories.push({
      id: 'other',
      name: 'Other Systems',
      description: 'More software built around the way your team works.',
      iconName: 'Layers',
      products: uncategorized,
    });
  }

  useEffect(() => {
    if (products.length && !products.some((product) => product.id === activeId)) {
      onActiveIdChange(products[0].id);
    }
  }, [activeId, onActiveIdChange, products]);

  const selectedCategory = categories.find((category) => category.products.some((product) => product.id === activeId)) ?? categories[0];
  if (!selectedCategory) return null;

  return (
    <section id="systems" aria-labelledby="systems-heading" className="border-b border-slate-200 bg-white py-20 text-slate-900 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 max-w-3xl md:mb-12">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            {content.eyebrow}
          </span>
          <h2 id="systems-heading" className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{content.description}</p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" role="group" aria-label="System categories">
          {categories.map((category, index) => {
            const Icon = getIcon(category.iconName);
            const selected = category.id === selectedCategory.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onActiveIdChange(category.products[0].id)}
                className={`group flex h-full min-h-52 flex-col rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  selected ? 'border-blue-300 bg-blue-50/70 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-200'
                }`}
              >
                <span className="flex w-full items-start justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                </span>
                <span className="mt-6 text-lg font-bold text-slate-900">{category.name}</span>
                <span className="mt-2 text-sm leading-relaxed text-slate-600">{category.description}</span>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-semibold text-blue-700">
                  Explore {category.products.length} {category.products.length === 1 ? 'system' : 'systems'}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7 lg:p-9">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">Explore the category</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{selectedCategory.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{selectedCategory.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onOpenPlanner(`Discuss ${selectedCategory.name}`)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Discuss a project <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedCategory.products.map((product) => {
              const Icon = getIcon(product.iconName);
              const selected = product.id === activeId;
              return (
                <button
                  key={product.id}
                  id={`system-card-${product.id}`}
                  type="button"
                  onClick={() => {
                    onActiveIdChange(product.id);
                    onSelectProduct(product);
                  }}
                  className={`group flex min-h-40 flex-col rounded-2xl border bg-white p-5 text-left transition-all hover:border-blue-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${selected ? 'border-blue-200' : 'border-slate-200'}`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600"><Icon className="h-4 w-4" /></span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                  </span>
                  <span className="mt-4 text-sm font-bold text-slate-900">{product.shortName}</span>
                  <span className="mt-1 text-xs leading-relaxed text-slate-600">{product.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
