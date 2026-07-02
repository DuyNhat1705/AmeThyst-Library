import { useI18n } from '../../providers/I18nProvider';
import { useState, useEffect } from 'react';

export type BookStatus = 'borrowed' | 'pending' | 'reserved';

export interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  cover?: string;
  coverImage?: string;
  borrowDate?: string;
  dueDate?: string;
  reserveDate?: string;
  expiresAt?: string;
  status: BookStatus;
  returnedDate?: string;
  branchName?: string;
  pin?: string | null;
}

interface Props {
  book: BorrowedBook;
  onReturn?: (id: string) => void;
  onRenew?: (id: string) => void;
  onCancel?: (id: string) => void;
  onViewPin?: (id: string) => void;
  onGeneratePin?: (id: string) => void;
}

const statusKey: Record<BookStatus, string> = {
  borrowed: 'dashboard.borrowed_status_borrowed',
  pending: 'dashboard.borrowed_status_pending',
  reserved: 'dashboard.borrowed_status_reserved',
};

const statusBg: Record<BookStatus, string> = {
  borrowed: 'bg-[#E8F0FE] dark:bg-blue-900/30',
  pending: 'bg-[#FFF3E0] dark:bg-orange-900/30',
  reserved: 'bg-[#E8F5E9] dark:bg-green-900/30',
};

const statusText: Record<BookStatus, string> = {
  borrowed: 'text-[#1A73E8] dark:text-blue-300',
  pending: 'text-[#E37400] dark:text-orange-300',
  reserved: 'text-[#1E8E3E] dark:text-green-300',
};

export default function BorrowedBookCard({ book, onReturn, onRenew, onCancel, onViewPin, onGeneratePin }: Props) {
  const { t } = useI18n();
  const [, setTick] = useState(0);

  const isPinExpired = book.status === 'pending' && book.expiresAt && new Date(book.expiresAt).getTime() <= Date.now();
  const effectiveStatus: BookStatus = isPinExpired ? 'reserved' : book.status;

  useEffect(() => {
    if (book.status !== 'pending' || !book.expiresAt) return;
    const expiresMs = new Date(book.expiresAt).getTime();
    const now = Date.now();
    const delay = expiresMs - now;
    if (delay <= 0) return;
    const timer = setTimeout(() => {
      setTick(t => t + 1);
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/reserve/${book.id}/pin/cleanup`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(() => {});
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [book.status, book.expiresAt, book.id]);

  const bg = statusBg[effectiveStatus] || statusBg.borrowed;
  const text = statusText[effectiveStatus] || statusText.borrowed;
  const label = t(statusKey[effectiveStatus] || statusKey.borrowed);
  const coverSrc = book.coverImage || book.cover;

  const computedDueDate = book.dueDate
    ? book.dueDate
    : book.reserveDate
      ? new Date(new Date(book.reserveDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
      : null;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-20 h-28 rounded-lg bg-[#EAEAEA] dark:bg-neutral-700 shrink-0 flex items-center justify-center overflow-hidden">
        {coverSrc ? (
          <img src={coverSrc} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-40">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" fill="#75777D" />
          </svg>
        )}
      </div>
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-manrope text-sm font-bold text-black dark:text-neutral-100 leading-tight line-clamp-2">{book.title}</h3>
          <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-4 ${bg} ${text}`}>{label}</span>
        </div>
        <p className="text-[#75777D] dark:text-neutral-400 font-inter text-xs">{book.author}</p>
        {book.branchName && (
          <p className="text-[#75777D] dark:text-neutral-400 font-inter text-xs">{book.branchName}</p>
        )}
        <div className="flex flex-col gap-0.5 mt-1">
          {book.borrowDate && (
            <div className="flex justify-between text-[11px]">
              <span className="text-[#75777D] dark:text-neutral-400">{t('dashboard.borrowed_label_borrowed')}</span>
              <span className="text-black dark:text-neutral-200 font-medium">{new Date(book.borrowDate).toLocaleDateString()}</span>
            </div>
          )}
          {computedDueDate && (
            <div className="flex justify-between text-[11px]">
              <span className="text-[#75777D] dark:text-neutral-400">{t('dashboard.borrowed_label_due')}</span>
              <span className={`font-medium ${(book.status as string) === 'overdue' ? 'text-[#D93025] dark:text-red-300' : 'text-black dark:text-neutral-200'}`}>{new Date(computedDueDate).toLocaleDateString()}</span>
            </div>
          )}
          {book.reserveDate && (
            <div className="flex justify-between text-[11px]">
              <span className="text-[#75777D] dark:text-neutral-400">{t('dashboard.borrowed_label_reserved')}</span>
              <span className="text-black dark:text-neutral-200 font-medium">{new Date(book.reserveDate).toLocaleDateString()}</span>
            </div>
          )}
          {book.expiresAt && book.status === 'pending' && (
            <div className="flex justify-between text-[11px]">
              <span className="text-[#75777D] dark:text-neutral-400">{t('dashboard.borrowed_label_expires')}</span>
              <span className="text-[#E37400] dark:text-orange-300 font-medium">{new Date(book.expiresAt).toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          {effectiveStatus === 'borrowed' && (
            <>
              <button onClick={() => onReturn?.(book.id)} className="flex-1 py-1.5 text-[11px] font-bold rounded-full bg-black text-white dark:bg-neutral-100 dark:text-black hover:opacity-80 transition-opacity">{t('dashboard.borrowed_return')}</button>
              <button onClick={() => onRenew?.(book.id)} className="flex-1 py-1.5 text-[11px] font-bold rounded-full border border-[#E8E2D5] dark:border-neutral-600 text-[#43474D] dark:text-neutral-300 hover:bg-[#F8EFE6] dark:hover:bg-neutral-700 transition-colors">{t('dashboard.borrowed_renew')}</button>
            </>
          )}
          {effectiveStatus === 'reserved' && (
            <>
              <button onClick={() => onGeneratePin?.(book.id)} className="flex-1 py-1.5 text-[11px] font-bold rounded-full bg-[#1A73E8] text-white dark:bg-blue-600 dark:text-white hover:opacity-80 transition-opacity">{t('dashboard.borrowed_generate_pin')}</button>
              <button onClick={() => onCancel?.(book.id)} className="flex-1 py-1.5 text-[11px] font-bold rounded-full border border-[#E8E2D5] dark:border-neutral-600 text-[#D93025] dark:text-red-300 hover:bg-[#FCE8E6] dark:hover:bg-red-900/30 transition-colors">{t('dashboard.borrowed_cancel')}</button>
            </>
          )}
          {effectiveStatus === 'pending' && (
            <>
              <button onClick={() => onViewPin?.(book.id)} className="flex-1 py-1.5 text-[11px] font-bold rounded-full bg-[#1A73E8] text-white dark:bg-blue-600 dark:text-white hover:opacity-80 transition-opacity">{t('dashboard.borrowed_view_pin')}</button>
              <button onClick={() => onCancel?.(book.id)} className="flex-1 py-1.5 text-[11px] font-bold rounded-full border border-[#E8E2D5] dark:border-neutral-600 text-[#D93025] dark:text-red-300 hover:bg-[#FCE8E6] dark:hover:bg-red-900/30 transition-colors">{t('dashboard.borrowed_cancel')}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
