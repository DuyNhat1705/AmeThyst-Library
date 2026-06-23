import { BorrowedBook, statusConfig } from './BorrowedBookCard';

interface Props {
  books: BorrowedBook[];
}

export default function BorrowedHistoryTable({ books }: Props) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#E8E2D5] dark:border-neutral-700">
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">Title</th>
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">Author</th>
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">Borrowed</th>
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">Returned</th>
            <th className="py-3 px-5 text-[10px] font-bold text-[#75777D] dark:text-neutral-400 tracking-[0.1em] uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b border-[#F2EDE3] dark:border-neutral-700/50 last:border-0 hover:bg-[#F8F3E9]/50 dark:hover:bg-neutral-700/30 transition-colors">
              <td className="py-4 px-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-11 rounded bg-[#EAEAEA] dark:bg-neutral-700 shrink-0 flex items-center justify-center overflow-hidden">
                    {book.cover ? (
                      <img src={book.cover} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-40">
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" fill="#75777D" />
                      </svg>
                    )}
                  </div>
                  <span className="font-manrope text-sm font-bold text-black dark:text-neutral-100">{book.title}</span>
                </div>
              </td>
              <td className="py-4 px-5 text-[#75777D] dark:text-neutral-400 font-inter text-xs">{book.author}</td>
              <td className="py-4 px-5 text-black dark:text-neutral-200 font-manrope text-xs">{book.borrowDate}</td>
              <td className="py-4 px-5 text-black dark:text-neutral-200 font-manrope text-xs">{book.returnedDate || '—'}</td>
              <td className="py-4 px-5">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-4 ${statusConfig[book.status].bg} ${statusConfig[book.status].text}`}>
                  {statusConfig[book.status].label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {books.length === 0 && (
        <div className="py-16 text-center text-neutral-400 dark:text-neutral-500 font-manrope text-sm">No books found</div>
      )}
    </div>
  );
}
