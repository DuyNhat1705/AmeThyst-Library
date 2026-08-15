"use client";

import React, { useState } from 'react';
import LoginTemplate from '../components/templates/LoginTemplate';
import { LoginBrandPanel, LoginFormCard } from '../components/organisms';
import { useRedirectIfLoggedIn, getRedirectPathForUser, setCurrentUser, type StoredUser } from '../utils/user';
import { useI18n } from '../providers/I18nProvider';
import { mapServerError } from '../utils/errors';
import { apiFetch } from '../utils/apiClient';

export default function LoginPage() {
  const { t } = useI18n();
  useRedirectIfLoggedIn();

  const [state, setState] = useState({
    isLoading: false,
    error: null as string | null,
    validationErrors: {},
    isSuccess: false,
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiFetch<{ user: StoredUser }>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!result.success || !result.data?.user) throw new Error(result.message || t('auth.login_failed'));
      const user = result.data.user;
      setCurrentUser(user);

      setState(prev => ({ ...prev, isLoading: false, isSuccess: true }));

      // Redirect to dashboard
      setTimeout(() => {
        if (user.must_change_password) {
          window.location.href = '/profile/security';
          return;
        }
        const requestedPath = new URLSearchParams(window.location.search).get('returnTo');
        const safeReturnPath = requestedPath?.startsWith('/') && !requestedPath.startsWith('//') ? requestedPath : null;
        window.location.href = safeReturnPath || getRedirectPathForUser(user);
      }, 500);
    } catch (err: unknown) {
      console.error('Login error:', err);
      const raw = err instanceof Error ? err.message : undefined;
      setState(prev => ({ ...prev, isLoading: false, error: mapServerError(raw, t, 'auth.login_failed') }));
    }
  };

  return (
    <LoginTemplate
      leftPanel={<LoginBrandPanel />}
      error={state.error}
      onErrorDismiss={() => setState(prev => ({ ...prev, error: null }))}
      formContent={
        <LoginFormCard
          credentials={credentials}
          setCredentials={setCredentials}
          isLoading={state.isLoading}
          validationErrors={state.validationErrors}
          onSubmit={handleSubmit}
        />
      }
    />
  );
}
