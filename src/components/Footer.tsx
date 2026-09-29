import React from 'react';
import { ChevronRight, Globe } from 'lucide-react';
import type { NavLink, SiteContent } from '../data/contentData';

interface FooterProps {
  brand: SiteContent['brand'];
  content: SiteContent['footer'];
  onOpenPlanner: (topic?: string) => void;
}

/** Hash routes that render a separate page need a reload to switch views. */
const openRoute = (event: React.MouseEvent, route: string) => {
  event.preventDefault();
  window.location.hash = route;
  window.location.reload();
};

export const Footer: React.FC<FooterProps> = ({ brand, content, onOpenPlanner }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 48;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#f5f5f7] text-[12px] leading-relaxed text-neutral-500">
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="flex flex-col gap-4 border-b border-black/10 py-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl">{content.description}</p>
          <button
            type="button"
            onClick={() => onOpenPlanner(content.directConnectTopic)}
            className="inline-flex shrink-0 items-center self-start font-medium text-blue-600 hover:underline md:self-auto"
          >
            Tell us what you need built <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4">
          <FooterLinkColumn title="Company" links={content.companyLinks} onNavClick={handleNavClick} />
          <FooterLinkColumn title="Solutions" links={content.solutionLinks} onNavClick={handleNavClick} />
          <FooterLinkColumn title="Systems" links={content.productLinks} onNavClick={handleNavClick} />
          <nav aria-labelledby="footer-connect-heading">
            <h3 id="footer-connect-heading" className="font-semibold text-neutral-800">
              Connect
            </h3>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a href={content.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 hover:underline">
                  {content.whatsappLabel}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPlanner(content.directConnectTopic)}
                  className="hover:text-neutral-900 hover:underline"
                >
                  {content.directConnectLabel}
                </button>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                {content.statusLine}
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/10 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="flex items-center gap-1.5">
              <img src="/logo.png" alt="" className="h-3.5 w-auto" />
              <span className="font-semibold text-neutral-700">
                {brand.name}
                {brand.suffix}
              </span>
            </span>
            <span>{content.copyright}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <a href="#/privacy" onClick={(e) => openRoute(e, '/privacy')} className="hover:text-neutral-900 hover:underline">
              Privacy Policy
            </a>
            <a href="#/terms" onClick={(e) => openRoute(e, '/terms')} className="hover:text-neutral-900 hover:underline">
              Terms of Service
            </a>
            <a href="#/admin" onClick={(e) => openRoute(e, '/admin')} className="text-neutral-400 hover:text-neutral-700">
              Admin
            </a>
            <span className="flex items-center gap-1 text-neutral-700">
              <Globe className="h-3.5 w-3.5" /> {content.locationLabel}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLinkColumn: React.FC<{
  title: string;
  links: NavLink[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}> = ({ title, links, onNavClick }) => {
  const headingId = `footer-${title.toLowerCase()}-heading`;
  return (
    <nav aria-labelledby={headingId}>
      <h3 id={headingId} className="font-semibold text-neutral-800">
        {title}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a href={link.href} onClick={(e) => onNavClick(e, link.href)} className="hover:text-neutral-900 hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
