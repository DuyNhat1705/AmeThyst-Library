"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '../../providers/I18nProvider';

const sidebarItems = [
  {
    key: 'sidebar_user_management',
    href: '/dashboard/admin',
    icon: 'M3 20V10L10 4L17 10V20H13V14H7V20H3Z',
    viewBox: '0 0 22 20',
  },
  {
    key: 'sidebar_roles_permissions',
    href: '/dashboard/admin/authorization',
    icon: 'M12 2L4 5v6c0 5.25 3.4 10.15 8 11 4.6-.85 8-5.75 8-11V5l-8-3z',
    viewBox: '0 0 24 24',
  },
  {
    key: 'sidebar_statistics',
    href: '/dashboard/admin/statistics',
    icon: 'M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z',
    viewBox: '0 0 24 24',
  },
  {
    key: 'sidebar_system_configuration',
    href: '/dashboard/admin/system',
    icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
    viewBox: '0 0 24 24',
  },
];

export default function AdminDashboardSidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="w-[260px] min-h-screen bg-white dark:bg-neutral-900 border-r border-[#C2C9C4] dark:border-neutral-700 shadow-sm flex flex-col shrink-0">
      <div className="py-12 px-8">
        <p className="text-[#1A2E44] dark:text-neutral-100 font-hankenGrotesk text-2xl font-bold text-center tracking-[0.1667em]">
          {t('admin.dashboard_title')}
        </p>
      </div>
      <nav className="flex flex-col gap-1 w-full">
        {sidebarItems.map((item) => {
          const isActive = item.href === '/dashboard/admin'
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
              <svg width="20" height="20" viewBox={item.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d={item.icon} fill="#424945" className="dark:fill-neutral-300" />
              </svg>
              <span className="text-[#424945] dark:text-neutral-300 font-hankenGrotesk text-sm font-semibold leading-[22px]">
                {t(`admin.${item.key}`)}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
