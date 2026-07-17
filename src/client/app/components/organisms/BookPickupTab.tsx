"use client";

import { useState, useMemo } from 'react';
import { useI18n } from '../../providers/I18nProvider';
import { MOCK_PICKUPS } from '../../data/mockLibraryData';
import CountdownTimer from '../atoms/CountdownTimer';
import type { PickupEntry } from '../../data/mockLibraryData';

const ITEMS_PER_PAGE = 10;

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function StatusBadge({ status }: { status: PickupEntry['status'] }) {
  const { t } = useI18n();
  const styles: Record<PickupEntry['status'], string> = {
    urgent: 'bg-[rgba(255,218,214,0.20)] text-[#BA1A1A]',
    pending: 'bg-[rgba(215,182,254,0.20)] text-[#6E5191]',
    expired: 'bg-gray-100 text-gray-500',
    redeemed: 'bg-[rgba(0,166,148,0.10)] text-[#00A694]',
  };
  return (
    <span className={`py-1 px-3 rounded-full font-manrope text-xs font-bold ${styles[status]}`}>
      {t(`librarian.pickup_status_${status}`)}
    </span>
  );
}

function formatExpiresTime(expiresAt: string): { display: string; urgent: boolean } {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { display: '00:00', urgent: true };
  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return { display: `${hours}h ${minutes}m`, urgent: false };
  }
  const seconds = Math.floor((diff % 60000) / 1000);
  return { display: `${minutes}m ${seconds}s`, urgent: true };
}

