const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
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

  if (!response.ok) {
    return {
      success: false,
      message: data.message || data.error || 'Request failed',
    };
  }

  if (data.success === false) {
    return {
      success: false,
      message: data.message || data.error || 'Request failed',
    };
  }

  return {
    success: true,
    data: (data.success === true ? data.data : data) as T,
  };
}
