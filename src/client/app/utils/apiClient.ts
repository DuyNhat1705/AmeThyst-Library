const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function getToken(): null { return null; }
export function getBranchId(): string | null { return null; }
export function authHeaders(): Record<string, string> {
  const csrf = readCookie('amethyst_csrf');
  return csrf ? { 'X-CSRF-Token': csrf } : {};
}

export interface ApiResult<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: { page: number; pageSize: number; totalItems: number; totalPages: number };
  error?: { code: string; message: string; details?: Record<string, unknown>; retryAt?: string | null };
}

const readCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const entry = document.cookie.split('; ').find((item) => item.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
};

const parseResponse = async (response: Response): Promise<any> => {
  if (response.status === 204) return null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try { return await response.json(); } catch { return null; }
  }
  const text = await response.text();
  return text ? { message: text } : null;
};

const refreshSession = async () => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: readCookie('amethyst_csrf') ? { 'X-CSRF-Token': readCookie('amethyst_csrf')! } : {},
  });
  if (!response.ok) return false;
  const data = await parseResponse(response);
  const user = data?.data?.user;
  if (typeof window !== 'undefined' && user) window.dispatchEvent(new CustomEvent('user-updated', { detail: user }));
  return true;
};

export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}, retried = false): Promise<ApiResult<T>> {
  const headers = new Headers(options.headers || {});
  const method = String(options.method || 'GET').toUpperCase();
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    let csrfToken = readCookie('amethyst_csrf');
    if (!csrfToken) {
      await fetch(`${API_URL}/auth/csrf`, { credentials: 'include' });
      csrfToken = readCookie('amethyst_csrf');
    }
    if (csrfToken) headers.set('X-CSRF-Token', csrfToken);
  }
  const response = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: 'include' });
  if (response.status === 401 && !retried && !path.startsWith('/auth/')) {
    if (await refreshSession()) return apiFetch<T>(path, options, true);
  }
  const data = await parseResponse(response);
  if (!response.ok || data?.success === false) {
    if (response.status === 401 && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('user-updated', { detail: null }));
      const returnTo = `${window.location.pathname}${window.location.search}`;
      if (!window.location.pathname.startsWith('/login')) window.location.assign(`/login?returnTo=${encodeURIComponent(returnTo)}`);
    }
    const fallback = response.statusText || 'Request failed';
    return { success: false, message: data?.error?.message || data?.message || (typeof data?.error === 'string' ? data.error : fallback), error: typeof data?.error === 'object' ? data.error : undefined };
  }
  return { success: true, data: (data?.success === true ? data.data : data) as T, message: data?.message, meta: data?.meta };
}
