'use client';

import React from 'react';
import BookDetailHero from '../organisms/BookDetailHero';
import InfoGridItem from '../molecules/InfoGridItem';
import ActionButton from '../atoms/ActionButton';
import RecommendationCarousel from '../organisms/RecommendationCarousel';
import NavBar from '../organisms/NavBar';
import Footer from '../organisms/Footer';
import { useI18n } from '../../providers/I18nProvider';

const PublisherIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#006F66] dark:text-[#FFB95F]"><path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18H4Z"/><path d="M12 18h.01"/><path d="M12 14h.01"/><path d="M12 10h.01"/><path d="M8 18h.01"/><path d="M8 14h.01"/><path d="M8 10h.01"/><path d="M16 18h.01"/><path d="M16 14h.01"/><path d="M16 10h.01"/></svg>
);
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#006F66] dark:text-[#FFB95F]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const PageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#006F66] dark:text-[#FFB95F]"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"/></svg>
);
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#006F66] dark:text-[#FFB95F]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#006F66] dark:text-[#FFB95F] mt-1 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export interface BookDetails {
  id: string;
  title: string;
  author: string;
  description: string;
  isbn: string;
  language: string;
  publisher: string;
  publicationYear: string | number;
  numPages: string | number;
  rating: string;
  coverImage: string;
  inventory?: {
    location: string;
    address: string;
    shelf: string;
    availableCopies: number;
  }[];
}

export interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

export interface BookDetailTemplateProps {
  book: BookDetails | null;
  recommendations: RecommendedBook[];
  loading: boolean;
  isReserving: boolean;
  reserved: boolean;
  onReserve: () => void;
}

export default function BookDetailTemplate({
  book,
  recommendations,
  loading,
  isReserving,
  reserved,
  onReserve,
}: BookDetailTemplateProps) {
  const { t } = useI18n();

  if (loading) return <div className="min-h-screen bg-[#F8EFE6] dark:bg-[#091426] flex items-center justify-center font-inter text-navy dark:text-neutral-200 animate-pulse text-lg">{t('book.loading')}</div>;
  if (!book) return <div className="min-h-screen bg-[#F8EFE6] dark:bg-[#091426] flex items-center justify-center font-inter text-navy dark:text-neutral-200 text-xl">{t('book.not_found')}</div>;

  const hasAvailability = book.inventory && book.inventory.some(loc => loc.availableCopies > 0);

  return (
    <div className="bg-[#F8EFE6] dark:bg-[#091426] min-h-screen flex flex-col font-inter selection:bg-teal selection:text-white">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <div className="flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-[300px] shrink-0">
              <BookDetailHero
                title={book.title}
                author={book.author}
                description=""
                coverImage={book.coverImage}
                compact={true}
              />
            </div>

            <div className="flex flex-col gap-6 flex-grow min-w-0">
              <div className="flex flex-col gap-3">
                <h1 className="text-[#091426] dark:text-neutral-200 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight break-words">
                  {book.title}
                </h1>
                <p className="text-[#006F66] dark:text-[#FFB95F] text-xl font-semibold">{book.author}</p>
                <div className="text-[#45474C] dark:text-neutral-400 text-base leading-relaxed max-w-3xl">
                   {book.description}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border border-[#C5C6CD] dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-sm">
                <InfoGridItem label={t('book.label_publisher')} value={book.publisher} icon={<PublisherIcon />} />
                <InfoGridItem label={t('book.label_year')} value={book.publicationYear} icon={<CalendarIcon />} />
                <InfoGridItem label={t('book.label_pages')} value={book.numPages} icon={<PageIcon />} />
                <InfoGridItem label={t('book.label_rating')} value={book.rating} icon={<StarIcon />} />
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <h3 className="text-lg font-bold text-[#091426] dark:text-neutral-200 border-b border-[#C5C6CD] dark:border-neutral-600 pb-2">{t('book.availability_locations')}</h3>
                
                {book.inventory && book.inventory.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {book.inventory.map((loc, idx) => (
                      <div key={idx} className="flex flex-col p-4 rounded-lg border border-[#E0E0E0] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <div className="flex items-start gap-2">
                            <MapPinIcon />
                            <div>
                              <h4 className="font-semibold text-[#091426] dark:text-neutral-200 text-sm leading-tight">{loc.location}</h4>
                              <p className="text-xs text-[#6B7280] dark:text-neutral-400 mt-1">{loc.address}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto flex justify-between items-center text-sm pt-3 border-t border-[#F3F4F6] dark:border-neutral-700">
                          <span className="text-[#45474C] dark:text-neutral-300">Shelf: <span className="font-medium text-[#006F66] dark:text-[#FFB95F]">{loc.shelf}</span></span>
                          <span className={`font-semibold ${loc.availableCopies > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                            {loc.availableCopies} {loc.availableCopies === 1 ? 'copy' : 'copies'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#6B7280]">{t('book.no_available_locations')}</p>
                )}
                
                <div className="w-full max-w-sm mt-4">
                  <ActionButton 
                    onClick={onReserve} 
                    disabled={isReserving || reserved || !hasAvailability}
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
                  >
                    {reserved ? t('book.reserved') : isReserving ? t('book.reserving') : t('book.reserve')}
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full pt-8 border-t border-[#C5C6CD] dark:border-neutral-600">
            <RecommendationCarousel books={recommendations} />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
