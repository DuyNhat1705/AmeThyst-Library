"use client";

import React from 'react';
import { useI18n } from '../../../providers/I18nProvider';

export default function KpiSummaryRow({ summaryMetrics }) {
  const { t } = useI18n();

  const totalUsers = summaryMetrics?.totalUsers ?? 0;
  const activeBorrows = summaryMetrics?.activeBorrows ?? 0;
  const overdueBooks = summaryMetrics?.overdueBooksCount ?? 0;
  const totalLateFees = summaryMetrics?.totalLateFees ?? 0;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      {/* Card 1: Total Users */}
      <div className="relative overflow-hidden bg-white dark:bg-neutral-800 rounded-3xl p-6 shadow-sm border border-stone-200/60 dark:border-neutral-700 flex flex-col justify-between h-[168px]">
        <div>
          <span className="text-xs font-bold font-hankenGrotesk text-slate-500 dark:text-neutral-400 tracking-wider uppercase">
            {t('admin.kpi_total_users')}
          </span>
          <div className="flex items-baseline mt-3">
            <span className="text-4xl font-bold font-hankenGrotesk text-black dark:text-white tracking-tight">
              {totalUsers.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="absolute -right-3 -bottom-3 opacity-[0.06] pointer-events-none text-slate-900 dark:text-white">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>

      {/* Card 2: Active Borrows */}
      <div className="relative overflow-hidden bg-white dark:bg-neutral-800 rounded-3xl p-6 shadow-sm border border-stone-200/60 dark:border-neutral-700 flex flex-col justify-between h-[168px]">
        <div>
          <span className="text-xs font-bold font-hankenGrotesk text-slate-500 dark:text-neutral-400 tracking-wider uppercase">
            {t('admin.kpi_active_borrows')}
          </span>
          <div className="flex items-baseline mt-3">
            <span className="text-4xl font-bold font-hankenGrotesk text-black dark:text-white tracking-tight">
              {activeBorrows.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="absolute -right-3 -bottom-3 opacity-[0.06] pointer-events-none text-slate-900 dark:text-white">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
          </svg>
        </div>
      </div>

      {/* Card 3: Overdue Books (Red Alert Card) */}
      <div className="bg-red-50/70 dark:bg-red-950/40 rounded-3xl p-6 shadow-sm border border-red-200 dark:border-red-900/60 flex flex-col justify-between h-[168px]">
        <div>
          <span className="text-xs font-bold font-hankenGrotesk text-red-700 dark:text-red-300 tracking-wider uppercase">
            {t('admin.kpi_overdue_books')}
          </span>
          <div className="flex items-baseline mt-3">
            <span className="text-4xl font-bold font-hankenGrotesk text-red-600 dark:text-red-400 tracking-tight">
              {overdueBooks.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700 dark:text-red-300">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>Requires immediate audit</span>
        </div>
      </div>

      {/* Card 4: Total Late Fees */}
      <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 shadow-sm border border-stone-200/60 dark:border-neutral-700 flex flex-col justify-between h-[168px]">
        <div>
          <span className="text-xs font-bold font-hankenGrotesk text-slate-500 dark:text-neutral-400 tracking-wider uppercase">
            {t('admin.kpi_total_late_fees')}
          </span>
          <div className="flex items-baseline mt-3">
            <span className="text-2xl xl:text-3xl font-bold font-hankenGrotesk text-black dark:text-white tracking-tight">
              {formatCurrency(totalLateFees)}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="h-1.5 flex-1 bg-black/20 dark:bg-white/20 rounded-full" />
          <div className="h-1.5 flex-1 bg-black/40 dark:bg-white/40 rounded-full" />
          <div className="h-1.5 flex-1 bg-black/60 dark:bg-white/60 rounded-full" />
          <div className="h-1.5 flex-1 bg-black dark:bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
