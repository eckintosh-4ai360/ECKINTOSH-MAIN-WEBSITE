import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { WhatWeDo } from './components/WhatWeDo';
import { Solutions } from './components/Solutions';
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

// Modals
import { ProjectPlannerModal } from './components/ProjectPlannerModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProductModal } from './components/ProductModal';
import { InsightArticleModal } from './components/InsightArticleModal';

// Data types
import type { CaseStudy, Product, InsightArticle } from './data/contentData';
import { useSiteContent } from './lib/siteContent';

export function App() {
  const { content } = useSiteContent();
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerTopic, setPlannerTopic] = useState('');
  
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  const handleOpenPlanner = (topic?: string) => {
    setPlannerTopic(topic || '');
    setPlannerOpen(true);
  };

  const handleSelectProductById = (productId: string) => {
    const found = content.products.items.find((p) => p.id === productId) || content.products.items[0];
    if (found) setSelectedProduct(found);
  };

  return (
    <div className="min-h-screen bg-[#08111F] text-slate-100 font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Top Navbar */}
      <Navbar brand={content.brand} navigation={content.navigation} onOpenPlanner={handleOpenPlanner} />

      {/* Main Content Layout */}
      <main>
        {/* Section 2: HERO */}
        <Hero 
          content={content.hero}
          onOpenPlanner={handleOpenPlanner} 
          onSelectProduct={handleSelectProductById} 
        />

        {/* Section 3: TRUST / CREDIBILITY BAR */}
        <TrustBar content={content.trustBar} />

        {/* Section 4: WHAT WE DO */}
        <WhatWeDo content={content.services} onOpenPlanner={handleOpenPlanner} />

        {/* Section 5: SOLUTIONS / PRODUCTS */}
        <Solutions 
          content={content.products}
          onSelectProduct={(prod) => setSelectedProduct(prod)} 
          onOpenPlanner={handleOpenPlanner} 
        />

        {/* Section 6: INDUSTRIES */}
        <Industries content={content.industries} onOpenPlanner={handleOpenPlanner} />

        {/* Section 7: FEATURED WORK */}
        <FeaturedWork 
          content={content.caseStudies}
          onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)} 
          onOpenPlanner={handleOpenPlanner} 
        />

        {/* Section 9: WHY US */}
        <WhyUs content={content.whyUs} />

        {/* Section 10: HOW WE WORK */}
        <HowWeWork content={content.howWeWork} onOpenPlanner={handleOpenPlanner} />

        {/* Section 11: TECHNOLOGY SECTION */}
        <TechStack content={content.techStack} />

        {/* Section 12: TESTIMONIALS */}
        <Testimonials content={content.testimonials} />

        {/* Section 13: INSIGHTS */}
        <Insights 
          content={content.insights}
          onSelectArticle={(art) => setSelectedArticle(art)} 
          onOpenPlanner={handleOpenPlanner} 
        />

        {/* Section 14: CTA SECTION */}
        <CTA content={content.cta} onOpenPlanner={handleOpenPlanner} />
      </main>

      {/* Section 15: FOOTER */}
      <Footer brand={content.brand} content={content.footer} onOpenPlanner={handleOpenPlanner} />

      {/* Interactive Modals */}
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

      {/* Back to Hero Button */}
      <BackToTop />
    </div>
  );
}

export default App;
