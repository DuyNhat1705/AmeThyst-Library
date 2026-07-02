import React from 'react';
import Link from 'next/link';
import BookCover from '../atoms/BookCover';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  image: string;
}

export default function BookCard({ id, title, author, image }: BookCardProps) {
  const handleCardClick = () => {
    if (typeof window !== 'undefined') {
      const searchHistoryId = sessionStorage.getItem('currentSearchHistoryId');
      const token = localStorage.getItem('token');
      if (token) {
        const query = sessionStorage.getItem('currentSearchQuery') || '';
        const filtersStr = sessionStorage.getItem('currentFilters');
        const filters = filtersStr ? JSON.parse(filtersStr) : null;
        const hasFilters = filters && Object.keys(filters).length > 0;

        if (searchHistoryId || query || hasFilters) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
          fetch(`${apiUrl}/api/search/history/click`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              searchHistoryId,
              bookId: id,
              query,
              filters
            })
          })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(data => {
            if (data.searchHistoryId) {
              sessionStorage.setItem('currentSearchHistoryId', data.searchHistoryId);
            }
          })
          .catch(err => console.error("Failed to log intent click:", err));
        }
      }
    }
  };

  return (
    <Link 
      href={`/library/${id}`} 
      onClick={handleCardClick}
      className="flex flex-col gap-3 group cursor-pointer block"
    >
      {/* Book Cover Container */}
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-200">
        <BookCover
          src={image}
          alt={title}
          className="group-hover:scale-105 transition-transform duration-300"
          containerClassName="w-full h-full"
        />
      </div>
      {/* Book Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-navy dark:text-neutral-200 font-manrope text-base font-bold leading-tight line-clamp-2">
          {title}
        </h3>
        <p className="text-[#75777D] dark:text-neutral-400 font-inter text-xs font-medium">
          {author}
        </p>
      </div>
    </Link>
  );
}
