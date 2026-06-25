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
        setProfile((prev) => ({
          ...prev,
          fullName: data.username || "",
          email: data.email || "",
          phoneNumber: data.phone_number || "",
          // department không lấy từ API, giữ nguyên mock data hiện có
        }));
        updateStoredUser({
          username: data.username,
          email: data.email,
          phone_number: data.phone_number,
        });
      })
      .catch((err) => setError(err.message));
  }, [t]);

  const handleUpdate = async (field: string, value: string) => {
    // Department là mock data, không thể cập nhật
    if (field === 'department') return;

    const token = getAuthToken();
    const body: Record<string, string> = {};
    if (field === 'fullName') body.username = value;
    if (field === 'phoneNumber') body.phoneNumber = value;

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

      setProfile((prev) => ({ ...prev, [field]: value }));
      updateStoredUser({
        username: updated.username,
        email: updated.email,
        phone_number: updated.phone_number,
      });
      setMessage(t('profile.updated_success'));
      setError('');
      setTimeout(() => setMessage(''), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('profile.update_failed'));
    }
  };

  const getDepartmentValue = (dept: string) => {
    if (dept === "Information Technology") {
      return t('profile.department_it');
    }
    return dept;
  };

  return (
    <ProfileTemplate username={profile.fullName}>
      <h1 className="text-2xl font-bold mb-6 text-[#091426] dark:text-neutral-200">{t('profile.personal_info')}</h1>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard label={t('profile.full_name')} value={profile.fullName} onUpdate={(v) => handleUpdate('fullName', v)} />
        <ProfileCard label={t('profile.email_address')} value={profile.email} onUpdate={() => {}} editable={false} />
        <ProfileCard label={t('profile.phone_number')} value={profile.phoneNumber} onUpdate={(v) => handleUpdate('phoneNumber', v)} />
        <ProfileCard label={t('profile.department')} value={getDepartmentValue(profile.department)} onUpdate={() => {}} editable={false} />
      </div>
    </ProfileTemplate>
  );
}