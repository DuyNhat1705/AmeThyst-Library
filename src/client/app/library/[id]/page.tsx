'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BookDetailTemplate, { BookDetails, RecommendedBook } from '../../components/templates/BookDetailTemplate';
import { getLoggedInUser } from '../../utils/user';

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' | 'warning' | 'success' } | null>(null);

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setUser(getLoggedInUser());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const userRole = mounted ? user?.role || '' : '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem('token');
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

        // Fetch wishlist status if logged in as user
        const currentUser = getLoggedInUser();
        if (token && currentUser?.role === 'user') {
          const statusRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/status/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (statusRes.ok) {
            const statusData = await statusRes.json();
            setIsWishlisted(statusData.wishlisted);
          }
        }
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
      const token = sessionStorage.getItem('token');
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

  const handleWishlistToggle = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.role !== 'user') {
      setToast({ message: 'Only library members can save books to their wishlist', type: 'error' });
      return;
    }

    const token = sessionStorage.getItem('token');
    const method = isWishlisted ? 'DELETE' : 'POST';
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${id}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setIsWishlisted(!isWishlisted);
        setToast({
          message: isWishlisted 
            ? 'Removed from wishlist successfully' 
            : 'Added to wishlist successfully',
          type: 'success'
        });
      } else {
        setToast({ message: data.error || 'Failed to update wishlist', type: 'error' });
      }
    } catch (err) {
      console.error('Error updating wishlist:', err);
      setToast({ message: 'An unexpected error occurred', type: 'error' });
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
      isWishlisted={isWishlisted}
      onWishlistToggle={handleWishlistToggle}
      toast={toast}
      onDismissToast={() => setToast(null)}
    />
  );
}