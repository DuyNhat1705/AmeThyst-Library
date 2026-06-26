"use client";
import React from 'react';
import { Input } from '../atoms/Input';
import { useI18n } from '../../providers/I18nProvider';

interface StudyGroupFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  subjectFilter: string;
  onSubjectChange: (val: string) => void;
  subjects: string[];
}

export default function StudyGroupFilter({
  searchQuery,
  onSearchChange,
  subjectFilter,
  onSubjectChange,
  subjects
}: StudyGroupFilterProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <Input 
          type="text" 
          placeholder={t('study_together.search_placeholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 !h-10 w-full bg-white dark:bg-neutral-900 shadow-sm"
        />
      </div>

      {/* Subject Filter */}
      <select
        value={subjectFilter}
        onChange={(e) => onSubjectChange(e.target.value)}
        className="h-10 px-4 rounded-lg border border-[#C5C6CD] bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#006A61] transition-all dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:focus:ring-[#FFB95F] shadow-sm"
      >
        <option value="">{t('study_together.filter_all_subjects')}</option>
        {subjects.map(subject => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>
    </div>
  );
}
