"use client";

import { useState, useEffect } from 'react';
import { useI18n } from '../../../providers/I18nProvider';
import { BorrowedBookCard, BorrowedHistoryTable } from '../../../components/molecules';
import { PinModal } from '../../../components/organisms';
import type { BorrowedBook } from '../../../components/molecules';

type Tab = 'current' | 'history';

export default function BorrowedBooksPage() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>('current');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentBooks, setCurrentBooks] = useState<BorrowedBook[]>([]);
  const [historyBooks, setHistoryBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [pinModal, setPinModal] = useState<{ open: boolean; pin: string; expiresAt: string }>({ open: false, pin: '', expiresAt: '' });
  const [generatingPinId, setGeneratingPinId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBorrowRecords = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/my-borrowed`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          setCurrentBooks([]);
          return;
        }

        const data = await response.json();
        setCurrentBooks(data.current || []);
      } catch (err) {
        console.error('Error fetching borrow records:', err);
        setCurrentBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowRecords();
    const interval = setInterval(fetchBorrowRecords, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleCancelReservation = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/reserve/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setCurrentBooks(prev => prev.filter(book => book.id !== id));
      }
    } catch (err) {
      console.error('Error cancelling reservation:', err);
    }
  };

  const handleGeneratePin = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setGeneratingPinId(id);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/reserve/${id}/pin`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success && data.data) {
        setCurrentBooks(prev => prev.map(book =>
          book.id === id ? { ...book, pin: data.data.pin, status: 'pending', expiresAt: data.data.expiresAt } : book
        ));
        setPinModal({ open: true, pin: data.data.pin, expiresAt: data.data.expiresAt });
      }
    } catch (err) {
      console.error('Error generating PIN:', err);
    } finally {
      setGeneratingPinId(null);
    }
  };

  const handleViewPin = (id: string) => {
    const book = currentBooks.find(b => b.id === id);
    if (book?.pin) {
      setPinModal({ open: true, pin: book.pin, expiresAt: book.expiresAt || '' });
    }
  };

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

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-neutral-400 dark:text-neutral-500 font-manrope text-sm animate-pulse">{t('dashboard.borrowed_loading')}</div>
        </div>
      ) : isCurrent ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((book) => (
            <BorrowedBookCard
              key={book.id}
              book={book}
              onCancel={handleCancelReservation}
              onViewPin={handleViewPin}
              onGeneratePin={handleGeneratePin}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-neutral-400 dark:text-neutral-500 font-manrope text-sm">{t('dashboard.borrowed_no_books')}</div>
          )}
        </div>
      ) : (
        <BorrowedHistoryTable books={filtered} />
      )}

      <PinModal
        pin={pinModal.pin}
        expiresAt={pinModal.expiresAt}
        isOpen={pinModal.open}
        onClose={() => setPinModal({ open: false, pin: '', expiresAt: '' })}
      />
    </>
  );
}