function PickupRow({ pickup, hasBorder }: { pickup: PickupEntry; hasBorder: boolean }) {
  const { t } = useI18n();
  const initials = getInitials(pickup.studentName);
  const expires = formatExpiresTime(pickup.expiresAt);
  const isUrgent = pickup.status === 'urgent';

  return (
    <div className={`flex justify-center items-center gap-6 w-full py-4 ${hasBorder ? 'border-b border-b-gray-100' : ''}`}>
      <div className="flex items-center gap-4 w-[158px]">
        <div className="flex flex-col justify-center items-start shrink-0 rounded bg-[#E7E2D8] w-12 h-16 overflow-hidden">
          <div className="w-full h-full bg-[#E7E2D8]" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[#03192E] dark:text-neutral-100 font-manrope text-base leading-5 font-bold">{pickup.bookTitle}</p>
          <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-xs mt-1">ISBN: {pickup.bookISBN}</p>
        </div>
      </div>
      <div className="flex pl-6 items-center gap-3 w-[133px]">
        <div className="flex pt-2 pb-[9px] justify-center items-center rounded-full bg-[#D7B6FE] w-8 h-8">
          <p className="text-[#604382] font-manrope text-xs font-bold">{initials}</p>
        </div>
        <div>
          <p className="text-[#03192E] dark:text-neutral-100 font-manrope text-sm font-bold">{pickup.studentName}</p>
          <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-xs">ID: {pickup.studentId}</p>
        </div>
      </div>
      <div className="flex pl-6 flex-col items-start w-[139px]">
        <div className="flex py-1 px-3 items-center gap-2 rounded border border-[rgba(196,198,205,0.30)] bg-[#F2EDE3] dark:bg-neutral-700">
          {isUrgent && (
            <svg width="7" height="9" viewBox="0 0 7 9" fill="none">
              <path d="M0.8 9C0.58 9 0.39 8.92 0.23 8.76C0.07 8.6 0 8.41 0 8.19V3.8C0 3.58 0.07 3.39 0.23 3.23C0.39 3.07 0.58 3 0.8 3H1.5V2C1.5 1.44 1.69 0.97 2.08 0.58C2.47 0.19 2.94 0 3.5 0C4.05 0 4.52 0.19 4.91 0.58C5.3 0.97 5.5 1.44 5.5 2V3H6.19C6.41 3 6.6 3.07 6.76 3.23C6.92 3.39 7 3.58 7 3.8V8.19C7 8.41 6.92 8.6 6.76 8.76C6.6 8.92 6.41 9 6.19 9H0.8ZM3.5 6.75C3.71 6.75 3.88 6.67 4.03 6.53C4.17 6.38 4.25 6.21 4.25 6C4.25 5.78 4.17 5.61 4.03 5.46C3.88 5.32 3.71 5.25 3.5 5.25C3.28 5.25 3.11 5.32 2.96 5.46C2.82 5.61 2.75 5.78 2.75 6C2.75 6.21 2.82 6.38 2.96 6.53C3.11 6.67 3.28 6.75 3.5 6.75ZM2 3H5V2C5 1.58 4.85 1.22 4.56 0.93C4.27 0.64 3.91 0.5 3.5 0.5C3.08 0.5 2.72 0.64 2.43 0.93C2.14 1.22 2 1.58 2 2V3Z" fill="#43474D" />
            </svg>
          )}
          <p className="text-[#03192E] dark:text-neutral-200 font-liberationMono text-base tracking-[0.1em] font-bold">****</p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-20">
        {isUrgent ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M3.14 0.58V0H6.19V0.58H3.14ZM4.37 7.06H4.95V4.01H4.37V7.06ZM4.66 11.37C4.02 11.37 3.41 11.25 2.85 11.00C2.28 10.76 1.79 10.43 1.36 10.00C0.94 9.58 0.60 9.08 0.36 8.52C0.12 7.95 0 7.35 0 6.70C0 6.06 0.12 5.45 0.36 4.89C0.60 4.32 0.94 3.83 1.36 3.40C1.79 2.98 2.28 2.65 2.85 2.40C3.41 2.16 4.02 2.04 4.66 2.04C5.23 2.04 5.77 2.14 6.30 2.34C6.83 2.54 7.31 2.83 7.76 3.20L8.39 2.56L8.81 2.97L8.17 3.61C8.54 4.05 8.82 4.54 9.03 5.06C9.23 5.59 9.33 6.14 9.33 6.70C9.33 7.35 9.21 7.95 8.96 8.52C8.72 9.08 8.39 9.58 7.96 10.00C7.54 10.43 7.04 10.76 6.48 11.00C5.91 11.25 5.31 11.37 4.66 11.37ZM4.66 10.79C5.79 10.79 6.75 10.39 7.55 9.59C8.35 8.79 8.75 7.83 8.75 6.70C8.75 5.58 8.35 4.61 7.55 3.82C6.75 3.02 5.79 2.62 4.66 2.62C3.53 2.62 2.57 3.02 1.77 3.82C0.98 4.61 0.58 5.58 0.58 6.70C0.58 7.83 0.98 8.79 1.77 9.59C2.57 10.39 3.53 10.79 4.66 10.79Z" fill="#BA1A1A" />
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M7.37 7.78L7.78 7.37L5.54 5.12V2.33H4.95V5.37L7.37 7.78ZM5.25 10.5C4.52 10.5 3.84 10.36 3.2 10.08C2.56 9.81 2 9.43 1.53 8.96C1.06 8.49 0.68 7.93 0.41 7.29C0.13 6.66 0 5.97 0 5.25C0 4.52 0.13 3.84 0.41 3.2C0.68 2.56 1.06 2 1.53 1.53C2 1.06 2.56 0.68 3.2 0.41C3.84 0.13 4.52 0 5.25 0C5.97 0 6.65 0.13 7.29 0.41C7.93 0.68 8.49 1.06 8.96 1.53C9.43 2.00 9.81 2.56 10.08 3.2C10.36 3.83 10.5 4.52 10.5 5.24C10.5 5.97 10.36 6.65 10.08 7.29C9.81 7.93 9.43 8.49 8.96 8.96C8.49 9.43 7.93 9.81 7.29 10.08C6.66 10.36 5.97 10.5 5.25 10.5Z" fill="#6E5191" />
          </svg>
        )}
        <p className={`font-manrope text-sm ${isUrgent ? 'text-[#BA1A1A] font-semibold' : 'text-[#6E5191] leading-5'}`}>
          {expires.display}
        </p>
      </div>
      <div className="flex pl-6 flex-col items-start w-32">
        <StatusBadge status={pickup.status} />
      </div>
      <div className="flex justify-end gap-2 w-[136px] pr-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 text-[#03192E] dark:text-neutral-200">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="w-5 h-5">
            <path d="M8.00266 18.1154C6.89191 18.1154 5.85111 17.9081 4.88025 17.4934C3.90939 17.0787 3.06081 16.5085 2.33452 15.7828C1.60822 15.0571 1.03756 14.2093 0.622538 13.2392C0.207513 12.2692 0 11.2288 0 10.118C0 10.118 0 10.1154 0 10.1154C0 8.17436 0.68142 6.52244 3.04424 5.15962C4.40706 3.7968 6.05898 3.11539 8.00001 3.11539C8.35001 3.11539 8.68751 3.14039 9.01251 3.19039C9.66667 3.31539 10 3.41539 10 3.41539V2.36538V3.41539C9.66667 3.31539 9.33751 3.24039 9.01251 3.19039C8.68751 3.14039 8.35001 3.11539 8.00001 3.11539C6.05898 3.11539 4.40706 3.7968 3.04424 5.15962C1.68142 6.52244 1.00001 8.17436 1.00001 10.1154C1.00001 12.0564 1.68142 13.7083 3.04424 15.0712C4.40706 16.434 6.05898 17.1154 8.00001 17.1154C9.94103 17.1154 11.593 16.434 12.9558 15.0712C14.3186 13.7083 15 12.0553 15 10.1121C15 9.93096 14.9917 9.74616 14.975 9.5577C14.9583 9.36924 14.8808 9.00001 14.8808 9.00001H15.8923C15.9257 9.1577 15.9712 9.53847 15.9712 9.53847C15.9904 9.73975 16 9.93206 16 10.1154C16 11.2265 15.7927 12.2672 15.378 13.2376C14.9633 14.208 14.3931 15.0561 13.6674 15.7821C12.9418 16.508 12.0939 17.0784 11.1238 17.4932C10.1538 17.908 9.1134 18.1154 8.00266 18.1154ZM11.1462 13.9692L7.5 10.3231V5.11539H8.50001V9.9077L11.8539 13.2615L11.1462 13.9692ZM15 7V4H12V3H15V0H16V3H19V4H16V7H15Z" fill="currentColor" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-[#BA1A1A]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="w-5 h-5">
            <path d="M5.4 13.3L9 9.7L12.6 13.3L13.3 12.6L9.7 9L13.3 5.4L12.6 4.7L9 8.3L5.4 4.7L4.7 5.4L8.3 9L4.7 12.6L5.4 13.3ZM9 18C7.75 18 6.58 17.76 5.49 17.29C4.39 16.81 3.44 16.17 2.63 15.36C1.82 14.55 1.18 13.6 0.7 12.51C0.23 11.41 0 10.24 0 9C0 7.75 0.23 6.58 0.7 5.49C1.18 4.39 1.82 3.44 2.63 2.63C3.44 1.82 4.39 1.18 5.48 0.7C6.58 0.23 7.75 0 9 0C10.24 0 11.41 0.23 12.5 0.7C13.6 1.18 14.55 1.82 15.36 2.63C16.17 3.44 16.81 4.39 17.29 5.48C17.76 6.58 18 7.75 18 9C18 10.24 17.76 11.41 17.29 12.5C16.81 13.6 16.17 14.55 15.36 15.36C14.55 16.17 13.6 16.81 12.51 17.29C11.41 17.76 10.24 18 9 18Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function BookPickupTab() {
  const { t } = useI18n();
  const [currentPage, setCurrentPage] = useState(1);

  const pendingCount = useMemo(() => MOCK_PICKUPS.filter(p => p.status === 'pending' || p.status === 'urgent').length, []);
  const expiredCount = useMemo(() => MOCK_PICKUPS.filter(p => p.status === 'expired').length, []);
  const redeemedCount = useMemo(() => MOCK_PICKUPS.filter(p => p.status === 'redeemed').length, []);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = MOCK_PICKUPS.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(MOCK_PICKUPS.length / ITEMS_PER_PAGE);

  return (
    <div className="flex p-16 flex-col items-start gap-6 w-full animate-fadeIn">
      <div className="grid grid-cols-3 gap-6 w-full">
        <div className="flex p-8 flex-col items-start gap-1 border border-[rgba(196,198,205,0.10)] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-[0_4px_20px_0_rgba(26,46,68,0.06)] rounded-xl">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-lg bg-[rgba(26,46,68,0.05)] dark:bg-neutral-700">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path d="M15.8 16.7L16.7 15.8L11.9 11V5H10.6V11.5L15.8 16.7ZM11.3 22.5C9.7 22.5 8.2 22.2 6.9 21.6C5.5 21 4.3 20.2 3.3 19.2C2.3 18.2 1.5 17 0.9 15.6C0.3 14.3 0 12.8 0 11.3C0 9.7 0.3 8.2 0.9 6.9C1.5 5.5 2.3 4.3 3.3 3.3C4.3 2.3 5.5 1.5 6.9 0.9C8.2 0.3 9.7 0 11.3 0C12.8 0 14.3 0.3 15.6 0.9C17 1.5 18.2 2.3 19.2 3.3C20.2 4.3 21 5.5 21.6 6.9C22.2 8.2 22.5 9.7 22.5 11.3C22.5 12.8 22.2 14.3 21.6 15.6C21 17 20.2 18.2 19.2 19.2C18.2 20.2 17 21 15.6 21.6C14.3 22.2 12.8 22.5 11.3 22.5ZM11.3 21.3C14 21.3 16.4 20.3 18.3 18.3C20.3 16.4 21.3 14 21.3 11.3C21.3 8.5 20.3 6.1 18.3 4.2C16.4 2.2 14 1.3 11.3 1.3C8.5 1.3 6.1 2.2 4.2 4.2C2.2 6.1 1.3 8.5 1.3 11.3C1.3 14 2.2 16.4 4.2 18.3C6.1 20.3 8.5 21.3 11.3 21.3Z" fill="#03192E" className="dark:fill-neutral-300" />
              </svg>
            </div>
            <p className="text-[#6E5191] font-manrope text-xs font-bold tracking-[0.05em]">+12% vs last week</p>
          </div>
          <p className="text-[#03192E] dark:text-neutral-100 font-hankenGrotesk text-2xl font-semibold leading-8 mt-3">{pendingCount}</p>
          <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold tracking-[0.05em] mb-4">{t('librarian.kpi_pending_pickups')}</p>
          <div className="w-full bg-[#F2EDE3] dark:bg-neutral-700 h-1 rounded-full overflow-hidden">
            <div className="bg-[#03192E] dark:bg-neutral-200 h-full w-[66%]" />
          </div>
        </div>

        <div className="flex p-8 flex-col items-start gap-1 border border-[rgba(196,198,205,0.10)] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-[0_4px_20px_0_rgba(26,46,68,0.06)] rounded-xl">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-lg bg-[rgba(255,218,214,0.20)]">
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none">
                <path d="M7.1 18.7L6.2 17.8L9.1 14.9L6.2 12L7.1 11.1L10 14L12.9 11.1L13.8 12L10.9 14.9L13.8 17.8L12.9 18.7L10 15.8L7.1 18.7ZM2 22.8C1.4 22.8 0.9 22.6 0.6 22.2C0.2 21.8 0 21.3 0 20.8V4.8C0 4.2 0.2 3.8 0.6 3.4C0.9 3 1.4 2.8 2 2.8H4.2V0H5.6V2.8H14.5V0H15.8V2.8H18C18.6 2.8 19 3 19.4 3.4C19.8 3.8 20 4.2 20 4.8V20.8C20 21.3 19.8 21.8 19.4 22.2C19 22.6 18.6 22.8 18 22.8H2ZM2 21.5H18C18.2 21.5 18.4 21.4 18.5 21.3C18.7 21.1 18.8 20.9 18.8 20.8V9.8H1.3V20.8C1.3 20.9 1.3 21.1 1.5 21.3C1.7 21.4 1.8 21.5 2 21.5ZM1.3 8.6H18.8V4.8C18.8 4.6 18.7 4.4 18.5 4.3C18.4 4.1 18.2 4 18 4H2C1.8 4 1.7 4.1 1.5 4.3C1.3 4.4 1.3 4.6 1.3 4.8V8.6Z" fill="#BA1A1A" />
              </svg>
            </div>
            <p className="text-[#BA1A1A] font-manrope text-xs font-bold tracking-[0.05em]">Action Required</p>
          </div>
          <p className="text-[#03192E] dark:text-neutral-100 font-hankenGrotesk text-2xl font-semibold leading-8 mt-3">{String(expiredCount).padStart(2, '0')}</p>
          <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold tracking-[0.05em] mb-4">{t('librarian.kpi_expired_today')}</p>
          <div className="w-full bg-[#F2EDE3] dark:bg-neutral-700 h-1 rounded-full overflow-hidden">
            <div className="bg-[#BA1A1A] h-full w-[25%]" />
          </div>
        </div>

        <div className="flex p-8 flex-col items-start gap-1 border border-[rgba(196,198,205,0.10)] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-[0_4px_20px_0_rgba(26,46,68,0.06)] rounded-xl">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-lg bg-[rgba(0,166,148,0.10)]">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M10.8 18.3L19.6 9.4L17.8 7.7L10.8 14.8L7.2 11.2L5.4 13L10.8 18.3ZM12.5 25C10.8 25 9.1 24.7 7.6 24C6.1 23.3 4.8 22.5 3.7 21.3C2.5 20.2 1.6 18.9 1 17.4C0.3 15.9 0 14.2 0 12.5C0 10.8 0.3 9.1 1 7.6C1.6 6.1 2.5 4.8 3.7 3.7C4.8 2.5 6.1 1.6 7.6 1C9.1 0.3 10.8 0 12.5 0C14.2 0 15.9 0.3 17.4 1C18.9 1.6 20.2 2.5 21.3 3.7C22.5 4.8 23.4 6.1 24 7.6C24.7 9.1 25 10.8 25 12.5C25 14.2 24.7 15.9 24 17.4C23.4 18.9 22.5 20.2 21.3 21.3C20.2 22.5 18.9 23.3 17.4 24C15.9 24.7 14.2 25 12.5 25Z" fill="#00A694" />
              </svg>
            </div>
            <p className="text-[#00A694] font-manrope text-xs font-bold tracking-[0.05em]">Goal Reached</p>
          </div>
          <p className="text-[#03192E] dark:text-neutral-100 font-hankenGrotesk text-2xl font-semibold leading-8 mt-3">{redeemedCount}</p>
          <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold tracking-[0.05em] mb-4">{t('librarian.kpi_redeemed_today')}</p>
          <div className="w-full bg-[#F2EDE3] dark:bg-neutral-700 h-1 rounded-full overflow-hidden">
            <div className="bg-[#00A694] h-full w-[80%]" />
          </div>
        </div>
      </div>

      <div className="flex p-4 items-center gap-4 rounded-xl bg-[#F8F3E9] dark:bg-neutral-800 w-full">
        <div className="flex flex-col items-start w-[601px] relative">
          <input
            type="text"
            placeholder="Search by student name, ID or book title..."
            className="flex pt-2 pr-4 pb-[9px] pl-10 items-center rounded-lg border border-[#C4C6CD] dark:border-neutral-600 bg-white dark:bg-neutral-800 w-full text-sm font-manrope text-gray-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#03192E] dark:focus:ring-neutral-400"
          />
          <svg width="17" height="24" viewBox="0 0 17 24" fill="none" className="absolute left-3 top-[7px] w-4 h-6">
            <path d="M15.6769 16.3846L9.41539 10.1231C8.91539 10.5487 8.34039 10.8782 7.69039 11.1115C7.04039 11.3449 6.38718 11.4615 5.73077 11.4615C4.13205 11.4615 2.77725 10.9061 1.66635 9.7952C0.555449 8.6843 0 7.32949 0 5.73077C0 4.13205 0.555449 2.77725 1.66635 1.66635C2.77725 0.555449 4.13205 0 5.73077 0C7.32949 0 8.6843 0.555449 9.7952 1.66635C10.9061 2.77725 11.4615 4.13205 11.4615 5.73077C11.4615 6.42565 11.3385 7.09808 11.0923 7.74808C10.8462 8.39808 10.5231 8.95385 10.1231 9.41539L16.3846 15.6769L15.6769 16.3846ZM5.73077 10.4615C7.0577 10.4615 8.17789 10.0048 9.09135 9.09135C10.0048 8.17789 10.4615 7.0577 10.4615 5.73077C10.4615 4.40385 10.0048 3.28366 9.09135 2.3702C8.17789 1.45674 7.0577 1.00001 5.73077 1.00001C4.40385 1.00001 3.28366 1.45674 2.3702 2.3702C1.45674 3.28366 1.00001 4.40385 1.00001 5.73077C1.00001 7.0577 1.45674 8.17789 2.3702 9.09135C3.28366 10.0048 4.40385 10.4615 5.73077 10.4615Z" fill="#43474D" />
          </svg>
        </div>
        <div className="flex items-start gap-3 overflow-hidden">
          <div className="flex py-2 px-4 items-center rounded-lg border border-[#C4C6CD] dark:border-neutral-600 bg-white dark:bg-neutral-800 cursor-pointer relative pr-10">
            <p className="text-[#1D1C16] dark:text-neutral-200 font-manrope text-sm leading-5">{t('librarian.all_statuses')}</p>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="absolute right-2 top-2">
              <path d="M6.3 8.4L10.5 12.6L14.7 8.4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex py-2 px-4 items-center rounded-lg border border-[#C4C6CD] dark:border-neutral-600 bg-white dark:bg-neutral-800 cursor-pointer relative pr-12">
            <p className="text-[#1D1C16] dark:text-neutral-200 font-manrope text-sm leading-5">{t('librarian.all_categories')}</p>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="absolute right-2 top-2">
              <path d="M6.3 8.4L10.5 12.6L14.7 8.4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <button className="flex py-[9px] px-6 items-center gap-2 rounded-lg bg-[#03192E] dark:bg-neutral-200 text-white dark:text-[#03192E] hover:bg-opacity-90">
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
              <path d="M3.66462 8.16667C3.53673 8.16667 3.42998 8.12386 3.34435 8.03823C3.25872 7.9526 3.2159 7.84584 3.2159 7.71796V4.46475L0.0681425 0.484618C-0.0103836 0.379917 -0.0210407 0.272972 0.0361711 0.163783C0.0933829 0.0545943 0.18481 0 0.310452 0H7.28802C7.41366 0 7.50509 0.0545943 7.5623 0.163783C7.61951 0.272972 7.60886 0.379917 7.53033 0.484618L4.38257 4.46475V7.71796C4.38257 7.84584 4.33976 7.9526 4.25413 8.03823C4.1685 8.12386 4.06174 8.16667 3.93386 8.16667H3.66462ZM3.79924 4.25834L6.68674 0.583337H0.911737L3.79924 4.25834Z" fill="currentColor" />
            </svg>
            <p className="font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">{t('librarian.advanced_filters')}</p>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start rounded-xl border border-[rgba(196,198,205,0.10)] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-[0_4px_20px_0_rgba(26,46,68,0.06)] w-full overflow-hidden">
        <div className="flex flex-col items-start -space-y-px w-full overflow-hidden">
          <div className="flex flex-col items-start border-b border-b-[rgba(196,198,205,0.30)] bg-[#EDE8DE] dark:bg-neutral-700 w-full">
            <div className="flex justify-center items-start w-full">
              <div className="flex py-4 px-6 flex-col items-start w-[206px]"><p className="text-[#03192E] dark:text-neutral-200 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">{t('librarian.pickup_book_details')}</p></div>
              <div className="flex py-4 px-6 flex-col items-start w-[157px]"><p className="text-[#03192E] dark:text-neutral-200 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">{t('librarian.pickup_student')}</p></div>
              <div className="flex py-4 px-6 flex-col items-start w-[139px]"><p className="text-[#03192E] dark:text-neutral-200 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">{t('librarian.pickup_pin')}</p></div>
              <div className="flex py-4 px-6 flex-col items-start w-32"><p className="text-[#03192E] dark:text-neutral-200 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">{t('librarian.pickup_expires')}</p></div>
              <div className="flex py-4 px-6 flex-col items-start w-32"><p className="text-[#03192E] dark:text-neutral-200 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">{t('librarian.pickup_status')}</p></div>
              <div className="flex py-4 px-6 flex-col items-end w-[136px]"><p className="text-[#03192E] dark:text-neutral-200 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">{t('librarian.pickup_actions')}</p></div>
            </div>
          </div>

          <div className="flex flex-col items-start -space-y-px w-full">
            {pageItems.map((pickup, i) => (
              <PickupRow key={pickup.id} pickup={pickup} hasBorder={i < pageItems.length - 1} />
            ))}
          </div>
        </div>

        <div className="flex py-4 px-6 justify-between items-center bg-[#F8F3E9] dark:bg-neutral-800 w-full">
          <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-xs font-bold tracking-[0.05em]">
            Showing {startIdx + 1}-{Math.min(startIdx + ITEMS_PER_PAGE, MOCK_PICKUPS.length)} of {MOCK_PICKUPS.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="flex p-2 justify-center items-center rounded opacity-30 disabled:cursor-not-allowed hover:opacity-100"
            >
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <path d="M5.3 10.6L0 5.3L5.3 0L6 0.7L1.4 5.3L6 9.9L5.3 10.6Z" fill="#03192E" className="dark:fill-neutral-300" />
              </svg>
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex justify-center items-center rounded w-8 h-8 font-hankenGrotesk text-xs font-bold ${
                    page === currentPage
                      ? 'bg-[#03192E] dark:bg-neutral-200 text-white dark:text-[#03192E]'
                      : 'text-[#1D1C16] dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="flex p-2 justify-center items-center rounded hover:bg-gray-100 dark:hover:bg-neutral-700 disabled:opacity-30"
            >
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <path d="M4.6 5.3L0 0.7L0.7 0L6 5.3L0.7 10.6L0 9.9L4.6 5.3Z" fill="#03192E" className="dark:fill-neutral-300" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
