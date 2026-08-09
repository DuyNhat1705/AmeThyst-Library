const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function getBranchId(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.branch_id || null;
  } catch {
    return null;
  }
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) return {};
  return { 'Authorization': `Bearer ${token}` };
}

export interface ApiResult<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: { page: number; pageSize: number; totalItems: number; totalPages: number };
  error?: { code: string; message: string; details?: Record<string, unknown>; retryAt?: string | null };
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (response.status === 401 && (data.error?.code === 'AUTH_USER_NOT_FOUND' || data.error?.code === 'USER_SUSPENDED') && typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('user-updated', { detail: null }));
  }

  if (!response.ok) {
    return {
      success: false,
      message: data.error?.message || data.message || (typeof data.error === 'string' ? data.error : 'Request failed'),
      error: typeof data.error === 'object' ? data.error : undefined,
    };
  }

  if (data.success === false) {
    return {
      success: false,
      message: data.error?.message || data.message || (typeof data.error === 'string' ? data.error : 'Request failed'),
      error: typeof data.error === 'object' ? data.error : undefined,
    };
  }

  return {
    success: true,
    data: (data.success === true ? data.data : data) as T,
    message: data.message,
    meta: data.meta,
  };
}
