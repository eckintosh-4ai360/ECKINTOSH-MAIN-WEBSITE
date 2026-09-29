import React from 'react';
import { Code2 } from 'lucide-react';
import type { Product } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';

interface QuickLinksProps {
  products: Product[];
  customTopic: string;
  onSelectProduct: (product: Product) => void;
  onOpenPlanner: (topic?: string) => void;
}

/** A row of round icon links straight into each system, under the hero. */
export const QuickLinks: React.FC<QuickLinksProps> = ({ products, customTopic, onSelectProduct, onOpenPlanner }) => (
  <nav aria-label="Jump to a system" className="border-y border-black/[0.06] bg-white">
    <ul className="no-scrollbar mx-auto flex max-w-[1080px] snap-x gap-2 overflow-x-auto px-4 py-7 sm:px-6 md:justify-center md:gap-4">
      {products.map((product) => {
        const Icon = getIcon(product.iconName);
        const accent = accentOf(product.accent);
        return (
          <li key={product.id} className="snap-start">
            <QuickLink label={product.shortName} onClick={() => onSelectProduct(product)} color={accent.hex}>
              <Icon className="h-6 w-6" />
            </QuickLink>
          </li>
        );
      })}
      <li className="snap-start">
        <QuickLink label="Custom build" onClick={() => onOpenPlanner(customTopic)} color="#171717">
          <Code2 className="h-6 w-6" />
        </QuickLink>
      </li>
    </ul>
  </nav>
);

const QuickLink: React.FC<{ label: string; color: string; onClick: () => void; children: React.ReactNode }> = ({
  label,
  color,
  onClick,
  children,
}) => (
  <button type="button" onClick={onClick} className="group flex w-[92px] flex-col items-center gap-2.5 text-center">
    <span
      className="grid h-14 w-14 place-items-center rounded-full bg-[#f5f5f7] transition-transform duration-300 group-hover:scale-105"
      style={{ color }}
    >
      {children}
    </span>
    <span className="text-[12.5px] font-medium leading-tight text-neutral-700 group-hover:text-blue-600 group-hover:underline">
      {label}
    </span>
  </button>
);
