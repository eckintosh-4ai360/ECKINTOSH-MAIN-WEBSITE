import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SITE_CONTENT, type SiteContent } from '../data/contentData';
import { apiRequest } from './api';

interface SiteContentContextValue {
  content: SiteContent;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setContent(await apiRequest<SiteContent>('/api/content'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load site content.');
      setContent(DEFAULT_SITE_CONTENT);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      content,
      loading,
      error,
      refresh,
    }),
    [content, error, loading, refresh]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export function useSiteContent(): SiteContentContextValue {
  const value = useContext(SiteContentContext);
  if (!value) {
    throw new Error('useSiteContent must be used inside SiteContentProvider');
  }
  return value;
}
