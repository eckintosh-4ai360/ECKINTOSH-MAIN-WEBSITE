import { apiRequest } from './api';

const AUTH_EVENT = 'eckintosh-admin-auth-changed';

export const isAdminPasswordConfigured = true;

interface AdminSession {
  user: {
    sub: string;
    email: string;
  };
}

async function isLoggedIn(): Promise<boolean> {
  try {
    await apiRequest<AdminSession>('/api/admin/session');
    return true;
  } catch {
    return false;
  }
}

export function subscribeAdminAuth(onChange: (loggedIn: boolean) => void): () => void {
  let active = true;

  const check = async () => {
    const loggedIn = await isLoggedIn();
    if (active) onChange(loggedIn);
  };

  check();

  const handler = () => {
    check();
  };
  window.addEventListener(AUTH_EVENT, handler);

  return () => {
    active = false;
    window.removeEventListener(AUTH_EVENT, handler);
  };
}

export async function signInAdmin(email: string, password: string): Promise<void> {
  await apiRequest<AdminSession>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export async function signOutAdmin(): Promise<void> {
  await apiRequest<{ ok: boolean }>('/api/admin/logout', { method: 'POST' });
  window.dispatchEvent(new Event(AUTH_EVENT));
}
