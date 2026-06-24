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
  const [trendingBooks, setTrendingBooks] = useState<RecommendedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [historyRes, trendingRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/1/recommendations`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/2/recommendations`)
        ]);
        
        if (!historyRes.ok || !trendingRes.ok) {
           throw new Error('Failed to fetch recommendations');
        }

        let historyData = await historyRes.json();
        let trendingData = await trendingRes.json();
        
        // Duplicate data to show more books for the UI layout
        historyData = [...historyData, ...historyData, ...historyData, ...historyData].map((b, i) => ({...b, id: b.id + '-' + i}));
        trendingData = [...trendingData, ...trendingData, ...trendingData, ...trendingData].map((b, i) => ({...b, id: b.id + '-' + i}));
        
        setHistoryBooks(historyData);
        setTrendingBooks(trendingData);
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
             {t('dashboard.loading') || 'Loading recommendations...'}
           </span>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
           <span className="text-red-500">{error}</span>
           <button 
             onClick={() => window.location.reload()} 
             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
           >
             {t('dashboard.retry') || 'Retry'}
           </button>
        </div>
      ) : (
        <>
          <RecommendationCarousel 
            books={historyBooks} 
            title={t('dashboard.based_on_history')} 
          />
          <RecommendationCarousel 
            books={trendingBooks} 
            title={t('dashboard.trending_this_week')} 
          />
        </>
      )}
    </div>
  );
}
