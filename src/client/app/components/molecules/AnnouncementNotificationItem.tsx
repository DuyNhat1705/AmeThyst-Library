"use client";

import type { BellAnnouncement } from '../../hooks/useAnnouncementBell';

interface AnnouncementNotificationItemProps {
  announcement: BellAnnouncement;
  onClick: () => void;
  locale: string;
}

export default function AnnouncementNotificationItem({
  announcement,
  onClick,
  locale,
}: AnnouncementNotificationItemProps) {
  const formattedDate = announcement.createdAt
    ? new Date(announcement.createdAt).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div onClick={onClick} className="py-3 cursor-pointer group">
      <div className="flex justify-between items-start gap-2 mb-1">
        <h4 className="font-semibold text-sm text-foreground group-hover:text-orange transition-colors leading-snug">
          {announcement.title}
        </h4>
        <span className="text-[9px] text-foreground/50 whitespace-nowrap pt-0.5">{formattedDate}</span>
      </div>
      <p className="text-xs text-foreground/70 leading-normal line-clamp-2 break-words">
        {announcement.content}
      </p>
    </div>
  );
}

