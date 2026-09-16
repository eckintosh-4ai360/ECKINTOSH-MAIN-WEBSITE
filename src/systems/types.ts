import type { ReactNode } from 'react';
import type { AccentTheme } from './theme';

export interface SceneContext {
  accent: AccentTheme;
}

export interface Scene {
  id: string;
  /** Chip label in the scene switcher. */
  label: string;
  /** Subtitle line shown under the frame, like a voice-over caption. */
  caption: string;
  /** Seconds this scene holds when the reel plays. */
  duration: number;
  render: (ctx: SceneContext) => ReactNode;
}

export interface SystemDefinition {
  productId: string;
  appName: string;
  appInitials: string;
  /** Fake address shown in the browser chrome. */
  url: string;
  scenes: Scene[];
}
