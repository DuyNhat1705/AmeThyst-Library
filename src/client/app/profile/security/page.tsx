"use client";

import React, { useEffect, useState } from 'react';
import ProfileTemplate from '../../components/templates/ProfileTemplate';
import { SecurityFormCard } from '../../components/organisms';
import { useRequireAuth, getLoggedInUser, getAuthToken, logoutUser } from '../../utils/user';
import { useI18n } from '../../providers/I18nProvider';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SecurityPage() {
  const { t } = useI18n();
  useRequireAuth();

  const [username, setUsername] = useState('');
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUsername(getLoggedInUser()?.username || '');

    const token = getAuthToken();
    if (!token) return;

    fetch(`${API}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 401) {
          logoutUser();
          window.location.href = '/login';
          return;
        }
        if (!r.ok) throw new Error('Failed to load profile');
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setUsername(data.username || '');
        setIsGoogleAccount(!!data.is_google_account);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProfileTemplate username={username}>
      <div className="flex justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <span className="text-[#091426] dark:text-neutral-200 font-medium animate-pulse">{t('profile.security_loading')}</span>
          </div>
        ) : (
          <SecurityFormCard isGoogleAccount={isGoogleAccount} />
        )}
      </div>
    </ProfileTemplate>
  );
}