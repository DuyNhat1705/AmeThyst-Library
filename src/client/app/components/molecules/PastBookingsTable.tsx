"use client";

import { useState } from 'react';
import { useI18n } from '../../providers/I18nProvider';
import type { Reservation } from './ReservationCard';
import { localizedBranchName } from '../../utils/room';

interface Props {
  bookings: Reservation[];
  onFilter?: (from?: string, to?: string) => void;
  onClear?: () => void;
}

function formatDuration(startTime: string, endTime: string): string {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  const diff = eh * 60 + em - (sh * 60 + sm);
  if (diff <= 0) return '0h';
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function statusMeta(t: (key: string) => string, status: string) {
  switch (status) {
    case 'used':
      return {
        label: t('room.checked_out'),
        cls: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
      };
    case 'reserved':
      return {
        label: t('room.slot_reserved'),
        cls: 'bg-[#FFB95F]/25 text-[#8a5a12] dark:bg-[#FFB95F]/10 dark:text-[#FFB95F]',
      };
    case 'pending':
      return {
        label: t('room.slot_pending'),
        cls: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300',
      };
    default:
      return {
        label: status,
        cls: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300',
      };
  }
}

function HistoryCard({ booking }: { booking: Reservation }) {
  const { t, locale } = useI18n();
  const [imgError, setImgError] = useState(false);

  const formatTime = (timeStr: string) => timeStr.slice(0, 5);

  const formatDateTime = (value?: string | null) => {
    if (!value) return null;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    return {
      time: d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false }),
      date: d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }),
    };
  };

  const status = statusMeta(t, booking.status);
  const checkin = formatDateTime(booking.checkinTime);
  const checkout = formatDateTime(booking.checkoutTime);

  return (
    <div className="group bg-white dark:bg-neutral-800 rounded-2xl border border-[#E8E2D5] dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Room image */}
        <div className="shrink-0 h-32 sm:h-auto sm:w-44 bg-[#F8F3E9] dark:bg-neutral-700 overflow-hidden">
          {booking.imgUrl && !imgError ? (
            <img
              src={booking.imgUrl}
              alt={booking.roomName}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 dark:text-neutral-500">
                <path d="M5 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
                <path d="M4 18h10" />
                <circle cx="7" cy="18" r="1.5" />
                <circle cx="17" cy="18" r="1.5" />
              </svg>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-manrope text-lg font-bold leading-tight text-[#1D1C16] dark:text-neutral-100">
              {booking.roomName}
            </h4>
            <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-4 ${status.cls}`}>
              {status.label}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#75777D] dark:text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{localizedBranchName(t, booking.branchId, booking.branchName)}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
              </span>
            </span>
          </div>
          <div className="mt-3 inline-flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#75777D] dark:text-neutral-400">
              {t('room.duration')}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#F8F3E9] dark:bg-neutral-700/60 text-xs font-semibold text-[#1D1C16] dark:text-neutral-200">
              {formatDuration(booking.startTime, booking.endTime)}
            </span>
          </div>
        </div>

        {/* Check-in / check-out stats */}
        <div className="grid grid-cols-2 gap-4 border-t sm:border-t-0 sm:border-l border-[#E8E2D5] dark:border-neutral-700 bg-[#FDFBF7] dark:bg-neutral-900/40 px-5 py-4 sm:px-6 sm:flex sm:items-center sm:gap-10">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#75777D] dark:text-neutral-400">
              {t('room.history_checkin')}
            </div>
            <div className="mt-1 font-manrope text-base font-bold text-[#006F66] dark:text-[#FFB95F]">
              {checkin?.time ?? '—'}
            </div>
            <div className="text-[11px] text-[#75777D] dark:text-neutral-400">
              {checkin?.date ?? ''}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#75777D] dark:text-neutral-400">
              {t('room.history_checkout')}
            </div>
            <div className="mt-1 font-manrope text-base font-bold text-[#1D1C16] dark:text-neutral-100">
              {checkout?.time ?? '—'}
            </div>
            <div className="text-[11px] text-[#75777D] dark:text-neutral-400">
              {checkout?.date ?? ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PastBookingsTable({ bookings, onFilter, onClear }: Props) {
  const { t } = useI18n();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleApply = () => {
    onFilter?.(from || undefined, to || undefined);
  };

  const handleClear = () => {
    setFrom('');
    setTo('');
    onClear?.();
  };

  return (
    <div>
      {/* Filter toolbar */}
      {onFilter && (
        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#75777D] dark:text-neutral-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>{t('room.history_count', { count: bookings.length })}</span>
          </div>

          <div className="flex flex-wrap items-end gap-3 sm:ml-auto">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#74777D] dark:text-neutral-400 mb-1">
                {t('room.history_filter_from')}
              </label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[#E8E2D5] dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm text-[#1D1C16] dark:text-neutral-200 outline-none focus:border-[#FFB95F] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#74777D] dark:text-neutral-400 mb-1">
                {t('room.history_filter_to')}
              </label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[#E8E2D5] dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm text-[#1D1C16] dark:text-neutral-200 outline-none focus:border-[#FFB95F] transition-colors"
              />
            </div>
            <button
              onClick={handleApply}
              className="py-2 px-5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity"
            >
              {t('room.history_apply')}
            </button>
            <button
              onClick={handleClear}
              className="py-2 px-5 rounded-full border border-[#E8E2D5] dark:border-neutral-600 text-[#75777D] dark:text-neutral-400 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              {t('room.history_clear')}
            </button>
          </div>
        </div>
      )}

      {/* Stay cards */}
      <div className="space-y-4">
        {bookings.map((b) => (
          <HistoryCard key={b.reserveId} booking={b} />
        ))}
      </div>
    </div>
  );
}
