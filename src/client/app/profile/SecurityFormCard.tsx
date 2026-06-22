"use client";

import React, { useState, useMemo } from 'react';
import { FormField } from '../components/molecules';
import { Button } from '../components/atoms';
import SecurityIndicator from '../register/SecurityIndicator';
import { useI18n } from '../providers/I18nProvider';

export default function SecurityFormCard() {
  const { t } = useI18n();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = useMemo(() => calculatePasswordStrength(newPassword), [newPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError(t('profile.password_match_error'));
      return;
    }
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(t('profile.password_changed'));
    }, 1000);
  };

  return (
    <div className="w-full max-w-[380px] flex flex-col gap-6">
      <header className="flex flex-col gap-1 text-center">
        <h2 className="text-3xl font-semibold tracking-[-0.01em] text-[#0B1C30] dark:text-neutral-200">
          {t('profile.security_settings')}
        </h2>
      </header>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>}
        <FormField
          label={t('profile.current_password')}
          id="currentPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <FormField
            label={t('profile.new_password')}
            id="newPassword"
            type="password"
            placeholder={t('profile.new_password_placeholder')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormField
            label={t('profile.confirm_new_password')}
            id="confirmPassword"
            type="password"
            placeholder={t('profile.confirm_new_password_placeholder')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SecurityIndicator level={passwordStrength} />
        </div>

        <Button type="submit" className="w-full h-[52px] mt-2" isLoading={isLoading}>
          {t('profile.update_password')}
        </Button>
      </form>
    </div>
  );
}
