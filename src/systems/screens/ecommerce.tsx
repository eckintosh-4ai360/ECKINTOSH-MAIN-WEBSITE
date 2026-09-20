import type { SystemDefinition } from '../types';

/**
 * A four-part commerce walkthrough built from the supplied production-style
 * storefront and administration captures. `SystemViewer` moves its pointer
 * across each scene's hotspots, and uses the same points to focus the frame
 * on mobile screens.
 */
export const ecommerceSystem: SystemDefinition = {
  productId: 'ecommerce-platform',
  appName: 'Eckintosh Commerce',
  appInitials: 'EC',
  url: 'shop.eckintosh.com',
  scenes: [
    {
      id: 'storefront',
      label: 'Storefront',
      caption: 'A polished customer storefront: live product discovery, clear prices and fast add-to-cart actions.',
      duration: 6,
      image: {
        src: '/systems/ecommerce/storefront.png',
        alt: 'Eckintosh Commerce featured products storefront',
        hotspots: [
          [48, 8],
          [18, 45],
          [40, 45],
          [18, 69],
          [82, 69],
        ],
      },
    },
    {
      id: 'signin',
      label: 'Customer Sign-in',
      caption: 'Customers can securely return to their account and continue shopping in a familiar checkout flow.',
      duration: 5,
      image: {
        src: '/systems/ecommerce/signin.png',
        alt: 'Eckintosh Commerce customer sign-in page',
        hotspots: [
          [74, 43],
          [74, 57],
          [74, 69],
          [74, 82],
        ],
      },
    },
    {
      id: 'dashboard',
      label: 'Store Dashboard',
      caption: 'Store owners see revenue, orders, customers and inventory health in one operational workspace.',
      duration: 6,
      image: {
        src: '/systems/ecommerce/dashboard.png',
        alt: 'Eckintosh Commerce store administration dashboard',
        hotspots: [
          [88, 17],
          [31, 34],
          [48, 54],
          [82, 54],
          [63, 81],
        ],
      },
    },
    {
      id: 'analytics',
      label: 'Analytics',
      caption: 'Actionable commerce analytics connect sales trends, customer behavior and product performance.',
      duration: 6,
      image: {
        src: '/systems/ecommerce/analytics.png',
        alt: 'Eckintosh Commerce sales analytics dashboard',
        hotspots: [
          [7, 37],
          [37, 28],
          [55, 52],
          [36, 76],
          [78, 76],
        ],
      },
    },
  ],
};
