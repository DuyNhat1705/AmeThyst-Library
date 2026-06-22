"use client";

import React from 'react';
import Link from 'next/link';
import { FormField } from '../components/molecules';
import { Button } from '../components/atoms';
import { OAuthButtons } from '../components/molecules';
import { useI18n } from '../providers/I18nProvider';

const FormCard = ({ 
  credentials, 
  setCredentials, 
  isLoading, 
  validationErrors,
  onSubmit
}) => {
  const { t } = useI18n();
  return (
    <div className="w-full max-w-[342px] flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-[-0.01em] dark:text-neutral-200">{t('auth.login_button')}</h2>
      </header>

      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormField
          label={t('auth.email_label')}
          id="email"
          type="email"
          placeholder="e.g. researcher@university.edu"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          error={validationErrors.email}
          disabled={isLoading}
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-semibold tracking-[0.01em] dark:text-neutral-200">{t('auth.password_label')}</label>
            <Link href="/forgot-password" className="text-[#006A61] dark:text-[#FFB95F] text-xs font-medium tracking-[0.02em] hover:underline">{t('auth.forgot_password')}</Link>
          </div>
          <FormField
            id="password"
            type="password"
            label=""
            placeholder="••••••••"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            error={validationErrors.password}
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-[52px]"
          isLoading={isLoading}
        >
          {t('auth.login_button')}
        </Button>

        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-[#C5C6CD] dark:bg-neutral-600"></div>
          <span className="text-[#45474C] dark:text-neutral-400 text-xs font-medium tracking-[0.02em]">{t('auth.or_continue_with')}</span>
          <div className="flex-1 h-px bg-[#C5C6CD] dark:bg-neutral-600"></div>
        </div>

        <OAuthButtons disabled={isLoading} />

        <div className="flex flex-col items-center gap-4 mt-2">
          <p className="text-[#45474C] dark:text-neutral-400 text-sm tracking-[-0.01em]">{t('auth.no_account')} {t('auth.create_one')}</p>
          <Link href="/register" className="w-full h-[52px]">
            <Button variant="primary" className="w-full h-[52px]">
              {t('auth.register_button')}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormCard;
