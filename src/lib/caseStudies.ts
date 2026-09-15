import { CASE_STUDIES, type CaseStudy } from '../data/contentData';
import { apiRequest } from './api';

export type CaseStudyInput = Omit<CaseStudy, 'id'>;

export interface ManagedCaseStudy extends CaseStudy {
  source: 'database' | 'bundled';
}

let caseStudyPollTimer: number | null = null;

function managed(caseStudies: CaseStudy[], source: ManagedCaseStudy['source'] = 'database'): ManagedCaseStudy[] {
  return caseStudies.map((caseStudy) => ({ ...caseStudy, source }));
}

export function subscribeCaseStudies(
  onData: (caseStudies: ManagedCaseStudy[]) => void,
  onError?: (error: Error) => void
): () => void {
  let active = true;

  const load = async () => {
    try {
      const data = await apiRequest<CaseStudy[]>('/api/case-studies');
      // An empty table should still show the work we ship with.
      if (active) onData(managed(data.length ? data : CASE_STUDIES, data.length ? 'database' : 'bundled'));
    } catch (err) {
      // Keep the section populated if the API is unreachable.
      if (active) onData(managed(CASE_STUDIES, 'bundled'));
      if (active && onError) onError(err instanceof Error ? err : new Error('Failed to load case studies.'));
    }
  };

  load();
  caseStudyPollTimer = window.setInterval(load, 15000);

  return () => {
    active = false;
    if (caseStudyPollTimer !== null) {
      window.clearInterval(caseStudyPollTimer);
      caseStudyPollTimer = null;
    }
  };
}

export function subscribeAdminCaseStudies(
  onData: (caseStudies: ManagedCaseStudy[]) => void,
  onError?: (error: Error) => void
): () => void {
  let active = true;

  const load = async () => {
    try {
      const data = await apiRequest<CaseStudy[]>('/api/admin/case-studies');
      if (active) onData(managed(data));
    } catch (err) {
      if (active && onError) onError(err instanceof Error ? err : new Error('Failed to load projects.'));
    }
  };

  load();
  caseStudyPollTimer = window.setInterval(load, 15000);

  return () => {
    active = false;
    if (caseStudyPollTimer !== null) {
      window.clearInterval(caseStudyPollTimer);
      caseStudyPollTimer = null;
    }
  };
}

export async function addCaseStudy(data: CaseStudyInput): Promise<void> {
  await apiRequest<CaseStudy>('/api/admin/case-studies', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCaseStudy(id: string, data: CaseStudyInput): Promise<void> {
  await apiRequest<CaseStudy>(`/api/admin/case-studies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await apiRequest<{ ok: boolean }>(`/api/admin/case-studies/${id}`, {
    method: 'DELETE',
  });
}
