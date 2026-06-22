"use client";

import React, { useState, useEffect } from 'react';
import ProfileTemplate from '../components/templates/ProfileTemplate';
import ProfileCard from '../components/molecules/ProfileCard';
import { useI18n } from '../providers/I18nProvider';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProfilePage() {
  const { t } = useI18n();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      window.location.href = '/login';
      return;
    }

    const token = localStorage.getItem('token');
    fetch(`${API}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load profile');
        return r.json();
      })
      .then((data) =>
        setProfile({
          fullName: data.username || "",
          email: data.email || "",
          phoneNumber: data.phone_number || "",
          avatar: data.avatar || "",
        })
      )
      .catch((err) => setError(err.message));
  }, []);

  const handleUpdate = async (field: string, value: string) => {
    const token = localStorage.getItem('token');
    const body: Record<string, string> = {};
    if (field === 'fullName') body.username = value;
    if (field === 'phoneNumber') body.phoneNumber = value;
    if (field === 'avatar') body.avatar = value;

    try {
      const res = await fetch(`${API}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(t('profile.update_failed'));
      const updated = await res.json();

      setProfile((prev) => ({ ...prev, [field]: value }));
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...stored,
          userId: updated.user_id || stored.userId,
          username: updated.username,
          email: updated.email,
          phone_number: updated.phone_number,
          avatar: updated.avatar,
        })
      );
      setMessage(t('profile.updated_success'));
      setError('');
      setTimeout(() => setMessage(''), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('profile.update_failed'));
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API}/user/profile/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      setMessage(t('profile.password_changed'));
      setError('');
      setTimeout(() => setMessage(''), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('profile.update_failed'));
    }
  };

  return (
    <ProfileTemplate username={profile.fullName}>
      <h1 className="text-2xl font-bold mb-6 text-[#091426] dark:text-neutral-200">{t('profile.personal_info')}</h1>

      {message && <p className="mb-4 text-green-600 dark:text-green-400 font-medium">{message}</p>}
      {error && <p className="mb-4 text-red-500 dark:text-red-400 font-medium">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard label={t('profile.full_name')} value={profile.fullName} onUpdate={(v) => handleUpdate('fullName', v)} />
        <ProfileCard label={t('profile.email_address')} value={profile.email} onUpdate={() => {}} editable={false} />
        <ProfileCard label={t('profile.phone_number')} value={profile.phoneNumber} onUpdate={(v) => handleUpdate('phoneNumber', v)} />
        <ProfileCard label={t('profile.avatar_url')} value={profile.avatar} onUpdate={(v) => handleUpdate('avatar', v)} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#091426] dark:text-neutral-200">{t('profile.change_password')}</h2>
        <ChangePasswordForm onSubmit={handleChangePassword} />
      </div>
    </ProfileTemplate>
  );
}

function ChangePasswordForm({ onSubmit }: { onSubmit: (cur: string, next: string) => void }) {
  const { t } = useI18n();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErr(t('profile.password_match_error'));
      return;
    }
    setErr('');
    onSubmit(currentPassword, newPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="password"
        placeholder={t('profile.current_password')}
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="border border-[#C5C6CD] dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-200 rounded-lg px-4 h-[52px] outline-none focus:border-[#486C7E] dark:focus:border-[#FFB95F]"
      />
      <input
        type="password"
        placeholder={t('profile.new_password')}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border border-[#C5C6CD] dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-200 rounded-lg px-4 h-[52px] outline-none focus:border-[#486C7E] dark:focus:border-[#FFB95F]"
      />
      <input
        type="password"
        placeholder={t('profile.confirm_new_password')}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border border-[#C5C6CD] dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-200 rounded-lg px-4 h-[52px] outline-none focus:border-[#486C7E] dark:focus:border-[#FFB95F]"
      />
      {err && <p className="text-red-500 dark:text-red-400 text-sm">{err}</p>}
      <button
        type="submit"
        className="h-[52px] bg-[#091426] text-white rounded-lg font-semibold hover:bg-[#486C7E] transition-colors dark:bg-[#FFB95F] dark:text-[#091426] dark:hover:bg-[#e6a54d]"
      >
        {t('profile.update_password')}
      </button>
    </form>
  );
}
