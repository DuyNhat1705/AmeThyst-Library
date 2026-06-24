"use client";

import { useState } from 'react';
import { useI18n } from '../../../providers/I18nProvider';
import { BorrowedBookCard, BorrowedHistoryTable } from '../../../components/molecules';
import type { BorrowedBook } from '../../../components/molecules';

const currentBooks: BorrowedBook[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: '', borrowDate: '2026-05-10', dueDate: '2026-06-10', status: 'borrowed' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: '', borrowDate: '2026-05-15', dueDate: '2026-06-05', status: 'overdue' },
  { id: '3', title: '1984', author: 'George Orwell', cover: '', borrowDate: '2026-05-20', dueDate: '2026-06-20', status: 'borrowed' },
  { id: '5', title: 'The Catcher in the Rye', author: 'J.D. Salinger', cover: '', borrowDate: '2026-06-01', dueDate: '2026-07-01', status: 'borrowed' },
  { id: '6', title: 'Dune', author: 'Frank Herbert', cover: '', borrowDate: '2026-05-25', dueDate: '2026-06-15', status: 'borrowed' },
];

const historyBooks: BorrowedBook[] = [
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', cover: '', borrowDate: '2026-04-01', dueDate: '2026-05-01', status: 'returned', returnedDate: '2026-04-28' },
  { id: '7', title: 'Brave New World', author: 'Aldous Huxley', cover: '', borrowDate: '2026-03-10', dueDate: '2026-04-10', status: 'returned', returnedDate: '2026-04-05' },
  { id: '8', title: 'The Hobbit', author: 'J.R.R. Tolkien', cover: '', borrowDate: '2026-02-15', dueDate: '2026-03-15', status: 'returned', returnedDate: '2026-03-10' },
  { id: '9', title: 'Fahrenheit 451', author: 'Ray Bradbury', cover: '', borrowDate: '2026-01-05', dueDate: '2026-02-05', status: 'returned', returnedDate: '2026-02-01' },
];

type Tab = 'current' | 'history';

export default function BorrowedBooksPage() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>('current');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const isCurrent = tab === 'current';
  const books = isCurrent ? currentBooks : historyBooks;
  const filtered = books.filter((b) => {
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.author.toLowerCase().includes(search.toLowerCase())) return false;
    if (!isCurrent) {
      const d = b.returnedDate || '';
      if (dateFrom && d < dateFrom) return false;
      if (dateTo && d > dateTo) return false;
    }
    return true;
  });

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-manrope text-[40px] font-bold leading-[54.5px] text-black dark:text-neutral-100">
          {t('dashboard.borrowed_title')}
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          {!isCurrent && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#75777D] dark:text-neutral-400">{t('dashboard.borrowed_from')}</span>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs text-black dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#1A2E44]/20" />
              <span className="text-[11px] text-[#75777D] dark:text-neutral-400">{t('dashboard.borrowed_to')}</span>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs text-black dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#1A2E44]/20" />
            </div>
          )}
          <input type="text" placeholder={t('dashboard.borrowed_search_placeholder')} value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-full border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-black dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1A2E44]/20 dark:focus:ring-neutral-500 w-56" />
        </div>
      </div>

      <div className="flex gap-2 pb-2">
        {(['current', 'history'] as const).map((tabKey) => (
          <button key={tabKey} onClick={() => { setTab(tabKey); setSearch(''); setDateFrom(''); setDateTo(''); }}
            className={`py-2 px-6 rounded-full text-sm font-bold leading-5 transition-colors ${
              tab === tabKey
                ? 'bg-black text-white dark:bg-neutral-100 dark:text-black shadow-sm'
                : 'text-[#43474D] dark:text-neutral-400 hover:text-black dark:hover:text-neutral-200'
            }`}
          >
            {tabKey === 'current' ? t('dashboard.borrowed_tab_current') : t('dashboard.borrowed_tab_history')}
          </button>
        ))}
      </div>

      {isCurrent ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((book) => (
            <BorrowedBookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <BorrowedHistoryTable books={filtered} />
      )}
    </>
  );
}
