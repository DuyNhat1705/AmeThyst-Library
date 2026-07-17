"use client";

import { useState, useMemo } from 'react';
import { useI18n } from '../../providers/I18nProvider';
import { MOCK_BORROWS } from '../../data/mockLibraryData';
import type { BorrowEntry } from '../../data/mockLibraryData';

const ITEMS_PER_PAGE = 10;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function ReturnStatusBadge({ status }: { status: BorrowEntry['status'] }) {
  const { t } = useI18n();
  if (status === 'overdue') {
    return (
      <span className="py-1 px-3 rounded-full bg-[#FFDAD6] text-[#BA1A1A] font-manrope text-xs font-bold tracking-[-0.025em]">
        {t('librarian.return_status_overdue')}
      </span>
    );
  }
  return (
    <span className="py-1 px-3 rounded-full bg-[#061D32] dark:bg-neutral-700 text-[#72859F] dark:text-neutral-300 font-manrope text-xs font-bold tracking-[-0.025em]">
      {t('librarian.return_status_active')}
    </span>
  );
}

function ReturnRow({ borrow, hasBorder }: { borrow: BorrowEntry; hasBorder: boolean }) {
  const { t } = useI18n();
  const initials = getInitials(borrow.userName);
  const isOverdue = borrow.status === 'overdue';

  return (
    <div className={`flex justify-center items-center w-full ${isOverdue ? 'bg-[rgba(255,218,214,0.05)]' : ''} ${hasBorder ? 'border-b border-b-gray-100' : ''}`}>
      <div className="flex items-center gap-3 w-[220px] pl-8 py-4">
        <div className="flex justify-center items-center rounded-full bg-[#D7B6FE] dark:bg-purple-800 w-8 h-8 border border-[#E8E2D5] dark:border-neutral-600">
          <p className="text-[#604382] dark:text-purple-200 font-manrope text-xs font-bold">{initials}</p>
        </div>
        <div>
          <p className="text-[#000] dark:text-neutral-100 font-manrope text-base font-bold">{borrow.userName}</p>
          <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-xs">ID: {borrow.userId}</p>
        </div>
      </div>
      <div className="flex flex-col items-start w-[240px] pl-8 py-4">
        <p className="text-[#000] dark:text-neutral-100 font-manrope text-base font-bold">{borrow.bookTitle}</p>
        <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-xs mt-1">Call: {borrow.bookCallNo}</p>
      </div>
      <div className="flex py-6 px-8 flex-col items-start w-[137px]">
        <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-base">{formatDate(borrow.borrowDate)}</p>
      </div>
      <div className="flex py-6 px-8 flex-col items-start w-[105px]">
        <p className={`font-manrope text-base ${isOverdue ? 'text-[#BA1A1A] font-bold' : 'text-[#43474D] dark:text-neutral-400'}`}>
          {formatDate(borrow.dueDate)}
        </p>
      </div>
      <div className="flex py-6 px-8 flex-col items-start w-[141px]">
        <ReturnStatusBadge status={borrow.status} />
      </div>
      <div className="flex py-6 px-8 flex-col items-start w-[115px]">
        <p className="text-[#1D1C16] dark:text-neutral-200 font-manrope text-base font-bold">${borrow.fees.toFixed(2)}</p>
      </div>
      <div className="flex py-6 px-8 flex-col items-end w-[151px]">
        <button className="py-2 px-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-hankenGrotesk text-[11px] font-bold hover:bg-opacity-90 tracking-[0.05em]">
          {t('librarian.mark_returned')}
        </button>
      </div>
    </div>
  );
}

