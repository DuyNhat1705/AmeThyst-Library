import React from 'react';
import BookCard from '../molecules/BookCard';
import EmptySearchResults from '../molecules/EmptySearchResults';

export default function SearchResultsGrid({
  books = [],
  loading = false,
  query = '',
  activeFiltersCount = 0,
  onClearFilters,
  onToggleSemantic,
  onBookClick
}) {
  if (loading) {
    // Responsive grid skeleton loader with fading pulses
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full animate-pulse">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="w-full aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <EmptySearchResults
        query={query}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={onClearFilters}
        onToggleSemantic={onToggleSemantic}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
      {books.map((book) => (
        <div key={book.id} onClick={() => onBookClick && onBookClick(book.id)}>
          <BookCard
            id={book.id}
            title={book.title}
            author={book.author}
            image={book.coverImage || '/Rectangle1248.png'}
          />
        </div>
      ))}
    </div>
  );
}
