"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser, getInitials } from '../../utils/user';
import { useI18n } from '../../providers/I18nProvider';

export default function Sidebar({ username }: { username: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  return (
    <>
      <button
        className="lg:hidden p-4 text-[#091426] dark:text-neutral-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {t('sidebar.menu')}
      </button>
      <aside className={`${isOpen ? 'block' : 'hidden'} lg:block w-[330px] min-h-screen bg-[#F8EFE6] dark:bg-neutral-900 border-r border-[#000000] dark:border-neutral-700 p-6 flex flex-col gap-6 sticky top-0 h-screen overflow-y-auto`}>
        <div className="flex flex-col items-center gap-4">
          <button className="w-20 h-20 bg-[#486C7E] rounded-full text-white font-bold text-2xl hover:scale-105 transition-transform">
            {getInitials(username)}
          </button>
          <div className="flex flex-col items-center space-y-3">
            <h2 className="text-lg font-bold text-[#45474C] dark:text-neutral-200">{username}</h2>
            <span className="bg-[#86F2E4] dark:bg-[#86F2E4]/20 text-[#006F66] dark:text-[#86F2E4] px-3 py-1 rounded-full text-sm font-semibold">
              {t('profile.role_user')}
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#EAEAEA] active:bg-[#D4D4D4] dark:hover:bg-neutral-700 dark:active:bg-neutral-600 transition-all text-[#091426] dark:text-neutral-200">
            <span>👤</span> {t('profile.profile_link')}
          </Link>
          <Link href="/profile/security" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#EAEAEA] active:bg-[#D4D4D4] dark:hover:bg-neutral-700 dark:active:bg-neutral-600 transition-all text-[#091426] dark:text-neutral-200">
            <span>🔒</span> {t('profile.security_link')}
          </Link>
        </nav>

        <div className="flex justify-center mt-auto">
          <button
            className="p-3 w-full max-w-[200px] rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-all font-semibold"
            onClick={handleLogout}
          >
            {t('profile.logout')}
          </button>
        </div>
      </aside>
    </>
  );
}