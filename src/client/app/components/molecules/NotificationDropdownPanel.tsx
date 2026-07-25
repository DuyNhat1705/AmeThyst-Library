"use client";

import React from 'react';
import Skeleton from '../atoms/Skeleton';
import AnnouncementNotificationItem from './AnnouncementNotificationItem';
import type { BellAnnouncement } from '../../hooks/useAnnouncementBell';

interface NotificationDropdownPanelProps {
  announcements: BellAnnouncement[];
  loading: boolean;
  locale: string;
  t: (key: string) => string;
  onClickAnnouncement: (announcement: BellAnnouncement) => void;
}

export default function NotificationDropdownPanel({
  announcements,
  loading,
  locale,
  t,
  onClickAnnouncement,
}: NotificationDropdownPanelProps) {
  return (
    <div className="absolute right-0 mt-3 w-80 max-h-[380px] overflow-y-auto z-50 bg-background border border-foreground/10 rounded-xl shadow-2xl p-4 text-foreground text-left font-inter custom-scrollbar animate-fade-in">
      <div className="flex justify-between items-center pb-2 mb-2 border-b border-foreground/10">
        <span className="font-bold text-xs font-manrope text-foreground uppercase tracking-wider">
          {t('navbar.announcements_title')}
        </span>
        {announcements.length > 0 && (
          <span className="text-[10px] bg-orange text-navy font-bold px-2 py-0.5 rounded-full">
            {announcements.length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-4 py-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2 border-b border-foreground/5 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="py-8 text-center text-foreground/50 text-sm flex flex-col items-center justify-center">
          <svg className="w-8 h-8 mb-2 text-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.02 6.02 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <p>{t('navbar.no_new_announcements')}</p>
        </div>
      ) : (
        <div className="divide-y divide-foreground/10 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {announcements.map((ann) => (
            <AnnouncementNotificationItem
              key={ann.announceId}
              announcement={ann}
              onClick={() => onClickAnnouncement(ann)}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

