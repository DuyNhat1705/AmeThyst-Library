"use client";

import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '../utils/apiClient';
import { useStoredUser } from '../utils/user';

export interface BellAnnouncement {
  announceId: string;
  title: string;
  content: string;
  createdAt: string;
  expiredDate?: string;
}

/**
 * Reads the most recently "seen" announcement id from localStorage.
 * Safe to call on the server (returns null) since it guards on `window` and `userId`.
 */
function readLastSeenId(userId?: number): string | null {
  if (typeof window === 'undefined' || userId === undefined) return null;
  try {
    return window.localStorage.getItem(`amethyst:announcements:lastSeenId:${userId}`);
  } catch {
    // localStorage may be unavailable (private browsing, disabled storage, etc.)
    return null;
  }
}

function writeLastSeenId(id: string, userId?: number) {
  if (typeof window === 'undefined' || userId === undefined) return;
  try {
    window.localStorage.setItem(`amethyst:announcements:lastSeenId:${userId}`, id);
  } catch {
    // Ignore storage failures; unread dot will simply reappear next load.
  }
}

/**
 * Fetches active announcements and tracks whether the user has already
 * seen the newest one, so the bell dot only appears for genuinely new
 * notifications instead of on every page load.
 *
 * Read-state is tracked client-side only (v1): we store the id of the
 * newest announcement the user has opened the dropdown for. This is
 * intentionally simple and does not sync across devices/browsers.
 */
export function useAnnouncementBell(enabled: boolean, userId?: number) {
  const [announcements, setAnnouncements] = useState<BellAnnouncement[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const storedUser = useStoredUser();
  const activeUserId = userId ?? storedUser?.userId;

  useEffect(() => {
    if (!enabled || activeUserId === undefined) return;

    let cancelled = false;

    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await apiFetch<BellAnnouncement[]>('/api/announcements');
        if (cancelled) return;

        if (res.success && res.data) {
          setAnnouncements(res.data);

          const newestId = res.data[0]?.announceId ?? null;
          const lastSeenId = readLastSeenId(activeUserId);
          setHasUnread(Boolean(newestId) && newestId !== lastSeenId);
        }
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAnnouncements();

    return () => {
      cancelled = true;
    };
  }, [enabled, activeUserId]);

  /** Marks the current newest announcement as seen (call when the dropdown opens). */
  const markAsSeen = useCallback(() => {
    const newestId = announcements[0]?.announceId;
    if (newestId && activeUserId !== undefined) {
      writeLastSeenId(newestId, activeUserId);
    }
    setHasUnread(false);
  }, [announcements, activeUserId]);

  return {
    announcements,
    loading,
    hasUnread: activeUserId !== undefined && hasUnread,
    markAsSeen
  };
}

