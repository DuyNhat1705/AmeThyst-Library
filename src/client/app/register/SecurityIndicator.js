"use client";

import React from 'react';
import { useI18n } from '../providers/I18nProvider';

const SecurityIndicator = ({ level }) => {
  const { t } = useI18n();
  return (
    <div className="flex pt-2 flex-col items-start -space-y-px w-full gap-2">
      <div className="flex justify-center items-start gap-1 w-full h-1">
        {[1, 2, 3, 4].map((bar) => (
          <div 
            key={bar}
            className={`rounded-full w-full h-full transition-colors duration-300 ${
              bar <= level ? 'bg-[#091426] dark:bg-[#FFB95F]' : 'bg-[#D3E4FE] dark:bg-neutral-600'
            }`}
          />
        ))}
      </div>
      <p className="text-[#45474C] dark:text-neutral-400 font-inter text-xs font-medium leading-4 w-fit tracking-[0.02em]">
        {t('auth.security_level')}
      </p>
    </div>
  );
};

export default SecurityIndicator;
