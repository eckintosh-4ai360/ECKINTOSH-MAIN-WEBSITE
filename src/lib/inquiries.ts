import { apiRequest } from './api';

export type InquiryStatus = 'new' | 'read' | 'archived';

export interface Inquiry {
  id: string;
  projectType: string;
  timeline: string;
  budget: string;
  fullName: string;
  organization: string;
  phone: string;
  email: string;
  notes: string;
  status: InquiryStatus;
  createdAt: string;
}

export type NewInquiry = Omit<Inquiry, 'id' | 'status' | 'createdAt'>;

let inquiryPollTimer: number | null = null;

export async function submitInquiry(data: NewInquiry): Promise<void> {
  await apiRequest<Inquiry>('/api/inquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function subscribeInquiries(
  onData: (inquiries: Inquiry[]) => void,
  onError?: (error: Error) => void
): () => void {
  let active = true;

  const load = async () => {
    try {
      const data = await apiRequest<Inquiry[]>('/api/admin/inquiries');
      if (active) onData(data);
    } catch (err) {
      if (active && onError) onError(err instanceof Error ? err : new Error('Failed to load inquiries.'));
    }
  };

  load();
  inquiryPollTimer = window.setInterval(load, 15000);

  return () => {
    active = false;
    if (inquiryPollTimer !== null) {
      window.clearInterval(inquiryPollTimer);
      inquiryPollTimer = null;
    }
  };
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  await apiRequest<Inquiry>(`/api/admin/inquiries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function deleteInquiry(id: string): Promise<void> {
  await apiRequest<{ ok: boolean }>(`/api/admin/inquiries/${id}`, {
    method: 'DELETE',
  });
}
