"use client";

import { useState, useEffect, useMemo } from 'react';
import { useI18n } from '../../providers/I18nProvider';

interface ActiveBorrowing {
  borrow_id: string;
  book_title: string;
  book_isbn: string;
  book_author: string;
  username: string;
  email: string;
  avatar?: string;
  borrow_date: string;
  due_date: string;
  branch_name: string;
  name_short: string;
}

const ITEMS_PER_PAGE = 10;

export default function BookReturnTab() {
  const { t } = useI18n();
  const [borrowings, setBorrowings] = useState<ActiveBorrowing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchBorrowings = async () => {
    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_BASE}/dashboard/librarian/active-borrowings`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const json = await res.json();
        setBorrowings(json.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch active borrowings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const activeCount = borrowings.length;

  const overdueCount = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return borrowings.filter(b => {
      if (!b.due_date) return false;
      const due = new Date(b.due_date);
      due.setHours(0, 0, 0, 0);
      return due < now;
    }).length;
  }, [borrowings]);

  const expectingTodayCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return borrowings.filter(b => {
      if (!b.due_date) return false;
      const due = new Date(b.due_date);
      return due >= today && due < tomorrow;
    }).length;
  }, [borrowings]);

  const filteredBorrowings = useMemo(() => {
    if (!searchQuery.trim()) return borrowings;
    const q = searchQuery.toLowerCase().trim();
    return borrowings.filter(b =>
      (b.book_title || '').toLowerCase().includes(q) ||
      (b.book_isbn || '').toLowerCase().includes(q) ||
      (b.book_author || '').toLowerCase().includes(q) ||
      (b.username || '').toLowerCase().includes(q) ||
      (b.email || '').toLowerCase().includes(q)
    );
  }, [borrowings, searchQuery]);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredBorrowings.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filteredBorrowings.length / ITEMS_PER_PAGE));

  return (
    <div className="flex p-16 flex-col items-start gap-6 w-full animate-fadeIn">
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6 w-full">
        <div className="flex p-8 flex-col items-start gap-1 border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-xl bg-[#F8F3E9] dark:bg-neutral-700">
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" className="w-6 h-6">
                <path d="M21.96 29.23C21.15 28.67 20.28 28.25 19.36 27.95C18.44 27.65 17.49 27.5 16.5 27.5C15.98 27.5 15.47 27.54 14.97 27.63C14.46 27.72 13.98 27.86 13.5 28.05C13.14 28.19 12.8 28.15 12.48 27.93C12.16 27.7 12 27.39 12 27V17.37C12 17.12 12.07 16.9 12.2 16.7C12.34 16.5 12.52 16.36 12.74 16.28C13.33 16.02 13.94 15.82 14.58 15.69C15.21 15.56 15.85 15.5 16.5 15.5C17.48 15.5 18.43 15.65 19.35 15.95C20.27 16.25 21.15 16.65 22 17.15V28.02C22.84 27.49 23.73 27.1 24.67 26.86C25.61 26.62 26.55 26.5 27.5 26.5C28.05 26.5 28.55 26.53 28.99 26.59C29.44 26.65 29.92 26.76 30.42 26.91C30.56 26.95 30.7 26.95 30.82 26.92C30.94 26.89 31 26.78 31 26.6V16.14C31.1 16.16 31.19 16.18 31.28 16.22C31.36 16.25 31.45 16.3 31.53 16.35C31.68 16.44 31.8 16.56 31.88 16.71C31.96 16.86 32 17.03 32 17.22V26.96C32 27.35 31.83 27.66 31.49 27.88C31.16 28.1 30.79 28.14 30.38 28.01C29.92 27.83 29.45 27.7 28.97 27.62C28.48 27.54 27.99 27.5 27.5 27.5C26.5 27.5 25.53 27.64 24.58 27.92C23.63 28.2 22.76 28.64 21.96 29.23ZM24 25.5V17L29 12V21L24 25.5ZM21 27.55V17.74C20.3 17.36 19.57 17.05 18.82 16.83C18.06 16.61 17.29 16.5 16.5 16.5C15.88 16.5 15.31 16.56 14.79 16.67C14.26 16.78 13.79 16.92 13.37 17.08C13.26 17.12 13.18 17.18 13.11 17.25C13.04 17.32 13 17.41 13 17.51V26.64C13 26.82 13.06 26.93 13.18 26.96C13.3 26.99 13.44 26.98 13.58 26.93C13.98 26.79 14.42 26.69 14.89 26.61C15.36 26.54 15.9 26.5 16.5 26.5C17.39 26.5 18.24 26.6 19.02 26.81C19.81 27.02 20.47 27.27 21 27.55V27.55Z" fill="black" className="dark:fill-neutral-300" />
              </svg>
            </div>
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
          </div>
          <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-base leading-6 mt-3 tracking-[0.05em]">{t('librarian.kpi_expecting_return_today')}</p>
          <p className="text-[#1D1C16] dark:text-neutral-100 font-hankenGrotesk text-base leading-6 font-bold">{expectingTodayCount}</p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex p-3 items-center gap-4 rounded-xl bg-slate-100 dark:bg-neutral-800 w-full">
        <div className="flex flex-col items-start w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by title, author, ISBN, or user name..."
            className="flex py-2 pr-4 pb-2 pl-10 items-center rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 w-full text-sm font-manrope text-slate-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-2.5 text-slate-400">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col items-start border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)] w-full overflow-hidden rounded-xl">
        {/* Table Header */}
        <div className="flex justify-center items-start border-b border-b-[#E8E2D5] dark:border-neutral-700 bg-[#F8F3E9] dark:bg-neutral-700 w-full">
          <div className="flex py-5 pl-8 pr-4 flex-col items-start w-[220px]">
            <p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-sm font-bold tracking-[0.05em] whitespace-nowrap">{t('librarian.return_user')}</p>
          </div>
          <div className="flex py-5 pl-8 pr-4 flex-col items-start flex-1">
            <p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-sm font-bold tracking-[0.05em] whitespace-nowrap">{t('librarian.return_book_title')}</p>
          </div>
          <div className="flex py-5 pl-8 pr-4 flex-col items-start w-[137px]">
            <p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-sm font-bold tracking-[0.05em] whitespace-nowrap">{t('librarian.return_borrow_date')}</p>
          </div>
          <div className="flex py-5 pl-4 pr-4 flex-col items-start w-[137px]">
            <p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-sm font-bold tracking-[0.05em] whitespace-nowrap">{t('librarian.return_due_date')}</p>
          </div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="py-16 text-center text-slate-500 font-inter text-base animate-pulse w-full">
            Loading active borrowings...
          </div>
        ) : pageItems.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-neutral-400 font-manrope text-sm w-full">
            No active borrowings found.
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {pageItems.map((item) => {
              const isOverdue = item.due_date && new Date(item.due_date) < new Date(new Date().toDateString());
              return (
                <div key={item.borrow_id} className={`flex justify-center items-center w-full ${isOverdue ? 'bg-[rgba(255,218,214,0.05)]' : ''} border-b border-b-gray-100 dark:border-neutral-700/50 last:border-b-0`}>
                  {/* User with Avatar */}
                  <div className="flex items-center gap-3 w-[220px] pl-8 py-4 overflow-hidden">
                    <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
                      {item.avatar ? (
                        <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#D7B6FE] dark:bg-purple-800 flex items-center justify-center">
                          <span className="text-[#604382] dark:text-purple-200 font-manrope text-xs font-bold">
                            {item.username ? item.username.slice(0, 2).toUpperCase() : 'U'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#000] dark:text-neutral-100 font-manrope text-base font-bold truncate whitespace-nowrap">{item.username}</p>
                      <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-xs truncate whitespace-nowrap">{item.email}</p>
                    </div>
                  </div>

                  {/* Book Title */}
                  <div className="flex flex-col items-start flex-1 pl-8 py-4 min-w-0">
                    <p className="text-[#000] dark:text-neutral-100 font-manrope text-base font-bold truncate whitespace-nowrap w-full">{item.book_title}</p>
                    <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-xs mt-1 truncate whitespace-nowrap w-full">{item.book_author}</p>
                  </div>

                  {/* Borrow Date */}
                  <div className="flex py-6 pl-8 pr-4 flex-col items-start w-[137px]">
                    <p className="text-[#43474D] dark:text-neutral-400 font-manrope text-base whitespace-nowrap">
                      {item.borrow_date ? new Date(item.borrow_date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>

                  {/* Due Date */}
                  <div className="flex py-6 pl-4 pr-4 flex-col items-start w-[137px]">
                    <p className={`font-manrope text-base whitespace-nowrap ${isOverdue ? 'text-[#BA1A1A] font-bold' : 'text-[#43474D] dark:text-neutral-400'}`}>
                      {item.due_date ? new Date(item.due_date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex py-6 px-8 justify-between items-center border-t border-t-[#E8E2D5] dark:border-neutral-700 bg-[#F8F3E9] dark:bg-neutral-800 w-full">
          <p className="text-[#000] dark:text-neutral-200 font-manrope text-base">
            Showing {startIdx + 1} - {Math.min(startIdx + ITEMS_PER_PAGE, filteredBorrowings.length)} of {filteredBorrowings.length} results
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
