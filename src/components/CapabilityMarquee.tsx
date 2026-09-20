import React from 'react';

const CAPABILITIES = [
  'React & TypeScript',
  'Node.js APIs',
  'PostgreSQL',
  'MTN Mobile Money',
  'Telecel Cash',
  'Paystack',
  'Offline-first sync',
  'Flutter mobile',
  'Cloud deployment',
  'Automated backups',
];


export const CapabilityMarquee: React.FC = () => (
  <div className="relative bg-[#0B1526] border-y border-white/[0.06] py-3.5 overflow-hidden marquee-track">
    <div className="mask-fade-x">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
            {CAPABILITIES.map((capability) => (
              <span key={`${copy}-${capability}`} className="flex items-center shrink-0">
                <span className="px-5 text-[12px] font-medium text-slate-400 whitespace-nowrap">{capability}</span>
                <span className="w-1 h-1 rounded-full bg-blue-500/60 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);
