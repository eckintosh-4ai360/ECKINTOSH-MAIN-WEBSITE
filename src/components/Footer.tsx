import React from 'react';
import { Globe, Layers, MessageSquare, Share2 } from 'lucide-react';
import type { NavLink, SiteContent } from '../data/contentData';

interface FooterProps {
  brand: SiteContent['brand'];
  content: SiteContent['footer'];
  onOpenPlanner: (topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ brand, content, onOpenPlanner }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#030712] text-slate-400 py-16 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white font-heading">
                {brand.name}
                <span className="text-blue-500">{brand.suffix}</span>
              </span>
            </a>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">{content.description}</p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{content.statusLine}</span>
            </div>
          </div>

          <FooterLinkColumn title="Company" links={content.companyLinks} onNavClick={handleNavClick} />
          <FooterLinkColumn title="Solutions" links={content.solutionLinks} onNavClick={handleNavClick} />
          <FooterLinkColumn title="Products" links={content.productLinks} onNavClick={handleNavClick} />
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>{content.copyright}</div>

          <div className="flex items-center gap-4">
            <a
              href={content.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> {content.whatsappLabel}
            </a>
            <button
              onClick={() => onOpenPlanner(content.directConnectTopic)}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" /> {content.directConnectLabel}
            </button>
            <span className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5" /> {content.locationLabel}
            </span>
            <a
              href="#/admin"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '/admin';
                window.location.reload();
              }}
              className="text-slate-600 hover:text-slate-400 transition-colors"
            >
              Admin
            </a>
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
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a href={link.href} onClick={(e) => onNavClick(e, link.href)} className="hover:text-white transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
