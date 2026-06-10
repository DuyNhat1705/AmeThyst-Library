"use client";
import { useState, useEffect, useRef, useCallback } from 'react';

export default function SurfingPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const observer = useRef();
  const lastBookElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setSkip(prevSkip => prevSkip + 20);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/books/surfing?limit=20&skip=${skip}`);
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setBooks(prevBooks => [...prevBooks, ...data]);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [skip]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleBookClick = async (book) => {
    setSelectedBook(book);
    setDetails(null);
    setDetailsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/books/${book.id}/details`);
      const data = await res.json();
      setDetails(data);
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
    setDetails(null);
  };

  return (
    <main>
      {/* Redundant NavBar removed as it is provided by RootLayout */}
      <div className="masonry-container">
        {books.map((book, index) => {
          const isLast = books.length === index + 1;
          return (
            <div 
              ref={isLast ? lastBookElementRef : null} 
              key={`${book.id}-${index}`} 
              className="masonry-item" 
              onClick={() => handleBookClick(book)}
            >
              <img 
                src={book.coverUrl} 
                alt={book.title} 
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/150x225?text=${encodeURIComponent(book.title)}`;
                }}
              />
            </div>
          );
        })}
      </div>

      {loading && <p style={{ textAlign: 'center', padding: '1rem', color: 'gray' }}>Loading more books...</p>}
      {!hasMore && <p style={{ textAlign: 'center', padding: '1rem', color: 'gray' }}>No more books found.</p>}

      {selectedBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <div className="modal-body">
              <div className="modal-left">
                <img 
                  src={selectedBook.coverUrl} 
                  alt={selectedBook.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/150x225?text=${encodeURIComponent(selectedBook.title)}`;
                  }}
                />
              </div>
              <div className="modal-right">
                <h2 style={{ color: 'black' }}>{selectedBook.title}</h2>
                {detailsLoading ? (
                  <p style={{ color: '#666' }}>Loading deep dive data...</p>
                ) : details ? (
                  <div style={{ color: 'black' }}>
                    <p><strong>Authors:</strong> {details.authors?.join(', ') || 'Unknown'}</p>
                    <p><strong>Genres:</strong> {details.genres?.join(', ') || 'None'}</p>
                    <hr />
                    <h3>Description (AI Service)</h3>
                    <p>{details.vectorData?.description || 'No description available in vector store.'}</p>
                    <hr />
                    <h3>Graph Context (Memgraph)</h3>
                    <p>Book ID: {selectedBook.id}</p>
                    <p>ISBN: {selectedBook.isbn || 'N/A'}</p>
                  </div>
                ) : (
                  <p style={{ color: 'red' }}>Could not load additional details.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 2rem;
          background: none;
          border: none;
          cursor: pointer;
          color: black;
        }
        .modal-body {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .modal-left {
          flex: 1;
          min-width: 250px;
        }
        .modal-left img {
          width: 100%;
          border-radius: 4px;
        }
        .modal-right {
          flex: 2;
          min-width: 300px;
        }
        hr { margin: 1.5rem 0; border: 0; border-top: 1px solid #eee; }
        h3 { margin-top: 1rem; color: #333; font-weight: bold; }
      `}</style>
    </main>
  );
}
