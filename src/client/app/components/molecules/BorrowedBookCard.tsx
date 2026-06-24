import { useI18n } from '../../providers/I18nProvider';

export type BookStatus = 'borrowed' | 'overdue' | 'returned';

export interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  borrowDate: string;
  dueDate: string;
  status: BookStatus;
  returnedDate?: string;
}

interface Props {
  book: BorrowedBook;
  onReturn?: (id: string) => void;
  onRenew?: (id: string) => void;
}

const statusKey: Record<BookStatus, string> = {
  borrowed: 'dashboard.borrowed_status_borrowed',
  overdue: 'dashboard.borrowed_status_overdue',
  returned: 'dashboard.borrowed_status_returned',
};

const statusBg: Record<BookStatus, string> = {
  borrowed: 'bg-[#E8F0FE] dark:bg-blue-900/30',
  overdue: 'bg-[#FCE8E6] dark:bg-red-900/30',
  returned: 'bg-[#E6F4EA] dark:bg-green-900/30',
};

const statusText: Record<BookStatus, string> = {
  borrowed: 'text-[#1A73E8] dark:text-blue-300',
  overdue: 'text-[#D93025] dark:text-red-300',
  returned: 'text-[#137333] dark:text-green-300',
};

export default function BorrowedBookCard({ book, onReturn, onRenew }: Props) {
  const { t } = useI18n();
  const bg = statusBg[book.status];
  const text = statusText[book.status];
  const label = t(statusKey[book.status]);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-20 h-28 rounded-lg bg-[#EAEAEA] dark:bg-neutral-700 shrink-0 flex items-center justify-center overflow-hidden">
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
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
        <div className="flex flex-col gap-0.5 mt-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-[#75777D] dark:text-neutral-400">{t('dashboard.borrowed_label_borrowed')}</span>
            <span className="text-black dark:text-neutral-200 font-medium">{book.borrowDate}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-[#75777D] dark:text-neutral-400">{t('dashboard.borrowed_label_due')}</span>
            <span className={`font-medium ${book.status === 'overdue' ? 'text-[#D93025] dark:text-red-300' : 'text-black dark:text-neutral-200'}`}>{book.dueDate}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button onClick={() => onReturn?.(book.id)} className="flex-1 py-1.5 text-[11px] font-bold rounded-full bg-black text-white dark:bg-neutral-100 dark:text-black hover:opacity-80 transition-opacity">{t('dashboard.borrowed_return')}</button>
          <button onClick={() => onRenew?.(book.id)} className="flex-1 py-1.5 text-[11px] font-bold rounded-full border border-[#E8E2D5] dark:border-neutral-600 text-[#43474D] dark:text-neutral-300 hover:bg-[#F8EFE6] dark:hover:bg-neutral-700 transition-colors">{t('dashboard.borrowed_renew')}</button>
        </div>
      </div>
    </div>
  );
}
