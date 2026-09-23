import type { SystemDefinition } from './types';
import { aiSystem } from './screens/ai';
import { barbershopSystem } from './screens/barbershop';
import { beautySystem } from './screens/beauty';
import { ecommerceSystem } from './screens/ecommerce';
import { learningSystem } from './screens/learning';
import { pharmacySystem } from './screens/pharmacy';
import { posSystem } from './screens/pos';
import { schoolSystem } from './screens/school';

export const SYSTEM_DEFINITIONS: SystemDefinition[] = [
  schoolSystem,
  aiSystem,
  pharmacySystem,
  posSystem,
  ecommerceSystem,
  beautySystem,
  barbershopSystem,
  learningSystem,
];

const byId = new Map(SYSTEM_DEFINITIONS.map((system) => [system.productId, system]));

export function systemFor(productId: string): SystemDefinition | undefined {
  return byId.get(productId);
}

export { type SystemDefinition } from './types';
