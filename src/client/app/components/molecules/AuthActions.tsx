"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { getLoggedInUserInitials, useStoredUser } from '../../utils/user';
import { useI18n } from '../../providers/I18nProvider';

export default function AuthActions() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const user = useStoredUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Place holder to avoid hydration mismatch by rendering a consistent layout size during SSR/hydration
  if (!mounted) {
    return <div className="h-10 w-24"></div>;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login" className="hidden sm:block font-inter text-sm font-semibold text-[#FFF] hover:text-[#486C7E] transition-colors">
          {t('navbar.sign_in')}
        </Link>
        <Link href="/register">
          <Button 
            variant="primary" 
            className="px-6 py-2 h-auto rounded-lg bg-[#FFF] !text-[#000] hover:bg-[#375463] transition-all duration-200"
          >
            {t('navbar.join_now')}
          </Button>
        </Link>
      </div>
    );
  }

  const initials = getLoggedInUserInitials() || '?';
  const activeAvatarUrl = user.avatar ?? undefined;

  return (
    <div className="flex items-center gap-4">
      {/* Notification Icon */}
      <button className="text-white hover:text-[#486C7E] transition-colors" aria-label={t('profile.notifications_aria')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      </button>
      {/* Settings Icon */}
      <button className="text-white hover:text-[#486C7E] transition-colors" aria-label={t('profile.settings_aria')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
      {/* Account Avatar */}
      <Link href="/profile">
        {activeAvatarUrl ? (
          <img
            src={activeAvatarUrl}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover border border-neutral-700 hover:scale-105 transition-transform cursor-pointer"
          />
        ) : (
          <div className="w-10 h-10 bg-[#486C7E] rounded-full text-white flex items-center justify-center font-bold hover:scale-105 transition-transform cursor-pointer">
            {initials}
          </div>
        )}
      </Link>
    </div>
  );
}

