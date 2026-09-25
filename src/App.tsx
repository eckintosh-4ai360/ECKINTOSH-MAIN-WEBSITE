import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { CapabilityMarquee } from './components/CapabilityMarquee';
import { SystemsShowcase } from './components/SystemsShowcase';
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
import { useSiteContent } from './lib/siteContent';
import { trackPageview } from './lib/analytics';

export function App() {
  const { content } = useSiteContent();

  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerTopic, setPlannerTopic] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSystemId, setActiveSystemId] = useState<string>(content.products.items[0]?.id ?? '');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenPlanner = useCallback((topic?: string) => {
    setPlannerTopic(topic || '');
    setPlannerOpen(true);
  }, []);

  const handleSelectProductById = useCallback(
    (productId: string) => {
      const found = content.products.items.find((product) => product.id === productId) || content.products.items[0];
      if (found) setSelectedProduct(found);
    },
    [content.products.items]
  );

  // These sections remain editable in admin, but are intentionally not part of
  // the public site. Filter saved navigation so older content cannot render
  // links to the removed anchors.
  const publicNavigation = useMemo(
    () => ({
      ...content.navigation,
      links: content.navigation.links.filter((link) => !['#work', '#insights', '#industries'].includes(link.href)),
    }),
    [content.navigation]
  );

  const publicFooter = useMemo(
    () => ({
      ...content.footer,
      companyLinks: content.footer.companyLinks.filter((link) => !['#work', '#industries'].includes(link.href)),
      solutionLinks: content.footer.solutionLinks.filter((link) => !['#work', '#industries'].includes(link.href)),
      productLinks: content.footer.productLinks.filter((link) => !['#work', '#industries'].includes(link.href)),
    }),
    [content.footer]
  );

  /** Select a system in the showcase and bring the stage into view. */
  const handleFocusSystem = useCallback((productId: string) => {
    setActiveSystemId(productId);
    window.requestAnimationFrame(() => {
      document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

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
        products={content.products.items}
        onOpenPlanner={handleOpenPlanner}
        onOpenPalette={() => setPaletteOpen(true)}
        onFocusSystem={handleFocusSystem}
      />

      <main id="main-content">
        <Hero
          content={content.hero}
          products={content.products.items}
          onOpenPlanner={handleOpenPlanner}
          onSelectProduct={handleSelectProductById}
          onFocusSystem={handleFocusSystem}
        />

        {/* <TrustBar content={content.trustBar} /> */}

        {/* <CapabilityMarquee /> */}

        {/* Flagship: interactive walkthroughs of every system we have shipped */}
        <SystemsShowcase
          content={content.products}
          activeId={activeSystemId}
          onActiveIdChange={setActiveSystemId}
          onSelectProduct={setSelectedProduct}
          onOpenPlanner={handleOpenPlanner}
        />

        <WhatWeDo content={content.services} onOpenPlanner={handleOpenPlanner} />

        <SystemsIndex
          content={content.products}
          onSelectProduct={setSelectedProduct}
          onFocusSystem={handleFocusSystem}
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
        content={{ ...content, navigation: publicNavigation }}
        onSelectProduct={setSelectedProduct}
        onFocusSystem={handleFocusSystem}
        onOpenPlanner={handleOpenPlanner}
      />

      <ProjectPlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        initialTopic={plannerTopic}
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
