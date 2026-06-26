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
    department: "Information Technology", // mock data
  });
  const [originalProfile, setOriginalProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "Information Technology", // mock data
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return; // Wait until requireAuth redirects if no token

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
        };
        setProfile(loaded);
        setOriginalProfile(loaded);
        updateStoredUser({
          username: data.username,
          email: data.email,
        });
      })
      .catch((err) => setError(err.message));
  }, [t]);

  const handleLocalUpdate = (field: string, value: string) => {
    if (field === 'department') return;
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setProfile(originalProfile);
  };

  const handleSaveChanges = async () => {
    const token = getAuthToken();
    const body: Record<string, string> = {};

    if (profile.fullName !== originalProfile.fullName) {
      body.username = profile.fullName;
    }
    if (profile.phoneNumber !== originalProfile.phoneNumber) {
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
      setOriginalProfile(newProfile);
      updateStoredUser({
        username: updated.username,
        email: updated.email,
      });
      setMessage(t('profile.updated_success'));
      setError('');
      setTimeout(() => setMessage(''), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('profile.update_failed'));
    }
  };

  const isChanged =
    profile.fullName !== originalProfile.fullName ||
    profile.phoneNumber !== originalProfile.phoneNumber;

  const getDepartmentValue = (dept: string) => {
    if (dept === "Information Technology") {
      return t('profile.department_it');
    }
    return dept;
  };

  return (
    <ProfileTemplate username={profile.fullName}>
      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-neutral-200">{t('profile.personal_info')}</h1>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard label={t('profile.full_name')} value={profile.fullName} onUpdate={(v) => handleLocalUpdate('fullName', v)} />
        <ProfileCard label={t('profile.email_address')} value={profile.email} onUpdate={() => {}} editable={false} />
        <ProfileCard label={t('profile.phone_number')} value={profile.phoneNumber} onUpdate={(v) => handleLocalUpdate('phoneNumber', v)} />
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