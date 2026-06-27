"use client";

import React, { useState, useRef } from 'react';
import { useI18n } from '../../providers/I18nProvider';
import { getAuthToken, getInitials } from '../../utils/user';

interface AvatarUploaderProps {
  avatarUrl: string;
  onAvatarUpdate: (newUrl: string) => void;
  username: string;
}

export default function AvatarUploader({ avatarUrl, onAvatarUpdate, username }: AvatarUploaderProps) {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUrlInputOpen, setIsUrlInputOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (file.size > 2 * 1024 * 1024) {
      setError(t('profile.avatar_size_error') || 'File size exceeds 2MB limit');
      setIsMenuOpen(false);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError(t('profile.avatar_type_error') || 'Invalid file type, only images are allowed!');
      setIsMenuOpen(false);
      return;
    }

    setError('');
    setIsLoading(true);
    setIsMenuOpen(false);

    const token = getAuthToken();
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch(`${API}/user/avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || t('profile.avatar_upload_failed') || 'Upload failed');
      }

      const data = await res.json();
      if (data.avatar) {
        onAvatarUpdate(data.avatar);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    // Client-side validation
    try {
      new URL(inputUrl);
    } catch (e) {
      setError(t('profile.avatar_url_invalid') || 'Invalid URL format');
      return;
    }

    setError('');
    setIsLoading(true);
    setIsUrlInputOpen(false);

    const token = getAuthToken();

    try {
      const res = await fetch(`${API}/user/avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatarUrl: inputUrl }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || t('profile.avatar_url_failed') || 'Failed to save URL');
      }

      const data = await res.json();
      if (data.avatar) {
        onAvatarUpdate(data.avatar);
        setInputUrl('');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-3">
      <div className="relative group w-28 h-28">
        {/* Avatar Display */}
        {isLoading ? (
          <div className="w-full h-full rounded-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center border border-slate-300 dark:border-neutral-700">
            <svg className="animate-spin h-8 w-8 text-[#006F66] dark:text-[#86F2E4]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            className="w-full h-full rounded-full object-cover border border-slate-300 dark:border-neutral-700 shadow-sm"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#486C7E] text-white flex items-center justify-center font-bold text-3xl shadow-sm">
            {getInitials(username) || 'U'}
          </div>
        )}

        {/* Hover Overlay */}
        {!isLoading && (
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
        )}
      </div>

      {/* Edit Options Menu */}
      {isMenuOpen && (
        <div className="absolute top-32 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg shadow-lg py-2 w-48 z-10 font-medium">
          <button
            onClick={() => {
              fileInputRef.current?.click();
              setIsMenuOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-2"
          >
            <span>📁</span> {t('profile.avatar_upload_file') || 'Upload File'}
          </button>
          <button
            onClick={() => {
              setIsUrlInputOpen(true);
              setIsMenuOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-2"
          >
            <span>🔗</span> {t('profile.avatar_paste_url') || 'Paste Image URL'}
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Paste URL Modal/Input */}
      {isUrlInputOpen && (
        <div className="w-full mt-2 flex flex-col gap-2">
          <input
            type="text"
            placeholder={t('profile.avatar_url_placeholder') || 'https://example.com/image.jpg'}
            value={inputUrl}
            disabled={isLoading}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleUrlSubmit(e as any)}
            className="w-full text-sm px-3 py-2 border border-slate-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
            autoFocus
          />

          {/* Thumbnail Preview */}
          {inputUrl && isValidUrl(inputUrl) && (
            <img
              src={inputUrl}
              alt="Preview"
              className="w-8 h-8 rounded object-cover border border-slate-200 dark:border-neutral-700 shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}

          <div className="flex gap-2">
            <button
              onClick={handleUrlSubmit}
              disabled={isLoading}
              className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-1"
            >
              {isLoading && (
                <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {t('profile.save') || 'Save'}
            </button>
            <button
              onClick={() => {
                setIsUrlInputOpen(false);
                setInputUrl('');
              }}
              disabled={isLoading}
              className="flex-1 py-1.5 border border-slate-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-700 text-xs font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              {t('profile.cancel') || 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400 text-center font-medium max-w-xs px-2 mt-1">
          {error}
        </span>
      )}
    </div>
  );
}