export default function BookReturnTab() {
  const { t } = useI18n();
  const [currentPage, setCurrentPage] = useState(1);

  const activeCount = useMemo(() => MOCK_BORROWS.filter(b => b.status === 'active').length, []);
  const overdueCount = useMemo(() => MOCK_BORROWS.filter(b => b.status === 'overdue').length, []);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = MOCK_BORROWS.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(MOCK_BORROWS.length / ITEMS_PER_PAGE);

  return (
    <div className="flex p-16 flex-col items-start gap-6 w-full animate-fadeIn">
      <div className="grid grid-cols-3 gap-6 w-full">
        <div className="flex p-8 flex-col items-start gap-1 border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-xl bg-[#F8F3E9] dark:bg-neutral-700">
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" className="w-6 h-6">
                <path d="M21.96 29.23C21.15 28.67 20.28 28.25 19.36 27.95C18.44 27.65 17.49 27.5 16.5 27.5C15.98 27.5 15.47 27.54 14.97 27.63C14.46 27.72 13.98 27.86 13.5 28.05C13.14 28.19 12.8 28.15 12.48 27.93C12.16 27.7 12 27.39 12 27V17.37C12 17.12 12.07 16.9 12.2 16.7C12.34 16.5 12.52 16.36 12.74 16.28C13.33 16.02 13.94 15.82 14.58 15.69C15.21 15.56 15.85 15.5 16.5 15.5C17.48 15.5 18.43 15.65 19.35 15.95C20.27 16.25 21.15 16.65 22 17.15V28.02C22.84 27.49 23.73 27.1 24.67 26.86C25.61 26.62 26.55 26.5 27.5 26.5C28.05 26.5 28.55 26.53 28.99 26.59C29.44 26.65 29.92 26.76 30.42 26.91C30.56 26.95 30.7 26.95 30.82 26.92C30.94 26.89 31 26.78 31 26.6V16.14C31.1 16.16 31.19 16.18 31.28 16.22C31.36 16.25 31.45 16.3 31.53 16.35C31.68 16.44 31.8 16.56 31.88 16.71C31.96 16.86 32 17.03 32 17.22V26.96C32 27.35 31.83 27.66 31.49 27.88C31.16 28.1 30.79 28.14 30.38 28.01C29.92 27.83 29.45 27.7 28.97 27.62C28.48 27.54 27.99 27.5 27.5 27.5C26.5 27.5 25.53 27.64 24.58 27.92C23.63 28.2 22.76 28.64 21.96 29.23ZM24 25.5V17L29 12V21L24 25.5ZM21 27.55V17.74C20.3 17.36 19.57 17.05 18.82 16.83C18.06 16.61 17.29 16.5 16.5 16.5C15.88 16.5 15.31 16.56 14.79 16.67C14.26 16.78 13.79 16.92 13.37 17.08C13.26 17.12 13.18 17.18 13.11 17.25C13.04 17.32 13 17.41 13 17.51V26.64C13 26.82 13.06 26.93 13.18 26.96C13.3 26.99 13.44 26.98 13.58 26.93C13.98 26.79 14.42 26.69 14.89 26.61C15.36 26.54 15.9 26.5 16.5 26.5C17.39 26.5 18.24 26.6 19.02 26.81C19.81 27.02 20.47 27.27 21 27.55V27.55Z" fill="black" className="dark:fill-neutral-300" />
              </svg>
            </div>
            <p className="text-[#5EEAD4] font-hankenGrotesk text-base leading-6 font-bold">+12% vs last week</p>
          </div>
          <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-base leading-6 mt-3 tracking-[0.05em]">{t('librarian.kpi_active_borrows')}</p>
          <p className="text-[#1D1C16] dark:text-neutral-100 font-hankenGrotesk text-base leading-6 font-bold">{activeCount}</p>
        </div>

        <div className="flex p-8 flex-col items-start gap-1 border border-[#FFDAD6] dark:border-red-900 bg-white dark:bg-neutral-800 rounded-xl shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-xl bg-[#FFDAD6] dark:bg-red-900">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 26.69C16.73 26.69 16.49 26.59 16.29 26.4C16.1 26.2 16 25.97 16 25.69C16 25.42 16.1 25.18 16.29 24.99C16.49 24.79 16.73 24.69 17 24.69C17.28 24.69 17.51 24.79 17.71 24.99C17.9 25.18 18 25.42 18 25.69C18 25.97 17.9 26.2 17.71 26.4C17.51 26.59 17.28 26.69 17 26.69ZM16.27 22.88V12H17.73V22.88H16.27Z" fill="#BA1A1A" />
              </svg>
            </div>
            <p className="text-[#BA1A1A] font-hankenGrotesk text-base font-bold leading-6">CRITICAL</p>
          </div>
          <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-base leading-6 mt-3 tracking-[0.05em]">{t('librarian.kpi_overdue_items')}</p>
          <p className="text-[#BA1A1A] font-hankenGrotesk text-base leading-6 font-bold">{overdueCount}</p>
        </div>

        <div className="flex p-8 flex-col items-start gap-1 border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-xl bg-[#F8F3E9] dark:bg-neutral-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M20 25.31L20.71 24.6L18.61 22.5H23.31V21.5H18.61L20.71 19.4L20 18.69L16.69 22L20 25.31ZM13.62 30C13.17 30 12.79 29.84 12.47 29.53C12.16 29.21 12 28.83 12 28.38V15.62C12 15.17 12.16 14.79 12.47 14.47C12.79 14.16 13.17 14 13.62 14H18.32C18.22 13.49 18.35 13.03 18.68 12.62C19.02 12.21 19.46 12 20 12C20.56 12 21.00 12.21 21.34 12.62C21.67 13.03 21.79 13.49 21.68 14H26.38C26.83 14 27.21 14.16 27.53 14.47C27.84 14.79 28 15.17 28 15.62V28.38C28 28.83 27.84 29.21 27.53 29.53C27.21 29.84 26.83 30 26.38 30H13.62ZM13.62 29H26.38C26.54 29 26.68 28.94 26.81 28.81C26.94 28.68 27 28.54 27 28.38V15.62C27 15.46 26.94 15.32 26.81 15.19C26.68 15.06 26.54 15 26.38 15H13.62C13.46 15 13.32 15.06 13.19 15.19C13.06 15.32 13 15.46 13 15.62V28.38C13 28.54 13.06 28.68 13.19 28.81C13.32 28.94 13.46 29 13.62 29ZM20 14.44C20.22 14.44 20.40 14.37 20.54 14.23C20.68 14.09 20.75 13.91 20.75 13.69C20.75 13.48 20.68 13.30 20.54 13.15C20.40 13.01 20.22 12.94 20 12.94C19.78 12.94 19.60 13.01 19.46 13.15C19.32 13.30 19.25 13.48 19.25 13.69C19.25 13.91 19.32 14.09 19.46 14.23C19.60 14.37 19.78 14.44 20 14.44ZM13 29C13 29 13 28.94 13 28.81C13 28.68 13 28.54 13 28.38V15.62C13 15.46 13 15.32 13 15.19C13 15.06 13 15 13 15V15Z" fill="black" className="dark:fill-neutral-300" />
              </svg>
            </div>
            <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-base leading-6 tracking-[0.05em]">8 expected by 5PM</p>
          </div>
          <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-base leading-6 mt-3 tracking-[0.05em]">{t('librarian.kpi_returns_today')}</p>
          <p className="text-[#1D1C16] dark:text-neutral-100 font-hankenGrotesk text-base leading-6 font-bold">{MOCK_BORROWS.filter(b => b.status === 'active').length}</p>
        </div>
      </div>

      <div className="flex flex-col items-start border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)] w-full overflow-hidden rounded-xl">
        <div className="flex p-8 justify-between items-center border-b border-b-[#E8E2D5] dark:border-neutral-700 w-full">
          <div className="flex items-center gap-4 w-fit">
            <div className="flex min-w-[200px] flex-col items-start relative cursor-pointer">
              <div className="flex py-2.5 px-4 items-center rounded-lg border border-[#E8E2D5] dark:border-neutral-600 bg-[#F8F3E9] dark:bg-neutral-700 w-full">
                <p className="text-[#1D1C16] dark:text-neutral-200 font-manrope text-base leading-6">{t('librarian.all_statuses')}</p>
              </div>
              <svg width="11" height="24" viewBox="0 0 11 24" fill="none" className="absolute right-3 top-[11px] w-3 h-6">
                <path d="M5.31 6.02L0 0.71L0.71 0L5.31 4.6L9.91 0L10.62 0.71L5.31 6.02Z" fill="#74777D" />
              </svg>
            </div>

            <div className="flex py-2.5 px-4 items-center gap-2 rounded-lg border border-[#E8E2D5] dark:border-neutral-600 bg-[#F8F3E9] dark:bg-neutral-700 cursor-pointer">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M1.21 13.67C0.87 13.67 0.58 13.56 0.35 13.33C0.12 13.10 0 12.81 0 12.46V2.88C0 2.54 0.12 2.25 0.35 2.02C0.58 1.79 0.87 1.67 1.21 1.67H2.54V0H3.35V1.67H8.71V0H9.46V1.67H10.79C11.13 1.67 11.42 1.79 11.65 2.02C11.88 2.25 12 2.54 12 2.88V12.46C12 12.81 11.88 13.10 11.65 13.33C11.42 13.56 11.13 13.67 10.79 13.67H1.21ZM1.21 12.92H10.79C10.9 12.92 11.01 12.88 11.11 12.78C11.2 12.68 11.25 12.58 11.25 12.46V5.88H0.75V12.46C0.75 12.58 0.8 12.68 0.89 12.78C0.99 12.88 1.1 12.92 1.21 12.92Z" fill="#1D1C16" className="dark:fill-neutral-300" />
              </svg>
              <p className="text-[#1D1C16] dark:text-neutral-200 font-manrope text-base leading-6">{t('librarian.filter_by_date')}</p>
            </div>

            <div className="flex flex-col items-start relative w-[450px]">
              <input type="text" placeholder="Search student or book title..." className="flex pt-[11px] pr-4 pb-[11px] pl-10 items-center rounded-lg border border-[#E8E2D5] dark:border-neutral-600 bg-white dark:bg-neutral-800 w-full text-base font-manrope text-gray-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#03192E] dark:focus:ring-neutral-400" />
              <svg width="17" height="24" viewBox="0 0 17 24" fill="none" className="absolute left-3 top-[11px] w-4 h-6">
                <path d="M15.68 16.38L9.42 10.12C8.92 10.55 8.34 10.88 7.69 11.11C7.04 11.34 6.39 11.46 5.73 11.46C4.13 11.46 2.78 10.91 1.67 9.80C0.56 8.68 0 7.33 0 5.73C0 4.13 0.56 2.78 1.67 1.67C2.78 0.56 4.13 0 5.73 0C7.33 0 8.68 0.56 9.8 1.67C10.91 2.78 11.46 4.13 11.46 5.73C11.46 6.43 11.34 7.10 11.09 7.75C10.85 8.40 10.52 8.95 10.12 9.42L16.38 15.68L15.68 16.38ZM5.73 10.46C7.06 10.46 8.18 10.00 9.09 9.09C10.00 8.18 10.46 7.06 10.46 5.73C10.46 4.40 10.00 3.28 9.09 2.37C8.18 1.46 7.06 1 5.73 1C4.40 1 3.28 1.46 2.37 2.37C1.46 3.28 1 4.40 1 5.73C1 7.06 1.46 8.18 2.37 9.09C3.28 10.00 4.40 10.46 5.73 10.46Z" fill="#74777D" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start w-full overflow-hidden">
          <div className="flex flex-col items-start -space-y-px w-full">
            <div className="flex justify-center items-start border-b border-b-[#E8E2D5] dark:border-neutral-700 bg-[#F8F3E9] dark:bg-neutral-700 w-full">
              <div className="flex py-5 px-8 flex-col items-start w-[220px]"><p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-base font-bold tracking-[0.05em]">{t('librarian.return_user')}</p></div>
              <div className="flex py-5 px-8 flex-col items-start w-[240px]"><p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-base font-bold tracking-[0.05em]">{t('librarian.return_book_title')}</p></div>
              <div className="flex py-5 px-8 flex-col items-start w-[137px]"><p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-base font-bold tracking-[0.05em]">{t('librarian.return_borrow_date')}</p></div>
              <div className="flex py-5 px-8 flex-col items-start w-[105px]"><p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-base font-bold tracking-[0.05em]">{t('librarian.return_due_date')}</p></div>
              <div className="flex py-5 px-8 flex-col items-start w-[141px]"><p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-base font-bold tracking-[0.05em]">{t('librarian.return_status')}</p></div>
              <div className="flex py-5 px-8 flex-col items-start w-[115px]"><p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-base font-bold tracking-[0.05em]">{t('librarian.return_fees')}</p></div>
              <div className="flex py-5 px-8 flex-col items-end w-[151px]"><p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-base font-bold tracking-[0.05em]">{t('librarian.return_actions')}</p></div>
            </div>

            <div className="flex flex-col w-full">
              {pageItems.map((borrow, i) => (
                <ReturnRow key={borrow.id} borrow={borrow} hasBorder={i < pageItems.length - 1} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex py-6 px-8 justify-between items-center border-t border-t-[#E8E2D5] dark:border-neutral-700 bg-[#F8F3E9] dark:bg-neutral-800 w-full">
          <p className="text-[#000] dark:text-neutral-200 font-manrope text-base">
            Showing {startIdx + 1} - {Math.min(startIdx + ITEMS_PER_PAGE, MOCK_BORROWS.length)} of {MOCK_BORROWS.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="flex justify-center items-center rounded-lg border border-[#E8E2D5] dark:border-neutral-600 bg-white dark:bg-neutral-800 w-10 h-10 hover:bg-gray-100 dark:hover:bg-neutral-700 disabled:opacity-30"
            >
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <path d="M5.31 10.62L0 5.31L5.31 0L6.02 0.71L1.42 5.31L6.02 9.91L5.31 10.62Z" fill="#1D1C16" className="dark:fill-neutral-300" />
              </svg>
            </button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex justify-center items-center rounded-lg w-10 h-10 font-manrope text-base font-bold ${
                    page === currentPage
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'border border-[#E8E2D5] dark:border-neutral-600 bg-white dark:bg-neutral-800 text-[#1D1C16] dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <span className="text-[#74777D] dark:text-neutral-500 font-manrope text-base px-2">...</span>
            <button className="flex justify-center items-center rounded-lg border border-[#E8E2D5] dark:border-neutral-600 bg-white dark:bg-neutral-800 w-10 h-10 text-[#1D1C16] dark:text-neutral-200 font-manrope text-base hover:bg-gray-100 dark:hover:bg-neutral-700">
              {totalPages}
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="flex justify-center items-center rounded-lg border border-[#E8E2D5] dark:border-neutral-600 bg-white dark:bg-neutral-800 w-10 h-10 hover:bg-gray-100 dark:hover:bg-neutral-700 disabled:opacity-30"
            >
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <path d="M4.6 5.31L0 0.71L0.71 0L6.02 5.31L0.71 10.62L0 9.91L4.6 5.31Z" fill="#1D1C16" className="dark:fill-neutral-300" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
