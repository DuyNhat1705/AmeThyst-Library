"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { apiFetch } from '../utils/apiClient';
import { useStoredUser, getAuthToken } from '../utils/user';
import { useSocket } from '../utils/useSocket';
import {
  listStudyGroupInvitations,
  acceptStudyGroupInvitation,
  denyStudyGroupInvitation,
} from '../utils/studyGroup';
import type {
  StudyGroupNotificationActor,
  StudyGroupInvitation,
  StudyGroupLifecycleNotification,
} from '../types/studyGroup';

export interface BellAnnouncement {
  announceId: string;
  title: string;
  content: string;
  createdAt: string;
  expiredDate?: string;
}

export type {
  StudyGroupNotificationActor,
  StudyGroupInvitation,
  StudyGroupLifecycleNotification,
} from '../types/studyGroup';

function readSeenIds(userId?: number | string): string[] {
  if (typeof window === 'undefined' || userId === undefined) return [];
  try {
    const key = `amethyst:announcements:seenIds:${userId}`;
    const stored = window.localStorage.getItem(key);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every((x): x is string => typeof x === 'string')) {
        return parsed;
      }
    }
    return [];
  } catch {
    return [];
  }
}

function writeSeenIds(ids: string[], userId?: number | string): boolean {
  if (typeof window === 'undefined' || userId === undefined) return false;
  try {
    const key = `amethyst:announcements:seenIds:${userId}`;
    window.localStorage.setItem(key, JSON.stringify(ids));
    return window.localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

export function useAnnouncementBell(enabled: boolean, userId?: number | string, t?: (key: string) => string) {
  const [announcements, setAnnouncements] = useState<BellAnnouncement[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // User-scoped states
  const [seenAnnouncementIds, setSeenAnnouncementIds] = useState<string[]>([]);
  const [invitations, setInvitations] = useState<StudyGroupInvitation[]>([]);
  const [invitationsLoaded, setInvitationsLoaded] = useState(false);
  const handledLinkRef = useRef(false);
  const [invitationUnavailable, setInvitationUnavailable] = useState(false);
  const [readInvitationIds, setReadInvitationIds] = useState<string[]>([]);
  const [systemNotifications, setSystemNotifications] = useState<StudyGroupLifecycleNotification[]>([]);
  const [selected, setSelected] = useState<StudyGroupInvitation | null>(null);
  const [selectedSystemNotification, setSelectedSystemNotification] = useState<StudyGroupLifecycleNotification | null>(null);
  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storedUser = useStoredUser();
  const activeUserId = userId ?? storedUser?.userId;
  const isUserRole = storedUser?.role === 'user';

  const readStorageKey = activeUserId ? `study-group-invitation-read:${activeUserId}` : null;
  const systemStorageKey = activeUserId ? `study-group-system-notifications:${activeUserId}` : null;

  // Track the resolved active user ID in a ref to protect against cross-user async state leakage
  const activeUserIdRef = useRef<number | string | undefined>(activeUserId);
  useEffect(() => {
    activeUserIdRef.current = activeUserId;
  }, [activeUserId]);

  // Track the user ID who owns the currently loaded user-scoped state to prevent single-frame cross-user leakage
  const [stateOwnerId, setStateOwnerId] = useState<number | string | undefined>(activeUserId);

  // Reset user-scoped states when activeUserId changes
  useEffect(() => {
    setAnnouncements([]);
    setInvitations([]);
    setInvitationsLoaded(false);
    handledLinkRef.current = false;
    setSystemNotifications([]);
    setReadInvitationIds([]);
    setSeenAnnouncementIds([]);
    setSelected(null);
    setSelectedSystemNotification(null);
    setError(null);
    setInvitationUnavailable(false);
    setActing(false);
    setLoading(false);
    setStateOwnerId(activeUserId);
  }, [activeUserId]);

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
    const requestingUserId = activeUserId;
    setLoading(true);
    try {
      const res = await apiFetch<BellAnnouncement[]>('/api/announcements');
      if (
        isMountedRef.current &&
        activeUserIdRef.current === requestingUserId
      ) {
        if (res.success && res.data) {
          setAnnouncements(res.data);

          // Auto-migrate legacy lastSeenId string to user-scoped seenIds array
          try {
            const key = `amethyst:announcements:seenIds:${activeUserId}`;
            const legacyKey = `amethyst:announcements:lastSeenId:${activeUserId}`;
            let currentSeenIds = readSeenIds(activeUserId);

            if (window.localStorage.getItem(key) === null) {
              const legacyVal = window.localStorage.getItem(legacyKey);
              if (legacyVal) {
                let migratedIds = [legacyVal];
                const lastSeenIndex = res.data.findIndex((ann) => ann.announceId === legacyVal);
                if (lastSeenIndex !== -1) {
                  migratedIds = res.data.slice(lastSeenIndex).map((ann) => ann.announceId);
                }
                const success = writeSeenIds(migratedIds, activeUserId);
                if (success) {
                  window.localStorage.removeItem(legacyKey);
                }
                currentSeenIds = migratedIds;
                setSeenAnnouncementIds(migratedIds);
              }
            }

            // Reconcile stale seen IDs
            const activeSet = new Set(res.data.map((ann) => ann.announceId));
            const cleanedSeenIds = currentSeenIds.filter((id) => activeSet.has(id));
            if (cleanedSeenIds.length !== currentSeenIds.length) {
              writeSeenIds(cleanedSeenIds, activeUserId);
              setSeenAnnouncementIds(cleanedSeenIds);
            }
          } catch {
            // Ignore storage errors safely
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    } finally {
      if (
        isMountedRef.current &&
        activeUserIdRef.current === requestingUserId
      ) {
        setLoading(false);
      }
    }
  }, [activeUserId]);

  const loadInvitations = useCallback(async () => {
    if (!isUserRole) return;
    const requestingUserId = activeUserId;
    if (requestingUserId === undefined) return;
    const result = await listStudyGroupInvitations();
    if (
      result.success &&
      result.data &&
      isMountedRef.current &&
      activeUserIdRef.current === requestingUserId
    ) {
      setInvitations(result.data);
      setInvitationsLoaded(true);
    }
  }, [isUserRole, activeUserId]);

  // Mark all active announcements read on dropdown open
  const markAsSeen = useCallback(() => {
    if (activeUserId === undefined) return;
    setSeenAnnouncementIds((prev) => {
      const nextSet = new Set(prev);
      let changed = false;
      announcements.forEach((ann) => {
        if (!nextSet.has(ann.announceId)) {
          nextSet.add(ann.announceId);
          changed = true;
        }
      });
      if (changed) {
        const nextArr = Array.from(nextSet);
        writeSeenIds(nextArr, activeUserId);
        return nextArr;
      }
      return prev;
    });
  }, [announcements, activeUserId]);

  const markInvitationRead = useCallback((requestId: string) => {
    setReadInvitationIds((current) => {
      if (current.includes(requestId)) return current;
      const next = [...current, requestId];
      if (readStorageKey) {
        try {
          localStorage.setItem(readStorageKey, JSON.stringify(next));
        } catch {
          // Ignore
        }
      }
      return next;
    });
  }, [readStorageKey]);

  const openSystemNotification = useCallback((notification: StudyGroupLifecycleNotification) => {
    const next = systemNotifications.map((item) => item.id === notification.id ? { ...item, read: true } : item);
    setSystemNotifications(next);
    if (systemStorageKey) {
      try {
        localStorage.setItem(systemStorageKey, JSON.stringify(next));
      } catch {
        // Ignore
      }
    }
    setSelectedSystemNotification({ ...notification, read: true });
  }, [systemNotifications, systemStorageKey]);

  const decide = async (invitation: StudyGroupInvitation, decision: 'accept' | 'deny') => {
    const requestingUserId = activeUserId;
    if (requestingUserId === undefined) return;
    setActing(true);
    setError(null);
    const result = decision === 'accept'
      ? await acceptStudyGroupInvitation(invitation.group.groupId, invitation.requestId)
      : await denyStudyGroupInvitation(invitation.group.groupId, invitation.requestId);

    if (activeUserIdRef.current !== requestingUserId) {
      // Ignore response and cancel execution if the user has changed during the request
      return;
    }

    setActing(false);

    if (!result.success) {
      const apiError = result.error;
      if (apiError?.code === 'NOT_FOUND' || apiError?.code === 'STALE_STATE' || apiError?.code === 'VALIDATION_ERROR') {
        setSelected(null);
        setInvitationUnavailable(true);
        setInvitations((items) => items.filter((item) => item.requestId !== invitation.requestId));
        return;
      }
      setError(result.message || (t ? t('study_group.invitation_action_error') : 'Action could not be completed.'));
      return;
    }

    setInvitations((items) => items.filter((item) => item.requestId !== invitation.requestId));
    setSelected(null);

    window.location.href = decision === 'accept'
      ? `/dashboard/user/yourstudygroups/joined/${invitation.group.groupId}?joined=1`
      : '/dashboard/user/yourstudygroups';
  };

  // Load seen IDs and study group local storages
  useEffect(() => {
    if (activeUserId === undefined) return;
    setSeenAnnouncementIds(readSeenIds(activeUserId));

    if (readStorageKey) {
      try {
        const stored = JSON.parse(localStorage.getItem(readStorageKey) || '[]');
        setReadInvitationIds(Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : []);
      } catch {
        setReadInvitationIds([]);
      }
    }
    if (systemStorageKey) {
      try {
        const stored = JSON.parse(localStorage.getItem(systemStorageKey) || '[]');
        setSystemNotifications(Array.isArray(stored) ? stored.slice(0, 50) : []);
      } catch {
        setSystemNotifications([]);
      }
    }
  }, [activeUserId, readStorageKey, systemStorageKey]);

  useEffect(() => {
    if (!enabled || activeUserId === undefined) return;
    fetchAnnouncements();
    if (isUserRole) {
      loadInvitations();
    }
  }, [enabled, activeUserId, fetchAnnouncements, isUserRole, loadInvitations]);

  // Handle invitation deep-linking once per page load/user session
  useEffect(() => {
    if (activeUserId === undefined || !isUserRole || !invitationsLoaded || handledLinkRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const requestId = params.get('invitation');
    if (!requestId) return;

    handledLinkRef.current = true;
    const invitation = invitations.find((item) => item.requestId === requestId);
    if (!invitation) {
      window.setTimeout(() => {
        if (isMountedRef.current) {
          setInvitationUnavailable(true);
        }
      }, 0);
      return;
    }

    window.setTimeout(() => {
      if (isMountedRef.current) {
        markInvitationRead(invitation.requestId);
        setSelected(invitation);
      }
    }, 0);
  }, [activeUserId, isUserRole, invitationsLoaded, invitations, markInvitationRead, setSelected, setInvitationUnavailable]);

  // Socket listener registration
  useEffect(() => {
    if (!enabled || !socket || activeUserId === undefined) return;

    const handleAnnouncementChanged = (data?: { action?: string; announcement?: BellAnnouncement }) => {
      if (data && (data.action === 'republished' || data.action === 'published') && data.announcement?.announceId) {
        const republishId = data.announcement.announceId;
        setSeenAnnouncementIds((prev) => {
          const nextSet = new Set(prev);
          if (nextSet.has(republishId)) {
            nextSet.delete(republishId);
            const nextArr = Array.from(nextSet);
            writeSeenIds(nextArr, activeUserId);
            return nextArr;
          }
          return prev;
        });
      }
      fetchAnnouncements();
    };

    socket.on('announcement:changed', handleAnnouncementChanged);

    return () => {
      socket.off('announcement:changed', handleAnnouncementChanged);
    };
  }, [enabled, socket, activeUserId, fetchAnnouncements]);

  useEffect(() => {
    if (!socket || !isUserRole) return;
    const refresh = () => void loadInvitations();
    const receiveNotification = (notification: StudyGroupLifecycleNotification) => {
      setSystemNotifications((current) => {
        if (current.some((item) => item.id === notification.id)) return current;
        const next = [{ ...notification, read: false }, ...current].slice(0, 50);
        if (systemStorageKey) {
          try {
            localStorage.setItem(systemStorageKey, JSON.stringify(next));
          } catch {
            // Ignore
          }
        }
        return next;
      });
    };

    socket.on('study-group:changed', refresh);
    socket.on('notification:new', receiveNotification);

    return () => {
      socket.off('study-group:changed', refresh);
      socket.off('notification:new', receiveNotification);
    };
  }, [socket, isUserRole, loadInvitations, systemStorageKey]);



  const isStateValid = stateOwnerId === activeUserId;

  const validAnnouncements = isStateValid ? announcements : [];
  const validSeenAnnouncementIds = isStateValid ? seenAnnouncementIds : [];
  const validInvitations = isStateValid ? invitations : [];
  const validReadInvitationIds = isStateValid ? readInvitationIds : [];
  const validSystemNotifications = isStateValid ? systemNotifications : [];
  const validSelected = isStateValid ? selected : null;
  const validSelectedSystemNotification = isStateValid ? selectedSystemNotification : null;
  const validInvitationUnavailable = isStateValid ? invitationUnavailable : false;
  const validActing = isStateValid ? acting : false;
  const validError = isStateValid ? error : null;

  const seenIdSet = useMemo(() => new Set(validSeenAnnouncementIds), [validSeenAnnouncementIds]);

  // Dynamically calculate hasUnread unified state on render to avoid stale React state
  const hasUnread = activeUserId !== undefined && (
    validAnnouncements.some((ann) => !seenIdSet.has(ann.announceId)) ||
    (isUserRole && (
      validInvitations.some((item) => !validReadInvitationIds.includes(item.requestId)) ||
      validSystemNotifications.some((item) => !item.read)
    ))
  );

  return {
    announcements: validAnnouncements,
    loading: isStateValid ? loading : false,
    hasUnread,
    markAsSeen,
    // Unified study group notifications state
    seenAnnouncementIds: validSeenAnnouncementIds,
    invitations: validInvitations,
    invitationUnavailable: validInvitationUnavailable,
    setInvitationUnavailable,
    readInvitationIds: validReadInvitationIds,
    systemNotifications: validSystemNotifications,
    selected: validSelected,
    setSelected,
    selectedSystemNotification: validSelectedSystemNotification,
    setSelectedSystemNotification,
    acting: validActing,
    error: validError,
    markInvitationRead,
    openSystemNotification,
    decide,
    isUserRole
  };
}
