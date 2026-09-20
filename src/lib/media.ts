import { apiRequest } from './api';

export interface MediaAsset {
  id: string;
  public_id: string;
  url: string;
  secure_url: string;
  resource_type: string;
  folder: string;
  original_filename: string;
  bytes?: number;
  width?: number;
  height?: number;
  created_at: string;
}

export function listMedia(): Promise<MediaAsset[]> {
  return apiRequest<MediaAsset[]>('/api/admin/media');
}

export async function uploadMedia(file: File, folder = 'media'): Promise<MediaAsset> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  return apiRequest<MediaAsset>('/api/admin/media', {
    method: 'POST',
    body: formData,
  });
}
