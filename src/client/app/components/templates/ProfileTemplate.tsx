"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../organisms/Sidebar';
import { NavBar, Footer } from '../organisms';
import { useI18n } from '../../providers/I18nProvider';

interface ProfileTemplateProps {
  children: React.ReactNode;
  username: string;
}

export default function ProfileTemplate({ children, username }: ProfileTemplateProps) {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const userActions = (
    <div className="flex items-center gap-4">
      <button className="text-[#091426] dark:text-neutral-200">{t('profile.notifications_aria')}</button>
      <button className="text-[#091426] dark:text-neutral-200">{t('profile.settings_aria')}</button>
      <div className="w-10 h-10 bg-[#486C7E] rounded-full text-white flex items-center justify-center font-bold">
        {username.split(' ').map(n => n[0]).join('')}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar userActions={userActions} />
      
      {isVisible && (
        <div className={`bg-[#006F66] text-white text-center text-sm font-semibold overflow-hidden transition-all duration-500 ease-in-out ${isClosing ? 'max-h-0 opacity-0 py-0' : 'max-h-12 opacity-100 py-2'}`}>
          {t('profile.welcome')} {username}!
        </div>
      )}
      
      <div className="flex flex-1 bg-[#F8EFE6] dark:bg-[#091426]">
        <Sidebar username={username} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
