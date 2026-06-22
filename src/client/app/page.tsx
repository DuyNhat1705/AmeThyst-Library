"use client";
import React from 'react';
import Link from 'next/link';
import NavBar from './components/organisms/NavBar';
import { useI18n } from './providers/I18nProvider';

export default function LandingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <NavBar />
      
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight">
          {t('landing.title')}
        </h1>
        <p className="text-xl opacity-80 mb-12 max-w-lg font-open-sans">
          {t('landing.subtitle')}
        </p>
        
        <div className="flex flex-col gap-6 w-full max-w-sm">
          <Link href="/library" className="w-full px-8 py-4 bg-[#006F66] dark:bg-[#FFB95F] text-white dark:text-neutral-900 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center">
            {t('landing.explore')}
          </Link>
          
          <div className="flex gap-4">
            <Link href="/login" className="flex-1 px-6 py-3 bg-white dark:bg-neutral-800 border border-[#006F66] dark:border-neutral-700 text-[#006F66] dark:text-[#FFB95F] rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition flex items-center justify-center">
              {t('navbar.sign_in')}
            </Link>
            <Link href="/register" className="flex-1 px-6 py-3 bg-[#486C7E] text-white rounded-xl font-semibold hover:bg-[#3e5e6e] transition flex items-center justify-center">
              {t('navbar.join_now')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
