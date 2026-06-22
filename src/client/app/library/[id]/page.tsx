'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BookDetailHero from '../../components/organisms/BookDetailHero';
import InfoGridItem from '../../components/molecules/InfoGridItem';
import StatusBanner from '../../components/molecules/StatusBanner';
import ActionButton from '../../components/atoms/ActionButton';
import RecommendationCarousel from '../../components/organisms/RecommendationCarousel';
import NavBar from '../../components/organisms/NavBar';
import Footer from '../../components/organisms/Footer';

// Icons components
const PublisherIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006F66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18H4Z"/><path d="M12 18h.01"/><path d="M12 14h.01"/><path d="M12 10h.01"/><path d="M8 18h.01"/><path d="M8 14h.01"/><path d="M8 10h.01"/><path d="M16 18h.01"/><path d="M16 14h.01"/><path d="M16 10h.01"/></svg>
);
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006F66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const PageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006F66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"/></svg>
);
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006F66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "#E11D48" : "none"} stroke={filled ? "#E11D48" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
);

interface BookDetails {
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
    floor: string;
    wing: string;
    shelfId: string;
    availableCopies: number;
  };
}

interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [bookRes, recsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/${id}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/${id}/recommendations`)
        ]);
        
        const bookData = await bookRes.json();
        const recsData = await recsResponse.json();
        
        if (bookRes.ok) setBook(bookData);
        setRecommendations(recsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleReserve = async () => {
    if (!book) return;
    setIsReserving(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_123', bookId: book.id }),
      });
      if (response.ok) {
        setReserved(true);
        const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/${id}`);
        const updatedData = await updatedResponse.json();
        setBook(updatedData);
      }
    } catch (error) {
      console.error('Error reserving book:', error);
    } finally {
      setIsReserving(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F8EFE6] flex items-center justify-center font-inter text-navy animate-pulse text-lg">Preparing your reading experience...</div>;
  if (!book) return <div className="min-h-screen bg-[#F8EFE6] flex items-center justify-center font-inter text-navy text-xl">Book not found.</div>;

  return (
    <div className="bg-[#F8EFE6] min-h-screen flex flex-col font-inter selection:bg-teal selection:text-white">
      <NavBar />
      <main className="flex-grow container mx-auto px-6 py-12 md:py-20 max-w-7xl">
        <div className="flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Left: Book Cover */}
            <div className="w-full md:w-[420px] shrink-0 sticky top-24">
              <BookDetailHero
                title={book.title}
                author={book.author}
                description=""
                coverImage={book.coverImage}
                compact={true}
              />
            </div>

            {/* Right: Book Details & Actions */}
            <div className="flex flex-col gap-8 flex-grow">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <h1 className="text-[#091426] text-4xl md:text-5xl font-extrabold leading-tight tracking-tight flex-grow">
                    {book.title}
                  </h1>
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-3 rounded-full bg-white border border-[#C5C6CD] shadow-sm hover:shadow-md transition-all duration-200 active:scale-90"
                    title="Add to Wishlist"
                  >
                    <HeartIcon filled={isWishlisted} />
                  </button>
                </div>
                <p className="text-[#006F66] text-2xl font-semibold">{book.author}</p>
                <div className="text-[#45474C] text-lg leading-relaxed max-w-3xl mt-2">
                   {book.description}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl border border-[#C5C6CD] bg-white shadow-sm">
                <InfoGridItem label="Publisher" value={book.publisher} icon={<PublisherIcon />} />
                <InfoGridItem label="Year" value={String(book.publicationYear)} icon={<CalendarIcon />} />
                <InfoGridItem label="Pages" value={String(book.numPages)} icon={<PageIcon />} />
                <InfoGridItem label="Rating" value={book.rating} icon={<StarIcon />} />
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-col gap-6 mt-4">
                <StatusBanner availableCopies={book.inventory?.availableCopies || 0} />
                
                <div className="w-full max-w-md">
                  <ActionButton 
                    onClick={handleReserve} 
                    disabled={isReserving || reserved || (book.inventory?.availableCopies || 0) <= 0}
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
                  >
                    {reserved ? 'Successfully Reserved' : isReserving ? 'Processing...' : 'Reserve for Pickup'}
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="w-full pt-16 border-t border-[#C5C6CD]">
            <RecommendationCarousel books={recommendations} />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
