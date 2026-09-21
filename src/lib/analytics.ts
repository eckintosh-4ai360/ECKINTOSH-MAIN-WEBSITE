import { apiRequest } from './api';

export interface AnalyticsSummary {
  total: number;
  last24h: number;
  last7d: number;
  topPaths: { path: string; count: number }[];
  daily: { day: string; count: number }[];
}

export function loadAnalyticsSummary(): Promise<AnalyticsSummary> {
  return apiRequest<AnalyticsSummary>('/api/admin/analytics/summary');
}

/**
 * First-party pageview tracking. No third-party script, no cookies, no IP
 * or device fingerprinting — just a path and the referrer's origin, sent to
 * our own API. Skips entirely when the visitor has Do Not Track enabled.
 */
export function trackPageview(path: string = window.location.pathname + window.location.hash): void {
  try {
    if (navigator.doNotTrack === '1' || (window as unknown as { doNotTrack?: string }).doNotTrack === '1') {
      return;
    }

    const payload = JSON.stringify({ path, referrer: document.referrer });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/event', blob);
      return;
    }

    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // Analytics is best-effort; never let it disturb the visitor.
    });
  } catch {
    // Ignore — analytics must never break the page.
  }
}
