import type { Product } from './contentData';

export const SYSTEM_CATEGORIES = [
  {
    id: 'management',
    name: 'Management Systems',
    description: 'One place to manage teams, records, and daily operations.',
    iconName: 'LayoutDashboard',
    productIds: ['school-management', 'pharmacy-management', 'ai-assistant'],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Online stores built to showcase products and make buying easy.',
    iconName: 'Store',
    productIds: ['ecommerce-platform'],
  },
  {
    id: 'learning',
    name: 'Learning Platforms',
    description: 'Courses, assessments, and progress tracking in one learning space.',
    iconName: 'BookOpen',
    productIds: ['learning-platform'],
  },
  {
    id: 'inventory',
    name: 'Inventory & POS',
    description: 'Stock control and checkout that keep sales and inventory in sync.',
    iconName: 'ShoppingCart',
    productIds: ['inventory-pos'],
  },
] as const;

export const HIDDEN_SYSTEM_IDS = new Set(['beauty-management', 'barbershop-management']);

export function systemCategoryFor(product: Product): string {
  return SYSTEM_CATEGORIES.find((category) =>
    (category.productIds as readonly string[]).includes(product.id)
  )?.name ?? product.category;
}
