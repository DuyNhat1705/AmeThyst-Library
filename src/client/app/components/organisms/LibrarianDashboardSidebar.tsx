"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '../../providers/I18nProvider';

const sidebarItems = [
  {
    key: 'sidebar_calendar',
    href: '/dashboard/librarian',
    icon: 'M3 3H21V21H3V3ZM5 5V19H19V5H5ZM7 7H9V9H7V7ZM11 7H13V9H11V7ZM15 7H17V9H15V7ZM7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11ZM7 15H9V17H7V15ZM11 15H13V17H11V15ZM15 15H17V17H15V15Z',
  },
  {
    key: 'sidebar_loan_confirmation',
    href: '/dashboard/librarian/loan-confirmation',
    icon: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
  },
];

const placeholderItems = [
  {
    key: 'sidebar_inventory_placeholder',
    icon: 'M4 3H20C20.55 3 21 3.45 21 4V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V4C3 3.45 3.45 3 4 3ZM5 5V19H19V5H5ZM7 7H9V9H7V7ZM11 7H17V9H11V7ZM7 11H9V13H7V11ZM11 11H17V13H11V11ZM7 15H9V17H7V15ZM11 15H17V17H11V15Z',
    title: 'Inventory Management',
    comingSoon: true,
  },
  {
    key: 'sidebar_analytics_placeholder',
    icon: 'M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3ZM5 5V19H19V5H5ZM7 9H9V17H7V9ZM11 7H13V17H11V7ZM15 11H17V17H15V11Z',
    title: 'Analytics',
    comingSoon: true,
  },
];

export default function LibrarianDashboardSidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="w-[260px] min-h-screen bg-white dark:bg-neutral-900 border-r border-[#C2C9C4] dark:border-neutral-700 shadow-sm flex flex-col shrink-0">
      <div className="py-12 px-8">
        <p className="text-[#1A2E44] dark:text-neutral-100 font-hankenGrotesk text-2xl font-bold text-center tracking-[0.1667em]">
          {t('librarian.dashboard_title')}
        </p>
      </div>
      <nav className="flex flex-col gap-1 w-full">
        {sidebarItems.map((item) => {
          const isActive = item.href === '/dashboard/librarian'
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex py-3.5 px-8 items-center gap-3 w-full transition-colors ${
                isActive
                  ? 'bg-amber-50 dark:bg-neutral-800'
                  : 'hover:bg-amber-50/50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d={item.icon} fill="#424945" className="dark:fill-neutral-300" />
              </svg>
              <span className="text-[#424945] dark:text-neutral-300 font-hankenGrotesk text-sm font-semibold leading-[22px]">
                {t(`librarian.${item.key}`)}
              </span>
            </Link>
          );
        })}
        <div className="border-t border-[#E8E2D5] dark:border-neutral-700 mx-6 my-2" />
        {placeholderItems.map((item) => (
          <div
            key={item.key}
            className="flex py-3.5 px-8 items-center gap-3 w-full opacity-40 cursor-not-allowed"
            title={item.comingSoon ? 'Coming Soon' : ''}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d={item.icon} fill="#424945" className="dark:fill-neutral-300" />
            </svg>
            <span className="text-[#424945] dark:text-neutral-300 font-hankenGrotesk text-sm font-semibold leading-[22px]">
              {t(`librarian.${item.key}`)}
            </span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
