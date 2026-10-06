import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, Menu, MessageSquare, Search, X } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { systemCategoryFor } from '../data/systemCategories';
import { PHOTOS } from '../data/siteMedia';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';
import { useBodyScrollLock, useEscape } from '../hooks';
import { Photo } from './ui';

interface NavbarProps {
  navigation: SiteContent['navigation'];
  products: Product[];
  whatsappUrl: string;
  onOpenPlanner: (topic?: string) => void;
  onOpenPalette: () => void;
  onSelectProduct: (product: Product) => void;
}

const SYSTEMS_HREF = '#solutions';

export const Navbar: React.FC<NavbarProps> = ({
  navigation,
  products,
  whatsappUrl,
  onOpenPlanner,
  onOpenPalette,
  onSelectProduct,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemsOpen, setSystemsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useBodyScrollLock(mobileMenuOpen);
  useEscape(systemsOpen || mobileMenuOpen, () => {
    setSystemsOpen(false);
    setMobileMenuOpen(false);
  });

  const sectionIds = useMemo(
    () => navigation.links.map((link) => link.href).filter((href) => href.startsWith('#')),
    [navigation.links]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy: highlight whichever section currently owns the viewport.
  useEffect(() => {
    const nodes = sectionIds
      .map((href) => document.querySelector(href))
      .filter((node): node is Element => Boolean(node));
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sectionIds]);

  const closeAll = () => {
    setMobileMenuOpen(false);
    setSystemsOpen(false);
  };

  const goTo = (event: React.MouseEvent, href: string) => {
    event.preventDefault();
    closeAll();
    const element = document.querySelector(href);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.pageYOffset - 48;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const openProduct = (product: Product) => {
    closeAll();
    onSelectProduct(product);
  };

  const solid = scrolled || systemsOpen || mobileMenuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setSystemsOpen(false)}>
      <div
        className={`relative z-20 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
          solid ? 'border-black/[0.08] bg-white/85' : 'border-transparent bg-white/60'
        }`}
      >
        <div className="mx-auto flex h-12 max-w-[1080px] items-center justify-between gap-4 px-4 sm:px-6">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(event) => goTo(event, '#hero')}
            onMouseEnter={() => setSystemsOpen(false)}
            className="flex shrink-0 items-center gap-2"
            aria-label="Eckintosh home"
          >
            <img src="/logo.png" alt="Eckintosh" className="h-7 w-auto object-contain" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {navigation.links.map((link) => {
              const isSystems = link.href === SYSTEMS_HREF;
              const active = activeSection === link.href;
              return (
                <div
                  key={link.label}
                  className="flex items-center"
                  onMouseEnter={() => setSystemsOpen(isSystems)}
                >
                  <a
                    href={link.href}
                    onClick={(event) => goTo(event, link.href)}
                    className={`px-3.5 py-3 text-[12.5px] transition-colors ${
                      active || (isSystems && systemsOpen)
                        ? 'text-neutral-950'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                    aria-current={active ? 'true' : undefined}
                  >
                    {link.label}
                  </a>
                  {isSystems && (
                    <button
                      type="button"
                      onClick={() => setSystemsOpen((open) => !open)}
                      aria-label="Show all systems"
                      aria-expanded={systemsOpen}
                      aria-controls="systems-flyout"
                      className="-ml-2.5 p-1 text-neutral-500 hover:text-neutral-950"
                    >
                      <ChevronDown className={`h-3 w-3 transition-transform ${systemsOpen ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1" onMouseEnter={() => setSystemsOpen(false)}>
            <button
              type="button"
              onClick={onOpenPalette}
              className="grid h-9 w-9 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-black/[0.05] hover:text-neutral-950"
              aria-label="Search (Ctrl+K)"
              title="Search (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenPlanner(navigation.ctaTopic)}
              className="ml-1 hidden items-center rounded-full bg-neutral-950 px-3.5 py-1.5 text-[12.5px] font-medium text-white transition-colors hover:bg-neutral-800 sm:inline-flex"
            >
              {navigation.ctaLabel}
            </button>

            <button
              type="button"
              onClick={() => {
                setSystemsOpen(false);
                setMobileMenuOpen((open) => !open);
              }}
              className="grid h-9 w-9 place-items-center rounded-full text-neutral-800 hover:bg-black/[0.05] lg:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Systems flyout (desktop) */}
      <div
        id="systems-flyout"
        className={`absolute inset-x-0 top-full z-10 hidden origin-top border-b border-black/[0.08] bg-white/95 backdrop-blur-xl transition-all duration-300 lg:block ${
          systemsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
        onMouseEnter={() => setSystemsOpen(true)}
      >
        <div className="mx-auto grid max-w-[1080px] grid-cols-[1.4fr_1fr_1.1fr] gap-12 px-6 pb-14 pt-10">
          <div>
            <p className="text-[12px] text-neutral-500">Explore systems</p>
            <ul className="mt-4 space-y-2.5">
              {products.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    tabIndex={systemsOpen ? 0 : -1}
                    onClick={() => openProduct(product)}
                    className="text-left text-[24px] font-semibold leading-tight tracking-[-0.01em] text-neutral-900 transition-colors hover:text-blue-600"
                  >
                    {product.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] text-neutral-500">Get started</p>
            <ul className="mt-4 space-y-3 text-[13px] font-medium text-neutral-800">
              <li>
                <button
                  type="button"
                  tabIndex={systemsOpen ? 0 : -1}
                  onClick={() => {
                    closeAll();
                    onOpenPlanner('Demo request');
                  }}
                  className="hover:text-blue-600"
                >
                  Request a demo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  tabIndex={systemsOpen ? 0 : -1}
                  onClick={() => {
                    closeAll();
                    onOpenPlanner('Custom Product Engineering');
                  }}
                  className="hover:text-blue-600"
                >
                  Build a custom system
                </button>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={systemsOpen ? 0 : -1}
                  className="hover:text-blue-600"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <button
                  type="button"
                  tabIndex={systemsOpen ? 0 : -1}
                  onClick={() => {
                    closeAll();
                    onOpenPalette();
                  }}
                  className="hover:text-blue-600"
                >
                  Search everything
                </button>
              </li>
            </ul>
          </div>

          <a
            href={SYSTEMS_HREF}
            tabIndex={systemsOpen ? 0 : -1}
            onClick={(event) => goTo(event, SYSTEMS_HREF)}
            className="group relative block overflow-hidden rounded-2xl"
          >
            <div className="aspect-[4/3]">
              <Photo
                photo={PHOTOS.shopOwner}
                sizes="340px"
                className="transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-[15px] font-semibold">See every system at work</p>
              <p className="mt-0.5 flex items-center gap-1 text-[12px] text-white/80">
                Browse the catalogue <ChevronRight className="h-3.5 w-3.5" />
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Blurs the page behind the open flyout. */}
      <div
        aria-hidden="true"
        onMouseEnter={() => setSystemsOpen(false)}
        className={`fixed inset-0 top-12 hidden bg-white/30 backdrop-blur-md transition-opacity duration-300 lg:block ${
          systemsOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Full-screen mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-12 z-10 overflow-y-auto bg-white lg:hidden"
        >
          <div className="px-8 pb-12 pt-6">
            <nav aria-label="Mobile" className="space-y-1">
              {navigation.links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => goTo(event, link.href)}
                  className="animate-menu-item block py-1.5 text-[28px] font-semibold tracking-[-0.01em] text-neutral-900"
                  style={{ animationDelay: `${index * 35}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <p className="mt-10 text-[12px] text-neutral-500">Explore systems</p>
            <ul className="mt-3 space-y-1">
              {products.map((product, index) => {
                const Icon = getIcon(product.iconName);
                const accent = accentOf(product.accent);
                return (
                  <li key={product.id} className="animate-menu-item" style={{ animationDelay: `${160 + index * 30}ms` }}>
                    <button
                      type="button"
                      onClick={() => openProduct(product)}
                      className="flex w-full items-center gap-3 py-2 text-left"
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                        style={{ backgroundColor: `${accent.hex}14`, color: accent.hex }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold text-neutral-900">{product.shortName}</span>
                        <span className="block truncate text-[12px] text-neutral-500">{systemCategoryFor(product)}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  closeAll();
                  onOpenPlanner(navigation.ctaTopic);
                }}
                className="flex items-center justify-center gap-2 rounded-full bg-blue-600 py-3.5 text-[15px] font-medium text-white"
              >
                {navigation.ctaLabel} <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-medium text-neutral-900 ring-1 ring-inset ring-black/15"
              >
                <MessageSquare className="h-4 w-4 text-emerald-600" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
