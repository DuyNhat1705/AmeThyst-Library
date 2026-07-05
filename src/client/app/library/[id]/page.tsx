'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BookDetailTemplate, { BookDetails, RecommendedBook } from '../../components/templates/BookDetailTemplate';
import { getLoggedInUser } from '../../utils/user';

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const user = typeof window !== 'undefined' ? getLoggedInUser() : null;
  const userRole = user?.role || '';

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

        const [bookRes, recsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/${id}`, { headers }),
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
    if (!book || !selectedBranchId) return;
    setIsReserving(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please sign in to reserve books');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: book.id, branchId: selectedBranchId }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setReserved(true);
        setSelectedBranchId(null);
        const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/library/books/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const updatedData = await updatedResponse.json();
        setBook(updatedData);
      } else {
        setError(data.error?.message || 'Failed to reserve book');
      }
    } catch (error) {
      console.error('Error reserving book:', error);
      setError('An unexpected error occurred');
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
      selectedBranchId={selectedBranchId}
      onBranchSelect={setSelectedBranchId}
      error={error}
      onReserve={handleReserve}
      userRole={userRole}
    />
  );
}
