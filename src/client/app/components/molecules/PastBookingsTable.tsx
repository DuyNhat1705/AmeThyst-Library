"use client";

import { useI18n } from '../../providers/I18nProvider';
import type { Reservation } from './ReservationCard';

interface Props {
  bookings: Reservation[];
}

function formatDuration(startTime: string, endTime: string): string {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  const diff = endMin - startMin;
  if (diff <= 0) return '0h';
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function PastBookingsTable({ bookings }: Props) {
  const { t } = useI18n();

  const formatTime = (timeStr: string) => timeStr.slice(0, 5);
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#F8F3E9] dark:bg-neutral-800">
            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#74777D] dark:text-neutral-400">
              {t('room.room_name')}
            </th>
            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#74777D] dark:text-neutral-400">
              {t('room.date')}
            </th>
            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#74777D] dark:text-neutral-400">
              {t('room.time_slot')}
            </th>
            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#74777D] dark:text-neutral-400">
              {t('room.duration')}
            </th>
            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#74777D] dark:text-neutral-400">
              {t('room.status')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E2D5] dark:divide-neutral-700">
          {bookings.map((b) => (
            <tr key={b.reserveId} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-[#1D1C16] dark:text-neutral-200">
                {b.roomName}
              </td>
              <td className="px-4 py-3 text-sm text-[#75777D] dark:text-neutral-400">
                {formatDate(b.startDate)}
              </td>
              <td className="px-4 py-3 text-sm text-[#75777D] dark:text-neutral-400">
                {formatTime(b.startTime)} - {formatTime(b.endTime)}
              </td>
              <td className="px-4 py-3 text-sm text-[#75777D] dark:text-neutral-400">
                {formatDuration(b.startTime, b.endTime)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-4 bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
