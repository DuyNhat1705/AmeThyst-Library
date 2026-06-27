'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BookDetailTemplate, { BookDetails, RecommendedBook } from '../../components/templates/BookDetailTemplate';

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [bookRes, recsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/${id}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/${id}/related`)
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

  return (
    <BookDetailTemplate
      book={book}
      recommendations={recommendations}
      loading={loading}
      isReserving={isReserving}
      reserved={reserved}
      onReserve={handleReserve}
    />
  );
}
