"use client";

import React, { useEffect, useState } from 'react';
import ProfileTemplate from '../../components/templates/ProfileTemplate';
import { SecurityFormCard } from '../../components/organisms';
import { useRequireAuth, getLoggedInUser, logoutUser, updateStoredUser } from '../../utils/user';
import { useI18n } from '../../providers/I18nProvider';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SecurityPage() {
  const { t } = useI18n();
  useRequireAuth();

  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [role, setRole] = useState('user');
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getLoggedInUser();
    setUsername(currentUser?.username || '');
    setAvatarUrl(currentUser?.avatar || '');
    setRole(currentUser?.role || 'user');

    fetch(`${API}/user/profile`, {
      credentials: 'include',
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
        setAvatarUrl(data.avatar || '');
        setRole(data.role || 'user');
        setIsGoogleAccount(!!data.isGoogleAccount);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
    updateStoredUser({ avatar: newAvatarUrl });
  };

  return (
    <ProfileTemplate
      username={username}
      avatarUrl={avatarUrl}
      role={role}
      onAvatarUpdate={handleAvatarUpdate}
    >
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
