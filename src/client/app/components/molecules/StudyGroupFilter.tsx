"use client";
import React from 'react';
import { Input } from '../atoms/Input';
import { CustomSelect } from '../atoms/CustomSelect';
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
      <CustomSelect
        className="w-full sm:w-64"
        value={subjectFilter}
        onChange={onSubjectChange}
        options={[
          { value: '', label: t('study_together.filter_all_subjects') },
          ...subjects.map(s => ({ value: s, label: s }))
        ]}
      />
    </div>
  );
}
