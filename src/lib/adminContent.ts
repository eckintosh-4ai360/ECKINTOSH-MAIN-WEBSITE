import type { SiteContent } from '../data/contentData';
import { apiRequest } from './api';

export function loadAdminContent(): Promise<SiteContent> {
  return apiRequest<SiteContent>('/api/admin/content');
}

export function saveAdminContent(content: SiteContent): Promise<SiteContent> {
  return apiRequest<SiteContent>('/api/admin/content', {
    method: 'PUT',
    body: JSON.stringify(content),
  });
}
