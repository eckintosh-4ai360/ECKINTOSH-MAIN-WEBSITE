import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Command, Menu, Search, X } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';

interface NavbarProps {
  navigation: SiteContent['navigation'];
  products: Product[];
  onOpenPlanner: (topic?: string) => void;
  onOpenPalette: () => void;
  onFocusSystem: (productId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  navigation,
  products,
  onOpenPlanner,
  onOpenPalette,
  onFocusSystem,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemsOpen, setSystemsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sectionIds = useMemo(
    () => navigation.links.map((link) => link.href).filter((href) => href.startsWith('#')),
    [navigation.links]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  const goTo = (event: React.MouseEvent, href: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setSystemsOpen(false);
    const element = document.querySelector(href);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.pageYOffset - 76;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08111F]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl shadow-black/30'
          : 'bg-transparent py-4 border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#hero" onClick={(event) => goTo(event, '#hero')} className="flex items-center gap-2.5 group shrink-0">
          <img
            src="/logo.png"
            alt="Eckintosh logo"
            className="h-6 w-auto object-contain  shadow-md shadow-black/30 group-hover:scale-105 transition-transform"
          />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-white">ECKINTOSH</span>
            <span className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.14em] text-slate-500 mt-0.5 font-mono">
              Engineering Digital Solutions
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {navigation.links.map((link) => {
            const isSystems = link.href === '#systems';
            const active = activeSection === link.href;

            if (isSystems) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setSystemsOpen(true)}
                  onMouseLeave={() => setSystemsOpen(false)}
                >
                  <a
                    href={link.href}
                    onClick={(event) => goTo(event, link.href)}
                    aria-haspopup="true"
                    aria-expanded={systemsOpen}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      active ? 'text-white bg-white/[0.07]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${systemsOpen ? 'rotate-180' : ''}`}
                    />
                  </a>

                  {systemsOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[520px] animate-fadeIn">
                      <div className="rounded-2xl bg-[#0F1D33] border border-white/10 shadow-2xl p-2 grid grid-cols-2 gap-1">
                        {products.map((product) => {
                          const Icon = getIcon(product.iconName);
                          const accent = accentOf(product.accent);
                          return (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => {
                                setSystemsOpen(false);
                                onFocusSystem(product.id);
                              }}
                              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/[0.06] text-left transition-colors group/item"
                            >
                              <span
                                className="w-7 h-7 rounded-lg grid place-items-center shrink-0"
                                style={{ backgroundColor: `${accent.hex}1f`, color: accent.hex2 }}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[12px] font-semibold text-slate-200 group-hover/item:text-white truncate">
                                  {product.shortName}
                                </span>
                                <span className="block text-[10px] text-slate-500 truncate">{product.category}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => goTo(event, link.href)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  active ? 'text-white bg-white/[0.07]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden md:flex items-center gap-2 pl-2.5 pr-1.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white text-[11px] font-medium transition-all"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[9.5px]">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => onOpenPlanner(navigation.ctaTopic)}
            className="hidden sm:flex px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/25 items-center gap-2 group"
          >
            <span>{navigation.ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-[#08111F]/97 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-fadeIn max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-5 py-4 space-y-4">
            <div className="grid grid-cols-2 gap-1.5">
              {navigation.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => goTo(event, link.href)}
                  className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[13px] font-semibold text-slate-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-2">Our systems</div>
              <div className="space-y-1">
                {products.map((product) => {
                  const Icon = getIcon(product.iconName);
                  const accent = accentOf(product.accent);
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onFocusSystem(product.id);
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-left"
                    >
                      <span
                        className="w-7 h-7 rounded-lg grid place-items-center shrink-0"
                        style={{ backgroundColor: `${accent.hex}1f`, color: accent.hex2 }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[12.5px] font-semibold text-slate-200 truncate">{product.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner(navigation.ctaTopic);
              }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              {navigation.ctaLabel} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
