import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export interface StoredUser {
  userId?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  avatar?: string;
  role?: string;
}

export function getLoggedInUser(): StoredUser | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

export function getLoggedInUserInitials(): string {
  const user = getLoggedInUser();
  if (!user || !user.username) return '';
  return getInitials(user.username);
}

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token') && !!localStorage.getItem('user');
}

/**
 * Returns the stored JWT token, or null if not logged in.
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

/**
 * Clears the stored auth token and user data, logging the user out.
 */
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new CustomEvent('user-updated', { detail: null }));
}

/**
 * Merges partial fields into the stored user object and persists it.
 * Only updates keys that are defined in StoredUser.
 */
export function updateStoredUser(partial: Partial<StoredUser>): StoredUser | null {
  const current = getLoggedInUser();
  if (!current) return null;
  const updated: StoredUser = { ...current, ...partial };
  localStorage.setItem('user', JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('user-updated', { detail: updated }));
  }
  return updated;
}

/**
 * Custom React hook that registers state for stored user updates
 * and triggers re-renders on the custom 'user-updated' event.
 */
export function useStoredUser(): StoredUser | null {
  const [user, setUser] = useState<StoredUser | null>(() =>
    typeof window !== 'undefined' ? getLoggedInUser() : null
  );

  useEffect(() => {
    const onCustom = (e: Event) => {
      setUser((e as CustomEvent<StoredUser | null>).detail);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener('user-updated', onCustom);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('user-updated', onCustom);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return user;
}

/**
 * Redirects the user to the specified path if they are already logged in.
 * If no path is given, resolves based on the user's role.
 */
export function useRedirectIfLoggedIn(redirectTo?: string): void {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn()) {
      const target = redirectTo || getRedirectPathForUser(getLoggedInUser());
      router.push(target);
    }
  }, [router, redirectTo]);
}

/**
 * Redirects the user to the login page if they are not logged in.
 */
export function useRequireAuth(redirectTo: string = '/login'): void {
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
}
/**
 * Resolves the redirect path based on the user's role.
 */
export function getRedirectPathForUser(user: StoredUser | null): string {
  if (!user) return '/login';
  if (user.role === 'librarian') return '/dashboard/librarian';
  if (user.role === 'admin') return '/dashboard/admin';
  return '/library';
}

/**
 * Returns the dashboard path based on user's role.
 */
export function getDashboardPath(user: StoredUser | null): string {
  if (!user) return '';
  if (user.role === 'librarian') return '/dashboard/librarian';
  if (user.role === 'admin') return '/dashboard/admin';
  return '/dashboard/user';
}
