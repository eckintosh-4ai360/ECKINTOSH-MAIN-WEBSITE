import { apiRequest } from './api';

export type AdminSearchScope = 'content' | 'projects' | 'inquiries' | 'media';

export interface AdminSearchResult {
  id: string;
  scope: AdminSearchScope;
  target: string;
  title: string;
  subtitle: string;
  match: string;
}

export function searchAdmin(query: string): Promise<AdminSearchResult[]> {
  return apiRequest<AdminSearchResult[]>(`/api/admin/search?q=${encodeURIComponent(query)}`);
}
