export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const API_BASE = '/api';

function getApiKey(): string | undefined {
  // Prefer env at build-time; fallback to runtime localStorage
  const fromEnv = process.env.REACT_APP_API_KEY?.trim();
  if (fromEnv) return fromEnv;
  const fromLS = typeof window !== 'undefined' ? localStorage.getItem('apiKey') || '' : '';
  return fromLS || undefined;
}

export async function api<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const apiKey = getApiKey();
  if (apiKey) (headers as Record<string, string>).Authorization = `Bearer ${apiKey}`;

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  // Some endpoints might return empty
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return (undefined as unknown) as T;
  return (await res.json()) as T;
}

export async function get<T = any>(path: string): Promise<T> {
  return api<T>(path, { method: 'GET' });
}

