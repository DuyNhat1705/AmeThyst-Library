"use client";

import { useI18n } from '../../../providers/I18nProvider';

export default function AdminStatisticsPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="font-manrope text-3xl font-bold text-[#1A2E44] dark:text-neutral-100">
        {t('admin.sidebar_statistics')}
      </h1>
      <p className="mt-3 text-neutral-500 dark:text-neutral-400">{t('admin.placeholder_message')}</p>
    </div>
  );
}
