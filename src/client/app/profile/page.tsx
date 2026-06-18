"use client";

import React, { useState, useEffect } from 'react';
import ProfileTemplate from '../components/templates/ProfileTemplate';
import ProfileCard from '../components/molecules/ProfileCard';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProfilePage() {
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

      if (!res.ok) throw new Error('Update failed');
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
      setMessage('Updated successfully!');
      setError('');
      setTimeout(() => setMessage(''), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Update failed');
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
      setMessage('Password changed successfully!');
      setError('');
      setTimeout(() => setMessage(''), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Password change failed');
    }
  };

  return (
    <ProfileTemplate username={profile.fullName}>
      <h1 className="text-2xl font-bold mb-6 text-[#091426]">Personal Information</h1>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard label="Full Name" value={profile.fullName} onUpdate={(v) => handleUpdate('fullName', v)} />
        <ProfileCard label="Email Address" value={profile.email} onUpdate={() => {}} editable={false} />
        <ProfileCard label="Phone Number" value={profile.phoneNumber} onUpdate={(v) => handleUpdate('phoneNumber', v)} />
        <ProfileCard label="Avatar URL" value={profile.avatar} onUpdate={(v) => handleUpdate('avatar', v)} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#091426]">Change Password</h2>
        <ChangePasswordForm onSubmit={handleChangePassword} />
      </div>
    </ProfileTemplate>
  );
}

function ChangePasswordForm({ onSubmit }: { onSubmit: (cur: string, next: string) => void }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErr('Passwords do not match');
      return;
    }
    setErr('');
    onSubmit(currentPassword, newPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="border border-[#C5C6CD] rounded-lg px-4 h-[52px] outline-none focus:border-[#486C7E]"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border border-[#C5C6CD] rounded-lg px-4 h-[52px] outline-none focus:border-[#486C7E]"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border border-[#C5C6CD] rounded-lg px-4 h-[52px] outline-none focus:border-[#486C7E]"
      />
      {err && <p className="text-red-500 text-sm">{err}</p>}
      <button
        type="submit"
        className="h-[52px] bg-[#091426] text-white rounded-lg font-semibold hover:bg-[#486C7E] transition-colors"
      >
        Update Password
      </button>
    </form>
  );
}
