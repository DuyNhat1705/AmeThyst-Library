'use client';

import { useState, useEffect } from 'react';
import RecommendationCarousel from '../../../components/organisms/RecommendationCarousel';
import { useI18n } from '../../../providers/I18nProvider';

interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

export default function RecommendationsPage() {
  const { t } = useI18n();
  const [historyBooks, setHistoryBooks] = useState<RecommendedBook[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<RecommendedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const [historyRes, wishlistRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/1/recommendations`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`, { headers })
        ]);
        
        if (!historyRes.ok) {
           throw new Error('Failed to fetch recommendations');
        }

        let historyData = await historyRes.json();
        let wishlistData = wishlistRes.ok ? await wishlistRes.json() : [];
        
        // Duplicate recommendation data to show more books for the UI layout
        if (historyData.length > 0) {
          historyData = [...historyData, ...historyData, ...historyData, ...historyData].map((b, i) => ({...b, id: b.id + '-' + i}));
        }
        
        setHistoryBooks(historyData);
        setWishlistBooks(wishlistData);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(t('dashboard.error_fetching') || 'Could not load recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  return (
    <div className="flex flex-col w-full min-w-0 gap-12 pb-12">
      {loading ? (
        <div className="flex justify-center items-center h-64">
           <span className="text-gray-500 dark:text-neutral-400">
             {t('dashboard.loading') || 'Loading...'}
           </span>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
           <span className="text-red-500">{error}</span>
           <button 
             onClick={() => window.location.reload()} 
             className="px-4 py-2 bg-[#006F66] text-white rounded-lg hover:bg-teal transition"
           >
             {t('dashboard.retry') || 'Retry'}
           </button>
        </div>
      ) : (
        <>
          <RecommendationCarousel 
            books={historyBooks} 
            title={t('dashboard.recommended_for_you') || 'Recommended for You'} 
          />
          <RecommendationCarousel 
            books={wishlistBooks} 
            title={t('dashboard.my_wishlist') || 'My Wishlist'} 
            emptyFallback={
              <div className="text-center py-6 text-[#6B7280] dark:text-neutral-400 font-inter text-base">
                {t('dashboard.wishlist_empty') || 'Your wishlist is empty. Explore books and click the heart icon to save them here!'}
              </div>
            }
          />
        </>
      )}
    </div>
  );
}
