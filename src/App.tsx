import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { SystemsIndex } from './components/SystemsIndex';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/CommandPalette';

// Modals
import { ProjectPlannerModal } from './components/ProjectPlannerModal';
import { ProductModal } from './components/ProductModal';

// Data types
import type { Product } from './data/contentData';
import { HIDDEN_SYSTEM_IDS } from './data/systemCategories';
import { useSiteContent } from './lib/siteContent';
import { trackPageview } from './lib/analytics';

export function App() {
  const { content } = useSiteContent();
  const publicProducts = useMemo(
    () => content.products.items.filter((product) => !HIDDEN_SYSTEM_IDS.has(product.id)),
    [content.products.items]
  );
  const publicProductContent = useMemo(
    () => ({ ...content.products, items: publicProducts }),
    [content.products, publicProducts]
  );

  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerTopic, setPlannerTopic] = useState('');
  const [plannerInitialStep, setPlannerInitialStep] = useState<1 | 2 | 3>(1);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenPlanner = useCallback((topic?: string, startAtContact = false) => {
    setPlannerTopic(topic || '');
    setPlannerInitialStep(startAtContact ? 3 : 1);
    setPlannerOpen(true);
  }, []);

  // These sections remain editable in admin, but are intentionally not part of
  // the public site. Filter saved navigation so older content cannot render
  // links to the removed anchors.
  const publicNavigation = useMemo(
    () => ({
      ...content.navigation,
      links: content.navigation.links
        .filter((link) => !['#work', '#insights', '#industries'].includes(link.href))
        .map((link) => link.href === '#systems' ? { ...link, href: '#solutions' } : link),
    }),
    [content.navigation]
  );

  const publicFooter = useMemo(
    () => ({
      ...content.footer,
      companyLinks: content.footer.companyLinks
        .filter((link) => !['#work', '#industries'].includes(link.href))
        .map((link) => link.href === '#systems' ? { ...link, href: '#solutions' } : link),
      solutionLinks: content.footer.solutionLinks
        .filter((link) => !['#work', '#industries'].includes(link.href))
        .map((link) => link.href === '#systems' ? { ...link, href: '#solutions' } : link),
      productLinks: content.footer.productLinks
        .filter((link) => !['#work', '#industries'].includes(link.href) && !['Beauty & Spa', 'Barbershop'].includes(link.label))
        .map((link) => link.href === '#systems' ? { ...link, href: '#solutions' } : link),
    }),
    [content.footer]
  );

  // Global ⌘K / Ctrl+K shortcut.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // One first-party, cookie-free pageview beacon per load.
  useEffect(() => {
    trackPageview();
  }, []);

  return (
    <div className="min-h-screen bg-[#08111F] text-slate-100 font-sans antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-blue-600 focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <ScrollProgress />

      <Navbar
        navigation={publicNavigation}
        products={publicProducts}
        onOpenPlanner={handleOpenPlanner}
        onOpenPalette={() => setPaletteOpen(true)}
        onSelectProduct={setSelectedProduct}
      />

      <main id="main-content">
        <Hero
          content={content.hero}
          onOpenPlanner={handleOpenPlanner}
        />

        <WhatWeDo content={content.services} onOpenPlanner={handleOpenPlanner} />

        <SystemsIndex
          content={publicProductContent}
          onSelectProduct={setSelectedProduct}
          onOpenPlanner={handleOpenPlanner}
        />

        <WhyUs content={content.whyUs} />

        <Testimonials content={content.testimonials} />

        <CTA content={content.cta} onOpenPlanner={handleOpenPlanner} />
      </main>

      <Footer brand={content.brand} content={publicFooter} onOpenPlanner={handleOpenPlanner} />

      {/* Interactive layers */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        content={{ ...content, products: publicProductContent, navigation: publicNavigation }}
        onSelectProduct={setSelectedProduct}
        onOpenPlanner={handleOpenPlanner}
      />

      <ProjectPlannerModal
          isOpen={plannerOpen}
          onClose={() => setPlannerOpen(false)}
          initialTopic={plannerTopic}
          initialStep={plannerInitialStep}
          content={content.planner}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenPlanner={handleOpenPlanner}
      />

      <BackToTop />
    </div>
  );
}

export default App;
