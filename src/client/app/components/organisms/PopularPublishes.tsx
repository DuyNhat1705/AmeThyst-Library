"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import BookCard from '../molecules/BookCard';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
}

export default function PopularPublishes() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL search params
  const currentPage = parseInt(searchParams.get('page') || '1');
  const genres = searchParams.get('genres') || '';
  const branches = searchParams.get('branches') || '';
  const availableOnly = searchParams.get('availableOnly') || '';
  const startYear = searchParams.get('startYear') || '';
  const endYear = searchParams.get('endYear') || '';

  const hasActiveFilters = !!(genres || branches || availableOnly || startYear || endYear);

  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        // Build dynamic query parameters for endpoint
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('limit', '24');
        if (genres) params.set('genres', genres);
        if (branches) params.set('branches', branches);
        if (availableOnly) params.set('availableOnly', availableOnly);
        if (startYear) params.set('startYear', startYear);
        if (endYear) params.set('endYear', endYear);

        const res = await fetch(`${apiUrl}/api/library/books?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setBooks(data.books || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        console.error('Error fetching books from catalog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, genres, branches, availableOnly, startYear, endYear]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      {/* Section Header */}
      <h2 className="text-navy font-manrope text-2xl font-bold tracking-[0.01em] mb-6">
        Library
      </h2>

      {/* Book Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-48 text-teal font-semibold text-lg animate-pulse">
          Loading library catalog...
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4 text-[#75777D] font-medium border-2 border-dashed border-[#C5C6CD] rounded-2xl bg-white/50 p-8 select-none">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#75777D" strokeWidth="1.5" className="text-gray-400">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-center flex flex-col gap-1">
            <span className="text-[#091426] font-bold text-lg font-manrope">No books found</span>
            <span className="text-sm font-inter">We couldn't find any books matching your active filters.</span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="mt-2 px-6 py-2.5 bg-[#006F66] text-white rounded-xl text-sm font-semibold hover:bg-[#005a53] transition active:scale-95 cursor-pointer shadow-sm font-inter"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.coverImage || "/Rectangle1248.png"}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 select-none">
          {/* Nút lùi trang */}
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 h-8 rounded-lg font-inter text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Prev
          </button>

          {/* Render các nút số trang kèm dấu ... */}
          {(() => {
            const pages = [];
            const range = 1; // Số trang hiển thị xung quanh trang hiện tại

            // Luôn hiển thị trang đầu tiên
            pages.push(
              <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors cursor-pointer ${
                  currentPage === 1 ? "bg-teal text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                1
              </button>
            );

            // Dấu chấm lửng bên trái
            if (currentPage > range + 2) {
              pages.push(<span key="left-dots" className="px-1 text-gray-500 font-bold">...</span>);
            }

            // Các trang ở giữa xung quanh currentPage
            const start = Math.max(2, currentPage - range);
            const end = Math.min(totalPages - 1, currentPage + range);

            for (let i = start; i <= end; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors cursor-pointer ${
                    currentPage === i ? "bg-teal text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i}
                </button>
              );
            }

            // Dấu chấm lửng bên phải
            if (currentPage < totalPages - range - 1) {
              pages.push(<span key="right-dots" className="px-1 text-gray-500 font-bold">...</span>);
            }

            // Luôn hiển thị trang cuối cùng
            if (totalPages > 1) {
              pages.push(
                <button
                  key={totalPages}
                  onClick={() => handlePageChange(totalPages)}
                  className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors cursor-pointer ${
                    currentPage === totalPages ? "bg-teal text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {totalPages}
                </button>
              );
            }

            return pages;
          })()}

          {/* Nút tiến trang */}
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 h-8 rounded-lg font-inter text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
