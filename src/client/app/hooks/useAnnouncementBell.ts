"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { apiFetch } from '../utils/apiClient';
import { useStoredUser, getAuthToken } from '../utils/user';
import { useSocket } from '../utils/useSocket';

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
function readLastSeenId(userId?: string): string | null {
  if (typeof window === 'undefined' || userId === undefined) return null;
  try {
    return window.localStorage.getItem(`amethyst:announcements:lastSeenId:${userId}`);
  } catch {
    // localStorage may be unavailable (private browsing, disabled storage, etc.)
    return null;
  }
}

function writeLastSeenId(id: string, userId?: string) {
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
export function useAnnouncementBell(enabled: boolean, userId?: string) {
  const [announcements, setAnnouncements] = useState<BellAnnouncement[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const storedUser = useStoredUser();
  const activeUserId = userId ?? storedUser?.userId;

  useEffect(() => {
    if (enabled) {
      setToken(getAuthToken());
    } else {
      setToken(null);
    }
  }, [enabled]);

  const socket = useSocket(token);

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchAnnouncements = useCallback(async () => {
    if (activeUserId === undefined) return;
    setLoading(true);
    try {
      const res = await apiFetch<BellAnnouncement[]>('/api/announcements');
      if (!isMountedRef.current) return;

      if (res.success && res.data) {
        setAnnouncements(res.data);

        const newestId = res.data[0]?.announceId ?? null;
        const lastSeenId = readLastSeenId(activeUserId);
        setHasUnread(Boolean(newestId) && newestId !== lastSeenId);
      }
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, [activeUserId]);

  useEffect(() => {
    if (!enabled || activeUserId === undefined) return;
    fetchAnnouncements();
  }, [enabled, activeUserId, fetchAnnouncements]);

  useEffect(() => {
    if (!enabled || !socket || activeUserId === undefined) return;

    const handleAnnouncementChanged = () => {
      fetchAnnouncements();
    };

    socket.on('announcement:changed', handleAnnouncementChanged);

    return () => {
      socket.off('announcement:changed', handleAnnouncementChanged);
    };
  }, [enabled, socket, activeUserId, fetchAnnouncements]);

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

