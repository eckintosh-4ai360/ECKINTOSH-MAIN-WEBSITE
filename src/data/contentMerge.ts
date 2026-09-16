import { CONTENT_VERSION, DEFAULT_SITE_CONTENT, type SiteContent } from './contentData';

type Plain = Record<string, unknown>;

function isPlainObject(value: unknown): value is Plain {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep merge of stored content over the shipped defaults.
 *
 * Objects merge key by key so newly shipped fields appear even for sites that
 * already have a saved record. Arrays are all-or-nothing: when the saved record
 * was written against the current CONTENT_VERSION the editor's arrays win,
 * otherwise the defaults win so newly shipped list items (products, sections)
 * are not hidden by a stale save.
 */
function merge(base: unknown, override: unknown, keepStoredArrays: boolean): unknown {
  if (override === undefined || override === null) return base;

  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    return keepStoredArrays ? override : base;
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(override)) return base;
    const result: Plain = { ...base };
    for (const key of new Set([...Object.keys(base), ...Object.keys(override)])) {
      result[key] = key in base ? merge(base[key], override[key], keepStoredArrays) : override[key];
    }
    return result;
  }

  return override;
}

export function mergeSiteContent(stored: unknown): SiteContent {
  if (!isPlainObject(stored)) return DEFAULT_SITE_CONTENT;
  const keepStoredArrays = stored.contentVersion === CONTENT_VERSION;
  const merged = merge(DEFAULT_SITE_CONTENT, stored, keepStoredArrays) as SiteContent;
  return { ...merged, contentVersion: CONTENT_VERSION };
}

export function stampContentVersion(content: SiteContent): SiteContent {
  return { ...content, contentVersion: CONTENT_VERSION };
}
