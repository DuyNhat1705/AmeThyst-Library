import { useI18n } from '../../providers/I18nProvider';
import type { BookStatus } from './BorrowedBookCard';
import BookCover from '../atoms/BookCover';

interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  cover?: string;
  coverImage?: string;
  borrowDate?: string;
  dueDate?: string;
  status: BookStatus;
  returnedDate?: string;
}

interface Props {
  books: BorrowedBook[];
}

const statusKey: Record<BookStatus, string> = {
  borrowed: 'dashboard.borrowed_status_borrowed',
  pending: 'dashboard.borrowed_status_pending',
  expired: 'dashboard.borrowed_status_expired',
};

const statusBg: Record<BookStatus, string> = {
  borrowed: 'bg-[#E8F0FE] dark:bg-blue-900/30',
  pending: 'bg-[#FFF3E0] dark:bg-orange-900/30',
  expired: 'bg-[#F3F4F6] dark:bg-neutral-700/30',
};

const statusText: Record<BookStatus, string> = {
  borrowed: 'text-[#1A73E8] dark:text-blue-300',
  pending: 'text-[#E37400] dark:text-orange-300',
  expired: 'text-[#75777D] dark:text-neutral-400',
};

export default function BorrowedHistoryTable({ books }: Props) {
  const { t } = useI18n();
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#E8E2D5] dark:border-neutral-700">
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">{t('dashboard.borrowed_table_title')}</th>
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">{t('dashboard.borrowed_table_author')}</th>
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">{t('dashboard.borrowed_table_borrowed')}</th>
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">{t('dashboard.borrowed_table_returned')}</th>
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">{t('dashboard.borrowed_table_status')}</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b border-[#F2EDE3] dark:border-neutral-700/50 last:border-0 hover:bg-[#F8F3E9]/50 dark:hover:bg-neutral-700/30 transition-colors">
              <td className="py-4 px-5">
                <div className="flex items-center gap-3">
                  <BookCover
                    src={book.coverImage || book.cover}
                    alt={book.title}
                    className="w-8 h-11 rounded"
                    containerClassName="w-8 h-11 rounded shrink-0"
                  />
                  <span className="font-manrope text-sm font-bold text-black dark:text-neutral-100">{book.title}</span>
                </div>
              </td>
              <td className="py-4 px-5 text-[#75777D] dark:text-neutral-400 font-inter text-xs">{book.author}</td>
              <td className="py-4 px-5 text-black dark:text-neutral-200 font-manrope text-xs">{book.borrowDate ? new Date(book.borrowDate).toLocaleDateString() : '—'}</td>
              <td className="py-4 px-5 text-black dark:text-neutral-200 font-manrope text-xs">{book.returnedDate ? new Date(book.returnedDate).toLocaleDateString() : '—'}</td>
              <td className="py-4 px-5">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-4 ${statusBg[book.status] || statusBg.borrowed} ${statusText[book.status] || statusText.borrowed}`}>
                  {t(statusKey[book.status] || statusKey.borrowed)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {books.length === 0 && (
        <div className="py-16 text-center text-neutral-400 dark:text-neutral-500 font-manrope text-sm">{t('dashboard.borrowed_no_books')}</div>
      )}
    </div>
  );
}
