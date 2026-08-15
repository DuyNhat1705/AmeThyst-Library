'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { setCurrentUser, type StoredUser } from '../utils/user';
import { safeFetch, getCsrfToken, resetCsrfToken } from '../utils/apiClient';

interface AuthState { user: StoredUser | null; loading: boolean; refresh: () => Promise<void> }
const AuthContext = createContext<AuthState>({ user: null, loading: true, refresh: async () => undefined });
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try {
      let response = await safeFetch(`${apiUrl}/auth/me`, { credentials: 'include' });
      if (!response) { setUser(null); setCurrentUser(null); return; }
      if (response.status === 401) {
        const csrf = await getCsrfToken();
        const refreshed = await safeFetch(`${apiUrl}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: csrf ? { 'X-CSRF-Token': csrf } : {},
        });
        if (refreshed && refreshed.ok) {
          resetCsrfToken();
          response = await safeFetch(`${apiUrl}/auth/me`, { credentials: 'include' });
        }
      }
      const body = response.ok ? await response.json() : null;
      const next = body?.data || null;
      setUser(next); setCurrentUser(next);
    } catch { setUser(null); setCurrentUser(null); }
  }, []);
  useEffect(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    void refresh().finally(() => { setLoading(false); window.dispatchEvent(new Event('auth-ready')); });
    const onUpdate = (event: Event) => setUser((event as CustomEvent<StoredUser | null>).detail);
    window.addEventListener('user-updated', onUpdate);
    return () => window.removeEventListener('user-updated', onUpdate);
  }, [refresh]);
  const value = useMemo(() => ({ user, loading, refresh }), [user, loading, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
