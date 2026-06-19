"use client";

import React, { useState, useEffect } from 'react';
import BookCard from '../molecules/BookCard';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
}

export default function PopularPublishes() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/library/books?page=${currentPage}&limit=24`);
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
  }, [currentPage]);

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
        <div className="flex justify-center items-center h-48 text-[#75777D] font-medium">
          No books available.
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
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 h-8 rounded-lg font-inter text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors ${
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
                  onClick={() => setCurrentPage(i)}
                  className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors ${
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
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors ${
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 h-8 rounded-lg font-inter text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
