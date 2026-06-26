"use client";
import React from 'react';
import { useI18n } from '../../providers/I18nProvider';

export type SortOption = 'newest' | 'availability';

interface StudyGroupSortProps {
  sortOption: SortOption;
  onSortChange: (val: SortOption) => void;
}

export default function StudyGroupSort({ sortOption, onSortChange }: StudyGroupSortProps) {
  const { t } = useI18n();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {t('study_together.sort_by')}:
      </span>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="h-10 px-4 rounded-lg border border-[#C5C6CD] bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#006A61] transition-all dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:focus:ring-[#FFB95F] shadow-sm"
      >
        <option value="newest">{t('study_together.sort_newest')}</option>
        <option value="availability">{t('study_together.sort_availability')}</option>
      </select>
    </div>
  );
}
