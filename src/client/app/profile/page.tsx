"use client";

import React, { useState, useEffect } from 'react';
import ProfileTemplate from '../components/templates/ProfileTemplate';
import ProfileCard from '../components/molecules/ProfileCard';
import { useRequireAuth, getAuthToken, updateStoredUser, logoutUser } from '../utils/user';
import { useI18n } from '../providers/I18nProvider';

const API = process.env.NEXT_PUBLIC_API_URL;


export default function ProfilePage() {
  const { t } = useI18n();
  useRequireAuth();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "Information Technology",
    avatarUrl: "",
    role: "user",
    borrowNum: 0,
  });
  const [savedProfile, setSavedProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "Information Technology",
    avatarUrl: "",
    role: "user",
    borrowNum: 0,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
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
        if (!r.ok) throw new Error(t('profile.load_profile_failed'));
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        const loaded = {
          fullName: data.username || "",
          email: data.email || "",
          phoneNumber: data.phone_number || "",
          department: "Information Technology",
          avatarUrl: data.avatar || "",
          role: data.role || "user",
          borrowNum: data.borrow_num || 0,
        };
        setProfile(loaded);
        setSavedProfile(loaded);
        updateStoredUser({
          username: data.username,
          email: data.email,
          avatar: data.avatar,
        });
      })
      .catch((err) => setError(err.message));
  }, [t]);

  const [phoneError, setPhoneError] = useState('');

  const handleLocalUpdate = (field: string, value: string) => {
    if (field === 'department') return;
    if (field === 'phoneNumber') {
      setPhoneError('');
    }
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setPhoneError('');
  };

  const handleSaveChanges = async () => {
    const token = getAuthToken();
    const body: Record<string, string> = {};

    if (profile.fullName !== savedProfile.fullName) {
      body.username = profile.fullName;
    }
    if (profile.phoneNumber !== savedProfile.phoneNumber) {
      const phoneRegex = /^\d{9,10}$/;
      if (!phoneRegex.test(profile.phoneNumber)) {
        setPhoneError(t('profile.phone_validation_error'));
        return;
      }
      body.phoneNumber = profile.phoneNumber;
    }

    if (Object.keys(body).length === 0) return;

    try {
      const res = await fetch(`${API}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        logoutUser();
        window.location.href = '/login';
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || t('profile.update_failed'));
      }
      const updated = await res.json();

      const newProfile = {
        ...profile,
        fullName: updated.username || profile.fullName,
        phoneNumber: updated.phone_number || profile.phoneNumber,
      };

      setProfile(newProfile);
      setSavedProfile(newProfile);
      updateStoredUser({
        username: updated.username,
        email: updated.email,
        avatar: profile.avatarUrl,
      });
      setMessage(t('profile.updated_success'));
      setError('');
      setTimeout(() => setMessage(''), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('profile.update_failed'));
    }
  };

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setProfile((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
    setSavedProfile((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
    updateStoredUser({ avatar: newAvatarUrl });
  };

  const isChanged =
    profile.fullName !== savedProfile.fullName ||
    profile.phoneNumber !== savedProfile.phoneNumber;

  const getDepartmentValue = (dept: string) => {
    if (dept === "Information Technology") {
      return t('profile.department_it');
    }
    return dept;
  };

  return (
    <ProfileTemplate
      username={profile.fullName}
      avatarUrl={profile.avatarUrl}
      role={profile.role}
      borrowNum={profile.borrowNum}
      onAvatarUpdate={handleAvatarUpdate}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 dark:border-neutral-700 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-neutral-200">{t('profile.personal_info')}</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{t('profile.personal_info_desc') || 'Manage your personal information, role status, and avatar.'}</p>
        </div>
      </div>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard label={t('profile.full_name')} value={profile.fullName} onUpdate={(v) => handleLocalUpdate('fullName', v)} />
        <ProfileCard label={t('profile.email_address')} value={profile.email} onUpdate={() => {}} editable={false} />
        <div className="flex flex-col">
          <ProfileCard label={t('profile.phone_number')} value={profile.phoneNumber} onUpdate={(v) => handleLocalUpdate('phoneNumber', v)} />
          {phoneError && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 px-1 font-medium">
              {phoneError}
            </p>
          )}
        </div>
        <ProfileCard label={t('profile.department')} value={getDepartmentValue(profile.department)} onUpdate={() => {}} editable={false} />
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          disabled={!isChanged}
          className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 border border-slate-300 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-slate-500"
        >
          {t('profile.cancel')}
        </button>
        <button
          onClick={handleSaveChanges}
          disabled={!isChanged}
          className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-emerald-500"
        >
          {t('profile.save_changes')}
        </button>
      </div>
    </ProfileTemplate>
  );
}