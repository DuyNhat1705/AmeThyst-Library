"use client";

import { useEffect, useState } from 'react';
import { useI18n } from '../../providers/I18nProvider';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const isLocalhostApi = () => {
  try {
    const { hostname } = new URL(API_URL);
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname === '[::1]';
  } catch {
    return false;
  }
};

export default function NetworkStatusBanner() {
  const { t } = useI18n();
  const [offline, setOffline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false,
  );
  const [apiDown, setApiDown] = useState(false);
  const localApi = isLocalhostApi();

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      setApiDown(false);
    };
    const handleOffline = () => setOffline(true);
    const handleNetworkError = () => setApiDown(true);
    const handleNetworkRecovered = () => setApiDown(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('network-error', handleNetworkError);
    window.addEventListener('network-recovered', handleNetworkRecovered);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('network-error', handleNetworkError);
      window.removeEventListener('network-recovered', handleNetworkRecovered);
    };
  }, []);

  const visible = apiDown || (offline && !localApi);
  if (!visible) return null;

  return (
    <div
      role="alert"
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 bg-red-600 px-4 py-2 text-white font-inter text-sm font-semibold shadow-md"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{t('network.error')}</span>
    </div>
  );
}