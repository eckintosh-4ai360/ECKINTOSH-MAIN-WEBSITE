const listeners = new Map<string, Set<() => void>>();

export function readList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function writeList<T>(key: string, list: T[]): void {
  localStorage.setItem(key, JSON.stringify(list));
  listeners.get(key)?.forEach((cb) => cb());
}

export function subscribeList(key: string, callback: () => void): () => void {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(callback);

  const onStorage = (e: StorageEvent) => {
    if (e.key === key) callback();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.get(key)?.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}
