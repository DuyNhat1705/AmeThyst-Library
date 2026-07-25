'use client';

import React, { useState } from 'react';

/**
 * Reusable ImageUploader Component (reused from Profile Avatar feature).
 * Supports:
 * 1. Uploading local image files from device.
 * 2. Entering an external web image URL.
 * 3. Live image preview rendering.
 *
 * @param {Object} props
 * @param {string} props.imageUrl - Current image URL or relative path
 * @param {Function} props.onImageChange - Callback with new imageUrl string
 */
export default function ImageUploader({ imageUrl, onImageChange }) {
  const [activeTab, setActiveTab] = useState('device'); // 'device' | 'url'
  const [urlInput, setUrlInput] = useState(imageUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Handle local file selection from device
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Image file size must be less than 2MB.');
      return;
    }

    setErrorMsg('');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_BASE}/api/books/upload-cover`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image.');
      }

      const uploadedPath = data.image_url.startsWith('http')
        ? data.image_url
        : `${API_BASE}${data.image_url}`;

      onImageChange(uploadedPath);
    } catch (err) {
      setErrorMsg(err.message || 'Error uploading file from device.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle image URL submission
  const handleUrlApply = () => {
    if (!urlInput.trim()) {
      setErrorMsg('Please enter a valid image URL.');
      return;
    }
    setErrorMsg('');
    onImageChange(urlInput.trim());
  };

  const currentPreview = imageUrl || urlInput;

  return (
    <div className="w-full space-y-3 font-sans">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Book Cover Image
      </label>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => { setActiveTab('device'); setErrorMsg(''); }}
          className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'device'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          Upload from Device
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('url'); setErrorMsg(''); }}
          className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'url'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          Image Web URL
        </button>
      </div>

      {/* Device Upload Mode */}
      {activeTab === 'device' && (
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-slate-500 dark:text-slate-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100
              dark:file:bg-indigo-950 dark:file:text-indigo-300"
            disabled={isUploading}
          />
          {isUploading && (
            <span className="text-xs text-indigo-600 animate-pulse">Uploading...</span>
          )}
        </div>
      )}

      {/* URL Input Mode */}
      {activeTab === 'url' && (
        <div className="flex space-x-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/cover.jpg"
            className="flex-1 px-3 py-2 text-sm border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleUrlApply}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
          >
            Apply URL
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <p className="text-xs text-red-500">{errorMsg}</p>
      )}

      {/* Live Image Preview */}
      {currentPreview && (
        <div className="mt-2 flex items-center space-x-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">Preview:</span>
          <img
            src={currentPreview}
            alt="Cover preview"
            className="h-20 w-14 object-cover rounded shadow-md border border-slate-200 dark:border-slate-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=No+Cover';
            }}
          />
        </div>
      )}
    </div>
  );
}
