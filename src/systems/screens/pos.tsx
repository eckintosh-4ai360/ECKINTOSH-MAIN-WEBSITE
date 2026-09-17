import type { SystemDefinition } from '../types';

/**
 * Inventory & POS is shown as real captures of MultiPOS rather than rebuilt
 * DOM. Hotspots are percentages of each capture: the cursor rests on them in
 * order, and on phones the frame zooms to whichever one is current.
 */
export const posSystem: SystemDefinition = {
  productId: 'inventory-pos',
  appName: 'MultiPOS',
  appInitials: 'MP',
  url: 'multipos.eckintosh.app/dashboard',
  scenes: [
    {
      id: 'landing',
      label: 'The Product',
      caption: 'MultiPOS — multi-store retail, real-time stock and one dashboard over all of it.',
      duration: 5,
      image: {
        src: '/systems/pos/landing.webp',
        alt: 'MultiPOS marketing site: the POS system built for growing businesses',
        hotspots: [
          [49, 34],
          [40, 72],
          [27, 89],
          [70, 89],
        ],
      },
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      caption: 'A store on its first morning. Revenue, sales, low stock and customers all read zero until the till opens.',
      duration: 6,
      image: {
        src: '/systems/pos/dashboard.webp',
        alt: 'MultiPOS dashboard showing revenue, completed sales, low stock and customer counters',
        hotspots: [
          [26, 15],
          [26, 33],
          [83, 33],
          [43, 62],
        ],
      },
    },
    {
      id: 'terminal',
      label: 'POS Terminal',
      caption: 'The till itself: scan or search, attach a customer, build the cart, tender and print.',
      duration: 6,
      image: {
        src: '/systems/pos/terminal.webp',
        alt: 'MultiPOS point-of-sale terminal with product search and an empty cart',
        hotspots: [
          [7, 28],
          [46, 10],
          [18, 15],
          [90, 19],
        ],
      },
    },
    {
      id: 'reports',
      label: 'Reports',
      caption: 'Revenue against profit, top products and the payment mix — the view an owner opens on a Monday.',
      duration: 6,
      image: {
        src: '/systems/pos/reports.webp',
        alt: 'MultiPOS reports and analytics with revenue, gross profit and transaction totals',
        hotspots: [
          [19, 10],
          [26, 17],
          [68, 17],
          [45, 40],
        ],
      },
    },
  ],
};
