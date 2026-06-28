"use client";

import React, { useMemo } from 'react';
import { FormField, OAuthButtons } from '../molecules';
import { Button, SecurityIndicator, ErrorMessage, PasswordInput } from '../atoms';
import { calculatePasswordStrength, validatePassword } from '../../utils/password';
import Link from 'next/link';
import { useI18n } from '../../providers/I18nProvider';
import { mapServerError } from '../../utils/errors';

interface FormData {
  fullName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  avatar?: string;
}

interface FormState {
  isLoading: boolean;
  error: string | null;
  validationErrors: Partial<Record<string, string>>;
  isSuccess: boolean;
}

interface RegisterFormCardProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
}

export default function RegisterFormCard({ 
  formData, 
  setFormData, 
  state, 
  setState 
}: RegisterFormCardProps) {
  const { t } = useI18n();
  const passwordStrength = useMemo(() => calculatePasswordStrength(formData.password), [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validatePassword(formData.password, formData.confirmPassword);
    if (error) {
      setState(prev => ({ ...prev, error: t(error) }));
      return;
    }
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.fullName,
          phoneNumber: formData.phoneNumber || null,
          avatar: formData.avatar || null,
          role: formData.role || 'user'
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || t('auth.register_failed'));
      }

      setState(prev => ({ ...prev, isLoading: false, isSuccess: true }));
      
      // Redirect to login after success
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err: unknown) {
      console.error('Register error:', err);
      const raw = err instanceof Error ? err.message : undefined;
      setState(prev => ({ ...prev, isLoading: false, error: mapServerError(raw, t, 'auth.register_failed') }));
    }
  };

  return (
    <div className="w-full max-w-[380px] flex flex-col gap-6">
      <header className="flex flex-col gap-1 text-center">
        <h2 className="text-3xl font-semibold tracking-[-0.01em] text-[#0B1C30] dark:text-neutral-200">
          {t('auth.register_title')}
        </h2>
        <p className="text-sm text-[#45474C] dark:text-neutral-400">
          {t('auth.register_details_subtitle')}
        </p>
      </header>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {state.error && <ErrorMessage message={state.error} />}
        <FormField
          label={t('auth.full_name_label')}
          id="fullName"
          placeholder="Alex Johnson"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={state.validationErrors?.fullName}
          disabled={state.isLoading}
        />

        <FormField
          label={t('auth.email_address_label')}
          id="email"
          type="email"
          placeholder={t('auth.email_address_placeholder')}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={state.validationErrors?.email}
          disabled={state.isLoading}
        />

        <RoleSelector
          selectedRole={formData.role}
          onChange={(role) => setFormData({ ...formData, role })}
          disabled={state.isLoading}
        />

        <div className="flex flex-col gap-2">
          <PasswordInput
            label={t('auth.password_label')}
            id="password"
            placeholder={t('auth.password_placeholder_short')}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={state.validationErrors?.password}
            disabled={state.isLoading}
          />
          <PasswordInput
            label={t('auth.confirm_password_label')}
            id="confirmPassword"
            placeholder={t('auth.confirm_password_placeholder')}
            value={formData.confirmPassword || ""}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={state.validationErrors?.confirmPassword}
            disabled={state.isLoading}
          />
          <SecurityIndicator level={passwordStrength} />
        </div>

        <Button
          type="submit"
          className="w-full h-[52px] mt-2"
          isLoading={state.isLoading}
        >
          {t('auth.register_button')}
        </Button>

        <div className="flex pb-px flex-col items-center w-full relative my-2">
          <div className="absolute w-full h-[1px] bg-[#C5C6CD] top-1/2 -translate-y-1/2" />
          <div className="flex py-0 px-4 justify-center items-start bg-[#FFF8EB] dark:bg-neutral-800 w-fit relative z-10">
            <p className="text-[#45474C] dark:text-neutral-400 font-inter text-xs font-medium leading-4 w-fit tracking-[0.02em]">
              {t('auth.or_continue_with')}
            </p>
          </div>
        </div>

        <OAuthButtons label={t('auth.sign_up_google')} />

        <div className="flex pt-2 flex-col items-center w-full">
          <p className="text-[#091426] dark:text-neutral-200 font-inter text-sm leading-5 w-fit">
            {t('auth.already_have_account')}{' '}
            <Link href="/login" className="font-semibold text-[#091426] dark:text-neutral-200 hover:underline">
              {t('auth.login_link')}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}