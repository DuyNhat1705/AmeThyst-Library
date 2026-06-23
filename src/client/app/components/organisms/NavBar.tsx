"use client";
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { AuthActions } from '../molecules';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { LanguageToggle } from '../atoms/LanguageToggle';
import { useI18n } from '../../providers/I18nProvider';

export default function NavBar() {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { label: t('navbar.library'), href: '/library' },
    { label: t('navbar.dashboard'), href: '/dashboard' },
    { label: t('navbar.study_together'), href: '/study' },
    { label: t('navbar.library_map'), href: '/map' }
  ];

  return (
    <nav className="w-full h-[84px] bg-[#000] dark:bg-neutral-950 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">

        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2 w-[132px]">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit">
              <path d="M4 21.3333V12H6.66667V21.3333H4ZM12 21.3333V12H14.6667V21.3333H12ZM0 26.6667V24H26.6667V26.6667H0ZM20 21.3333V12H22.6667V21.3333H20ZM0 9.33333V6.66667L13.3333 0L26.6667 6.66667V9.33333H0Z" fill="white" />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <span className="text-[#FFF] font-inter text-2xl font-bold leading-8 w-fit tracking-[-0.025em]">LIMA</span>
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-inter text-sm font-semibold transition-colors ${isActive
                    ? 'text-[#486C7E]'
                    : 'text-[#FFF] hover:text-[#486C7E]'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Toggles + Auth Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <div className="border-l border-neutral-800 pl-4">
            <AuthActions />
          </div>
        </div>

      </div>
    </nav>
  );
}