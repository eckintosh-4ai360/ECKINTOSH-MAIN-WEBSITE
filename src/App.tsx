import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { CapabilityMarquee } from './components/CapabilityMarquee';
import { SystemsShowcase } from './components/SystemsShowcase';
import { WhatWeDo } from './components/WhatWeDo';
import { SystemsIndex } from './components/SystemsIndex';
import { Industries } from './components/Industries';
import { FeaturedWork } from './components/FeaturedWork';
import { WhyUs } from './components/WhyUs';
import { HowWeWork } from './components/HowWeWork';
import { TechStack } from './components/TechStack';
import { Testimonials } from './components/Testimonials';
import { Insights } from './components/Insights';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/CommandPalette';

// Modals
import { ProjectPlannerModal } from './components/ProjectPlannerModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProductModal } from './components/ProductModal';
import { InsightArticleModal } from './components/InsightArticleModal';

// Data types
import type { CaseStudy, Product, InsightArticle } from './data/contentData';
import { useSiteContent } from './lib/siteContent';
import { trackPageview } from './lib/analytics';

export function App() {
  const { content } = useSiteContent();

  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerTopic, setPlannerTopic] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSystemId, setActiveSystemId] = useState<string>(content.products.items[0]?.id ?? '');

  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

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
        navigation={content.navigation}
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

        <TrustBar content={content.trustBar} />

        <CapabilityMarquee />

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

        <Industries content={content.industries} onOpenPlanner={handleOpenPlanner} />

        <FeaturedWork
          content={content.caseStudies}
          onSelectCaseStudy={setSelectedCaseStudy}
          onOpenPlanner={handleOpenPlanner}
        />

        <WhyUs content={content.whyUs} />

        <HowWeWork content={content.howWeWork} onOpenPlanner={handleOpenPlanner} />

        <TechStack content={content.techStack} />

        <Testimonials content={content.testimonials} />

        <Insights content={content.insights} onSelectArticle={setSelectedArticle} onOpenPlanner={handleOpenPlanner} />

        <CTA content={content.cta} onOpenPlanner={handleOpenPlanner} />
      </main>

      <Footer brand={content.brand} content={content.footer} onOpenPlanner={handleOpenPlanner} />

      {/* Interactive layers */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        content={content}
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

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenPlanner={handleOpenPlanner}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenPlanner={handleOpenPlanner}
      />

      <InsightArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenPlanner={handleOpenPlanner}
      />

      <BackToTop />
    </div>
  );
}

export default App;
