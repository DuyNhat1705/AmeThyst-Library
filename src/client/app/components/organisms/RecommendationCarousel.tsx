"use client";

import React, { useRef } from 'react';
import BookCard from '../molecules/BookCard';
import { useI18n } from '../../providers/I18nProvider';

interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

interface RecommendationCarouselProps {
  books: RecommendedBook[];
}

export default function RecommendationCarousel({ books }: RecommendationCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  if (books.length === 0) return null;



  return (
    <section className="flex flex-col gap-8 w-full mt-24">
      <div className="flex justify-between items-end">
        <h2 className="text-[#091426] dark:text-neutral-200 text-3xl md:text-4xl font-semibold tracking-[0.1em]">
          {t('book.you_may_like')}
        </h2>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide scroll-smooth"
      >
        {books.map((book) => (
          <div key={book.id} className="min-w-[280px]">
            <BookCard
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.coverImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
