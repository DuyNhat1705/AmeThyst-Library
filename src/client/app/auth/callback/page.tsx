"use client";

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '../../providers/I18nProvider';

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const { t } = useI18n();

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      window.location.href = '/library';
    } else {
      window.location.href = '/login';
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8EFE6] dark:bg-[#091426]">
      <p className="text-[#091426] dark:text-neutral-200">{t('auth.login_loading')}</p>
    </div>
  );
}

export default function AuthCallback() {
  const { t } = useI18n();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8EFE6] dark:bg-[#091426]">
          <p className="text-[#091426] dark:text-neutral-200">{t('auth.login_loading')}</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
