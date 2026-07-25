"use client";

import { useEffect, useRef, useState } from 'react';
import BellIcon from '../atoms/BellIcon';
import NotificationDot from '../atoms/NotificationDot';
import NotificationDropdownPanel from './NotificationDropdownPanel';
import AnnouncementReadingModal from '../organisms/AnnouncementReadingModal';
import { useAnnouncementBell, type BellAnnouncement } from '../../hooks/useAnnouncementBell';

interface NotificationBellProps {
  enabled: boolean;
  locale: string;
  t: (key: string) => string;
  userId?: number;
}

export default function NotificationBell({ enabled, locale, t, userId }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<BellAnnouncement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { announcements, loading, hasUnread, markAsSeen } = useAnnouncementBell(enabled, userId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) markAsSeen();
      return next;
    });
  };

  const handleAnnouncementClick = (announcement: BellAnnouncement) => {
    setIsOpen(false);
    setSelectedAnnouncement(announcement);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleToggle}
        className="relative text-white hover:text-orange transition-colors flex items-center justify-center p-1 cursor-pointer focus:outline-none"
        aria-label={t('profile.notifications_aria')}
      >
        <BellIcon />
        <NotificationDot visible={hasUnread} />
      </button>

      {isOpen && (
        <NotificationDropdownPanel
          announcements={announcements}
          loading={loading}
          locale={locale}
          t={t}
          onClickAnnouncement={handleAnnouncementClick}
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
    </div>
  );
}

