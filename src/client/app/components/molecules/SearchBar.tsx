"use client";

import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { useI18n } from '../../providers/I18nProvider';

export default function SearchBar() {
  const { t } = useI18n();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const categories = [
    t('searchbar.category_science'),
    t('searchbar.category_history'),
    t('searchbar.category_arts'),
  ];

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="w-full max-w-[896px] mx-auto bg-white dark:bg-neutral-800 rounded-2xl border-2 border-transparent dark:border-neutral-700 shadow-sm p-4 flex items-center justify-between gap-4 mt-[-44px] relative z-20 transition-colors duration-300">
      {/* Search Input Group */}
      <div className="flex items-center gap-4 flex-grow">
        {/* Search Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 shrink-0 text-foreground dark:text-neutral-400"
        >
          <path
            d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14.03 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
            fill="currentColor"
          />
        </svg>
        {/* Input Field */}
        <input
          type="text"
          placeholder={t('searchbar.placeholder')}
          className="w-full bg-transparent border-none outline-none font-inter text-base text-foreground dark:text-neutral-100 placeholder-neutral-400"
        />
      </div>

      {/* Filter Button */}
      <div className="relative">
        <Button
          variant="outline"
          className="flex items-center gap-2 py-2 px-4 h-auto rounded-xl dark:border-neutral-600 dark:text-neutral-200"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] h-3"
          >
            <path
              d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z"
              fill="currentColor"
            />
          </svg>
          <span>{t('searchbar.filter')}</span>
        </Button>

        {isFilterOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg shadow-lg p-4 w-48 z-30 transition-colors duration-300">
            {categories.map(genre => (
              <label key={genre} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                  className="rounded border-gray-300 text-teal focus:ring-teal"
                />
                <span className="text-sm font-inter text-foreground dark:text-neutral-200">{genre}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
