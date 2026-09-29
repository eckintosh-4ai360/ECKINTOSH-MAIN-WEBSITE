/**
 * Photography and product captures used by the public site.
 *
 * Photos live in `public/images/` as `<name>-800.webp` and `<name>-1600.webp`
 * and are served untouched, so they cost the single-file bundle nothing.
 * They are Unsplash photos (free for commercial use; credits in README.md).
 */

export interface SitePhoto {
  /** Served path without the size suffix, e.g. "/images/classroom". */
  base: string;
  alt: string;
  /** CSS object-position for the crop, e.g. "50% 30%". */
  position?: string;
}

const photo = (name: string, alt: string, position?: string): SitePhoto => ({
  base: `/images/${name}`,
  alt,
  position,
});

export const PHOTOS = {
  engineers: photo('engineers', 'Two software engineers reviewing code together on a laptop', '62% 50%'),
  phoneUser: photo('phone-user', 'A young man smiling as he uses an app on his phone', '62% 40%'),
  shopper: photo('shopper', 'A customer paying for an online order on his phone with a bank card', '50% 35%'),
  accra: photo('accra', 'The Accra skyline on a clear day', '50% 60%'),
  business: photo('business', 'A business manager working from her laptop and notes in an office', '55% 40%'),
  mobileApp: photo('mobile-app', 'A hand holding a phone running a finance dashboard app', '45% 50%'),
  webDesign: photo('web-design', 'A design workstation showing website layouts on two screens', '40% 55%'),
  coding: photo('coding', 'A developer writing code at a desktop monitor', '45% 55%'),
  pharmacy: photo('pharmacy', 'A pharmacist showing a customer a medicine box at the counter', '55% 40%'),
  classroom: photo('classroom', 'A student reading aloud in a busy classroom', '30% 40%'),
  shopOwner: photo('shop-owner', 'A shop owner at the counter of her provisions store', '50% 55%'),
  learner: photo('learner', 'A student with headphones taking an online course on her laptop', '60% 40%'),
} as const;

/** A real product capture shown inside browser chrome. */
export interface Screenshot {
  src: string;
  alt: string;
  /** Address shown in the browser chrome. */
  url: string;
}

export const SCREENSHOTS = {
  storeAdmin: {
    src: '/systems/ecommerce/dashboard.png',
    alt: 'Eckintosh store administration dashboard with revenue, orders and inventory mix',
    url: 'admin.eckintosh.com',
  },
  storefront: {
    src: '/systems/ecommerce/storefront.png',
    alt: 'An Eckintosh online storefront listing featured products',
    url: 'shop.eckintosh.com',
  },
  posDashboard: {
    src: '/systems/pos/dashboard.webp',
    alt: 'MultiPOS dashboard showing revenue, sales, stock alerts and customers',
    url: 'pos.eckintosh.com',
  },
  commandCenter: {
    src: 'https://res.cloudinary.com/fdwfdt1e/image/upload/w_1600,dpr_auto,f_auto,q_auto/v1790001469/eckintosh/systems/eckindev/command-center.png',
    alt: 'EckinDev command center ranking tasks by focus and delivery risk',
    url: 'dev.eckintosh.com',
  },
} satisfies Record<string, Screenshot>;

export interface SystemMedia {
  photo?: SitePhoto;
  screenshot?: Screenshot;
  /** Dark tiles alternate with light ones, as on a product-launch page. */
  tone: 'light' | 'dark';
}

/** Keyed by product id. Systems without an entry fall back to their icon. */
export const SYSTEM_MEDIA: Record<string, SystemMedia> = {
  'school-management': { photo: PHOTOS.classroom, tone: 'light' },
  'inventory-pos': { photo: PHOTOS.shopOwner, screenshot: SCREENSHOTS.posDashboard, tone: 'dark' },
  'pharmacy-management': { photo: PHOTOS.pharmacy, tone: 'light' },
  'ecommerce-platform': { photo: PHOTOS.shopper, screenshot: SCREENSHOTS.storefront, tone: 'light' },
  'learning-platform': { photo: PHOTOS.learner, tone: 'light' },
  'ai-assistant': { screenshot: SCREENSHOTS.commandCenter, tone: 'dark' },
};

/** Systems given a full-width tile, in order. The rest share a two-up grid. */
export const FEATURED_SYSTEM_IDS = ['school-management', 'inventory-pos'];

/** Keyed by service id. */
export const SERVICE_PHOTOS: Record<string, SitePhoto> = {
  'software-engineering': PHOTOS.coding,
  'mobile-apps': PHOTOS.mobileApp,
  'business-systems': PHOTOS.business,
  'web-experiences': PHOTOS.webDesign,
};
