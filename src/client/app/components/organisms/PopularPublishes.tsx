"use client";

import React, { useState } from 'react';
import BookCard from '../molecules/BookCard';

const ALL_BOOKS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Book Title ${i + 1}`,
  author: `Author ${i + 1}`,
  image: "/Rectangle1248.png",
}));

const BOOKS_PER_PAGE = 24;

const CATEGORIES = ["All", "Science", "History", "Arts & Humanities"];

export default function PopularPublishes() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ALL_BOOKS.length / BOOKS_PER_PAGE);

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      {/* Section Header */}
      <h2 className="text-navy font-manrope text-2xl font-bold tracking-[0.01em] mb-6">
        Library
      </h2>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ALL_BOOKS.slice((currentPage - 1) * BOOKS_PER_PAGE, currentPage * BOOKS_PER_PAGE).map((book) => (
          <BookCard 
            key={book.id}
            title={book.title}
            author={book.author}
            image={book.image}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors ${
              currentPage === i + 1
                ? "bg-teal text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
