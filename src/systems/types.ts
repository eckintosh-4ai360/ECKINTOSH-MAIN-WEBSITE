import type { ReactNode } from 'react';
import type { AccentTheme } from './theme';

export interface SceneContext {
  accent: AccentTheme;
}

/**
 * A real screenshot used as a walkthrough frame.
 *
 * Files live under `public/systems/<system>/` and are referenced by their
 * served path. Vite copies `public/` through untouched, so screenshots cost
 * the bundle nothing even though the app builds to a single HTML file.
 */
export interface ImageFrame {
  /** Served path, e.g. "/systems/pos/dashboard.png". */
  src: string;
  /**
   * Cursor rest points as percentages of the image, visited in order.
   * Each one is also the focus point the frame zooms to on small screens,
   * which is what keeps a desktop screenshot readable on a phone.
   */
  hotspots?: [number, number][];
  /** Alt text for the frame. */
  alt?: string;
}

export interface Scene {
  id: string;
  /** Chip label in the scene switcher. */
  label: string;
  /** Subtitle line shown under the frame, like a voice-over caption. */
  caption: string;
  /** Seconds this scene holds when the reel plays. */
  duration: number;
  /**
   * Cursor rest points for a live-DOM scene, expressed as percentages of the
   * frame. Screenshot scenes keep these points inside `image.hotspots`.
   */
  hotspots?: [number, number][];
  /** A scene is either drawn in code... */
  render?: (ctx: SceneContext) => ReactNode;
  /** ...or a captured screenshot of the real product. */
  image?: ImageFrame;
}

export interface SystemDefinition {
  productId: string;
  appName: string;
  appInitials: string;
  /** Fake address shown in the browser chrome. */
  url: string;
  scenes: Scene[];
}
