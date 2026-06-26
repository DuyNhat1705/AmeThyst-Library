"use client";

import React from 'react';
import { useI18n } from '../../providers/I18nProvider';
interface RoleSelectorProps {
  selectedRole: string;
  onChange: (role: string) => void;
  disabled?: boolean;
}

export default function RoleSelector({ selectedRole, onChange, disabled = false }: RoleSelectorProps) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#0B1C30] dark:text-neutral-200 font-inter text-sm font-semibold leading-5 w-full tracking-[0.01em]">
          {t('auth.your_role')}
        </p>
      </div>
      <div 
        className={`inline-grid grid-cols-2 p-1 rounded-lg border border-[#C5C6CD] dark:border-neutral-600 bg-[#EFF4FF] dark:bg-neutral-700 w-full relative h-[42px] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedRole === 'user'}
          onClick={() => !disabled && onChange('user')}
          disabled={disabled}
          className={`cursor-pointer text-nowrap flex justify-center items-center rounded transition-all duration-200 h-full ${
            selectedRole === 'user' 
              ? 'bg-[#091426] dark:bg-[#FFB95F] text-white dark:text-[#091426] shadow-sm' 
              : 'text-[#45474C] dark:text-neutral-300 hover:bg-[#D3E4FE] dark:hover:bg-neutral-600'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          <span className="font-inter text-sm font-semibold leading-5 tracking-[0.01em]">
            {t('auth.role_user')}
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={selectedRole === 'librarian'}
          onClick={() => !disabled && onChange('librarian')}
          disabled={disabled}
          className={`cursor-pointer text-nowrap flex justify-center items-center rounded transition-all duration-200 h-full ${
            selectedRole === 'librarian' 
              ? 'bg-[#091426] dark:bg-[#FFB95F] text-white dark:text-[#091426] shadow-sm' 
              : 'text-[#45474C] dark:text-neutral-300 hover:bg-[#D3E4FE] dark:hover:bg-neutral-600'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          <span className="font-inter text-sm font-semibold leading-5 tracking-[0.01em]">
            {t('auth.role_librarian')}
          </span>
        </button>
      </div>
    </div>
  );
}
