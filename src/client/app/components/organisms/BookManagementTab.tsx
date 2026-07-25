"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '../../providers/I18nProvider';
import FilterDropdown from '../molecules/FilterDropdown';
import BookTableHeader from '../molecules/BookTableHeader';
import BookTableRow from '../molecules/BookTableRow';
import BookTablePagination from '../molecules/BookTablePagination';
import EmptySearchResults from '../molecules/EmptySearchResults';
import { Button } from '../atoms/Button';
import type { BookEntry } from '../molecules/BookTableRow';

import BookFormModal from '../modals/BookFormModal';
import BookEditModal from '../modals/BookEditModal';
import BookDeleteModal from '../modals/BookDeleteModal';
import StockTransferModal from '../modals/StockTransferModal';

const ITEMS_PER_PAGE = 10;

const CATEGORY_OPTIONS = [
  { value: 'Philosophy', label: 'Philosophy' },
  { value: 'Design', label: 'Design' },
  { value: 'Science', label: 'Science' },
  { value: 'Environment', label: 'Environment' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Art', label: 'Art' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Politics', label: 'Politics' },
  { value: 'History', label: 'History' },
];

export default function BookManagementTab() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rawBooks, setRawBooks] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBookForEdit, setSelectedBookForEdit] = useState<any | null>(null);
  const [selectedBookForDelete, setSelectedBookForDelete] = useState<any | null>(null);
  const [selectedBookForTransfer, setSelectedBookForTransfer] = useState<any | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

      // 1. Fetch Branches
      try {
        const branchRes = await fetch(`${API_BASE}/api/books/branches`, { headers });
        if (branchRes.ok) {
          const branchData = await branchRes.json();
          setBranches(branchData.data || branchData.branches || []);
        }
      } catch (e) {
        console.warn('Branches fetch skipped or optional:', e);
      }

      // 2. Fetch ALL Books Catalog from PostgreSQL
      let fetchedBooks: any[] = [];

      try {
        const booksRes = await fetch(`${API_BASE}/api/library/books?limit=20000`, { headers });
        if (booksRes.ok) {
          const booksData = await booksRes.json();
          fetchedBooks = booksData.books || booksData.data || (Array.isArray(booksData) ? booksData : []);
        }
      } catch (e) {
        console.error('Error fetching full PostgreSQL book catalog:', e);
      }

      // Fallback: If /api/library/books returned no records, try /api/books
      if (!fetchedBooks || fetchedBooks.length === 0) {
        try {
          const fallbackRes = await fetch(`${API_BASE}/api/books`, { headers });
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            fetchedBooks = fallbackData.data || fallbackData.books || (Array.isArray(fallbackData) ? fallbackData : []);
          }
        } catch (e) {
          console.error('Fallback /api/books also failed:', e);
        }
      }

      setRawBooks(fetchedBooks || []);
    } catch (err) {
      console.error('Failed to fetch librarian book management data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Map raw DB books to BookEntry format for table rendering
  const mappedBooks: (BookEntry & { original: any })[] = useMemo(() => {
    if (!Array.isArray(rawBooks)) return [];

    const effectiveBranches = (branches && branches.length > 0)
      ? branches
      : [
          { branch_id: 1, name: 'Branch 1', name_short: 'CS1' },
          { branch_id: 2, name: 'Branch 2', name_short: 'CS2' }
        ];

    return rawBooks
      .map((b, idx) => {
        if (!b) return null;

        let totalQty = 0;
        let availableQty = 0;
        const branchStocksList: any[] = [];

        const dbStocksMap: Record<number, any> = {};
        const stocksArr = b.branch_stocks || b.inventory || [];
        if (Array.isArray(stocksArr)) {
          stocksArr.forEach((s: any) => {
            const brId = parseInt(s.branch_id || s.branchId, 10);
            if (brId) dbStocksMap[brId] = s;
          });
        }
        if (b.branch_id !== undefined && b.branch_id !== null) {
          const brId = parseInt(b.branch_id, 10);
          if (brId && !dbStocksMap[brId]) {
            dbStocksMap[brId] = b;
          }
        }

        effectiveBranches.forEach((br: any) => {
          const bId = parseInt(br.branch_id, 10);
          const stock = dbStocksMap[bId];
          const q = stock
            ? (parseInt(stock.quantity !== undefined ? stock.quantity : (stock.totalCopies || stock.availableCopies || 0), 10) || 0)
            : 0;
          const aq = stock
            ? (parseInt(stock.available_quantity !== undefined ? stock.available_quantity : (stock.availableCopies !== undefined ? stock.availableCopies : q), 10) || 0)
            : 0;

          totalQty += q;
          availableQty += aq;

          branchStocksList.push({
            branch_id: bId,
            branch_name: br.name || stock?.branch_name || stock?.location || `Branch ${bId}`,
            name_short: br.name_short || stock?.name_short || `CS${bId}`,
            quantity: q,
            available_quantity: aq,
            shelf: stock?.shelf || 'N/A'
          });
        });

        // Format author string
        let authorStr = 'Unknown Author';
        if (Array.isArray(b.author)) {
          authorStr = b.author.filter(Boolean).map((a: any) => String(a).replace(/^\{|\}$/g, '').replace(/"/g, '').trim()).join(', ');
        } else if (typeof b.author === 'string' && b.author.trim()) {
          authorStr = b.author.replace(/^\{|\}$/g, '').replace(/"/g, '').trim();
        }

        // Format genres/category string
        let categoryStr = 'General';
        if (Array.isArray(b.genres) && b.genres.length > 0) {
          categoryStr = String(b.genres[0]).replace(/^\{|\}$/g, '').replace(/"/g, '').trim();
        } else if (typeof b.genres === 'string' && b.genres.trim()) {
          categoryStr = b.genres.replace(/^\{|\}$/g, '').replace(/"/g, '').split(',')[0].trim() || 'General';
        } else if (b.category) {
          categoryStr = String(b.category).trim();
        }

        // Format publisher string cleanly (reuse View Details logic)
        let publisherStr = 'N/A';
        if (typeof b.publisher === 'string' && b.publisher.trim()) {
          publisherStr = b.publisher.replace(/^\{|\}$/g, '').replace(/"/g, '').trim();
        } else if (Array.isArray(b.publisher) && b.publisher.length > 0) {
          publisherStr = b.publisher.map((p: any) => String(p).replace(/^\{|\}$/g, '').replace(/"/g, '').trim()).filter(Boolean).join(', ');
        }

        return {
          id: b.book_id || String(b.id || `book_${idx}`),
          coverSrc: b.image_url || b.coverImage || b.coverSrc || '/BookCover.png',
          title: String(b.title || 'Untitled').replace(/^\{|\}$/g, '').replace(/"/g, '').trim(),
          author: authorStr || 'Unknown Author',
          isbn: b.isbn || 'N/A',
          category: categoryStr,
          publisher: publisherStr || 'N/A',
          available: availableQty,
          total: totalQty,
          active: availableQty > 0,
          branchStocks: branchStocksList,
          original: b
        };
      })
      .filter(Boolean) as (BookEntry & { original: any })[];
  }, [rawBooks, branches]);

  const filteredBooks = useMemo(() => {
    if (!Array.isArray(mappedBooks)) return [];
    let books = mappedBooks;

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      books = books.filter(
        (b) =>
          (b.title || '').toLowerCase().includes(q) ||
          (b.author || '').toLowerCase().includes(q) ||
          (b.isbn || '').toLowerCase().includes(q) ||
          (b.publisher || '').toLowerCase().includes(q)
      );
    }

    if (activeCategory) {
      const cat = activeCategory.toLowerCase();
      books = books.filter((b) => {
        const bCat = (b.category || '').toLowerCase();
        const origGenres = Array.isArray(b.original?.genres)
          ? b.original.genres.map((g: any) => String(g).toLowerCase())
          : [];
        return bCat.includes(cat) || origGenres.some((g: string) => g.includes(cat));
      });
    }

    return books;
  }, [mappedBooks, searchQuery, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / ITEMS_PER_PAGE));
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEditBook = (bookEntry: any) => {
    setSelectedBookForEdit(bookEntry.original || bookEntry);
  };

  const handleDeleteBook = (bookEntry: any) => {
    setSelectedBookForDelete(bookEntry.original || bookEntry);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-[#03192E] dark:text-neutral-100 font-inter text-[32px] font-bold leading-10 tracking-[0.125em]">
          Books Management
        </h1>

        <div className="flex justify-between items-center w-full">
          <div className="flex items-start gap-3">
            <div className="relative max-w-[448px] w-[448px]">
              <div className="flex pt-[13px] pr-4 pb-[13px] pl-12 justify-center items-start rounded-xl border border-[#E8E2D5] dark:border-neutral-600 bg-white dark:bg-neutral-800 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder={t('librarian.search_placeholder')}
                  className="w-full bg-transparent border-none outline-none text-[#1D1C16] dark:text-neutral-200 font-manrope text-base placeholder-[#6B7280] dark:placeholder-neutral-400"
                />
              </div>
              <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-[13px] w-fit h-6">
                <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#74777D" />
              </svg>
            </div>
            <FilterDropdown
              label={t('librarian.all_categories')}
              options={CATEGORY_OPTIONS}
              value={activeCategory}
              onChange={(val) => { setActiveCategory(val); setCurrentPage(1); }}
            />
          </div>
          <Button
            variant="primary"
            className="flex py-3 px-8 items-center gap-2 rounded-full cursor-pointer"
            onClick={() => setIsAddModalOpen(true)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white" className="dark:fill-black" />
            </svg>
            <span className="text-white dark:text-black font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">
              {t('librarian.add_book')}
            </span>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500 font-inter text-base animate-pulse">
          Loading catalog from database...
        </div>
      ) : filteredBooks.length === 0 ? (
        <EmptySearchResults
          hasActiveFilters={!!searchQuery || !!activeCategory}
          onClearFilters={handleClearFilters}
        />
      ) : (
        <div className="flex flex-col border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-[0_10px_30px_-10px_rgba(26,46,68,0.06)] dark:shadow-none rounded-lg overflow-hidden">
          <BookTableHeader />
          <div className="flex flex-col w-full">
            {paginatedBooks.map((book, i) => (
              <BookTableRow
                key={book.id || i}
                book={book}
                hasBorder={i > 0}
                renderActions={(b) => (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditBook(b)}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-neutral-700 rounded transition-colors"
                      title={t('librarian.edit')}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM16 3.4L14.6 2L16 3.4ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="#43474D" className="dark:fill-neutral-300" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteBook(b)}
                      className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/50 rounded transition-colors"
                      title={t('librarian.delete')}
                    >
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.4125 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14ZM3 3V16V3Z" fill="#BA1A1A" />
                      </svg>
                    </button>
                  </div>
                )}
              />
            ))}
          </div>
          <BookTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Connected Interactive Modals */}
      <BookFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchData}
        branches={branches}
      />

      <BookEditModal
        isOpen={!!selectedBookForEdit}
        onClose={() => setSelectedBookForEdit(null)}
        onSuccess={fetchData}
        book={selectedBookForEdit}
        branches={branches}
      />

      <BookDeleteModal
        isOpen={!!selectedBookForDelete}
        onClose={() => setSelectedBookForDelete(null)}
        onSuccess={fetchData}
        book={selectedBookForDelete}
        targetBranchId={null}
      />

      <StockTransferModal
        isOpen={!!selectedBookForTransfer}
        onClose={() => setSelectedBookForTransfer(null)}
        onSuccess={fetchData}
        book={selectedBookForTransfer}
        branches={branches}
      />
    </div>
  );
}
