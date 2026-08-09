"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import BellIcon from '../atoms/BellIcon';
import NotificationDot from '../atoms/NotificationDot';
import NotificationDropdownPanel from './NotificationDropdownPanel';
import AnnouncementReadingModal from '../organisms/AnnouncementReadingModal';
import StudyGroupInvitationModal from '../organisms/StudyGroupInvitationModal';
import StudyGroupLifecycleModal from '../organisms/StudyGroupLifecycleModal';
import StudyGroupInvitationUnavailableModal from '../organisms/StudyGroupInvitationUnavailableModal';
import { displayDate } from '../../utils/notificationFormat';
import { useI18n } from '../../providers/I18nProvider';
import {
  useAnnouncementBell,
  type BellAnnouncement,
  type StudyGroupInvitation,
  type StudyGroupLifecycleNotification,
} from '../../hooks/useAnnouncementBell';

interface NotificationBellProps {
  enabled: boolean;
  t: (key: string) => string;
  userId?: string;
}

export type UnifiedNotificationItem =
  | {
      id: string;
      type: 'announcement';
      title: string;
      description: string;
      timestamp: string;
      read: boolean;
      rawItem: BellAnnouncement;
    }
  | {
      id: string;
      type: 'study_group_invitation';
      title: string;
      description: string;
      timestamp: string;
      read: boolean;
      rawItem: StudyGroupInvitation;
    }
  | {
      id: string;
      type: 'study_group_lifecycle';
      title: string;
      description: string;
      timestamp: string;
      read: boolean;
      rawItem: StudyGroupLifecycleNotification;
    };

export { displayDate };

const parseTimestamp = (val: string | undefined | null): number => {
  if (!val) return 0;
  const time = Date.parse(val);
  return isFinite(time) ? time : 0;
};

export default function NotificationBell({ enabled, t, userId }: NotificationBellProps) {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<BellAnnouncement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    announcements,
    loading,
    hasUnread,
    markAsSeen,
    seenAnnouncementIds,
    invitations,
    invitationUnavailable,
    setInvitationUnavailable,
    readInvitationIds,
    systemNotifications,
    selected,
    setSelected,
    selectedSystemNotification,
    setSelectedSystemNotification,
    acting,
    error,
    decide,
    markInvitationRead,
    openSystemNotification,
    isUserRole
  } = useAnnouncementBell(enabled, userId, t);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selected || selectedSystemNotification || invitationUnavailable) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [invitationUnavailable, selected, selectedSystemNotification]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) markAsSeen();
      return next;
    });
  };

  const handleItemClick = (item: UnifiedNotificationItem) => {
    setIsOpen(false);
    if (item.type === 'announcement') {
      setSelectedAnnouncement(item.rawItem);
    } else if (item.type === 'study_group_invitation') {
      markInvitationRead(item.id);
      setSelected(item.rawItem);
    } else if (item.type === 'study_group_lifecycle') {
      openSystemNotification(item.rawItem);
    }
  };

  const closeUnavailableInvitation = () => {
    setInvitationUnavailable(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('invitation');
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  };

  const seenAnnouncementIdSet = useMemo(
    () => new Set(seenAnnouncementIds),
    [seenAnnouncementIds]
  );

  // Compile Unified notifications feed with namespaced keys
  const unifiedNotifications: UnifiedNotificationItem[] = [
    ...announcements.map((ann) => {
      const isRead = seenAnnouncementIdSet.has(ann.announceId);

      return {
        id: ann.announceId,
        type: 'announcement' as const,
        title: ann.title,
        description: ann.content,
        timestamp: ann.createdAt,
        read: isRead,
        rawItem: ann
      };
    }),
    ...(isUserRole ? invitations.map((invite) => ({
      id: invite.requestId,
      type: 'study_group_invitation' as const,
      title: invite.group.title,
      description: t('study_group.invited_by').replace('{name}', invite.group.host.username),
      timestamp: invite.invitedAt,
      read: readInvitationIds.includes(invite.requestId),
      rawItem: invite
    })) : []),
    ...(isUserRole ? systemNotifications.map((notif) => ({
      id: notif.id,
      type: 'study_group_lifecycle' as const,
      title: notif.group.title,
      description: t(`study_group.notification_${notif.type}_summary`).replace('{name}', notif.memberName || t('study_group.members')),
      timestamp: notif.createdAt,
      read: !!notif.read,
      rawItem: notif
    })) : [])
  ].sort((a, b) => {
    const diff = parseTimestamp(b.timestamp) - parseTimestamp(a.timestamp);
    if (diff !== 0) return diff;
    const keyA = `${a.type}:${a.id}`;
    const keyB = `${b.type}:${b.id}`;
    return keyB.localeCompare(keyA);
  });

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleToggle}
        className="relative text-white hover:text-[#8FB2C1] transition-colors flex items-center justify-center p-1 cursor-pointer focus:outline-none"
        aria-label={t('profile.notifications_aria')}
      >
        <BellIcon />
        <NotificationDot visible={hasUnread} />
      </button>

      {isOpen && (
        <NotificationDropdownPanel
          notifications={unifiedNotifications}
          loading={loading}
          t={t}
          onClickItem={handleItemClick}
          formatDate={displayDate}
        />
      )}

      {selectedAnnouncement && (
        <AnnouncementReadingModal
          isOpen={true}
          onClose={() => setSelectedAnnouncement(null)}
          announcement={selectedAnnouncement}
          locale={locale}
          t={t}
        />
      )}

      {/* Migrated study group invitation detail modal */}
      {selected && (
        <StudyGroupInvitationModal
          selected={selected}
          onClose={() => setSelected(null)}
          t={t}
          acting={acting}
          error={error}
          decide={decide}
        />
      )}

      {/* Migrated study group lifecycle details modal */}
      {selectedSystemNotification && (
        <StudyGroupLifecycleModal
          selectedSystemNotification={selectedSystemNotification}
          onClose={() => setSelectedSystemNotification(null)}
          t={t}
        />
      )}

      {/* Migrated study group invitation unavailable modal */}
      {invitationUnavailable && (
        <StudyGroupInvitationUnavailableModal
          onClose={closeUnavailableInvitation}
          t={t}
        />
      )}
    </div>
  );
}
